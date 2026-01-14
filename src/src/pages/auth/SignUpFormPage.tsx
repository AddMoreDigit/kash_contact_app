import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../../components/layout';
import { registerUser } from '../../lib/auth';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType';

interface SignUpFormPageProps {
  onNavigate: (page: Page) => void;
  accountType: 'user' | 'vendor' | 'corporate';
  onSignUpComplete?: (email: string) => void;
}

export function SignUpFormPage({ onNavigate, accountType, onSignUpComplete }: SignUpFormPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error('Please enter your first name');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Please enter your last name');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      toast.error('Password must contain uppercase, lowercase, number, and special character');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await registerUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        accountType,
      });

      if (result.success) {
        toast.success('Account created successfully! Please check your email for verification code.');
        if (onSignUpComplete) {
          onSignUpComplete(formData.email);
        }
        onNavigate('otpVerification');
      } else {
        toast.error(result.error || 'Failed to create account');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeLabel = () => {
    switch (accountType) {
      case 'user': return 'User';
      case 'vendor': return 'Vendor';
      case 'corporate': return 'Corporate';
    }
  };

  return (
    <div className="bg-white flex w-full min-h-screen">
      {/* Left Section */}
      <div className="w-[49%] bg-[#E5DEFF] relative flex flex-col py-8 px-12">
        <button
          onClick={() => onNavigate('signup')}
          className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center">
            <ArrowLeft size={20} />
          </div>
          <span className="text-black text-base">back</span>
        </button>

        <div className="bg-black flex-1 flex flex-col justify-center px-12 rounded-lg">
          <h1 className="text-white text-4xl mb-4">Welcome</h1>
          <h2 className="text-white text-6xl mb-6">Join as {getAccountTypeLabel()}</h2>
          <p className="text-white text-lg">
            Fill in your details to create your account
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-[51%] bg-white flex flex-col items-center py-12 px-16 overflow-auto">
        <div className="mb-8">
          <Logo className="h-10" />
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-3xl text-black mb-2 text-center">Create Account</h2>
          <p className="text-gray-600 mb-8 text-center">Sign up as {getAccountTypeLabel()}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#8363F2]"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#8363F2]"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#8363F2]"
                placeholder="john.doe@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#8363F2] pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min 8 characters, uppercase, lowercase, number, and special character
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#8363F2] pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8363F2] text-white py-3 rounded-xl hover:bg-[#7954FB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-6"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#8363f2] underline hover:opacity-80"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
