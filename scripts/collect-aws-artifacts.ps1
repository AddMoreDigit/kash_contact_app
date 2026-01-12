# =====================================================
# Kash Contact App - AWS Artifacts Collection Script
# =====================================================
# This script helps you collect all necessary AWS resources
# for the Amplify Gen 2 deployment (Console-based workflow)
#
# Usage: Run this script and follow the prompts to document
#        all AWS resource ARNs/IDs needed for deployment
# =====================================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Kash Contact App - AWS Artifacts Collector" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Initialize artifact collection
$artifacts = @{}

Write-Host "This script will help you collect all AWS resources needed for deployment." -ForegroundColor Yellow
Write-Host "You'll need to create/verify resources in AWS Console and paste values here." -ForegroundColor Yellow
Write-Host ""

# =====================================================
# Step 1: RDS PostgreSQL Instance
# =====================================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 1: RDS PostgreSQL Instance" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "Action: Go to RDS Console: https://console.aws.amazon.com/rds/" -ForegroundColor White
Write-Host "        → Create database (if not exists) OR select existing instance" -ForegroundColor White
Write-Host ""

$rdsExists = Read-Host "Do you have an RDS PostgreSQL instance? (y/n)"

if ($rdsExists -eq 'n') {
    Write-Host ""
    Write-Host "Please create RDS PostgreSQL instance with these settings:" -ForegroundColor Yellow
    Write-Host "  - Engine: PostgreSQL 15.5 or later" -ForegroundColor White
    Write-Host "  - Instance identifier: kash-contact-db" -ForegroundColor White
    Write-Host "  - Master username: postgres" -ForegroundColor White
    Write-Host "  - Database name: kash_contact" -ForegroundColor White
    Write-Host "  - Instance class: db.t3.micro (or larger)" -ForegroundColor White
    Write-Host "  - Public access: Yes (for easier setup)" -ForegroundColor White
    Write-Host ""
    Write-Host "Press Enter when RDS instance is created and available..." -ForegroundColor Yellow
    Read-Host
}

Write-Host ""
$artifacts['rds_endpoint'] = Read-Host "Enter RDS Endpoint (e.g., kash-contact-db.xxxxx.us-east-1.rds.amazonaws.com)"
$artifacts['rds_port'] = Read-Host "Enter Port (default: 5432)"
$artifacts['rds_database'] = Read-Host "Enter Database Name (e.g., kash_contact)"
$artifacts['rds_username'] = Read-Host "Enter Master Username (e.g., postgres)"
$artifacts['rds_password'] = Read-Host "Enter Master Password" -AsSecureString

# =====================================================
# Step 2: Secrets Manager - Database Credentials
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 2: Secrets Manager - Database Credentials" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "You already created: my-app/db-credentials" -ForegroundColor Cyan
Write-Host "ARN: arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-WvyPlW" -ForegroundColor Cyan
Write-Host ""
Write-Host "Action: Update this secret with your RDS connection details" -ForegroundColor Yellow
Write-Host "        → Go to: https://console.aws.amazon.com/secretsmanager/" -ForegroundColor White
Write-Host "        → Select 'my-app/db-credentials-WvyPlW'" -ForegroundColor White
Write-Host "        → Click 'Retrieve secret value' → 'Edit'" -ForegroundColor White
Write-Host ""

# Decrypt password for display
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($artifacts['rds_password'])
$PlainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host "Copy this JSON to Secrets Manager:" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────" -ForegroundColor DarkGray
$dbSecretJson = @"
{
  "host": "$($artifacts['rds_endpoint'])",
  "port": $($artifacts['rds_port']),
  "database": "$($artifacts['rds_database'])",
  "username": "$($artifacts['rds_username'])",
  "password": "$PlainPassword"
}
"@
Write-Host $dbSecretJson -ForegroundColor White
Write-Host "─────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Press Enter when you've updated the secret..." -ForegroundColor Yellow
Read-Host

$artifacts['db_secret_arn'] = "arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/db-credentials-WvyPlW"

# Clear password from memory
Remove-Variable PlainPassword -ErrorAction SilentlyContinue

# =====================================================
# Step 3: Secrets Manager - JWT Secret
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 3: Secrets Manager - JWT Secret" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

# Generate random JWT secret
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})

Write-Host "Action: Create new secret for JWT signing" -ForegroundColor Yellow
Write-Host "        → Go to: https://console.aws.amazon.com/secretsmanager/" -ForegroundColor White
Write-Host "        → Click 'Store a new secret'" -ForegroundColor White
Write-Host "        → Secret type: 'Other type of secret'" -ForegroundColor White
Write-Host ""
Write-Host "Copy this JSON to Secrets Manager:" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────" -ForegroundColor DarkGray
$jwtSecretJson = @"
{
  "JWT_SECRET": "$jwtSecret"
}
"@
Write-Host $jwtSecretJson -ForegroundColor White
Write-Host "─────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Secret name: my-app/jwt-secret" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Enter when secret is created..." -ForegroundColor Yellow
Read-Host

Write-Host ""
$artifacts['jwt_secret_arn'] = Read-Host "Enter JWT Secret ARN (e.g., arn:aws:secretsmanager:us-east-1:357229249466:secret:my-app/jwt-secret-XXXXXX)"

# =====================================================
# Step 4: SES Verified Email
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 4: SES Verified Email Address" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "Action: Verify sender email for OTP emails" -ForegroundColor Yellow
Write-Host "        → Go to: https://console.aws.amazon.com/ses/" -ForegroundColor White
Write-Host "        → Click 'Verified identities' → 'Create identity'" -ForegroundColor White
Write-Host "        → Identity type: Email address" -ForegroundColor White
Write-Host "        → Email: no-reply@yourdomain.com (or your test email)" -ForegroundColor White
Write-Host "        → Check email inbox and click verification link" -ForegroundColor White
Write-Host "        → Wait for status to show 'Verified'" -ForegroundColor White
Write-Host ""
Write-Host "Press Enter when email is verified..." -ForegroundColor Yellow
Read-Host

Write-Host ""
$artifacts['ses_from_email'] = Read-Host "Enter verified email address (e.g., no-reply@yourdomain.com)"

# =====================================================
# Step 5: VPC Configuration (Optional)
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 5: VPC Configuration (Optional)" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "Is your RDS instance in a private VPC (not publicly accessible)?" -ForegroundColor Yellow
$isPrivateRDS = Read-Host "(y/n)"

if ($isPrivateRDS -eq 'y') {
    Write-Host ""
    Write-Host "Action: Get VPC details from RDS instance" -ForegroundColor Yellow
    Write-Host "        → Go to: https://console.aws.amazon.com/rds/" -ForegroundColor White
    Write-Host "        → Select your DB instance → 'Connectivity & security' tab" -ForegroundColor White
    Write-Host ""
    
    $artifacts['vpc_id'] = Read-Host "Enter VPC ID (e.g., vpc-xxxxxxxx)"
    
    Write-Host ""
    Write-Host "Enter at least 2 Subnet IDs (comma-separated):" -ForegroundColor Yellow
    $subnetInput = Read-Host "(e.g., subnet-xxxxx,subnet-yyyyy)"
    $artifacts['subnet_ids'] = $subnetInput -split ','
    
    Write-Host ""
    $artifacts['security_group_id'] = Read-Host "Enter Security Group ID (e.g., sg-xxxxxxxx)"
    
    Write-Host ""
    Write-Host "⚠️  Important: Ensure Lambda security group can access RDS on port 5432" -ForegroundColor Red
} else {
    Write-Host ""
    Write-Host "✓ Skipping VPC configuration (public RDS)" -ForegroundColor Green
    $artifacts['vpc_id'] = $null
}

# =====================================================
# Step 6: Summary & Output
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "📋 COLLECTED ARTIFACTS SUMMARY" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "✅ RDS PostgreSQL:" -ForegroundColor Cyan
Write-Host "   Endpoint: $($artifacts['rds_endpoint'])" -ForegroundColor White
Write-Host "   Database: $($artifacts['rds_database'])" -ForegroundColor White
Write-Host ""

Write-Host "✅ Secrets Manager:" -ForegroundColor Cyan
Write-Host "   DB Credentials ARN: $($artifacts['db_secret_arn'])" -ForegroundColor White
Write-Host "   JWT Secret ARN: $($artifacts['jwt_secret_arn'])" -ForegroundColor White
Write-Host ""

Write-Host "✅ SES:" -ForegroundColor Cyan
Write-Host "   From Email: $($artifacts['ses_from_email'])" -ForegroundColor White
Write-Host ""

if ($artifacts['vpc_id']) {
    Write-Host "✅ VPC Configuration:" -ForegroundColor Cyan
    Write-Host "   VPC ID: $($artifacts['vpc_id'])" -ForegroundColor White
    Write-Host "   Subnets: $($artifacts['subnet_ids'] -join ', ')" -ForegroundColor White
    Write-Host "   Security Group: $($artifacts['security_group_id'])" -ForegroundColor White
    Write-Host ""
}

# Save to JSON file
$outputPath = ".\scripts\aws-artifacts.json"
$artifacts | ConvertTo-Json -Depth 10 | Out-File $outputPath -Encoding UTF8

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Artifacts saved to: $outputPath" -ForegroundColor Green
Write-Host ""

# =====================================================
# Step 7: Generate Update Commands
# =====================================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "🔧 NEXT STEPS" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "I will now update your amplify/functions/resource.ts with these values." -ForegroundColor Yellow
Write-Host ""

$proceed = Read-Host "Proceed with automatic update? (y/n)"

if ($proceed -eq 'y') {
    Write-Host ""
    Write-Host "✓ Ready to update amplify/functions/resource.ts" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now tell the agent: 'Update my function resource with the collected artifacts'" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Manual Update Required:" -ForegroundColor Yellow
    Write-Host "Edit amplify/functions/resource.ts and replace:" -ForegroundColor White
    Write-Host ""
    Write-Host "  DB_SECRET_ARN: '$($artifacts['db_secret_arn'])'" -ForegroundColor Cyan
    Write-Host "  JWT_SECRET: '$($artifacts['jwt_secret_arn'])'" -ForegroundColor Cyan
    Write-Host "  SES_FROM_EMAIL: '$($artifacts['ses_from_email'])'" -ForegroundColor Cyan
    Write-Host "  AWS_REGION: 'us-east-1'" -ForegroundColor Cyan
    Write-Host ""
    
    if ($artifacts['vpc_id']) {
        Write-Host "Also add VPC configuration:" -ForegroundColor Yellow
        Write-Host "  vpc: '$($artifacts['vpc_id'])'" -ForegroundColor Cyan
        Write-Host "  vpcSubnets: ['$($artifacts['subnet_ids'] -join "', '")']" -ForegroundColor Cyan
        Write-Host "  securityGroups: ['$($artifacts['security_group_id'])']" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Artifact Collection Complete! 🎉" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
