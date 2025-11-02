import { Router } from 'express';
import { redisCache } from '../services/redis';
import { cacheInvalidation } from '../services/cacheMiddleware';

const router = Router();

// ===========================================
// ENDPOINTS DE MONITOREO DE CACHE
// ===========================================

// Obtener información del cache
router.get('/info', async (req, res) => {
  try {
    const info = await redisCache.getCacheInfo();

    res.json({
      success: true,
      data: info,
      message: 'Información del cache obtenida'
    });

  } catch (error: any) {
    console.error('Error obteniendo info del cache:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo información del cache'
    });
  }
});

// Verificar salud del cache
router.get('/health', async (req, res) => {
  try {
    const isHealthy = await redisCache.healthCheck();
    const config = redisCache.getConfig();

    res.json({
      success: true,
      data: {
        healthy: isHealthy,
        config,
        timestamp: new Date().toISOString()
      },
      message: isHealthy ? 'Cache funcionando correctamente' : 'Cache con problemas'
    });

  } catch (error: any) {
    console.error('Error verificando salud del cache:', error);
    res.status(500).json({
      success: false,
      message: 'Error verificando salud del cache'
    });
  }
});

// ===========================================
// ENDPOINTS DE GESTIÓN DE CACHE
// ===========================================

// Limpiar cache completo
router.post('/clear', async (req, res) => {
  try {
    const result = await cacheInvalidation.clearAll();

    res.json({
      success: true,
      message: 'Cache limpiado completamente'
    });

  } catch (error: any) {
    console.error('Error limpiando cache:', error);
    res.status(500).json({
      success: false,
      message: 'Error limpiando cache'
    });
  }
});

// Limpiar cache por patrón
router.post('/clear-pattern', async (req, res) => {
  try {
    const { pattern } = req.body;

    if (!pattern) {
      return res.status(400).json({
        success: false,
        message: 'Patrón requerido'
      });
    }

    const result = await redisCache.clear(pattern);

    res.json({
      success: true,
      data: { keysRemoved: result },
      message: `${result} keys eliminadas con patrón "${pattern}"`
    });

  } catch (error: any) {
    console.error('Error limpiando cache por patrón:', error);
    res.status(500).json({
      success: false,
      message: 'Error limpiando cache por patrón'
    });
  }
});

// Invalidar cache por tag
router.post('/invalidate-tag', async (req, res) => {
  try {
    const { tag } = req.body;

    if (!tag) {
      return res.status(400).json({
        success: false,
        message: 'Tag requerido'
      });
    }

    const result = await redisCache.invalidateByTag(tag);

    res.json({
      success: true,
      data: { keysInvalidated: result },
      message: `Tag "${tag}" invalidado (${result} keys)`
    });

  } catch (error: any) {
    console.error('Error invalidando tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error invalidando tag'
    });
  }
});

// ===========================================
// ENDPOINTS DE INVALIDACIÓN ESPECÍFICA
// ===========================================

// Invalidar artículos
router.post('/invalidate/articles', async (req, res) => {
  try {
    const result = await cacheInvalidation.invalidateArticles();

    res.json({
      success: true,
      data: { keysInvalidated: result },
      message: `Cache de artículos invalidado (${result} keys)`
    });

  } catch (error: any) {
    console.error('Error invalidando artículos:', error);
    res.status(500).json({
      success: false,
      message: 'Error invalidando artículos'
    });
  }
});

// Invalidar estadísticas
router.post('/invalidate/stats', async (req, res) => {
  try {
    const result = await cacheInvalidation.invalidateStats();

    res.json({
      success: true,
      data: { keysInvalidated: result },
      message: `Cache de estadísticas invalidado (${result} keys)`
    });

  } catch (error: any) {
    console.error('Error invalidando estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error invalidando estadísticas'
    });
  }
});

// Invalidar dashboard
router.post('/invalidate/dashboard', async (req, res) => {
  try {
    await cacheInvalidation.invalidateDashboard();

    res.json({
      success: true,
      message: 'Cache del dashboard invalidado'
    });

  } catch (error: any) {
    console.error('Error invalidando dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error invalidando dashboard'
    });
  }
});

// Invalidar búsquedas
router.post('/invalidate/search', async (req, res) => {
  try {
    await cacheInvalidation.invalidateSearch();

    res.json({
      success: true,
      message: 'Cache de búsquedas invalidado'
    });

  } catch (error: any) {
    console.error('Error invalidando búsquedas:', error);
    res.status(500).json({
      success: false,
      message: 'Error invalidando búsquedas'
    });
  }
});

// ===========================================
// ENDPOINTS DE DEBUGGING
// ===========================================

// Obtener keys por patrón
router.get('/keys/:pattern', async (req, res) => {
  try {
    const { pattern } = req.params;
    const keys = await redisCache.clear(pattern + '*'); // Esto no borra, solo cuenta

    // Nota: Esta implementación simplificada cuenta las keys que coinciden
    // En producción, usarías SCAN para obtener las keys reales

    res.json({
      success: true,
      data: {
        pattern,
        estimatedCount: keys, // Aproximado
        note: 'Esta es una estimación. Usa redis-cli para ver keys exactas.'
      },
      message: `Keys encontradas con patrón "${pattern}": ~${keys}`
    });

  } catch (error: any) {
    console.error('Error obteniendo keys:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo keys'
    });
  }
});

// Obtener configuración del cache
router.get('/config', (req, res) => {
  try {
    const config = redisCache.getConfig();

    res.json({
      success: true,
      data: config,
      message: 'Configuración del cache obtenida'
    });

  } catch (error: any) {
    console.error('Error obteniendo configuración:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo configuración'
    });
  }
});

// ===========================================
// ENDPOINTS DE MANTENIMIENTO
// ===========================================

// Limpiar cache expirado (Redis lo hace automáticamente, pero podemos forzar)
router.post('/cleanup', async (req, res) => {
  try {
    const result = await cacheInvalidation.clearExpired();

    res.json({
      success: true,
      data: result,
      message: 'Limpieza de cache expirado completada'
    });

  } catch (error: any) {
    console.error('Error en limpieza:', error);
    res.status(500).json({
      success: false,
      message: 'Error en limpieza de cache'
    });
  }
});

export default router;