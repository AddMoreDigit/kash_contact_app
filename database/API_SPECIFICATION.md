# API Endpoints Specification

## Kash Contact Application - REST API Documentation

**Base URL**: `https://api.kashcontact.com/v1`  
**Authentication**: Bearer Token (JWT from AWS Cognito)

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Campaigns](#campaigns)
4. [Services](#services)
5. [Bookings](#bookings)
6. [Transactions](#transactions)
7. [Contributions](#contributions)
8. [Vouchers](#vouchers)
9. [Messages](#messages)
10. [Notifications](#notifications)
11. [Support](#support)
12. [Reviews](#reviews)

---

## 🔐 Authentication

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "user", // "user" | "corporate" | "vendor"
  "phoneNumber": "+1234567890"
}

Response 201:
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "otpSent": true
  }
}
```

### Verify Email
```http
POST /auth/verify-email
Content-Type: application/json

{
  "email": "user@example.com",
  "otpCode": "123456"
}

Response 200:
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "verified": true
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "userType": "user"
    }
  }
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response 200:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response 200:
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "resetToken": "token-from-email",
  "newPassword": "NewSecurePass123!"
}

Response 200:
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## 👤 User Management

### Get Current User Profile
```http
GET /users/profile
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "user",
    "phoneNumber": "+1234567890",
    "profileImageUrl": "https://...",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "emailVerified": true,
    "createdAt": "2026-01-05T10:00:00Z"
  }
}
```

### Update User Profile
```http
PUT /users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "address": "456 Oak Ave",
  "city": "Los Angeles"
}

Response 200:
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { /* updated user object */ }
}
```

### Upload Profile Picture
```http
POST /users/profile/picture
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
  - image: [file]

Response 200:
{
  "success": true,
  "data": {
    "profileImageUrl": "https://cdn.kashcontact.com/users/uuid/profile/avatar.jpg"
  }
}
```

### Get Team Members (Corporate Only)
```http
GET /users/team-members
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "memberUserId": "uuid",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@company.com",
      "role": "manager",
      "status": "active",
      "joinedAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

### Add Team Member (Corporate Only)
```http
POST /users/team-members
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "newmember@company.com",
  "role": "member", // "admin" | "manager" | "member" | "viewer"
  "permissions": {
    "createCampaigns": true,
    "approveBudgets": false
  }
}

Response 201:
{
  "success": true,
  "message": "Team member invited successfully",
  "data": {
    "inviteId": "uuid",
    "email": "newmember@company.com"
  }
}
```

---

## 🎯 Campaigns

### List Campaigns
```http
GET /campaigns?status=active&page=1&limit=20&sort=createdAt:desc
Authorization: Bearer {token}

Query Parameters:
  - status: draft | active | scheduled | completed | cancelled | paused
  - type: individual | group
  - page: integer (default: 1)
  - limit: integer (max: 100, default: 20)
  - sort: field:direction (createdAt:desc, goalAmount:asc, etc.)
  - search: string (search in title/description)

Response 200:
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "uuid",
        "title": "Team Building Retreat 2026",
        "description": "Annual team retreat to Hawaii",
        "campaignType": "group",
        "status": "active",
        "coverImageUrl": "https://...",
        "goalAmount": 50000.00,
        "currentAmount": 25000.00,
        "currency": "USD",
        "progress": 50,
        "startDate": "2026-02-01",
        "endDate": "2026-12-31",
        "totalContributors": 25,
        "creatorName": "John Doe",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 5,
      "totalItems": 95
    }
  }
}
```

### Get Campaign Details
```http
GET /campaigns/{campaignId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Team Building Retreat 2026",
    "description": "Detailed description...",
    "campaignType": "group",
    "status": "active",
    "coverImageUrl": "https://...",
    "galleryImages": ["url1", "url2"],
    "goalAmount": 50000.00,
    "currentAmount": 25000.00,
    "currency": "USD",
    "progress": 50,
    "startDate": "2026-02-01",
    "endDate": "2026-12-31",
    "totalContributors": 25,
    "totalViews": 150,
    "creator": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "profileImageUrl": "https://..."
    },
    "services": [
      {
        "id": "uuid",
        "name": "Luxury Beach Resort",
        "quantity": 10,
        "unitPrice": 300.00,
        "totalPrice": 3000.00
      }
    ],
    "recentContributions": [
      {
        "id": "uuid",
        "contributorName": "Anonymous",
        "amount": 500.00,
        "message": "Great cause!",
        "createdAt": "2026-01-05T09:00:00Z"
      }
    ],
    "createdAt": "2026-01-05T10:00:00Z"
  }
}
```

### Create Campaign
```http
POST /campaigns
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Summer Vacation Fund",
  "description": "Saving for our summer vacation",
  "campaignType": "individual",
  "goalAmount": 10000.00,
  "currency": "USD",
  "startDate": "2026-02-01",
  "endDate": "2026-06-30",
  "isPublic": true,
  "allowAnonymousContributions": true,
  "minContributionAmount": 10.00,
  "serviceIds": [
    {
      "serviceId": "uuid",
      "quantity": 2
    }
  ]
}

Response 201:
{
  "success": true,
  "message": "Campaign created successfully",
  "data": {
    "campaignId": "uuid",
    "status": "draft"
  }
}
```

### Update Campaign
```http
PUT /campaigns/{campaignId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "goalAmount": 15000.00,
  "endDate": "2026-07-31"
}

Response 200:
{
  "success": true,
  "message": "Campaign updated successfully",
  "data": { /* updated campaign object */ }
}
```

### Publish Campaign (from draft)
```http
POST /campaigns/{campaignId}/publish
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Campaign published successfully",
  "data": {
    "status": "active",
    "publishedAt": "2026-01-05T11:00:00Z"
  }
}
```

### Cancel Campaign
```http
POST /campaigns/{campaignId}/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Changed plans"
}

Response 200:
{
  "success": true,
  "message": "Campaign cancelled successfully"
}
```

### Upload Campaign Images
```http
POST /campaigns/{campaignId}/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
  - type: cover | gallery
  - image: [file]

Response 200:
{
  "success": true,
  "data": {
    "imageUrl": "https://cdn.kashcontact.com/campaigns/uuid/cover.jpg"
  }
}
```

---

## 🏪 Services

### List Services
```http
GET /services?category=accommodation&page=1&limit=20
Authorization: Bearer {token}

Query Parameters:
  - category: accommodation | dining | activities | transportation
  - status: active | inactive | out_of_stock
  - vendorId: uuid
  - city: string
  - minPrice: number
  - maxPrice: number
  - page: integer
  - limit: integer

Response 200:
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "uuid",
        "vendorId": "uuid",
        "vendorName": "Luxury Resorts Inc",
        "name": "Beachfront Villa - 5 Star",
        "description": "Luxurious beachfront accommodation",
        "category": "accommodation",
        "basePrice": 500.00,
        "currency": "USD",
        "pricingModel": "per_night",
        "featuredImageUrl": "https://...",
        "locationCity": "Miami",
        "locationState": "FL",
        "averageRating": 4.8,
        "totalBookings": 150,
        "availableQuantity": 5,
        "status": "active"
      }
    ],
    "pagination": { /* ... */ }
  }
}
```

### Get Service Details
```http
GET /services/{serviceId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "vendor": {
      "id": "uuid",
      "businessName": "Luxury Resorts Inc",
      "rating": 4.9,
      "totalReviews": 200
    },
    "name": "Beachfront Villa - 5 Star",
    "description": "Full description...",
    "category": "accommodation",
    "subCategory": "villa",
    "basePrice": 500.00,
    "currency": "USD",
    "pricingModel": "per_night",
    "featuredImageUrl": "https://...",
    "galleryImages": ["url1", "url2", "url3"],
    "location": {
      "address": "123 Beach Rd",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "latitude": 25.7617,
      "longitude": -80.1918
    },
    "amenities": ["WiFi", "Pool", "Gym", "Spa"],
    "availableQuantity": 5,
    "minBookingQuantity": 1,
    "maxBookingQuantity": 3,
    "termsAndConditions": "...",
    "cancellationPolicy": "...",
    "averageRating": 4.8,
    "totalBookings": 150,
    "reviews": [ /* recent reviews */ ]
  }
}
```

### Create Service (Vendor Only)
```http
POST /services
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Sunset Cruise Experience",
  "description": "2-hour sunset cruise with dinner",
  "category": "activities",
  "subCategory": "cruise",
  "basePrice": 150.00,
  "pricingModel": "per_person",
  "availableQuantity": 50,
  "minBookingQuantity": 1,
  "maxBookingQuantity": 10,
  "locationAddress": "Marina Bay",
  "locationCity": "San Diego",
  "locationState": "CA",
  "amenities": ["Dinner", "Live Music", "Open Bar"],
  "termsAndConditions": "...",
  "cancellationPolicy": "Full refund 48hrs before"
}

Response 201:
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "serviceId": "uuid"
  }
}
```

### Update Service (Vendor Only)
```http
PUT /services/{serviceId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "basePrice": 175.00,
  "availableQuantity": 60
}

Response 200:
{
  "success": true,
  "message": "Service updated successfully"
}
```

---

## 📅 Bookings

### List Bookings
```http
GET /bookings?status=pending&page=1
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "bookingReference": "BK-2026-001234",
        "campaignId": "uuid",
        "campaignTitle": "Team Retreat",
        "service": {
          "id": "uuid",
          "name": "Beach Resort",
          "vendorName": "Luxury Resorts"
        },
        "quantity": 5,
        "totalPrice": 2500.00,
        "status": "pending",
        "bookingDate": "2026-01-05",
        "checkInDate": "2026-03-15",
        "checkOutDate": "2026-03-18",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "pagination": { /* ... */ }
  }
}
```

### Create Booking
```http
POST /bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "campaignId": "uuid",
  "serviceId": "uuid",
  "quantity": 5,
  "bookingDate": "2026-03-15",
  "checkInDate": "2026-03-15",
  "checkOutDate": "2026-03-18",
  "specialRequests": "Late checkout if possible"
}

Response 201:
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "bookingId": "uuid",
    "bookingReference": "BK-2026-001234",
    "status": "pending",
    "totalPrice": 2500.00
  }
}
```

### Approve Booking (Vendor Only)
```http
POST /bookings/{bookingId}/approve
Authorization: Bearer {token}
Content-Type: application/json

{
  "vendorNotes": "Confirmed for specified dates"
}

Response 200:
{
  "success": true,
  "message": "Booking approved",
  "data": {
    "status": "approved",
    "approvedAt": "2026-01-05T11:00:00Z"
  }
}
```

### Reject Booking (Vendor Only)
```http
POST /bookings/{bookingId}/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Fully booked for those dates"
}

Response 200:
{
  "success": true,
  "message": "Booking rejected"
}
```

### Cancel Booking
```http
POST /bookings/{bookingId}/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Changed plans"
}

Response 200:
{
  "success": true,
  "message": "Booking cancelled"
}
```

---

## 💰 Contributions

### Make Contribution
```http
POST /campaigns/{campaignId}/contribute
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 500.00,
  "paymentMethod": "credit_card",
  "paymentMethodId": "pm_card_visa_123",
  "isAnonymous": false,
  "message": "Happy to support this campaign!"
}

Response 201:
{
  "success": true,
  "message": "Contribution successful",
  "data": {
    "contributionId": "uuid",
    "transactionId": "uuid",
    "amount": 500.00,
    "status": "completed"
  }
}
```

### Get My Contributions
```http
GET /contributions?page=1
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "contributions": [
      {
        "id": "uuid",
        "campaign": {
          "id": "uuid",
          "title": "Team Retreat",
          "coverImageUrl": "https://..."
        },
        "amount": 500.00,
        "currency": "USD",
        "isAnonymous": false,
        "message": "Happy to support!",
        "status": "completed",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "pagination": { /* ... */ }
  }
}
```

---

## 💳 Transactions

### List Transactions
```http
GET /transactions?type=contribution&page=1
Authorization: Bearer {token}

Query Parameters:
  - type: contribution | payment | refund | withdrawal
  - status: pending | completed | failed | refunded
  - startDate: YYYY-MM-DD
  - endDate: YYYY-MM-DD

Response 200:
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "transactionType": "contribution",
        "amount": 500.00,
        "currency": "USD",
        "status": "completed",
        "description": "Contribution to Team Retreat",
        "campaign": {
          "id": "uuid",
          "title": "Team Retreat"
        },
        "paymentMethod": "credit_card",
        "processedAt": "2026-01-05T10:05:00Z",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "summary": {
      "totalAmount": 2500.00,
      "totalTransactions": 5
    },
    "pagination": { /* ... */ }
  }
}
```

### Get Transaction Details
```http
GET /transactions/{transactionId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "transactionType": "contribution",
    "amount": 500.00,
    "currency": "USD",
    "status": "completed",
    "fromUser": {
      "id": "uuid",
      "name": "John Doe"
    },
    "toUser": {
      "id": "uuid",
      "name": "Campaign Owner"
    },
    "campaign": { /* ... */ },
    "paymentMethod": "credit_card",
    "gatewayTransactionId": "ch_123456",
    "processedAt": "2026-01-05T10:05:00Z",
    "createdAt": "2026-01-05T10:00:00Z"
  }
}
```

---

## 🎫 Vouchers

### List Vouchers
```http
GET /vouchers?status=active
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "vouchers": [
      {
        "id": "uuid",
        "code": "SUMMER2026",
        "title": "Summer Discount",
        "description": "20% off all services",
        "discountType": "percentage",
        "discountValue": 20.00,
        "validFrom": "2026-06-01",
        "validUntil": "2026-08-31",
        "status": "active",
        "usageCount": 5,
        "usageLimit": 100
      }
    ]
  }
}
```

### Create Voucher (Corporate/Vendor)
```http
POST /vouchers
Authorization: Bearer {token}
Content-Type: application/json

{
  "campaignId": "uuid",
  "code": "TEAMRETREAT10",
  "title": "Team Retreat Bonus",
  "description": "$10 off booking",
  "discountType": "fixed_amount",
  "discountValue": 10.00,
  "minPurchaseAmount": 50.00,
  "validFrom": "2026-02-01",
  "validUntil": "2026-12-31",
  "usageLimit": 50
}

Response 201:
{
  "success": true,
  "message": "Voucher created successfully",
  "data": {
    "voucherId": "uuid",
    "code": "TEAMRETREAT10"
  }
}
```

### Redeem Voucher
```http
POST /vouchers/{voucherId}/redeem
Authorization: Bearer {token}
Content-Type: application/json

{
  "bookingAmount": 100.00
}

Response 200:
{
  "success": true,
  "message": "Voucher redeemed successfully",
  "data": {
    "discountApplied": 10.00,
    "finalAmount": 90.00
  }
}
```

---

## 💬 Messages

### List Conversations
```http
GET /messages/conversations
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "userId": "uuid",
      "userName": "Jane Smith",
      "userProfileImage": "https://...",
      "lastMessage": "Thanks for the update!",
      "lastMessageTime": "2026-01-05T10:00:00Z",
      "unreadCount": 2
    }
  ]
}
```

### Get Conversation Messages
```http
GET /messages/conversation/{userId}?page=1
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "recipientId": "uuid",
        "message": "Hello, I have a question about the campaign",
        "status": "read",
        "readAt": "2026-01-05T10:05:00Z",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "pagination": { /* ... */ }
  }
}
```

### Send Message
```http
POST /messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipientId": "uuid",
  "subject": "Campaign Question",
  "message": "Can you provide more details about the services?",
  "campaignId": "uuid"
}

Response 201:
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "messageId": "uuid"
  }
}
```

---

## 🔔 Notifications

### List Notifications
```http
GET /notifications?isRead=false&page=1
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "campaign",
        "title": "New Contribution",
        "message": "John Doe contributed $500 to your campaign",
        "referenceType": "contribution",
        "referenceId": "uuid",
        "actionUrl": "/campaigns/uuid",
        "isRead": false,
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": { /* ... */ }
  }
}
```

### Mark Notification as Read
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Mark All as Read
```http
POST /notifications/read-all
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 🎧 Support

### Create Support Ticket
```http
POST /support/tickets
Authorization: Bearer {token}
Content-Type: application/json

{
  "subject": "Cannot access campaign",
  "description": "I'm having trouble accessing my campaign dashboard",
  "category": "technical",
  "priority": "medium"
}

Response 201:
{
  "success": true,
  "message": "Support ticket created",
  "data": {
    "ticketId": "uuid",
    "ticketNumber": "TKT-2026-001234"
  }
}
```

### List My Tickets
```http
GET /support/tickets?status=open
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "uuid",
        "ticketNumber": "TKT-2026-001234",
        "subject": "Cannot access campaign",
        "category": "technical",
        "priority": "medium",
        "status": "open",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ]
  }
}
```

### Add Message to Ticket
```http
POST /support/tickets/{ticketId}/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "I tried clearing cache but the issue persists"
}

Response 201:
{
  "success": true,
  "message": "Message added to ticket"
}
```

---

## ⭐ Reviews

### Create Review
```http
POST /reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "serviceId": "uuid",
  "bookingId": "uuid",
  "rating": 5,
  "title": "Amazing Experience",
  "reviewText": "The service exceeded our expectations. Highly recommended!"
}

Response 201:
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "reviewId": "uuid"
  }
}
```

### Get Service Reviews
```http
GET /services/{serviceId}/reviews?page=1
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "averageRating": 4.8,
    "totalReviews": 50,
    "ratingDistribution": {
      "5": 35,
      "4": 10,
      "3": 3,
      "2": 1,
      "1": 1
    },
    "reviews": [
      {
        "id": "uuid",
        "reviewer": {
          "name": "John Doe",
          "profileImage": "https://..."
        },
        "rating": 5,
        "title": "Amazing Experience",
        "reviewText": "The service exceeded...",
        "vendorResponse": "Thank you for your feedback!",
        "createdAt": "2026-01-05T10:00:00Z"
      }
    ],
    "pagination": { /* ... */ }
  }
}
```

---

## 📊 Error Responses

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes:
- `VALIDATION_ERROR` (400) - Invalid request data
- `UNAUTHORIZED` (401) - Missing or invalid authentication
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource conflict (duplicate email, etc.)
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `INTERNAL_SERVER_ERROR` (500) - Server error

---

## 🔒 Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Read operations**: 100 requests per minute
- **Write operations**: 50 requests per minute
- **File uploads**: 10 requests per minute

Response headers include:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1641391200
```

---

## 📄 Pagination

All list endpoints support pagination:

```
?page=1&limit=20
```

Response format:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 10,
    "totalItems": 195,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

**API Version**: 1.0  
**Last Updated**: January 5, 2026  
**Base URL**: `https://api.kashcontact.com/v1`
