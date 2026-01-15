# Script to Find API Gateway URL from AWS Console
# Since AWS CLI credentials are misconfigured, you'll need to get this manually

Write-Host "🔍 Looking for API Gateway URL..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Your AWS Account: 357229249466" -ForegroundColor Yellow
Write-Host "Region: us-east-1" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Manual Steps to Get API URL:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Open AWS Console and sign in" -ForegroundColor White
Write-Host "    https://357229249466.signin.aws.amazon.com/console" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Navigate to API Gateway" -ForegroundColor White
Write-Host "    https://console.aws.amazon.com/apigateway/main/apis?region=us-east-1" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Look for HTTP API with one of these patterns:" -ForegroundColor White
Write-Host "    - Name contains 'amplify'" -ForegroundColor Gray
Write-Host "    - Name contains 'auth'" -ForegroundColor Gray
Write-Host "    - Name contains 'kash' or 'contact'" -ForegroundColor Gray
Write-Host "    - Type: HTTP API (not REST API)" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Click on the API name, then:" -ForegroundColor White
Write-Host "    - Click 'Stages' in left sidebar" -ForegroundColor Gray
Write-Host "    - Click on the stage name (usually `$default or prod)" -ForegroundColor Gray
Write-Host "    - Copy the 'Invoke URL' from the top" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  The URL should look like:" -ForegroundColor White
Write-Host "    https://abc123xyz.execute-api.us-east-1.amazonaws.com" -ForegroundColor Green
Write-Host ""
Write-Host "6️⃣  Once you have the URL, run:" -ForegroundColor White
Write-Host "    .\update-api-url.ps1 -ApiUrl 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com'" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""
Write-Host "💡 Tip: If you cannot find the API Gateway:" -ForegroundColor Yellow
Write-Host "   Your backend may not be deployed yet. You will need to:" -ForegroundColor Yellow
Write-Host "   1. Fix AWS credentials" -ForegroundColor Yellow
Write-Host "   2. Run: npx ampx sandbox --once" -ForegroundColor Yellow
Write-Host "   3. This will create the API and output the invoke URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 To fix AWS credentials:" -ForegroundColor Yellow
Write-Host "   - Install AWS CLI: winget install Amazon.AWSCLI" -ForegroundColor Gray
Write-Host "   - Configure: aws configure" -ForegroundColor Gray
Write-Host "   - Or use SSO: aws configure sso" -ForegroundColor Gray
