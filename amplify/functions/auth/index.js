const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const REGION = process.env.AWS_REGION || 'us-east-1';
const DB_SECRET_ARN = process.env.DB_SECRET_ARN;
const JWT_SECRET_ARN = process.env.JWT_SECRET;
const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL;

let dbSecretCache = null;
let jwtSecretCache = null;

const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Max-Age': '300',
  'Content-Type': 'application/json',
});

async function getDbSecret() {
  if (dbSecretCache) return dbSecretCache;
  const sm = new SecretsManagerClient({ region: REGION });
  const cmd = new GetSecretValueCommand({ SecretId: DB_SECRET_ARN });
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Secrets Manager timeout (10s)')), 10000)
  );
  const res = await Promise.race([sm.send(cmd), timeoutPromise]);
  dbSecretCache = JSON.parse(res.SecretString);
  return dbSecretCache;
}

async function getJwtSecret() {
  if (jwtSecretCache) return jwtSecretCache;
  const sm = new SecretsManagerClient({ region: REGION });
  const cmd = new GetSecretValueCommand({ SecretId: JWT_SECRET_ARN });
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Secrets Manager timeout (10s)')), 10000)
  );
  const res = await Promise.race([sm.send(cmd), timeoutPromise]);
  const secret = JSON.parse(res.SecretString);
  jwtSecretCache = secret.JWT_SECRET;
  return jwtSecretCache;
}

async function getDbClient() {
  const secret = await getDbSecret();
  const useSsl = secret.ssl !== false;
  const client = new Client({
    host: secret.host,
    port: secret.port || 5432,
    user: secret.username || secret.user,
    password: secret.password,
    database: secret.dbname || secret.database,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 10000,
    statement_timeout: 10000,
  });
  
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('DB connection timeout (15s)')), 15000)
  );
  
  await Promise.race([client.connect(), timeoutPromise]);
  return client;
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(toEmail, otp) {
  try {
    const ses = new SESClient({ region: REGION });
    const params = {
      Source: SES_FROM_EMAIL,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: 'Kash Contact - Email Verification' },
        Body: {
          Html: {
            Data: `<h2>Email Verification</h2><p>Your verification code is: <strong>${otp}</strong></p><p>This code expires in 15 minutes.</p>`,
          },
        },
      },
    };
    await ses.send(new SendEmailCommand(params));
    console.log(`Verification email sent to ${toEmail}`);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}

async function registerUser(data) {
  const { email, password, firstName, lastName, userType = 'user', phoneNumber } = data;
  if (!email || !password || !firstName || !lastName) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing required fields' }) };
  }
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid email format' }) };
  }

  const client = await getDbClient();
  try {
    const exists = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rowCount > 0) {
      await client.end();
      return { statusCode: 409, body: JSON.stringify({ success: false, message: 'Email already registered' }) };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    const insertSql = `INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone_number, otp_code, otp_expires_at, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending_verification') RETURNING id,email`;

    const res = await client.query(insertSql, [email, passwordHash, userType, firstName, lastName, phoneNumber || null, otp, otpExpires]);
    await sendVerificationEmail(email, otp);
    await client.end();
    return { statusCode: 201, body: JSON.stringify({ success: true, message: 'User registered. Verification code sent to email.', data: { userId: res.rows[0].id } }) };
  } catch (err) {
    console.error('registerUser error', err);
    try { await client.end(); } catch (e) {}
    return { statusCode: 500, body: JSON.stringify({ success: false, message: err.message }) };
  }
}

async function verifyEmail(data) {
  const { email, otpCode } = data;
  if (!email || !otpCode) return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing email or otpCode' }) };
  const client = await getDbClient();
  try {
    const res = await client.query('SELECT id, otp_code, otp_expires_at FROM users WHERE email = $1', [email]);
    if (res.rowCount === 0) {
      await client.end();
      return { statusCode: 404, body: JSON.stringify({ success: false, message: 'User not found' }) };
    }
    const user = res.rows[0];
    if (!user.otp_code || user.otp_code !== otpCode) {
      await client.end();
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid code' }) };
    }
    if (new Date(user.otp_expires_at) < new Date()) {
      await client.end();
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Code expired' }) };
    }
    await client.query('UPDATE users SET email_verified = TRUE, status = $1, otp_code = NULL, otp_expires_at = NULL WHERE id = $2', ['active', user.id]);
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Email verified' }) };
  } catch (err) {
    console.error('verifyEmail error', err);
    try { await client.end(); } catch (e) {}
    return { statusCode: 500, body: JSON.stringify({ success: false, message: err.message }) };
  }
}

async function loginUser(data) {
  const { email, password } = data;
  if (!email || !password) return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing email or password' }) };
  const client = await getDbClient();
  try {
    const res = await client.query('SELECT id, password_hash, email_verified, user_type FROM users WHERE email = $1', [email]);
    if (res.rowCount === 0) {
      await client.end();
      return { statusCode: 401, body: JSON.stringify({ success: false, message: 'Invalid credentials' }) };
    }
    const user = res.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      await client.end();
      return { statusCode: 401, body: JSON.stringify({ success: false, message: 'Invalid credentials' }) };
    }
    if (!user.email_verified) {
      await client.end();
      return { statusCode: 403, body: JSON.stringify({ success: false, message: 'Email not verified' }) };
    }

    const jwtSecret = await getJwtSecret();
    const token = jwt.sign({ sub: user.id, role: user.user_type }, jwtSecret, { expiresIn: '7d' });
    await client.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ success: true, data: { token } }) };
  } catch (err) {
    console.error('loginUser error', err);
    try { await client.end(); } catch (e) {}
    return { statusCode: 500, body: JSON.stringify({ success: false, message: err.message }) };
  }
}

exports.handler = async (event) => {
  const headers = getCorsHeaders();
  const http = event.requestContext?.http || {};
  const method = http.method || event.requestContext?.httpMethod || event.httpMethod || 'GET';
  const path = http.path || event.rawPath || event.path || '/';
  let body = {};
  try { body = event.body ? JSON.parse(event.body) : {}; } catch (e) { /* ignore parse error */ }

  try {
    console.log(`[START] ${method} ${path}`);
    
    if (method === 'OPTIONS') {
      return { statusCode: 204, headers, body: '' };
    }
    
    let response;
    if (method === 'POST' && path.endsWith('/auth/register')) {
      console.log('[AUTH] registerUser called');
      response = await registerUser(body);
      console.log('[AUTH] registerUser returned:', response.statusCode);
    } else if (method === 'POST' && path.endsWith('/auth/verify-email')) {
      console.log('[AUTH] verifyEmail called');
      response = await verifyEmail(body);
      console.log('[AUTH] verifyEmail returned:', response.statusCode);
    } else if (method === 'POST' && path.endsWith('/auth/login')) {
      console.log('[AUTH] loginUser called');
      response = await loginUser(body);
      console.log('[AUTH] loginUser returned:', response.statusCode);
    } else {
      console.log('[ROUTE] Not found');
      response = { statusCode: 404, body: JSON.stringify({ success: false, message: 'Not found' }) };
    }
    
    console.log('[SUCCESS] Returning:', response.statusCode);
    return {
      statusCode: response.statusCode || 500,
      headers,
      body: typeof response.body === 'string' ? response.body : JSON.stringify(response.body || { success: false, message: 'No response' })
    };
  } catch (err) {
    console.error('[ERROR]', err.message);
    console.error('[STACK]', err.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: err.message || 'Internal server error' })
    };
  }
};
