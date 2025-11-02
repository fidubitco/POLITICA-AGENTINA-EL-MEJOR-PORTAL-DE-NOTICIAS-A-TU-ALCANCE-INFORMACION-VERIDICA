// ===========================================
// SERVICIO CLIENTE PARA APIs DEL BACKEND
// ===========================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(`API Error [${endpoint}]:`, error.message);
      return {
        success: false,
        error: error.message,
        message: 'Error de conexión con el servidor'
      };
    }
  }

  // ===========================================
  // ARTÍCULOS
  // ===========================================

  async getArticles(params?: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/articles${queryString ? `?${queryString}` : ''}`;

    return this.request<any[]>(endpoint);
  }

  async getArticle(id: string) {
    return this.request<any>(`/articles/${id}`);
  }

  async getLatestArticles(limit: number = 10) {
    return this.request<any[]>(`/articles/latest?limit=${limit}`);
  }

  async getArticlesByCategory(category: string, page: number = 1, limit: number = 10) {
    return this.request<any[]>(`/articles/category/${category}?page=${page}&limit=${limit}`);
  }

  // ===========================================
  // ESTADÍSTICAS
  // ===========================================

  async getStats() {
    return this.request<any>('/stats');
  }

  async getDashboardStats() {
    return this.request<any>('/stats/dashboard');
  }

  async getArticleStats(articleId: string) {
    return this.request<any>(`/stats/article/${articleId}`);
  }

  // ===========================================
  // BÚSQUEDA
  // ===========================================

  async searchArticles(query: string, options?: {
    category?: string;
    limit?: number;
    page?: number;
  }) {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);
    if (options?.category) searchParams.set('category', options.category);
    if (options?.limit) searchParams.set('limit', options.limit.toString());
    if (options?.page) searchParams.set('page', options.page.toString());

    return this.request<any[]>(`/search?${searchParams.toString()}`);
  }

  // ===========================================
  // INTELIGENCIA ARTIFICIAL
  // ===========================================

  async generateArticle(data: {
    topic: string;
    category?: string;
    keywords?: string[];
    length?: 'short' | 'medium' | 'long';
    style?: 'formal' | 'journalistic' | 'analytical';
  }) {
    return this.request<any>('/ollama/generate-article', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async improveContent(data: {
    content: string;
    improvementType: 'grammar' | 'style' | 'length' | 'seo' | 'engagement';
  }) {
    return this.request<any>('/ollama/improve-content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async suggestTitles(data: {
    content: string;
    category?: string;
    style?: 'clickbait' | 'journalistic' | 'analytical';
  }) {
    return this.request<any>('/ollama/suggest-titles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async categorizeContent(data: {
    content: string;
    title?: string;
  }) {
    return this.request<any>('/ollama/categorize', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAiOptions() {
    return this.request<any>('/ollama/options');
  }

  async checkAiStatus() {
    return this.request<any>('/ollama/status');
  }

  // ===========================================
  // SCRAPING
  // ===========================================

  async getScrapedArticles(status: 'pending' | 'approved' | 'rejected' = 'approved', limit: number = 20) {
    return this.request<any[]>(`/scraping/articles?status=${status}&limit=${limit}`);
  }

  async approveScrapedArticle(articleId: number) {
    return this.request<any>(`/scraping/approve/${articleId}`, {
      method: 'POST',
    });
  }

  async rejectScrapedArticle(articleId: number) {
    return this.request<any>(`/scraping/reject/${articleId}`, {
      method: 'POST',
    });
  }

  async startScraping() {
    return this.request<any>('/scraping/start', {
      method: 'POST',
    });
  }

  async getScrapingStatus() {
    return this.request<any>('/scraping/status');
  }

  // ===========================================
  // PUSH NOTIFICATIONS
  // ===========================================

  async subscribeToPush(subscription: any, userId?: string) {
    return this.request<any>('/push/subscribe', {
      method: 'POST',
      body: JSON.stringify({ subscription, userId }),
    });
  }

  async unsubscribeFromPush(endpoint: string) {
    return this.request<any>('/push/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ endpoint }),
    });
  }

  async sendTestNotification() {
    return this.request<any>('/push/send-all', {
      method: 'POST',
    });
  }

  async getPushStats() {
    return this.request<any>('/push/stats');
  }

  // ===========================================
  // EXPORT
  // ===========================================

  async exportArticles(format: 'pdf' | 'excel', options?: {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: string;
  }) {
    const searchParams = new URLSearchParams();
    searchParams.set('format', format);
    if (options?.category) searchParams.set('category', options.category);
    if (options?.dateFrom) searchParams.set('dateFrom', options.dateFrom);
    if (options?.dateTo) searchParams.set('dateTo', options.dateTo);
    if (options?.status) searchParams.set('status', options.status);

    return this.request<any>(`/export/articles?${searchParams.toString()}`, {
      method: 'GET',
    });
  }

  // ===========================================
  // CACHE MANAGEMENT
  // ===========================================

  async getCacheInfo() {
    return this.request<any>('/cache/info');
  }

  async clearCache(pattern?: string) {
    const endpoint = pattern ? `/cache/clear-pattern?pattern=${encodeURIComponent(pattern)}` : '/cache/clear';
    return this.request<any>(endpoint, {
      method: 'POST',
    });
  }

  async invalidateCacheByTag(tag: string) {
    return this.request<any>('/cache/invalidate-tag', {
      method: 'POST',
      body: JSON.stringify({ tag }),
    });
  }

  // ===========================================
  // UTILITIES
  // ===========================================

  async healthCheck() {
    return this.request<any>('/health');
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}

// ===========================================
// INSTANCIA GLOBAL DEL CLIENTE API
// ===========================================

export const apiClient = new ApiClient(API_BASE_URL);

// ===========================================
// HOOKS PARA USO EN COMPONENTES REACT
// ===========================================

import { useState, useEffect } from 'react';

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall();

        if (isMounted) {
          if (response.success && response.data) {
            setData(response.data);
          } else {
            setError(response.error || response.message || 'Error desconocido');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error de red');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || response.message || 'Error desconocido');
      }
    } catch (err: any) {
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Hook específico para artículos
export function useArticles(params?: {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useApi(
    () => apiClient.getArticles(params),
    [params?.category, params?.page, params?.limit, params?.search]
  );
}

// Hook específico para estadísticas
export function useStats() {
  return useApi(() => apiClient.getStats(), []);
}

// Hook específico para artículos scrapeados
export function useScrapedArticles(status: 'pending' | 'approved' | 'rejected' = 'approved', limit: number = 20) {
  return useApi(
    () => apiClient.getScrapedArticles(status, limit),
    [status, limit]
  );
}

