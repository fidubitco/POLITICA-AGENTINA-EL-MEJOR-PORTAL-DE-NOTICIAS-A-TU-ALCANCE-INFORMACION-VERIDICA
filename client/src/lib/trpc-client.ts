/**
 * 🔌 TRPC CLIENT - Frontend API Client
 */

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/routers';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
      headers() {
        const token = localStorage.getItem('auth_token');
        return token ? { authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});

// Helper hooks para React
export const useArticles = () => {
  return {
    list: (params: Parameters<typeof trpc.articles.list.query>[0]) =>
      trpc.articles.list.query(params),
    getById: (id: number) =>
      trpc.articles.getById.query({ id }),
    create: (data: Parameters<typeof trpc.articles.create.mutate>[0]) =>
      trpc.articles.create.mutate(data),
    update: (data: Parameters<typeof trpc.articles.update.mutate>[0]) =>
      trpc.articles.update.mutate(data),
    delete: (id: number) =>
      trpc.articles.delete.mutate({ id }),
    generateWithAI: (data: Parameters<typeof trpc.articles.generateWithAI.mutate>[0]) =>
      trpc.articles.generateWithAI.mutate(data),
    improveWithAI: (data: Parameters<typeof trpc.articles.improveWithAI.mutate>[0]) =>
      trpc.articles.improveWithAI.mutate(data),
  };
};

export const useAnalytics = () => {
  return {
    getStats: () => trpc.analytics.getStats.query(),
    getTopArticles: (limit?: number) =>
      trpc.analytics.getTopArticles.query({ limit }),
  };
};

export const useUsers = () => {
  return {
    list: (params: Parameters<typeof trpc.users.list.query>[0]) =>
      trpc.users.list.query(params),
    create: (data: Parameters<typeof trpc.users.create.mutate>[0]) =>
      trpc.users.create.mutate(data),
  };
};

