# =====================================================
# Kash Contact App - PostgreSQL Schema Import Script
# =====================================================
# This script helps you import the schema.sql file to RDS
# after the instance is created and accessible.
#
# Prerequisites:
# - RDS PostgreSQL instance running and accessible
# - PostgreSQL client (psql) installed
#   Download from: https://www.postgresql.org/download/windows/
# =====================================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Kash Contact - Schema Import Helper" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if psql is available
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue

if (-not $psqlPath) {
    Write-Host "⚠️  PostgreSQL client (psql) not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You have 3 options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install PostgreSQL Client Tools" -ForegroundColor Cyan
    Write-Host "  → Download: https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "  → During install, select only 'Command Line Tools'" -ForegroundColor White
    Write-Host "  → Re-run this script after installation" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use AWS CloudShell (No Installation)" -ForegroundColor Cyan
    Write-Host "  → Open: https://console.aws.amazon.com/cloudshell/" -ForegroundColor White
    Write-Host "  → Upload database/schema.sql (Actions → Upload file)" -ForegroundColor White
    Write-Host "  → Run: psql -h <RDS_ENDPOINT> -U postgres -d kash_contact -f schema.sql" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Use GUI Tool (DBeaver/pgAdmin)" -ForegroundColor Cyan
    Write-Host "  → Download DBeaver: https://dbeaver.io/download/" -ForegroundColor White
    Write-Host "  → Create connection to RDS instance" -ForegroundColor White
    Write-Host "  → Open SQL editor, paste schema.sql content, execute" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Select option (1/2/3) or press Enter to exit"
    
    if ($choice -eq '2') {
        Write-Host ""
        Write-Host "Opening AWS CloudShell in browser..." -ForegroundColor Green
        Start-Process "https://console.aws.amazon.com/cloudshell/"
        Write-Host ""
        Write-Host "Follow these steps in CloudShell:" -ForegroundColor Yellow
        Write-Host "1. Click 'Actions' → 'Upload file'" -ForegroundColor White
        Write-Host "2. Select: database\schema.sql" -ForegroundColor White
        Write-Host "3. Run the import command shown below" -ForegroundColor White
    }
    elseif ($choice -eq '3') {
        Write-Host ""
        Write-Host "Opening DBeaver download page..." -ForegroundColor Green
        Start-Process "https://dbeaver.io/download/"
    }
    
    exit
}

Write-Host "✓ PostgreSQL client found: $($psqlPath.Source)" -ForegroundColor Green
Write-Host ""

# =====================================================
# Get RDS Connection Details
# =====================================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "RDS Connection Details" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

# Check if artifacts file exists
$artifactsPath = ".\scripts\aws-artifacts.json"
if (Test-Path $artifactsPath) {
    Write-Host "Found saved artifacts from collection script." -ForegroundColor Cyan
    $useArtifacts = Read-Host "Load connection details from aws-artifacts.json? (y/n)"
    
    if ($useArtifacts -eq 'y') {
        $artifacts = Get-Content $artifactsPath | ConvertFrom-Json
        $RDS_HOST = $artifacts.rds_endpoint
        $RDS_PORT = $artifacts.rds_port
        $RDS_DB = $artifacts.rds_database
        $RDS_USER = $artifacts.rds_username
        
        Write-Host ""
        Write-Host "Loaded connection details:" -ForegroundColor Green
        Write-Host "  Host: $RDS_HOST" -ForegroundColor White
        Write-Host "  Port: $RDS_PORT" -ForegroundColor White
        Write-Host "  Database: $RDS_DB" -ForegroundColor White
        Write-Host "  User: $RDS_USER" -ForegroundColor White
        Write-Host ""
    } else {
        # Manual entry
        $RDS_HOST = Read-Host "Enter RDS Endpoint (e.g., kash-contact-db.xxxxx.us-east-1.rds.amazonaws.com)"
        $RDS_PORT = Read-Host "Enter Port (default: 5432)"
        $RDS_DB = Read-Host "Enter Database Name (e.g., kash_contact)"
        $RDS_USER = Read-Host "Enter Username (e.g., postgres)"
    }
} else {
    Write-Host "Enter RDS connection details:" -ForegroundColor Yellow
    Write-Host ""
    $RDS_HOST = Read-Host "RDS Endpoint (e.g., kash-contact-db.xxxxx.us-east-1.rds.amazonaws.com)"
    $RDS_PORT = Read-Host "Port (default: 5432)"
    $RDS_DB = Read-Host "Database Name (e.g., kash_contact)"
    $RDS_USER = Read-Host "Username (e.g., postgres)"
}

# Set defaults if empty
if (-not $RDS_PORT) { $RDS_PORT = "5432" }

# =====================================================
# Verify Schema File
# =====================================================

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Schema File Verification" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

$schemaPath = ".\database\schema.sql"
if (-not (Test-Path $schemaPath)) {
    Write-Host "❌ Schema file not found: $schemaPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please ensure database/schema.sql exists in your project." -ForegroundColor Yellow
    exit
}

Write-Host "✓ Schema file found: $schemaPath" -ForegroundColor Green

# Get file size and line count
$schemaFile = Get-Item $schemaPath
$lineCount = (Get-Content $schemaPath | Measure-Object -Line).Lines

Write-Host "  Size: $([math]::Round($schemaFile.Length / 1KB, 2)) KB" -ForegroundColor White
Write-Host "  Lines: $lineCount" -ForegroundColor White
Write-Host ""

# =====================================================
# Test Database Connection
# =====================================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Testing Database Connection" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "Testing connection to: $RDS_HOST" -ForegroundColor Yellow
Write-Host ""

# Set environment variables for psql
$env:PGHOST = $RDS_HOST
$env:PGPORT = $RDS_PORT
$env:PGDATABASE = $RDS_DB
$env:PGUSER = $RDS_USER

# Prompt for password
Write-Host "Enter database password:" -ForegroundColor Yellow
$securePassword = Read-Host -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$env:PGPASSWORD = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Connecting to database..." -ForegroundColor Cyan

# Test connection
$testResult = & psql -c "SELECT version();" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Connection failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error:" -ForegroundColor Yellow
    Write-Host $testResult -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Incorrect password" -ForegroundColor White
    Write-Host "2. RDS instance not publicly accessible (check security group)" -ForegroundColor White
    Write-Host "3. RDS instance not in 'available' state" -ForegroundColor White
    Write-Host "4. Network/firewall blocking port 5432" -ForegroundColor White
    Write-Host ""
    
    Remove-Variable env:PGPASSWORD -ErrorAction SilentlyContinue
    exit
}

Write-Host "✓ Connection successful!" -ForegroundColor Green
Write-Host ""

# =====================================================
# Check Existing Schema
# =====================================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Checking Existing Schema" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

# Check if tables already exist
$tableCheck = & psql -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" 2>&1

if ($LASTEXITCODE -eq 0) {
    $tableCount = [int]$tableCheck.Trim()
    
    if ($tableCount -gt 0) {
        Write-Host "⚠️  Warning: Database already contains $tableCount table(s)" -ForegroundColor Yellow
        Write-Host ""
        
        # List existing tables
        Write-Host "Existing tables:" -ForegroundColor Cyan
        & psql -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;"
        Write-Host ""
        
        Write-Host "Options:" -ForegroundColor Yellow
        Write-Host "1. Drop all existing tables and import fresh (DESTRUCTIVE)" -ForegroundColor Red
        Write-Host "2. Continue with import (may cause conflicts if tables exist)" -ForegroundColor Yellow
        Write-Host "3. Cancel import" -ForegroundColor White
        Write-Host ""
        
        $importChoice = Read-Host "Select option (1/2/3)"
        
        if ($importChoice -eq '1') {
            Write-Host ""
            Write-Host "⚠️  This will DROP ALL TABLES in the database!" -ForegroundColor Red
            $confirm = Read-Host "Type 'yes' to confirm"
            
            if ($confirm -eq 'yes') {
                Write-Host ""
                Write-Host "Dropping all tables..." -ForegroundColor Yellow
                
                # Drop all tables, views, functions, etc.
                & psql -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✓ All tables dropped successfully" -ForegroundColor Green
                } else {
                    Write-Host "❌ Failed to drop tables" -ForegroundColor Red
                    Remove-Variable env:PGPASSWORD -ErrorAction SilentlyContinue
                    exit
                }
            } else {
                Write-Host "Import cancelled." -ForegroundColor Yellow
                Remove-Variable env:PGPASSWORD -ErrorAction SilentlyContinue
                exit
            }
        }
        elseif ($importChoice -eq '3') {
            Write-Host "Import cancelled." -ForegroundColor Yellow
            Remove-Variable env:PGPASSWORD -ErrorAction SilentlyContinue
            exit
        }
    } else {
        Write-Host "✓ Database is empty, ready for import" -ForegroundColor Green
    }
}

# =====================================================
# Import Schema
# =====================================================

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Importing Schema" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "Starting schema import from: $schemaPath" -ForegroundColor Yellow
Write-Host ""

# Run import
$importResult = & psql -f $schemaPath 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Import failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error output:" -ForegroundColor Yellow
    Write-Host $importResult -ForegroundColor Red
    Write-Host ""
    Remove-Variable env:PGPASSWORD -ErrorAction SilentlyContinue
    exit
}

Write-Host "✓ Schema imported successfully!" -ForegroundColor Green
Write-Host ""

# =====================================================
# Verify Import
# =====================================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Verifying Import" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

# Count tables
$finalTableCount = & psql -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" 2>&1
$finalTableCount = [int]$finalTableCount.Trim()

Write-Host "✓ Total tables created: $finalTableCount" -ForegroundColor Green
Write-Host ""

# List all tables
Write-Host "Created tables:" -ForegroundColor Cyan
& psql -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;"

Write-Host ""

# Verify key tables exist
$keyTables = @('users', 'campaigns', 'services', 'bookings', 'transactions', 'contributions')
Write-Host "Verifying key tables:" -ForegroundColor Cyan

foreach ($table in $keyTables) {
    $exists = & psql -t -c "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '$table');" 2>&1
    if ($exists.Trim() -eq 't') {
        Write-Host "  ✓ $table" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $table (missing)" -ForegroundColor Red
    }
}

Write-Host ""

# Count rows in users table
$userCount = & psql -t -c "SELECT COUNT(*) FROM users;" 2>&1
if ($LASTEXITCODE -eq 0) {
    $userCount = [int]$userCount.Trim()
    Write-Host "✓ Users table contains $userCount row(s)" -ForegroundColor Green
}

# =====================================================
# Cleanup & Summary
# =====================================================

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "📋 Import Summary" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Schema successfully imported to RDS" -ForegroundColor Green
Write-Host "   Database: $RDS_DB @ $RDS_HOST" -ForegroundColor White
Write-Host "   Tables: $finalTableCount" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Deploy Amplify backend: npx @aws-amplify/cli@latest push" -ForegroundColor White
Write-Host "2. Test auth endpoints (register, verify, login)" -ForegroundColor White
Write-Host "3. Integrate frontend with API" -ForegroundColor White
Write-Host ""
Write-Host "Connection string for reference:" -ForegroundColor Cyan
Write-Host "  postgresql://$RDS_USER:***@$RDS_HOST`:$RDS_PORT/$RDS_DB" -ForegroundColor White
Write-Host ""

# Clear password from environment
Remove-Variable env:PGPASSWORD -ErrorAction SilentlyContinue

Write-Host "================================================" -ForegroundColor Green
Write-Host "  Schema Import Complete! 🎉" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
