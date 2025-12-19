import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Plus, Bell, ShoppingCart, X } from 'lucide-react';
import { UserSidebar } from '../../components/layout/UserSidebar';
import { Page } from '../../types';
import { toast } from 'sonner';

interface HelpSupportPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-[#8363f2] text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-[14px]">{label}</span>
    </button>
  );
}

const faqs = [
  {
    id: 1,
    question: 'How do I create a campaign ?',
    answer: 'To create a new campaign,go to campaign section and click on the "new campaign" button,follow the on-screen instructions to set up your new campaigns',
  },
  {
    id: 2,
    question: 'How can I redeem a voucher',
    answer: 'To redeem a voucher, go to the Vouchers section and select the voucher you want to use. Follow the redemption instructions provided.',
  },
  {
    id: 3,
    question: 'What should I do is transaction is pending',
    answer: 'If a transaction is pending, please wait for it to be processed. This typically takes 24-48 hours. If it remains pending longer, contact support.',
  },
  {
    id: 4,
    question: 'How to add member on the campaigns',
    answer: 'To add a member to your campaign, go to the campaign details page and click on "Add Member". Enter their details and send an invitation.',
  },
];

const guides = [
  { id: 1, title: 'Onboarding Guide' },
  { id: 2, title: 'Managing campaigns' },
  { id: 3, title: 'Using Vouchers' },
  { id: 4, title: 'Transaction insights' },
];

export function HelpSupportPage({ onNavigate, onLogout }: HelpSupportPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [supportRequest, setSupportRequest] = useState({ subject: '', message: '' });

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmitRequest = () => {
    if (!supportRequest.subject || !supportRequest.message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Support request submitted successfully!');
    setSupportRequest({ subject: '', message: '' });
  };

  return (
    <div className="flex h-screen bg-[#F5F5FA]">
      {/* Sidebar */}
      <UserSidebar activePage="helpSupport" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back Arrow */}
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 ml-6">
              {/* Create Button */}
              <button 
                onClick={() => setShowCreateTicket(!showCreateTicket)}
                className="bg-[#8363f2] text-white px-4 py-2 rounded-lg text-[14px] hover:bg-[#7354e1] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create
              </button>

              {/* Notifications */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-700" />
              </button>

              {/* Cart */}
              <button 
                onClick={() => onNavigate('draft')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
              </button>

              {/* Profile */}
              <button 
                onClick={() => onNavigate('profile')}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-white p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-[20px] mb-8">Help & Support</h1>

            <div className="grid grid-cols-3 gap-6">
              {/* FAQ Section */}
              <div className="col-span-2">
                <h2 className="text-[16px] mb-4">Frequently Ask Questions</h2>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-[14px] text-gray-900">{faq.question}</span>
                        {openFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-4 pb-4 text-[14px] text-gray-600 bg-purple-50 border-t border-purple-100">
                          <p className="pt-3">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Customer Support */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-[#8363f2]" />
                    <h3 className="text-[16px]">Customer Support</h3>
                  </div>
                  <button 
                    onClick={handleSubmitRequest}
                    className="w-full py-2.5 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors mb-4 text-[14px]"
                  >
                    Chat with us
                  </button>
                  <div className="text-[14px] space-y-1">
                    <p className="text-gray-600">Help@kcashcontact.co.za</p>
                    <p className="text-gray-600">+27 800005289</p>
                  </div>
                </div>

                {/* Guide & Tutorials */}
                <div>
                  <h3 className="text-[16px] mb-3">Guide & Tutorials</h3>
                  <div className="space-y-2">
                    {guides.map((guide) => (
                      <div
                        key={guide.id}
                        className="flex items-start gap-2 text-[14px] text-gray-700"
                      >
                        <span className="text-[#8363f2] mt-1">•</span>
                        <span>{guide.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-900">Your support ticket #1234 has been updated</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900">New response to your inquiry</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900">FAQ article you requested is ready</p>
              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Support Ticket Modal */}
      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create Support Ticket</h2>
              <button onClick={() => setShowCreateTicket(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={supportRequest.subject}
                  onChange={(e) => setSupportRequest({ ...supportRequest, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter ticket subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={supportRequest.message}
                  onChange={(e) => setSupportRequest({ ...supportRequest, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={5}
                  placeholder="Describe your issue in detail"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateTicket(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  className="flex-1 px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7053d9]"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}