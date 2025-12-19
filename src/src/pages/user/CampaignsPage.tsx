import { useState } from 'react';
import { Calendar, AlignJustify, Search, Bell, ShoppingCart, LayoutGrid, X, Filter, ChevronDown } from 'lucide-react';
import { UserSidebar } from '../../components/layout/UserSidebar';
import { Page } from '../../types';
import { toast } from 'sonner';

interface CampaignsPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export function CampaignsPage({ onNavigate, onLogout }: CampaignsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'goal' | 'progress'>('date');

  const campaigns = [
    {
      id: 1,
      title: 'Cape Town Gateway Weekend',
      image: 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=400',
      serviceProvider: 'Seaview Lodge',
      catering: 'Tasteless Catering',
      startDate: 'Sep 1',
      endDate: 'Dec 5, 2025',
      goal: 10000.00,
      contributed: 3000.00,
      members: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4'
      ],
      buttonText: 'Contribute',
      buttonClass: 'bg-[#2d1b69]'
    },
    {
      id: 2,
      title: 'Durban Beach Escape',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400',
      serviceProvider: 'Seaview Lodge',
      catering: 'TasteBiles Catering',
      startDate: 'Sep 1',
      endDate: 'Dec 5, 2025',
      goal: 20000.00,
      contributed: 13000.00,
      members: [
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6',
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8'
      ],
      buttonText: 'Manage',
      buttonClass: 'bg-[#2d1b69]'
    }
  ];

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter(campaign => 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.serviceProvider.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'goal') return b.goal - a.goal;
      if (sortBy === 'progress') return (b.contributed / b.goal) - (a.contributed / a.goal);
      return 0; // date
    });

  const handleCreateCampaign = () => {
    setShowCreateMenu(false);
    onNavigate('createCampaign');
  };

  const handleSort = (type: 'date' | 'goal' | 'progress') => {
    setSortBy(type);
    setShowSortMenu(false);
    toast.success(`Sorted by ${type}`);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <UserSidebar activePage="campaigns" onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-[532px]">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[44px] px-4 pr-12 bg-[#f5f5f5] rounded-[12px] font-['Inter',sans-serif] text-[16px] text-[#868484] outline-none"
              />
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCreateMenu(!showCreateMenu)}
                className="w-[120px] h-[44px] bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[12px] font-['Inter',sans-serif] text-[16px] flex items-center justify-center gap-2 transition-colors relative"
              >
                <LayoutGrid className="w-5 h-5" />
                Create
              </button>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-6 h-6 text-gray-700" />
                {showNotifications && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
              </button>
              <button 
                onClick={() => onNavigate('draft')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
              </button>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <AlignJustify className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-['Inter',sans-serif] text-[24px] font-semibold text-black mb-1">Campaigns</h1>
              <p className="font-['Inter',sans-serif] text-[14px] text-[#6b7280]">Here are your ongoing campaigns</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Calendar size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="px-4 py-2 flex items-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
              >
                <AlignJustify size={16} className="text-gray-600" />
                <span className="font-['Inter',sans-serif] text-[14px] text-black">Sort by</span>
              </button>
            </div>
          </div>

          {/* Campaign Cards */}
          <div className="space-y-6">
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No campaigns found</p>
              </div>
            ) : (
              filteredCampaigns.map((campaign) => {
              const percentage = Math.round((campaign.contributed / campaign.goal) * 100);
              
              return (
                <div key={campaign.id} className="bg-white rounded-[12px] border border-gray-200 overflow-hidden">
                  {/* Campaign Image */}
                  <div className="relative h-[200px]">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Campaign Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h2 className="font-['Inter',sans-serif] text-[18px] font-semibold text-black mb-1">{campaign.title}</h2>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">Service Provider</p>
                      </div>
                      <button
                        onClick={() => onNavigate('viewCampaignDetail')}
                        className={`${campaign.buttonClass} hover:opacity-90 text-white px-6 py-2 rounded-[8px] font-['Inter',sans-serif] text-[14px] font-medium transition-opacity`}
                      >
                        {campaign.buttonText}
                      </button>
                    </div>

                    {/* Service Providers */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-600" />
                        <span className="font-['Inter',sans-serif] text-[12px] text-black">{campaign.serviceProvider}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-600" />
                        <span className="font-['Inter',sans-serif] text-[12px] text-black">{campaign.catering}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <div className="w-4 h-4 rounded-full bg-purple-600" />
                        <span className="font-['Inter',sans-serif] text-[12px] text-black">Campaign Members</span>
                        <div className="flex -space-x-2 ml-1">
                          {campaign.members.map((member, idx) => (
                            <img
                              key={idx}
                              src={member}
                              alt=""
                              className="w-6 h-6 rounded-full border-2 border-white"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-purple-800" />
                      <span className="font-['Inter',sans-serif] text-[12px] text-black">
                        {campaign.startDate} - Dec 5, 2025
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-500" />
                        <span className="font-['Inter',sans-serif] text-[12px] text-black">
                          Goal-R{campaign.goal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`absolute left-0 top-0 h-full ${
                              campaign.id === 1 ? 'bg-[#8363f2]' : 'bg-[#f5a623]'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <span className="font-['Inter',sans-serif] text-[12px] text-black">
                        Contributed -R{campaign.contributed.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', ' ')}
                      </span>

                      <span className="font-['Inter',sans-serif] text-[12px] font-medium text-black ml-2">
                        {percentage}%
                      </span>

                      <button
                        onClick={() => onNavigate('viewCampaignDetail')}
                        className="px-5 py-2 border border-[#2d1b69] text-[#2d1b69] rounded-[8px] font-['Inter',sans-serif] text-[14px] font-medium hover:bg-[#2d1b69] hover:text-white transition-colors"
                      >
                        View Campaign
                      </button>
                    </div>
                  </div>
                </div>
              );
            }))}
          </div>
        </div>
      </div>

      {/* Create Menu Dropdown */}
      {showCreateMenu && (
        <div className="absolute top-20 right-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-56 z-50">
          <button
            onClick={handleCreateCampaign}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
          >
            <LayoutGrid className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-700">New Campaign</span>
          </button>
          <button
            onClick={() => { setShowCreateMenu(false); onNavigate('draft'); }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
          >
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-700">View Drafts</span>
          </button>
        </div>
      )}

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="absolute top-20 right-52 bg-white rounded-lg shadow-xl border border-gray-200 w-96 z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button onClick={() => setShowNotifications(false)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
              <p className="text-sm text-gray-900 font-medium">Campaign Update</p>
              <p className="text-xs text-gray-500 mt-1">Your "Cape Town Gateway" campaign reached 30% funding</p>
              <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
            </div>
            <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
              <p className="text-sm text-gray-900 font-medium">New Member</p>
              <p className="text-xs text-gray-500 mt-1">Sarah joined your "Durban Beach Escape" campaign</p>
              <p className="text-xs text-gray-400 mt-2">5 hours ago</p>
            </div>
            <div className="p-4 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-900 font-medium">Payment Received</p>
              <p className="text-xs text-gray-500 mt-1">R500 contribution received for Cape Town campaign</p>
              <p className="text-xs text-gray-400 mt-2">1 day ago</p>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200">
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="absolute top-20 right-8 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48 z-50">
          <button
            onClick={() => { setShowMenu(false); onNavigate('profile'); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Profile Settings
          </button>
          <button
            onClick={() => { setShowMenu(false); onNavigate('helpSupport'); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Help & Support
          </button>
          <button
            onClick={() => { setShowMenu(false); onLogout?.(); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Date Filter Dropdown */}
      {showDateFilter && (
        <div className="absolute top-56 right-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-56 z-50">
          <button
            onClick={() => { setShowDateFilter(false); toast.success('Showing all dates'); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            All Campaigns
          </button>
          <button
            onClick={() => { setShowDateFilter(false); toast.success('Showing this week'); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            This Week
          </button>
          <button
            onClick={() => { setShowDateFilter(false); toast.success('Showing this month'); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            This Month
          </button>
          <button
            onClick={() => { setShowDateFilter(false); toast.success('Showing upcoming'); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Upcoming
          </button>
        </div>
      )}

      {/* Sort Menu Dropdown */}
      {showSortMenu && (
        <div className="absolute top-56 right-8 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-56 z-50">
          <button
            onClick={() => handleSort('date')}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Sort by Date
          </button>
          <button
            onClick={() => handleSort('goal')}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Sort by Goal Amount
          </button>
          <button
            onClick={() => handleSort('progress')}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            Sort by Progress
          </button>
        </div>
      )}
    </div>
  );
}
