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
