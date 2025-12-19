import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Download, Printer, Mail, User, Calendar, DollarSign, Users, Home, Utensils, Bike, Map, CheckCircle, XCircle, Clock, Phone, FileText, Tag, Eye, MoreVertical } from 'lucide-react';

interface ViewCampaignPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

type Page = "vendorViewCampaign" | "vendorDashboard" | "reportOrders" | "vendorInvoice" | "editBooking";

export const ViewCampaignPage: React.FC<ViewCampaignPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorViewCampaign');
  const [activeTab, setActiveTab] = useState<'details' | 'members' | 'itinerary' | 'billing'>('details');

  const campaignData = {
    // Campaign from User
    userCampaign: {
      id: 'UC-001',
      type: 'user' as const,
      name: 'Cape Town Gateway Weekend',
      organizer: 'Sarah Johnson (Individual User)',
      email: 'sarah.j@example.com',
      phone: '+27 123 456 789',
      date: 'Dec 5, 2025',
      members: 8,
      status: 'Confirmed',
      totalAmount: 'R20,000',
      paidAmount: 'R5,000',
      pendingAmount: 'R15,000',
      services: [
        { name: 'Deluxe Suite Stay (2 nights)', quantity: 2, price: 'R2,400', total: 'R4,800' },
        { name: 'Seafood Platter Dinner', quantity: 8, price: 'R300', total: 'R2,400' },
        { name: 'City Tour', quantity: 8, price: 'R200', total: 'R1,600' },
        { name: 'Airport Shuttle', quantity: 8, price: 'R150', total: 'R1,200' },
      ],
      membersList: [
        { name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+27 123 456 789', role: 'Admin', payment: 'Paid R5,000' },
        { name: 'John Smith', email: 'john.s@example.com', phone: '+27 987 654 321', role: 'Member', payment: 'Pending' },
        { name: 'Emma Wilson', email: 'emma.w@example.com', phone: '+27 456 789 123', role: 'Member', payment: 'Pending' },
      ],
      itinerary: [
        { day: 'Friday', date: 'Dec 5, 2025', activities: ['Arrival & Check-in', 'Welcome Dinner'] },
        { day: 'Saturday', date: 'Dec 6, 2025', activities: ['Breakfast', 'City Tour', 'Free Time'] },
        { day: 'Sunday', date: 'Dec 7, 2025', activities: ['Breakfast', 'Check-out'] },
      ]
    },
    // Campaign from Corporate
    corporateCampaign: {
      id: 'CC-001',
      type: 'corporate' as const,
      name: 'Gold Reef City Team Building',
      organizer: 'ABC Corporation',
      contact: 'David Baloyi (HR Manager)',
      email: 'david.b@abccorp.co.za',
      phone: '+27 111 222 333',
      date: 'Nov 15, 2025',
      members: 15,
      status: 'Confirmed',
      totalAmount: 'R75,000',
      paidAmount: 'R25,000',
      pendingAmount: 'R50,000',
      services: [
        { name: 'Standard Rooms (3 nights)', quantity: 15, price: 'R900', total: 'R13,500' },
        { name: 'Conference Hall Rental', quantity: 1, price: 'R10,000', total: 'R10,000' },
        { name: 'Team Building Activities', quantity: 15, price: 'R1,500', total: 'R22,500' },
        { name: 'Daily Meals (Breakfast, Lunch, Dinner)', quantity: 45, price: 'R300', total: 'R13,500' },
        { name: 'Transport Services', quantity: 15, price: 'R400', total: 'R6,000' },
      ],
      membersList: [
        { name: 'David Baloyi', email: 'david.b@abccorp.co.za', phone: '+27 111 222 333', role: 'Admin', payment: 'Paid R25,000' },
        { name: 'Lisa Chen', email: 'lisa.c@abccorp.co.za', phone: '+27 222 333 444', role: 'Finance', payment: 'Pending' },
        { name: 'Mike Johnson', email: 'mike.j@abccorp.co.za', phone: '+27 333 444 555', role: 'Participant', payment: 'Pending' },
      ],
      itinerary: [
        { day: 'Friday', date: 'Nov 14, 2025', activities: ['Team Arrival', 'Welcome Session', 'Networking Dinner'] },
        { day: 'Saturday', date: 'Nov 15, 2025', activities: ['Breakfast', 'Team Building Activities', 'Strategy Session', 'Gala Dinner'] },
        { day: 'Sunday', date: 'Nov 16, 2025', activities: ['Breakfast', 'Workshops', 'Departure'] },
      ]
    }
  };

  const [selectedCampaign, setSelectedCampaign] = useState(campaignData.userCampaign);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">View Campaign</h1>
              <p className="text-gray-600">Campaign orders from users and corporate customers</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer size={18} />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Mail size={18} />
                Email
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1]">
                <Download size={18} />
                Export Details
              </button>
            </div>
          </div>

          {/* Campaign Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setSelectedCampaign(campaignData.userCampaign)}
              className={`p-6 rounded-xl border-2 transition-all ${selectedCampaign.type === 'user' ? 'border-[#8363f2] bg-[#8363f2]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={20} className="text-[#8363f2]" />
                    <span className="font-semibold">User Campaign</span>
                  </div>
                  <h3 className="text-lg font-bold">{campaignData.userCampaign.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">Organized by individual user</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaignData.userCampaign.status)}`}>
                    {campaignData.userCampaign.status}
                  </span>
                  <p className="text-2xl font-bold mt-2">{campaignData.userCampaign.totalAmount}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedCampaign(campaignData.corporateCampaign)}
              className={`p-6 rounded-xl border-2 transition-all ${selectedCampaign.type === 'corporate' ? 'border-[#8363f2] bg-[#8363f2]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-[#8363f2]" />
                    <span className="font-semibold">Corporate Campaign</span>
                  </div>
                  <h3 className="text-lg font-bold">{campaignData.corporateCampaign.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">Organized by company</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaignData.corporateCampaign.status)}`}>
                    {campaignData.corporateCampaign.status}
                  </span>
                  <p className="text-2xl font-bold mt-2">{campaignData.corporateCampaign.totalAmount}</p>
                </div>
              </div>
            </button>
          </div>

          {/* Campaign Details */}
          <div className="bg-white rounded-xl shadow mb-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'details' ? 'border-[#8363f2] text-[#8363f2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'members' ? 'border-[#8363f2] text-[#8363f2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Members ({selectedCampaign.members})
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'itinerary' ? 'border-[#8363f2] text-[#8363f2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'billing' ? 'border-[#8363f2] text-[#8363f2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Billing
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Organizer Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Organizer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Organizer</p>
                        <p className="font-medium">{selectedCampaign.organizer}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedCampaign.email}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedCampaign.phone}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Campaign Date</p>
                        <p className="font-medium">{selectedCampaign.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Services Booked */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Services Booked</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Service</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Quantity</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Unit Price</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedCampaign.services.map((service, index) => (
                            <tr key={index}>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-[#8363f2]/10 rounded">
                                    <Tag size={16} className="text-[#8363f2]" />
                                  </div>
                                  <span className="font-medium">{service.name}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">{service.quantity}</td>
                              <td className="py-4 px-4">{service.price}</td>
                              <td className="py-4 px-4 font-bold">{service.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-gray-200">
                            <td colSpan={3} className="py-4 px-4 text-right font-semibold">Total Amount</td>
                            <td className="py-4 px-4 font-bold text-lg">{selectedCampaign.totalAmount}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'members' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Campaign Members</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Phone</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Role</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Payment Status</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedCampaign.membersList.map((member, index) => (
                          <tr key={index}>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#8363f2] rounded-full flex items-center justify-center text-white font-semibold">
                                  {member.name.charAt(0)}
                                </div>
                                <span className="font-medium">{member.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">{member.email}</td>
                            <td className="py-4 px-4">{member.phone}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 text-xs rounded ${
                                member.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {member.role}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 text-xs rounded ${
                                member.payment.includes('Paid') ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {member.payment}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button className="p-1 text-gray-500 hover:text-[#8363f2]">
                                <MoreVertical size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Itinerary</h3>
                  <div className="space-y-4">
                    {selectedCampaign.itinerary.map((day, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-[#8363f2] rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold">{day.day}</h4>
                            <p className="text-sm text-gray-600">{day.date}</p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                              <div className="w-2 h-2 bg-[#8363f2] rounded-full"></div>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold">{selectedCampaign.totalAmount}</p>
                    </div>
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">Paid Amount</p>
                      <p className="text-3xl font-bold">{selectedCampaign.paidAmount}</p>
                    </div>
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-600 mb-1">Pending Amount</p>
                      <p className="text-3xl font-bold">{selectedCampaign.pendingAmount}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Payment Instructions</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Payments are due 7 days before the campaign start date</p>
                      <p>• Bank transfer details will be provided upon request</p>
                      <p>• For corporate clients, invoice can be sent directly to finance department</p>
                      <p>• Contact organizer for payment-related queries</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button 
                onClick={() => onNavigate('editBooking')}
                className="px-6 py-3 border border-[#8363f2] text-[#8363f2] rounded-lg hover:bg-[#8363f2] hover:text-white transition-colors"
              >
                Edit Booking
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Send Reminder
              </button>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Cancel Campaign
              </button>
              <button 
                onClick={() => onNavigate('vendorInvoice')}
                className="px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1]"
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};