@echo off
REM Start both Backend and Frontend servers for development

echo ========================================
echo Starting Hotel Booking App (Development Mode)
echo ========================================
echo.
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

REM Start Backend in a new window
start "Backend Server" cmd /k "cd Backend && npm run dev"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend in a new window
start "Frontend Server" cmd /k "cd FrontEnd && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo Check the new terminal windows for server status
echo.
pause
