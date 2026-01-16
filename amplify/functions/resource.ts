import { defineFunction } from '@aws-amplify/backend';

/**
 * Auth function for user registration, login, OTP verification
 * 
 * Note: VPC configuration is handled in backend.ts using CDK
 * This simpler definition works with Amplify Gen 2
 */
export const functions = {
  auth: defineFunction({
    name: 'kash-contact-auth',
    entry: './auth/index.js',
    timeoutSeconds: 30,
    memoryMB: 512,
    environment: {
      DB_SECRET_ARN: 'arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-WvyPlW',
      JWT_SECRET: 'arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-bxUZ8C',
      SES_FROM_EMAIL: 'masingita@addmoredigital.co.za',
      REGION: 'us-east-1',
    },
  }),
};
