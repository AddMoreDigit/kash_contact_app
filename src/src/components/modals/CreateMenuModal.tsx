import React from 'react';
import { 
  XCircle, 
  CreditCard, 
  Activity, 
  User 
} from 'lucide-react';
import { Page } from '../../types';

interface CreateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export const CreateMenuModal: React.FC<CreateMenuModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-white rounded-3xl shadow-2xl p-8 w-96 border-2 border-gray-800">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Create</h3>
            <p className="text-xs text-gray-400 mt-1 font-bold">Please select action to proceed</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500">
            <XCircle size={24} />
          </button>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => handleNavigation('createVoucher')} 
            className="w-full flex items-center gap-4 px-4 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-2xl border-b border-gray-50"
          >
            <CreditCard size={20} className="text-gray-400" />
            <span>Create New Voucher</span>
          </button>
          <button 
            onClick={() => handleNavigation('createService')} 
            className="w-full flex items-center gap-4 px-4 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-2xl border-b border-gray-50"
          >
            <Activity size={20} className="text-gray-400" />
            <span>Create New Service</span>
          </button>
          <button 
            onClick={() => handleNavigation('createSubAdmin')} 
            className="w-full flex items-center gap-4 px-4 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-2xl"
          >
            <User size={20} className="text-gray-400" />
            <span>New - User</span>
          </button>
        </div>
      </div>
    </>
  );
};