import { ArrowLeft, Trophy, Target, TrendingUp, Calendar, BarChart } from 'lucide-react';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface PersonalGoalsPageProps {
  onNavigate: (page: Page) => void;
}

export default function PersonalGoalsPage({ onNavigate }: PersonalGoalsPageProps) {
  const goals = [
    {
      title: "Fund 50 trips this year",
      current: 25,
      target: 50,
      progress: 50,
      status: "in-progress",
      deadline: "Dec 2025",
    },
    {
      title: "Sponsor R50,000 in Education Package",
      current: 50000,
      target: 50000,
      progress: 100,
      status: "completed",
      deadline: "Dec 2025",
    },
    {
      title: "Sponsor R50,000 in Healthcare Package",
      current: 0,
      target: 50000,
      progress: 0,
      status: "pending",
      deadline: "Dec 2025",
    },
  ];

  const contributions = [
    { month: "Jan", amount: 8000 },
    { month: "Apr", amount: 12000 },
    { month: "Jul", amount: 15000 },
    { month: "Aug", amount: 10000 },
    { month: "Sept", amount: 18000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("corporateDashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Personal Goals Tracker</h1>
          </div>
          <p className="text-gray-600">
            Track your progress towards corporate impact goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {goals.map((goal, index) => (
            <div key={index} className="dashboard-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold mb-2">{goal.title}</h3>
                  <div className="text-sm text-gray-600">
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                    <span className="ml-2 text-xs">• Due {goal.deadline}</span>
                  </div>
                </div>
                {goal.status === "completed" && (
                  <Trophy className="w-6 h-6 text-yellow-500" />
                )}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="campaign-progress">
                  <div 
                    className="campaign-progress-fill" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {goal.target - goal.current > 0 ? 
                    `${(goal.target - goal.current).toLocaleString()} remaining` : 
                    'Goal completed!'
                  }
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  goal.status === 'completed' ? 'bg-green-100 text-green-700' :
                  goal.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('-', ' ')}
                </span>
                <button className="text-[#8363f2] text-sm hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contributions Chart */}
        <div className="dashboard-card mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Contributions</h2>
            <button className="btn-outline flex items-center">
              <BarChart className="w-4 h-4 mr-2" />
              Complete View
            </button>
          </div>

          <div className="flex items-end h-48 space-x-2">
            {contributions.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-[#8363f2] rounded-t"
                  style={{ height: `${(item.amount / 20000) * 100}%` }}
                ></div>
                <div className="mt-2 text-xs text-gray-600">{item.month}</div>
                <div className="text-xs font-medium">
                  R{item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dashboard-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-[#8363f2]" />
              </div>
              <div>
                <div className="font-bold">1 / 3</div>
                <div className="text-sm text-gray-600">Goals Completed</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              33% of annual goals completed
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-bold">R63,000</div>
                <div className="text-sm text-gray-600">Total Contributed</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              +15% from last quarter
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold">30 Days</div>
                <div className="text-sm text-gray-600">Next Review</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Until next goal review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}