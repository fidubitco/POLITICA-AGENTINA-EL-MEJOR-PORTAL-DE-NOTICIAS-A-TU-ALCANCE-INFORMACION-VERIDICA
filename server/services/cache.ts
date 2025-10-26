import { Redis } from 'ioredis';

// Configuración de Redis
const REDIS_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL || 'redis://localhost:6379';

// Cliente Redis
let redis: Redis | null = null;

/**
 * Inicializar conexión a Redis
 */
export function initRedis(): Redis {
  if (redis) {
    return redis;
  }
  
  try {
    redis = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          console.error('❌ Redis: Máximo de reintentos alcanzado');
          return null;
        }
        return Math.min(times * 50, 2000);
      },
      reconnectOnError: (err) => {
        console.error('❌ Redis error:', err);
        return true;
      },
    });
    
    redis.on('connect', () => {
      console.log('✅ Redis conectado');
    });
    
    redis.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
    
    return redis;
  } catch (error) {
    console.error('❌ Error inicializando Redis:', error);
    throw error;
  }
}

/**
 * Obtener cliente Redis
 */
export function getRedis(): Redis {
  if (!redis) {
    return initRedis();
  }
  return redis;
}

/**
 * Cerrar conexión Redis
 */
export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('✅ Redis desconectado');
  }
}

/**
 * Cache helper - Get
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getRedis();
    const data = await client.get(key);
    
    if (!data) {
      return null;
    }
    
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error obteniendo cache para ${key}:`, error);
    return null;
  }
}

/**
 * Cache helper - Set
 */
export async function cacheSet(
  key: string,
  value: any,
  ttlSeconds: number = 300
): Promise<boolean> {
  try {
    const client = getRedis();
    const serialized = JSON.stringify(value);
    
    await client.setex(key, ttlSeconds, serialized);
    return true;
  } catch (error) {
    console.error(`Error guardando cache para ${key}:`, error);
    return false;
  }
}

/**
 * Cache helper - Delete
 */
export async function cacheDel(key: string): Promise<boolean> {
  try {
    const client = getRedis();
    await client.del(key);
    return true;
  } catch (error) {
    console.error(`Error eliminando cache para ${key}:`, error);
    return false;
  }
}

/**
 * Cache helper - Delete by pattern
 */
export async function cacheDelPattern(pattern: string): Promise<number> {
  try {
    const client = getRedis();
    const keys = await client.keys(pattern);
    
    if (keys.length === 0) {
      return 0;
    }
    
    await client.del(...keys);
    return keys.length;
  } catch (error) {
    console.error(`Error eliminando cache con patrón ${pattern}:`, error);
    return 0;
  }
}

/**
 * Cache helper - Exists
 */
export async function cacheExists(key: string): Promise<boolean> {
  try {
    const client = getRedis();
    const exists = await client.exists(key);
    return exists === 1;
  } catch (error) {
    console.error(`Error verificando cache para ${key}:`, error);
    return false;
  }
}

/**
 * Cache helper - Get TTL
 */
export async function cacheTTL(key: string): Promise<number> {
  try {
    const client = getRedis();
    return await client.ttl(key);
  } catch (error) {
    console.error(`Error obteniendo TTL para ${key}:`, error);
    return -1;
  }
}

/**
 * Cache helper - Increment
 */
export async function cacheIncr(key: string): Promise<number> {
  try {
    const client = getRedis();
    return await client.incr(key);
  } catch (error) {
    console.error(`Error incrementando ${key}:`, error);
    return 0;
  }
}

/**
 * Cache helper - Decrement
 */
export async function cacheDecr(key: string): Promise<number> {
  try {
    const client = getRedis();
    return await client.decr(key);
  } catch (error) {
    console.error(`Error decrementando ${key}:`, error);
    return 0;
  }
}

/**
 * Wrapper para funciones con cache automático
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  // Intentar obtener del cache
  const cached = await cacheGet<T>(key);
  
  if (cached !== null) {
    console.log(`✅ Cache HIT: ${key}`);
    return cached;
  }
  
  console.log(`❌ Cache MISS: ${key}`);
  
  // Obtener datos frescos
  const fresh = await fetchFn();
  
  // Guardar en cache
  await cacheSet(key, fresh, ttlSeconds);
  
  return fresh;
}

/**
 * Invalidar cache de artículos
 */
export async function invalidateArticlesCache(): Promise<void> {
  await cacheDelPattern('articles:*');
  await cacheDelPattern('article:*');
  console.log('✅ Cache de artículos invalidado');
}

/**
 * Invalidar cache de estadísticas
 */
export async function invalidateStatsCache(): Promise<void> {
  await cacheDelPattern('stats:*');
  await cacheDelPattern('analytics:*');
  console.log('✅ Cache de estadísticas invalidado');
}

/**
 * Invalidar cache de categorías
 */
export async function invalidateCategoriesCache(): Promise<void> {
  await cacheDelPattern('categories:*');
  await cacheDelPattern('category:*');
  console.log('✅ Cache de categorías invalidado');
}

/**
 * Limpiar todo el cache
 */
export async function clearAllCache(): Promise<void> {
  try {
    const client = getRedis();
    await client.flushdb();
    console.log('✅ Todo el cache limpiado');
  } catch (error) {
    console.error('Error limpiando cache:', error);
  }
}

/**
 * Obtener estadísticas de Redis
 */
export async function getRedisStats(): Promise<{
  connected: boolean;
  keys: number;
  memory: string;
  uptime: number;
}> {
  try {
    const client = getRedis();
    const info = await client.info();
    const dbsize = await client.dbsize();
    
    // Parsear info
    const lines = info.split('\r\n');
    const stats: any = {};
    
    for (const line of lines) {
      const [key, value] = line.split(':');
      if (key && value) {
        stats[key] = value;
      }
    }
    
    return {
      connected: true,
      keys: dbsize,
      memory: stats.used_memory_human || 'N/A',
      uptime: parseInt(stats.uptime_in_seconds || '0'),
    };
  } catch (error) {
    console.error('Error obteniendo stats de Redis:', error);
    return {
      connected: false,
      keys: 0,
      memory: 'N/A',
      uptime: 0,
    };
  }
}

// Inicializar Redis al importar el módulo
try {
  initRedis();
} catch (error) {
  console.warn('⚠️ Redis no disponible, funcionando sin cache');
}

