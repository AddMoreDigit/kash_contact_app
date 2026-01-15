import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { functions } from './functions/resource';
import { Stack } from 'aws-cdk-lib';
import { HttpApi, HttpMethod, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  functions,
});

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

