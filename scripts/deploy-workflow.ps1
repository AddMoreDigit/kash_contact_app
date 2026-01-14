# =====================================================
# Kash Contact App - Complete Deployment Workflow
# =====================================================
# Master script to orchestrate the entire deployment
# =====================================================

Write-Host ""
Write-Host "███████████████████████████████████████████████" -ForegroundColor Cyan
Write-Host "█                                             █" -ForegroundColor Cyan
Write-Host "█   KASH CONTACT APP - DEPLOYMENT WIZARD     █" -ForegroundColor Cyan
Write-Host "█   Amplify Gen 2 + PostgreSQL RDS           █" -ForegroundColor Cyan
Write-Host "█                                             █" -ForegroundColor Cyan
Write-Host "███████████████████████████████████████████████" -ForegroundColor Cyan
Write-Host ""

Write-Host "This wizard will guide you through:" -ForegroundColor Yellow
Write-Host "  1. Collecting AWS resource ARNs and IDs" -ForegroundColor White
Write-Host "  2. Updating Amplify function configuration" -ForegroundColor White
Write-Host "  3. Deploying backend via Amplify CLI" -ForegroundColor White
Write-Host "  4. Importing PostgreSQL schema to RDS" -ForegroundColor White
Write-Host "  5. Testing authentication endpoints" -ForegroundColor White
Write-Host ""

$proceed = Read-Host "Ready to begin? (y/n)"
if ($proceed -ne 'y') {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit
}

# =====================================================
# STEP 1: Collect AWS Artifacts
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 1 of 5: Collect AWS Artifacts" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

$artifactsPath = ".\scripts\aws-artifacts.json"

if (Test-Path $artifactsPath) {
    Write-Host "✓ Found existing aws-artifacts.json" -ForegroundColor Green
    $useExisting = Read-Host "Use existing artifacts? (y/n)"
    
    if ($useExisting -ne 'y') {
        Write-Host ""
        Write-Host "Running artifact collection script..." -ForegroundColor Cyan
        & .\scripts\collect-aws-artifacts.ps1
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Artifact collection failed" -ForegroundColor Red
            exit
        }
    }
} else {
    Write-Host "Running artifact collection script..." -ForegroundColor Cyan
    & .\scripts\collect-aws-artifacts.ps1
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Artifact collection failed" -ForegroundColor Red
        exit
    }
}

# Load artifacts
$artifacts = Get-Content $artifactsPath | ConvertFrom-Json

Write-Host ""
Write-Host "✓ Artifacts loaded successfully" -ForegroundColor Green

# =====================================================
# STEP 2: Update Amplify Function Configuration
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 2 of 5: Update Amplify Configuration" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "Updating amplify/functions/resource.ts with collected values..." -ForegroundColor Cyan
Write-Host ""

# Read current resource file
$resourcePath = ".\amplify\functions\resource.ts"
if (-not (Test-Path $resourcePath)) {
    Write-Host "❌ Resource file not found: $resourcePath" -ForegroundColor Red
    exit
}

$resourceContent = Get-Content $resourcePath -Raw

# Replace environment variables
$resourceContent = $resourceContent -replace "DB_SECRET_ARN: '[^']*'", "DB_SECRET_ARN: '$($artifacts.db_secret_arn)'"
$resourceContent = $resourceContent -replace "JWT_SECRET: '[^']*'", "JWT_SECRET: '$($artifacts.jwt_secret_arn)'"
$resourceContent = $resourceContent -replace "SES_FROM_EMAIL: '[^']*'", "SES_FROM_EMAIL: '$($artifacts.ses_from_email)'"
$resourceContent = $resourceContent -replace "AWS_REGION: '[^']*'", "AWS_REGION: 'us-east-1'"

# Add VPC configuration if needed
if ($artifacts.vpc_id) {
    Write-Host "Adding VPC configuration..." -ForegroundColor Yellow
    
    # Check if VPC config already exists
    if ($resourceContent -notmatch "vpc:") {
        # Add VPC config before the closing brace of defineFunction
        $vpcConfig = @"
    // VPC Configuration for private RDS access
    vpc: '$($artifacts.vpc_id)',
    vpcSubnets: [$($artifacts.subnet_ids | ForEach-Object { "'$_'" } | Join-String -Separator ', ')],
    securityGroups: ['$($artifacts.security_group_id)'],
"@
        
        # Insert before environment section
        $resourceContent = $resourceContent -replace "(environment: \{)", "$vpcConfig`n`n    `$1"
    }
}

# Save updated file
$resourceContent | Out-File $resourcePath -Encoding UTF8 -NoNewline

Write-Host "✓ Configuration updated successfully" -ForegroundColor Green
Write-Host ""
Write-Host "Updated values:" -ForegroundColor Cyan
Write-Host "  DB_SECRET_ARN: $($artifacts.db_secret_arn)" -ForegroundColor White
Write-Host "  JWT_SECRET: $($artifacts.jwt_secret_arn)" -ForegroundColor White
Write-Host "  SES_FROM_EMAIL: $($artifacts.ses_from_email)" -ForegroundColor White
Write-Host "  AWS_REGION: us-east-1" -ForegroundColor White

if ($artifacts.vpc_id) {
    Write-Host "  VPC: $($artifacts.vpc_id)" -ForegroundColor White
    Write-Host "  Subnets: $($artifacts.subnet_ids -join ', ')" -ForegroundColor White
    Write-Host "  Security Group: $($artifacts.security_group_id)" -ForegroundColor White
}

# =====================================================
# STEP 3: Deploy Backend with Amplify CLI
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 3 of 5: Deploy Backend" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "This will deploy:" -ForegroundColor Yellow
Write-Host "  - Lambda function (auth)" -ForegroundColor White
Write-Host "  - API Gateway HTTP API" -ForegroundColor White
Write-Host "  - IAM roles and policies" -ForegroundColor White
Write-Host "  - Amplify outputs configuration" -ForegroundColor White
Write-Host ""
Write-Host "⏱️  Estimated time: 3-5 minutes" -ForegroundColor Cyan
Write-Host ""

$deploy = Read-Host "Deploy now? (y/n)"

if ($deploy -eq 'y') {
    Write-Host ""
    Write-Host "Running: npx @aws-amplify/cli@latest push" -ForegroundColor Cyan
    Write-Host ""
    
    # Run Amplify CLI push
    npx "@aws-amplify/cli@latest" push
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "❌ Deployment failed" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common issues:" -ForegroundColor Yellow
        Write-Host "1. AWS credentials not configured → Run: npx @aws-amplify/cli@latest configure" -ForegroundColor White
        Write-Host "2. Insufficient IAM permissions" -ForegroundColor White
        Write-Host "3. Network/connectivity issues" -ForegroundColor White
        Write-Host ""
        exit
    }
    
    Write-Host ""
    Write-Host "✓ Backend deployed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⏭️  Skipping deployment (you can run 'npx @aws-amplify/cli@latest push' later)" -ForegroundColor Yellow
}

# =====================================================
# STEP 4: Import PostgreSQL Schema
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 4 of 5: Import Database Schema" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

$importSchema = Read-Host "Import schema.sql to RDS now? (y/n)"

if ($importSchema -eq 'y') {
    Write-Host ""
    & .\scripts\import-schema.ps1
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Schema import failed or skipped" -ForegroundColor Red
        Write-Host "You can run it later: .\scripts\import-schema.ps1" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "⏭️  Skipping schema import (you can run .\scripts\import-schema.ps1 later)" -ForegroundColor Yellow
}

# =====================================================
# STEP 5: Test Endpoints
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "STEP 5 of 5: Test Authentication Endpoints" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

# Get API endpoint from amplify_outputs.json
$outputsPath = ".\amplify_outputs.json"
if (Test-Path $outputsPath) {
    $outputs = Get-Content $outputsPath | ConvertFrom-Json
    
    # Try to extract API endpoint (structure may vary)
    $apiUrl = $null
    if ($outputs.custom -and $outputs.custom.api) {
        $apiUrl = $outputs.custom.api.url -or $outputs.custom.api.endpoint
    }
    
    if ($apiUrl) {
        Write-Host "✓ API Endpoint: $apiUrl" -ForegroundColor Green
        Write-Host ""
        
        $testEndpoints = Read-Host "Test endpoints now? (y/n)"
        
        if ($testEndpoints -eq 'y') {
            Write-Host ""
            Write-Host "━━━ Test 1: Registration ━━━" -ForegroundColor Cyan
            Write-Host ""
            
            $testEmail = Read-Host "Enter test email (e.g., test@example.com)"
            $testPassword = Read-Host "Enter test password (min 8 chars with uppercase, lowercase, number)"
            
            $registerBody = @{
                email = $testEmail
                password = $testPassword
                firstName = "Test"
                lastName = "User"
                userType = "user"
            } | ConvertTo-Json
            
            Write-Host ""
            Write-Host "Sending registration request..." -ForegroundColor Cyan
            
            try {
                $registerResponse = Invoke-RestMethod -Uri "$apiUrl/auth/register" `
                    -Method POST `
                    -ContentType "application/json" `
                    -Body $registerBody
                
                Write-Host "✓ Registration successful!" -ForegroundColor Green
                Write-Host "Response:" -ForegroundColor Cyan
                $registerResponse | ConvertTo-Json -Depth 5
                
                Write-Host ""
                Write-Host "📧 Check email $testEmail for OTP code" -ForegroundColor Yellow
                Write-Host ""
                
                $otp = Read-Host "Enter OTP code from email (or press Enter to skip verification test)"
                
                if ($otp) {
                    Write-Host ""
                    Write-Host "━━━ Test 2: Email Verification ━━━" -ForegroundColor Cyan
                    Write-Host ""
                    
                    $verifyBody = @{
                        email = $testEmail
                        otp = $otp
                    } | ConvertTo-Json
                    
                    Write-Host "Sending verification request..." -ForegroundColor Cyan
                    
                    try {
                        $verifyResponse = Invoke-RestMethod -Uri "$apiUrl/auth/verify-email" `
                            -Method POST `
                            -ContentType "application/json" `
                            -Body $verifyBody
                        
                        Write-Host "✓ Email verified successfully!" -ForegroundColor Green
                        Write-Host "Response:" -ForegroundColor Cyan
                        $verifyResponse | ConvertTo-Json -Depth 5
                        
                        Write-Host ""
                        Write-Host "━━━ Test 3: Login ━━━" -ForegroundColor Cyan
                        Write-Host ""
                        
                        $loginBody = @{
                            email = $testEmail
                            password = $testPassword
                        } | ConvertTo-Json
                        
                        Write-Host "Sending login request..." -ForegroundColor Cyan
                        
                        try {
                            $loginResponse = Invoke-RestMethod -Uri "$apiUrl/auth/login" `
                                -Method POST `
                                -ContentType "application/json" `
                                -Body $loginBody
                            
                            Write-Host "✓ Login successful!" -ForegroundColor Green
                            Write-Host "Response:" -ForegroundColor Cyan
                            $loginResponse | ConvertTo-Json -Depth 5
                            
                            Write-Host ""
                            Write-Host "🎉 All authentication tests passed!" -ForegroundColor Green
                            Write-Host ""
                            Write-Host "JWT Token (save for authenticated requests):" -ForegroundColor Yellow
                            Write-Host $loginResponse.token -ForegroundColor White
                            
                        } catch {
                            Write-Host "❌ Login failed" -ForegroundColor Red
                            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
                        }
                        
                    } catch {
                        Write-Host "❌ Verification failed" -ForegroundColor Red
                        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
                    }
                }
                
            } catch {
                Write-Host "❌ Registration failed" -ForegroundColor Red
                Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
                Write-Host ""
                Write-Host "Check Lambda logs:" -ForegroundColor Yellow
                Write-Host "aws logs tail /aws/lambda/auth --follow --region us-east-1" -ForegroundColor White
            }
        }
    } else {
        Write-Host "⚠️  Could not find API endpoint in amplify_outputs.json" -ForegroundColor Yellow
        Write-Host "Check API Gateway console for endpoint URL" -ForegroundColor White
    }
} else {
    Write-Host "⚠️  amplify_outputs.json not found (backend not deployed yet)" -ForegroundColor Yellow
}

# =====================================================
# Final Summary
# =====================================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "🎉 DEPLOYMENT COMPLETE" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

Write-Host "✅ Summary:" -ForegroundColor Cyan
Write-Host "  1. AWS artifacts collected and saved" -ForegroundColor White
Write-Host "  2. Amplify function configuration updated" -ForegroundColor White
if ($deploy -eq 'y') {
    Write-Host "  3. Backend deployed to AWS" -ForegroundColor White
} else {
    Write-Host "  3. Backend ready to deploy (run: npx @aws-amplify/cli@latest push)" -ForegroundColor Yellow
}
if ($importSchema -eq 'y') {
    Write-Host "  4. Database schema imported" -ForegroundColor White
} else {
    Write-Host "  4. Database schema ready to import (run: .\scripts\import-schema.ps1)" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Frontend Integration:" -ForegroundColor White
Write-Host "     - Use amplify_outputs.json to configure AWS Amplify" -ForegroundColor White
Write-Host "     - Add auth UI components (register, login, verify)" -ForegroundColor White
Write-Host "     - Store JWT token for authenticated requests" -ForegroundColor White
Write-Host ""
Write-Host "  2. Additional Backend APIs:" -ForegroundColor White
Write-Host "     - Campaign management (CRUD)" -ForegroundColor White
Write-Host "     - Service/booking endpoints" -ForegroundColor White
Write-Host "     - Transaction processing" -ForegroundColor White
Write-Host ""
Write-Host "  3. Documentation:" -ForegroundColor White
Write-Host "     - See DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor White
Write-Host "     - API documentation and testing examples" -ForegroundColor White
Write-Host ""

Write-Host "📁 Generated Files:" -ForegroundColor Cyan
Write-Host "  - scripts/aws-artifacts.json (AWS resource references)" -ForegroundColor White
Write-Host "  - amplify_outputs.json (Frontend configuration)" -ForegroundColor White
Write-Host "  - amplify/functions/resource.ts (Updated with real values)" -ForegroundColor White
Write-Host ""

Write-Host "🔗 Useful Resources:" -ForegroundColor Cyan
Write-Host "  - Amplify Gen 2 Docs: https://docs.amplify.aws/react/build-a-backend/" -ForegroundColor White
Write-Host "  - AWS Console: https://console.aws.amazon.com/" -ForegroundColor White
Write-Host "  - CloudWatch Logs: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups" -ForegroundColor White
Write-Host ""

Write-Host "███████████████████████████████████████████████" -ForegroundColor Green
Write-Host "█         THANK YOU FOR USING THE WIZARD!     █" -ForegroundColor Green
Write-Host "███████████████████████████████████████████████" -ForegroundColor Green
Write-Host ""
