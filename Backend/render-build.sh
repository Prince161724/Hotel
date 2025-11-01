#!/bin/bash
# Render build script for combined frontend + backend deployment
# This runs from Backend/ directory (Render root directory setting)

echo "=== Build started from: $(pwd) ==="

echo "Installing backend dependencies..."
npm install

echo "Building frontend (going up to parent, then into FrontEnd)..."
cd ../FrontEnd
npm install
npm run build

echo "Copying frontend build to backend public folder..."
mkdir -p ../Backend/public
cp -r dist/* ../Backend/public/

echo "=== Verifying public folder contents ==="
ls -la ../Backend/public

echo "✅ Build complete!"
