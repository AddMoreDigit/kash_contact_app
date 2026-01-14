import { useState } from 'react';
import { Gift, Calendar, Users, CheckCircle, X } from 'lucide-react';
import { CorporateSidebar } from '../../components/layout/CorporateSidebar';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType" | "corporateVouchers";

interface CorporateVouchersPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

interface Voucher {
  id: number;
  title: string;
  description: string;
  discount: string;
  code: string;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'redeemed' | 'expired';
  campaignName?: string;
  benefits: string[];
}

export function CorporateVouchersPage({ onNavigate, onLogout }: CorporateVouchersPageProps) {
  const [vouchers] = useState<Voucher[]>([
    {
      id: 1,
      title: 'Travel Voucher - Swiss Adventure',
      description: 'Get 20% off on accommodation and activities for the Swiss Adventure campaign participants',
      discount: '20% OFF',
      code: 'SWISS2025',
      expiryDate: 'Feb 28, 2025',
      usageLimit: 50,
      usedCount: 12,
      status: 'active',
      campaignName: 'Swiss Adventure',
      benefits: [
        'Valid for all accommodations',
        'Includes activity discounts',
        'Transferable to participants'
      ]
    },
    {
      id: 2,
      title: 'Dining Voucher - Team Retreat',
      description: 'Complimentary dining experience at selected restaurants for campaign contributors',
      discount: 'FREE MEAL',
      code: 'TEAMDINE24',
      expiryDate: 'Jan 31, 2025',
      usageLimit: 30,
      usedCount: 30,
      status: 'redeemed',
      campaignName: 'Team Retreat 2024',
      benefits: [
        'Valid at 15+ restaurants',
        'Up to R500 value',
        'Includes beverages'
      ]
    },
    {
      id: 3,
      title: 'Wellness Package - Health Initiative',
      description: 'Access to premium wellness services including spa and fitness center for 3 months',
      discount: 'R3,000 VALUE',
      code: 'WELLNESS25',
      expiryDate: 'Mar 15, 2025',
      usageLimit: 25,
      usedCount: 8,
      status: 'active',
      campaignName: 'Corporate Wellness',
      benefits: [
        'Spa treatments included',
        '3 months gym membership',
        'Nutrition consultation'
      ]
    }
  ]);

  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleRedeem = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowRedeemModal(true);
  };

  const handleConfirmRedeem = () => {
    // Handle redemption logic here
    setShowRedeemModal(false);
    setRecipientEmail('');
    setSelectedVoucher(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'redeemed':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CorporateSidebar 
        activePage="vouchers" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vouchers</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and redeem campaign vouchers and rewards</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right mr-4">
                <p className="text-sm text-gray-600">Available Vouchers</p>
                <p className="text-2xl font-bold text-[#8363f2]">{vouchers.filter(v => v.status === 'active').length}</p>
              </div>
              <button
                onClick={() => onNavigate('createCampaign')}
                className="px-4 py-2 bg-[#8363f2] text-white rounded-lg text-sm font-medium hover:bg-[#7354e1] transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Active Vouchers</p>
              <p className="text-3xl font-bold text-gray-900">{vouchers.filter(v => v.status === 'active').length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Gift className="w-6 h-6 text-[#8363f2]" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Redeemed</p>
              <p className="text-3xl font-bold text-gray-900">{vouchers.reduce((sum, v) => sum + v.usedCount, 0)}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Value</p>
              <p className="text-3xl font-bold text-gray-900">R12,500</p>
            </div>
          </div>

          {/* Vouchers Grid */}
          <div className="grid grid-cols-1 gap-6">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Gift className="w-5 h-5 text-[#8363f2]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{voucher.title}</h3>
                          {voucher.campaignName && (
                            <p className="text-sm text-gray-500">Campaign: {voucher.campaignName}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{voucher.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-[#8363f2] text-white px-4 py-2 rounded-lg mb-2">
                        <p className="text-lg font-bold">{voucher.discount}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(voucher.status)}`}>
                        {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Voucher Details Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-2">Voucher Code</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-3 py-1.5 rounded font-mono text-sm font-semibold text-gray-900">
                          {voucher.code}
                        </code>
                        <button 
                          onClick={() => navigator.clipboard.writeText(voucher.code)}
                          className="text-[#8363f2] hover:text-[#7354e1] text-xs font-medium"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-2">Usage</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#8363f2] h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(voucher.usedCount / voucher.usageLimit) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {voucher.usedCount}/{voucher.usageLimit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase mb-2">Benefits</p>
                    <ul className="space-y-1">
                      {voucher.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      Expires: {voucher.expiryDate}
                    </div>
                    <button
                      onClick={() => handleRedeem(voucher)}
                      disabled={voucher.status !== 'active'}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        voucher.status === 'active'
                          ? 'bg-[#8363f2] text-white hover:bg-[#7354e1]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {voucher.status === 'active' ? 'Redeem Voucher' : 'Not Available'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Redeem Modal */}
      {showRedeemModal && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Redeem Voucher</h3>
              <button 
                onClick={() => setShowRedeemModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-gray-900 mb-1">{selectedVoucher.title}</p>
                <code className="bg-white px-3 py-1 rounded font-mono text-sm font-bold text-[#8363f2]">
                  {selectedVoucher.code}
                </code>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Email (Optional)
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="employee@company.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8363f2] focus:border-[#8363f2]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Send voucher details to a participant or leave blank to redeem yourself
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="flex-1 px-4 py-2 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1]"
              >
                Confirm Redeem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CorporateVouchersPage;
