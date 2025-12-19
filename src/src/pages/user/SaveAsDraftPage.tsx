import { UserSidebar } from '../../components/layout/UserSidebar';
import svgPaths from '../../../imports/svg-qxgvifls4i';
import imgRectangle149 from "figma:asset/c3da0b093907ae1f1f073f5b5b081f4b60182725.png";
import imgRectangle491 from "figma:asset/b8f358508256be2f2d88edd8037f9c1c992b7ef0.png";
import imgRectangle498 from "figma:asset/4f3cf17b509ff91a3ab3bb07631643b028d47067.png";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'vendorDashboard' | 'corporateDashboard' | 'selectUserType';

interface SaveAsDraftPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export function SaveAsDraftPage({ onNavigate, onLogout }: SaveAsDraftPageProps) {
  const drafts = [
    {
      id: 1,
      title: 'Magalies park gateway weekend',
      image: imgRectangle149,
      rating: 2,
      reviews: 24,
      serviceProvider: 'Magalies Hotel',
      goal: 'R10 000.00',
      members: 3,
      step: 3,
      totalSteps: 5,
      progress: 60,
    },
    {
      id: 2,
      title: 'Magalies park gateway weekend',
      image: imgRectangle491,
      rating: 2,
      reviews: 24,
      serviceProvider: 'Magalies Hotel',
      goal: 'R10 000.00',
      members: 3,
      step: 2,
      totalSteps: 5,
      progress: 40,
    },
    {
      id: 3,
      title: 'Gold reef city team building',
      image: imgRectangle498,
      rating: 5,
      reviews: 100,
      serviceProvider: 'Magalies Hotel',
      goal: 'R18 000.00',
      members: 8,
      step: 1,
      totalSteps: 5,
      progress: 20,
    },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <UserSidebar activePage="draft" onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white">
        {/* Header */}
        <div className="px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative w-[240px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-[40px] pl-4 pr-10 bg-[#f5f5f5] rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#9ca3af] outline-none border-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21L16.65 16.65" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <circle cx="12" cy="12" r="10" fill="#000000" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d="M3 3h7l2 4h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" fill="#000000"/>
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
          {/* Title and Description */}
          <div className="mb-6">
            <h1 className="font-['Inter',sans-serif] text-[20px] font-semibold text-black mb-1">
              Save as draft
            </h1>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[18px]">
              These are the campaigns you've started but not completed, continue editing to fishing and launch your campaign
            </p>
          </div>

          {/* Draft Cards */}
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div 
                key={draft.id} 
                className="bg-white rounded-[8px] border border-[#e5e7eb] p-4"
              >
                <div className="flex gap-4">
                  {/* Campaign Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={draft.image}
                      alt={draft.title}
                      className="w-[90px] h-[90px] rounded-[8px] object-cover"
                    />
                  </div>

                  {/* Campaign Info */}
                  <div className="flex-1">
                    {/* Title and Rating */}
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="font-['Inter',sans-serif] text-[14px] font-semibold text-black">
                        {draft.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                            <path 
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                              fill={i < draft.rating ? '#FFA500' : '#E5E7EB'} 
                            />
                          </svg>
                        ))}
                        <span className="font-['Inter',sans-serif] text-[10px] text-[#6b7280] ml-0.5">
                          (24 Reviews)
                        </span>
                      </div>
                    </div>
                    
                    {/* Draft Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-[#e5e7eb] rounded-[4px] mb-3">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p1d4ae3f0} fill="white" stroke="#8363f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path d={svgPaths.pbfd1c00} stroke="#8363f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                      <span className="font-['Inter',sans-serif] text-[11px] text-[#8363f2]">Draft</span>
                    </div>

                    {/* Details Row */}
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <button 
                        onClick={() => onNavigate('serviceDetail')}
                        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.pa168800} fill="black" />
                          <path d={svgPaths.p7709200} fill="#8363F2" />
                          <path d={svgPaths.p4d96400} fill="#8363F2" />
                        </svg>
                        <span className="font-['Inter',sans-serif] text-[11px] text-[#374151]">
                          Service Providers|{draft.serviceProvider}
                        </span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="#8363F2" strokeWidth="2" fill="none"/>
                          <path d="M12 6v6l4 2" stroke="#8363F2" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="font-['Inter',sans-serif] text-[11px] text-[#374151]">
                          Goal-{draft.goal}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#8363F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="9" cy="7" r="4" stroke="#8363F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#8363F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Inter',sans-serif] text-[11px] text-[#374151]">
                          Member added so far({draft.members})
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <p className="font-['Inter',sans-serif] text-[10px] text-[#374151] mb-1.5">
                        Step {draft.step} of {draft.totalSteps}
                      </p>
                      <div className="relative h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-[#8363f2]"
                          style={{ width: `${draft.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onNavigate('campaigns')}
                        className="h-[32px] px-4 bg-white border border-[#d1d5db] rounded-[6px] font-['Inter',sans-serif] text-[12px] text-[#374151] hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button className="h-[32px] px-4 bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[6px] font-['Inter',sans-serif] text-[12px] transition-colors">
                        Continue editing
                      </button>
                      <button className="h-[32px] px-4 bg-white border border-[#fca5a5] text-[#dc2626] rounded-[6px] font-['Inter',sans-serif] text-[12px] hover:bg-[#fef2f2] transition-colors">
                        Delete Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

