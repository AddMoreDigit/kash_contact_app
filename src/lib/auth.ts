import { signUp, signIn, signOut, confirmSignUp, type SignUpInput } from 'aws-amplify/auth';

export interface SignUpParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  accountType: 'user' | 'vendor' | 'corporate';
}

export interface SignInParams {
  email: string;
  password: string;
}

/**
 * Register a new user with AWS Cognito
 */
export async function registerUser({ email, password, firstName, lastName, accountType }: SignUpParams) {
  try {
    const signUpParams: SignUpInput = {
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          'custom:accountType': accountType,
          ...(firstName && { given_name: firstName }),
          ...(lastName && { family_name: lastName }),
        },
      },
    };

    const { isSignUpComplete, userId, nextStep } = await signUp(signUpParams);

    return {
      success: true,
      isSignUpComplete,
      userId,
      nextStep,
      requiresVerification: nextStep.signUpStep === 'CONFIRM_SIGN_UP',
    };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign up',
    };
  }
}

/**
 * Verify user email with confirmation code
 */
export async function verifyEmail(email: string, code: string) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });

    return {
      success: true,
      isSignUpComplete,
      nextStep,
    };
  } catch (error: any) {
    console.error('Error confirming sign up:', error);
    return {
      success: false,
      error: error.message || 'Failed to verify email',
    };
  }
}

/**
 * Sign in existing user
 */
export async function loginUser({ email, password }: SignInParams) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    return {
      success: true,
      isSignedIn,
      nextStep,
    };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in',
    };
  }
}

/**
 * Sign out current user
 */
export async function logoutUser() {
  try {
    await signOut();
    localStorage.removeItem('isAuthenticated');
    return { success: true };
  } catch (error: any) {
    console.error('Error signing out:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign out',
    };
  }
}

/**
 * Backend API helpers (RDS + SES OTP flow)
 */

async function getApiBaseUrl(): Promise<string> {
  // Prefer environment variable
  const envUrl = (import.meta as any).env?.VITE_AUTH_API_URL;
  if (envUrl) return envUrl as string;

  // Fall back to amplify_outputs.json if it contains http_api_url
  try {
    const res = await fetch('/amplify_outputs.json');
    if (res.ok) {
      const json = await res.json();
      if (json && json.http_api_url) return json.http_api_url as string;
    }
  } catch (e) {
    // ignore
  }

  throw new Error('Auth API base URL not configured. Set VITE_AUTH_API_URL or add http_api_url to amplify_outputs.json.');
}

export async function registerUserViaApi({ email, password, firstName, lastName, accountType }: SignUpParams) {
  try {
    const base = await getApiBaseUrl();
    const res = await fetch(`${base}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, userType: accountType }),
    });
    const data = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));
    if (!res.ok || !data.success) {
      return { success: false, error: data.message || 'Failed to register' };
    }
    return { success: true };
  } catch (error: any) {
    console.error('API register error:', error);
    return { success: false, error: error.message || 'Failed to register' };
  }
}

export async function verifyEmailViaApi(email: string, code: string) {
  try {
    const base = await getApiBaseUrl();
    const res = await fetch(`${base}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otpCode: code }),
    });
    const data = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));
    if (!res.ok || !data.success) {
      return { success: false, error: data.message || 'Failed to verify email' };
    }
    return { success: true };
  } catch (error: any) {
    console.error('API verify error:', error);
    return { success: false, error: error.message || 'Failed to verify email' };
  }
}

export async function resendOtpViaApi(email: string) {
  try {
    const base = await getApiBaseUrl();
    const res = await fetch(`${base}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));
    if (!res.ok || !data.success) {
      return { success: false, error: data.message || 'Failed to resend code' };
    }
    return { success: true };
  } catch (error: any) {
    console.error('API resend error:', error);
    return { success: false, error: error.message || 'Failed to resend code' };
  }
}
