import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Page } from '../../types';
import { Download, Printer, Mail, User, Calendar, DollarSign, Users, Home, Utensils, Bike, Map, CheckCircle, XCircle, Clock } from 'lucide-react';

interface InvoicePageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const InvoicePage: React.FC<InvoicePageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorInvoice');

  const invoiceData = {
    company: 'Gold Reef City Theme Park',
    invoiceNo: 'INV No:100002975',
    transaction: {
      customer: 'Chibulo Moonde',
      email: 'ChibuloMoonde@icloud.org',
      phone: '+27 123456789'
    },
    campaign: {
      date: '11 Aug-12 December 2025',
      members: 6,
      costPerMember: 4000,
      total: 16000
    },
    services: [
      { name: 'Accommodation - Reef Hotel', description: '5 Stars hotel - 5 nights', price: 8000 },
      { name: 'Gold reef Dining', description: '5 Stars Dining - 5 nights', price: 4000 },
      { name: 'Activities', description: 'Horse riding, Bike riding, City tour', price: 4000 }
    ],
    itinerary: [
      { day: 'Day 1', activity: 'Arrival/Check in' },
      { day: 'Day 2', activity: 'Horse riding' },
      { day: 'Day 3', activity: 'Bike riding' },
      { day: 'Day 4', activity: 'City Tour' },
      { day: 'Day 5', activity: 'Checkout' }
    ],
    financial: {
      status: 'Unpaid',
      orderStatus: 'Pending',
      issueDate: '10 November 2025'
    },
    campaignMembers: [
      { name: 'Chibulo Moonde (admin)', email: 'chibulo@example.com' },
      { name: 'Sifiso Moloi', email: 'sifiso@example.com' },
      { name: 'David Baloyi', email: 'david@example.com' }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gold Reef City</h1>
              <p className="text-gray-600">Invoice and campaign details</p>
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
                Download Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Invoice Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Header */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{invoiceData.company}</h2>
                    <p className="text-gray-600">{invoiceData.invoiceNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#8363f2]">Gold Reef City theme park</p>
                    <p className="text-sm text-gray-500">Theme Park & Resort</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Transaction Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-3">Transaction</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{invoiceData.transaction.customer}</p>
                          <p className="text-sm text-gray-500">Customer</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{invoiceData.transaction.email}</p>
                          <p className="text-sm text-gray-500">Email</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{invoiceData.transaction.phone}</p>
                          <p className="text-sm text-gray-500">Phone</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-3">Campaign Date</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{invoiceData.campaign.date}</p>
                          <p className="text-sm text-gray-500">Duration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{invoiceData.campaign.members} Campaign Members</p>
                          <p className="text-sm text-gray-500">Total Participants</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-6">Services</h3>
                <div className="space-y-6">
                  {invoiceData.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#8363f2]/10 rounded-lg">
                          {index === 0 ? <Home size={20} className="text-[#8363f2]" /> :
                           index === 1 ? <Utensils size={20} className="text-[#8363f2]" /> :
                           <Bike size={20} className="text-[#8363f2]" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{service.name}</h4>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">R{service.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-6">Itinerary</h3>
                <div className="space-y-4">
                  {invoiceData.itinerary.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-20 font-medium text-gray-700">{item.day}</div>
                      <div className="flex-1 flex items-center gap-3">
                        <Map size={18} className="text-gray-500" />
                        <span>{item.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Side Details */}
            <div className="space-y-6">
              {/* Financial Breakdown */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-6">Financial Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cost per member</span>
                    <span className="font-bold">R{invoiceData.campaign.costPerMember.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Extra services (Meals, Games, etc.)</span>
                    <span className="font-bold">R4,000</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Campaign</span>
                      <span className="text-2xl font-bold text-[#8363f2]">
                        R{invoiceData.campaign.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-6">Payments status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {invoiceData.financial.status === 'Paid' ? 
                        <CheckCircle size={20} className="text-green-500" /> :
                        invoiceData.financial.status === 'Pending' ?
                        <Clock size={20} className="text-yellow-500" /> :
                        <XCircle size={20} className="text-red-500" />
                      }
                      <div>
                        <p className="font-medium">Payment Status</p>
                        <p className="text-sm text-gray-500">Current status</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      invoiceData.financial.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoiceData.financial.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoiceData.financial.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Status</p>
                      <p className="text-sm text-gray-500">Processing status</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      invoiceData.financial.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                      invoiceData.financial.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoiceData.financial.orderStatus}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500 mb-1">Issue Date</p>
                    <p className="font-medium">{invoiceData.financial.issueDate}</p>
                  </div>
                </div>
              </div>

              {/* Campaign Members */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-6">Campaign members</h3>
                <div className="space-y-3">
                  {invoiceData.campaignMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-[#8363f2] rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="space-y-3">
                  <button 
                    onClick={() => onNavigate('vendorDashboard')}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="w-full px-4 py-3 border border-[#8363f2] text-[#8363f2] rounded-lg hover:bg-[#8363f2] hover:text-white transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};