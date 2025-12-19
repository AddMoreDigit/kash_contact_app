import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { CreateMenuModal } from '../../components/modals/CreateMenuModal';
import { CheckCircle, XCircle, Eye, Calendar, User, DollarSign, Users, MoreVertical, Search, Bell, ShoppingCart, LayoutGrid, Clock } from 'lucide-react';
import { Page } from '../../types';

interface ApproveBookingPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface BookingRequest {
  id: number;
  campaignName: string;
  adminName: string;
  adminEmail: string;
  dateRange: string;
  members: number;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  details: {
    rooms: string;
    dining: string;
    activities: string[];
  };
}

export const ApproveBookingPage: React.FC<ApproveBookingPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('approveBooking');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: 1,
      campaignName: 'Cape town Seaview Lodge Weekend',
      adminName: 'Sarah M. Mkhize',
      adminEmail: 'sarah@example.com',
      dateRange: 'Dec 10, 2025 - Dec 12, 2025',
      members: 8,
      amount: 'R10,000.00',
      status: 'pending',
      details: {
        rooms: '2x Deluxe Rooms, 1x Standard Room',
        dining: 'Full Board',
        activities: ['Horse Riding', 'City Tour', 'Boat Cruise']
      }
    },
    {
      id: 2,
      campaignName: 'Durban Beach Escape',
      adminName: 'Bornwise N. Baloyi',
      adminEmail: 'bornwise@example.com',
      dateRange: 'Dec 10, 2025 - Dec 12, 2025',
      members: 6,
      amount: 'R8,000.00',
      status: 'pending',
      details: {
        rooms: '3x Standard Rooms',
        dining: 'Half Board',
        activities: ['Beach Day', 'Snorkeling']
      }
    },
    {
      id: 3,
      campaignName: 'Zanzibar Gateway Weekend',
      adminName: 'Sarah M. Mkhize',
      adminEmail: 'sarah@example.com',
      dateRange: 'Dec 10, 2025 - Dec 12, 2025',
      members: 12,
      amount: 'R10,000.00',
      status: 'pending',
      details: {
        rooms: '4x Deluxe Suites',
        dining: 'All Inclusive',
        activities: ['Island Tour', 'Dolphin Watching', 'Spa']
      }
    }
  ]);

  const handleApprove = (id: number) => {
    setBookingRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    alert('Booking approved successfully!');
  };

  const handleReject = (id: number) => {
    setBookingRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    alert('Booking rejected.');
  };

  const handleView = (id: number) => {
    const request = bookingRequests.find(req => req.id === id);
    console.log('View booking request:', request);
    onNavigate('vendorViewCampaign');
  };

  const pendingRequests = bookingRequests.filter(req => req.status === 'pending');
  const approvedRequests = bookingRequests.filter(req => req.status === 'approved');
  const rejectedRequests = bookingRequests.filter(req => req.status === 'rejected');

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="relative w-1/3">
            <input 
              type="text" 
              placeholder="Search booking requests..." 
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm"
            />
            <Search className="absolute right-4 top-3 text-purple-400" size={18} />
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowCreateMenu(true)}
              className="flex items-center gap-2 bg-[#8363f2] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#7354e1] shadow-lg shadow-purple-200"
            >
              <LayoutGrid size={18} />
              Create
            </button>
            <div className="flex items-center gap-4 text-gray-400">
              <Bell size={22} />
              <ShoppingCart size={22} />
              <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white"><User size={20} /></div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Booking Requests</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">Review and approve booking requests from campaign admins</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl"><Calendar className="text-blue-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Total Requests</p>
                  <p className="text-2xl font-black text-gray-800">{bookingRequests.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-50 p-3 rounded-xl"><Users className="text-yellow-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Pending Review</p>
                  <p className="text-2xl font-black text-gray-800">{pendingRequests.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-xl"><CheckCircle className="text-green-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Approved</p>
                  <p className="text-2xl font-black text-gray-800">{approvedRequests.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-xl"><XCircle className="text-red-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Rejected</p>
                  <p className="text-2xl font-black text-gray-800">{rejectedRequests.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pending Approval</h2>
              <div className="flex items-center gap-2">
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingRequests.length} Pending
                </div>
              </div>
            </div>
            
            <div className="grid gap-6">
              {pendingRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Campaign Header */}
                  <div className="bg-gradient-to-r from-[#8363f2] to-[#9c7df5] p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{request.campaignName}</h3>
                        <div className="flex items-center gap-2 text-purple-100">
                          <User size={16} />
                          <span className="text-sm">{request.adminName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black">{request.amount}</p>
                        <p className="text-sm text-purple-100">Total Budget</p>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Info */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Calendar className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">Duration</p>
                          <p className="font-semibold text-gray-900">{request.dateRange}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Users className="text-green-600" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">Group Size</p>
                          <p className="font-semibold text-gray-900">{request.members} Members</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl col-span-2 lg:col-span-1">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                          <Clock className="text-yellow-600" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
                          <p className="font-semibold text-yellow-600">Awaiting Review</p>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 text-gray-900">Service Requirements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="text-sm font-medium text-blue-700">Accommodation</p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">{request.details.rooms}</p>
                        </div>
                        
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-sm font-medium text-green-700">Dining</p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">{request.details.dining}</p>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <p className="text-sm font-medium text-purple-700">Activities</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{request.details.activities.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                      <div className="flex gap-3 flex-1">
                        <button 
                          onClick={() => handleView(request.id)}
                          className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors flex-1 sm:flex-none"
                        >
                          <Eye size={18} />
                          View Details
                        </button>
                        <button 
                          onClick={() => handleReject(request.id)}
                          className="flex items-center justify-center gap-2 px-6 py-3 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl font-medium transition-colors flex-1 sm:flex-none"
                        >
                          <XCircle size={18} />
                          Decline
                        </button>
                      </div>
                      <button 
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#8363f2] to-[#9c7df5] hover:from-[#7354e1] hover:to-[#8b6ef2] text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                      >
                        <CheckCircle size={18} />
                        Accept Campaign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {pendingRequests.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Requests</h3>
                  <p className="text-gray-500">All booking requests have been reviewed.</p>
                </div>
              )}
            </div>
          </div>

          {/* Approved & Rejected Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Approved Requests */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Approved Campaigns</h2>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {approvedRequests.length}
                </div>
              </div>
              
              <div className="space-y-4">
                {approvedRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                      <div className="flex justify-between items-start text-white">
                        <div>
                          <h4 className="font-bold text-lg">{request.campaignName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <User size={14} />
                            <p className="text-green-100 text-sm">{request.adminName}</p>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-white text-xs font-semibold">✓ Approved</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium mb-1">Duration</p>
                          <p className="text-sm font-semibold text-gray-900">{request.dateRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 uppercase font-medium mb-1">Budget</p>
                          <p className="text-lg font-bold text-green-600">{request.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {approvedRequests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Campaigns</h3>
                    <p className="text-gray-500 text-sm">Approved campaigns will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Rejected Requests */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Declined Campaigns</h2>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {rejectedRequests.length}
                </div>
              </div>
              
              <div className="space-y-4">
                {rejectedRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4">
                      <div className="flex justify-between items-start text-white">
                        <div>
                          <h4 className="font-bold text-lg">{request.campaignName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <User size={14} />
                            <p className="text-red-100 text-sm">{request.adminName}</p>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-white text-xs font-semibold">✗ Declined</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium mb-1">Duration</p>
                          <p className="text-sm font-semibold text-gray-900">{request.dateRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 uppercase font-medium mb-1">Budget</p>
                          <p className="text-lg font-bold text-gray-600">{request.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {rejectedRequests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <XCircle className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Declined Campaigns</h3>
                    <p className="text-gray-500 text-sm">Declined campaigns will appear here.</p>
                  </div>
                )}
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