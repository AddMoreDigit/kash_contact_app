# 🚀 Kash Contact App - Quick Start Guide

## **Choose Your Path**

### 🎯 **Option 1: Automated Workflow (Recommended)**
```powershell
.\scripts\deploy-workflow.ps1
```
This wizard will guide you through everything step-by-step.

---

### ⚙️ **Option 2: Manual Step-by-Step**

#### **Step 1: Collect AWS Resources**
```powershell
.\scripts\collect-aws-artifacts.ps1
```
Creates: `scripts/aws-artifacts.json`

#### **Step 2: Update Amplify Config**
After collecting artifacts, manually update `amplify/functions/resource.ts`:
- Replace `JWT_SECRET` with your JWT secret ARN
- Replace `SES_FROM_EMAIL` with verified email
- Add VPC config if RDS is private

#### **Step 3: Deploy Backend**
```powershell
npx @aws-amplify/cli@latest push
```
⏱️ Takes 3-5 minutes

#### **Step 4: Import Database Schema**
```powershell
.\scripts\import-schema.ps1
```
Requires PostgreSQL client (psql) or use AWS CloudShell

#### **Step 5: Test Auth Endpoints**
```powershell
# Test registration
$API_URL = "<your-api-endpoint>"  # From amplify_outputs.json

Invoke-RestMethod -Uri "$API_URL/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    email = "test@example.com"
    password = "Test@12345"
    firstName = "John"
    lastName = "Doe"
    userType = "user"
  } | ConvertTo-Json)
```

---

## 📋 **Prerequisites Checklist**

### **AWS Account**
- [ ] AWS account with admin/IAM permissions
- [ ] Region: `us-east-1`

### **AWS Resources to Create**
- [ ] **RDS PostgreSQL** (db.t3.micro, public or VPC)
  - Database name: `kash_contact`
  - Engine: PostgreSQL 15.5+
  
- [ ] **Secrets Manager** (2 secrets)
  - `my-app/db-credentials` ✅ (Already created)
  - `my-app/jwt-secret` ⏳ (To create)

- [ ] **SES Verified Email** ⏳
  - Verify sender email (e.g., `no-reply@yourdomain.com`)
  - If in sandbox, also verify test recipient emails

- [ ] **VPC Details** (optional, only if RDS is private)
  - VPC ID
  - 2+ subnet IDs
  - Security group ID

### **Local Tools**
- [ ] Node.js 22.x (already installed ✅)
- [ ] npm 10.x (already installed ✅)
- [ ] AWS credentials configured
  ```powershell
  npx @aws-amplify/cli@latest configure
  ```
- [ ] PostgreSQL client (for schema import)
  - Install: https://www.postgresql.org/download/windows/
  - Or use AWS CloudShell (no install needed)

---

## 🎯 **Quick Commands Reference**

### **AWS Console Links**
```
RDS:             https://console.aws.amazon.com/rds/
Secrets Manager: https://console.aws.amazon.com/secretsmanager/
SES:             https://console.aws.amazon.com/ses/
Lambda:          https://console.aws.amazon.com/lambda/
API Gateway:     https://console.aws.amazon.com/apigateway/
CloudWatch Logs: https://console.aws.amazon.com/cloudwatch/
```

### **Amplify CLI**
```powershell
# Configure AWS credentials
npx @aws-amplify/cli@latest configure

# Deploy backend
npx @aws-amplify/cli@latest push

# Check deployment status
npx @aws-amplify/cli@latest status

# Delete all resources (DESTRUCTIVE)
npx @aws-amplify/cli@latest delete
```

### **Database Management**
```powershell
# Import schema (interactive)
.\scripts\import-schema.ps1

# Connect to RDS via psql
$env:PGHOST = "your-db-endpoint.rds.amazonaws.com"
$env:PGUSER = "postgres"
$env:PGDATABASE = "kash_contact"
psql

# Run SQL query
psql -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public';"
```

### **Testing Endpoints**
```powershell
# Get API endpoint
$outputs = Get-Content .\amplify_outputs.json | ConvertFrom-Json
$API_URL = $outputs.custom.api.url

# Test registration
Invoke-RestMethod -Uri "$API_URL/auth/register" -Method POST `
  -ContentType "application/json" `
  -Body (@{email="test@example.com"; password="Test@12345"; firstName="John"; lastName="Doe"; userType="user"} | ConvertTo-Json)

# Test verification
Invoke-RestMethod -Uri "$API_URL/auth/verify-email" -Method POST `
  -ContentType "application/json" `
  -Body (@{email="test@example.com"; otp="123456"} | ConvertTo-Json)

# Test login
Invoke-RestMethod -Uri "$API_URL/auth/login" -Method POST `
  -ContentType "application/json" `
  -Body (@{email="test@example.com"; password="Test@12345"} | ConvertTo-Json)
```

### **Debugging**
```powershell
# View Lambda logs (real-time)
aws logs tail /aws/lambda/auth --follow --region us-east-1

# Check function environment
aws lambda get-function-configuration --function-name auth --region us-east-1

# List API routes
aws apigatewayv2 get-routes --api-id <api-id> --region us-east-1

# Test RDS connectivity
Test-NetConnection -ComputerName your-db-endpoint.rds.amazonaws.com -Port 5432
```

---

## 🎨 **Project Structure**

```
kash_contact_app/
├── amplify/
│   ├── backend.ts              # Main backend entrypoint
│   ├── auth/resource.ts        # Cognito auth (unused for now)
│   ├── data/resource.ts        # GraphQL data (unused for now)
│   ├── functions/
│   │   ├── resource.ts         # Function manifest (auth Lambda)
│   │   └── auth/
│   │       ├── index.js        # Auth Lambda handler
│   │       ├── package.json    # Lambda dependencies
│   │       └── README.md       # Lambda documentation
│   └── api/resource.ts         # API Gateway routes
│
├── database/
│   └── schema.sql              # PostgreSQL schema (22 tables)
│
├── scripts/
│   ├── collect-aws-artifacts.ps1   # AWS resource collector
│   ├── import-schema.ps1           # Database schema importer
│   └── deploy-workflow.ps1         # Master deployment wizard
│
├── amplify_outputs.json        # Generated after deploy (frontend config)
├── DEPLOYMENT_GUIDE.md         # Detailed deployment instructions
└── QUICK_START.md              # This file
```

---

## 🆘 **Troubleshooting**

### **Issue: Lambda can't connect to RDS**
**Symptoms**: `ECONNREFUSED`, timeout errors in CloudWatch logs

**Solutions**:
1. Check RDS security group allows inbound from Lambda SG on port 5432
2. If RDS is private, ensure Lambda is in same VPC with proper subnets
3. Verify RDS instance status is "available"

### **Issue: SES email not sending**
**Symptoms**: `MessageRejected` error

**Solutions**:
1. Verify sender email in SES Console
2. If in SES sandbox, recipient must also be verified
3. Ensure SES verification is in same region (us-east-1)

### **Issue: Amplify CLI errors**
**Symptoms**: `AccessDenied`, `CredentialsError`

**Solutions**:
1. Run: `npx @aws-amplify/cli@latest configure`
2. Ensure AWS credentials have IAM permissions for:
   - Lambda, API Gateway, IAM, CloudFormation, S3
3. Check `~\.aws\credentials` file exists

### **Issue: Schema import fails**
**Symptoms**: psql connection refused, authentication failed

**Solutions**:
1. Verify RDS endpoint is correct
2. Check password from Secrets Manager
3. Ensure RDS is publicly accessible OR use VPN/bastion
4. Verify security group allows your IP on port 5432

---

## 📊 **Expected Costs (AWS Free Tier)**

- **RDS db.t3.micro**: $0 (750 hours/month free tier for 12 months)
- **Lambda**: $0 (1M requests + 400K GB-seconds free per month)
- **API Gateway**: $0 (1M requests free for 12 months HTTP APIs)
- **Secrets Manager**: ~$0.40/month per secret (2 secrets = $0.80/month)
- **SES**: $0 (62K emails free per month)

**Total estimated cost**: ~$0.80/month (only Secrets Manager, rest is free tier)

---

## 🎓 **Learning Resources**

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/build-a-backend/)
- [AWS RDS PostgreSQL Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [PostgreSQL 15 Documentation](https://www.postgresql.org/docs/15/)

---

## ✅ **Success Checklist**

After deployment, verify:

- [ ] RDS instance shows "available" status
- [ ] Both Secrets Manager secrets exist with correct values
- [ ] SES email shows "Verified" status
- [ ] Lambda function exists in AWS Console
- [ ] API Gateway has 3 routes (/auth/register, /auth/verify-email, /auth/login)
- [ ] Database has 22 tables (check with psql)
- [ ] `amplify_outputs.json` generated locally
- [ ] Test registration returns user ID
- [ ] OTP email received successfully
- [ ] Email verification updates user status
- [ ] Login returns JWT token

---

**Need Help?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions.

**Ready to Deploy?** Run: `.\scripts\deploy-workflow.ps1`
