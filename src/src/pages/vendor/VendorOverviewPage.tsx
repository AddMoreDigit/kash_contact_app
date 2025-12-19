import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Search, Filter, Download, Eye } from 'lucide-react';

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

interface VendorOverviewPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const VendorOverviewPage: React.FC<VendorOverviewPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorOverview');

  const campaigns = [
    { name: 'Cape town - Seaview lodge', goal: 20000, saved: 8000, progress: 75 },
    { name: 'Durban gateway - front beach', goal: 20000, saved: 8000, progress: 25 },
    { name: 'Durban - south coast', goal: 20000, saved: 8000, progress: 50 },
  ];

  const vouchers = [
    { name: '10% Off Accommodation', date: 'September 2, 2025', claimedBy: 'VUsimuzi' },
    { name: '5% Off Food', date: 'August 16, 2025', claimedBy: 'Jayden' },
    { name: '5% Off Transport', date: 'August 16, 2025', claimedBy: 'Jayden' },
    { name: '5% Off Activities', date: 'August 16, 2025', claimedBy: 'Jayden' },
  ];

  const monthlyRevenue = [2000, 7000, 5000, 2000, 0, 2000, 5000, 7000, 20000, 12000, 8000];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Vendor Name</h1>
            <p className="text-gray-600">This is your overview of your business</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors">
              Create New
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Campaigns Overview */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Campaigns Overview</h2>
              <Filter size={20} className="text-gray-500 cursor-pointer" />
            </div>
            <div className="space-y-6">
              {campaigns.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{campaign.name}</span>
                    <span className="text-gray-600">Goal R{campaign.goal.toLocaleString()} - Saved R{campaign.saved.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#8363f2] h-2 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-500">{campaign.progress}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-6">Monthly Revenue</h2>
            <div className="flex items-end h-48 gap-1 mb-4">
              {monthlyRevenue.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-[#8363f2] rounded-t transition-all duration-300 hover:bg-[#7354e1]"
                    style={{ height: `${(value / 20000) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{months[index]}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">Total - R12,563.00</p>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Claimed Vouchers */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Claimed Vouchers</h2>
              <Download size={20} className="text-gray-500 cursor-pointer" />
            </div>
            <div className="space-y-4">
              {vouchers.map((voucher, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{voucher.name}</span>
                    <Eye size={18} className="text-gray-500 cursor-pointer" />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {voucher.date} | Claimed by {voucher.claimedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Calendar */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Booking Calendar</h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">March 2025</span>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Today
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 31 }).map((_, index) => (
                <div
                  key={index}
                  className={`text-center py-3 rounded-lg ${
                    index === 8 || index === 15 || index === 22
                      ? 'bg-[#8363f2] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div>
                <p className="text-lg font-semibold">Total Bookings: 42</p>
                <p className="text-gray-600">Total Revenue: R12,586.00</p>
              </div>
              <button 
                onClick={() => onNavigate('vendorDashboard')}
                className="px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};