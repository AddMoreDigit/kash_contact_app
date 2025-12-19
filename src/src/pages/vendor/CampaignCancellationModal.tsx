import React, { useState } from 'react';
import { X, AlertTriangle, Bell, UserCheck } from 'lucide-react';

interface CampaignCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notificationType: 'members' | 'admin' | 'none') => void;
  campaignName?: string;
}

export const CampaignCancellationModal: React.FC<CampaignCancellationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  campaignName = 'this campaign'
}) => {
  const [notificationType, setNotificationType] = useState<'members' | 'admin' | 'none'>('members');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(notificationType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Campaign cancellations</h2>
                <p className="text-gray-600 mt-1">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">
              Are you sure you want to cancel {campaignName}?
            </p>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="radio"
                id="notifyMembers"
                checked={notificationType === 'members'}
                onChange={() => setNotificationType('members')}
                className="mt-1 text-[#8363f2] border-gray-300 focus:ring-[#8363f2]"
              />
              <label htmlFor="notifyMembers" className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell size={18} className="text-gray-600" />
                  <span className="font-medium">Notify campaign members for these changes</span>
                </div>
                <p className="text-sm text-gray-500">
                  All members of this campaign will receive a notification about the cancellation.
                </p>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="radio"
                id="notifyAdmin"
                checked={notificationType === 'admin'}
                onChange={() => setNotificationType('admin')}
                className="mt-1 text-[#8363f2] border-gray-300 focus:ring-[#8363f2]"
              />
              <label htmlFor="notifyAdmin" className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck size={18} className="text-gray-600" />
                  <span className="font-medium">Notify campaign Admin only for these changes</span>
                </div>
                <p className="text-sm text-gray-500">
                  Only the campaign admin will be notified about the cancellation.
                </p>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="radio"
                id="noNotification"
                checked={notificationType === 'none'}
                onChange={() => setNotificationType('none')}
                className="mt-1 text-[#8363f2] border-gray-300 focus:ring-[#8363f2]"
              />
              <label htmlFor="noNotification" className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <X size={18} className="text-gray-600" />
                  <span className="font-medium">No notification</span>
                </div>
                <p className="text-sm text-gray-500">
                  Cancel without sending any notifications.
                </p>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm Cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};