import { createClient, RedisClientType } from 'redis';

// ===========================================
// INTERFACES Y TIPOS
// ===========================================

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Tags for cache invalidation
}

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
  tags: string[];
}

// ===========================================
// CLASE PRINCIPAL DEL SERVICIO DE REDIS
// ===========================================

export class RedisCacheService {
  private client: RedisClientType;
  private isConnected: boolean = false;
  private defaultTTL: number = 3600; // 1 hora por defecto

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        connectTimeout: 5000,
        lazyConnect: true,
      },
      retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          console.error('❌ Redis connection refused');
          return new Error('Redis server connection refused');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          console.error('❌ Redis retry time exhausted');
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          console.error('❌ Redis max retries reached');
          return undefined;
        }
        // Exponential backoff
        return Math.min(options.attempt * 100, 3000);
      }
    });

    this.setupEventHandlers();
    this.connect();
  }

  // ===========================================
  // CONEXIÓN Y MANEJO DE EVENTOS
  // ===========================================

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
      console.log('✅ Conectado a Redis exitosamente');
    } catch (error) {
      console.error('❌ Error conectando a Redis:', error);
      this.isConnected = false;
    }
  }

  private setupEventHandlers(): void {
    this.client.on('error', (err) => {
      console.error('❌ Error de Redis:', err);
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      console.log('🔗 Conectando a Redis...');
    });

    this.client.on('ready', () => {
      console.log('✅ Redis listo para usar');
      this.isConnected = true;
    });

    this.client.on('end', () => {
      console.log('🔌 Conexión a Redis cerrada');
      this.isConnected = false;
    });
  }

  // ===========================================
  // MÉTODOS BÁSICOS DE CACHE
  // ===========================================

  async set(key: string, value: any, options: CacheOptions = {}): Promise<boolean> {
    if (!this.isConnected) {
      console.warn('⚠️ Redis no conectado, omitiendo cache');
      return false;
    }

    try {
      const ttl = options.ttl || this.defaultTTL;
      const tags = options.tags || [];

      const cacheEntry: CacheEntry = {
        data: value,
        timestamp: Date.now(),
        ttl,
        tags
      };

      const serialized = JSON.stringify(cacheEntry);

      // Guardar el dato
      await this.client.setEx(key, ttl, serialized);

      // Registrar tags para invalidación
      if (tags.length > 0) {
        for (const tag of tags) {
          await this.client.sAdd(`tag:${tag}`, key);
        }
      }

      console.log(`💾 Cache guardado: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      console.error(`❌ Error guardando en cache ${key}:`, error);
      return false;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      console.warn('⚠️ Redis no conectado, retornando null');
      return null;
    }

    try {
      const cached = await this.client.get(key);

      if (!cached) {
        return null;
      }

      const cacheEntry: CacheEntry = JSON.parse(cached);

      // Verificar si expiró (por si acaso)
      if (Date.now() - cacheEntry.timestamp > cacheEntry.ttl * 1000) {
        await this.delete(key);
        return null;
      }

      console.log(`📖 Cache hit: ${key}`);
      return cacheEntry.data as T;
    } catch (error) {
      console.error(`❌ Error obteniendo de cache ${key}:`, error);
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      // Obtener tags antes de eliminar
      const cached = await this.client.get(key);
      if (cached) {
        const cacheEntry: CacheEntry = JSON.parse(cached);

        // Remover de tags
        for (const tag of cacheEntry.tags) {
          await this.client.sRem(`tag:${tag}`, key);
        }
      }

      const result = await this.client.del(key);
      console.log(`🗑️ Cache eliminado: ${key}`);
      return result > 0;
    } catch (error) {
      console.error(`❌ Error eliminando cache ${key}:`, error);
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`❌ Error verificando existencia ${key}:`, error);
      return false;
    }
  }

  async clear(pattern: string = '*'): Promise<number> {
    if (!this.isConnected) return 0;

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length === 0) return 0;

      const result = await this.client.del(keys);
      console.log(`🧹 Cache limpiado: ${result} keys eliminadas con patrón ${pattern}`);
      return result;
    } catch (error) {
      console.error(`❌ Error limpiando cache con patrón ${pattern}:`, error);
      return 0;
    }
  }

  // ===========================================
  // INVALIDACIÓN POR TAGS
  // ===========================================

  async invalidateByTag(tag: string): Promise<number> {
    if (!this.isConnected) return 0;

    try {
      const keys = await this.client.sMembers(`tag:${tag}`);
      if (keys.length === 0) return 0;

      // Eliminar todas las keys del tag
      let deletedCount = 0;
      for (const key of keys) {
        const deleted = await this.client.del(key);
        deletedCount += deleted;
      }

      // Limpiar el set de tags
      await this.client.del(`tag:${tag}`);

      console.log(`🏷️ Tag invalidado: ${tag} (${deletedCount} keys eliminadas)`);
      return deletedCount;
    } catch (error) {
      console.error(`❌ Error invalidando tag ${tag}:`, error);
      return 0;
    }
  }

  async invalidateByTags(tags: string[]): Promise<number> {
    let totalDeleted = 0;
    for (const tag of tags) {
      totalDeleted += await this.invalidateByTag(tag);
    }
    return totalDeleted;
  }

  // ===========================================
  // CACHE AVANZADO CON WRAPPER
  // ===========================================

  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Intentar obtener del cache
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Si no está en cache, ejecutar fetcher
    console.log(`🔄 Cache miss: ${key}, ejecutando fetcher...`);
    const data = await fetcher();

    // Guardar en cache (sin await para no bloquear)
    this.set(key, data, options).catch(error => {
      console.error(`❌ Error guardando en cache ${key}:`, error);
    });

    return data;
  }

  // ===========================================
  // CACHE ESPECÍFICO PARA ARTÍCULOS
  // ===========================================

  async getArticle(id: string) {
    const key = `article:${id}`;
    return this.get(key);
  }

  async setArticle(id: string, article: any) {
    const key = `article:${id}`;
    return this.set(key, article, {
      ttl: 1800, // 30 minutos
      tags: ['articles', `article:${id}`, `category:${article.category}`]
    });
  }

  async getArticlesByCategory(category: string, page: number = 1, limit: number = 10) {
    const key = `articles:category:${category}:${page}:${limit}`;
    return this.get(key);
  }

  async setArticlesByCategory(category: string, articles: any[], page: number = 1, limit: number = 10) {
    const key = `articles:category:${category}:${page}:${limit}`;
    return this.set(key, articles, {
      ttl: 900, // 15 minutos
      tags: ['articles', `category:${category}`]
    });
  }

  async getLatestArticles(limit: number = 10) {
    const key = `articles:latest:${limit}`;
    return this.get(key);
  }

  async setLatestArticles(articles: any[], limit: number = 10) {
    const key = `articles:latest:${limit}`;
    return this.set(key, articles, {
      ttl: 600, // 10 minutos
      tags: ['articles', 'latest']
    });
  }

  // ===========================================
  // CACHE PARA ESTADÍSTICAS
  // ===========================================

  async getStats(type: string, period?: string) {
    const key = `stats:${type}${period ? `:${period}` : ''}`;
    return this.get(key);
  }

  async setStats(type: string, stats: any, period?: string) {
    const key = `stats:${type}${period ? `:${period}` : ''}`;
    return this.set(key, stats, {
      ttl: 300, // 5 minutos para stats
      tags: ['stats', `stats:${type}`]
    });
  }

  async getDashboardStats() {
    const key = 'dashboard:stats';
    return this.get(key);
  }

  async setDashboardStats(stats: any) {
    const key = 'dashboard:stats';
    return this.set(key, stats, {
      ttl: 180, // 3 minutos para dashboard
      tags: ['stats', 'dashboard']
    });
  }

  // ===========================================
  // CACHE PARA PUSH NOTIFICATIONS
  // ===========================================

  async getPushStats() {
    const key = 'push:stats';
    return this.get(key);
  }

  async setPushStats(stats: any) {
    const key = 'push:stats';
    return this.set(key, stats, {
      ttl: 120, // 2 minutos para push stats
      tags: ['push', 'stats']
    });
  }

  // ===========================================
  // CACHE PARA BÚSQUEDAS
  // ===========================================

  async getSearchResults(query: string, page: number = 1) {
    const key = `search:${query.toLowerCase()}:${page}`;
    return this.get(key);
  }

  async setSearchResults(query: string, results: any[], page: number = 1) {
    const key = `search:${query.toLowerCase()}:${page}`;
    return this.set(key, results, {
      ttl: 1800, // 30 minutos para búsquedas
      tags: ['search']
    });
  }

  // ===========================================
  // UTILIDADES Y MANTENIMIENTO
  // ===========================================

  async getCacheInfo(): Promise<{
    connected: boolean;
    keys: number;
    memory: any;
    info: any;
  }> {
    if (!this.isConnected) {
      return { connected: false, keys: 0, memory: null, info: null };
    }

    try {
      const [keys, memory, info] = await Promise.all([
        this.client.dbsize(),
        this.client.memory('STATS'),
        this.client.info()
      ]);

      return {
        connected: true,
        keys,
        memory,
        info
      };
    } catch (error) {
      console.error('❌ Error obteniendo info de cache:', error);
      return { connected: false, keys: 0, memory: null, info: null };
    }
  }

  async healthCheck(): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.ping();
      return true;
    } catch (error) {
      console.error('❌ Health check de Redis falló:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
      console.log('🔌 Desconectado de Redis');
    }
  }

  // ===========================================
  // MÉTODOS DE CONVENIENCIA PARA INVALIDACIÓN
  // ===========================================

  async invalidateArticles() {
    return this.invalidateByTag('articles');
  }

  async invalidateStats() {
    return this.invalidateByTag('stats');
  }

  async invalidateSearch() {
    return this.invalidateByTag('search');
  }

  async invalidateDashboard() {
    return this.invalidateByTags(['dashboard', 'stats']);
  }

  // ===========================================
  // CONFIGURACIÓN
  // ===========================================

  isConnected(): boolean {
    return this.isConnected;
  }

  getConfig(): {
    url: string;
    defaultTTL: number;
  } {
    return {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      defaultTTL: this.defaultTTL
    };
  }
}

// ===========================================
// INSTANCIA GLOBAL DEL SERVICIO
// ===========================================

export const redisCache = new RedisCacheService();
export const redisService = redisCache; // Alias para compatibilidad

// ===========================================
// DECORADORES PARA CACHE
// ===========================================

export function Cacheable(options: CacheOptions = {}) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const key = `${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`;

      return redisCache.getOrSet(key, () => method.apply(this, args), options);
    };

    return descriptor;
  };
}

// Graceful degradation wrapper
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  key: string,
  options: CacheOptions = {}
): T {
  return (async (...args: any[]) => {
    try {
      return await redisCache.getOrSet(key, () => fn(...args), options);
    } catch (error) {
      console.warn(`⚠️ Cache falló para ${key}, ejecutando función original:`, error);
      return fn(...args);
    }
  }) as T;
}