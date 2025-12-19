import { useState } from "react";
import { Toaster } from "sonner";
import { DashboardPage } from "./src/pages/user/DashboardPage";
import { ProfilePage } from "./src/pages/user/ProfilePage";
import { UserTransactionsPage } from "./src/pages/user/UserTransactionsPage";
import { HelpSupportPage } from "./src/pages/user/HelpSupportPage";
import { MessageChatPage } from "./src/pages/user/MessageChatPage";
import { OverviewPage } from "./src/pages/user/OverviewPage";
import { OverviewPage as CorporateOverviewPage } from "./src/pages/corporate/OverviewPage";
import { SelectUserTypePage } from "./src/pages/auth/SelectUserTypePage";
import { SignUpPage } from "./src/pages/auth/SignUpPage";
import { VendorSignUpPage } from "./src/pages/auth/VendorSignUpPage";
import { OTPVerificationPage } from "./src/pages/auth/OTPVerificationPage";
import { SignUpSuccessPage } from "./src/pages/auth/SignUpSuccessPage";
import { LoginPage } from "./src/pages/auth/LoginPage";
import { ForgotPasswordPage } from "./src/pages/auth/ForgotPasswordPage";
import { CreateNewPasswordPage } from "./src/pages/auth/CreateNewPasswordPage";
import { ServiceDetailPage } from "./src/pages/user/ServiceDetailPage";
import { CampaignsPage } from "./src/pages/user/CampaignsPage";
import { ViewCampaignDetailPage } from "./src/pages/user/ViewCampaignDetailPage";
import { VouchersPage } from "./src/pages/user/VouchersPage";
import { SaveAsDraftPage } from "./src/pages/user/SaveAsDraftPage";
import { CorporateDashboardPage } from "./src/pages/corporate/CorporateDashboardPage";
import { CorporateCampaignsPage } from "./src/pages/corporate/CorporateCampaignsPage";
import { CorporateProfilePage } from "./src/pages/corporate/CorporateProfilePage";
import { CorporateTransactionsPage } from "./src/pages/corporate/CorporateTransactionsPage";
import { CorporateDraftsPage } from "./src/pages/corporate/CorporateDraftsPage";
import { ProfilePage as CorporateProfilePageNew } from "./src/pages/corporate/ProfilePage";
import AddMembersPage from "./src/pages/corporate/AddMembersPage";
import CampaignSchedulePage from "./src/pages/corporate/CampaignSchedulePage";
import CampaignTransactionsPage from "./src/pages/corporate/CampaignTransactionsPage";
import CancelCampaignPage from "./src/pages/corporate/CancelCampaignPage";
import CreateCampaignPage from "./src/pages/corporate/CreateCampaignPage";
import EditCampaignPage from "./src/pages/corporate/EditCampaignPage";
import ViewCampaignPage from "./src/pages/corporate/ViewCampaignPage";
import SendRemindersPage from "./src/pages/corporate/SendRemindersPage";
import PersonalGoalsPage from "./src/pages/corporate/PersonalGoalsPage";
import CorporateHelpSupportPage from "./src/pages/corporate/CorporateHelpSupportPage";
import SaveDraftPage from "./src/pages/corporate/SaveDraftPage";
import CorporateVouchersPage from "./src/pages/corporate/CorporateVouchersPage";
import { CampaignCreationPage } from "./src/pages/user/CampaignCreationPage";

// Vendor pages
import { VendorOverviewPage } from "./src/pages/vendor/VendorOverviewPage";
import { VendorDashboardPage } from "./src/pages/vendor/VendorDashboardPage";
import { MyServicesPage } from "./src/pages/vendor/MyServicesPage";
import { CreateServicePage } from "./src/pages/vendor/CreateServicePage";
import { ReportOrdersPage } from "./src/pages/vendor/ReportOrdersPage";
import { ApproveBookingPage } from "./src/pages/vendor/ApproveBookingPage";
import { VendorCampaignsPage } from "./src/pages/vendor/VendorCampaignsPage";
import { VendorTransactionsPage } from "./src/pages/vendor/VendorTransactionPage";
import { VendorProfilePage } from "./src/pages/vendor/VendorProfilePage";
import { VendorDraftsPage } from "./src/pages/vendor/VendorDraftsPage";
import { VendorHelpSupportPage } from "./src/pages/vendor/VendorHelpSupportPage";
import { VendorMessagesPage } from "./src/pages/vendor/VendorMessagesPage";
import { CreateVoucherPage } from "./src/pages/vendor/CreateVoucherPage";
import { EditBookingPage } from "./src/pages/vendor/EditBookingPage";
import { ViewCampaignPage as VendorViewCampaignPage } from "./src/pages/vendor/ViewCampaignPage";
import { InvoicePage } from "./src/pages/vendor/InvoicePage";
import { CreateSubAdminPage } from "./src/pages/vendor/CreateSubAdminPage";

// New vendor pages
import { CreateServicePageAlt } from "./src/pages/vendor/CreateServicePageAlt";

import "./styles/globals.css";

type Page =
  // Auth pages
  | "selectUserType"
  | "signup"
  | "vendorSignup"
  | "otpVerification"
  | "signupSuccess"
  | "login"
  | "forgotPassword"
  | "createNewPassword"
  
  // User pages
  | "dashboard"
  | "campaigns"
  | "vouchers"
  | "transactions"
  | "profile"
  | "overview"
  | "draft"
  | "howItWorks"
  | "campaignDetail"
  | "viewCampaignDetail"
  | "messaging"
  | "serviceDetail"
  | "selectedServices"
  | "createCampaign"
  | "manageCampaign"
  | "contributors"
  | "contributorDetail"
  | "campaignSchedule"
  | "campaignsHistory"
  | "contribute"
  | "individualCampaign"
  | "groupCampaign"
  | "managingCampaigns"
  | "helpSupport"
  | "selectServices"
  
  // Corporate pages
  | "corporateDashboard"
  | "corporateCampaigns"
  | "corporateProfile"
  | "corporateTransactions"
  | "corporateDrafts"
  | "addMembers"
  | "campaignTransactions"
  | "cancelCampaign"
  | "editCampaign"
  | "viewCampaign"
  | "sendReminders"
  | "personalGoals"
  | "corporateHelpSupport"
  | "saveDraft"
  | "corporateVouchers"
  
  // Vendor pages
  | "vendorOverview"
  | "myServices"
  | "createService"
  | "reportOrders"
  | "approveBooking"
  | "vendorDashboard"
  | "vendorCampaigns"
  | "vendorTransactions"
  | "vendorProfile"
  | "vendorDrafts"
  | "vendorHelpSupport"
  | "vendorMessages"
  | "createVoucher"
  | "editBooking"
  | "vendorViewCampaign"
  | "vendorInvoice"
  | "createSubAdmin";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("selectUserType");
  const [accountType, setAccountType] = useState<"user" | "vendor" | "corporate">("corporate");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isPasswordResetFlow, setIsPasswordResetFlow] = useState<boolean>(false);

  // Define which pages belong to which account type
  const pageToAccountType: Record<Page, "user" | "vendor" | "corporate" | "auth"> = {
    // Auth pages
    selectUserType: "auth",
    signup: "auth",
    vendorSignup: "auth",
    otpVerification: "auth",
    signupSuccess: "auth",
    login: "auth",
    forgotPassword: "auth",
    createNewPassword: "auth",
    
    // User pages
    dashboard: "user",
    campaigns: "user",
    vouchers: "user",
    transactions: "user",
    profile: "user",
    overview: "user",
    draft: "user",
    howItWorks: "user",
    campaignDetail: "user",
    viewCampaignDetail: "user",
    messaging: "user",
    serviceDetail: "user",
    selectedServices: "user",
    createCampaign: "user",
    manageCampaign: "user",
    contributors: "user",
    contributorDetail: "user",
    campaignSchedule: "user",
    campaignsHistory: "user",
    contribute: "user",
    individualCampaign: "user",
    groupCampaign: "user",
    managingCampaigns: "user",
    helpSupport: "user",
    selectServices: "user",
    
    // Corporate pages
    corporateDashboard: "corporate",
    corporateCampaigns: "corporate",
    corporateProfile: "corporate",
    corporateTransactions: "corporate",
    corporateDrafts: "corporate",
    addMembers: "corporate",
    campaignTransactions: "corporate",
    cancelCampaign: "corporate",
    editCampaign: "corporate",
    viewCampaign: "corporate",
    sendReminders: "corporate",
    personalGoals: "corporate",
    corporateHelpSupport: "corporate",
    saveDraft: "corporate",
    corporateVouchers: "corporate",
    
    // Vendor pages
    vendorOverview: "vendor",
    myServices: "vendor",
    createService: "vendor",
    reportOrders: "vendor",
    approveBooking: "vendor",
    vendorDashboard: "vendor",
    vendorCampaigns: "vendor",
    vendorTransactions: "vendor",
    vendorProfile: "vendor",
    vendorDrafts: "vendor",
    vendorHelpSupport: "vendor",
    vendorMessages: "vendor",
    createVoucher: "vendor",
    editBooking: "vendor",
    vendorViewCampaign: "vendor",
    vendorInvoice: "vendor",
    createSubAdmin: "vendor",
  };

  const handleNavigate = (page: Page) => {
    // Check if user is trying to navigate to a page that doesn't belong to their account type
    const requiredType = pageToAccountType[page];
    
    // Allow auth pages and pages matching current account type
    if (requiredType !== "auth" && requiredType !== accountType) {
      console.warn(`Cannot navigate to ${page} - this page is for ${requiredType} accounts only`);
      return; // Prevent navigation
    }
    
    // Track if we're entering password reset flow
    if (page === 'forgotPassword') {
      setIsPasswordResetFlow(true);
    } else if (page === 'login' || page === 'vendorSignup') {
      setIsPasswordResetFlow(false);
    }
    setCurrentPage(page);
  };

  const handleSelectUserType = (type: "user" | "vendor" | "corporate") => {
    setAccountType(type);
  };

  const handleSignUp = (type: "user" | "vendor" | "corporate") => {
    setAccountType(type);
    handleNavigate('vendorSignup');
  };

  const handleCreateAccount = (email: string) => {
    setUserEmail(email);
  };

  const handleLogin = (
    email: string,
    password: string,
    type: "user" | "vendor" | "corporate"
  ) => {
    console.log("Login:", { email, password, type });
    setAccountType(type);
    setUserEmail(email);
    
    // Navigate to appropriate dashboard based on account type
    if (type === "vendor") {
      handleNavigate("vendorOverview");
    } else if (type === "corporate") {
      handleNavigate("corporateDashboard");
    } else {
      handleNavigate("dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setCurrentPage("selectUserType");
    setAccountType("corporate");
    setUserEmail("");
  };

  const renderPage = () => {
    switch (currentPage) {
      // Auth pages
      case "selectUserType":
        return (
          <SelectUserTypePage
            onNavigate={handleNavigate}
            onSelectUserType={handleSelectUserType}
          />
        );
      case "signup":
        return (
          <SignUpPage
            onNavigate={handleNavigate}
            onSignUp={handleSignUp}
          />
        );
      case "vendorSignup":
        return (
          <VendorSignUpPage
            onNavigate={handleNavigate}
            accountType={accountType}
            onCreateAccount={handleCreateAccount}
          />
        );
      case "otpVerification":
        return (
          <OTPVerificationPage
            onNavigate={handleNavigate}
            isSignupFlow={!isPasswordResetFlow}
            accountType={accountType}
            userEmail={userEmail || 'user@example.com'}
          />
        );
      case "signupSuccess":
        return (
          <SignUpSuccessPage
            onNavigate={handleNavigate}
            accountType={accountType}
          />
        );
      case "login":
        return (
          <LoginPage
            onNavigate={handleNavigate}
            onLogin={handleLogin}
            accountType={accountType}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordPage
            onNavigate={handleNavigate}
            accountType={accountType}
          />
        );
      case "createNewPassword":
        return (
          <CreateNewPasswordPage
            onNavigate={handleNavigate}
            accountType={accountType}
          />
        );

      // User pages
      case "dashboard":
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            accountType={accountType}
            onLogout={handleLogout}
          />
        );
      case "profile":
        if (accountType === "vendor") {
          return (
            <VendorProfilePage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <ProfilePage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "transactions":
        if (accountType === "vendor") {
          return (
            <VendorTransactionsPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <UserTransactionsPage
            onNavigate={handleNavigate}
          />
        );
      case "helpSupport":
        if (accountType === "vendor") {
          return (
            <VendorHelpSupportPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <HelpSupportPage
            onNavigate={handleNavigate}
          />
        );
      case "messaging":
        if (accountType === "vendor") {
          return (
            <VendorMessagesPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <MessageChatPage
            onNavigate={handleNavigate}
          />
        );
      case "overview":
        if (accountType === "vendor") {
          return (
            <VendorOverviewPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return accountType === "corporate" ? (
          <CorporateOverviewPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        ) : (
          <OverviewPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "serviceDetail":
        return (
          <ServiceDetailPage
            onNavigate={handleNavigate}
          />
        );
      case "campaigns":
        if (accountType === "vendor") {
          return (
            <VendorCampaignsPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <CampaignsPage
            onNavigate={handleNavigate}
          />
        );
      case "campaignDetail":
      case "viewCampaignDetail":
        if (accountType === "vendor") {
          return (
            <VendorViewCampaignPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <ViewCampaignDetailPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vouchers":
        if (accountType === "vendor") {
          return (
            <CreateVoucherPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <VouchersPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "draft":
        if (accountType === "vendor") {
          return (
            <VendorDraftsPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <SaveAsDraftPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );

      // Corporate pages
      case "corporateDashboard":
        return (
          <CorporateDashboardPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "corporateCampaigns":
        return (
          <CorporateCampaignsPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "corporateProfile":
        return (
          <CorporateProfilePageNew
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "corporateTransactions":
        return (
          <CorporateTransactionsPage
            onNavigate={handleNavigate}
          />
        );
      case "corporateDrafts":
        return (
          <CorporateDraftsPage
            onNavigate={handleNavigate}
          />
        );
      case "corporateVouchers":
        return (
          <CorporateVouchersPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "addMembers":
        return (
          <AddMembersPage
            onNavigate={handleNavigate}
          />
        );
      case "campaignSchedule":
        return (
          <CampaignSchedulePage
            onNavigate={handleNavigate}
          />
        );
      case "campaignTransactions":
        return (
          <CampaignTransactionsPage
            onNavigate={handleNavigate}
          />
        );
      case "cancelCampaign":
        return (
          <CancelCampaignPage
            onNavigate={handleNavigate}
          />
        );
      case "createCampaign":
        // Route to appropriate create campaign page based on account type
        if (accountType === "corporate") {
          return (
            <CreateCampaignPage
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          );
        }
        // Default to user campaign creation page
        return (
          <CampaignCreationPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "editCampaign":
        return (
          <EditCampaignPage
            onNavigate={handleNavigate}
          />
        );
      case "viewCampaign":
        return (
          <ViewCampaignPage
            onNavigate={handleNavigate}
          />
        );
      case "sendReminders":
        return (
          <SendRemindersPage
            onNavigate={handleNavigate}
          />
        );
      case "personalGoals":
        return (
          <PersonalGoalsPage
            onNavigate={handleNavigate}
          />
        );
      case "corporateHelpSupport":
        return (
          <CorporateHelpSupportPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "saveDraft":
        return (
          <SaveDraftPage
            onNavigate={handleNavigate}
          />
        );

      // Vendor pages
      case "vendorOverview":
        return (
          <VendorOverviewPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorDashboard":
        return (
          <VendorDashboardPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorCampaigns":
        return (
          <VendorCampaignsPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorTransactions":
        return (
          <VendorTransactionsPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorProfile":
        return (
          <VendorProfilePage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorDrafts":
        return (
          <VendorDraftsPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorHelpSupport":
        return (
          <VendorHelpSupportPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorMessages":
        return (
          <VendorMessagesPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "createVoucher":
        return (
          <CreateVoucherPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "editBooking":
        return (
          <EditBookingPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorViewCampaign":
        return (
          <VendorViewCampaignPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "vendorInvoice":
        return (
          <InvoicePage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "createSubAdmin":
        return (
          <CreateSubAdminPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );

      case "myServices":
        return (
          <MyServicesPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "createService":
        return (
          <CreateServicePage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "reportOrders":
        return (
          <ReportOrdersPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "approveBooking":
        return (
          <ApproveBookingPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl mb-4">Page: {currentPage}</h1>
              <p className="text-gray-600 mb-4">This page is coming soon!</p>
              <button
                onClick={() => handleNavigate("login")}
                className="px-6 py-2 bg-[#8363f2] text-white rounded-md hover:bg-[#7354e1]"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {renderPage()}
    </>
  );
}

export default App;