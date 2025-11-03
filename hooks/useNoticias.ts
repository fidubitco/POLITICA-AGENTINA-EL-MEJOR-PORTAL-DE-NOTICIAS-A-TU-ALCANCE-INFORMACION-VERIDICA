/**
 * CUSTOM HOOK - useNoticias
 * Client-side data fetching with caching and error handling
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Noticia } from '@/lib/database';

// ============================================
// TYPES
// ============================================
interface UseNoticiasOptions {
  category?: string;
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseNoticiasResult {
  data: Noticia[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  refetch: () => Promise<void>;
}

// ============================================
// HOOK
// ============================================
export function useNoticias(options: UseNoticiasOptions = {}): UseNoticiasResult {
  const {
    category,
    page = 1,
    limit = 20,
    autoFetch = true,
  } = options;

  const [data, setData] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNoticias = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await fetch(`/api/v1/noticias?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch noticias');
      }

      const result = await response.json();

      setData(result.data);
      setTotal(result.pagination.total);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [category, page, limit]);

  useEffect(() => {
    if (autoFetch) {
      fetchNoticias();
    }
  }, [autoFetch, fetchNoticias]);

  return {
    data,
    loading,
    error,
    total,
    totalPages,
    refetch: fetchNoticias,
  };
}

// ============================================
// HOOK - Single Noticia
// ============================================
interface UseNoticiaResult {
  data: Noticia | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNoticia(id: string): UseNoticiaResult {
  const [data, setData] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticia = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/noticias/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch noticia');
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNoticia();
  }, [fetchNoticia]);

  return {
    data,
    loading,
    error,
    refetch: fetchNoticia,
  };
}

