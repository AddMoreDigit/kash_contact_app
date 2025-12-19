// src/pages/corporate/ProfilePage.tsx
import { Edit, Lock, Shield, Check, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from 'sonner';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';

// Helper component for the Circular Progress (matching the image)
const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = '#8363f2';

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900">{percentage}%</span>
      </div>
    </div>
  );
};


// --- ProfilePage Component ---

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export function ProfilePage({ onNavigate, onLogout }: ProfilePageProps) {
  // Hardcode data to match the image precisely
  const profileData = {
    fullName: "Addmore Digital",
    primaryUser: "Primary User",
    recoveryEmail: "vukonahlayisi@gmail.com",
    // These are placeholders for visual structure, their values are not displayed in the image
    email: "", 
    phone: "",
    address: "",
  };

  const corporateInfo = [
    { label: "Full names", value: profileData.fullName },
    { label: "Email", value: "" }, // Placeholder for blank line
    { label: "Phone number", value: "" }, // Placeholder for blank line
    { label: "Address", value: "" }, // Placeholder for blank line
  ];
  
  const securityInfo = [
    { label: "Password", value: "**********", editable: true },
    { label: "Two-Factor Authentication", value: "Off", editable: false },
    { label: "Recovery Email", value: profileData.recoveryEmail, editable: false },
  ];

  // Completion data and total percentage based on the image
  const profileCompletion = [
    { task: "Setup Account", percentage: 50, done: true },
    { task: "Upload your photo", percentage: 5, done: true },
    { task: "Personal information", percentage: 5, done: true },
    { task: "Location", percentage: 5, done: true },
    { task: "Bank Details", percentage: 100, done: true },
  ];

  const totalCompletionPercentage = profileCompletion.reduce((sum, item) => sum + (item.done ? item.percentage : 0), 0);


  const handleEditProfile = () => {
    toast.info('Edit Profile feature coming soon');
  };

  const handleEditSecurity = () => {
    toast.info('Edit Security feature coming soon');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CorporateSidebar 
        activePage="corporateProfile" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your corporate account information</p>
            </div>
            <button
              onClick={() => onNavigate('createCampaign')}
              className="px-6 py-2 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1] transition-colors"
            >
              Create Campaign
            </button>
          </div>
        </div>
      <div className="p-6">
        {/* Banner Image Area - Replicating the look of the banner in the image */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-8">
            <img 
                src="placeholder_for_web_design_banner.jpg" // Placeholder for the actual banner image in image_a17978.png
                alt="Web Design and Coding Banner"
                className="w-full h-full object-cover"
                style={{ backgroundImage: "url('https://i.imgur.com/gK9qQ4D.png')" }} // A generic image for visual match
            />
            {/* Logo and Primary Info overlay */}
            <div className="absolute top-0 left-0 p-6 flex items-end w-full h-full">
                <div className="flex items-center">
                    {/* Logo/Avatar */}
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-purple-600 flex items-center justify-center">
                             {/* Placeholder for the 'AZ' logo - adjust color/content if needed */}
                             <span className="text-white font-extrabold text-xl">AZ</span>
                        </div>
                    </div>
                    {/* Primary Info */}
                    <div className="ml-4 pt-10">
                        <h2 className="text-2xl font-bold text-gray-900 leading-none">{profileData.fullName}</h2>
                        <p className="text-sm text-gray-600">{profileData.primaryUser}</p>
                    </div>
                    {/* Edit button next to name */}
                    <button 
                        onClick={handleEditProfile}
                        className="ml-3 text-gray-400 hover:text-[#8363f2] transition-colors flex items-center"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Corporate Information and Security */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Corporate Information Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Corporate information</h3>
                <button onClick={handleEditProfile} className="text-[#8363f2] text-sm flex items-center hover:text-[#7054dd]">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="space-y-4 text-gray-700">
                {corporateInfo.map((item, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="border-b py-2">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                <button onClick={handleEditSecurity} className="text-[#8363f2] text-sm flex items-center hover:text-[#7054dd]">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                </button>
              </div>
              <div className="space-y-4 text-gray-700">
                {securityInfo.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center py-2 border-b">
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-sm text-gray-600">
                            {item.label === "Password" ? "**********" : item.value}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Completion */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Profile</h3>
              
              {/* Completion List */}
              <div className="space-y-3">
                {profileCompletion.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                        {item.done ? (
                            <Check className="w-4 h-4 text-[#8363f2] mr-2" />
                        ) : (
                            <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        )}
                        <span className={`text-sm ${item.done ? 'text-gray-900' : 'text-gray-600'}`}>
                            {item.task}
                        </span>
                    </div>
                    <span className={`text-sm font-medium ${item.percentage === 100 ? 'text-[#8363f2]' : 'text-gray-600'}`}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Progress Circle */}
              <div className="mt-8 flex justify-center items-center">
                <CircularProgress percentage={totalCompletionPercentage} />
              </div>

            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}