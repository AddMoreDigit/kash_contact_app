# 📐 Kash Contact App - Architecture Overview

## **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (React Frontend)                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  - Register/Login/Verify UI                                      │  │
│  │  - Campaign Management                                           │  │
│  │  - Service Booking                                               │  │
│  │  - Uses: amplify_outputs.json for config                        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ HTTPS (JWT Token Auth)
                               │
┌──────────────────────────────▼──────────────────────────────────────────┐
│                     AWS AMPLIFY GEN 2 BACKEND                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  API Gateway HTTP API (us-east-1)                                │  │
│  │  ┌────────────────────────────────────────────────────────────┐ │  │
│  │  │  POST /auth/register    → auth Lambda                      │ │  │
│  │  │  POST /auth/verify-email → auth Lambda                     │ │  │
│  │  │  POST /auth/login       → auth Lambda                      │ │  │
│  │  └────────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                               │                                         │
│                               ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Lambda Function: auth (Node.js 22, 512MB, 10s timeout)         │  │
│  │  ┌────────────────────────────────────────────────────────────┐ │  │
│  │  │  • Handler: amplify/functions/auth/index.js               │ │  │
│  │  │  • Dependencies: pg, bcryptjs, jsonwebtoken, AWS SDK      │ │  │
│  │  │  • Environment:                                           │ │  │
│  │  │    - DB_SECRET_ARN (Secrets Manager ARN)                 │ │  │
│  │  │    - JWT_SECRET (Secrets Manager ARN)                    │ │  │
│  │  │    - SES_FROM_EMAIL (verified email)                     │ │  │
│  │  │    - AWS_REGION (us-east-1)                              │ │  │
│  │  │  • VPC: Optional (if RDS is private)                     │ │  │
│  │  └────────────────────────────────────────────────────────────┘ │  │
│  └──────────────┬───────────────────────────┬───────────────────────┘  │
└─────────────────┼───────────────────────────┼──────────────────────────┘
                  │                           │
        ┌─────────▼────────┐       ┌──────────▼────────┐
        │  AWS Services    │       │  AWS Services     │
        │                  │       │                   │
        │  Secrets Manager │       │  SES (Email)      │
        │  ┌────────────┐  │       │  ┌─────────────┐  │
        │  │ DB Creds   │  │       │  │ Send OTP    │  │
        │  │ JWT Secret │  │       │  │ Emails      │  │
        │  └────────────┘  │       │  └─────────────┘  │
        └──────────────────┘       └───────────────────┘
                  │
        ┌─────────▼────────────────────────────────────┐
        │  Amazon RDS PostgreSQL 15.5                  │
        │  ┌────────────────────────────────────────┐  │
        │  │  Database: kash_contact                │  │
        │  │  Instance: db.t3.micro                 │  │
        │  │  Storage: 20GB gp3                     │  │
        │  │  Network: Public or VPC Private        │  │
        │  │                                        │  │
        │  │  Schema (22 tables):                   │  │
        │  │    • users (auth, profile)             │  │
        │  │    • campaigns (fundraising)           │  │
        │  │    • services (vendor offerings)       │  │
        │  │    • bookings (reservations)           │  │
        │  │    • transactions (payments)           │  │
        │  │    • contributions (donations)         │  │
        │  │    • messages, notifications, reviews  │  │
        │  │    • ... 15 more tables                │  │
        │  └────────────────────────────────────────┘  │
        └───────────────────────────────────────────────┘
```

---

## **Data Flow: User Registration & Verification**

```
┌─────────────┐                                    ┌─────────────┐
│   Client    │                                    │   Client    │
│  (React)    │                                    │  (React)    │
└──────┬──────┘                                    └──────▲──────┘
       │                                                  │
       │ 1. POST /auth/register                          │ 8. Success response
       │    {email, password, firstName, ...}            │
       │                                                  │
       ▼                                                  │
┌─────────────────────────────────────────────────────────────┐
│  API Gateway                                                │
└──────┬──────────────────────────────────────────────────────┘
       │                                                  ▲
       │ 2. Invoke Lambda                                │ 7. Return response
       │                                                  │
       ▼                                                  │
┌─────────────────────────────────────────────────────────────┐
│  Lambda: auth                                               │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  3. Hash password (bcrypt)                           │ │
│  │  4. Generate 6-digit OTP                             │ │
│  │  5. Insert user:                                     │ │
│  │     - status = 'pending_verification'               │ │
│  │     - email_verified = FALSE                         │ │
│  │     - otp_code = 'XXXXXX'                           │ │
│  │     - otp_expires_at = now + 10 minutes             │ │
│  └───────────────────────────────────────────────────────┘ │
└──────┬────────────────────────────┬─────────────────────────┘
       │                            │
       │ 6. INSERT INTO users       │ 6. Send OTP email
       │                            │
       ▼                            ▼
┌────────────────────┐      ┌──────────────────┐
│  RDS PostgreSQL    │      │  AWS SES         │
│  users table       │      │  ┌────────────┐  │
│  ┌──────────────┐  │      │  │ To: user   │  │
│  │ New user row │  │      │  │ OTP: 123456│  │
│  │ email_verified│  │      │  └────────────┘  │
│  │ = FALSE      │  │      └──────────────────┘
│  │ otp_code     │  │              │
│  │ = '123456'   │  │              │
│  └──────────────┘  │              ▼
└────────────────────┘      📧 User receives email


┌─────────────┐
│   Client    │  User enters OTP from email
│  (React)    │
└──────┬──────┘
       │
       │ 9. POST /auth/verify-email
       │    {email, otp: '123456'}
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  Lambda: auth                                               │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  10. Query user by email                             │ │
│  │  11. Check OTP matches & not expired                 │ │
│  │  12. UPDATE users SET:                               │ │
│  │      - email_verified = TRUE                         │ │
│  │      - status = 'active'                             │ │
│  │      - otp_code = NULL                               │ │
│  │      - otp_expires_at = NULL                         │ │
│  └───────────────────────────────────────────────────────┘ │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 13. UPDATE users
       ▼
┌────────────────────┐
│  RDS PostgreSQL    │
│  users table       │
│  ┌──────────────┐  │
│  │ email_verified│  │
│  │ = TRUE       │  │
│  │ status       │  │
│  │ = 'active'   │  │
│  └──────────────┘  │
└────────────────────┘
       │
       │ 14. Success response
       ▼
┌─────────────┐
│   Client    │  User can now login
│  (React)    │
└─────────────┘
```

---

## **Data Flow: User Login**

```
┌─────────────┐
│   Client    │
│  (React)    │  1. POST /auth/login {email, password}
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  Lambda: auth                                               │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  2. Query user by email                              │ │
│  │  3. Compare password hash (bcrypt.compare)           │ │
│  │  4. Check email_verified = TRUE                      │ │
│  │  5. Generate JWT token:                              │ │
│  │     payload: {userId, email, userType}               │ │
│  │     secret: from Secrets Manager                     │ │
│  │     expiry: 7 days                                   │ │
│  │  6. UPDATE last_login = now                          │ │
│  └───────────────────────────────────────────────────────┘ │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 7. Return {token, user}
       ▼
┌─────────────┐
│   Client    │  Store token in localStorage/sessionStorage
│  (React)    │  Include in Authorization header for future requests
└─────────────┘
```

---

## **Database Schema Summary**

### **Core Tables (22 total)**

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | User authentication & profile | email, password_hash, email_verified, otp_code, status |
| `corporate_profiles` | Corporate account details | company_name, tax_id, credit_limit |
| `vendor_profiles` | Vendor/service provider info | business_name, rating, is_verified |
| `team_members` | Corporate team management | role, permissions |
| `campaigns` | Fundraising campaigns | title, goal_amount, current_amount, status |
| `campaign_services` | Services linked to campaigns | quantity, total_price |
| `services` | Vendor offerings | name, base_price, availability, location |
| `bookings` | Service reservations | booking_reference, status, dates |
| `contributions` | Campaign donations | amount, is_anonymous, payment_method |
| `transactions` | All financial transactions | transaction_type, amount, status |
| `vouchers` | Discount codes | code, discount_value, validity |
| `messages` | Direct messaging | sender, recipient, message, status |
| `notifications` | System notifications | type, title, is_read |
| `reviews` | Service ratings | rating (1-5), review_text |
| `support_tickets` | Customer support | ticket_number, status, priority |
| `support_ticket_messages` | Support chat | message, attachments |
| `activity_logs` | Audit trail | action, entity_type, ip_address |
| `payment_methods` | Saved payment info | type, last_four_digits, is_default |
| `campaign_drafts` | Unsaved campaigns | draft_data (JSON) |
| `reminders` | Scheduled reminders | scheduled_for, recipient_type |

### **Database Features**
- ✅ UUID primary keys
- ✅ JSONB fields for flexible data
- ✅ Foreign keys with cascade rules
- ✅ Check constraints (email format, rating range, etc.)
- ✅ Indexes on frequently queried columns
- ✅ Triggers for `updated_at` timestamp
- ✅ Triggers for aggregating campaign amounts
- ✅ Views for common queries
- ✅ PostgreSQL extensions: uuid-ossp, pgcrypto

---

## **Security Features**

### **Authentication Flow**
1. ✅ Password hashing: bcrypt (salt rounds: 10)
2. ✅ Email verification: OTP with 10-minute expiry
3. ✅ JWT tokens: 7-day expiry, signed with secret from Secrets Manager
4. ✅ Account status: `pending_verification` → `active` after email verified

### **AWS Security**
1. ✅ Secrets Manager for sensitive data (DB credentials, JWT secret)
2. ✅ IAM roles for Lambda (least privilege access)
3. ✅ VPC isolation for RDS (optional, for production)
4. ✅ Security groups restricting database access
5. ✅ HTTPS-only API Gateway endpoints
6. ✅ SES email authentication (SPF, DKIM)

### **Database Security**
1. ✅ Passwords never stored in plaintext
2. ✅ OTP codes cleared after verification
3. ✅ Soft deletes (`deleted_at` timestamp)
4. ✅ Activity logging for audit trail
5. ✅ Row-level constraints on critical fields

---

## **File Manifest**

### **Amplify Backend (Infrastructure as Code)**
```
amplify/
├── backend.ts                   # Main entrypoint, imports all resources
├── auth/resource.ts             # Cognito auth (not used yet)
├── data/resource.ts             # GraphQL data (not used yet)
├── functions/
│   ├── resource.ts              # Function definitions (auth Lambda)
│   └── auth/
│       ├── index.js             # Auth Lambda handler (register/verify/login)
│       ├── package.json         # Dependencies: pg, bcryptjs, jsonwebtoken, AWS SDK
│       └── README.md            # Lambda documentation
└── api/resource.ts              # API Gateway routes (/auth/*)
```

### **Database**
```
database/
├── schema.sql                   # Complete PostgreSQL schema (895 lines)
├── ERD.md                       # Entity-relationship diagram
├── API_SPECIFICATION.md         # API endpoint specs
├── AWS_ARCHITECTURE.md          # Architecture documentation
└── README.md                    # Database overview
```

### **Deployment Scripts**
```
scripts/
├── collect-aws-artifacts.ps1    # Interactive AWS resource collector
├── import-schema.ps1            # PostgreSQL schema importer
└── deploy-workflow.ps1          # Master deployment wizard
```

### **Documentation**
```
DEPLOYMENT_GUIDE.md              # Detailed step-by-step deployment guide
QUICK_START.md                   # Quick reference card
```

### **Generated Files (after deployment)**
```
amplify_outputs.json             # Frontend configuration (API endpoint, etc.)
scripts/aws-artifacts.json       # Collected AWS resource ARNs/IDs
```

---

## **Next Steps After Deployment**

### **1. Frontend Integration**
- Import `amplify_outputs.json` in React app
- Create auth UI components (register, login, verify)
- Store JWT token in localStorage
- Add `Authorization: Bearer <token>` header to authenticated requests

### **2. Additional Backend APIs**
Extend `amplify/api/resource.ts` and create new Lambda functions for:
- Campaign CRUD (create, list, update, delete, view)
- Service search and filtering
- Booking creation and management
- Transaction processing
- Messaging system

### **3. Production Hardening**
- [ ] Move RDS to private VPC
- [ ] Enable RDS automated backups
- [ ] Set up CloudWatch alarms
- [ ] Enable API Gateway throttling/WAF
- [ ] Implement rate limiting in Lambda
- [ ] Add monitoring and logging dashboards
- [ ] Set up CI/CD pipeline (GitHub Actions)

### **4. Testing**
- [ ] Unit tests for Lambda functions
- [ ] Integration tests for API endpoints
- [ ] Load testing with artillery/k6
- [ ] Security testing (OWASP top 10)

---

## **Cost Optimization Tips**

1. **Use AWS Free Tier** (12 months):
   - RDS db.t3.micro: 750 hours/month free
   - Lambda: 1M requests + 400K GB-seconds free
   - API Gateway: 1M HTTP API requests free

2. **Production Cost Reduction**:
   - Use RDS Reserved Instances (up to 60% savings)
   - Enable Lambda Provisioned Concurrency only if needed
   - Use S3 for static assets (cheaper than Lambda)
   - Set up CloudWatch log retention (7-30 days)

3. **Monitoring**:
   - Enable AWS Cost Explorer
   - Set billing alarms for unexpected costs
   - Tag all resources for cost allocation

---

**Architecture ready for deployment! 🚀**

**Run the wizard**: `.\scripts\deploy-workflow.ps1`
