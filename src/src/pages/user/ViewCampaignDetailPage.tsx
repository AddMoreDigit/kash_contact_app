import { useState } from 'react';
import { UserSidebar } from '../../components/layout/UserSidebar';
import svgPaths from '../../../imports/svg-b7s8fpxdl4';
import imgRectangle115 from 'figma:asset/0e961f9582aec77a34bf07fab9ef41a1b7c868ad.png';
import imgRectangle140 from 'figma:asset/2d90d1ffe99df5817a38c395c08ec5116a7be340.png';
import imgRectangle141 from 'figma:asset/87102388d503206b3b0fb177ad63642a9945094b.png';
import imgEllipse34 from "figma:asset/e44d5cd688ebcf29969455cdd422abc0ede80023.png";
import imgEllipse35 from "figma:asset/4b26bfd150174ba0370dd3bfeef0c80dcb584d88.png";
import imgEllipse36 from "figma:asset/d770c99e932e76eba63bc37ec25fdba69d4b4874.png";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'selectServices' | 'viewCampaignDetail' | 'helpSupport';

interface ViewCampaignDetailPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export function ViewCampaignDetailPage({ onNavigate, onLogout }: ViewCampaignDetailPageProps) {
  const [searchEmail, setSearchEmail] = useState('');

  const members = [
    {
      name: 'Alice',
      status: 'Up to date',
      progress: 75,
      avatar: imgEllipse34,
    },
    {
      name: 'John',
      status: 'Up to date',
      progress: 100,
      avatar: imgEllipse35,
    },
    {
      name: 'Jabulani',
      status: 'Pending',
      progress: 0,
      avatar: imgEllipse36,
    },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <UserSidebar activePage="campaigns" onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#f9fafb]">
        {/* Header */}
        <div className="px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative w-[532px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-[44px] px-4 pr-12 bg-[#f5f5f5] rounded-[12px] font-['Inter',sans-serif] text-[16px] text-[#868484] outline-none"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p1c5c03f0} stroke="#868484" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-[120px] h-[44px] bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[12px] font-['Inter',sans-serif] text-[16px] flex items-center justify-center gap-2 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p19e5f200} fill="white" />
                </svg>
                Create
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p280fe110} fill="#414040" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p160e9a00} fill="#414040" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p2a9a6200} fill="#414040" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 max-w-[900px]">
          {/* Hero Image */}
          <div className="mb-6 rounded-[16px] overflow-hidden">
            <img
              src={imgRectangle115}
              alt="Cape Town"
              className="w-full h-[248px] object-cover"
            />
          </div>

          {/* Service Provider Section */}
          <div className="bg-white rounded-[16px] p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Inter',sans-serif] text-[24px] font-semibold text-black">Service Provider</h2>
              <button className="flex items-center gap-2 text-[#8363f2] hover:text-[#7354e1] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p111a8b00} stroke="#8363F2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p149f2980} stroke="#8363F2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="font-['Inter',sans-serif] text-[16px]">Edit</span>
              </button>
            </div>

            {/* Seaview Lodge */}
            <div className="flex items-start gap-3 mb-4">
              <img src={imgRectangle140} alt="Seaview Lodge" className="w-[48px] h-[48px] rounded-[8px] object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-['Inter',sans-serif] text-[16px] font-medium text-black">Seaview Lodge</h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p175bda00} fill="#FFA500" />
                    </svg>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p175bda00} fill="#FFA500" />
                    </svg>
                    <span className="ml-1 font-['Inter',sans-serif] text-[12px] text-[#6b7280]">(24 Reviews)</span>
                  </div>
                </div>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">Cape town | Accommodation</p>
              </div>
            </div>

            {/* TasteBites Catering */}
            <div className="flex items-start gap-3">
              <img src={imgRectangle141} alt="TasteBites Catering" className="w-[48px] h-[48px] rounded-[8px] object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-['Inter',sans-serif] text-[16px] font-medium text-black">TasteBites Catering</h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p175bda00} fill="#FFA500" />
                    </svg>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p175bda00} fill="#FFA500" />
                    </svg>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p175bda00} fill="#FFA500" />
                    </svg>
                    <span className="ml-1 font-['Inter',sans-serif] text-[12px] text-[#6b7280]">(24 Reviews)</span>
                  </div>
                </div>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">Durban | Food</p>
              </div>
            </div>
          </div>

          {/* Campaign Goal Section */}
          <div className="bg-white rounded-[16px] p-6 mb-6">
            <h2 className="font-['Inter',sans-serif] text-[24px] font-semibold text-black mb-4">Campaign Goal</h2>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p15e9a900} fill="#8363F2" />
                </svg>
                <span className="font-['Inter',sans-serif] text-[14px] text-black">Goal-R10 000.00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-['Inter',sans-serif] text-[14px] text-black">Contributed -R3 000.00</span>
                <span className="font-['Inter',sans-serif] text-[14px] font-semibold text-black">30%</span>
              </div>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div className="absolute left-0 top-0 h-full bg-[#8363f2] w-[30%]" />
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p1b99f400} stroke="#8363F2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="font-['Inter',sans-serif] text-[14px] text-black">Sep 1</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p1eb53800} fill="#000000" />
              </svg>
              <span className="font-['Inter',sans-serif] text-[14px] text-black">Dec 5, 2025</span>
            </div>
          </div>

          {/* Members Section */}
          <div className="bg-white rounded-[16px] p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Inter',sans-serif] text-[24px] font-semibold text-black">Members</h2>
              <button className="px-6 py-2 bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[8px] font-['Inter',sans-serif] text-[14px] font-medium transition-colors">
                Campaign performance
              </button>
            </div>

            <div className="space-y-4">
              {members.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="font-['Inter',sans-serif] text-[14px] font-medium text-black">{member.name}</h3>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#8363f2]">{member.status}</p>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-[#8363f2]"
                        style={{ width: `${member.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-['Inter',sans-serif] text-[14px] font-medium text-black w-12 text-right">{member.progress}%</span>
                  <button className="text-[#8363f2] hover:text-[#7354e1] font-['Inter',sans-serif] text-[14px] font-medium transition-colors">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Invites Members Section */}
          <div className="bg-white rounded-[16px] p-6 mb-6">
            <h2 className="font-['Inter',sans-serif] text-[24px] font-semibold text-black mb-4">Invites Members</h2>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by Username or email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full h-[48px] px-4 pr-12 border border-gray-300 rounded-[8px] font-['Inter',sans-serif] text-[14px] text-black outline-none focus:border-[#8363f2]"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <button className="px-6 py-3 bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium transition-colors">
                Invite
              </button>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => onNavigate('campaigns')}
              className="px-8 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-black rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium transition-colors"
            >
              Back
            </button>
            <button className="px-8 py-3 bg-[#8363f2] hover:bg-[#7354e1] text-white rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium transition-colors">
              Pause Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


