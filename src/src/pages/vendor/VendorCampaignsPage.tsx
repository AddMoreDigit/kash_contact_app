import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { CreateMenuModal } from '../../components/modals/CreateMenuModal';
import { Search, Bell, ShoppingCart, Filter, User, Calendar, MapPin, Users, LayoutGrid, MessageSquare, X } from 'lucide-react';
import { toast } from 'sonner';

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

interface Campaign {
  id: string;
  name: string;
  organizer: string;
  organizerType: 'user' | 'corporate';
  date: string;
  members: number;
  amount: string;
  contributed: string;
  progress: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  services: string[];
  image: string;
  provider: string;
  catering: string;
}

interface VendorCampaignsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const VendorCampaignsPage: React.FC<VendorCampaignsPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorCampaigns');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const campaigns: Campaign[] = [
    {
      id: 'UC-001',
      name: 'Cape Town Gateway Weekend!',
      organizer: 'Sarah Johnson',
      organizerType: 'user',
      date: 'Dec 1 - Dec 5, 2025',
      members: 8,
      amount: 'R20,000.00',
      contributed: 'R10,000.00',
      progress: 50,
      status: 'confirmed',
      services: ['Accommodation', 'Dining'],
      provider: 'Seaview Lodge',
      catering: 'Flawless Catering',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'UC-002',
      name: 'Durban Beach Escape',
      organizer: 'Mike Wilson',
      organizerType: 'user',
      date: 'Dec 1 - Dec 5, 2025',
      members: 4,
      amount: 'R20,000.00',
      contributed: 'R10,500.00',
      progress: 52,
      status: 'pending',
      services: ['Accommodation', 'Beach Activities'],
      provider: 'Seaview Lodge',
      catering: 'TastyBites Catering',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const memberAvatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop"
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-purple-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowCreateMenu(true)}
              className="bg-[#8363f2] text-white px-8 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#7354e1] transition-colors"
            >
              Create
            </button>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
              <Bell size={20} className="text-gray-400 cursor-pointer" />
            </button>
            <button onClick={() => onNavigate('vendorDrafts')}>
              <ShoppingCart size={20} className="text-gray-400 cursor-pointer" />
            </button>
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="relative">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-100 overflow-hidden">
                 <User size={22} />
              </div>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-10 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
              <p className="text-gray-400 text-sm mt-1 font-medium">Here are your ongoing Campaigns</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2.5 bg-gray-50 text-[#8363f2] rounded-xl border border-purple-50">
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest relative"
              >
                <Filter size={14} className="rotate-180" /> Sort by
              </button>
            </div>
          </div>

          <div className="space-y-10">
            {campaigns.map((campaign, index) => (
              <div key={campaign.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                {/* Hero Image */}
                <div className="h-64 w-full relative">
                  <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-semibold shadow-sm ${index === 0 ? 'bg-[#8363f2] text-white' : 'bg-[#2D2852] text-white'}`}>
                      {index === 0 ? 'Create tasks' : 'Message'}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{campaign.name}</h2>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Provider</p>
                    </div>
                  </div>

                  {/* Details Row */}
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#8363f2]"></span>
                      <span className="text-gray-800 font-semibold text-sm">{campaign.provider}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#8363f2]"></span>
                      <span className="text-gray-800 font-semibold text-sm">{campaign.catering}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-semibold text-sm">Campaign Members</span>
                      <div className="flex -space-x-3">
                        {memberAvatars.map((url, i) => (
                          <img key={i} src={url} className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" alt="member" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                     <Calendar size={18} className="text-[#2D2852]" />
                     <span className="text-xs font-bold text-gray-400 tracking-wide">{campaign.date}</span>
                  </div>

                  {/* Divider and Footer Progress */}
                  <div className="border-t border-dashed border-gray-200 pt-6 flex items-center gap-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#8363f2]/10 p-1.5 rounded-md text-[#8363f2]">
                          <LayoutGrid size={14} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Contributions - {campaign.amount} <span className="mx-3 text-gray-200">|</span> Contributed - {campaign.contributed}
                        </p>
                      </div>
                      <div className="relative w-full h-3.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                            index === 0 ? "bg-[#8363f2]" : "bg-orange-400"
                          }`} 
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-sm font-black text-gray-400 mb-2">{campaign.progress}%</span>
                      <button 
                        onClick={() => onNavigate('vendorViewCampaign')}
                        className="text-[11px] font-black text-[#8363f2] border border-[#8363f2] px-6 py-2 rounded-xl hover:bg-purple-50 transition-colors uppercase tracking-widest"
                      >
                        View Campaign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      <CreateMenuModal 
        isOpen={showCreateMenu}
        onClose={() => setShowCreateMenu(false)}
        onNavigate={onNavigate}
      />

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="absolute top-20 right-8 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-900">New campaign booking request</p>
              <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900">Campaign contribution received</p>
              <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900">Campaign status updated</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Menu */}
      {showProfileMenu && (
        <div className="absolute top-20 right-8 w-56 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { onNavigate('vendorProfile'); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            View Profile
          </button>
          <button
            onClick={() => { onNavigate('vendorHelpSupport'); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Help & Support
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => { onLogout(); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Sort Dropdown */}
      {showSort && (
        <div className="absolute top-48 right-56 w-56 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { toast.success('Sorted by Date'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Date
          </button>
          <button
            onClick={() => { toast.success('Sorted by Progress'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Progress
          </button>
          <button
            onClick={() => { toast.success('Sorted by Status'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Status
          </button>
          <button
            onClick={() => { toast.success('Sorted by Amount'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Amount
          </button>
        </div>
      )}
    </div>
  );
};