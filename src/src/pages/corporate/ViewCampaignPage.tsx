import React, { useState } from 'react';
import { Users, X, Truck, Bed, Receipt } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar'; 

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface ViewCampaignPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void; 
}

const mockCampaign = {
    name: "Swiss Adventure",
    status: "Active",
    goal: 25000,
    contributed: 10000,
    remaining: 15000,
    progressPercentage: 70,
    beneficiaries: 50,
    description: "Raise Funds for an Inclusive Trip for 50 beneficiaries to cape Town ,Covering Accommodation ,Food,Trans;port and Activities",
    vendors: [
        { name: "Seaview Lodge", type: "Accommodation", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop" },
        { name: "Oceanview Dining", type: "Dining-Meal", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop" },
        { name: "Island Paradise", type: "Activities", image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=100&h=100&fit=crop" },
    ],
    members: [
        { name: "Shaun Mkhize", status: "Up to date", initials: "SM", color: "#8363f2" },
        { name: "John", status: "Critical", initials: "J", color: "#ef4444" },
        { name: "Jabulani", status: "Up to date", initials: "JB", color: "#8363f2" },
    ],
    reportStats: [
        { label: "Trips Funded", value: 10, icon: Truck },
        { label: "Night Booked", value: 45, icon: Bed },
        { label: "Meal Sponsor", value: 120, icon: Receipt },
    ]
};

const Avatar = ({ initials, color }: { initials: string; color?: string }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-gray-200">
        <img 
            src={`https://i.pravatar.cc/150?u=${initials}`} 
            alt={initials} 
            className="w-full h-full object-cover" 
        />
    </div>
);


export default function ViewCampaignPage({ onNavigate, onLogout }: ViewCampaignPageProps) {
    const [activeTab, setActiveTab] = useState('Overview'); 

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <CorporateSidebar 
                activePage="corporateCampaigns" 
                onNavigate={onNavigate} 
                onLogout={onLogout}
            />
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Close Button */}
                    <button 
                        onClick={() => onNavigate('corporateCampaigns')}
                        className="absolute top-8 right-8 text-gray-400 hover:text-gray-700 z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Banner Image */}
                    <div className="relative w-full h-64 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1607552351758-c39d62acb258?w=1200" 
                            alt="Swiss Adventure" 
                            className="w-full h-full object-cover" 
                        />
                        <span className="absolute top-4 right-4 px-4 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                            {mockCampaign.status}
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{mockCampaign.name}</h1>
                        
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm text-gray-600">
                                    R{mockCampaign.contributed.toLocaleString()}/ R{mockCampaign.goal.toLocaleString()}-{mockCampaign.progressPercentage}%
                                </p>
                                <p className="text-sm font-semibold text-gray-700">{mockCampaign.progressPercentage}%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-[#8363f2] h-3 rounded-full transition-all duration-500" 
                                    style={{ width: `${mockCampaign.progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex justify-between">
                                {['Overview', 'Vendors & Services', 'Members & Roles', 'Terms & Conditions'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 px-4 text-sm font-medium transition-colors whitespace-nowrap ${
                                            activeTab === tab
                                                ? 'border-b-2 border-[#8363f2] text-[#8363f2]'
                                                : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Overview Tab Content */}
                        {activeTab === 'Overview' && (
                            <div className="space-y-8">
                                {/* Description */}
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {mockCampaign.description}
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-8 py-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Goal</h4>
                                        <p className="text-2xl font-bold text-gray-900">R{mockCampaign.goal.toLocaleString()}.00</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Contributed</h4>
                                        <p className="text-2xl font-bold text-gray-900">R{mockCampaign.contributed.toLocaleString()}.00</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Remaining</h4>
                                        <p className="text-2xl font-bold text-gray-900">R{mockCampaign.remaining.toLocaleString()}.00</p>
                                    </div>
                                </div>

                                {/* Beneficiaries */}
                                <div className="flex items-center text-gray-800 py-2">
                                    <Users className="w-5 h-5 mr-2 text-[#8363f2]" />
                                    <span className="font-semibold">{mockCampaign.beneficiaries} Beneficiaries</span>
                                </div>

                                {/* Three Column Grid */}
                                <div className="grid grid-cols-3 gap-16 pt-8">
                                    {/* Vendors & Services */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-8">Vendors & Services</h3>
                                        <div className="space-y-6">
                                            {mockCampaign.vendors.map((vendor, index) => (
                                                <div key={index} className="flex items-start space-x-4 pb-2">
                                                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                        <img 
                                                            src={vendor.image} 
                                                            alt={vendor.name} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-900 text-sm leading-relaxed mb-1">
                                                            {vendor.name.replace('Oceanview ', '')}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{vendor.type}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-8">Members</h3>
                                        <div className="space-y-6">
                                            {mockCampaign.members.map((member, index) => (
                                                <div key={index} className="flex items-start space-x-4 pb-2">
                                                    <Avatar initials={member.initials} color={member.color} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-900 text-sm leading-relaxed mb-1">{member.name}</p>
                                                        <p className={`text-xs ${member.status === 'Critical' ? 'text-red-500' : 'text-gray-500'}`}>
                                                            {member.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sponsors */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-8">Sponsors</h3>
                                    </div>
                                </div>
                                
                                {/* Report Section */}
                                <div className="pt-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Report</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {mockCampaign.reportStats.map((stat, index) => (
                                            <div key={index} className="bg-[#8363f2] text-white p-6 rounded-xl flex items-center space-x-4">
                                                <div className="bg-white/20 p-3 rounded-lg">
                                                    <stat.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold">{stat.value}</p>
                                                    <p className="text-sm opacity-90">{stat.label}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Other tabs placeholders */}
                        {activeTab === 'Vendors & Services' && (
                            <div className="text-gray-600 p-8 text-center">Vendors & Services details</div>
                        )}
                        {activeTab === 'Members & Roles' && (
                            <div className="text-gray-600 p-8 text-center">Members & Roles details</div>
                        )}
                        {activeTab === 'Terms & Conditions' && (
                            <div className="text-gray-600 p-8 text-center">Terms & Conditions content</div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end space-x-4 px-8 py-6 bg-gray-50 border-t">
                        <button
                            onClick={() => onNavigate('corporateCampaigns')}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => onNavigate("editCampaign")}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                            Edit Campaign
                        </button>
                        <button
                            onClick={() => alert('Pausing campaign...')}
                            className="px-6 py-2.5 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors font-medium"
                        >
                            Pause Campaign
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}