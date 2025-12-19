import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { CreateMenuModal } from '../../components/modals/CreateMenuModal';
import { 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  Bell, 
  ShoppingCart, 
  User, 
  Eye, 
  Printer, 
  FileText,
  BarChart3,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  MoreVertical,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Page } from '../../types';

interface VendorTransactionsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface Order {
  orderNo: string;
  sku: string;
  campaignName: string;
  customer: string;
  dates: string;
  amount: string;
  status: 'Paid' | 'Unpaid' | 'Refund' | 'Pending';
  image?: string;
}

export const VendorTransactionsPage: React.FC<VendorTransactionsPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorTransactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      orderNo: '#100212',
      sku: '11236',
      campaignName: 'Cape town Gateway Weekend',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '11 Aug-12 Dec 2025',
      amount: 'R20,000',
      status: 'Unpaid',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&q=80'
    },
    {
      orderNo: '#100213',
      sku: '11237',
      campaignName: 'Cape town Gateway Weekend',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '11 Aug-12 Dec 2025',
      amount: 'R5,000',
      status: 'Unpaid',
      image: 'https://images.unsplash.com/photo-1551882547-ff43c63efe81?w=100&q=80'
    },
    {
      orderNo: '#20058',
      sku: '25871',
      campaignName: 'Magalies park Hartbeesport Dam',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '30 Aug-12 Dec 2025',
      amount: 'R12,000',
      status: 'Paid',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&q=80'
    },
    {
      orderNo: '#99990',
      sku: '44750',
      campaignName: 'Gold Reef City Theme Park',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '01 Nov-12 Dec 2025',
      amount: 'R8,000',
      status: 'Refund',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=100&q=80'
    },
    {
      orderNo: '#100214',
      sku: '11240',
      campaignName: 'Sea city Wave event Park',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '01 Nov-12 Dec 2025',
      amount: 'R8,000',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&q=80'
    },
    {
      orderNo: '#42350',
      sku: '05934',
      campaignName: 'Sun city Wave event Park',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '01 Nov-12 Dec 2025',
      amount: 'R8,000',
      status: 'Paid',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&q=80'
    },
  ]);

  // Function to update order status
  const updateOrderStatus = (orderNo: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderNo === orderNo 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  // Logic from ReportOrdersPage
  const getStatusIcon = (status: Order['status']) => {
    switch(status) {
      case 'Paid': return <Clock size={14} className="text-white" />;
      case 'Unpaid': return <Clock size={14} className="text-white" />;
      case 'Pending': return <Clock size={14} className="text-white" />;
      case 'Refund': return <XCircle size={14} className="text-white" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'Paid': return 'bg-gray-100 text-gray-700 border border-gray-200';
      case 'Unpaid': return 'bg-red-500 text-white';
      case 'Pending': return 'bg-gray-100 text-gray-700 border border-gray-200';
      case 'Refund': return 'bg-gray-100 text-gray-700 border border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders
    .filter(order => order.status === 'Paid')
    .reduce((sum, order) => sum + parseFloat(order.amount.replace(/[^0-9.-]+/g, "")), 0);

  const pendingAmount = orders
    .filter(order => order.status === 'Unpaid' || order.status === 'Pending')
    .reduce((sum, order) => sum + parseFloat(order.amount.replace(/[^0-9.-]+/g, "")), 0);

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="relative w-1/3">
            <input 
              type="text" 
              placeholder="Search orders..." 
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
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Report</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">Track and manage all customer orders</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 bg-white font-bold text-sm outline-none"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="refund">Refund</option>
              </select>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#8363f2] text-white rounded-xl font-bold text-sm">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-10">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-green-50 p-2.5 rounded-xl"><FileText className="text-green-600" size={22} /></div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Total Orders</p>
                <p className="text-xl font-black text-gray-800">{orders.length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-orange-50 p-2.5 rounded-xl"><BarChart3 className="text-orange-600" size={22} /></div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Total Sales</p>
                <p className="text-xl font-black text-gray-800">R{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-purple-50 p-2.5 rounded-xl"><CheckCircle2 className="text-purple-600" size={22} /></div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Confirm Orders</p>
                <p className="text-xl font-black text-gray-800">{orders.filter(o => o.status === 'Paid').length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-red-50 p-2.5 rounded-xl"><XCircle className="text-red-600" size={22} /></div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Refunds</p>
                <p className="text-xl font-black text-gray-800">{orders.filter(o => o.status === 'Refund').length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-yellow-50 p-2.5 rounded-xl"><RotateCcw className="text-yellow-600" size={22} /></div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Pending Amount</p>
                <p className="text-xl font-black text-gray-800">R{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600 text-sm">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Order#</th>
                  <th className="px-4 py-3 font-medium">SKU</th>
                  <th className="px-4 py-3 font-medium">Campaign Name</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-12 h-8 rounded overflow-hidden border border-gray-200">
                        <img src={order.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{order.orderNo}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{order.sku}</td>
                    <td className="px-4 py-3 text-gray-900 text-sm font-medium max-w-[150px] truncate">{order.campaignName}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm max-w-[120px] truncate">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{order.dates}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-gray-600 p-1" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1" title="Print">
                          <Printer size={16} />
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