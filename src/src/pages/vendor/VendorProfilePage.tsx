import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { CreateMenuModal } from '../../components/modals/CreateMenuModal';
import { 
  Edit, 
  Check, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Shield, 
  Bell, 
  ShoppingCart, 
  User, 
  Search,
  LayoutGrid,
  Camera,
  CreditCard,
  ChevronRight,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Page } from '../../types';

interface VendorProfilePageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const VendorProfilePage: React.FC<VendorProfilePageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  // Data state logic included
  const [vendorData, setVendorData] = useState({
    businessName: 'Seaview Luxury Lodge',
    category: 'Accommodation & Travel',
    email: 'contact@seaviewlodge.co.za',
    phone: '+27 12 345 6789',
    address: '123 Ocean Drive, Camps Bay, Cape Town, 8005',
    website: 'www.seaviewlodge.co.za',
    registrationNumber: '2023/123456/07',
    bio: 'Premier luxury accommodation offering breathtaking views of the Atlantic Ocean. Specializing in high-end group bookings and corporate retreats.'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Integration point for your API
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 overflow-y-auto">
        {/* --- DASHBOARD HEADER --- */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="relative w-1/3">
            <input 
              type="text" 
              placeholder="Search profile settings..." 
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm font-medium"
            />
            <Search className="absolute right-4 top-3 text-purple-400" size={18} />
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowCreateMenu(true)}
              className="flex items-center gap-2 bg-[#8363f2] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#7354e1] shadow-lg shadow-purple-100 transition-all"
            >
              <LayoutGrid size={18} />
              Create
            </button>
            <div className="flex items-center gap-4 text-gray-400">
              <Bell size={22} className="cursor-pointer hover:text-gray-600" />
              <ShoppingCart size={22} className="cursor-pointer hover:text-gray-600" />
              <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white cursor-pointer">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Header Image Section */}
        <div className="relative h-48 bg-gradient-to-r from-emerald-400 to-teal-500">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=300&fit=crop" 
            alt="Hotel Room" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 left-6">
            <h1 className="text-2xl font-bold text-white">Seaview Luxury Lodge</h1>
          </div>
        </div>

        <main className="p-6 max-w-7xl mx-auto -mt-8 relative">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-4 space-y-4">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Seaview Luxury Lodge</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Full name</label>
                    <input 
                      readOnly={!isEditing}
                      defaultValue="John Doe"
                      className={`w-full mt-1 px-3 py-2 text-sm rounded border ${
                        isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email address</label>
                    <input 
                      readOnly={!isEditing}
                      defaultValue={vendorData.email}
                      className={`w-full mt-1 px-3 py-2 text-sm rounded border ${
                        isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Phone number</label>
                    <input 
                      readOnly={!isEditing}
                      defaultValue={vendorData.phone}
                      className={`w-full mt-1 px-3 py-2 text-sm rounded border ${
                        isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Address details</label>
                    <textarea 
                      readOnly={!isEditing}
                      rows={3}
                      defaultValue={vendorData.address}
                      className={`w-full mt-1 px-3 py-2 text-sm rounded border resize-none ${
                        isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Earnings Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Earnings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This month</span>
                    <span className="text-sm font-medium">R45,230</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last month</span>
                    <span className="text-sm font-medium">R38,150</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium text-gray-800">Total earned</span>
                    <span className="text-sm font-semibold">R425,680</span>
                  </div>
                </div>
              </div>

              {/* Profile Progress */}
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Complete Your Profile</h3>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <path
                      stroke="#e5e7eb"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Progress circle */}
                    <path
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      strokeDasharray="50, 100"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">50%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Add more details to improve your profile</p>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-8 space-y-6">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mb-4">
                {isEditing && (
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  {isEditing ? <Check size={18} /> : <Edit size={18} />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      readOnly={!isEditing}
                      defaultValue="John"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      readOnly={!isEditing}
                      defaultValue="Doe"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input 
                      type="date" 
                      readOnly={!isEditing}
                      defaultValue="1990-05-15"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select 
                      disabled={!isEditing}
                      defaultValue="male"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Security</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-800">Password</h3>
                      <p className="text-sm text-gray-600">Last updated 3 months ago</p>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      Change Password
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-800">Two Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-gray-800">Login History</h3>
                      <p className="text-sm text-gray-600">View recent login activity</p>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <CreateMenuModal 
        isOpen={showCreateMenu}
        onClose={() => setShowCreateMenu(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};