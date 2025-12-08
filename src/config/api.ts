// API Configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Backend API URL - Use environment variable or fallback
export const API_BASE_URL = isDevelopment
  ? '/api/v1' // Use proxy in development (vite.config.ts)
  : import.meta.env.VITE_API_URL || 'https://wealth-backend-node.vercel.app/api/v1';

// Full API URL helper
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Export for use in components
export default {
  API_BASE_URL,
  getApiUrl,
};

