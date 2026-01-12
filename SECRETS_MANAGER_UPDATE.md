# 🔐 Secrets Manager Update Instructions

## ✅ Your RDS Credentials

From your RDS instance creation, gather these credentials:

- **Endpoint**: Retrieved from RDS Console → Select instance → "Connectivity & security" → Copy endpoint
- **Port**: `5432` (default PostgreSQL port)
- **Database**: `postgres` (default database - we'll create `kash_contact` later)
- **Username**: The master username you created during RDS setup
- **Password**: The master password you created during RDS setup
- **DB Identifier**: The instance name you created

⚠️ **IMPORTANT**: Keep your credentials private! Do not commit them to git.

---

## 📝 STEP-BY-STEP: Update Secrets Manager

### Step 1: Open Secrets Manager

Click this link (or copy to browser):
```
https://console.aws.amazon.com/secretsmanager/home?region=us-east-1#!/secret?name=my-app/db-credentials-WvyPlW
```

### Step 2: Edit the Secret

1. Click **"Retrieve secret value"** button (top right)
2. Click **"Edit"** button (appears after retrieving)

### Step 3: Switch to Plaintext Mode

- At the top of the editor, you'll see two tabs: **"Key/value"** and **"Plaintext"**
- Click the **"Plaintext"** tab

### Step 4: Replace with Correct JSON

1. **DELETE** all existing text in the editor
2. **Prepare the JSON** with YOUR credentials (replace placeholders):

```json
{
  "host": "your-endpoint-from-rds-console.xxxxxxxxxx.region.rds.amazonaws.com",
  "port": 5432,
  "database": "postgres",
  "username": "your-master-username",
  "password": "your-master-password"
}
```

3. **COPY** this JSON and **PASTE** it into the Plaintext editor
4. Click **"Save"** button (bottom right)

### Step 5: Verify

After saving:
- Click **"Retrieve secret value"** again
- Verify all fields match what you entered (endpoint, username, password)

✅ **Done!** Secrets Manager is now configured.

---

## ⚠️ Important Notes

### Why "postgres" database?

When you create an RDS PostgreSQL instance without specifying a database name, AWS automatically creates a default database called `postgres`. 

**What will happen during schema import:**
1. We'll connect to the `postgres` database
2. Create a new database called `kash_contact`
3. Import all 22 tables into `kash_contact`
4. Your app will use `kash_contact` (not `postgres`)

This is the standard PostgreSQL workflow and is perfectly fine!

### Database Creation Options

**Option A: Let the import script create it** (Recommended)
- The `import-schema.ps1` script can create the database automatically
- Just run it and it will handle everything

**Option B: Create manually via psql**
```sql
CREATE DATABASE kash_contact;
```

**Option C: Create via RDS Console**
- Connect to RDS via Query Editor
- Run: `CREATE DATABASE kash_contact;`

I recommend **Option A** - let the script handle it automatically.

---

## 📋 Next Steps After Updating Secret

1. ✅ **Update Secrets Manager** ← **YOU JUST DID THIS!**
2. ⏳ **Add Security Group rule** (Lambda → RDS access)
3. ⏳ **Wait for RDS "Available" status**
4. ⏳ **Run deployment wizard**: `.\scripts\deploy-workflow.ps1`

---

## 🔒 Security Best Practices

### For Development (Current Setup)
✅ Password in Secrets Manager (encrypted at rest)  
✅ Lambda retrieves password at runtime  
✅ Password never in code or environment variables  

### For Production (Future Enhancement)
- [ ] Rotate password every 30-90 days (Secrets Manager can automate this)
- [ ] Use AWS IAM database authentication (no passwords needed)
- [ ] Enable RDS encryption at rest
- [ ] Enable SSL/TLS for database connections
- [ ] Use AWS KMS for encryption keys

---

## 🛠️ Troubleshooting

### "Invalid JSON" error when saving
- Make sure you copied the **exact** JSON (including all `{` `}` and `,`)
- No extra spaces or line breaks
- Must be in **Plaintext** tab, not Key/value

### Can't find the secret
- Region must be **us-east-1**
- Secret name: `my-app/db-credentials-WvyPlW` (exact match)

### Forgot to switch to Plaintext tab
- If you see individual key/value fields, you're in Key/value mode
- Click **"Plaintext"** tab at the top

---

## 📁 Reference Files

The correct JSON is saved in:
```
.\scripts\SECRET_TO_PASTE.json
```

You can open it anytime:
```powershell
Get-Content .\scripts\SECRET_TO_PASTE.json
```

---

**✅ Once you've updated Secrets Manager, proceed to the next step: Add Security Group rule!**

See **NEXT_STEPS.md** for the complete checklist.
