import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Upload, X, Type, FileText, DollarSign, MapPin, Image as ImageIcon, Save, Package, Tag, Globe, Calendar, Users } from 'lucide-react';

interface CreateServicePageAltProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

type Page = "createService" | "vendorDashboard" | "myServices" | "vendorOverview";

export const CreateServicePageAlt: React.FC<CreateServicePageAltProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('createService');
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    serviceDescription: '',
    termsType: 'type' as 'type' | 'upload',
    price: '',
    priceType: 'per night',
    capacity: '',
    duration: '',
    location: '',
    isActive: true
  });
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [termsFile, setTermsFile] = useState<File | null>(null);

  const serviceCategories = [
    'Accommodation - Hotel',
    'Accommodation - Lodge',
    'Accommodation - Guest House',
    'Food - Fine Dining',
    'Food - Casual Dining',
    'Transport - Airport Shuttle',
    'Transport - Car Rental',
    'Activities - Safari',
    'Activities - Adventure',
    'Activities - Cultural Tour',
    'Activities - Water Sports',
    'Wellness - Spa',
    'Conference - Venue',
    'Event - Planning'
  ];

  const priceTypes = [
    'per night',
    'per day',
    'per person',
    'per ride',
    'per tour',
    'per session',
    'fixed price',
    'hourly rate'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service created (alt view):', formData);
    alert('Service created successfully!');
    onNavigate('myServices');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => URL.createObjectURL(file));
    setGalleryImages(prev => [...prev, ...newImages.slice(0, 3)]);
  };

  const removeImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Service</h1>
            <p className="text-gray-600">Add your service to make it available for bookings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Basic Info */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <option value="">Select category</option>
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
                      placeholder="Enter service name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Description *
                </label>
                <textarea
                  value={formData.serviceDescription}
                  onChange={(e) => setFormData({...formData, serviceDescription: e.target.value})}
                  placeholder="Describe what your service includes, special features, and what customers can expect..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                  required
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Service T&C'S</h3>
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, termsType: 'type'})}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                    formData.termsType === 'type'
                      ? 'bg-[#8363f2] text-white border-[#8363f2]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                  }`}
                >
                  <Type size={18} />
                  Type
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, termsType: 'upload'})}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                    formData.termsType === 'upload'
                      ? 'bg-[#8363f2] text-white border-[#8363f2]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#8363f2]'
                  }`}
                >
                  <Upload size={18} />
                  Upload
                </button>
              </div>

              {formData.termsType === 'type' ? (
                <textarea
                  placeholder="Enter terms and conditions..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                />
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="termsFile"
                    className="hidden"
                    onChange={(e) => setTermsFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="termsFile" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="text-gray-600">Click to upload Terms & Conditions</p>
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Browse
                    </button>
                  </label>
                </div>
              )}
            </div>

            {/* Pricing & Details */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-6">Pricing & Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Type
                  </label>
                  <select
                    value={formData.priceType}
                    onChange={(e) => setFormData({...formData, priceType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                  >
                    {priceTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity (Persons)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="e.g., 2"
                      min="1"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 2 hours, 1 day, 3 nights"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                    />
                  </div>
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
                      placeholder="City, Address, or Area"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Gallery</h3>
              <div className="flex gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {galleryImages.length < 3 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex items-center justify-center cursor-pointer hover:border-[#8363f2]">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                    <span className="text-2xl text-gray-400">+</span>
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Add up to 3 images (Click + to add)</p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => onNavigate('myServices')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1]"
              >
                Save & Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};