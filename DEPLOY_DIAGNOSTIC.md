# Lambda Deployment & Diagnostic Instructions

## Current Status
- Manual Lambda function: `kash-contact-auth-api` 
- Current issue: 502/500 errors when calling `/auth/register`
- Likely cause: Database connection or Secrets Manager access failure

## Step 1: Deploy Diagnostic Handler

**Goal:** Find out EXACTLY what's failing (DB connection, Secrets Manager, etc.)

1. Go to AWS Lambda Console
   - https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/kash-contact-auth-api

2. Click **Code** tab

3. Click **Upload from** → **.zip file**

4. Select this file:
   ```
   D:\Professional_Work\01_Corporate_Employment\Add_More\Current_Projects\Project_Kash-Contact\GitHub\kash_contact_app\amplify\functions\diagnostic.zip
   ```

5. Click **Deploy**

6. Wait for "Successfully updated" message

## Step 2: Test Diagnostic Endpoint

Run this in PowerShell:

```powershell
$url = "https://ilcaecn3tdpcb3ttuffmsdeoxu0sfhmm.lambda-url.us-east-1.on.aws/"
Invoke-WebRequest -Method Post -Uri $url -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

**Expected output will show:**
- ✓ Environment variables status (are DB_SECRET_ARN and JWT_SECRET set?)
- ✓ Secrets Manager test (can Lambda access the secret?)
- ✓ Database test (can Lambda connect to RDS?)

## Step 3: Review Results

Share the output from Step 2. It will tell us:

- **If DB_SECRET_ARN is missing** → Need to set in Lambda environment
- **If Secrets Manager fails** → IAM permissions issue
- **If Database fails** → VPC/Network connectivity issue
- **If all pass** → Code error in auth handler

## Step 4: Deploy Correct Handler

Once we know the issue, we'll:
1. Fix the root cause
2. Deploy the full `index.js` handler
3. Test registration flow

---

**Questions to check NOW:**

1. In AWS Lambda Console → kash-contact-auth-api → Configuration → Environment variables
   - Is `DB_SECRET_ARN` set?
   - Is `JWT_SECRET` set?
   - Are the values correct?

2. In AWS Lambda Console → kash-contact-auth-api → Configuration → VPC
   - Is VPC configured?
   - Are subnets selected?
   - Is security group correct?

Let me know what you find!
