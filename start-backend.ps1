Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Omoja Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create a .env file with:" -ForegroundColor Yellow
    Write-Host "  MONGO_URI=your_mongodb_connection_string"
    Write-Host "  JWT_SECRET=your_secret_key"
    Write-Host "  PORT=5000"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[INFO] Starting server..." -ForegroundColor Green
Write-Host "[INFO] Server will run on: http://localhost:5000" -ForegroundColor Green
Write-Host "[INFO] Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the server
npm run dev


