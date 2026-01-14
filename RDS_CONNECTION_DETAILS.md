# Kash Contact RDS Connection Details
# Generated: January 12, 2026
# Instance: your-rds-instance-name
# (Replace 'your-rds-instance-name' with your actual RDS instance identifier)

## RDS Instance Information

**Status**: Backing-up (will be "Available" shortly)

### Connection Details
- **Endpoint**: `your-instance-name.xxxxxxxxxx.region.rds.amazonaws.com`
  - ℹ️ **How to find**: RDS Console → Select your instance → Copy endpoint from "Connectivity & security" section
- **Port**: `5432`
- **Database Name**: `kash_contact` (if you specified during creation, otherwise use `postgres`)
- **Master Username**: `postgres` (or what you set during creation)
- **Region**: `us-east-1`

### Network Configuration
- **VPC**: `vpc-09a5094b22e709eef`
- **Availability Zone**: `us-east-1a`
- **Subnet Group**: `default-vpc-09a5094b22e709eef`
- **Subnets**:
  - `subnet-0776664d0cfde061d`
  - `subnet-01be8a792ca58d61a`
  - `subnet-0c9a7acf29d110f36`
  - `subnet-0bc772da845b664ae`
  - `subnet-0b3dbf907234ac3f3`
  - `subnet-08cd9157ebf048b76`
- **Security Group**: `sg-0655ac897b884d2ce` (default)

### Security Settings
- **Publicly Accessible**: ❌ **NO** (Private - requires VPC access)
- **Certificate Authority**: rds-ca-rsa2048-g1
- **Certificate Expiration**: January 12, 2027

---

## ⚠️ IMPORTANT: Security Group Configuration Required

Your RDS instance is **NOT publicly accessible** and is in a private VPC. This means:

1. **Lambda functions MUST be in the same VPC** to connect to RDS
2. **Security group must allow Lambda access**

### Action Required: Update Security Group

#### Option 1: Allow Lambda Access (Recommended)

1. Go to **EC2 Console** → **Security Groups**: https://console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroups
2. Find security group: `sg-0655ac897b884d2ce` (default)
3. Click **Edit inbound rules** → **Add rule**:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: `sg-0655ac897b884d2ce` (allow same security group - Lambda will use this)
   - **Description**: "Allow Lambda to RDS"
4. **Save rules**

#### Option 2: Make RDS Publicly Accessible (Easier for Development)

⚠️ **Only for development/testing - NOT recommended for production**

1. Go to **RDS Console** → Select your RDS instance
2. Click **Modify**
3. Under **Connectivity**:
   - Change **Public access** to **Yes**
4. Click **Continue** → **Apply immediately**
5. Update security group to allow your IP:
   - Add inbound rule: Type=PostgreSQL, Source=**My IP** or **0.0.0.0/0** (less secure)

---

## Next Steps

### Step 1: Update Secrets Manager with RDS Endpoint

```powershell
# Go to Secrets Manager Console
# https://console.aws.amazon.com/secretsmanager/home?region=us-east-1

# Find your database credentials secret (e.g., 'my-app/db-credentials' or similar)
# Click on it → "Retrieve secret value" → "Edit"
# Update JSON with:
```

```json
{
  "host": "your-instance-name.xxxxxxxxxx.region.rds.amazonaws.com",
  "port": 5432,
  "database": "kash_contact",
  "username": "postgres",
  "password": "YOUR_MASTER_PASSWORD_FROM_CREATION"
}
```

### Step 2: Update Amplify Function with VPC Configuration

Since RDS is private, update `amplify/functions/resource.ts`:

```typescript
export const functions = {
  auth: defineFunction({
    name: 'auth',
    entry: './auth/index.js',
    runtime: 22,
    timeoutSeconds: 30,  // Increased for VPC cold starts
    memoryMB: 512,
    
    // VPC Configuration for private RDS access
    vpc: 'vpc-09a5094b22e709eef',
    vpcSubnets: [
      'subnet-0776664d0cfde061d',
      'subnet-01be8a792ca58d61a',
      'subnet-0c9a7acf29d110f36',
      'subnet-0bc772da845b664ae',
      'subnet-0b3dbf907234ac3f3',
      'subnet-08cd9157ebf048b76'
    ],
    securityGroups: ['sg-0655ac897b884d2ce'],
    
    environment: {
      DB_SECRET_ARN: 'arn:aws:secretsmanager:REGION:ACCOUNT-ID:secret:secret-name-XXXXX',
      JWT_SECRET: 'JWT_SECRET',  // Update with JWT secret ARN
      SES_FROM_EMAIL: 'SES_FROM_EMAIL',  // Update with verified email
      AWS_REGION: 'us-east-1',
    },
  }),
};
```

### Step 3: Run Deployment Workflow

```powershell
# Wait for RDS status to change from "Backing-up" to "Available" (2-5 minutes)
# Check status in RDS Console

# Then run the deployment wizard
.\scripts\deploy-workflow.ps1
```

The wizard will:
1. ✅ Load RDS connection details from this file
2. ⏳ Prompt for remaining artifacts (JWT secret, SES email)
3. ⏳ Update Amplify configuration with VPC settings
4. ⏳ Deploy Lambda function (with VPC access to RDS)
5. ⏳ Import PostgreSQL schema

---

## Quick Reference Commands

### Check RDS Status
```powershell
aws rds describe-db-instances `
  --db-instance-identifier your-instance-name `
  --query 'DBInstances[0].DBInstanceStatus' `
  --output text `
  --region us-east-1
```

### Test Connection (after making RDS public OR from VPC)
```powershell
# Set environment variables
$env:PGHOST = "kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com"
$env:PGPORT = "5432"
$env:PGDATABASE = "kash_contact"  # or "postgres" if you didn't specify
$env:PGUSER = "postgres"

# Test connection
psql -c "SELECT version();"
```

### Import Schema (after RDS is available)
```powershell
.\scripts\import-schema.ps1
```

---

## Troubleshooting

### "Connection timed out" or "Connection refused"
- RDS is private and you're connecting from outside VPC
- Solution: Make RDS public (for dev) OR use VPC access

### "password authentication failed"
- Wrong password
- Check password in Secrets Manager or RDS creation confirmation

### "database 'kash_contact' does not exist"
- Database wasn't created during RDS setup
- Solution: Connect to `postgres` database and create:
  ```sql
  CREATE DATABASE kash_contact;
  ```

### Lambda can't connect to RDS
- Security group doesn't allow Lambda access
- Solution: Add inbound rule (PostgreSQL from same SG)

---

## Resource Summary

| Resource | Value |
|----------|-------|
| RDS Endpoint | `kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com` |
| Port | `5432` |
| VPC | `vpc-09a5094b22e709eef` |
| Security Group | `sg-0655ac897b884d2ce` |
| Publicly Accessible | **No** (Private) |
| Region | `us-east-1` |
| AZ | `us-east-1a` |

**Status**: Waiting for RDS to finish backup and become "Available"

**Next**: Run `.\scripts\deploy-workflow.ps1` after RDS is available
