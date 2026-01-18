// DIAGNOSTIC HANDLER - tells us what's wrong
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Content-Type': 'application/json',
  };

  console.log('=== DIAGNOSTIC HANDLER ===');
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Environment Variables:', {
    DB_SECRET_ARN: process.env.DB_SECRET_ARN ? '✓ SET' : '✗ MISSING',
    JWT_SECRET: process.env.JWT_SECRET ? '✓ SET' : '✗ MISSING',
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL || 'not set',
    REGION: process.env.AWS_REGION || process.env.REGION || 'us-east-1',
    NODE_ENV: process.env.NODE_ENV || 'production',
  });

  const http = event.requestContext?.http || {};
  const method = http.method || event.requestContext?.httpMethod || event.httpMethod || 'GET';
  const path = http.path || event.rawPath || event.path || '/';

  // Handle OPTIONS
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Test Secrets Manager
  let smTest = { status: 'not-tested' };
  try {
    console.log('Testing Secrets Manager access...');
    const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
    const sm = new SecretsManagerClient({ region: process.env.AWS_REGION || 'us-east-1' });
    
    if (process.env.DB_SECRET_ARN) {
      const cmd = new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN });
      const res = await sm.send(cmd);
      smTest = { status: 'success', hasSecret: !!res.SecretString };
    }
  } catch (err) {
    console.error('SM Error:', err);
    smTest = { status: 'failed', error: err.message };
  }

  // Test database connection
  let dbTest = { status: 'not-tested' };
  try {
    console.log('Testing database connection...');
    const { Client } = require('pg');
    const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
    const sm = new SecretsManagerClient({ region: process.env.AWS_REGION || 'us-east-1' });
    
    if (process.env.DB_SECRET_ARN) {
      const cmd = new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN });
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
      dbTest = { status: 'success', connected: true };
      await client.end();
    }
  } catch (err) {
    console.error('DB Error:', err);
    dbTest = { status: 'failed', error: err.message };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Diagnostic information',
      path,
      method,
      environmentStatus: {
        DB_SECRET_ARN: process.env.DB_SECRET_ARN ? '✓ SET' : '✗ MISSING',
        JWT_SECRET: process.env.JWT_SECRET ? '✓ SET' : '✗ MISSING',
      },
      secretsManagerTest: smTest,
      databaseTest: dbTest,
      timestamp: new Date().toISOString(),
    }, null, 2)
  };
};
