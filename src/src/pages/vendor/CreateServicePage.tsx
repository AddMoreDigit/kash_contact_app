import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Upload, X, Type, FileText, DollarSign, MapPin, Image as ImageIcon, Save, Package, Tag, Globe } from 'lucide-react';

interface CreateServicePageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

type Page = "createService" | "vendorDashboard" | "myServices" | "vendorOverview";

export const CreateServicePage: React.FC<CreateServicePageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('createService');
  const [termsType, setTermsType] = useState<'type' | 'upload'>('type');
  const [termsFile, setTermsFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    serviceDescription: '',
    termsText: '',
    price: '',
    location: '',
    bannerImage: null as File | null
  });

  const serviceCategories = [
    'Accommodation',
    'Food & Dining',
    'Transport',
    'Activities',
    'Tours',
    'Safari',
    'Adventure',
    'Wellness',
    'Conference',
    'Event'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service created:', { ...formData, galleryImages, termsFile });
    alert('Service created successfully! It will now be visible to users and corporate customers.');
    onNavigate('myServices');
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({...formData, bannerImage: file});
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryImages(prev => [...prev, ...files.slice(0, 6 - prev.length)]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleTermsFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTermsFile(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Service</h1>
            <p className="text-gray-600">
              Add details about your service to share with potential campaign organizers (Users & Corporate)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Banner Image Upload */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Upload Banner Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  id="bannerImage"
                  className="hidden"
                  onChange={handleBannerUpload}
                  accept="image/*"
                />
                {formData.bannerImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.bannerImage)}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, bannerImage: null})}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="bannerImage" className="cursor-pointer block">
                    <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-gray-600 mb-2">Click to upload banner image</p>
                    <p className="text-sm text-gray-500">Recommended size: 1200x400px</p>
                    <button
                      type="button"
                      className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Browse
                    </button>
                  </label>
                )}
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Service Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    >
                      <option value="">Select a category</option>
                      {serviceCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      value={formData.serviceName}
                      onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                      placeholder="e.g., Deluxe Suite Stay, Safari Game Drive, Airport Shuttle"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description *
                  </label>
                  <textarea
                    value={formData.serviceDescription}
                    onChange={(e) => setFormData({...formData, serviceDescription: e.target.value})}
                    placeholder="Describe your service in detail. What makes it special? What's included?"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Service T&C'S</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you want to type Terms Of Use / Upload
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setTermsType('type')}
                    className={`flex-1 py-3 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                      termsType === 'type'
                        ? 'bg-[#8363f2] text-white border-[#8363f2]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                    }`}
                  >
                    <Type size={20} />
                    Input
                  </button>
                  <button
                    type="button"
                    onClick={() => setTermsType('upload')}
                    className={`flex-1 py-3 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                      termsType === 'upload'
                        ? 'bg-[#8363f2] text-white border-[#8363f2]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                    }`}
                  >
                    <Upload size={20} />
                    Upload
                  </button>
                </div>

                {termsType === 'type' ? (
                  <textarea
                    value={formData.termsText}
                    onChange={(e) => setFormData({...formData, termsText: e.target.value})}
                    placeholder="Enter terms and conditions for your service..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                  />
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="termsFile"
                      className="hidden"
                      onChange={handleTermsFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    {termsFile ? (
                      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded">
                            <FileText size={20} className="text-gray-600" />
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

            {/* Price & Location */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Pricing & Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price / Rate *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <select className="text-gray-700 bg-transparent border-none focus:outline-none">
                        <option>per night</option>
                        <option>per day</option>
                        <option>per person</option>
                        <option>per ride</option>
                        <option>per tour</option>
                        <option>fixed price</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">This is the rate users will see when booking</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Cape Town, Johannesburg, Safari Lodge Location"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Gallery</h2>
              <p className="text-gray-600 mb-4">Add images to showcase your service (max 6 images)</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {galleryImages.length < 6 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#8363f2] transition-colors">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleGalleryUpload}
                      accept="image/*"
                    />
                    <ImageIcon className="text-gray-400 mb-2" size={24} />
                    <span className="text-sm text-gray-600">Add image</span>
                    <span className="text-xs text-gray-500">+</span>
                  </label>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => onNavigate('myServices')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log('Saved as draft:', formData);
                  alert('Service saved as draft');
                  onNavigate('myServices');
                }}
                className="px-8 py-3 border border-[#8363f2] text-[#8363f2] rounded-lg hover:bg-[#8363f2]/10 transition-colors"
              >
                Save to draft
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
              >
                Save & Publish
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Service Visibility</h3>
            <p className="text-blue-700 text-sm">
              Published services will be visible to both individual users and corporate customers. 
              They can select your services when creating their campaigns. Make sure your pricing 
              and details are accurate as they will be used for booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};