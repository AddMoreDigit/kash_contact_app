# 📁 Kash Contact - Project Structure

## 🎯 User Types
- **User** - Regular users
- **Corporate** - Corporate users  
- **Vendor** - Vendor users

---

## 📂 Folder Structure

```
kash-contact/
│
├── src/
│   │
│   ├── components/              # Reusable UI components
│   │   ├── common/             # Shared components (Button, Input, Modal, Card, etc.)
│   │   ├── layout/             # Layout components (Header, Sidebar, Footer, Navigation)
│   │   └── auth/               # Auth-specific components (LoginForm, RegisterForm, ProtectedRoute)
│   │
│   ├── pages/                   # Page components (routes)
│   │   ├── auth/               # Authentication pages (Login, Register, ForgotPassword)
│   │   ├── user/               # User-specific pages (UserDashboard, UserProfile, UserContacts)
│   │   ├── corporate/          # Corporate-specific pages (CorporateDashboard, CorporateProfile, etc.)
│   │   └── vendor/             # Vendor-specific pages (VendorDashboard, VendorProfile, etc.)
│   │
│   ├── context/                 # React Context for state management
│   │   └── AuthContext.jsx     # Authentication context (to be created)
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.js          # Authentication hook
│   │   ├── useContacts.js      # Contacts management hook
│   │   └── useForm.js          # Form handling hook
│   │
│   ├── services/                # API calls and external services
│   │   ├── api.js              # API configuration
│   │   ├── authService.js      # Authentication API calls
│   │   └── contactService.js   # Contact management API calls
│   │
│   ├── utils/                   # Helper functions and utilities
│   │   ├── formatters.js       # Data formatting functions
│   │   ├── validators.js       # Form validation functions
│   │   └── constants.js        # App-wide constants
│   │
│   ├── assets/                  # Static assets
│   │   ├── images/             # Image files
│   │   └── icons/              # Icon files and SVGs
│   │
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── public/                      # Public static files
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🗺️ Planned Routes

### Public Routes
```
/                    → Redirect to /login
/login              → Login page (all user types)
/register           → Registration page (select user type)
/forgot-password    → Password reset page
```

### User Routes (Protected)
```
/user-dashboard     → User dashboard
/user/profile       → User profile
/user/contacts      → User contacts management
/user/settings      → User settings
```

### Corporate Routes (Protected)
```
/corporate-dashboard    → Corporate dashboard
/corporate/profile      → Corporate profile
/corporate/contacts     → Corporate contacts management
/corporate/team         → Team management
/corporate/settings     → Corporate settings
```

### Vendor Routes (Protected)
```
/vendor-dashboard   → Vendor dashboard
/vendor/profile     → Vendor profile
/vendor/contacts    → Vendor contacts management
/vendor/products    → Product/service management
/vendor/settings    → Vendor settings
```

---

## 📋 Component Organization Guide

### `/components/common/`
Reusable UI components used across the entire app:
- `Button.jsx` - Reusable button component
- `Input.jsx` - Form input component
- `Modal.jsx` - Modal/dialog component
- `Card.jsx` - Card container component
- `Avatar.jsx` - User avatar component
- `Badge.jsx` - Badge/tag component
- `Spinner.jsx` - Loading spinner
- `Alert.jsx` - Alert/notification component

### `/components/layout/`
Layout and navigation components:
- `Header.jsx` - Main header/navbar
- `Sidebar.jsx` - Sidebar navigation
- `Footer.jsx` - Footer component
- `DashboardLayout.jsx` - Dashboard wrapper layout
- `AuthLayout.jsx` - Authentication pages layout

### `/components/auth/`
Authentication-specific components:
- `LoginForm.jsx` - Login form component
- `RegisterForm.jsx` - Registration form component
- `ProtectedRoute.jsx` - Route protection wrapper
- `UserTypeSelector.jsx` - User type selection component

---

## 📄 Page Organization Guide

### `/pages/auth/`
- `Login.jsx` - Login page
- `Register.jsx` - Registration page with user type selection
- `ForgotPassword.jsx` - Password reset page

### `/pages/user/`
- `UserDashboard.jsx` - Main dashboard for regular users
- `UserProfile.jsx` - User profile page
- `UserContacts.jsx` - Contact management for users
- `UserSettings.jsx` - User settings page

### `/pages/corporate/`
- `CorporateDashboard.jsx` - Main dashboard for corporate users
- `CorporateProfile.jsx` - Corporate profile page
- `CorporateContacts.jsx` - Contact management for corporate
- `CorporateTeam.jsx` - Team management page
- `CorporateSettings.jsx` - Corporate settings page

### `/pages/vendor/`
- `VendorDashboard.jsx` - Main dashboard for vendors
- `VendorProfile.jsx` - Vendor profile page
- `VendorContacts.jsx` - Contact management for vendors
- `VendorProducts.jsx` - Product/service management
- `VendorSettings.jsx` - Vendor settings page

---

## 🔧 Development Guidelines

### When Adding a New Feature:

1. **Component** → Create in `/components/common/` if reusable
2. **Page** → Create in appropriate `/pages/{userType}/` folder
3. **API Call** → Add to `/services/` with appropriate service file
4. **State Management** → Add to context or create new context in `/context/`
5. **Utility Function** → Add to `/utils/` with appropriate file
6. **Custom Hook** → Create in `/hooks/`

### Naming Conventions:

- **Components**: PascalCase (e.g., `UserDashboard.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.js`)
- **Services**: camelCase with 'Service' suffix (e.g., `authService.js`)
- **Utils**: camelCase (e.g., `formatters.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `USER_TYPES`)

---

## 🎨 Design Implementation Plan

### Phase 1: Authentication
1. Login page design → `/pages/auth/Login.jsx`
2. Register page design → `/pages/auth/Register.jsx`
3. User type selection component → `/components/auth/UserTypeSelector.jsx`

### Phase 2: User Dashboard
1. User dashboard design → `/pages/user/UserDashboard.jsx`
2. User-specific components
3. User routes

### Phase 3: Corporate Dashboard
1. Corporate dashboard design → `/pages/corporate/CorporateDashboard.jsx`
2. Corporate-specific components
3. Corporate routes

### Phase 4: Vendor Dashboard
1. Vendor dashboard design → `/pages/vendor/VendorDashboard.jsx`
2. Vendor-specific components
3. Vendor routes

### Phase 5: Shared Features
1. Contact management
2. Profile pages
3. Settings pages

---

## 📦 Dependencies to Install (When Ready)

```bash
# Routing
npm install react-router-dom

# Icons
npm install lucide-react

# Forms (optional)
npm install react-hook-form

# Date handling (if needed)
npm install date-fns

# API calls (if needed)
npm install axios
```

---

## ✅ Current Status

- ✅ Folder structure created
- ✅ Ready for design implementation
- ⏳ Awaiting Figma designs
- ⏳ Components to be created
- ⏳ Pages to be created
- ⏳ Routes to be configured

---

## 📝 Notes

- Structure is scalable and organized by feature
- Clear separation between user types
- Easy to maintain and extend
- Follows React best practices
- Ready for your design implementation

---

**Ready to receive your Figma designs!** 🎨
