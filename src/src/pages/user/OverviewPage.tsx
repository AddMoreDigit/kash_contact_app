import { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { Page } from '../../types';
import { UserSidebar } from '../../components/layout/UserSidebar';
import { toast } from 'sonner';
import svgPaths from '../../../imports/svg-c7dw9fhoda';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface Campaign {
  id: string;
  title: string;
  image: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  dateRange: string;
  goal: number;
  progress: number;
  storageStatus?: string;
}

interface OverviewPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  createdCampaigns?: any[];
  onSelectCampaign?: (campaign: any) => void;
  onShowCart?: () => void;
  onLogout?: () => void;
}

export function OverviewPage({ 
  onNavigate, 
  onShowNotifications,
  hasUnreadNotifications,
  createdCampaigns = [],
  onSelectCampaign,
  onShowCart,
  onLogout
}: OverviewPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'goal' | 'progress'>('date');

  // Mock campaigns data for now - you can replace this with actual data later
  useEffect(() => {
    // For now, display empty state
    // You can integrate with your campaign storage system later
    setCampaigns([]);
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#c8e6c9] text-[#2e7d32]';
      case 'Completed':
        return 'bg-[#e1bee7] text-[#7b1fa2]';
      case 'Upcoming':
        return 'bg-[#ffcdd2] text-[#c62828]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewCampaign = (campaign: Campaign) => {
    // Navigate to view campaign page
    // You can integrate with your campaign data later
    onNavigate('viewCampaign');
  };

  const handleEditCampaign = (campaign: Campaign) => {
    // Navigate to edit campaign page
    // You can integrate with your campaign data later
    if (campaign.storageStatus !== 'declined') {
      onNavigate('manageCampaign');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be added here
  };

  const handleFilterApply = () => {
    toast.success(`Filtering by: ${filterStatus}`);
    setShowFilters(false);
  };

  const handleSort = (sortOption: 'date' | 'goal' | 'progress') => {
    setSortBy(sortOption);
    toast.success(`Sorted by ${sortOption}`);
    setShowSort(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    // Simulate loading more campaigns
    setTimeout(() => {
      toast.success('More campaigns loaded');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <UserSidebar activePage="overview" onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Header */}
        <div className="h-[104px] bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative bg-[#f5f5fa] rounded-xl shadow-[inset_2px_2px_4px_rgba(170,170,204,0.25),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent px-4 py-2 font-['SF_Pro_Rounded',sans-serif] text-[#7878ab] text-sm outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f5f5fa] rounded-full shadow-[2px_2px_4px_rgba(170,170,204,0.5),-2px_-2px_4px_#ffffff] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d={svgPaths.p250aca00} fill="#7878AB" fillRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Create Button */}
            <button
              onClick={() => onNavigate('createCampaign')}
              className="bg-[#8363f2] hover:bg-[#7354e1] text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] font-normal transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.pb95a080} fill="white" />
              </svg>
              Create
            </button>

            {/* Bell Icon */}
            <button
              onClick={onShowNotifications}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p12cfc680} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              {hasUnreadNotifications && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={onShowCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p3422b400} fill="#202020" />
              </svg>
            </button>

            {/* Profile Icon */}
            <button
              onClick={() => onNavigate('profile')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p10fc6980} fill="black" />
                <path d={svgPaths.p1534e400} fill="#EEEEEE" fillOpacity="0.933333" />
                <path d={svgPaths.p38192080} fill="#EEEEEE" fillOpacity="0.933333" />
              </svg>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-white p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-['Inter',sans-serif] text-[32px] text-black">Overview</h1>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="border border-[#585859] bg-white text-[#575656] px-6 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svgPaths.p2ddfcf80} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svgPaths.p379c4600} opacity={0.5} />
                </svg>
                Filters
              </button>

              <button
                onClick={() => setShowSort(!showSort)}
                className="border border-[#585859] bg-white text-[#575656] px-6 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort by
              </button>
            </div>
          </div>

          {/* Campaigns Grid */}
          {campaigns.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 mb-8">
              {campaigns.map((campaign) => {
                const isDeclined = campaign.storageStatus === 'declined';
                
                return (
                  <div
                    key={campaign.id}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm ${
                      isDeclined ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Campaign Image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <ImageWithFallback
                        src={campaign.image}
                        alt={campaign.title}
                        className={`w-full h-full object-cover ${isDeclined ? 'grayscale' : ''}`}
                      />
                      
                      {/* Status Badge */}
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-md text-sm font-['Inter',sans-serif] ${getStatusStyles(campaign.status)}`}>
                        {campaign.status}
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="font-['Inter',sans-serif] text-[18px] text-black mb-3">
                        {campaign.title}
                      </h3>

                      {/* Date Range */}
                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-['Inter',sans-serif] text-[14px]">{campaign.dateRange}</span>
                      </div>

                      {/* Goal and Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-['Inter',sans-serif] text-[14px] text-gray-700">Goal R{campaign.goal.toLocaleString()}</span>
                          <span className="font-['Inter',sans-serif] text-[14px] text-black">{campaign.progress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              campaign.status === 'Completed' || campaign.status === 'Active'
                                ? 'bg-[#4caf50]' 
                                : 'bg-gray-300'
                            }`}
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewCampaign(campaign)}
                          className="flex-1 bg-[#8363f2] hover:bg-[#7354e1] text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditCampaign(campaign)}
                          className="flex-1 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-black px-6 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isDeclined}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4 font-['Inter',sans-serif] text-[16px]">No campaigns found</p>
              <button
                onClick={() => onNavigate('createCampaign')}
                className="bg-[#8363f2] hover:bg-[#7354e1] text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] transition-colors"
              >
                Create Your First Campaign
              </button>
            </div>
          )}

          {/* Load More Button */}
          {campaigns.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="border border-[#acaaaa] bg-white text-[#6b6969] px-8 py-3 rounded-lg font-['Inter',sans-serif] text-[16px] hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          {/* Filters Modal */}
          {showFilters && (
            <div className="absolute right-8 top-20 w-64 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Filter Campaigns</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
                >
                  All Campaigns
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${filterStatus === 'active' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
                >
                  Active Only
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${filterStatus === 'completed' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilterStatus('upcoming')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${filterStatus === 'upcoming' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
                >
                  Upcoming
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={handleFilterApply}
                  className="w-full px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7053d9]"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          )}

          {/* Sort Menu */}
          {showSort && (
            <div className="absolute right-8 top-20 w-56 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <h3 className="font-semibold text-gray-900">Sort By</h3>
                <button onClick={() => setShowSort(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handleSort('date')}
                className={`w-full text-left px-3 py-2 rounded-lg ${sortBy === 'date' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
              >
                Date Created
              </button>
              <button
                onClick={() => handleSort('goal')}
                className={`w-full text-left px-3 py-2 rounded-lg ${sortBy === 'goal' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
              >
                Goal Amount
              </button>
              <button
                onClick={() => handleSort('progress')}
                className={`w-full text-left px-3 py-2 rounded-lg ${sortBy === 'progress' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}`}
              >
                Progress %
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}