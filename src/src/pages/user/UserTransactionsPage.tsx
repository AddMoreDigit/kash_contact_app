import { UserSidebar } from '../../components/layout/UserSidebar';
import { toast } from 'sonner';
import { Toaster } from '../../../components/ui/sonner';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface UserTransactionsPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  onLogout?: () => void;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: 'Completed' | 'Pending';
  paymentMethod: string;
}

export function UserTransactionsPage({ onNavigate, onShowNotifications, hasUnreadNotifications, onShowCart, onLogout }: UserTransactionsPageProps) {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: '01/06/2025',
      description: 'Fund received for Grace',
      amount: 1500.00,
      status: 'Completed',
      paymentMethod: 'Debit Card',
    },
    {
      id: 2,
      date: '08/06/2025',
      description: 'Fund received for Paul',
      amount: 2000.00,
      status: 'Pending',
      paymentMethod: 'Debit Card',
    },
    {
      id: 3,
      date: '10/06/2025',
      description: 'Fund received for Amukelani',
      amount: 1000.00,
      status: 'Completed',
      paymentMethod: 'Wallet',
    },
    {
      id: 4,
      date: '15/06/2025',
      description: 'Fund received for Blessing',
      amount: 800.00,
      status: 'Completed',
      paymentMethod: 'Debit Card',
    },
    {
      id: 5,
      date: '20/06/2025',
      description: 'Fund received for Vukona',
      amount: 2500.00,
      status: 'Completed',
      paymentMethod: 'Cash Sent',
    },
    {
      id: 6,
      date: '01/07/2025',
      description: 'Fund received for Ndzulamo',
      amount: 500.00,
      status: 'Pending',
      paymentMethod: 'Debit Card',
    },
  ];

  const totalSpent = 7500.00;
  const totalReceived = 8500.00;
  const currentBalance = 13000.00;

  const handleDownloadPage = () => {
    // Create CSV content
    const csvHeaders = ['Date', 'Description', 'Amount', 'Status', 'Payment Method'];
    const csvRows = transactions.map(t => [
      t.date,
      t.description,
      `R${t.amount.toFixed(2)}`,
      t.status,
      t.paymentMethod
    ]);

    // Add summary information
    const summaryRows = [
      [],
      ['Summary'],
      ['Total Spent This Month', `R${totalSpent.toFixed(2)}`],
      ['Total Received', `R${totalReceived.toFixed(2)}`],
      ['Current Balance', `R${currentBalance.toFixed(2)}`]
    ];

    // Combine headers, data, and summary
    const allRows = [csvHeaders, ...csvRows, ...summaryRows];
    
    // Convert to CSV string
    const csvContent = allRows.map(row => row.join(',')).join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_summary_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Transactions summary downloaded successfully!');
  };

  return (
    <div className="flex h-screen bg-[#F5F5FA]">
      {/* Sidebar */}
      <UserSidebar activePage="transactions" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 ml-6">
              {/* Create Button */}
              <button className="bg-[#8363f2] text-white px-4 py-2 rounded-lg text-[14px] hover:bg-[#7354e1] transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create
              </button>

              {/* Notifications */}
              <button
                onClick={onShowNotifications}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {hasUnreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={onShowCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>

              {/* Profile */}
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-8">
          {/* Sort by button */}
          <div className="flex justify-end mb-6">
            <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span className="text-[14px]">Sort by</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Total spent this month */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-[14px] text-gray-600 mb-3">Total spent this month</p>
              <p className="text-[28px] text-gray-900 mb-2">R{totalSpent.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                This week
              </div>
            </div>

            {/* Total received */}
            <div className="bg-[#8363f2] rounded-lg p-6 shadow-sm">
              <p className="text-[14px] text-white/90 mb-3">Total received</p>
              <p className="text-[28px] text-white mb-2">R{totalReceived.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-[12px] text-white/80">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                This week
              </div>
            </div>

            {/* Current Balance */}
            <div className="bg-black rounded-lg p-6 shadow-sm">
              <p className="text-[14px] text-white/90 mb-3">Current Balance</p>
              <p className="text-[28px] text-white mb-2">R{currentBalance.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-[12px] text-white/80">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                This week
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Headers */}
            <div className="grid grid-cols-5 gap-6 px-6 py-4 border-b border-gray-200 bg-gray-50">
              <p className="text-[14px] text-gray-700">Date</p>
              <p className="text-[14px] text-gray-700">Description</p>
              <p className="text-[14px] text-gray-700">Amount</p>
              <p className="text-[14px] text-gray-700">Status</p>
              <p className="text-[14px] text-gray-700">Payment method</p>
            </div>

            {/* Table Rows */}
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-5 gap-6 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <p className="text-[14px] text-gray-900">{transaction.date}</p>
                <p className="text-[14px] text-gray-900">{transaction.description}</p>
                <p className="text-[14px] text-gray-900">R{transaction.amount.toFixed(2)}</p>
                <div className="flex items-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-[12px] ${
                      transaction.status === 'Completed'
                        ? 'bg-[#DBEAFE] text-[#1E40AF]'
                        : 'bg-[#FEE2E2] text-[#DC2626]'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
                <p className="text-[14px] text-gray-900">{transaction.paymentMethod}</p>
              </div>
            ))}
          </div>

          {/* Download Page Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDownloadPage}
              className="bg-[#8363f2] rounded-lg px-6 py-2.5 hover:bg-[#7354e1] transition-colors shadow-sm"
            >
              <span className="text-[14px] text-white">Download page</span>
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}