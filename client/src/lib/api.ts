import axios, { AxiosInstance, AxiosError } from 'axios';

// URL base de la API (Railway o local)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Crear instancia de axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH API =====
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await apiClient.post('/api/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/api/auth/logout');
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await apiClient.post('/api/auth/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  },
};

// ===== ARTICLES API =====
export const articlesAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }) => {
    const response = await apiClient.get('/api/articles', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/api/articles/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await apiClient.get(`/api/articles/slug/${slug}`);
    return response.data;
  },

  create: async (article: any) => {
    const response = await apiClient.post('/api/articles', article);
    return response.data;
  },

  update: async (id: number, article: any) => {
    const response = await apiClient.put(`/api/articles/${id}`, article);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/articles/${id}`);
    return response.data;
  },

  incrementView: async (id: number) => {
    const response = await apiClient.post(`/api/articles/${id}/view`);
    return response.data;
  },

  incrementShare: async (id: number) => {
    const response = await apiClient.post(`/api/articles/${id}/share`);
    return response.data;
  },

  incrementLike: async (id: number) => {
    const response = await apiClient.post(`/api/articles/${id}/like`);
    return response.data;
  },
};

// ===== ANALYTICS API =====
export const analyticsAPI = {
  getDashboard: async () => {
    const response = await apiClient.get('/api/analytics/dashboard');
    return response.data;
  },

  getViewsByDay: async (days: number = 30) => {
    const response = await apiClient.get('/api/analytics/views-by-day', {
      params: { days },
    });
    return response.data;
  },

  getArticlesByCategory: async () => {
    const response = await apiClient.get('/api/analytics/articles-by-category');
    return response.data;
  },

  getTopArticles: async (limit: number = 10) => {
    const response = await apiClient.get('/api/analytics/top-articles', {
      params: { limit },
    });
    return response.data;
  },

  getUsersByLanguage: async () => {
    const response = await apiClient.get('/api/analytics/users-by-language');
    return response.data;
  },

  getRecentActivity: async (limit: number = 20) => {
    const response = await apiClient.get('/api/analytics/recent-activity', {
      params: { limit },
    });
    return response.data;
  },

  getEngagement: async (days: number = 30) => {
    const response = await apiClient.get('/api/analytics/engagement', {
      params: { days },
    });
    return response.data;
  },

  track: async (data: {
    article_id: number;
    event_type: 'view' | 'share' | 'like';
    user_id?: number;
    session_id?: string;
  }) => {
    const response = await apiClient.post('/api/analytics/track', data);
    return response.data;
  },
};

// ===== USERS API =====
export const usersAPI = {
  getAll: async (params?: { page?: number; limit?: number; role?: string }) => {
    const response = await apiClient.get('/api/users', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },

  create: async (user: any) => {
    const response = await apiClient.post('/api/users', user);
    return response.data;
  },

  update: async (id: number, user: any) => {
    const response = await apiClient.put(`/api/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  },
};

// ===== CATEGORIES API =====
export const categoriesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  },

  create: async (category: any) => {
    const response = await apiClient.post('/api/categories', category);
    return response.data;
  },

  update: async (id: number, category: any) => {
    const response = await apiClient.put(`/api/categories/${id}`, category);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/categories/${id}`);
    return response.data;
  },
};

// ===== SCRAPING API =====
export const scrapingAPI = {
  scrapeAll: async () => {
    const response = await apiClient.post('/api/scraping/scrape-all');
    return response.data;
  },

  scrapeSource: async (sourceId: number) => {
    const response = await apiClient.post(`/api/scraping/scrape-source/${sourceId}`);
    return response.data;
  },

  getPending: async () => {
    const response = await apiClient.get('/api/scraping/pending');
    return response.data;
  },

  approve: async (id: number) => {
    const response = await apiClient.post(`/api/scraping/approve/${id}`);
    return response.data;
  },

  reject: async (id: number) => {
    const response = await apiClient.post(`/api/scraping/reject/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get('/api/scraping/stats');
    return response.data;
  },
};

// ===== AI API =====
export const aiAPI = {
  generateArticle: async (topic: string) => {
    const response = await apiClient.post('/api/ai/generate-article', { topic });
    return response.data;
  },

  improveContent: async (content: string) => {
    const response = await apiClient.post('/api/ai/improve-content', { content });
    return response.data;
  },

  generateTitle: async (content: string) => {
    const response = await apiClient.post('/api/ai/generate-title', { content });
    return response.data;
  },

  generateExcerpt: async (content: string) => {
    const response = await apiClient.post('/api/ai/generate-excerpt', { content });
    return response.data;
  },

  categorize: async (title: string, content: string) => {
    const response = await apiClient.post('/api/ai/categorize', { title, content });
    return response.data;
  },

  generateTags: async (title: string, content: string) => {
    const response = await apiClient.post('/api/ai/generate-tags', { title, content });
    return response.data;
  },

  validateQuality: async (title: string, content: string) => {
    const response = await apiClient.post('/api/ai/validate-quality', {
      title,
      content,
    });
    return response.data;
  },
};

// ===== EXPORT API =====
export const exportAPI = {
  articlePDF: async (articleId: number) => {
    const response = await apiClient.get(`/api/export/article/${articleId}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  articlesExcel: async (filters?: any) => {
    const response = await apiClient.get('/api/export/articles/excel', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },

  analyticsExcel: async (dateFrom: string, dateTo: string) => {
    const response = await apiClient.get('/api/export/analytics/excel', {
      params: { dateFrom, dateTo },
      responseType: 'blob',
    });
    return response.data;
  },

  usersExcel: async () => {
    const response = await apiClient.get('/api/export/users/excel', {
      responseType: 'blob',
    });
    return response.data;
  },
};

// ===== PUSH NOTIFICATIONS API =====
export const pushAPI = {
  subscribe: async (subscription: any) => {
    const response = await apiClient.post('/api/push/subscribe', { subscription });
    return response.data;
  },

  unsubscribe: async (endpoint: string) => {
    const response = await apiClient.post('/api/push/unsubscribe', { endpoint });
    return response.data;
  },

  getVapidKey: async () => {
    const response = await apiClient.get('/api/push/vapid-key');
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get('/api/push/stats');
    return response.data;
  },
};

// Export default
export default apiClient;

