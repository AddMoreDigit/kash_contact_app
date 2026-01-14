import { defineFunction } from '@aws-amplify/backend';

/**
 * Register function resources for Amplify Gen 2 backend.
 *
 * The function entry path is relative to this file's directory, so we point
 * to `./auth/index.js` where your handler is scaffolded.
 *
 * Environment values here are placeholders. You should set real values
 * (Secrets Manager ARN, JWT secret, SES from email, region) in the
 * deployment environment or via the Amplify console before deploy.
 */
export const functions = {
  auth: defineFunction({
    name: 'auth',
    // entry is resolved relative to this resource file
    entry: './auth/index.js',
    // Node runtime version (22 is supported by backend-function)
    runtime: 22,
    timeoutSeconds: 30,  // Increased for VPC cold starts
    memoryMB: 512,
    
    // VPC Configuration for private RDS access
    // RDS: kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com
    // VPC: vpc-09a5094b22e709eef (NOT publicly accessible)
    vpc: 'vpc-09a5094b22e709eef',
    vpcSubnets: [
      'subnet-0776664d0cfde061d',
      'subnet-01be8a792ca58d61a',
      'subnet-0c9a7acf29d110f36',
      'subnet-0bc772da845b664ae',
      'subnet-0b3dbf907234ac3f3',
      'subnet-08cd9157ebf048b76'
    ],
    securityGroups: ['sg-0655ac897b884d2ce'],
    
    environment: {
        // Database credentials from Secrets Manager
        DB_SECRET_ARN: 'arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-WvyPlW',
        // JWT secret from Secrets Manager
        JWT_SECRET: 'arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-bxUZ8C',
        // SES sender email (verified)
        SES_FROM_EMAIL: 'masingita@addmoredigital.co.za',
        AWS_REGION: 'us-east-1',
    },
  }),
};
