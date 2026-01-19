const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Max-Age': '300',
  'Content-Type': 'application/json',
});

exports.handler = async (event) => {
  const headers = getCorsHeaders();
  
  try {
    console.log('[START] handler invoked');
    
    // Special flag for schema migration
    if (event.runMigration === true) {
      console.log('[MIGRATION] Running schema migration...');
      const { Client } = require('pg');
      const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
      
      const REGION = process.env.AWS_REGION || 'us-east-1';
      const DB_SECRET_ARN = process.env.DB_SECRET_ARN;
      
      const sm = new SecretsManagerClient({ region: REGION });
      const secretRes = await sm.send(new GetSecretValueCommand({ SecretId: DB_SECRET_ARN }));
      const dbSecret = JSON.parse(secretRes.SecretString);
      
      const client = new Client({
        host: dbSecret.host,
        port: dbSecret.port || 5432,
        user: dbSecret.username || dbSecret.user,
        password: dbSecret.password,
        database: dbSecret.dbname || dbSecret.database,
        ssl: { rejectUnauthorized: false },
      });
      
      await client.connect();
      console.log('[MIGRATION] DB connected');
      
      const schemaSql = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TYPE user_type AS ENUM ('user', 'corporate', 'vendor');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type user_type NOT NULL,
    status user_status DEFAULT 'pending_verification',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(6),
    otp_expires_at TIMESTAMP,
    last_login TIMESTAMP,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;
      
      await client.query(schemaSql);
      console.log('[MIGRATION] Schema created successfully');
      await client.end();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Schema migration completed' })
      };
    }
    
    const http = event.requestContext?.http || {};
    const method = http.method || event.requestContext?.httpMethod || event.httpMethod || 'GET';
    const path = http.path || event.rawPath || event.path || '/';
    let body = {};
    
    try { 
      body = event.body ? JSON.parse(event.body) : {}; 
    } catch (e) { 
      console.error('[PARSE] body parse error:', e.message);
    }

    console.log(`[REQUEST] ${method} ${path}`);
    
    if (method === 'OPTIONS') {
      return { statusCode: 204, headers, body: '' };
    }
    
    // Import dependencies
    const { Client } = require('pg');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
    const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

    const REGION = process.env.AWS_REGION || 'us-east-1';
    const DB_SECRET_ARN = process.env.DB_SECRET_ARN;
    const JWT_SECRET_ARN = process.env.JWT_SECRET;
    const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL;

    console.log('[CONFIG] DB_SECRET_ARN:', DB_SECRET_ARN ? '✓' : '✗');
    console.log('[CONFIG] JWT_SECRET_ARN:', JWT_SECRET_ARN ? '✓' : '✗');
    console.log('[CONFIG] SES_FROM_EMAIL:', SES_FROM_EMAIL ? '✓' : '✗');

    if (!DB_SECRET_ARN || !JWT_SECRET_ARN) {
      console.error('[ERROR] Missing required env vars');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Server misconfiguration: missing secrets' })
      };
    }

    let response;
    if (method === 'POST' && path.endsWith('/auth/register')) {
      console.log('[ROUTE] /auth/register');
      // Inline register logic to avoid function scope issues
      const { email, password, firstName, lastName, userType = 'user', phoneNumber } = body;
      
      if (!email || !password || !firstName || !lastName) {
        response = { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing required fields' }) };
      } else {
        try {
          // Get DB secret
          const sm = new SecretsManagerClient({ region: REGION });
          const dbSecretRes = await sm.send(new GetSecretValueCommand({ SecretId: DB_SECRET_ARN }));
          const dbSecret = JSON.parse(dbSecretRes.SecretString);
          console.log('[DB] Secret retrieved');

          // Connect to DB
          const client = new Client({
            host: dbSecret.host,
            port: dbSecret.port || 5432,
            user: dbSecret.username || dbSecret.user,
            password: dbSecret.password,
            database: dbSecret.dbname || dbSecret.database,
            ssl: { rejectUnauthorized: false },
          });
          
          await client.connect();
          console.log('[DB] Connected');

          // Check if email exists
          const checkRes = await client.query('SELECT id FROM users WHERE email = $1', [email]);
          if (checkRes.rowCount > 0) {
            await client.end();
            response = { statusCode: 409, body: JSON.stringify({ success: false, message: 'Email already registered' }) };
          } else {
            // Hash password and generate OTP
            const passwordHash = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

            const insertRes = await client.query(
              'INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone_number, otp_code, otp_expires_at, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
              [email, passwordHash, userType, firstName, lastName, phoneNumber || null, otp, otpExpires, 'pending_verification']
            );
            console.log('[DB] User created:', insertRes.rows[0].id);
            
            await client.end();

            // Send email (best effort, don't fail if it fails)
            try {
              const ses = new SESClient({ region: REGION });
              await ses.send(new SendEmailCommand({
                Source: SES_FROM_EMAIL,
                Destination: { ToAddresses: [email] },
                Message: {
                  Subject: { Data: 'Kash Contact - Email Verification' },
                  Body: { Html: { Data: `<h2>Verification Code</h2><p>Your code: <strong>${otp}</strong></p>` } }
                }
              }));
              console.log('[EMAIL] Sent to', email);
            } catch (emailErr) {
              console.error('[EMAIL] Failed:', emailErr.message);
            }

            response = { statusCode: 201, body: JSON.stringify({ success: true, message: 'User registered. Check email for verification code.' }) };
          }
        } catch (err) {
          console.error('[REGISTER ERROR]', err.message);
          response = { statusCode: 500, body: JSON.stringify({ success: false, message: err.message }) };
        }
      }
    } else {
      console.log('[ROUTE] Not found');
      response = { statusCode: 404, body: JSON.stringify({ success: false, message: 'Not found' }) };
    }

    console.log('[RESPONSE]', response.statusCode);
    return {
      statusCode: response.statusCode || 500,
      headers,
      body: typeof response.body === 'string' ? response.body : JSON.stringify(response.body)
    };
  } catch (err) {
    console.error('[FATAL ERROR]', err.message, err.stack);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ success: false, message: 'Internal server error: ' + err.message })
    };
  }
};
