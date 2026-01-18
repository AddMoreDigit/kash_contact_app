# Fix Secrets Manager for Lambda Auth

Your Lambda is 500ing because the secrets aren't in the right JSON format.

## Fix 1: DB Secret (`my-app/db-credentials-WvyPlW`)

**In AWS Console:**
1. Go to **Secrets Manager** → `my-app/db-credentials`
2. Click **Retrieve secret value**
3. Replace the content with this JSON (use your actual password):

```json
{
  "host": "kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com",
  "port": 5432,
  "username": "postgres",
  "password": "YOUR_ACTUAL_RDS_PASSWORD",
  "dbname": "postgres",
  "ssl": true
}
```

4. Click **Save** (or update/retrieve button)

---

## Fix 2: JWT Secret (`my-app/jwt-secret-bxUZ8C`)

**In AWS Console:**
1. Go to **Secrets Manager** → `my-app/jwt-secret`
2. Click **Retrieve secret value**
3. Replace with this JSON (generate a long random string for the value):

```json
{
  "JWT_SECRET": "your-super-secret-jwt-key-min-32-chars-randomly-generated"
}
```

**Example for JWT_SECRET value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIn0SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

4. Click **Save**

---

## After Fixing Secrets

1. Test the endpoint:
```powershell
Invoke-WebRequest -Method Post -Uri "https://ilcaecn3tdpcb3ttuffmsdeoxu0sfhmm.lambda-url.us-east-1.on.aws/auth/register" `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User","userType":"user"}' `
  -UseBasicParsing
```

2. If still 500: check CloudWatch logs for the specific error.

---

## What Each Secret Does

- **DB Secret**: Lambda reads this to connect to RDS (host, user, password, dbname, SSL)
- **JWT Secret**: Lambda reads this to sign login tokens (must be JSON with a `JWT_SECRET` key)

Both MUST be valid JSON or the Lambda crashes on `JSON.parse()`.
