// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
