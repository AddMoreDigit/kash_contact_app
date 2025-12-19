import { useState } from 'react';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

type Page = "dashboard" | "campaigns" | "vouchers" | "transactions" | "profile" | "overview" | "draft" | "howItWorks" | "campaignDetail" | "viewCampaignDetail" | "messaging" | "serviceDetail" | "selectedServices" | "createCampaign" | "manageCampaign" | "contributors" | "contributorDetail" | "campaignSchedule" | "campaignsHistory" | "contribute" | "individualCampaign" | "groupCampaign" | "managingCampaigns" | "helpSupport" | "selectServices" | "signup" | "vendorSignup" | "otpVerification" | "signupSuccess" | "login" | "forgotPassword" | "createNewPassword" | "vendorDashboard" | "corporateDashboard" | "corporateCampaigns" | "corporateProfile" | "corporateTransactions" | "corporateDrafts" | "addMembers" | "campaignTransactions" | "cancelCampaign" | "editCampaign" | "viewCampaign" | "sendReminders" | "personalGoals" | "corporateHelpSupport" | "saveDraft" | "selectUserType";

interface CampaignSchedulePageProps {
  onNavigate: (page: Page) => void;
}

export default function CampaignSchedulePage({ onNavigate }: CampaignSchedulePageProps) {
  const [currentMonth, setCurrentMonth] = useState(9); // September
  const [currentYear, setCurrentYear] = useState(2025);

  const daysInMonth = 30;
  const events = {
    1: [{ title: "Departure to Magalies", time: "11:30 AM", type: "departure" }],
    7: [{ title: "Team Meeting", time: "10:00 AM", type: "meeting" }],
    14: [{ title: "Vendor Check-in", time: "2:00 PM", type: "vendor" }],
    20: [{ title: "Campaign Review", time: "3:30 PM", type: "review" }],
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
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
            <h1 className="text-2xl font-bold text-gray-900">My Campaign Schedule</h1>
          </div>
          <button className="btn-primary flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>

        {/* Calendar Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-[#8363f2] mr-3" />
              <h2 className="text-xl font-bold">Schedule | September 2025</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentMonth((prev: number) => prev === 1 ? 12 : prev - 1)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">September 2025</span>
              <button
                onClick={() => setCurrentMonth((prev: number) => prev === 12 ? 1 : prev + 1)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center py-3 text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {days.map((day) => (
              <div
                key={day}
                className={`min-h-32 border rounded-lg p-2 ${
                  events[day as keyof typeof events]
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium ${
                    events[day as keyof typeof events] ? "text-blue-700" : "text-gray-700"
                  }`}>
                    {day}
                  </span>
                  {events[day as keyof typeof events] && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>

                {/* Events for this day */}
                {events[day as keyof typeof events]?.map((event, index) => (
                  <div key={index} className="bg-blue-100 p-1 rounded text-xs mb-1">
                    <div className="font-medium text-blue-800">{event.title}</div>
                    <div className="text-blue-600">{event.time}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="dashboard-card">
              <h3 className="font-bold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Departure to Magalies</h4>
                    <p className="text-sm text-gray-600 mb-2">Team departure for weekend getaway</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Sept 1, 2025 at 11:30 AM</span>
                    </div>
                  </div>
                  <button className="text-[#8363f2] text-sm hover:underline">Edit</button>
                </div>

                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Team Meeting</h4>
                    <p className="text-sm text-gray-600 mb-2">Weekly team sync and progress review</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Sept 7, 2025 at 10:00 AM</span>
                    </div>
                  </div>
                  <button className="text-[#8363f2] text-sm hover:underline">Edit</button>
                </div>

                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Vendor Check-in</h4>
                    <p className="text-sm text-gray-600 mb-2">Confirm arrangements with service providers</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Sept 14, 2025 at 2:00 PM</span>
                    </div>
                  </div>
                  <button className="text-[#8363f2] text-sm hover:underline">Edit</button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="dashboard-card">
              <h3 className="font-bold mb-4">Schedule Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Events</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-outline text-left">
                  Schedule Team Meeting
                </button>
                <button className="w-full btn-outline text-left">
                  Add Vendor Call
                </button>
                <button className="w-full btn-outline text-left">
                  Set Campaign Reminder
                </button>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="font-bold mb-4">Event Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm">Departures</span>
                  </div>
                  <span className="text-sm text-gray-500">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Meetings</span>
                  </div>
                  <span className="text-sm text-gray-500">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Check-ins</span>
                  </div>
                  <span className="text-sm text-gray-500">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}