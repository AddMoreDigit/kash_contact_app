# 🎉 RDS Created Successfully - Next Steps

## ✅ What's Done

Your RDS PostgreSQL instance is **created and backing up**:

- **Instance ID**: `kash-contact-db`
- **Endpoint**: `kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com`
- **Port**: `5432`
- **Status**: Backing-up → Will be "Available" in 2-5 minutes
- **Engine**: PostgreSQL (latest version)
- **Region**: us-east-1a
- **Instance Class**: db.t3.micro (Free Tier eligible)

### Network Configuration
- **VPC**: `vpc-09a5094b22e709eef`
- **Security Group**: `sg-0655ac897b884d2ce`
- **Publicly Accessible**: ❌ **NO** (Private - VPC only)
- **Subnets**: 6 subnets across multiple AZs (high availability)

### Amplify Configuration
✅ **Already updated** with VPC settings in `amplify/functions/resource.ts`:
- VPC ID, 6 subnets, and security group configured
- Timeout increased to 30s (for VPC cold starts)
- DB Secret ARN configured

---

## 🧩 Frontend Auth API Configuration

The signup/OTP flow now calls the backend HTTP API (Lambda + RDS + SES) instead of Cognito for registration and email verification. Configure the API base URL in one of these ways:

1) Preferred: Set an environment variable in your environments
- Local dev: create `.env.local` with:
  
   ```bash
   VITE_AUTH_API_URL=https://<your-api-id>.execute-api.us-east-1.amazonaws.com
   ```

- Amplify Hosting (Console): App settings → Environment variables → Add
   - Key: `VITE_AUTH_API_URL`
   - Value: `https://<your-api-id>.execute-api.us-east-1.amazonaws.com`

2) Alternative: Populate `public/amplify_outputs.json`
- Set the top-level `http_api_url` property to your API URL.

Where to find the API URL:
- Amplify Gen2 creates an HTTP API (API Gateway v2). In AWS Console, go to API Gateway → APIs → find the HTTP API created by Amplify (look for routes like `/auth/register`) and copy its Invoke URL.

Once set, the frontend will:
- POST `/auth/register` to create the user in Postgres and send OTP via SES
- POST `/auth/verify-email` to verify OTP and activate the user
- POST `/auth/resend-otp` to resend the OTP

No code changes are required after setting the URL.

---

## 🚨 CRITICAL: 3 Actions Required Before Deployment

### 1️⃣ Update Secrets Manager with RDS Connection Details

**Quick Method**: Run this script
```powershell
.\scripts\update-db-secret.ps1
```

**OR Manual Method**:
1. Go to: https://console.aws.amazon.com/secretsmanager/home?region=us-east-1#!/secret?name=my-app/db-credentials-WvyPlW
2. Click **"Retrieve secret value"** → **"Edit"**
3. Replace JSON with:
   ```json
   {
     "host": "kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com",
     "port": 5432,
     "database": "kash_contact",
     "username": "postgres",
     "password": "YOUR_MASTER_PASSWORD_HERE"
   }
   ```
4. Click **"Save"**

---

### 2️⃣ Configure Security Group to Allow Lambda → RDS

**Why**: Your RDS is private (not publicly accessible). Lambda needs permission to connect.

**Steps**:
1. Go to: https://console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroups
2. Find and select: `sg-0655ac897b884d2ce` (default)
3. Click **"Edit inbound rules"** → **"Add rule"**:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: Custom → Select `sg-0655ac897b884d2ce` (same security group)
   - **Description**: "Allow Lambda to RDS"
4. Click **"Save rules"**

**Why this works**: Lambda will be deployed in the same VPC with the same security group, so it can connect to RDS.

---

### 3️⃣ Wait for RDS Status: Available

Check status here: https://console.aws.amazon.com/rds/home?region=us-east-1#database:id=kash-contact-db

Current status: **Backing-up**  
Expected: **Available** (2-5 minutes)

**When status = "Available"**, proceed to deployment.

---

## 🚀 Ready to Deploy? Follow This Sequence

### Step 1: Update Secrets Manager
```powershell
.\scripts\update-db-secret.ps1
```
✅ Copies RDS connection details to your DB credentials secret

### Step 2: Configure Security Group
Follow instructions above to add PostgreSQL inbound rule

### Step 3: Wait for RDS "Available" Status
Check RDS Console (link above)

### Step 4: Run Full Deployment Wizard
```powershell
.\scripts\deploy-workflow.ps1
```

The wizard will:
1. ✅ Load RDS connection details (already configured)
2. ⏳ Create JWT secret in Secrets Manager
3. ⏳ Verify SES sender email
4. ⏳ Deploy Lambda + API Gateway (with VPC access to RDS)
5. ⏳ Import PostgreSQL schema (22 tables)
6. ⏳ Test authentication endpoints

**⏱️ Total time**: 10-15 minutes

---

## 📋 Deployment Checklist

- [x] RDS PostgreSQL instance created
- [x] VPC configuration added to Amplify function
- [x] DB Secret ARN configured in function environment
- [ ] Secrets Manager updated with RDS endpoint ← **DO THIS**
- [ ] Security group allows Lambda → RDS ← **DO THIS**
- [ ] RDS status = "Available" ← **WAIT 2-5 MIN**
- [ ] JWT secret created in Secrets Manager
- [ ] SES sender email verified
- [ ] Backend deployed via Amplify CLI
- [ ] PostgreSQL schema imported
- [ ] Auth endpoints tested

---

## 🔍 Troubleshooting

### Q: Lambda can't connect to RDS?
**A**: Check security group has inbound rule (PostgreSQL from `sg-0655ac897b884d2ce`)

### Q: RDS status stuck at "Backing-up"?
**A**: Normal for initial creation. Wait 5-10 minutes max.

### Q: Forgot RDS master password?
**A**: Can't retrieve it. Must modify RDS instance to set new password.

### Q: Want to make RDS public for easier testing?
**A**: 
1. RDS Console → Modify `kash-contact-db`
2. Connectivity → Public access: **Yes**
3. Continue → Apply immediately
4. Add security group inbound rule: PostgreSQL from **My IP**
⚠️ Only for dev/testing - remove in production

---

## 📁 Reference Files

- **RDS_CONNECTION_DETAILS.md** - Full RDS configuration reference
- **scripts/update-db-secret.ps1** - Quick secret update script
- **scripts/deploy-workflow.ps1** - Master deployment wizard
- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **QUICK_START.md** - Quick reference commands

---

## 🎯 Current Status Summary

| Item | Status |
|------|--------|
| RDS Instance | ✅ Created (Backing-up) |
| VPC Configuration | ✅ Added to Amplify |
| DB Secret ARN | ✅ Wired to function |
| Secrets Manager Update | ⏳ **Action Required** |
| Security Group Rule | ⏳ **Action Required** |
| RDS Available | ⏳ Waiting (2-5 min) |
| JWT Secret | ⏳ Next step |
| SES Email | ⏳ Next step |
| Backend Deployment | ⏳ Next step |
| Schema Import | ⏳ Next step |

---

## 🏃 Quick Start (TL;DR)

```powershell
# 1. Update secret with RDS connection
.\scripts\update-db-secret.ps1

# 2. Add security group rule (via Console - see above)

# 3. Wait for RDS "Available" status (check Console)

# 4. Run full deployment
.\scripts\deploy-workflow.ps1
```

**That's it!** The wizard handles everything else.

---

**🎊 Great progress! Your RDS is ready - just complete the 3 actions above and you're set to deploy!**
