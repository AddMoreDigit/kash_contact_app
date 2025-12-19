import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Upload, X, Percent, Calendar, Hash, Globe } from 'lucide-react';

interface CreateVoucherPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

type Page = "createVoucher" | "vendorDashboard" | "vendorOverview" | "myServices" | "vendorProfile" | "vendorHelpSupport";

export const CreateVoucherPage: React.FC<CreateVoucherPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('createVoucher');
  const [termsType, setTermsType] = useState<'type' | 'upload'>('type');
  const [termsFile, setTermsFile] = useState<File | null>(null);
  const [voucherType, setVoucherType] = useState<'percentage' | 'fixed'>('percentage');
  const [formData, setFormData] = useState({
    voucherName: '',
    discountValue: '',
    expireDate: '',
    maxUsage: '',
    noRestrictions: false,
    termsText: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Voucher created:', { ...formData, voucherType });
    alert('Voucher created successfully!');
    onNavigate('vendorDashboard');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTermsFile(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create voucher</h1>
            <p className="text-gray-600">Create discount vouchers for your services</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Basic info</h2>
              <p className="text-gray-500 mb-6">Please fill the missing info to continue</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.voucherName}
                    onChange={(e) => setFormData({...formData, voucherName: e.target.value})}
                    placeholder="e.g., Summer Sale 2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Do you want to type T&Cs / Upload
                  </label>
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setTermsType('type')}
                      className={`flex-1 py-3 rounded-lg border transition-colors ${
                        termsType === 'type'
                          ? 'bg-[#8363f2] text-white border-[#8363f2]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                      }`}
                    >
                      Type
                    </button>
                    <button
                      type="button"
                      onClick={() => setTermsType('upload')}
                      className={`flex-1 py-3 rounded-lg border transition-colors ${
                        termsType === 'upload'
                          ? 'bg-[#8363f2] text-white border-[#8363f2]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                      }`}
                    >
                      Upload
                    </button>
                  </div>

                  {termsType === 'type' ? (
                    <textarea
                      value={formData.termsText}
                      onChange={(e) => setFormData({...formData, termsText: e.target.value})}
                      placeholder="Enter terms and conditions here..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                    />
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        id="termsFile"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      {termsFile ? (
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded">
                              <Upload size={20} className="text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{termsFile.name}</p>
                              <p className="text-sm text-gray-500">
                                {(termsFile.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setTermsFile(null)}
                            className="p-2 text-gray-500 hover:text-red-600"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="termsFile" className="cursor-pointer block">
                          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                          <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT (max 5MB)</p>
                          <button
                            type="button"
                            className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            Browse
                          </button>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Discount Details */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Discount Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value *
                  </label>
                  <div className="flex gap-4 mb-3">
                    <button
                      type="button"
                      onClick={() => setVoucherType('percentage')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                        voucherType === 'percentage'
                          ? 'bg-[#8363f2] text-white border-[#8363f2]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                      }`}
                    >
                      <Percent size={20} />
                      Percentage
                    </button>
                    <button
                      type="button"
                      onClick={() => setVoucherType('fixed')}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                        voucherType === 'fixed'
                          ? 'bg-[#8363f2] text-white border-[#8363f2]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                      }`}
                    >
                      <Hash size={20} />
                      Fixed Amount
                    </button>
                  </div>
                  <div className="relative">
                    {voucherType === 'percentage' ? (
                      <>
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        <input
                          type="number"
                          required
                          value={formData.discountValue}
                          onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                          placeholder="10"
                          min="1"
                          max="100"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </>
                    ) : (
                      <>
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span>
                        <input
                          type="number"
                          required
                          value={formData.discountValue}
                          onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                          placeholder="100.00"
                          min="1"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expire Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="date"
                      required
                      value={formData.expireDate}
                      onChange={(e) => setFormData({...formData, expireDate: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Usage */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Voucher Usage</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Usage
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="number"
                      value={formData.maxUsage}
                      onChange={(e) => setFormData({...formData, maxUsage: e.target.value})}
                      placeholder="Enter maximum number of uses"
                      min="1"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="noRestrictions"
                    checked={formData.noRestrictions}
                    onChange={(e) => setFormData({...formData, noRestrictions: e.target.checked})}
                    className="w-5 h-5 text-[#8363f2] border-gray-300 rounded focus:ring-[#8363f2]"
                  />
                  <label htmlFor="noRestrictions" className="flex items-center gap-2 text-gray-700">
                    <Globe size={18} className="text-gray-500" />
                    No restrictions on usage
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => onNavigate('vendorDashboard')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
              >
                Create Voucher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};