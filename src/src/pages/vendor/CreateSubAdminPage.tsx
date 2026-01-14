import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { UserPlus, UserCheck } from 'lucide-react';

type Page = 
  | "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" 
  | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" 
  | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" 
  | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" 
  | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" 
  | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" 
  | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" 
  | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" 
  | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" 
  | "corporateHelpSupport" | "saveDraft" | "selectUserType" | "corporateVouchers" 
  | "vendorOverview" | "myServices" | "createService" | "reportOrders" | "approveBooking" 
  | "vendorCampaigns" | "vendorTransactions" | "vendorProfile" | "vendorDrafts" 
  | "vendorHelpSupport" | "vendorMessages" | "createVoucher" | "editBooking" 
  | "vendorViewCampaign" | "vendorInvoice" | "createSubAdmin";

interface CreateSubAdminPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const CreateSubAdminPage: React.FC<CreateSubAdminPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('createSubAdmin');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'manager'
  });

  const roles = [
    { value: 'manager', label: 'Manager' },
    { value: 'support', label: 'Support Staff' },
    { value: 'finance', label: 'Finance Admin' },
    { value: 'marketing', label: 'Marketing Admin' },
  ];

  const existingAdmins = [
    { name: 'John Smith', email: 'john@seaviewlodge.co.za', role: 'Manager', status: 'active' },
    { name: 'Sarah Johnson', email: 'sarah@seaviewlodge.co.za', role: 'Support Staff', status: 'active' },
    { name: 'Mike Wilson', email: 'mike@seaviewlodge.co.za', role: 'Finance Admin', status: 'inactive' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sub-admin created:', formData);
    // In real app, submit to backend
    setFormData({ firstName: '', lastName: '', email: '', role: 'manager' });
    alert('Sub-admin invitation sent successfully!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Sub Admin</h1>
            <p className="text-gray-600">Add team members to help manage your business</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Form */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#8363f2]/10 rounded-lg">
                  <UserPlus className="text-[#8363f2]" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Add New Sub Admin</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="Enter first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Enter last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
                >
                  Send Invitation
                </button>
              </form>
            </div>

            {/* Existing Admins */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#8363f2]/10 rounded-lg">
                  <UserCheck className="text-[#8363f2]" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Existing Sub Admins</h2>
              </div>

              <div className="space-y-4">
                {existingAdmins.map((admin, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {admin.role}
                      </span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        admin.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Permissions Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Role Permissions</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Manager: Full access to all features</li>
                  <li>• Support Staff: View campaigns and bookings only</li>
                  <li>• Finance Admin: Access to transactions and reports</li>
                  <li>• Marketing Admin: Can create vouchers and view analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};