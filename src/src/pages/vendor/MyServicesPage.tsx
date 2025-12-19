import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Page } from '../../types';
import { 
  Search, Bell, ShoppingCart, User, 
  ChevronDown, ListFilter, Edit3, Trash2, 
  Bed, Utensils, Car, Map, Trees, Ship 
} from 'lucide-react';

interface MyServicesPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const MyServicesPage: React.FC<MyServicesPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('myServices');

  const services = [
    {
      name: 'Deluxe Suite Stay',
      category: 'Accommodation',
      icon: <Bed size={16} />,
      price: 'R1 200.00',
      frequency: 'Per night',
      bookings: '12 Bookings this Month',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d8d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Seafood Platter',
      category: 'Food',
      icon: <Utensils size={16} />,
      price: 'R1 200.00',
      frequency: 'Per day',
      bookings: '12 Bookings this Month',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Airport Shuttle',
      category: 'Airport shuttle transport',
      icon: <Car size={16} />,
      price: 'R150.00',
      frequency: 'per ride',
      bookings: '12 Bookings today',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Cape town city tour',
      category: 'City tour',
      icon: <Map size={16} />,
      price: 'R200.00 per city tour',
      frequency: '',
      bookings: '12 Bookings this Month',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Safari Animals tour',
      category: 'Safari game reserve tour',
      icon: <Trees size={16} />,
      price: 'R250.00 per tour',
      frequency: '',
      bookings: 'Full Booked this month',
      status: 'Unavailable',
      image: 'https://images.unsplash.com/photo-1545579133-99bb5ab840da?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'South coast boat tour',
      category: 'Boat tour',
      icon: <Ship size={16} />,
      price: 'R250.00 per tour',
      frequency: '',
      bookings: 'Full Booked today',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200&auto=format&fit=crop'
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 px-8 flex justify-between items-center bg-white border-b border-gray-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#f8faff] border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-[#8363f2] outline-none" 
            />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('createService')}
              className="bg-[#8363f2] text-white px-8 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#7354e1] transition-colors"
            >
              Create
            </button>
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <ShoppingCart size={20} className="text-gray-400 cursor-pointer" />
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
              <User size={22} />
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* Section Title & Filters */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => console.log('Filter clicked')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"
              >
                Filter By <ChevronDown size={16} />
              </button>
              <button 
                onClick={() => console.log('Sort clicked')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"
              >
                <ListFilter size={16} className="rotate-180" /> Sort by
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold ${
                    s.status === 'Unavailable' 
                    ? 'bg-[#6b7280] text-white' 
                    : 'bg-[#4ade80] text-white'
                  }`}>
                    {s.status}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{s.name}</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-4 gap-2">
                    <span className="text-[#2d2852]">{s.icon}</span>
                    <span className="font-medium">{s.category}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="mb-1">
                      <p className="text-lg font-bold text-gray-900">
                        {s.price} <span className="text-sm font-medium text-gray-500">{s.frequency}</span>
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-400">{s.bookings}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onNavigate('editBooking')}
                          className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Edit Service"
                        >
                          <Edit3 size={18} className="text-[#2d2852]" />
                        </button>
                        <button 
                          onClick={() => console.log(`Delete ${s.name}`)}
                          className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 size={18} className="text-[#2d2852]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};