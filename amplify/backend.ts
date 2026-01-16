import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { functions } from './functions/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  functions,
});

// Amplify Gen 2 backend definition complete
// The Lambda function is defined in amplify/functions/resource.ts
// VPC configuration will be applied via AWS Console after initial deployment
// (Amplify's CDK integration doesn't support complex VPC lookups in this context)

