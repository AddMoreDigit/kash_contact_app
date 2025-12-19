import { useState, useEffect } from 'react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Page } from '../../types';
import svgPaths from '../../../imports/svg-y9b8zn00t2';

interface CorporateCampaignsPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

const initialCampaigns = [
  {
    id: 1,
    title: 'Swiss Adventure',
    image: 'https://images.unsplash.com/photo-1607552351758-c39d62acb258?w=400',
    status: 'Active',
    progress: 70,
    goal: 25000,
    contributed: 10000,
    vendors: ['Blue Hotel', 'Best Dining', 'Sky Games'],
    detailsMonths: 3,
    detailsCount1: 9,
    detailsCount2: 150,
    impactMonths: 3,
    impactCount1: 9,
    impactCount2: 150,
    timeline: 'Nov 15 ,2025-Feb 10,2025'
  },
  {
    id: 2,
    title: 'Cape Town Trip',
    image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=400',
    status: 'Active',
    progress: 70,
    goal: 25000,
    contributed: 10000,
    vendors: ['Blue Hotel', 'Best Dining', 'Sky Games'],
    detailsMonths: 3,
    detailsCount1: 9,
    detailsCount2: 150,
    impactMonths: 3,
    impactCount1: 9,
    impactCount2: 150,
    timeline: 'Nov 15 ,2025-Feb 10,2025'
  },
  {
    id: 3,
    title: 'Durban South Coast',
    image: 'https://images.unsplash.com/photo-1549109783-6be1845ed596?w=400',
    status: 'Active',
    progress: 70,
    goal: 25000,
    contributed: 10000,
    vendors: ['Blue Hotel', 'Best Dining', 'Sky Games'],
    detailsMonths: 3,
    detailsCount1: 9,
    detailsCount2: 150,
    impactMonths: 3,
    impactCount1: 9,
    impactCount2: 150,
    timeline: 'Nov 15 ,2025-Feb 10,2025'
  }
];

export function CorporateCampaignsPage({ onNavigate, onLogout }: CorporateCampaignsPageProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const savedCampaigns = localStorage.getItem('corporateCampaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    } else {
      setCampaigns(initialCampaigns);
      localStorage.setItem('corporateCampaigns', JSON.stringify(initialCampaigns));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CorporateSidebar 
        activePage="corporateCampaigns" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-6 h-6 flex items-center justify-center relative"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p44baf00} fill="black" />
                </svg>
              </button>
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="pl-10 pr-4 py-2 text-[13px] font-['Inter',sans-serif] border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-6 h-6 flex items-center justify-center relative"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <clipPath id="clip0_profile">
                  <rect fill="white" height="24" width="24" />
                </clipPath>
                <g clipPath="url(#clip0_profile)">
                  <path d={svgPaths.p10fc6980} fill="black" />
                  <path d={svgPaths.p1534e400} fill="#EEEEEE" fillOpacity="0.933333" />
                  <path d={svgPaths.p38192080} fill="#EEEEEE" fillOpacity="0.933333" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="font-['Inter',sans-serif] text-[20px] font-semibold text-black">Active Campaigns</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('addMembers')}
                className="px-4 py-2 bg-white border border-[#8363f2] text-[#8363f2] text-[13px] font-['Inter',sans-serif] rounded-md hover:bg-[#8363f2] hover:text-white transition-colors"
              >
                Add Members
              </button>
              <button
                onClick={() => onNavigate('createCampaign')}
                className="px-4 py-2 bg-[#8363f2] text-white text-[13px] font-['Inter',sans-serif] rounded-md hover:bg-[#7354e1] transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <select className="px-4 py-2 text-[13px] font-['Inter',sans-serif] border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Members</option>
              <option>Active Campaigns</option>
              <option>Completed</option>
            </select>

            <select className="px-4 py-2 text-[13px] font-['Inter',sans-serif] border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Date Range</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>

            <select className="px-4 py-2 text-[13px] font-['Inter',sans-serif] border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Category</option>
              <option>Team Building</option>
              <option>Conference</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="relative h-[140px]">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-medium rounded">
                      {campaign.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-['Inter',sans-serif] text-[15px] font-semibold text-black mb-2">
                    {campaign.title}
                  </h3>

                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#7c3aed] h-1.5 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] mb-3">
                    <span className="text-gray-600">Goal: R{campaign.goal.toLocaleString()}</span>
                    <span className="font-medium">R{campaign.contributed.toLocaleString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {campaign.vendors.map((vendor: string, index: number) => (
                      <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded">
                        {vendor}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <h4 className="font-['Inter',sans-serif] text-[12px] font-semibold text-black mb-1.5">Details</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d={svgPaths.p44baf00} />
                          </svg>
                          <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.detailsMonths} Months</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d={svgPaths.p7a05b80} />
                          </svg>
                          <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.detailsCount1}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d={svgPaths.p7a05b80} />
                          </svg>
                          <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.detailsCount2}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-['Inter',sans-serif] text-[12px] font-semibold text-black mb-1.5">Impact</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d={svgPaths.p44baf00} />
                          </svg>
                          <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.impactMonths} Months</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d={svgPaths.p7a05b80} />
                          </svg>
                          <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.impactCount1}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d={svgPaths.p7a05b80} />
                          </svg>
                          <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.impactCount2}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-['Inter',sans-serif] text-[12px] font-semibold text-black mb-1.5">Timeline</h4>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d={svgPaths.p44baf00} />
                      </svg>
                      <span className="font-['Inter',sans-serif] text-[11px] text-gray-600">{campaign.timeline}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        localStorage.setItem('selectedCampaign', JSON.stringify(campaign));
                        onNavigate('viewCampaign');
                      }}
                      className="py-2 font-['Inter',sans-serif] text-[12px] font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem('selectedCampaign', JSON.stringify(campaign));
                        onNavigate('editCampaign');
                      }}
                      className="py-2 font-['Inter',sans-serif] text-[12px] font-medium bg-[#7c3aed] text-white rounded-md hover:bg-[#6d28d9] transition-colors"
                    >
                      Edit Campaign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="absolute top-20 left-8 w-56 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { onNavigate('corporateDashboard'); setShowMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Dashboard
          </button>
          <button
            onClick={() => { onNavigate('corporateCampaigns'); setShowMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Campaigns
          </button>
          <button
            onClick={() => { onNavigate('corporateTransactions'); setShowMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Transactions
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => setShowMenu(false)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 text-sm"
          >
            Close
          </button>
        </div>
      )}

      {/* Profile Menu */}
      {showProfileMenu && (
        <div className="absolute top-20 right-8 w-56 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { onNavigate('corporateProfile'); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            View Profile
          </button>
          <button
            onClick={() => { onNavigate('corporateHelpSupport'); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Help & Support
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => { onLogout?.(); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}