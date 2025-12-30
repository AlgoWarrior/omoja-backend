@echo off
echo ========================================
echo   Starting Omoja Backend Server
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo [ERROR] .env file not found!
    echo.
    echo Please create a .env file with:
    echo   MONGO_URI=your_mongodb_connection_string
    echo   JWT_SECRET=your_secret_key
    echo   PORT=5000
    echo.
    pause
    exit /b 1
)

echo [INFO] Starting server...
echo [INFO] Server will run on: http://localhost:5000
echo [INFO] Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Start the server
npm run dev

pause


