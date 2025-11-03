/**
 * DATABASE LAYER - ENTERPRISE GRADE
 * Optimized connection pooling and query management
 */

import { supabase } from './supabase';

// ============================================
// DATABASE CONNECTION POOL
// ============================================
class DatabasePool {
  private static instance: DatabasePool;
  private connectionPool: Map<string, any>;
  private maxConnections = 10;
  private currentConnections = 0;

  private constructor() {
    this.connectionPool = new Map();
  }

  static getInstance(): DatabasePool {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }
    return DatabasePool.instance;
  }

  async getConnection(): Promise<typeof supabase> {
    if (this.currentConnections < this.maxConnections) {
      this.currentConnections++;
      return supabase;
    }
    // Wait for available connection
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.getConnection();
  }

  releaseConnection() {
    if (this.currentConnections > 0) {
      this.currentConnections--;
    }
  }
}

// ============================================
// QUERY BUILDER - TYPE-SAFE
// ============================================
export class QueryBuilder<T> {
  private table: string;
  private selectFields: string[] = ['*'];
  private whereConditions: any[] = [];
  private orderByField?: string;
  private orderDirection: 'asc' | 'desc' = 'desc';
  private limitValue?: number;
  private offsetValue?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): this {
    this.selectFields = fields;
    return this;
  }

  where(field: string, operator: string, value: any): this {
    this.whereConditions.push({ field, operator, value });
    return this;
  }

  orderBy(field: string, direction: 'asc' | 'desc' = 'desc'): this {
    this.orderByField = field;
    this.orderDirection = direction;
    return this;
  }

  limit(value: number): this {
    this.limitValue = value;
    return this;
  }

  offset(value: number): this {
    this.offsetValue = value;
    return this;
  }

  async execute(): Promise<T[]> {
    const db = await DatabasePool.getInstance().getConnection();
    
    try {
      let query = db.from(this.table).select(this.selectFields.join(','));

      // Apply where conditions
      for (const condition of this.whereConditions) {
        query = query.filter(condition.field, condition.operator, condition.value);
      }

      // Apply ordering
      if (this.orderByField) {
        query = query.order(this.orderByField, { ascending: this.orderDirection === 'asc' });
      }

      // Apply pagination
      if (this.limitValue) {
        query = query.limit(this.limitValue);
      }
      if (this.offsetValue) {
        query = query.range(this.offsetValue, this.offsetValue + (this.limitValue || 10) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as T[];
    } finally {
      DatabasePool.getInstance().releaseConnection();
    }
  }

  async first(): Promise<T | null> {
    this.limitValue = 1;
    const results = await this.execute();
    return results[0] || null;
  }

  async count(): Promise<number> {
    const db = await DatabasePool.getInstance().getConnection();
    
    try {
      let query = db.from(this.table).select('*', { count: 'exact', head: true });

      for (const condition of this.whereConditions) {
        query = query.filter(condition.field, condition.operator, condition.value);
      }

      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    } finally {
      DatabasePool.getInstance().releaseConnection();
    }
  }
}

// ============================================
// CACHE LAYER - REDIS-LIKE IN-MEMORY
// ============================================
class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, { data: any; expiry: number }>;
  private defaultTTL = 300000; // 5 minutes

  private constructor() {
    this.cache = new Map();
    // Cleanup expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set(key: string, data: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expiry });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // Cache statistics
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// ============================================
// DATABASE MODELS - TYPE-SAFE
// ============================================
export interface Noticia {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  category_slug: string;
  excerpt: string;
  content?: string;
  image_url: string;
  author: string;
  published_at: string;
  updated_at?: string;
  views: number;
  is_breaking?: boolean;
  is_featured?: boolean;
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  avatar?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  created_at: string;
}

// ============================================
// REPOSITORY PATTERN - CLEAN ARCHITECTURE
// ============================================
export class NoticiaRepository {
  private cache = CacheManager.getInstance();
  private table = 'noticias';

  async findAll(options?: {
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<Noticia[]> {
    const cacheKey = `noticias:all:${JSON.stringify(options)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const query = new QueryBuilder<Noticia>(this.table)
      .select('*')
      .where('status', 'eq', 'published')
      .orderBy('published_at', 'desc');

    if (options?.category) {
      query.where('category_slug', 'eq', options.category);
    }

    if (options?.limit) {
      query.limit(options.limit);
    }

    if (options?.offset) {
      query.offset(options.offset);
    }

    const results = await query.execute();
    this.cache.set(cacheKey, results, 300000); // 5 min cache
    return results;
  }

  async findById(id: string): Promise<Noticia | null> {
    const cacheKey = `noticia:${id}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const result = await new QueryBuilder<Noticia>(this.table)
      .where('id', 'eq', id)
      .first();

    if (result) {
      this.cache.set(cacheKey, result, 600000); // 10 min cache
    }

    return result;
  }

  async findBreaking(): Promise<Noticia[]> {
    const cacheKey = 'noticias:breaking';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const results = await new QueryBuilder<Noticia>(this.table)
      .where('is_breaking', 'eq', true)
      .where('status', 'eq', 'published')
      .orderBy('published_at', 'desc')
      .limit(5)
      .execute();

    this.cache.set(cacheKey, results, 60000); // 1 min cache for breaking news
    return results;
  }

  async create(data: Partial<Noticia>): Promise<Noticia> {
    const db = await DatabasePool.getInstance().getConnection();
    
    try {
      const { data: result, error } = await db
        .from(this.table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      // Invalidate cache
      this.cache.clear();

      return result;
    } finally {
      DatabasePool.getInstance().releaseConnection();
    }
  }

  async update(id: string, data: Partial<Noticia>): Promise<Noticia> {
    const db = await DatabasePool.getInstance().getConnection();
    
    try {
      const { data: result, error } = await db
        .from(this.table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Invalidate cache
      this.cache.delete(`noticia:${id}`);
      this.cache.clear();

      return result;
    } finally {
      DatabasePool.getInstance().releaseConnection();
    }
  }

  async delete(id: string): Promise<void> {
    const db = await DatabasePool.getInstance().getConnection();
    
    try {
      const { error } = await db
        .from(this.table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Invalidate cache
      this.cache.delete(`noticia:${id}`);
      this.cache.clear();
    } finally {
      DatabasePool.getInstance().releaseConnection();
    }
  }

  async incrementViews(id: string): Promise<void> {
    const db = await DatabasePool.getInstance().getConnection();
    
    try {
      const { error } = await db.rpc('increment_views', { noticia_id: id });
      if (error) throw error;

      // Invalidate cache
      this.cache.delete(`noticia:${id}`);
    } finally {
      DatabasePool.getInstance().releaseConnection();
    }
  }
}

// ============================================
// EXPORT INSTANCES
// ============================================
export const cache = CacheManager.getInstance();
export const noticiaRepo = new NoticiaRepository();
export const db = DatabasePool.getInstance();

