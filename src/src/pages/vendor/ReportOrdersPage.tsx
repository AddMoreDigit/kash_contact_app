import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Search, Filter, Download, Printer, Eye, FileText, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';

interface ReportOrdersPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

type Page = "reportOrders" | "vendorDashboard" | "vendorViewCampaign" | "vendorInvoice";

interface Order {
  orderNo: string;
  sku: string;
  campaignName: string;
  customer: string;
  dates: string;
  amount: string;
  status: 'Paid' | 'Unpaid' | 'Refund' | 'Pending';
}

export const ReportOrdersPage: React.FC<ReportOrdersPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('reportOrders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders: Order[] = [
    {
      orderNo: '#100212',
      sku: '11236',
      campaignName: 'Cape town Gateway Weekend',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '11 Aug-12 Dec 2025',
      amount: 'R20,000',
      status: 'Unpaid'
    },
    {
      orderNo: '#100213',
      sku: '11237',
      campaignName: 'Cape town Gateway Weekend',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '11 Aug-12 Dec 2025',
      amount: 'R5,000',
      status: 'Unpaid'
    },
    {
      orderNo: '#102156',
      sku: '11238',
      campaignName: 'Cape town Gateway Weekend',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '11 Aug-12 Dec 2025',
      amount: 'R5,000',
      status: 'Unpaid'
    },
    {
      orderNo: '#20058',
      sku: '25871',
      campaignName: 'Magalies park Hartbeesport Dam',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '30 Aug-12 Dec 2025',
      amount: 'R12,000',
      status: 'Paid'
    },
    {
      orderNo: '#55236',
      sku: '00254',
      campaignName: 'Sun city Wave water Park',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '01 Nov-12 Dec 2025',
      amount: 'R8,000',
      status: 'Paid'
    },
    {
      orderNo: '#99990',
      sku: '44750',
      campaignName: 'Gold Reef City Theme Park',
      customer: 'Moonde, Thato Ukahle, bonga & more',
      dates: '01 Nov-12 Dec 2025',
      amount: 'R8,000',
      status: 'Refund'
    },
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch(status) {
      case 'Paid': return <CheckCircle size={16} className="text-green-500" />;
      case 'Unpaid': return <Clock size={16} className="text-yellow-500" />;
      case 'Pending': return <Clock size={16} className="text-blue-500" />;
      case 'Refund': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Unpaid': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Refund': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report</h1>
          <p className="text-gray-600">Track and manage all customer orders</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold mt-2">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Paid Orders</p>
            <p className="text-2xl font-bold mt-2">{orders.filter(o => o.status === 'Paid').length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold mt-2">R{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Pending Amount</p>
            <p className="text-2xl font-bold mt-2">R{pendingAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-semibold">Orders</h2>
              
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search orders..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="pending">Pending</option>
                    <option value="refund">Refund</option>
                  </select>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1]">
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <span className="w-12"></span>
              <span className="flex-1">Product</span>
              <span className="w-24 text-center">Order#</span>
              <span className="w-24 text-center">SKU</span>
              <span className="w-48">Campaign Name</span>
              <span className="w-64">Customer</span>
              <span className="w-48">Dates</span>
              <span className="w-32">Amount</span>
              <span className="w-24">Status</span>
              <span className="w-32">Action</span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-gray-500">{index + 1}</span>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FileText size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{order.campaignName}</p>
                        <p className="text-sm text-gray-500">Order #{order.orderNo}</p>
                      </div>
                    </div>
                  </div>
                  
                  <span className="w-24 text-center font-medium">{order.orderNo}</span>
                  <span className="w-24 text-center text-gray-500">{order.sku}</span>
                  
                  <span className="w-48 font-medium">{order.campaignName}</span>
                  
                  <span className="w-64 text-gray-600">{order.customer}</span>
                  
                  <span className="w-48 text-gray-500">{order.dates}</span>
                  
                  <span className="w-32 font-bold">{order.amount}</span>
                  
                  <span className="w-24">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </span>
                  
                  <span className="w-32">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onNavigate('vendorViewCampaign')}
                        className="p-2 text-gray-600 hover:text-[#8363f2] hover:bg-[#8363f2]/10 rounded-lg"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                        title="Print"
                      >
                        <Printer size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                        title="More"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">Showing {filteredOrders.length} of {orders.length} orders</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Orders Value</p>
                  <p className="text-xl font-bold">R{(totalRevenue + pendingAmount).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Net Revenue</p>
                  <p className="text-xl font-bold text-green-600">R{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};