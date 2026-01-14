import { useState } from 'react';
import { UserSidebar } from '../../components/layout/UserSidebar';
import svgPaths from '../../../imports/svg-8szp5bf6ym';
import imgRectangle124 from 'figma:asset/09008cafd958ef228fae370333984be464a418ff.png';
import imgRectangle125 from 'figma:asset/9f1f8c1da3629502bc71901baf4363bbeeeff080.png';
import imgRectangle126 from 'figma:asset/e646802d554bb1fa6ce3ceb35bf48236c77c77e1.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'signupForm' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'vendorDashboard' | 'corporateDashboard' | 'selectUserType';

interface VouchersPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export function VouchersPage({ onNavigate, onLogout }: VouchersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const vouchers = [
    {
      id: 1,
      name: 'Cape town weekend',
      image: imgRectangle124,
      savedPercent: '100% saved',
      goal: 'Goal R15 000',
    },
    {
      id: 2,
      name: 'Durban beach hoilday',
      image: imgRectangle125,
      savedPercent: '15% saved',
      goal: 'Goal R35 000',
    },
    {
      id: 3,
      name: 'Kruger national park',
      image: imgRectangle126,
      savedPercent: '76% saved',
      goal: 'Goal R25 000',
    },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <UserSidebar activePage="vouchers" onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white">
        {/* Header */}
        <div className="px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative w-[240px]">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] pl-4 pr-10 bg-[#f5f5f5] rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#9ca3af] outline-none border-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p250aca00} fill="#9ca3af" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-[40px] px-4 bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[8px] font-['Inter',sans-serif] text-[14px] font-medium flex items-center justify-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Create
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p10fc6980} fill="#000000" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p3422b400} fill="#000000" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#000000" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Title and Filters */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-['Inter',sans-serif] text-[24px] font-semibold text-black">
              Vouchers
            </h1>
            <div className="flex items-center gap-2">
              <button className="h-[36px] px-4 bg-white border border-gray-300 rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#374151] hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p2ddfcf80} stroke="#374151" strokeWidth="1.5" />
                </svg>
                <span>Filters</span>
              </button>
              <button className="h-[36px] px-4 bg-white border border-gray-300 rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#374151] hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 18">
                  <path d={svgPaths.p19673100} fill="#374151" />
                </svg>
                <span>Sort by</span>
              </button>
            </div>
          </div>

          {/* Voucher Cards Grid */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {vouchers.map((voucher) => (
              <div 
                key={voucher.id} 
                className="bg-white rounded-[12px] border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Voucher Image */}
                <div className="relative h-[140px]">
                  <img
                    src={voucher.image}
                    alt={voucher.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Voucher Info */}
                <div className="p-4">
                  <h3 className="font-['Inter',sans-serif] text-[16px] font-medium text-[#111827] mb-3">
                    {voucher.name}
                  </h3>

                  {/* Redeem Button */}
                  <button className="w-full bg-[#8363f2] text-white text-[14px] font-['Inter',sans-serif] font-medium h-[40px] rounded-[8px] mb-3 hover:bg-[#7354e1] transition-colors">
                    Redeem
                  </button>

                  {/* Savings Info */}
                  <div className="space-y-0.5">
                    <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#111827]">
                      {voucher.savedPercent}
                    </p>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#6b7280]">
                      {voucher.goal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center">
            <button className="h-[40px] px-6 bg-white border border-gray-300 rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#374151] hover:bg-gray-50 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
