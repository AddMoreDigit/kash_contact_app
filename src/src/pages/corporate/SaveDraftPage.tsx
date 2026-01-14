import { ArrowLeft, Edit, Target, Users, Calendar } from 'lucide-react';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface SaveDraftPageProps {
  onNavigate: (page: Page) => void;
}

export default function SaveDraftPage({ onNavigate }: SaveDraftPageProps) {
  const drafts = [
    {
      name: "Magalies park getaway weekend",
      rating: "★★",
      reviews: 24,
      step: 3,
      goal: 10000,
      members: 3,
      provider: "Magalies Hotel",
    },
    {
      name: "Gold reef city team building",
      rating: "★★★★★",
      reviews: "100k",
      step: 1,
      goal: 18000,
      members: 8,
      provider: "Magalies Hotel",
    },
    {
      name: "Cape Town Corporate Retreat",
      rating: "★★★★",
      reviews: 156,
      step: 2,
      goal: 25000,
      members: 5,
      provider: "Seaview Lodge",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("corporateDashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Save as draft</h1>
              <p className="text-gray-600">
                These are the campaigns you've started but not completed, continue editing to finish and launch your campaign
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("createCampaign")}
            className="btn-primary"
          >
            + Create New
          </button>
        </div>

        <div className="space-y-6">
          {drafts.map((draft, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden hover-card">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center mb-2">
                      <h2 className="text-lg font-bold mr-3">{draft.name}</h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">{draft.rating}</span>
                        <span className="text-sm text-gray-600">({draft.reviews} reviews)</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Step {draft.step} of 4
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">Service Provider: {draft.provider}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate("createCampaign")}
                    className="btn-outline flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Continue Editing
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Goal Amount</div>
                      <div className="text-sm text-gray-600">R{draft.goal.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Team Members</div>
                      <div className="text-sm text-gray-600">{draft.members} members</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Progress</span>
                      <span>{Math.round((draft.step / 4) * 100)}%</span>
                    </div>
                    <div className="campaign-progress">
                      <div 
                        className="campaign-progress-fill" 
                        style={{ width: `${(draft.step / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Last edited: 2 days ago
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete Draft
                    </button>
                    <button 
                      onClick={() => onNavigate("createCampaign")}
                      className="text-[#8363f2] hover:text-[#7354e1] text-sm"
                    >
                      Continue Editing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {drafts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">No drafts found</h3>
            <p className="text-gray-600 mb-6">
              You haven't saved any campaigns as drafts yet.
            </p>
            <button
              onClick={() => onNavigate("createCampaign")}
              className="btn-primary"
            >
              Create Your First Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
}