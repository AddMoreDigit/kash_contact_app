import { useState } from 'react';
import { ArrowLeft, Download, FileText, Calendar, Filter, Search, ChevronDown } from 'lucide-react';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface CampaignTransactionsPageProps {
  onNavigate: (page: Page) => void;
}

export default function CampaignTransactionsPage({ onNavigate }: CampaignTransactionsPageProps) {
  const [timeFilter, setTimeFilter] = useState("Today");
  const [statusFilter, setStatusFilter] = useState("All");

  const transactions = [
    { id: "#100212", date: "11 Aug 2025", campaign: "Sun City Cabana", vendor: "Seaview Lodge", amount: "R20,000", status: "Unpaid" },
    { id: "#100213", date: "11 Aug 2025", campaign: "Kruger National Park", vendor: "Magaliles", amount: "R15,000", status: "Paid" },
    { id: "#102156", date: "11 Aug 2025", campaign: "School uniform Donation", vendor: "Magaliles", amount: "R5,000", status: "Paid" },
    { id: "#20058", date: "11 Aug 2025", campaign: "Weekend Team Building", vendor: "Magaliles", amount: "R10,000", status: "Refund" },
    { id: "#55236", date: "11 Aug 2025", campaign: "Gold Reef City", vendor: "Magaliles", amount: "R12,000", status: "Paid" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "status-paid";
      case "unpaid": return "status-unpaid";
      case "refund": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
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
            <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </button>
            <button className="btn-secondary flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <select
                className="select-field pr-10"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
              </select>
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="select-field pr-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Paid</option>
                <option>Unpaid</option>
                <option>Refund</option>
              </select>
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="input-field pl-10"
              />
            </div>

            <button className="btn-primary px-6">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.campaign}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to 5 of 25 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-[#8363f2] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            {/* Additional content can go here */}
            <div className="dashboard-card">
              <h3 className="font-bold mb-4">Transaction Analytics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">R62,000</div>
                  <div className="text-sm text-gray-600">Total Paid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">R20,000</div>
                  <div className="text-sm text-gray-600">Unpaid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">R10,000</div>
                  <div className="text-sm text-gray-600">Refunds</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Transactions</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Month</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Amount</span>
                <span className="font-medium">R12,400</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}