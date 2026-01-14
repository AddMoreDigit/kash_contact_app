import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType" | "corporateVouchers";

interface CorporateHelpSupportPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

const faqs = [
  {
    id: 1,
    question: 'How do I create a campaign ?',
    answer: 'To create a new campaign,go to campaign section and click on the "new campaign" button,follow the on-screen instructions to set up your new campaigns',
  },
  {
    id: 2,
    question: 'How can I redeem a voucher',
    answer: 'To redeem a voucher, go to the Vouchers section and select the voucher you want to use. Follow the redemption instructions provided.',
  },
  {
    id: 3,
    question: 'What should I do is transaction is pending',
    answer: 'If a transaction is pending, please wait for it to be processed. This typically takes 24-48 hours. If it remains pending longer, contact support.',
  },
  {
    id: 4,
    question: 'How to add member on the campaigns',
    answer: 'To add a member to your campaign, go to the campaign details page and click on "Add Member". Enter their details and send an invitation.',
  },
];

const guides = [
  { id: 1, title: 'Onboarding Guide' },
  { id: 2, title: 'Managing campaigns' },
  { id: 3, title: 'Using Vouchers' },
  { id: 4, title: 'Transaction insights' },
];

export default function CorporateHelpSupportPage({ onNavigate, onLogout }: CorporateHelpSupportPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-[#F5F5FA]">
      {/* Sidebar */}
      <CorporateSidebar activePage="corporateHelpSupport" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back Arrow */}
            <button 
              onClick={() => onNavigate('corporateDashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 ml-6">
              {/* Create Campaign Button */}
              <button 
                onClick={() => onNavigate('createCampaign')}
                className="bg-[#8363f2] text-white px-4 py-2 rounded-lg text-[14px] hover:bg-[#7354e1] transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Campaign
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Cart */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>

              {/* Profile */}
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-white p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-[20px] mb-8">Help & Support</h1>

            <div className="grid grid-cols-3 gap-6">
              {/* FAQ Section */}
              <div className="col-span-2">
                <h2 className="text-[16px] mb-4">Frequently Ask Questions</h2>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-[14px] text-gray-900">{faq.question}</span>
                        {openFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-4 pb-4 text-[14px] text-gray-600 bg-purple-50 border-t border-purple-100">
                          <p className="pt-3">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Customer Support */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-[#8363f2]" />
                    <h3 className="text-[16px]">Customer Support</h3>
                  </div>
                  <button className="w-full py-2.5 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors mb-4 text-[14px]">
                    Chat with us
                  </button>
                  <div className="text-[14px] space-y-1">
                    <p className="text-gray-600">Help@kcashcontact.co.za</p>
                    <p className="text-gray-600">+27 800005289</p>
                  </div>
                </div>

                {/* Guide & Tutorials */}
                <div>
                  <h3 className="text-[16px] mb-3">Guide & Tutorials</h3>
                  <div className="space-y-2">
                    {guides.map((guide) => (
                      <div
                        key={guide.id}
                        className="flex items-start gap-2 text-[14px] text-gray-700"
                      >
                        <span className="text-[#8363f2] mt-1">•</span>
                        <span>{guide.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}