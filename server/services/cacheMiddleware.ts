import { redisCache } from './redis';
import { eq } from 'drizzle-orm';
import { articles, pushSubscriptions } from '../db/schema';

interface CacheInvalidationOptions {
  tags?: string[];
  patterns?: string[];
}

// ===========================================
// MIDDLEWARE PARA INVALIDACIÓN AUTOMÁTICA DE CACHE
// ===========================================

export class CacheMiddleware {
  // ===========================================
  // INVALIDACIÓN PARA ARTÍCULOS
  // ===========================================

  static async invalidateArticleCache(articleId?: number, category?: string, tags?: string[]) {
    const invalidationTags: string[] = ['articles'];

    if (articleId) {
      invalidationTags.push(`article:${articleId}`);
    }

    if (category) {
      invalidationTags.push(`category:${category}`);
    }

    if (tags && tags.length > 0) {
      tags.forEach(tag => invalidationTags.push(`tag:${tag}`));
    }

    // Invalidar también búsquedas y listados generales
    invalidationTags.push('latest', 'trending', 'featured');

    await redisCache.invalidateByTags(invalidationTags);
    console.log(`🗑️ Cache invalidado para artículo: ${articleId || 'nuevo'} en categoría: ${category || 'general'}`);
  }

  static async invalidateCategoryCache(category: string) {
    const tags = [`category:${category}`, 'articles', 'categories'];
    await redisCache.invalidateByTags(tags);
    console.log(`🗑️ Cache invalidado para categoría: ${category}`);
  }

  // ===========================================
  // INVALIDACIÓN PARA ESTADÍSTICAS
  // ===========================================

  static async invalidateStatsCache(type?: string) {
    const tags = ['stats'];

    if (type) {
      tags.push(`stats:${type}`);
    }

    // Invalidar también dashboard y analytics
    tags.push('dashboard', 'analytics');

    await redisCache.invalidateByTags(tags);
    console.log(`🗑️ Cache de estadísticas invalidado: ${type || 'todas'}`);
  }

  static async invalidateDashboardCache() {
    await redisCache.invalidateByTags(['dashboard', 'stats']);
    console.log('🗑️ Cache del dashboard invalidado');
  }

  // ===========================================
  // INVALIDACIÓN PARA PUSH NOTIFICATIONS
  // ===========================================

  static async invalidatePushStatsCache() {
    await redisCache.invalidateByTag('push');
    console.log('🗑️ Cache de push notifications invalidado');
  }

  // ===========================================
  // INVALIDACIÓN PARA BÚSQUEDAS
  // ===========================================

  static async invalidateSearchCache() {
    await redisCache.invalidateByTag('search');
    console.log('🗑️ Cache de búsquedas invalidado');
  }

  // ===========================================
  // LIMPIEZA GENERAL
  // ===========================================

  static async clearAllCache() {
    await redisCache.clear();
    console.log('🧹 Todo el cache ha sido limpiado');
  }

  static async clearExpiredCache() {
    // Redis automáticamente expira las keys, pero podemos hacer limpieza manual si es necesario
    const info = await redisCache.getCacheInfo();
    console.log(`📊 Estado del cache: ${info.keys} keys almacenadas`);
    return info;
  }
}

// ===========================================
// DECORADORES PARA AUTO-INVALIDACIÓN
// ===========================================

export function AutoInvalidateCache(options: CacheInvalidationOptions = {}) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        // Ejecutar el método original
        const result = await method.apply(this, args);

        // Invalidar cache basado en las opciones
        if (options.tags && options.tags.length > 0) {
          await redisCache.invalidateByTags(options.tags);
        }

        if (options.patterns && options.patterns.length > 0) {
          for (const pattern of options.patterns) {
            await redisCache.clear(pattern);
          }
        }

        return result;
      } catch (error) {
        console.error(`Error en método con auto-invalidación ${propertyName}:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}

// ===========================================
// FUNCIONES DE CONVENIENCIA PARA SERVICIOS
// ===========================================

export const cacheInvalidation = {
  // Para artículos
  onArticleCreate: (article: any) => CacheMiddleware.invalidateArticleCache(
    article.id,
    article.category,
    article.tags?.split(',')
  ),

  onArticleUpdate: (articleId: number, category?: string, tags?: string[]) =>
    CacheMiddleware.invalidateArticleCache(articleId, category, tags),

  onArticleDelete: (articleId: number, category?: string) =>
    CacheMiddleware.invalidateArticleCache(articleId, category),

  onCategoryUpdate: (category: string) => CacheMiddleware.invalidateCategoryCache(category),

  // Para estadísticas
  onStatsUpdate: (type?: string) => CacheMiddleware.invalidateStatsCache(type),

  onDashboardUpdate: () => CacheMiddleware.invalidateDashboardCache(),

  // Para push notifications
  onPushUpdate: () => CacheMiddleware.invalidatePushStatsCache(),

  // Para búsquedas
  onSearchUpdate: () => CacheMiddleware.invalidateSearchCache(),

  // Limpieza general
  clearAll: () => CacheMiddleware.clearAllCache(),
  clearExpired: () => CacheMiddleware.clearExpiredCache()
};

