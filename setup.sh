#!/bin/bash
# Quick Setup Script for Hotel Booking App (Linux/Mac)

echo "========================================"
echo "Hotel Booking App - Quick Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed:"
node --version
echo ""

# Setup Backend
echo "========================================"
echo "Setting up BACKEND..."
echo "========================================"
cd Backend

if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo ""
    echo "IMPORTANT: Please edit Backend/.env with your actual values!"
    echo "Press Enter to continue after editing..."
    read
fi

echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies!"
    exit 1
fi
echo "Backend setup complete!"
echo ""

cd ..

# Setup Frontend
echo "========================================"
echo "Setting up FRONTEND..."
echo "========================================"
cd FrontEnd

if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo ""
    echo "IMPORTANT: Please edit FrontEnd/.env with your actual values!"
    echo "Press Enter to continue after editing..."
    read
fi

echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies!"
    exit 1
fi
echo "Frontend setup complete!"
echo ""

cd ..

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Edit Backend/.env with your credentials"
echo "3. Edit FrontEnd/.env with your settings"
echo "4. Run ./start-dev.sh to start both servers"
echo ""
echo "For detailed instructions, see SETUP_GUIDE.md"
echo ""
