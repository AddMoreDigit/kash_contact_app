import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { functions } from './functions/resource';
import { Stack } from 'aws-cdk-lib';
import { HttpApi, HttpMethod, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  functions,
});

// Get the auth Lambda function
const authLambda = backend.functions.auth.resources.lambda;

// Add VPC configuration to Lambda
const vpc = ec2.Vpc.fromLookup(Stack.of(authLambda), 'ExistingVPC', {
  vpcId: 'vpc-09a5094b22e709eef',
});

const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(
  Stack.of(authLambda),
  'ExistingSecurityGroup',
  'sg-0655ac897b884d2ce'
);

// Add VPC config
authLambda.addToRolePolicy(new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: [
    'ec2:CreateNetworkInterface',
    'ec2:DescribeNetworkInterfaces',
    'ec2:DeleteNetworkInterface',
    'ec2:AssignPrivateIpAddresses',
    'ec2:UnassignPrivateIpAddresses'
  ],
  resources: ['*'],
}));

// Add Secrets Manager permissions
authLambda.addToRolePolicy(new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: [
    'secretsmanager:GetSecretValue',
    'secretsmanager:DescribeSecret'
  ],
  resources: [
    'arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-*',
    'arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-*'
  ],
}));

// Add SES permissions
authLambda.addToRolePolicy(new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: [
    'ses:SendEmail',
    'ses:SendRawEmail'
  ],
  resources: ['*'],
}));

// Create HTTP API Gateway for auth endpoints
const apiStack = backend.createStack('http-api-stack');

// Create the HTTP API
const httpApi = new HttpApi(apiStack, 'AuthHttpApi', {
  apiName: 'kash-contact-auth-api',
  description: 'HTTP API for authentication and OTP verification',
  corsPreflight: {
    allowOrigins: ['*'],
    allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.OPTIONS],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token'],
    maxAge: 300,
  },
});

// Create Lambda integration
const authIntegration = new HttpLambdaIntegration(
  'AuthIntegration',
  backend.functions.auth.resources.lambda
);

// Add routes
httpApi.addRoutes({
  path: '/auth/{proxy+}',
  methods: [HttpMethod.POST, HttpMethod.OPTIONS],
  integration: authIntegration,
});

// Output the API URL
backend.addOutput({
  custom: {
    httpApiUrl: httpApi.url,
  },
});

