# Kash Contact App - Complete Deployment Guide
**Local Amplify Gen 2 Workflow with PostgreSQL Schema Import**

---

## 📋 **Overview**

This guide walks you through deploying the Kash Contact Application using AWS Amplify Gen 2 with a complete PostgreSQL database schema import. All infrastructure is defined as code in your `amplify/` directory.

---

## 🎯 **Prerequisites**

### **1. AWS Account Setup**
- AWS account with appropriate permissions (IAM, RDS, Lambda, API Gateway, Secrets Manager, SES, VPC)
- AWS region: `us-east-1`

### **2. Required AWS Resources**

You'll need to create/verify these AWS resources:

#### **A. RDS PostgreSQL Instance**
- Engine: PostgreSQL 15.x or later
- Instance class: `db.t3.micro` (or larger for production)
- Storage: 20GB minimum
- Network: Either **public** (simpler) or **private in VPC** (secure)

#### **B. Secrets Manager Entries**
1. **Database Credentials** (✅ Already created):
   - ARN: `arn:aws:secretsmanager:REGION:ACCOUNT-ID:secret:my-app/db-credentials-XXXXX`
   - ℹ️ **How to find**: Go to Secrets Manager Console → Select your DB credentials secret → Copy ARN from "Secret details" section
   - Secret JSON:
     ```json
     {
       "host": "your-db-instance.region.rds.amazonaws.com",
       "port": 5432,
       "database": "kash_contact",
       "username": "postgres",
       "password": "YourSecurePassword"
     }
     ```

2. **JWT Secret** (⏳ To be created):
   - Name: `my-app/jwt-secret`
   - Secret JSON:
     ```json
     {
       "JWT_SECRET": "your-64-character-random-string-here"
     }
     ```

#### **C. SES Verified Email**
- Verified sender email (e.g., `no-reply@yourdomain.com`)
- **Important**: If in SES Sandbox, also verify recipient emails for testing

#### **D. VPC Configuration (if RDS is private)**
- VPC ID
- At least 2 private subnet IDs (different AZs)
- Security group ID (allows Lambda → RDS on port 5432)

---

## 📦 **Step 1: Create RDS PostgreSQL Instance**

### **Option A: AWS Console (Recommended for First-Time Setup)**

1. **Navigate to RDS Console**:
   - Go to: https://console.aws.amazon.com/rds/
   - Click **"Create database"**

2. **Configuration**:
   ```
   Engine: PostgreSQL 15.5
   Template: Free tier (or Dev/Test)
   DB instance identifier: kash-contact-db
   Master username: postgres
   Master password: [Create strong password]
   
   DB instance class: db.t3.micro
   Storage: 20 GiB General Purpose SSD (gp3)
   
   VPC: [Select your VPC or default]
   Public access: Yes (for easier initial setup)
   Security group: Create new → Allow PostgreSQL (port 5432)
   
   Database name: kash_contact
   ```

3. **Note the endpoint**: After creation, copy the endpoint (e.g., `your-instance-name.xxxxxxxxxxxx.region.rds.amazonaws.com`) from the RDS console

4. **Update Secrets Manager**:
   - Go to Secrets Manager → Select your DB credentials secret → **Retrieve secret value** → **Edit**
   - Update the `host` field with your RDS endpoint
   - Save

### **Option B: AWS CLI**

```powershell
# Create RDS instance
aws rds create-db-instance `
  --db-instance-identifier kash-contact-db `
  --db-instance-class db.t3.micro `
  --engine postgres `
  --engine-version 15.5 `
  --master-username postgres `
  --master-user-password YourSecurePassword123! `
  --allocated-storage 20 `
  --db-name kash_contact `
  --publicly-accessible `
  --region us-east-1

# Wait for instance to be available (5-10 minutes)
aws rds wait db-instance-available --db-instance-identifier kash-contact-db --region us-east-1

# Get endpoint
aws rds describe-db-instances `
  --db-instance-identifier kash-contact-db `
  --query 'DBInstances[0].Endpoint.Address' `
  --output text `
  --region us-east-1
```

---

## 🔐 **Step 2: Create Missing AWS Artifacts**

### **A. Create JWT Secret in Secrets Manager**

**Console Method** (Recommended):
1. Go to: https://console.aws.amazon.com/secretsmanager/
2. Click **"Store a new secret"**
3. Select **"Other type of secret"**
4. Key/value pairs:
   - Key: `JWT_SECRET`
   - Value: Generate a random 64-character string (use PowerShell):
     ```powershell
     -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
     ```
5. Secret name: `my-app/jwt-secret`
6. Click **Next** → **Next** → **Store**
7. **Copy the ARN** (e.g., `arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-XXXXXX`)

**CLI Method** (if AWS CLI installed):
```powershell
# Generate JWT secret
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})

# Create secret
aws secretsmanager create-secret `
  --name my-app/jwt-secret `
  --secret-string "{\"JWT_SECRET\":\"$jwtSecret\"}" `
  --region us-east-1

# Get ARN
aws secretsmanager describe-secret `
  --secret-id my-app/jwt-secret `
  --query 'ARN' `
  --output text `
  --region us-east-1
```

### **B. Verify SES Email Address**

**Console Method**:
1. Go to: https://console.aws.amazon.com/ses/
2. Click **"Verified identities"** → **"Create identity"**
3. Identity type: **Email address**
4. Email address: `no-reply@yourdomain.com` (or your email for testing)
5. Click **"Create identity"**
6. Check your email inbox for verification link and click it
7. Wait for status to change to **"Verified"**
8. **Note**: Use this exact email address in your function config

**CLI Method**:
```powershell
# Verify email
aws ses verify-email-identity `
  --email-address no-reply@yourdomain.com `
  --region us-east-1

# Check verification status
aws ses get-identity-verification-attributes `
  --identities no-reply@yourdomain.com `
  --region us-east-1
```

### **C. Get VPC Info (Only if RDS is Private)**

**Console Method**:
1. Go to RDS Console → Your DB instance → **Connectivity & security** tab
2. Note:
   - **VPC**: `vpc-xxxxxxxx`
   - **Subnets**: Click "Subnet group" link → Note at least 2 subnet IDs
   - **Security groups**: Note the security group ID (e.g., `sg-xxxxxxxx`)

**CLI Method**:
```powershell
# Get VPC, subnets, and security groups
aws rds describe-db-instances `
  --db-instance-identifier kash-contact-db `
  --query 'DBInstances[0].{VPC:DBSubnetGroup.VpcId,Subnets:DBSubnetGroup.Subnets[*].SubnetIdentifier,SecurityGroups:VpcSecurityGroups[*].VpcSecurityGroupId}' `
  --region us-east-1
```

---

## ⚙️ **Step 3: Update Amplify Function Environment Variables**

Now you need to update `amplify/functions/resource.ts` with the real values:

**You'll provide these values:**
1. ✅ `DB_SECRET_ARN`: Already set to `arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-WvyPlW`
2. ⏳ `JWT_SECRET`: ARN from Step 2A (e.g., `arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-XXXXXX`)
3. ⏳ `SES_FROM_EMAIL`: Verified email from Step 2B (e.g., `no-reply@yourdomain.com`)
4. ✅ `AWS_REGION`: Already set to `us-east-1`

**Optional VPC Config** (if RDS is private):
- VPC ID, Subnet IDs, Security Group ID from Step 2C

---

## 🚀 **Step 4: Deploy Backend with Amplify CLI**

### **Install/Configure Amplify CLI** (if not done)

```powershell
# Install Amplify CLI globally (or use npx)
npm install -g @aws-amplify/cli

# Configure Amplify with your AWS credentials
npx @aws-amplify/cli@latest configure
```

When prompted:
- Select region: `us-east-1`
- It will open browser for AWS login → Sign in
- Complete authorization

### **Deploy Backend**

```powershell
# Navigate to project root
cd d:\Professional_Work\01_Corporate_Employment\Add_More\Current_Projects\Project_Kash-Contact\GitHub\kash_contact_app

# Deploy Amplify backend (synthesizes CDK and deploys all resources)
npx @aws-amplify/cli@latest push
```

**Expected Output**:
- ✅ Lambda functions created (`auth`)
- ✅ API Gateway HTTP API created with routes (`/auth/register`, `/auth/verify-email`, `/auth/login`)
- ✅ IAM roles and policies attached
- ✅ Amplify outputs generated in `amplify_outputs.json`

**⏱️ Duration**: 3-5 minutes

---

## 📊 **Step 5: Import PostgreSQL Schema**

Once RDS is ready and accessible, import the schema:

### **Method 1: psql Command (Recommended)**

**Requirements**: 
- Install PostgreSQL client tools: https://www.postgresql.org/download/windows/
- Or use AWS CloudShell (has psql pre-installed)

**Command**:
```powershell
# Set environment variables (from Secrets Manager)
$env:PGHOST = "kash-contact-db.c9akz3rk0xxxx.us-east-1.rds.amazonaws.com"
$env:PGUSER = "postgres"
$env:PGDATABASE = "kash_contact"

# Import schema
psql -h $env:PGHOST -U $env:PGUSER -d $env:PGDATABASE -f database\schema.sql

# Enter password when prompted
```

### **Method 2: AWS CloudShell (No Installation Required)**

1. Open AWS CloudShell: https://console.aws.amazon.com/cloudshell/
2. Upload `database/schema.sql`:
   - Click **Actions** → **Upload file** → Select `schema.sql`
3. Run import:
   ```bash
   psql -h kash-contact-db.c9akz3rk0xxxx.us-east-1.rds.amazonaws.com \
        -U postgres \
        -d kash_contact \
        -f schema.sql
   ```

### **Method 3: DBeaver/pgAdmin GUI**
1. Install DBeaver: https://dbeaver.io/download/
2. Create connection:
   - Host: `[RDS endpoint]`
   - Port: `5432`
   - Database: `kash_contact`
   - Username: `postgres`
   - Password: `[from Secrets Manager]`
3. Open SQL editor → Paste `schema.sql` content → Execute

### **Verify Import**

```sql
-- Connect to database and check
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should return 22 tables: users, campaigns, services, bookings, etc.
```

---

## 🧪 **Step 6: Test Auth Endpoints**

### **Get API Endpoint**

After deployment, find your API endpoint:

```powershell
# Check amplify_outputs.json
Get-Content amplify_outputs.json | ConvertFrom-Json | Select-Object -ExpandProperty custom | Select-Object -ExpandProperty api
```

Or from AWS Console:
- API Gateway → APIs → `authApi` → Stages → `$default` → Invoke URL

### **Test Registration**

```powershell
# Set API endpoint
$API_URL = "https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com"

# Test registration
$body = @{
    email = "test@example.com"
    password = "Test@12345"
    firstName = "John"
    lastName = "Doe"
    userType = "user"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$API_URL/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

**Expected Response**:
```json
{
  "message": "Registration successful. Please check your email for OTP.",
  "userId": "uuid-here"
}
```

### **Test Email Verification**

```powershell
# Check email for OTP code, then:
$body = @{
    email = "test@example.com"
    otp = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$API_URL/auth/verify-email" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### **Test Login**

```powershell
$body = @{
    email = "test@example.com"
    password = "Test@12345"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "$API_URL/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

# Save token for authenticated requests
$token = $response.token
```

---

## 🔧 **Troubleshooting**

### **Issue: Lambda Can't Connect to RDS**

**Symptoms**: `ECONNREFUSED` or timeout errors in CloudWatch logs

**Solutions**:
1. **Security Group**: Ensure Lambda's security group is allowed inbound on RDS security group (port 5432)
2. **VPC Configuration**: If RDS is private, Lambda MUST be in same VPC with proper subnets
3. **Check RDS Status**: Ensure instance is `available`

### **Issue: SES Email Not Sending**

**Symptoms**: `MessageRejected` error

**Solutions**:
1. **Verify Email**: Ensure sender email is verified in SES console
2. **Sandbox Mode**: If in SES sandbox, recipient emails must also be verified
3. **Region**: Ensure SES verification is in same region (`us-east-1`)

### **Issue: Secrets Manager Access Denied**

**Symptoms**: Lambda fails with `AccessDeniedException`

**Solution**: Add IAM policy to Lambda role (Amplify should auto-generate, but verify):
```json
{
  "Effect": "Allow",
  "Action": "secretsmanager:GetSecretValue",
  "Resource": [
    "arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-*",
    "arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-*"
  ]
}
```

### **Check Lambda Logs**

```powershell
# Get latest logs
aws logs tail /aws/lambda/auth --follow --region us-east-1
```

---

## 📝 **Next Steps**

1. ✅ **Backend Deployed** → Auth API is live
2. ⏳ **Frontend Integration**:
   - Use `amplify_outputs.json` to configure AWS Amplify in React
   - Add auth UI components for register/login/verify
   - Store JWT token in localStorage/sessionStorage
   - Add authenticated API calls with `Authorization: Bearer <token>`

3. ⏳ **Additional Features**:
   - Implement campaign CRUD endpoints
   - Add service/booking APIs
   - Implement transaction processing
   - Add admin panel

---

## 🎉 **Summary Checklist**

- [ ] RDS PostgreSQL instance created and accessible
- [ ] Secrets Manager: `db-credentials` updated with RDS endpoint
- [ ] Secrets Manager: `jwt-secret` created
- [ ] SES email address verified
- [ ] VPC info collected (if RDS is private)
- [ ] `amplify/functions/resource.ts` updated with all env vars
- [ ] `npx @aws-amplify/cli@latest push` executed successfully
- [ ] Schema imported to RDS via psql/CloudShell/GUI
- [ ] Auth endpoints tested (register, verify, login)
- [ ] Frontend ready to integrate with API

---

**🔗 Useful Links**:
- [Amplify Gen 2 Docs](https://docs.amplify.aws/react/build-a-backend/)
- [RDS PostgreSQL Setup](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)
- [AWS SES Setup](https://docs.aws.amazon.com/ses/latest/dg/verify-email-addresses.html)
