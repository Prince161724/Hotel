#!/bin/bash
# Render build script for combined frontend + backend deployment

echo "Installing backend dependencies..."
npm install

echo "Building frontend..."
cd ../FrontEnd
npm install
npm run build

echo "Copying frontend build to backend public folder..."
cp -r dist ../Backend/public

echo "Build complete!"
