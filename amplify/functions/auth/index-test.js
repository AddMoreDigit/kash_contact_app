const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const REGION = process.env.AWS_REGION || process.env.REGION || 'us-east-1';
const DB_SECRET_ARN = process.env.DB_SECRET_ARN;

const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Max-Age': '300',
  'Content-Type': 'application/json',
});

exports.handler = async (event) => {
  const headers = getCorsHeaders();
  
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  // Handle OPTIONS
  const http = event.requestContext?.http || {};
  const method = http.method || event.requestContext?.httpMethod || event.httpMethod || 'GET';
  
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }
  
  // Diagnostic info
  const diagnostics = {
    timestamp: new Date().toISOString(),
    region: REGION,
    hasDbSecret: !!DB_SECRET_ARN,
    dbSecretArn: DB_SECRET_ARN,
    envVars: Object.keys(process.env),
    method: method,
    path: http.path || event.rawPath || event.path || '/',
  };
  
  console.log('Diagnostics:', JSON.stringify(diagnostics, null, 2));
  
  // Test Secrets Manager access
  if (DB_SECRET_ARN) {
    try {
      const sm = new SecretsManagerClient({ region: REGION });
      const cmd = new GetSecretValueCommand({ SecretId: DB_SECRET_ARN });
      const res = await sm.send(cmd);
      diagnostics.secretsManagerAccess = 'SUCCESS';
      diagnostics.secretHasContent = !!res.SecretString;
    } catch (err) {
      diagnostics.secretsManagerAccess = 'FAILED';
      diagnostics.secretsManagerError = err.message;
      console.error('Secrets Manager error:', err);
    }
  }
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true, diagnostics }, null, 2)
  };
};
