#!/bin/bash
# Start both Backend and Frontend servers for development

echo "========================================"
echo "Starting Hotel Booking App (Development Mode)"
echo "========================================"
echo ""
echo "Backend will run on: http://localhost:3000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "========================================"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Start Backend
cd Backend
npm run dev &
BACKEND_PID=$!
echo "Backend starting (PID: $BACKEND_PID)..."

cd ..

# Wait for backend to start
sleep 3

# Start Frontend
cd FrontEnd
npm run dev &
FRONTEND_PID=$!
echo "Frontend starting (PID: $FRONTEND_PID)..."

echo ""
echo "Both servers are running!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait
