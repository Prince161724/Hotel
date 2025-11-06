# 🏨 Hotel Booking App - Local Setup Guide

This guide will help you set up and run the project on your localhost.

---

## 📋 Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/Prince161724/Hotel.git
cd Hotel
```

### 2. Backend Setup

#### Step 1: Install Dependencies
```bash
cd Backend
npm install
```

#### Step 2: Create `.env` File
Copy the example file and edit it:
```bash
cp .env.example .env
```

Edit `Backend/.env` with your actual values:
```env
# Database (choose one)
MONGO_URI=mongodb://localhost:27017/hotel              # For local MongoDB
# OR
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/hotel  # For MongoDB Atlas

# Server
PORT=3000
NODE_ENV=development

# Session Secret (generate a random string)
SESSION_SECRET=your_random_secret_here_change_this

# Cloudinary (sign up at https://cloudinary.com)
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret

# CORS (for separate frontend dev server)
FRONTEND_URL=http://localhost:5173

# Google OAuth (get from https://console.cloud.google.com)
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

#### Step 3: Start Backend Server
```bash
npm run dev
```

Backend should now be running at: **http://localhost:3000**

---

### 3. Frontend Setup

Open a **new terminal** window:

#### Step 1: Install Dependencies
```bash
cd FrontEnd
npm install
```

#### Step 2: Create `.env` File
```bash
cp .env.example .env
```

Edit `FrontEnd/.env`:
```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

#### Step 3: Start Frontend Dev Server
```bash
npm run dev
```

Frontend should now be running at: **http://localhost:5173**

---

## 🔧 Configuration Details

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use: `MONGO_URI=mongodb://localhost:27017/hotel`

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Use: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel`

### Cloudinary Setup (File Upload)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add to Backend `.env`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID**
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
6. Add **Authorized redirect URIs**:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
7. Copy **Client ID** and add to both `.env` files

---

## 🎯 Development Modes

### Mode 1: Separate Frontend & Backend (Recommended for Development)

**Backend Terminal:**
```bash
cd Backend
npm run dev
```
Running at: http://localhost:3000 (API only)

**Frontend Terminal:**
```bash
cd FrontEnd
npm run dev
```
Running at: http://localhost:5173 (UI with hot reload)

**Use this for:** Active development with hot module replacement

---

### Mode 2: Unified (Backend Serves Frontend)

**Build Frontend:**
```bash
cd FrontEnd
npm run build
```

**Copy to Backend:**
```bash
# Windows
xcopy /E /I /Y dist ..\Backend\public

# Linux/Mac
cp -r dist ../Backend/public
```

**Start Backend in Production Mode:**
```bash
cd Backend
set NODE_ENV=production  # Windows
# OR
export NODE_ENV=production  # Linux/Mac

npm start
```

**Access at:** http://localhost:3000 (Frontend + Backend together)

**Use this for:** Testing production-like setup locally

---

## 📁 Project Structure

```
My-App/
├── Backend/
│   ├── .env                    # Your backend environment variables
│   ├── .env.example            # Template for .env
│   ├── app.js                  # Express server
│   ├── db.js                   # MongoDB connection
│   ├── package.json
│   ├── Controller/             # Business logic
│   ├── Model/                  # MongoDB schemas
│   ├── Routes/                 # API routes
│   ├── components/             # Upload handling
│   └── public/                 # (Built frontend goes here)
│
├── FrontEnd/
│   ├── .env                    # Your frontend environment variables
│   ├── .env.example            # Template for .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── config.js           # Environment configuration
│       ├── App.jsx
│       └── components/         # React components
│
└── SETUP_GUIDE.md              # This file
```

---

## 🌐 Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/hotel` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `SESSION_SECRET` | Session encryption key | Random string |
| `CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `API_KEY` | Cloudinary API key | `123456789012345` |
| `API_SECRET` | Cloudinary API secret | `abc123...` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |

---

## 🐛 Troubleshooting

### Backend won't start

**Problem:** `Error: connect ECONNREFUSED`
- **Solution:** MongoDB is not running. Start MongoDB service.

**Problem:** `Error: Invalid connection string`
- **Solution:** Check `MONGO_URI` in Backend `.env`

### Frontend can't connect to backend

**Problem:** CORS errors in browser console
- **Solution:** Make sure `FRONTEND_URL` in Backend `.env` matches frontend URL

**Problem:** 404 on API calls
- **Solution:** Make sure `VITE_API_URL` in Frontend `.env` points to backend

### Google OAuth not working

**Problem:** `Error: redirect_uri_mismatch`
- **Solution:** Add `http://localhost:5173` and `http://localhost:3000` to Google Console Authorized URIs

### File uploads not working

**Problem:** Cloudinary errors
- **Solution:** Check `CLOUD_NAME`, `API_KEY`, `API_SECRET` in Backend `.env`

---

## 🔒 Security Notes

⚠️ **NEVER commit `.env` files to Git!**

The `.env` files are listed in `.gitignore` and should remain private. They contain:
- Database credentials
- API keys
- Session secrets

**Always use `.env.example` as a template and create your own `.env` files locally.**

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] MongoDB is running and connected
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register a new user
- [ ] Can login with email/password
- [ ] Google OAuth login works
- [ ] Can browse hotel listings
- [ ] Can upload images (for hosts)
- [ ] Sessions persist across page refreshes

---

## 🎉 You're All Set!

Your hotel booking app should now be running locally:
- **Frontend (Dev Mode):** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Unified Mode:** http://localhost:3000 (after building frontend)

Happy coding! 🚀
