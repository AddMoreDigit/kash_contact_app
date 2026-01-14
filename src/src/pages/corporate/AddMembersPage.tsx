import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface AddMembersPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

const mockMembers = [
    { name: "Alicia Jones", role: "Admin" },
    { name: "Ayanda Khumalo", role: "Contributor" },
];

const mockSponsors = [
    { name: "Kash Contact Group", type: "Corporate Sponsor" },
    { name: "Chibulo Moonde", type: "Individual Sponsor" },
];

export default function AddMembersPage({ onNavigate, onLogout }: AddMembersPageProps) {
  const [members, setMembers] = useState(mockMembers);
  const [sponsors, setSponsors] = useState(mockSponsors);

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const removeSponsor = (index: number) => {
    setSponsors(sponsors.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CorporateSidebar 
        activePage="corporateCampaigns" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add Members</h1>
            <p className="text-sm text-gray-600 mt-1">Invite team members to manage campaign & sponsors to sponsor it</p>
          </div>

          {/* Two Column Layout */}
          <div className="flex space-x-8">
            {/* Left Column: Add Members (Team) */}
            <div className="flex-1 min-w-0 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Members</h3>
                
                {/* Search Input */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by email or username"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                {/* Role Dropdown and Invite Button */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="flex-1">
                        <div className="relative">
                            <select
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 appearance-none focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                            >
                                <option value="" disabled selected>Role</option>
                                <option value="admin">Admin</option>
                                <option value="contributor">Contributor</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1] transition duration-150">
                        Invites
                    </button>
                </div>
                
                {/* Current Members List */}
                <div className="space-y-4">
                    {members.map((member, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 leading-tight">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeMember(index)}
                                className="text-gray-400 hover:text-red-500 p-1 transition duration-150"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Add Sponsor */}
            <div className="flex-1 min-w-0 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Sponsor</h3>
                
                {/* Search Input */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by compony name or Sponsor"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                {/* Sponsor Type Dropdown and Add Button */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="flex-1">
                        <div className="relative">
                            <select
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 appearance-none focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                            >
                                <option value="" disabled selected>Sponsor Type</option>
                                <option value="corporate">Corporate Sponsor</option>
                                <option value="individual">Individual Sponsor</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1] transition duration-150">
                        Add sponsor
                    </button>
                </div>

                {/* Current Sponsors List */}
                <div className="space-y-4">
                    {sponsors.map((sponsor, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center space-x-3">
                                {/* Placeholder for logo/avatar */}
                                <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                                     {sponsor.name === "Kash Contact Group" ? 'U' : sponsor.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 leading-tight">{sponsor.name}</p>
                                    <p className="text-sm text-gray-500">{sponsor.type}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeSponsor(index)}
                                className="text-gray-400 hover:text-red-500 p-1 transition duration-150"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => onNavigate("corporateCampaigns")}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Back
            </button>
            <button
              onClick={() => {
                alert('Members and sponsors saved successfully!');
                onNavigate("corporateCampaigns");
              }}
              className="px-6 py-2.5 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}