@echo off
REM Quick Setup Script for Hotel Booking App (Windows)
REM This script helps you set up the project quickly

echo ========================================
echo Hotel Booking App - Quick Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed: 
node --version
echo.

REM Setup Backend
echo ========================================
echo Setting up BACKEND...
echo ========================================
cd Backend

if not exist .env (
    echo Creating .env file from example...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit Backend/.env with your actual values!
    echo Press any key to continue after editing...
    pause >nul
)

echo Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies!
    pause
    exit /b 1
)
echo Backend setup complete!
echo.

cd ..

REM Setup Frontend
echo ========================================
echo Setting up FRONTEND...
echo ========================================
cd FrontEnd

if not exist .env (
    echo Creating .env file from example...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit FrontEnd/.env with your actual values!
    echo Press any key to continue after editing...
    pause >nul
)

echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies!
    pause
    exit /b 1
)
echo Frontend setup complete!
echo.

cd ..

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Edit Backend/.env with your credentials
echo 3. Edit FrontEnd/.env with your settings
echo 4. Run start-dev.bat to start both servers
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo.
pause
