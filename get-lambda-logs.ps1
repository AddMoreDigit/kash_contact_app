# Get latest CloudWatch logs for kash-contact-auth-api Lambda
$functionName = "kash-contact-auth-api"
$region = "us-east-1"

Write-Host "Fetching latest logs for $functionName..." -ForegroundColor Cyan

# Get log group name
$logGroup = "/aws/lambda/$functionName"

# Get latest log stream
$latestStream = aws logs describe-log-streams `
    --log-group-name $logGroup `
    --region $region `
    --order-by LastEventTime `
    --descending `
    --max-items 1 `
    --query 'logStreams[0].logStreamName' `
    --output text

if ($latestStream) {
    Write-Host "`nLatest log stream: $latestStream`n" -ForegroundColor Yellow
    
    # Get log events from the latest stream
    aws logs get-log-events `
        --log-group-name $logGroup `
        --log-stream-name $latestStream `
        --region $region `
        --limit 50 `
        --query 'events[*].message' `
        --output text
} else {
    Write-Host "No log streams found for $functionName" -ForegroundColor Red
}
