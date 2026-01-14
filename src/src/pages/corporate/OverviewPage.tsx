import { useState } from 'react';
import { TrendingUp, Users, DollarSign, Target, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Legend } from 'recharts';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface OverviewPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

const monthlyData = [
  { month: 'Jan', campaigns: 2, contribution: 15000, beneficiaries: 45 },
  { month: 'Feb', campaigns: 3, contribution: 22000, beneficiaries: 60 },
  { month: 'Mar', campaigns: 4, contribution: 28000, beneficiaries: 85 },
  { month: 'Apr', campaigns: 3, contribution: 35000, beneficiaries: 95 },
  { month: 'May', campaigns: 5, contribution: 42000, beneficiaries: 120 },
  { month: 'Jun', campaigns: 4, contribution: 38000, beneficiaries: 110 },
];

const activeCampaigns = [
  {
    name: 'Swiss Adventure',
    status: 'Active',
    progress: 70,
    goal: 25000,
    raised: 17500,
    beneficiaries: 50,
    endDate: 'Feb 10, 2025'
  },
  {
    name: 'Cape Town Trip',
    status: 'Active',
    progress: 45,
    goal: 30000,
    raised: 13500,
    beneficiaries: 40,
    endDate: 'Mar 15, 2025'
  },
  {
    name: 'Durban South Coast',
    status: 'Active',
    progress: 85,
    goal: 20000,
    raised: 17000,
    beneficiaries: 35,
    endDate: 'Jan 30, 2025'
  },
];

export function OverviewPage({ onNavigate, onLogout }: OverviewPageProps) {
  const [timeFilter, setTimeFilter] = useState('6months');

  return (
    <div className="flex h-screen bg-gray-50">
      <CorporateSidebar 
        activePage="overview" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
              <p className="text-sm text-gray-600 mt-1">Complete view of your campaigns and impact</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#8363f2] focus:border-[#8363f2]"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button
                onClick={() => onNavigate('createCampaign')}
                className="px-6 py-2 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1] transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Total Campaigns */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-[#8363f2]" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  12%
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
              <p className="text-3xl font-bold text-gray-900">21</p>
              <p className="text-xs text-gray-500 mt-2">5 Active, 16 Completed</p>
            </div>

            {/* Total Contribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  24%
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Contribution</p>
              <p className="text-3xl font-bold text-gray-900">R180,000</p>
              <p className="text-xs text-gray-500 mt-2">Across all campaigns</p>
            </div>

            {/* Total Beneficiaries */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  18%
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Beneficiaries</p>
              <p className="text-3xl font-bold text-gray-900">545</p>
              <p className="text-xs text-gray-500 mt-2">People supported</p>
            </div>

            {/* Average Campaign Size */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center text-red-600 text-sm font-medium">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  3%
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg Campaign</p>
              <p className="text-3xl font-bold text-gray-900">R8,571</p>
              <p className="text-xs text-gray-500 mt-2">Per campaign raised</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Contribution Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contribution Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorContribution" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8363f2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8363f2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="contribution" 
                    stroke="#8363f2" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorContribution)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Campaign Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="campaigns" fill="#8363f2" name="Campaigns" />
                  <Bar dataKey="beneficiaries" fill="#10b981" name="Beneficiaries" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Campaigns Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Active Campaigns</h3>
              <button
                onClick={() => onNavigate('corporateCampaigns')}
                className="text-sm text-[#8363f2] font-medium hover:text-[#7354e1]"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Raised / Goal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Beneficiaries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeCampaigns.map((campaign, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-[#8363f2] h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{campaign.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">
                          R{campaign.raised.toLocaleString()} / R{campaign.goal.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="w-4 h-4 mr-1 text-gray-400" />
                          {campaign.beneficiaries}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {campaign.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onNavigate('viewCampaign')}
                          className="text-sm text-[#8363f2] font-medium hover:text-[#7354e1]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Cards Row */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h4 className="text-sm font-medium opacity-90 mb-2">Impact Score</h4>
              <p className="text-4xl font-bold mb-1">8.7</p>
              <p className="text-sm opacity-80">Out of 10</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs">Based on beneficiaries reached and campaign success rate</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h4 className="text-sm font-medium opacity-90 mb-2">Success Rate</h4>
              <p className="text-4xl font-bold mb-1">92%</p>
              <p className="text-sm opacity-80">Campaign completion</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs">19 of 21 campaigns reached their goals</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h4 className="text-sm font-medium opacity-90 mb-2">Avg. Duration</h4>
              <p className="text-4xl font-bold mb-1">45</p>
              <p className="text-sm opacity-80">Days per campaign</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs">From start to goal completion</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OverviewPage;
