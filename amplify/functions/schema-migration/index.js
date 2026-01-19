const { Client } = require('pg');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const fs = require('fs');

const REGION = process.env.AWS_REGION || 'us-east-1';
const DB_SECRET_ARN = process.env.DB_SECRET_ARN;

exports.handler = async (event) => {
  console.log('[SCHEMA MIGRATION] Starting...');
  
  try {
    // Get DB credentials from Secrets Manager
    const sm = new SecretsManagerClient({ region: REGION });
    const secretRes = await sm.send(new GetSecretValueCommand({ SecretId: DB_SECRET_ARN }));
    const dbSecret = JSON.parse(secretRes.SecretString);
    console.log('[DB SECRET] Retrieved');

    // Connect to database
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

    // Read schema SQL (you'll paste this inline below)
    const schemaSql = event.schemaSql || `
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums
CREATE TYPE user_type AS ENUM ('user', 'corporate', 'vendor');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');

-- Create users table
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
    deleted_at TIMESTAMP,
    
    CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
`;

    console.log('[SCHEMA] Executing SQL...');
    await client.query(schemaSql);
    console.log('[SCHEMA] Success!');

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Schema migration completed successfully'
      })
    };
  } catch (err) {
    console.error('[ERROR]', err.message, err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: err.message,
        stack: err.stack
      })
    };
  }
};
