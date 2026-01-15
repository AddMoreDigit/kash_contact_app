# PowerShell Script to Update API URL Configuration
# Usage: .\update-api-url.ps1 -ApiUrl "https://your-api-id.execute-api.us-east-1.amazonaws.com"

param(
    [Parameter(Mandatory=$true)]
    [string]$ApiUrl
)

Write-Host "🔧 Updating API URL Configuration..." -ForegroundColor Cyan
Write-Host ""

# Validate URL format
if ($ApiUrl -notmatch '^https://[a-z0-9]+\.execute-api\.[a-z0-9-]+\.amazonaws\.com$') {
    Write-Host "⚠️  Warning: URL format doesn't match expected pattern" -ForegroundColor Yellow
    Write-Host "   Expected: https://abc123.execute-api.region.amazonaws.com" -ForegroundColor Yellow
    Write-Host "   Received: $ApiUrl" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "❌ Aborted" -ForegroundColor Red
        exit 1
    }
}

# Update .env.local
Write-Host "📝 Updating .env.local..." -ForegroundColor Yellow
$envContent = @"
# Local development environment variables
# Set this to your deployed API endpoint
VITE_AUTH_API_URL=$ApiUrl
"@
$envContent | Out-File -FilePath ".env.local" -Encoding utf8 -Force
Write-Host "✅ Updated .env.local" -ForegroundColor Green

# Update public/amplify_outputs.json
Write-Host "📝 Updating public/amplify_outputs.json..." -ForegroundColor Yellow
try {
    $jsonPath = "public/amplify_outputs.json"
    $jsonContent = Get-Content $jsonPath -Raw | ConvertFrom-Json
    $jsonContent.http_api_url = $ApiUrl
    $jsonContent | ConvertTo-Json -Depth 100 | Set-Content $jsonPath -Encoding utf8 -Force
    Write-Host "✅ Updated public/amplify_outputs.json" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to update public/amplify_outputs.json: $_" -ForegroundColor Red
    Write-Host "   Please update manually:" -ForegroundColor Yellow
    Write-Host "   Find: `"http_api_url`": `"https://your-api-endpoint.com`"" -ForegroundColor Yellow
    Write-Host "   Replace: `"http_api_url`": `"$ApiUrl`"" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Configuration Updated Successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Restart dev server: npm run dev" -ForegroundColor White
Write-Host "   2. Test signup locally: http://localhost:3000" -ForegroundColor White
Write-Host "   3. Set VITE_AUTH_API_URL in Amplify Console (for production)" -ForegroundColor White
Write-Host "   4. Commit changes: git add . && git commit -m 'Update API URL' && git push" -ForegroundColor White
Write-Host ""
Write-Host "🌐 API URL configured: $ApiUrl" -ForegroundColor Cyan
