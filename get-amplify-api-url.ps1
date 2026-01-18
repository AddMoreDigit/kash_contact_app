# Get Amplify API URL from amplify_outputs.json after deployment
Write-Host "`n=== Checking for Amplify API URL ===" -ForegroundColor Cyan

$outputFile = ".\amplify_outputs.json"
if (Test-Path $outputFile) {
    $outputs = Get-Content $outputFile | ConvertFrom-Json
    
    if ($outputs.custom -and $outputs.custom.httpApiUrl) {
        $apiUrl = $outputs.custom.httpApiUrl
        Write-Host "`nAPI URL found: $apiUrl" -ForegroundColor Green
        Write-Host "`nFull auth endpoint: ${apiUrl}auth/register" -ForegroundColor Yellow
        
        # Update .env.local
        $envFile = ".\.env.local"
        if (Test-Path $envFile) {
            $content = Get-Content $envFile
            $updated = $content -replace 'VITE_AUTH_API_URL=.*', "VITE_AUTH_API_URL=$apiUrl"
            $updated | Set-Content $envFile
            Write-Host "`n✓ Updated .env.local" -ForegroundColor Green
        }
        
        # Update public/amplify_outputs.json
        $publicFile = ".\public\amplify_outputs.json"
        if (Test-Path $publicFile) {
            $publicOutputs = Get-Content $publicFile | ConvertFrom-Json
            $publicOutputs.custom.httpApiUrl = $apiUrl
            $publicOutputs | ConvertTo-Json -Depth 10 | Set-Content $publicFile
            Write-Host "✓ Updated public/amplify_outputs.json" -ForegroundColor Green
        }
        
        Write-Host "`n=== Test Command ===" -ForegroundColor Cyan
        Write-Host '$url = "' -NoNewline; Write-Host "${apiUrl}auth/register" -NoNewline -ForegroundColor Yellow; Write-Host '"'
        Write-Host '$body = @{
  email = "testuser@example.com"
  password = "Test123!@#"
  firstName = "Test"
  lastName = "User"
} | ConvertTo-Json

Invoke-WebRequest -Method Post -Uri $url -Headers @{"Content-Type"="application/json"} -Body $body -UseBasicParsing'
        
    } else {
        Write-Host "`nNo custom.httpApiUrl found in amplify_outputs.json" -ForegroundColor Red
        Write-Host "Deployment may still be in progress..." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n$outputFile not found!" -ForegroundColor Red
    Write-Host "Run this script after Amplify deployment completes." -ForegroundColor Yellow
}
