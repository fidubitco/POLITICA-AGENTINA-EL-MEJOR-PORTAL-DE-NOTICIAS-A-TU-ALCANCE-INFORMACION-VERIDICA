/**
 * 🔧 API CONFIGURATION
 * Configuración centralizada para conexión con el backend
 */

export const API_CONFIG = {
  // Backend URL (Railway)
  baseURL: import.meta.env.VITE_API_URL || 'https://politicaargentinaofficialsite-production.up.railway.app',
  
  // Frontend URL
  frontendURL: import.meta.env.VITE_FRONTEND_URL || 'https://politicaargentina.com',
  
  // Timeout
  timeout: 30000, // 30 seconds
  
  // Retry config
  retry: {
    attempts: 3,
    delay: 1000,
  },
  
  // Endpoints
  endpoints: {
    health: '/health',
    articles: '/api/articles',
    categories: '/api/categories',
    analytics: '/api/analytics',
    users: '/api/users',
    notifications: '/api/notifications',
  },
};

export default API_CONFIG;

