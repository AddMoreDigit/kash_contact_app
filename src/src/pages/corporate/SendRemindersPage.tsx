import { useState } from 'react';
import { ArrowLeft, Send, Calendar, Filter, ChevronDown } from 'lucide-react';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface SendRemindersPageProps {
  onNavigate: (page: Page) => void;
}

export default function SendRemindersPage({ onNavigate }: SendRemindersPageProps) {
  const [campaign, setCampaign] = useState("");
  const [audience, setAudience] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [scheduleType, setScheduleType] = useState("now");

  const recentReminders = [
    { date: "Aug 10", audience: "Sponsors", campaign: "Cape Town Weekend", status: "Sent" },
    { date: "Aug 15", audience: "Vendors", campaign: "Durban Oceanview", status: "Scheduled" },
    { date: "Aug 20", audience: "Members", campaign: "Zanzibar Adventure", status: "Failed" },
  ];

  const toggleAudience = (type: string) => {
    setAudience(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("corporateDashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Send Reminders</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-lg font-bold mb-6">Reminder Setup</h2>

              <div className="space-y-6">
                {/* Campaign Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Campaign
                  </label>
                  <select
                    className="select-field"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                  >
                    <option value="">Choose a campaign...</option>
                    <option value="cape-town">Cape Town Weekend</option>
                    <option value="durban">Durban Oceanview</option>
                    <option value="zanzibar">Zanzibar Adventure</option>
                    <option value="swiss">Swiss Adventure</option>
                  </select>
                </div>

                {/* Audience Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Audience
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Sponsors", "Members", "Vendors", "All"].map((type) => (
                      <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={audience.includes(type)}
                          onChange={() => toggleAudience(type)}
                        />
                        <span className="text-sm font-medium">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="space-y-3">
                    {[
                      "Campaign deadline reminder",
                      "New campaign update",
                      "Payment due notification", 
                      "Thank you message",
                      "Custom message"
                    ].map((msgType) => (
                      <label key={msgType} className="flex items-center">
                        <input
                          type="radio"
                          name="message"
                          value={msgType}
                          checked={message === msgType}
                          onChange={(e) => setMessage(e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-sm">{msgType}</span>
                      </label>
                    ))}
                  </div>

                  {message === "Custom message" && (
                    <textarea
                      className="input-field mt-3 h-24"
                      placeholder="Write your custom message..."
                    />
                  )}
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Reminder
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="schedule"
                        value="now"
                        checked={scheduleType === "now"}
                        onChange={(e) => setScheduleType(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm">Send now</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="schedule"
                        value="later"
                        checked={scheduleType === "later"}
                        onChange={(e) => setScheduleType(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm">Schedule for later</span>
                    </label>

                    {scheduleType === "later" && (
                      <div className="ml-6 grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          className="input-field"
                          placeholder="Select date"
                        />
                        <input
                          type="time"
                          className="input-field"
                          placeholder="Select time"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="btn-secondary">Back</button>
              <button className="btn-primary flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Send Reminder
              </button>
            </div>
          </div>

          {/* Recent Reminders Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-bold mb-6">Recent Reminders</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Audience</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReminders.map((reminder, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 text-sm">{reminder.date}</td>
                        <td className="py-3 text-sm">{reminder.audience}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            reminder.status === 'Sent' ? 'bg-green-100 text-green-700' :
                            reminder.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {reminder.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Scheduled</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}