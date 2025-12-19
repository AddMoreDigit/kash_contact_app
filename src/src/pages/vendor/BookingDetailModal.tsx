import React from 'react';
import { X, Calendar, Edit3 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  onCancelClick: () => void;
  onEditClick: () => void;
}

export const BookingDetailModal: React.FC<Props> = ({ isOpen, onClose, date, onCancelClick, onEditClick }) => {
  if (!isOpen) return null;

  const campaigns = [
    { name: "Campaign 1", items: [
      { l: "2X Deluxe Rooms", p: "R3 000.00" },
      { l: "2X Room service", p: "R300.00" },
      { l: "2X Launch", p: "R300.00" },
      { l: "2X Dinner Buffet", p: "R300.00" },
      { l: "Spa Day", p: "R700.00" },
      { l: "Airport Pickup", p: "R150.00" }
    ]},
    { name: "Campaign 2", items: [
      { l: "2X Deluxe Rooms", p: "R3500.00" },
      { l: "2X Dinner Buffet", p: "R300.00" },
      { l: "Airport Pickup", p: "R150.00" },
      { l: "2X Room service", p: "R300.00" }
    ]}
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-2xl w-[450px] p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        
        <div className="flex justify-end items-center gap-2 mb-6">
          <Calendar size={18} className="text-gray-700" />
          <h2 className="text-lg font-extrabold text-gray-800">{date}</h2>
        </div>

        <div className="flex justify-between text-[11px] text-gray-500 mb-6 uppercase tracking-wider font-bold">
          <div className="space-y-1"><p>Total Bookings</p><p>Total Revenue</p></div>
          <div className="space-y-1 text-right text-gray-800 font-extrabold"><p>2</p><p>R30 000.00</p></div>
        </div>

        <h3 className="text-md font-extrabold text-gray-800 mb-4">Bookings</h3>

        <div className="space-y-6 max-h-[400px] overflow-y-auto">
          {campaigns.map((camp, i) => (
            <div key={i} className="border border-gray-50 rounded-lg p-1">
              <div className="flex gap-4">
                <span className="text-[#8363f2] font-bold text-sm whitespace-nowrap">{camp.name}</span>
                <div className="flex-1 space-y-2">
                  {camp.items.map((item, j) => (
                    <div key={j} className="flex justify-between text-[10px] font-bold text-gray-600">
                      <span>{item.l}</span><span>{item.p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={onEditClick} className="flex-1 py-2 border border-purple-100 text-[#8363f2] rounded-lg text-[10px] font-bold flex items-center justify-center gap-2">
                  <Edit3 size={14} /> Edit Booking
                </button>
                <button onClick={onCancelClick} className="flex-1 py-2 bg-[#8363f2] text-white rounded-lg text-[10px] font-bold">
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};