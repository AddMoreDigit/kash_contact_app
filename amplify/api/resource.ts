import { defineBackend } from '@aws-amplify/backend';
import { defineFunction } from '@aws-amplify/backend';

/**
 * Minimal API manifest for Amplify Gen‑2.
 *
 * NOTE: Amplify's Gen‑2 API helper may differ across versions. This file
 * registers simple HTTP route metadata that the Amplify CLI will use to
 * create an HTTP API and route requests to the `auth` function.
 *
 * If your installed `@aws-amplify/backend` does not support HTTP API
 * manifests, you can still create an API via the Amplify Console or
 * define a CDK stack. This manifest is the recommended starting point
 * for a Gen‑2 workflow.
 */

// export an object named `api` that defineBackend will pick up
export const api = {
  // describe a single http API named `authApi`
  authApi: {
    // list of routes. Amplify will create an HTTP API (API Gateway v2)
    // and attach integrations to the function named `auth`.
    routes: [
      {
        path: '/auth/register',
        method: 'POST',
        function: 'auth',
      },
      {
        path: '/auth/verify-email',
        method: 'POST',
        function: 'auth',
      },
      {
        path: '/auth/login',
        method: 'POST',
        function: 'auth',
      },
      {
        path: '/auth/resend-otp',
        method: 'POST',
        function: 'auth',
      },
    ],
  },
};
