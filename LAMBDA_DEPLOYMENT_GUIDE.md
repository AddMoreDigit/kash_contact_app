# Lambda Function Deployment Guide for Production

## Quick Deploy - Create Lambda Function with Function URL

### Step 1: Create the Lambda Function

1. **Go to Lambda Console:**
   - https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions

2. **Click "Create function"**

3. **Configure Basic Settings:**
   - Choose: **Author from scratch**
   - Function name: `kash-contact-auth-api`
   - Runtime: **Node.js 20.x**
   - Architecture: **x86_64**
   - Click **"Create function"**

### Step 2: Upload the Code

1. **In the Code tab**, you'll see a basic `index.mjs` file

2. **Replace ALL code** with the contents from:
   - File: `amplify/functions/auth/index.js` (in this project)
   - Copy the entire file contents (all 235 lines)

3. **Click "Deploy"** to save the code

### Step 3: Install Dependencies

Since the Lambda needs `pg`, `bcryptjs`, `jsonwebtoken`, and AWS SDK packages:

**Option A: Upload ZIP (Recommended)**
1. On your local machine, run:
   ```powershell
   cd amplify/functions/auth
   npm install
   Compress-Archive -Path index.js,node_modules,package.json -DestinationPath ../../../lambda-deploy.zip -Force
   ```
2. In Lambda console, click **"Upload from"** → **".zip file"**
3. Upload `lambda-deploy.zip` from project root

**Option B: Use Lambda Layer**
1. Create a layer with dependencies (more complex)
2. Attach layer to function

### Step 4: Configure Environment Variables

Click **Configuration** → **Environment variables** → **Edit** → **Add**:

| Key | Value |
|-----|-------|
| `DB_SECRET_ARN` | `arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-WvyPlW` |
| `JWT_SECRET` | `arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-bxUZ8C` |
| `RDS_ENDPOINT` | `kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com` |
| `RDS_PORT` | `5432` |
| `RDS_DATABASE` | `postgres` |
| `REGION` | `us-east-1` |
| `SES_FROM_EMAIL` | `masingita@addmoredigital.co.za` |

**Click "Save"**

### Step 5: Configure VPC (IMPORTANT - for RDS access)

Click **Configuration** → **VPC** → **Edit**:

1. **VPC**: Select `vpc-09a5094b22e709eef` (your VPC)
2. **Subnets**: Select at least 2 private subnets where RDS is accessible
3. **Security groups**: Select `sg-0655ac897b884d2ce` (your security group)
4. **Click "Save"**

### Step 6: Configure IAM Permissions

Click **Configuration** → **Permissions** → Click the **Role name** (opens IAM console)

In IAM console:
1. Click **"Add permissions"** → **"Attach policies"**
2. Search and attach:
   - `AWSLambdaVPCAccessExecutionRole` (for VPC/RDS access)
   - `SecretsManagerReadWrite` (for reading DB credentials and JWT secret)
   - `AmazonSESFullAccess` (for sending OTP emails)
3. **Click "Attach policies"**

### Step 7: Configure Timeout and Memory

Click **Configuration** → **General configuration** → **Edit**:

- **Memory**: 512 MB
- **Timeout**: 30 seconds
- **Click "Save"**

### Step 8: Create Function URL

1. Click **Configuration** → **Function URL** → **"Create function URL"**

2. **Configure:**
   - Auth type: **NONE** (public access - we'll secure later)
   - **Configure cross-origin resource sharing (CORS)**: ✅ Check this
   
3. **CORS settings:**
   - Allow origin: `*`
   - Allow headers: `content-type,authorization,x-amz-date,x-api-key,x-amz-security-token`
   - Allow methods: `POST,OPTIONS,GET`
   - Expose headers: (leave empty)
   - Max age: `300`
   - Allow credentials: ❌ Unchecked

4. **Click "Save"**

5. **COPY THE FUNCTION URL** - it looks like:
   ```
   https://abc123xyz456.lambda-url.us-east-1.on.aws/
   ```

### Step 9: Test the Function

1. **Click the "Test" tab**
2. **Create new test event:**
   - Event name: `test-register`
   - Event JSON:
   ```json
   {
     "requestContext": {
       "http": {
         "method": "POST",
         "path": "/auth/register"
       }
     },
     "body": "{\"email\":\"test@example.com\",\"password\":\"Test123!@#\",\"firstName\":\"Test\",\"lastName\":\"User\",\"userType\":\"user\"}"
   }
   ```
3. **Click "Test"**
4. **Check response** - should see success or error message

### Step 10: Update Frontend Configuration

Once you have the Function URL, provide it to update:
- `.env.local`
- `public/amplify_outputs.json`
- Amplify Console environment variables

---

## Quick Reference

**Your Lambda Function Name:** `kash-contact-auth-api`

**Endpoints (once Function URL is created):**
- `POST {function-url}/auth/register` - Register new user
- `POST {function-url}/auth/verify-email` - Verify OTP
- `POST {function-url}/auth/login` - Login user
- `POST {function-url}/auth/resend-otp` - Resend OTP code

**Required AWS Permissions:**
- Lambda execution in VPC
- Secrets Manager read
- SES send email
- RDS network access (via VPC)

---

## Troubleshooting

**If Lambda can't connect to RDS:**
- Check VPC configuration matches RDS VPC
- Check security group allows Lambda → RDS on port 5432
- Verify subnets have route to RDS

**If Secrets Manager fails:**
- Verify IAM role has SecretsManagerReadWrite policy
- Verify ARNs are correct in environment variables

**If SES fails to send email:**
- Verify `masingita@addmoredigital.co.za` is verified in SES
- Check SES is out of sandbox mode, or recipient is verified
- Verify IAM role has SES send permissions

**If CORS errors occur:**
- Verify Function URL CORS settings match above
- Check frontend is sending `Content-Type: application/json`
- Verify Function URL auth type is NONE
