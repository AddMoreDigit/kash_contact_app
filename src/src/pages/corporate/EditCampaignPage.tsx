import { useState } from 'react';
import { X, Edit } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface EditCampaignPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export default function EditCampaignPage({ onNavigate, onLogout }: EditCampaignPageProps) {
  const initialGoal = 25000;
  const initialCurrentAmount = 10000;
  const initialProgress = Math.round((initialCurrentAmount / initialGoal) * 100);

  const [campaignData, setCampaignData] = useState({
    name: "Swiss Adventure",
    description: "Raise Funds for an Inclusive Accommodation, Food, Transport and Activities Trip for 50 beneficiaries to Cape Town",
    goal: initialGoal,
    currentAmount: initialCurrentAmount,
    progress: initialProgress,
    sponsors: [
      { name: "Sponsor A", contribution: 10000 },
      { name: "Sponsor B", contribution: 15000 },
    ]
  });

  const progressPercentage = Math.min(100, (campaignData.currentAmount / campaignData.goal) * 100);

  // Handler for sponsor removal (to simulate the X button)
  const removeSponsor = (index: number) => {
    setCampaignData(prev => ({
      ...prev,
      sponsors: prev.sponsors.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field: string, value: string | number) => {
    let newGoal = campaignData.goal;
    let newCurrentAmount = campaignData.currentAmount;
    
    // Update the relevant field
    const newData = { ...campaignData, [field]: value };

    // Recalculate based on changed goal or current amount
    if (field === 'goal') {
      newGoal = typeof value === 'string' ? parseInt(value) || 0 : value as number;
    } else if (field === 'currentAmount') {
      newCurrentAmount = typeof value === 'string' ? parseInt(value) || 0 : value as number;
    }

    const newProgress = newGoal > 0 ? Math.round((newCurrentAmount / newGoal) * 100) : 0;

    setCampaignData({ ...newData, progress: newProgress, goal: newGoal, currentAmount: newCurrentAmount });
  };


  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <CorporateSidebar 
            activePage="corporateCampaigns" 
            onNavigate={onNavigate} 
            onLogout={onLogout}
        />

        {/* 2. Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
            
            {/* Fixed Container to center the Edit Campaign card */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                
                {/* Header (Top of the Card) */}
                <div className="px-8 py-6 border-b flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
                    <button 
                        onClick={() => onNavigate('viewCampaign')}
                        className="text-gray-400 hover:text-gray-700"
                    >
                         <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Main 2-Column Grid (Campaign Info and Sponsors) */}
                <div className="p-8 grid grid-cols-2 gap-10">
                    
                    {/* LEFT Column: Campaign Name, Goal, Description */}
                    <div className="space-y-6">
                        {/* Campaign Name */}
                        <div>
                            <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 mb-2">
                                Campaign name
                            </label>
                            <input
                                id="campaign-name"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8363f2] focus:border-[#8363f2]"
                                value={campaignData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>

                        {/* Goal */}
                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                                Goal
                            </label>
                            <input
                                id="goal"
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8363f2] focus:border-[#8363f2]"
                                value={campaignData.goal}
                                onChange={(e) => handleInputChange('goal', parseInt(e.target.value) || 0)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:ring-[#8363f2] focus:border-[#8363f2]"
                                value={campaignData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>

                        {/* Progress Display (Bottom Left) */}
                        <div className="pt-2">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Progress</h3>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">R{campaignData.currentAmount.toLocaleString()} / R{campaignData.goal.toLocaleString()}</span>
                                <span className="font-semibold text-[#8363f2]">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-[#8363f2] h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT Column: Sponsors Table */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Sponsors</h3>
                        
                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            <th className="py-2 pr-4">Sponsors</th>
                                            <th className="py-2 pr-4">Contribution</th>
                                            <th className="py-2 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {campaignData.sponsors.map((sponsor, index) => (
                                            <tr key={index} className="border-t border-gray-200">
                                                <td className="py-2 text-sm text-gray-900">{sponsor.name}</td>
                                                <td className="py-2 text-sm text-gray-700">R{sponsor.contribution.toLocaleString()}</td>
                                                <td className="py-2 text-center">
                                                    <button 
                                                        onClick={() => removeSponsor(index)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <button className="mt-4 text-[#8363f2] hover:text-[#7354e1] text-sm font-medium flex items-center">
                                + Add Sponsor
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons (Bottom of the Card) */}
                <div className="px-8 py-6 bg-gray-50 border-t flex justify-end space-x-4">
                    <button
                        onClick={() => onNavigate("cancelCampaign")}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onNavigate("viewCampaign")}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                        Back to Campaign
                    </button>
                    <button 
                        onClick={() => alert('Changes Updated!')}
                        className="px-6 py-2.5 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors font-medium flex items-center"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Update Changes
                    </button>
                </div>

            </div>
        </main>
    </div>
  );
}