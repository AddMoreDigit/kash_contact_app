import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Calendar, User, Home, Utensils, Bell, Save, X } from 'lucide-react';

interface EditBookingPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

type Page = "editBooking" | "vendorDashboard" | "vendorOverview";

export const EditBookingPage: React.FC<EditBookingPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('editBooking');
  const [formData, setFormData] = useState({
    campaignDate: '2025-12-10',
    guestName: 'Best Names',
    campaignName: 'Cape Town Gateway Weekend',
    room: 'Deluxe Suite',
    dining: 'Full Board',
    status: 'Confirmed',
    notifyMembers: false,
    notifyAdmin: true
  });

  const roomOptions = [
    'Standard Room',
    'Deluxe Room', 
    'Deluxe Suite',
    'Executive Suite',
    'Presidential Suite'
  ];

  const diningOptions = [
    'Bed & Breakfast',
    'Half Board',
    'Full Board',
    'All Inclusive'
  ];

  const statusOptions = [
    'Pending',
    'Confirmed',
    'Cancelled',
    'Completed'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking updated:', formData);
    alert('Booking updated successfully!');
    onNavigate('vendorDashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Booking</h1>
            <p className="text-gray-600">Update booking details and notify relevant parties</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              {/* Campaign Date */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={18} />
                  Campaign Date
                </label>
                <input
                  type="date"
                  value={formData.campaignDate}
                  onChange={(e) => setFormData({...formData, campaignDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                />
              </div>

              {/* Guest Name */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User size={18} />
                  Guest Name
                </label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  placeholder="Enter guest name"
                />
              </div>

              {/* Campaign Name */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={18} />
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={formData.campaignName}
                  onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  placeholder="Enter campaign name"
                />
              </div>

              {/* Room Selection */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Home size={18} />
                  Room
                </label>
                <select
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                >
                  {roomOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Dining Options */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Utensils size={18} />
                  Dining
                </label>
                <select
                  value={formData.dining}
                  onChange={(e) => setFormData({...formData, dining: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                >
                  {diningOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Bell size={18} />
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Notification Options */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-700 mb-3">Notification Settings</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.notifyMembers}
                      onChange={(e) => setFormData({...formData, notifyMembers: e.target.checked})}
                      className="w-4 h-4 text-[#8363f2] border-gray-300 rounded focus:ring-[#8363f2]"
                    />
                    <span className="text-gray-700">Notify campaign members for these changes</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.notifyAdmin}
                      onChange={(e) => setFormData({...formData, notifyAdmin: e.target.checked})}
                      className="w-4 h-4 text-[#8363f2] border-gray-300 rounded focus:ring-[#8363f2]"
                    />
                    <span className="text-gray-700">Notify campaign Admin only for these changes</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => onNavigate('vendorDashboard')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};