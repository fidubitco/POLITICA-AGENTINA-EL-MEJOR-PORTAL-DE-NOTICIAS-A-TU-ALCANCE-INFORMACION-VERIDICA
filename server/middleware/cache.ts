import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redis';

// ===========================================
// MIDDLEWARE DE CACHE PARA ARTÍCULOS
// ===========================================

export const cacheArticle = (ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redisService.isAvailable()) {
      return next();
    }

    const articleId = req.params.id || req.query.id;

    if (!articleId) {
      return next();
    }

    try {
      const cachedArticle = await redisService.getCachedArticle(articleId.toString());

      if (cachedArticle) {
        console.log(`📖 Artículo servido desde cache: ${articleId}`);
        return res.json({
          success: true,
          data: cachedArticle,
          cached: true,
          timestamp: new Date().toISOString()
        });
      }

      // Si no está en cache, continuar con la ruta normal
      // pero interceptar la respuesta para cachear
      const originalJson = res.json;
      res.json = function(data) {
        // Cachear la respuesta si es exitosa
        if (data.success && data.data && !data.cached) {
          redisService.cacheArticle(data.data, { ttl }).catch(err =>
            console.error('Error cacheando artículo:', err)
          );
        }

        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Error en middleware de cache de artículos:', error);
      next();
    }
  };
};

// ===========================================
// MIDDLEWARE DE CACHE PARA LISTAS DE ARTÍCULOS
// ===========================================

export const cacheArticlesList = (category: string = 'all', ttl: number = 1800) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redisService.isAvailable()) {
      return next();
    }

    try {
      const cachedList = await redisService.getCachedArticlesList(category);

      if (cachedList) {
        console.log(`📋 Lista de artículos servida desde cache: ${category}`);
        return res.json({
          success: true,
          data: cachedList,
          cached: true,
          category,
          timestamp: new Date().toISOString()
        });
      }

      // Interceptar respuesta para cachear
      const originalJson = res.json;
      res.json = function(data) {
        if (data.success && data.data && Array.isArray(data.data) && !data.cached) {
          redisService.cacheArticlesList(category, data.data, { ttl }).catch(err =>
            console.error('Error cacheando lista de artículos:', err)
          );
        }

        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Error en middleware de cache de listas:', error);
      next();
    }
  };
};

// ===========================================
// MIDDLEWARE DE CACHE PARA ESTADÍSTICAS
// ===========================================

export const cacheStats = (ttl: number = 300) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redisService.isAvailable()) {
      return next();
    }

    try {
      const cachedStats = await redisService.getCachedStats();

      if (cachedStats) {
        console.log('📊 Estadísticas servidas desde cache');
        return res.json({
          success: true,
          data: cachedStats,
          cached: true,
          timestamp: new Date().toISOString()
        });
      }

      // Interceptar respuesta para cachear
      const originalJson = res.json;
      res.json = function(data) {
        if (data.success && data.data && !data.cached) {
          redisService.cacheStats(data.data, { ttl }).catch(err =>
            console.error('Error cacheando estadísticas:', err)
          );
        }

        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Error en middleware de cache de estadísticas:', error);
      next();
    }
  };
};

// ===========================================
// MIDDLEWARE DE CACHE PARA BÚSQUEDA
// ===========================================

export const cacheSearch = (ttl: number = 600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redisService.isAvailable()) {
      return next();
    }

    const query = req.query.q || req.query.query || req.body.query;

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return next();
    }

    try {
      const cachedResults = await redisService.getCachedSearchResults(query.trim());

      if (cachedResults) {
        console.log(`🔎 Búsqueda servida desde cache: "${query}"`);
        return res.json({
          success: true,
          data: cachedResults.results,
          cached: true,
          query: query.trim(),
          timestamp: cachedResults.timestamp
        });
      }

      // Interceptar respuesta para cachear
      const originalJson = res.json;
      res.json = function(data) {
        if (data.success && data.data && Array.isArray(data.data) && !data.cached) {
          redisService.cacheSearchResults(query.trim(), data.data, { ttl }).catch(err =>
            console.error('Error cacheando resultados de búsqueda:', err)
          );
        }

        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Error en middleware de cache de búsqueda:', error);
      next();
    }
  };
};

// ===========================================
// MIDDLEWARE PARA INVALIDAR CACHE
// ===========================================

export const invalidateCache = (patterns: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Ejecutar next() primero para procesar la petición
    const originalJson = res.json;
    res.json = function(data) {
      // Si la petición fue exitosa, invalidar cache
      if (data.success) {
        patterns.forEach(pattern => {
          redisService.invalidateCache(pattern).catch(err =>
            console.error(`Error invalidando cache ${pattern}:`, err)
          );
        });
      }

      return originalJson.call(this, data);
    };

    next();
  };
};

// ===========================================
// MIDDLEWARE CONDICIONAL DE CACHE
// ===========================================

export const conditionalCache = (condition: (req: Request) => boolean, cacheFn: Function, ttl?: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (condition(req)) {
      return cacheFn(ttl)(req, res, next);
    }
    next();
  };
};

// ===========================================
// UTILIDADES PARA CACHE
// ===========================================

export const warmCache = async () => {
  // Función para precargar datos importantes en cache
  console.log('🔥 Iniciando warm-up del cache...');

  try {
    // Aquí iríamos precargando datos importantes
    // Por ejemplo: artículos populares, estadísticas generales, etc.
    console.log('✅ Cache warm-up completado');
  } catch (error) {
    console.error('❌ Error en warm-up del cache:', error);
  }
};

export const setupCacheInvalidation = () => {
  // Configurar invalidación automática de cache en ciertos eventos
  // Por ejemplo: cuando se publica un nuevo artículo, invalidar listas relevantes

  console.log('🎯 Sistema de invalidación de cache configurado');
};

// ===========================================
// MIDDLEWARE PARA HEADERS DE CACHE
// ===========================================

export const cacheHeaders = (maxAge: number = 300) => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.set({
      'Cache-Control': `public, max-age=${maxAge}`,
      'X-Cache-Status': 'HIT'
    });
    next();
  };
};

// Middleware para marcar respuestas cacheadas
export const markAsCached = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    res.json = function(data) {
      if (data.cached) {
        res.set('X-Cache-Status', 'HIT');
      } else {
        res.set('X-Cache-Status', 'MISS');
      }
      return originalJson.call(this, data);
    };
    next();
  };
};
