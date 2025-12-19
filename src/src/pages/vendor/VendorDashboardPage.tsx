import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { CampaignCancellationModal } from './CampaignCancellationModal';
import { BookingDetailModal } from './BookingDetailModal';
import { CreateMenuModal } from '../../components/modals/CreateMenuModal';
import { Page } from '../../types';
import { toast } from 'sonner';
import { 
  Search, 
  Bell, 
  Filter, 
  Plus, 
  Eye, 
  ChevronRight, 
  Activity, 
  CreditCard, 
  XCircle,
  ListFilter,
  ChevronLeft,
  ShoppingCart,
  User
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface VendorDashboardPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const VendorDashboardPage: React.FC<VendorDashboardPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorDashboard');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 2, 14));
  const [selectedCampaign, setSelectedCampaign] = useState<string>('Cape Town Gateway Weekend');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showVoucherSort, setShowVoucherSort] = useState(false);

  const eventDays = [
    new Date(2025, 11, 1),
    new Date(2025, 11, 2),
    new Date(2025, 11, 3),
    new Date(2025, 11, 4),
    new Date(2025, 11, 5),
    new Date(2025, 11, 6),
    new Date(2025, 11, 7),
    new Date(2025, 11, 8),
    new Date(2025, 11, 10),
    new Date(2025, 11, 11),
    new Date(2025, 11, 12),
    new Date(2025, 11, 14),
    new Date(2025, 11, 15),
    new Date(2025, 11, 17),
    new Date(2025, 11, 18),
    new Date(2025, 11, 23),
    new Date(2025, 11, 24),
    new Date(2025, 11, 29),
    new Date(2025, 11, 30),
  ];

  const modifiers = {
    purple: eventDays.filter((_, i) => i % 4 === 0),
    red: eventDays.filter((_, i) => i % 4 === 1),
    indigo: eventDays.filter((_, i) => i % 4 === 2),
    orange: eventDays.filter((_, i) => i % 4 === 3),
  };

  const modifiersClassNames = {
    purple: 'bg-[#8363f2] text-white',
    red: 'bg-red-500 text-white',
    indigo: 'bg-indigo-900 text-white',
    orange: 'bg-orange-500 text-white',
    today: 'font-bold text-[#8363f2]',
  };

  // --- DATA ---
  const campaigns = [
    { 
      name: 'Cape town - Seaview lodge', 
      goal: 20000, 
      saved: 8000, 
      progress: 75, 
      color: '#8363f2',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'
    },
    { 
      name: 'Durban gateway - front beach', 
      goal: 20000, 
      saved: 8000, 
      progress: 25, 
      color: '#1e1b4b',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'
    },
    { 
      name: 'Durban - south coast', 
      goal: 20000, 
      saved: 8000, 
      progress: 50, 
      color: '#8363f2',
      img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80'
    },
  ];

  const claimedVouchers = [
    { 
      id: 'V001', 
      name: '10% Off Accommodation', 
      date: 'September 2, 2025', 
      claimedBy: 'VUsimuzi', 
      img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&q=80',
    },
    { 
      id: 'V002', 
      name: '5% Off Food', 
      date: 'August 16, 2025', 
      claimedBy: 'Jayden', 
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=80',
    }
  ];

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setShowBookingModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* --- TOP BAR --- */}
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowCreateMenu(true)} className="px-8 py-2.5 bg-[#8363f2] text-white rounded-xl font-semibold shadow-lg shadow-[#8363f2]/20 hover:bg-[#7354e1]">
              Create
            </button>
            <div className="flex items-center gap-4 text-gray-600">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
                <Bell size={22} className="cursor-pointer" />
              </button>
              <button onClick={() => onNavigate('vendorDrafts')} className="">
                <ShoppingCart size={22} className="cursor-pointer" />
              </button>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="relative">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white"><User size={20} /></div>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Vendor name</h1>
          <p className="text-gray-400 text-sm mt-1">This is your overview of your business</p>
        </div>

        {/* --- MAIN 2x2 GRID --- */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Campaigns Overview */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Campaigns Overview</h2>
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 relative"
              >
                <ListFilter size={16} /> Sort by
              </button>
            </div>
            <div className="space-y-5 overflow-y-auto flex-1">
              {campaigns.map((c, i) => (
                <div key={i} className="flex gap-5 items-start group">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-1">{c.name}</p>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-tighter">Goal R{c.goal.toLocaleString()} - Saved R{c.saved.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 overflow-hidden h-2 rounded-full bg-gray-100">
                        <div style={{ width: `${c.progress}%`, backgroundColor: c.color }} className="h-full rounded-full transition-all" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 w-8">{c.progress}%</span>
                    </div>
                  </div>
                  <div className="w-24 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={c.img} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Monthly revenue</h2>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 relative"
              >
                <Filter size={16} /> Filter By
              </button>
            </div>
            <div className="mb-6">
              <p className="text-[#8363f2] text-2xl font-extrabold">Total - R12 563.00</p>
              <p className="text-gray-400 text-xs mt-1 uppercase font-bold tracking-widest">Target: R20 000</p>
            </div>
            <div className="relative flex-1 w-full px-2">
              <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8363f2" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8363f2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,100 C60,95 80,50 130,50 S180,90 230,40 S320,70 360,30 L400,30" fill="none" stroke="#8363f2" strokeWidth="4" strokeLinecap="round" />
                <path d="M0,100 C60,95 80,50 130,50 S180,90 230,40 S320,70 360,30 L400,30 L400,120 L0,120 Z" fill="url(#gradient)" stroke="none" />
              </svg>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-4 px-2 uppercase tracking-tighter">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov'].map(m => (
                    <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Claimed Vouchers */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Claimed Vouchers</h2>
              <button
                onClick={() => setShowVoucherSort(!showVoucherSort)}
                className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 relative"
              >
                <ListFilter size={16} /> Sort by
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto flex-1">
              {claimedVouchers.map((v, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 shadow-sm border border-gray-50">
                    <img src={v.img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-gray-900 mb-0.5">{v.name}</p>
                        <Eye size={16} className="text-gray-300 group-hover:text-[#8363f2]" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">
                      {v.date} | <span className="text-gray-500">Claimed By {v.claimedBy}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Calendar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
              <div className="flex justify-between items-center mb-6 px-1 mt-2 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">December 2025</span>
                </div>
                <div className="flex gap-4">
                  <ChevronLeft size={20} className="text-gray-900 cursor-pointer" />
                  <ChevronRight size={20} className="text-gray-900 cursor-pointer" />
                </div>
              </div>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                onDayClick={handleDateClick}
                month={new Date(2025, 11)} // December 2025
                modifiers={modifiers}
                modifiersClassNames={{
                  purple: '!bg-[#8363f2] !text-white hover:!bg-[#7354e1]',
                  red: '!bg-red-500 !text-white hover:!bg-red-600',
                  indigo: '!bg-indigo-900 !text-white hover:!bg-indigo-800',
                  orange: '!bg-orange-500 !text-white hover:!bg-orange-600',
                  today: '!font-bold !text-[#8363f2]',
                }}
                components={{ 
                  Caption: () => null,
                  Head: () => (
                    <thead className="rdp-head">
                      <tr className="flex w-full justify-between mb-4 gap-1">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                          <th key={day} className="w-8 text-center text-[13px] font-bold text-gray-400">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )
                }}
                className="!m-0"
                classNames={{
                  table: 'w-full',
                  tbody: 'w-full flex flex-col gap-2',
                  row: 'flex w-full justify-between gap-1',
                  cell: 'p-0',
                  day: 'w-8 h-8 flex items-center justify-center text-[13px] font-medium rounded-md hover:bg-gray-100 transition-colors text-gray-900',
                  day_selected: '!bg-[#8363f2] !text-white hover:!bg-[#7354e1]',
                  day_today: 'font-bold text-[#8363f2]',
                  day_outside: 'text-gray-300',
                }}
              />
              <div className="mt-auto pt-4 border-t border-gray-100 space-y-1 w-full">
                  <p className="text-xs font-medium text-gray-500">Total Booking - 42</p>
                  <p className="text-xs font-medium text-gray-500">Total revenue - R12 586.00</p>
              </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <BookingDetailModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        date={selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || ''}
        onCancelClick={() => {
          setShowBookingModal(false);
          setShowCancelModal(true);
        }}
        onEditClick={() => onNavigate('editBooking')}
      />

      <CampaignCancellationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => setShowCancelModal(false)}
        campaignName={selectedCampaign}
      />

      <CreateMenuModal 
        isOpen={showCreateMenu}
        onClose={() => setShowCreateMenu(false)}
        onNavigate={onNavigate}
      />

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="absolute top-20 right-8 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-900">New booking request received</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900">Payment confirmed for Cape Town Gateway</p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900">Campaign completed successfully</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Menu */}
      {showProfileMenu && (
        <div className="absolute top-20 right-8 w-56 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { onNavigate('vendorProfile'); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            View Profile
          </button>
          <button
            onClick={() => { onNavigate('vendorHelpSupport'); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Help & Support
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => { onLogout(); setShowProfileMenu(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Sort Dropdown */}
      {showSort && (
        <div className="absolute top-[21rem] right-[calc(50%+1.5rem)] w-48 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { toast.success('Sorted by Progress'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Progress
          </button>
          <button
            onClick={() => { toast.success('Sorted by Goal'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Goal Amount
          </button>
          <button
            onClick={() => { toast.success('Sorted by Saved'); setShowSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Saved Amount
          </button>
        </div>
      )}

      {/* Filter Dropdown */}
      {showFilter && (
        <div className="absolute top-[21rem] right-8 w-48 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { toast.success('Filtered by This Month'); setShowFilter(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            This Month
          </button>
          <button
            onClick={() => { toast.success('Filtered by Last Month'); setShowFilter(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Last Month
          </button>
          <button
            onClick={() => { toast.success('Filtered by This Year'); setShowFilter(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            This Year
          </button>
          <button
            onClick={() => { toast.success('Filtered by Custom Range'); setShowFilter(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Custom Range
          </button>
        </div>
      )}

      {/* Voucher Sort Dropdown */}
      {showVoucherSort && (
        <div className="absolute bottom-[21rem] right-[calc(50%+1.5rem)] w-48 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200">
          <button
            onClick={() => { toast.success('Sorted by Date'); setShowVoucherSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Date
          </button>
          <button
            onClick={() => { toast.success('Sorted by Name'); setShowVoucherSort(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            By Name
          </button>
        </div>
      )}
    </div>
  );
};