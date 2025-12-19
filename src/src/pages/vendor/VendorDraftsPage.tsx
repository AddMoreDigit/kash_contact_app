import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { FileText, Edit, Trash2, Clock, CheckCircle, Plus, Save } from 'lucide-react';

type Page = 
  | "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" 
  | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" 
  | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" 
  | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" 
  | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" 
  | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" 
  | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" 
  | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" 
  | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" 
  | "corporateHelpSupport" | "saveDraft" | "selectUserType" | "corporateVouchers" 
  | "vendorOverview" | "myServices" | "createService" | "reportOrders" | "approveBooking" 
  | "vendorCampaigns" | "vendorTransactions" | "vendorProfile" | "vendorDrafts" 
  | "vendorHelpSupport" | "vendorMessages" | "createVoucher" | "editBooking" 
  | "vendorViewCampaign" | "vendorInvoice" | "createSubAdmin";

interface VendorDraftsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface DraftItem {
  id: string;
  title: string;
  type: string;
  lastUpdated: string;
  progress: number;
  status: 'inProgress' | 'ready';
}

export const VendorDraftsPage: React.FC<VendorDraftsPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorDrafts');

  const drafts: DraftItem[] = [
    { id: 'DR-001', title: 'Summer Special Voucher', type: 'Voucher', lastUpdated: 'Jan 12, 2026', progress: 70, status: 'inProgress' },
    { id: 'DR-002', title: 'Cape Town Weekend Package', type: 'Campaign', lastUpdated: 'Jan 5, 2026', progress: 45, status: 'inProgress' },
    { id: 'DR-003', title: 'Airport Shuttle Premium', type: 'Service', lastUpdated: 'Dec 28, 2025', progress: 100, status: 'ready' },
  ];

  const inProgressCount = drafts.filter(d => d.status === 'inProgress').length;
  const readyCount = drafts.filter(d => d.status === 'ready').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Drafts</h1>
            <p className="text-gray-600">Save work-in-progress vouchers, services, or campaigns</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('createVoucher')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
            >
              <Plus size={16} />
              New Voucher
            </button>
            <button
              onClick={() => onNavigate('createService')}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:border-[#8363f2] hover:text-[#8363f2] transition-colors"
            >
              <FileText size={16} />
              New Service
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total drafts</p>
            <p className="text-2xl font-bold mt-1">{drafts.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">In progress</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{inProgressCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Ready to submit</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{readyCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 text-gray-700 font-semibold">
              <FileText size={18} /> Draft Items
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Clock size={16} /> Auto-saved regularly
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {drafts.map((draft) => (
              <div key={draft.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                    {draft.type.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{draft.title}</p>
                    <p className="text-sm text-gray-500">{draft.type} • Updated {draft.lastUpdated}</p>
                    <div className="mt-2 w-52 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-2 bg-[#8363f2]" style={{ width: `${draft.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {draft.status === 'ready' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      <CheckCircle size={14} /> Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      <Save size={14} /> In progress
                    </span>
                  )}
                  <button
                    onClick={() => onNavigate('vendorViewCampaign')}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm text-[#8363f2] border border-[#8363f2] rounded-lg hover:bg-[#8363f2] hover:text-white transition-colors"
                  >
                    <Edit size={14} /> Resume
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                    title="Delete draft"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
