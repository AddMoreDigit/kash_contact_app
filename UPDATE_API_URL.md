# Update API URL - Step-by-Step Guide

## ⚠️ Current Issue
Your AWS credentials are configured with a console URL instead of proper access keys, preventing CLI deployment.

**Error**: `Credential must have exactly 5 slash-delimited elements, got 'https://357229249466.signin.aws.amazon.com/...'`

## ✅ Solution: Get API URL from AWS Console

### Step 1: Find Your API Gateway URL

1. **Open AWS Console** and sign in to account `357229249466`
2. **Navigate to API Gateway**:
   - Go to: https://console.aws.amazon.com/apigateway/main/apis?region=us-east-1
   - Or search for "API Gateway" in the AWS Console search bar

3. **Locate Your HTTP API**:
   - Look for an API with name containing "amplify", "auth", or "kash-contact"
   - Click on the API name

4. **Copy the Invoke URL**:
   - In the API details, click **"Stages"** in the left sidebar
   - Click on the stage (usually `$default` or `prod`)
   - **Copy the "Invoke URL"** shown at the top
   - It will look like: `https://abc123xyz.execute-api.us-east-1.amazonaws.com`

### Step 2: Update Configuration Files

Once you have the Invoke URL, run this PowerShell script:

```powershell
# Replace YOUR_API_URL with the actual invoke URL from Step 1
$API_URL = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com"

# Navigate to project directory
cd "d:\Professional_Work\01_Corporate_Employment\Add_More\Current_Projects\Project_Kash-Contact\GitHub\kash_contact_app"

# Update .env.local
@"
# Local development environment variables
# Set this to your deployed API endpoint
VITE_AUTH_API_URL=$API_URL
"@ | Out-File -FilePath ".env.local" -Encoding utf8

# Update public/amplify_outputs.json (you'll need to edit the JSON manually or use the script below)
Write-Host "✅ Updated .env.local"
Write-Host ""
Write-Host "⚠️ Now manually update public/amplify_outputs.json:"
Write-Host "   Find the line: `"http_api_url`": `"https://your-api-endpoint.com`","
Write-Host "   Replace with: `"http_api_url`": `"$API_URL`","
```

### Step 3: Alternative - Use PowerShell to Update JSON

```powershell
# Replace YOUR_API_URL with actual URL
$API_URL = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com"

# Update public/amplify_outputs.json
$jsonPath = "public/amplify_outputs.json"
$json = Get-Content $jsonPath -Raw | ConvertFrom-Json
$json.http_api_url = $API_URL
$json | ConvertTo-Json -Depth 100 | Set-Content $jsonPath -Encoding utf8

Write-Host "✅ Updated public/amplify_outputs.json"
```

### Step 4: Update Amplify Hosting Environment Variables

1. **Go to Amplify Console**:
   - https://console.aws.amazon.com/amplify/home?region=us-east-1
   - Click on your app

2. **Add Environment Variable**:
   - Click **"Environment variables"** in left sidebar
   - Click **"Manage variables"**
   - Find `VITE_AUTH_API_URL` or add new variable:
     - Variable name: `VITE_AUTH_API_URL`
     - Value: `https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com`
   - Click **"Save"**

3. **Redeploy**:
   - Go to **"Hosting"** → **"All branches"**
   - Click **"Redeploy this version"** on the `Dev` branch
   - Or push a new commit to trigger rebuild

### Step 5: Verify Setup

After updating all files and redeploying:

1. **Local Testing**:
   ```powershell
   npm run dev
   # Visit http://localhost:3000 and try signup
   ```

2. **Check Browser Console**:
   - Should see POST to your real API URL (not localhost:3001)
   - Should NOT see CORS errors
   - Should receive response from backend

3. **Production Testing**:
   - Visit: https://dev.dazcpvwsgm3ze.amplifyapp.com
   - Try signup flow
   - Verify OTP email is sent

## 🔧 Fix AWS Credentials (Optional - for future CLI use)

If you want to use `npx ampx` commands in the future:

### Option 1: Use IAM User Access Keys
```powershell
# Install AWS CLI first
winget install Amazon.AWSCLI

# Configure with real access keys
aws configure
# Enter:
#   AWS Access Key ID: AKIA...
#   AWS Secret Access Key: ...
#   Default region: us-east-1
#   Default output format: json
```

### Option 2: Use AWS SSO
```powershell
aws configure sso
# Follow prompts to set up SSO profile

# Then use with Amplify:
npx ampx sandbox --profile your-sso-profile
```

## 📝 Quick Reference

**Files to Update**:
1. `.env.local` → `VITE_AUTH_API_URL=https://...`
2. `public/amplify_outputs.json` → `"http_api_url": "https://..."`
3. Amplify Console → Environment Variables → `VITE_AUTH_API_URL`

**Endpoints Your API Should Have**:
- `POST /auth/register`
- `POST /auth/verify-email`
- `POST /auth/login`
- `POST /auth/resend-otp`

All with CORS headers enabled ✅
