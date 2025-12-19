import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Search, Mail, Phone, ChevronDown, ChevronUp, FileText, HelpCircle, MessageSquare } from 'lucide-react';

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

interface VendorHelpSupportPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const VendorHelpSupportPage: React.FC<VendorHelpSupportPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorHelpSupport');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I create a campaign?',
      answer: 'To create a new campaign, go to campaign section and click on the "new campaign" button follow the on-screen instructions to set up your new campaigns.'
    },
    {
      question: 'How can I redeem a voucher?',
      answer: 'Vouchers can be redeemed at checkout. Enter the voucher code in the designated field and click apply.'
    },
    {
      question: 'What should I do if a transaction is pending?',
      answer: 'Pending transactions usually resolve within 24 hours. If it persists, contact our support team with the transaction ID.'
    },
    {
      question: 'How to add members to campaigns?',
      answer: 'Go to the campaign details page, click on "Members" tab, and use the "Add Member" button to invite participants.'
    },
    {
      question: 'How do I manage my services?',
      answer: 'Navigate to "My Services" section to view, edit, or create new service offerings.'
    },
    {
      question: 'How can I generate reports?',
      answer: 'Use the "Orders Report" page to generate and export detailed reports of your bookings and transactions.'
    }
  ];

  const guides = [
    { title: 'Onboarding Guide', icon: <FileText size={20} /> },
    { title: 'Managing Campaigns', icon: <HelpCircle size={20} /> },
    { title: 'Using Vouchers', icon: <FileText size={20} /> },
    { title: 'Transaction Insights', icon: <FileText size={20} /> },
    { title: 'Service Management', icon: <HelpCircle size={20} /> },
    { title: 'Customer Support', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600">Get assistance and learn how to use the vendor portal</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Customer Support */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Customer Support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex p-3 bg-[#8363f2]/10 rounded-full mb-4">
                  <MessageSquare className="text-[#8363f2]" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Chat with us</h3>
                <p className="text-gray-500 text-sm">Available 24/7</p>
                <button className="mt-4 px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors">
                  Start Chat
                </button>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex p-3 bg-[#8363f2]/10 rounded-full mb-4">
                  <Mail className="text-[#8363f2]" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-500 text-sm">Help@kashcontact.co.za</p>
                <button className="mt-4 px-4 py-2 border border-[#8363f2] text-[#8363f2] rounded-lg hover:bg-[#8363f2] hover:text-white transition-colors">
                  Send Email
                </button>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex p-3 bg-[#8363f2]/10 rounded-full mb-4">
                  <Phone className="text-[#8363f2]" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-500 text-sm">+27 800 052 589</p>
                <button className="mt-4 px-4 py-2 border border-[#8363f2] text-[#8363f2] rounded-lg hover:bg-[#8363f2] hover:text-white transition-colors">
                  Call Now
                </button>
              </div>
            </div>
          </div>

          {/* Guides & Tutorials */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Guides & Tutorials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((guide, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#8363f2] hover:bg-[#8363f2]/5 transition-all"
                >
                  <div className="text-[#8363f2]">
                    {guide.icon}
                  </div>
                  <span className="font-medium">{guide.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Support Hours */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">Support Hours</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Monday - Friday: 8:00 AM - 8:00 PM</li>
              <li>• Saturday: 9:00 AM - 5:00 PM</li>
              <li>• Sunday: 10:00 AM - 4:00 PM</li>
              <li>• Public Holidays: Limited Support Available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};