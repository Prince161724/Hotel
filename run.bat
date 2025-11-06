@echo off
REM ============================================
REM ONE-COMMAND RUN SCRIPT
REM Just run: run.bat
REM ============================================

echo.
echo ============================================
echo   HOTEL BOOKING APP - ONE COMMAND START
echo ============================================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM ============================================
REM BACKEND SETUP
REM ============================================
echo [1/4] Checking Backend Dependencies...
cd Backend

if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Backend npm install failed!
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed ✓
)

cd ..

REM ============================================
REM FRONTEND SETUP
REM ============================================
echo [2/4] Checking Frontend Dependencies...
cd FrontEnd

if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Frontend npm install failed!
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed ✓
)

cd ..

REM ============================================
REM START SERVERS
REM ============================================
echo.
echo [3/4] Starting Backend Server...
echo Backend URL: http://localhost:3000
start "🔴 BACKEND SERVER" cmd /k "cd Backend && npm run dev"

echo.
echo [4/4] Starting Frontend Server...
echo Frontend URL: http://localhost:5173
timeout /t 3 /nobreak >nul
start "🟢 FRONTEND SERVER" cmd /k "cd FrontEnd && npm run dev"

echo.
echo ============================================
echo ✅ BOTH SERVERS ARE STARTING!
echo ============================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Check the new terminal windows for status
echo.
echo 🌐 Open in browser: http://localhost:5173
echo.
echo Press any key to exit this window...
echo (Backend and Frontend will continue running)
pause >nul
