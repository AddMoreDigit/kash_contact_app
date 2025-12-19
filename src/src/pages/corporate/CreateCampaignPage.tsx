import React, { useState } from 'react';
import { ArrowLeft, Save, Calendar, UploadCloud, Search, X } from 'lucide-react';

import { CorporateSidebar } from '../../components/layout/CorporateSidebar'; 


// --- TYPE DEFINITIONS ---
type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";


interface CreateCampaignPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void; 
}

// --- MOCK DATA (Used across steps) ---
const packages = [
    { category: "Accomodation", name: "Protea Hotel", price: "R1200.00", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" },
    { category: "Meal Voucher", name: "Foodie.com", price: "R500.00", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
    { category: "G-Transport", name: "Transport tour", price: "R1200.00", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop" },
    { category: "Activities", name: "Extras events", price: "R1200.00", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop" },
];

// MOCK DATA: Updated to match Review & Confirm screen
const selectedPackagesMock = [
    { category: "Accommodation", name: "Seaview Lodge", price: "R8 000.00", totalAmount: "8000.00", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop" },
    { category: "Food Dining", name: "Tastebites Catering", price: "R4 000.00", totalAmount: "4000.00", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop" },
];

const mockMembers = [
    { name: "Alicia Jones", role: "Admin" },
    { name: "Ayanda Khumalo", role: "Contributor" },
];

const mockSponsors = [
    { name: "Kash Contact Group", type: "Corporate Sponsor" },
    { name: "Chibulo Moonde", type: "Individual Sponsor" },
];

// --- SUB-COMPONENT: STEP 2 (Assign Packages) ---
const AssignPackagesStep: React.FC = () => {
    return (
        <div className="flex space-x-8 h-full">
            {/* Left Column: Available Packages (50% width) */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose vendor packages to attach at this campaign</h3>
                
                {/* Search and Filter Row */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search Packages"
                            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-4 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition duration-150">
                        Filter by
                    </button>
                    
                    <button className="px-4 py-2 bg-[#8363f2] text-white rounded-xl text-sm font-medium hover:bg-[#7354e1] transition duration-150">
                        See all
                    </button>
                </div>
                
                {/* Package Grid */}
                <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {packages.map((pkg, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-150">
                            
                            {/* Image and Category Tag */}
                            <div className="h-12 bg-gray-100 relative">
                                <img 
                                    src={pkg.image} 
                                    alt={pkg.name} 
                                    className="w-full h-full object-cover" 
                                />
                                <span className="absolute top-2 left-2 bg-purple-100 text-[#8363f2] text-xs font-semibold px-2 py-0.5 rounded">
                                    {pkg.category}
                                </span>
                            </div>

                            <div className="p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-medium text-gray-900 leading-tight">{pkg.name}</p>
                                    <p className="text-sm font-bold text-[#8363f2]">{pkg.price}</p>
                                </div>
                                <button className="w-full py-2 bg-[#8363f2] text-white rounded-xl text-sm font-medium hover:bg-[#7354e1] transition duration-150">
                                    Add to campaign
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Selected Packages (50% width) */}
            <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Packages</h3>
                
                {/* Selected Packages List */}
                <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                    {selectedPackagesMock.map((pkg, index) => (
                        <div key={index} className="flex justify-between items-start pb-3">
                            <div>
                                <p className="font-medium text-gray-900">{pkg.category}</p>
                                <p className="text-sm text-gray-600 leading-tight">{pkg.name}</p>
                            </div>
                            <p className="text-lg font-bold text-gray-800">{pkg.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- SUB-COMPONENT: STEP 3 (Add Members) ---
const AddMembersStep: React.FC = () => {
    return (
        <div className="flex space-x-8 h-full">
            {/* Left Column: Add Members (Team) */}
            <div className="flex-1 min-w-0 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Members</h3>
                
                {/* Search Input */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by email or username"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                {/* Role Dropdown and Invite Button */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="flex-1">
                        <div className="relative">
                            <select
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 appearance-none focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                            >
                                <option value="" disabled selected>Role</option>
                                <option value="admin">Admin</option>
                                <option value="contributor">Contributor</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1] transition duration-150">
                        Invites
                    </button>
                </div>
                
                {/* Current Members List */}
                <div className="space-y-4">
                    {mockMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 leading-tight">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 p-1 transition duration-150">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Add Sponsor */}
            <div className="flex-1 min-w-0 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Sponsor</h3>
                
                {/* Search Input */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by compony name or Sponsor"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                {/* Sponsor Type Dropdown and Add Button */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="flex-1">
                        <div className="relative">
                            <select
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 appearance-none focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                            >
                                <option value="" disabled selected>Sponsor Type</option>
                                <option value="corporate">Corporate Sponsor</option>
                                <option value="individual">Individual Sponsor</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-[#8363f2] text-white rounded-lg font-medium hover:bg-[#7354e1] transition duration-150">
                        Add sponsor
                    </button>
                </div>

                {/* Current Sponsors List */}
                <div className="space-y-4">
                    {mockSponsors.map((sponsor, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center space-x-3">
                                {/* Placeholder for logo/avatar */}
                                <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                                     {sponsor.name === "Kash Contact Group" ? 'U' : sponsor.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 leading-tight">{sponsor.name}</p>
                                    <p className="text-sm text-gray-500">{sponsor.type}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 p-1 transition duration-150">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: STEP 4 (Review & Confirm) ---
const ReviewStep: React.FC<{ campaignData: any }> = ({ campaignData }) => {
    // Re-use mock data
    const packagesToReview = selectedPackagesMock; 
    
    // Formatting function for Goal Amount
    const formatGoalAmount = (amount: string) => {
        const num = parseFloat(amount);
        // Uses space as thousand separator to match R20 000.00 style
        return isNaN(num) ? 'R0.00' : `R${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
    };

    // Formatting function for Date Range (Aug 11,-Dec 8, 2025)
    const formatDateRange = (start: string, end: string) => {
        if (!start || !end) return 'Dates Not Set';
        
        const startDate = new Date(start);
        const endDate = new Date(end);

        const startMonth = startDate.toLocaleString('default', { month: 'short' });
        const startDay = startDate.getDate();
        
        const endMonth = endDate.toLocaleString('default', { month: 'short' });
        const endDay = endDate.getDate();
        const endYear = endDate.getFullYear();

        return `${startMonth} ${startDay},-Dec ${endDay},${endYear}`;
    }

    return (
        <div className="flex space-x-8 h-full">
            {/* Left Column: Campaign Overview (Matches image_acd69f.png) */}
            <div className="flex-2 p-6 rounded-lg bg-white min-w-1/2">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Campaign Overview</h2>
                
                {/* Campaign Header Details */}
                <div className="space-y-4 mb-8">
                    <p className="text-2xl font-semibold text-gray-900">Corporate Campaign</p>
                    <p className="text-gray-500 text-sm">Helping our stuff members with their cape town gateway weekend</p>
                    
                    {/* Goal Target */}
                    <div>
                        <p className="text-lg font-bold text-gray-800">Goal target</p>
                        <p className="text-2xl font-light text-gray-900">
                            R20 000.00
                        </p>
                    </div>

                    {/* Date Range */}
                    <div className="text-lg font-medium text-gray-700">
                        Aug 11,-Dec 8, 2025
                    </div>

                    {/* Campaign Members (Mock Avatars) */}
                    <div>
                        <p className="text-lg font-bold text-gray-800 mb-2">Campaign Members</p>
                        <div className="flex -space-x-2">
                            {/* Mocking 4 members as per image */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-sm font-semibold text-gray-700">
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Selected Vendors (Matches image_acd69f.png) */}
            <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col border border-gray-200 min-w-1/3">
                
                {/* Banner Image from Campaign Details - FIX APPLIED HERE */}
                {campaignData.bannerImage ? (
                    // In a real application, you would use URL.createObjectURL(campaignData.bannerImage) 
                    // or a server-hosted URL. Here, we use a mock URL for display.
                    <img 
                        src="https://via.placeholder.com/400x150/8363f2/FFFFFF?text=Uploaded+Banner" 
                        alt="Campaign Banner"
                        className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-sm text-gray-500">
                        No Banner Image Uploaded
                    </div>
                )}


                <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Vendors</h3>
                
                {/* Vendor List */}
                <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                    {packagesToReview.map((pkg, index) => (
                        <div key={index} className="flex justify-between items-start p-3 border border-gray-200 rounded-lg bg-white">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <img 
                                        src={pkg.image} 
                                        alt={pkg.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 leading-tight">{pkg.name}</p>
                                    <p className="text-xs text-gray-500">{pkg.category}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                {/* Edit Button (Pencil Icon) */}
                                <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition duration-150">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                {/* Delete Button (Purple Trash Icon) */}
                                <button className="p-2 rounded-lg text-[#8363f2] hover:bg-purple-50 transition duration-150">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                <p className="text-md font-bold text-gray-800 min-w-[70px] text-right">{pkg.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

export default function CreateCampaignPage({ onNavigate, onLogout }: CreateCampaignPageProps) {
    const [step, setStep] = useState(0); // Start at Campaign Details (first step)
    // MOCK DATA: Updated to match Review & Confirm image details
    const [campaignData, setCampaignData] = useState({
        campaignName: "Corporate Campaign",
        campaignDescription: "Helping our stuff members with their cape town gateway weekend",
        campaignTCS: "Terms apply for redemption. Vouchers valid for 6 months. Packages are non-transferable.",
        goalAmount: "20000.00", // R20 000.00
        endDate: "2025-12-08", 
        startDate: "2025-08-11", // Added for date range display
        bannerImage: { name: 'resort_image.jpg' } as File | null, 
    });

    const steps = ['Campaign Details', 'Assign Packages', 'Add members', 'Review'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCampaignData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCampaignData(prev => ({ ...prev, bannerImage: file }));
        }
    };

    const handleNext = () => setStep(prev => Math.min(steps.length - 1, prev + 1));
    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        } else {
            onNavigate('corporateCampaigns'); 
        }
    };

    const handleSaveDraft = () => {
        console.log('Saving Draft:', campaignData);
        alert("Campaign saved as draft!");
    }

    const handleSubmit = () => {
        console.log('Launching Campaign:', campaignData);
        alert("Campaign launched successfully!");
        onNavigate('corporateCampaigns'); 
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-6">
                        {/* Campaign Name */}
                        <div>
                            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign name
                            </label>
                            <input
                                type="text"
                                name="campaignName"
                                id="campaignName"
                                value={campaignData.campaignName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                            />
                        </div>

                        {/* Campaign Description */}
                        <div>
                            <label htmlFor="campaignDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Description
                            </label>
                            <textarea
                                name="campaignDescription"
                                id="campaignDescription"
                                rows={3}
                                value={campaignData.campaignDescription}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150 resize-none"
                            />
                        </div>

                        {/* Campaign T&Cs */}
                        <div>
                            <label htmlFor="campaignTCS" className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign T&Cs
                            </label>
                            <textarea
                                name="campaignTCS"
                                id="campaignTCS"
                                rows={3}
                                value={campaignData.campaignTCS}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150 resize-none"
                            />
                        </div>

                        {/* Goal Amount and End Date */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Goal Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                        R
                                    </span>
                                    <input
                                        type="number"
                                        name="goalAmount"
                                        id="goalAmount"
                                        value={campaignData.goalAmount}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-6 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        value={campaignData.endDate}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-[#8363f2] focus:border-[#8363f2] transition duration-150 appearance-none"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Upload Banner Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Banner image
                            </label>
                            <div className="relative">
                                <input
                                    id="bannerImageUpload"
                                    type="file"
                                    name="bannerImage"
                                    onChange={handleFileSelect}
                                    className="sr-only"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="bannerImageUpload"
                                    className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white hover:bg-gray-50 transition duration-150 cursor-pointer h-32"
                                >
                                    <div className="text-center">
                                        <UploadCloud className="mx-auto h-6 w-6 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Drop image here or upload
                                        </p>
                                        {campaignData.bannerImage && (
                                            <p className="mt-1 text-xs text-[#8363f2]">
                                                {campaignData.bannerImage.name}
                                            </p>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return <AssignPackagesStep />;
            case 2:
                return <AddMembersStep />;
            case 3:
                return <ReviewStep campaignData={campaignData} />;
            default:
                return null;
        }
    };

    return (
        // Full screen container with sidebar and main content
        <div className="flex h-screen overflow-hidden">
            {/* 1. Sidebar */}
            <CorporateSidebar 
                activePage={'corporateCampaigns'} 
                onNavigate={onNavigate} 
                onLogout={onLogout}
            />

            {/* 2. Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto h-full bg-white rounded-lg shadow-md flex flex-col">
                    
                    {/* Header and Step Navigation */}
                    <div className="border-b p-6">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {step === steps.length - 1 ? 'Review & Confirm' : 'Create new campaign'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {step === steps.length - 1 ? 'Check all your details before launching your Campaign' : 'Set up your corporate campaign, assign package, invite members'}
                        </p>
                        
                        {/* Step Tabs */}
                        <div className="flex justify-between mt-6 space-x-4">
                            {steps.map((label, index) => (
                                <button
                                    key={index}
                                    onClick={() => setStep(index)}
                                    className={`flex-1 text-center pb-2 transition-colors border-b-2 text-sm font-medium ${
                                        index === step
                                            ? 'border-[#8363f2] text-[#8363f2]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-grow p-6 overflow-y-auto">
                        {renderStepContent()}
                    </div>

                    {/* Action Buttons (Footer) */}
                    <div className="flex justify-end pt-4 px-6 pb-6 space-x-4 border-t">
                        <button
                            onClick={handleBack}
                            className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-150 ${step === 0 ? 'invisible' : ''}`}
                        >
                            Back
                        </button>
                        
                        {step === steps.length - 1 && (
                            <button
                                onClick={handleSaveDraft}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-150"
                            >
                                Save as draft
                            </button>
                        )}

                        <button
                            onClick={step === steps.length - 1 ? handleSubmit : handleNext}
                            className="px-6 py-2 bg-[#8363f2] text-white rounded-xl hover:bg-[#7354e1] transition duration-150"
                        >
                            {step === steps.length - 1 ? 'Launch Campaign' : 'Next'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}