import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { CreateMenuModal } from '../../components/modals/CreateMenuModal';
import { 
  Search, 
  LayoutGrid, 
  Bell, 
  ShoppingCart, 
  User, 
  Eye, 
  Printer, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Filter
} from 'lucide-react';
import { Page } from '../../types';

interface VendorBookingRequestsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface BookingRequest {
  id: string;
  customerName: string;
  campaignName: string;
  dates: string;
  guests: number;
  amount: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Expired';
  requestDate: string;
  image?: string;
}

export const VendorBookingRequestsPage: React.FC<VendorBookingRequestsPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorBookingRequests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [bookingRequests] = useState<BookingRequest[]>([
    {
      id: 'REQ001',
      customerName: 'Moonde, Thato Ukahle & Team',
      campaignName: 'Cape town Gateway Weekend',
      dates: '15 Jan - 18 Jan 2026',
      guests: 12,
      amount: 'R25,000',
      status: 'Pending',
      requestDate: '2025-12-15',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&q=80'
    },
    {
      id: 'REQ002',
      customerName: 'Corporate Solutions Ltd',
      campaignName: 'Executive Retreat Package',
      dates: '22 Jan - 25 Jan 2026',
      guests: 8,
      amount: 'R18,500',
      status: 'Approved',
      requestDate: '2025-12-14',
      image: 'https://images.unsplash.com/photo-1551882547-ff43c63efe81?w=100&q=80'
    },
    {
      id: 'REQ003',
      customerName: 'Innovation Hub Team',
      campaignName: 'Team Building Experience',
      dates: '10 Feb - 12 Feb 2026',
      guests: 15,
      amount: 'R32,000',
      status: 'Pending',
      requestDate: '2025-12-13',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&q=80'
    },
    {
      id: 'REQ004',
      customerName: 'StartUp Collective',
      campaignName: 'Product Launch Event',
      dates: '28 Jan - 30 Jan 2026',
      guests: 20,
      amount: 'R45,000',
      status: 'Rejected',
      requestDate: '2025-12-12',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=100&q=80'
    }
  ]);

  const getStatusColor = (status: BookingRequest['status']) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700 border border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border border-red-200';
      case 'Expired': return 'bg-gray-100 text-gray-700 border border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const filteredRequests = bookingRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApproveRequest = (requestId: string) => {
    // Handle approval logic here
    console.log('Approving request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    // Handle rejection logic here
    console.log('Rejecting request:', requestId);
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="relative w-1/3">
            <input 
              type="text" 
              placeholder="Search booking requests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <p className="text-gray-400 text-sm font-medium mt-1">Manage incoming booking requests from corporate clients</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 bg-white font-bold text-sm outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#8363f2] text-white rounded-xl font-bold text-sm">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl"><Clock className="text-blue-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Pending Requests</p>
                  <p className="text-2xl font-black text-gray-800">{bookingRequests.filter(r => r.status === 'Pending').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-xl"><CheckCircle className="text-green-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Approved</p>
                  <p className="text-2xl font-black text-gray-800">{bookingRequests.filter(r => r.status === 'Approved').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-xl"><XCircle className="text-red-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Rejected</p>
                  <p className="text-2xl font-black text-gray-800">{bookingRequests.filter(r => r.status === 'Rejected').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-xl"><Filter className="text-purple-600" size={24} /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Total Value</p>
                  <p className="text-2xl font-black text-gray-800">R120K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Requests Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Booking Requests</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600 text-sm bg-gray-50">
                  <th className="px-6 py-4 font-medium">Request ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Campaign</th>
                  <th className="px-6 py-4 font-medium">Dates</th>
                  <th className="px-6 py-4 font-medium">Guests</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.map((request, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900 text-sm">{request.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-8 rounded overflow-hidden border border-gray-200">
                          <img src={request.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.customerName}</p>
                          <p className="text-xs text-gray-500">Requested on {new Date(request.requestDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-sm font-medium max-w-[180px] truncate">{request.campaignName}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{request.dates}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{request.guests} guests</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-sm">{request.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {request.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleApproveRequest(request.id)}
                              className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition-colors"
                              title="Approve Request"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectRequest(request.id)}
                              className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
                              title="Reject Request"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 p-1" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1" title="More Options">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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