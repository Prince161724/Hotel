#!/bin/bash
# ============================================
# ONE-COMMAND RUN SCRIPT
# Just run: ./run.sh
# ============================================

echo ""
echo "============================================"
echo "  HOTEL BOOKING APP - ONE COMMAND START"
echo "============================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# ============================================
# BACKEND SETUP
# ============================================
echo "[1/4] Checking Backend Dependencies..."
cd Backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Backend npm install failed!"
        exit 1
    fi
else
    echo "Backend dependencies already installed ✓"
fi

cd ..

# ============================================
# FRONTEND SETUP
# ============================================
echo "[2/4] Checking Frontend Dependencies..."
cd FrontEnd

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Frontend npm install failed!"
        exit 1
    fi
else
    echo "Frontend dependencies already installed ✓"
fi

cd ..

# ============================================
# START SERVERS
# ============================================

# Cleanup function
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

echo ""
echo "[3/4] Starting Backend Server..."
echo "Backend URL: http://localhost:3000"
cd Backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo ""
echo "[4/4] Starting Frontend Server..."
echo "Frontend URL: http://localhost:5173"
sleep 3
cd FrontEnd
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "============================================"
echo "✅ BOTH SERVERS ARE RUNNING!"
echo "============================================"
echo ""
echo "Backend:  http://localhost:3000 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""
echo "🌐 Open in browser: http://localhost:5173"
echo ""
echo "Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for processes
wait
