import React, { useState } from 'react';
import { VendorSidebar } from '../../components/layout/VendorSidebar';
import { Search, Send, Paperclip, Smile, MoreVertical, Check, CheckCheck } from 'lucide-react';

type Page = 
  | "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" 
  | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" 
  | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" 
  | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" 
  | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "signupForm" 
  | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" 
  | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" 
  | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" 
  | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" 
  | "corporateHelpSupport" | "saveDraft" | "selectUserType" | "corporateVouchers" 
  | "vendorOverview" | "myServices" | "createService" | "reportOrders" | "approveBooking" 
  | "vendorCampaigns" | "vendorTransactions" | "vendorProfile" | "vendorDrafts" 
  | "vendorHelpSupport" | "vendorMessages" | "createVoucher" | "editBooking" 
  | "vendorViewCampaign" | "vendorInvoice" | "createSubAdmin";

interface VendorMessagesPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const VendorMessagesPage: React.FC<VendorMessagesPageProps> = ({ onNavigate, onLogout }) => {
  const [activePage] = useState<Page>('vendorMessages');
  const [activeChat, setActiveChat] = useState('stanley');
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    { id: 'stanley', name: 'Stanley Moloto', lastMessage: 'Got it, I will check', time: '09:30 AM', unread: 2 },
    { id: 'bornwise', name: 'Bornwise Baloyi', lastMessage: 'Got it, I will check', time: '09:30 AM', unread: 0 },
    { id: 'kinelwe', name: 'Kinelwe Nkosi', lastMessage: 'Great see you soon', time: '09:30 AM', unread: 0 },
    { id: 'nsovo', name: 'Nsovo Shilowa', lastMessage: 'Yes I will be there', time: '09:30 AM', unread: 0 },
    { id: 'mercy', name: 'Mercy Hope', lastMessage: 'Got it, I will check', time: '09:30 AM', unread: 1 },
    { id: 'liz', name: 'Liz Nkosana', lastMessage: 'Let\'s meet today', time: '09:30 AM', unread: 0 },
    { id: 'cape-town', name: 'Cape Town Gateway Campaign', lastMessage: 'I have sent the Details', time: 'Yesterday', unread: 0 },
  ];

  const messages = {
    stanley: [
      { id: 1, sender: 'them', text: 'Got it, I will check', time: '09:30 AM', status: 'read' },
      { id: 2, sender: 'me', text: 'Have you received the Booking Request?', time: '09:30 AM', status: 'read' },
      { id: 3, sender: 'them', text: 'Yes. I have', time: '09:30 AM', status: 'read' },
      { id: 4, sender: 'me', text: 'Great. Are you Available on the Specified Date?', time: '09:30 AM', status: 'read' },
      { id: 5, sender: 'them', text: 'Yes. the dates Work For us', time: '03:45 PM', status: 'read' },
    ],
    bornwise: [
      { id: 1, sender: 'them', text: 'Got it, I will check', time: '09:30 AM', status: 'read' },
    ],
  };

  const activeMessages = messages[activeChat as keyof typeof messages] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-96 border-r border-gray-200 bg-white">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-500 mt-1">Chat with customers and campaign admins</p>
            
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-180px)]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  activeChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#8363f2] rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{chat.name}</p>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="inline-block mt-1 px-2 py-1 bg-[#8363f2] text-white text-xs rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#8363f2] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {chats.find(c => c.id === activeChat)?.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-lg">
                  {chats.find(c => c.id === activeChat)?.name}
                </h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl px-4 py-3 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-[#8363f2] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`flex items-center gap-2 mt-1 text-xs ${
                    message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span>{message.time}</span>
                    {message.sender === 'me' && (
                      <span>
                        {message.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Paperclip size={20} />
              </button>
              <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Smile size={20} />
              </button>
              
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2]"
              />
              
              <button
                type="submit"
                className="p-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1]"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};