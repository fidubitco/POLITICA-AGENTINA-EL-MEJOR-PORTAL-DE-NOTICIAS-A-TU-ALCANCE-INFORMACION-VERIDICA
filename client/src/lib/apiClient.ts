/**
 * 🌐 API CLIENT - ENTERPRISE GRADE
 * Cliente HTTP profesional para comunicación con el backend
 */

import API_CONFIG from '../config/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.timeout = API_CONFIG.timeout;
  }

  /**
   * Realizar petición HTTP
   */
  private async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.timeout,
    } = options;

    const url = `${this.baseURL}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;

    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    return this.request<T>(url, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  // ============================================
  // 📰 ARTICLES API
  // ============================================

  async getArticles(params?: {
    category?: string;
    status?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    return this.get('/api/articles', params);
  }

  async getArticle(id: number | string) {
    return this.get(`/api/articles/${id}`);
  }

  async createArticle(article: any) {
    return this.post('/api/articles', article);
  }

  async updateArticle(id: number | string, article: any) {
    return this.put(`/api/articles/${id}`, article);
  }

  async deleteArticle(id: number | string) {
    return this.delete(`/api/articles/${id}`);
  }

  // ============================================
  // 📊 ANALYTICS API
  // ============================================

  async getAnalyticsStats() {
    return this.get('/api/analytics/stats');
  }

  async getTopArticles() {
    return this.get('/api/analytics/top-articles');
  }

  async getTraffic() {
    return this.get('/api/analytics/traffic');
  }

  // ============================================
  // 📂 CATEGORIES API
  // ============================================

  async getCategories() {
    return this.get('/api/categories');
  }

  // ============================================
  // 👥 USERS API
  // ============================================

  async getUsers() {
    return this.get('/api/users');
  }

  async createUser(user: any) {
    return this.post('/api/users', user);
  }

  // ============================================
  // 🔔 NOTIFICATIONS API
  // ============================================

  async getNotifications() {
    return this.get('/api/notifications');
  }

  async createNotification(notification: any) {
    return this.post('/api/notifications', notification);
  }

  async markNotificationAsRead(id: number | string) {
    return this.patch(`/api/notifications/${id}/read`, {});
  }

  // ============================================
  // 🏥 HEALTH CHECK
  // ============================================

  async checkHealth() {
    return this.get('/health');
  }
}

// Exportar instancia singleton
export const apiClient = new ApiClient();

export default apiClient;

