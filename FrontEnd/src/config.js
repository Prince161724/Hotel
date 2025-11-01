// API Configuration
// In production, frontend is served from backend, so use empty string (same origin)
// In development, use localhost:3000
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '' : 'http://localhost:3000');

// Google OAuth
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Cloudinary Config (if needed on frontend)
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.CLOUD_NAME || '',
  apiKey: import.meta.env.API_KEY || ''
};

export default {
  API_BASE_URL,
  GOOGLE_CLIENT_ID,
  CLOUDINARY_CONFIG
};
