# Update Secrets Manager with RDS Connection Details
# RDS Endpoint: kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Update Secrets Manager - DB Credentials" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "RDS Instance Created Successfully!" -ForegroundColor Green
Write-Host "  Endpoint: kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com" -ForegroundColor White
Write-Host "  Port: 5432" -ForegroundColor White
Write-Host "  Status: Backing-up (will be Available soon)" -ForegroundColor Yellow
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Update Secrets Manager Console" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "Action Required:" -ForegroundColor Yellow
Write-Host "1. Go to Secrets Manager:" -ForegroundColor White
Write-Host "   https://console.aws.amazon.com/secretsmanager/home?region=us-east-1#!/secret?name=my-app/db-credentials-WvyPlW" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Click 'Retrieve secret value' → 'Edit'" -ForegroundColor White
Write-Host ""
Write-Host "3. Replace the JSON with the following:" -ForegroundColor White
Write-Host ""

# Prompt for database details
Write-Host "First, answer these questions about your RDS setup:" -ForegroundColor Yellow
Write-Host ""

$dbName = Read-Host "Database name (press Enter for 'kash_contact' or type the name you used during RDS creation)"
if (-not $dbName) { $dbName = "kash_contact" }

$username = Read-Host "Master username (press Enter for 'postgres' or type the username you set)"
if (-not $username) { $username = "postgres" }

Write-Host ""
Write-Host "Master password (you set this during RDS creation):" -ForegroundColor Yellow
$securePassword = Read-Host -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Copy this JSON to Secrets Manager:" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

$secretJson = @"
{
  "host": "kash-contact-db.cybyiwaasjqv.us-east-1.rds.amazonaws.com",
  "port": 5432,
  "database": "$dbName",
  "username": "$username",
  "password": "$password"
}
"@

Write-Host $secretJson -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Save to file for reference
$secretJson | Out-File ".\scripts\db-secret-update.json" -Encoding UTF8
Write-Host "✓ Saved to: .\scripts\db-secret-update.json" -ForegroundColor Green
Write-Host ""

# Clear password from memory
Remove-Variable password -ErrorAction SilentlyContinue

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Paste the JSON above into Secrets Manager" -ForegroundColor White
Write-Host "2. Click 'Save'" -ForegroundColor White
Write-Host "3. Wait for RDS status to become 'Available' (2-5 minutes)" -ForegroundColor White
Write-Host "4. Update Security Group to allow Lambda access:" -ForegroundColor White
Write-Host "   - Go to: https://console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroups" -ForegroundColor Cyan
Write-Host "   - Select: sg-0655ac897b884d2ce (default)" -ForegroundColor Cyan
Write-Host "   - Edit inbound rules → Add rule:" -ForegroundColor Cyan
Write-Host "     Type: PostgreSQL, Source: sg-0655ac897b884d2ce" -ForegroundColor Cyan
Write-Host "5. Run: .\scripts\deploy-workflow.ps1" -ForegroundColor White
Write-Host ""

$openBrowser = Read-Host "Open Secrets Manager in browser? (y/n)"
if ($openBrowser -eq 'y') {
    Start-Process "https://console.aws.amazon.com/secretsmanager/home?region=us-east-1#!/secret?name=my-app/db-credentials-WvyPlW"
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Ready to Continue Deployment!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
