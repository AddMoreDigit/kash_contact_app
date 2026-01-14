const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const REGION = process.env.AWS_REGION || process.env.REGION || 'us-east-1';
const DB_SECRET_ARN = process.env.DB_SECRET_ARN; // ARN of Secrets Manager secret for DB
const JWT_SECRET_ARN = process.env.JWT_SECRET; // ARN of Secrets Manager secret for JWT
const SES_FROM = process.env.SES_FROM_EMAIL || 'no-reply@example.com';

const sm = new SecretsManagerClient({ region: REGION });
const ses = new SESClient({ region: REGION });

// Cache for secrets to avoid repeated API calls
let dbSecretCache = null;
let jwtSecretCache = null;

async function getDbClient() {
  if (!DB_SECRET_ARN) throw new Error('DB_SECRET_ARN env var not set');
  const cmd = new GetSecretValueCommand({ SecretId: DB_SECRET_ARN });
  const res = await sm.send(cmd);
  const secret = JSON.parse(res.SecretString);

  const client = new Client({
    host: secret.host,
    port: secret.port || 5432,
    user: secret.username || secret.user,
    password: secret.password,
    database: secret.dbname || secret.database,
    ssl: secret.ssl ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();
  return client;
}

async function getJwtSecret() {
  // Return cached secret if available (within same Lambda invocation)
  if (jwtSecretCache) return jwtSecretCache;
  
  if (!JWT_SECRET_ARN) throw new Error('JWT_SECRET env var not set (should be Secrets Manager ARN)');
  
  try {
    const cmd = new GetSecretValueCommand({ SecretId: JWT_SECRET_ARN });
    const res = await sm.send(cmd);
    const secret = JSON.parse(res.SecretString);
    jwtSecretCache = secret.JWT_SECRET;
    return jwtSecretCache;
  } catch (err) {
    console.error('Failed to retrieve JWT secret from Secrets Manager:', err);
    throw new Error('Unable to retrieve JWT secret');
  }
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(toEmail, otp) {
  const body = `Your Kash Contact verification code is: ${otp} \n\nThis code expires in 15 minutes.`;
  const params = {
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Body: { Text: { Data: body } },
      Subject: { Data: 'Verify your email for Kash Contact' },
    },
    Source: SES_FROM,
  };
  const cmd = new SendEmailCommand(params);
  await ses.send(cmd);
}

async function registerUser(data) {
  const { email, password, firstName, lastName, userType = 'user', phoneNumber } = data;
  if (!email || !password || !firstName || !lastName) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing required fields' }) };
  }
  // validate email format (simple)
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid email format' }) };
  }

  const client = await getDbClient();
  try {
    // check existing
    const exists = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rowCount > 0) {
      await client.end();
      return { statusCode: 409, body: JSON.stringify({ success: false, message: 'Email already registered' }) };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

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
  // Support both API Gateway v1 (event.path/event.httpMethod) and HTTP API (requestContext.http)
  const path = event.path || (event.requestContext && event.requestContext.http && event.requestContext.http.path) || '/';
  const method = event.httpMethod || (event.requestContext && event.requestContext.http && event.requestContext.http.method) || 'GET';
  let body = {};
  try { body = event.body ? JSON.parse(event.body) : {}; } catch (e) { /* ignore parse error */ }

  try {
    if (method === 'POST' && path.endsWith('/auth/register')) return await registerUser(body);
    if (method === 'POST' && path.endsWith('/auth/verify-email')) return await verifyEmail(body);
    if (method === 'POST' && path.endsWith('/auth/login')) return await loginUser(body);

    return { statusCode: 404, body: JSON.stringify({ success: false, message: 'Not found' }) };
  } catch (err) {
    console.error('handler error', err);
    return { statusCode: 500, body: JSON.stringify({ success: false, message: err.message }) };
  }
};
