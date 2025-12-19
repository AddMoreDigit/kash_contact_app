import { useState } from 'react';
import { X } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface CancelCampaignPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export default function CancelCampaignPage({ onNavigate, onLogout }: CancelCampaignPageProps) {
  const [confirmText, setConfirmText] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [notes, setNotes] = useState("");
  const [notifyParticipants, setNotifyParticipants] = useState(true);

  const handleCancel = () => {
    if (confirmText === "CANCEL") {
      alert("Campaign cancelled successfully");
      onNavigate("corporateCampaigns");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CorporateSidebar 
        activePage="corporateCampaigns" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="px-8 py-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Cancel Campaign</h2>
          <button
            onClick={() => onNavigate("editCampaign")}
            className="text-gray-400 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <p className="text-sm text-gray-600 mb-6">
            you are about to cancel cape town trip,this action cannot be undone
          </p>

          {/* Campaign Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Campaign Summary</h3>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Name</div>
                  <div className="font-semibold text-gray-900">Cape town Trip</div>
                  
                  <div className="text-sm font-medium text-gray-700 mt-4 mb-1">Dates</div>
                  <div className="text-gray-900">Nov 01,20  To  Feb 10,2025</div>
                  
                  <div className="text-sm font-medium text-gray-700 mt-4 mb-1">Goal</div>
                  <div className="font-semibold text-gray-900">R10 000</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Contribution</div>
                  <div className="font-semibold text-gray-900 mb-2">R10 000 Raised (70%)</div>
                  
                  <div className="text-sm font-medium text-gray-700 mb-2">Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#8363f2] h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-purple-800">
                  Cancelling will notify Sponsor ,Vendors and campaign member ,refund may apply
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation Detail */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancellation Detail</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason For Cancellation
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option value="budget">Budget constraints</option>
                  <option value="change">Change in plans</option>
                  <option value="vendor">Vendor issues</option>
                  <option value="engagement">Low engagement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="notify"
                  checked={notifyParticipants}
                  onChange={(e) => setNotifyParticipants(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#8363f2] border-gray-300 rounded focus:ring-[#8363f2]"
                />
                <label htmlFor="notify" className="ml-2 text-sm text-gray-700">
                  I understand participants will notify
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-[#8363f2] focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Add any additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type CANCEL to Confirm
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  placeholder=""
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t flex justify-end space-x-4">
          <button
            onClick={() => onNavigate("editCampaign")}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Back
          </button>
          <button
            onClick={handleCancel}
            disabled={confirmText !== "CANCEL" || !cancellationReason}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              confirmText === "CANCEL" && cancellationReason
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm Cancel
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}