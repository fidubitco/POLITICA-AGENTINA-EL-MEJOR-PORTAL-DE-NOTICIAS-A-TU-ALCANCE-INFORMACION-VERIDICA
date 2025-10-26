import { Router } from 'express';
import { db } from './database';
import { verifyToken } from './auth';
import { withCache, invalidateStatsCache } from '../services/cache';

const router = Router();

/**
 * GET /api/analytics/dashboard
 * Obtener métricas principales del dashboard
 */
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const stats = await withCache(
      'analytics:dashboard',
      60, // 1 minuto
      async () => {
        // Total de vistas
        const viewsResult = await db.query(
          'SELECT SUM(views) as total FROM articles'
        );
        const totalViews = viewsResult[0]?.total || 0;
        
        // Usuarios activos (últimas 24 horas)
        const activeUsersResult = await db.query(
          `SELECT COUNT(DISTINCT user_id) as count 
           FROM analytics 
           WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)`
        );
        const activeUsers = activeUsersResult[0]?.count || 0;
        
        // Total de shares
        const sharesResult = await db.query(
          'SELECT SUM(shares) as total FROM articles'
        );
        const totalShares = sharesResult[0]?.total || 0;
        
        // Total de artículos publicados
        const articlesResult = await db.query(
          "SELECT COUNT(*) as count FROM articles WHERE status = 'published'"
        );
        const totalArticles = articlesResult[0]?.count || 0;
        
        return {
          totalViews,
          activeUsers,
          totalShares,
          totalArticles,
        };
      }
    );
    
    res.json(stats);
  } catch (error) {
    console.error('Error obteniendo stats del dashboard:', error);
    res.status(500).json({ error: 'Error obteniendo estadísticas' });
  }
});

/**
 * GET /api/analytics/views-by-day
 * Obtener vistas por día (últimos 30 días)
 */
router.get('/views-by-day', verifyToken, async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    
    const data = await withCache(
      `analytics:views-by-day:${days}`,
      300, // 5 minutos
      async () => {
        return await db.query(
          `SELECT 
            DATE(created_at) as date,
            SUM(views) as views,
            SUM(unique_visitors) as visitors
          FROM analytics
          WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
          GROUP BY DATE(created_at)
          ORDER BY date ASC`,
          [days]
        );
      }
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo vistas por día:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

/**
 * GET /api/analytics/articles-by-category
 * Obtener artículos por categoría
 */
router.get('/articles-by-category', verifyToken, async (req, res) => {
  try {
    const data = await withCache(
      'analytics:articles-by-category',
      300, // 5 minutos
      async () => {
        return await db.query(
          `SELECT 
            c.name as category,
            COUNT(a.id) as count,
            SUM(a.views) as total_views
          FROM articles a
          LEFT JOIN categories c ON a.category_id = c.id
          WHERE a.status = 'published'
          GROUP BY c.name
          ORDER BY count DESC`
        );
      }
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo artículos por categoría:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

/**
 * GET /api/analytics/top-articles
 * Obtener artículos más populares
 */
router.get('/top-articles', verifyToken, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    
    const data = await withCache(
      `analytics:top-articles:${limit}`,
      300, // 5 minutos
      async () => {
        return await db.query(
          `SELECT 
            a.id,
            a.title,
            a.slug,
            a.views,
            a.shares,
            a.likes,
            c.name as category,
            u.username as author
          FROM articles a
          LEFT JOIN categories c ON a.category_id = c.id
          LEFT JOIN users u ON a.author_id = u.id
          WHERE a.status = 'published'
          ORDER BY a.views DESC
          LIMIT ?`,
          [limit]
        );
      }
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo top artículos:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

/**
 * GET /api/analytics/users-by-language
 * Obtener distribución de usuarios por idioma
 */
router.get('/users-by-language', verifyToken, async (req, res) => {
  try {
    const data = await withCache(
      'analytics:users-by-language',
      600, // 10 minutos
      async () => {
        // Simular datos por ahora (en producción vendría de analytics reales)
        return [
          { language: 'Español', users: 15420, percentage: 68 },
          { language: 'English', users: 4850, percentage: 21 },
          { language: 'Português', users: 1820, percentage: 8 },
          { language: 'Français', users: 680, percentage: 3 },
        ];
      }
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo usuarios por idioma:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

/**
 * GET /api/analytics/recent-activity
 * Obtener actividad reciente
 */
router.get('/recent-activity', verifyToken, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    
    const data = await withCache(
      `analytics:recent-activity:${limit}`,
      60, // 1 minuto
      async () => {
        return await db.query(
          `SELECT 
            a.id,
            a.title,
            a.status,
            a.created_at,
            a.published_at,
            u.username as author,
            c.name as category
          FROM articles a
          LEFT JOIN users u ON a.author_id = u.id
          LEFT JOIN categories c ON a.category_id = c.id
          ORDER BY a.created_at DESC
          LIMIT ?`,
          [limit]
        );
      }
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo actividad reciente:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

/**
 * GET /api/analytics/engagement
 * Obtener métricas de engagement (vistas, shares, likes)
 */
router.get('/engagement', verifyToken, async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    
    const data = await withCache(
      `analytics:engagement:${days}`,
      300, // 5 minutos
      async () => {
        return await db.query(
          `SELECT 
            DATE(created_at) as date,
            SUM(views) as views,
            SUM(shares) as shares,
            SUM(likes) as likes
          FROM analytics
          WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
          GROUP BY DATE(created_at)
          ORDER BY date ASC`,
          [days]
        );
      }
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo engagement:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

/**
 * POST /api/analytics/track
 * Registrar evento de analytics
 */
router.post('/track', async (req, res) => {
  try {
    const { article_id, event_type, user_id, session_id } = req.body;
    
    // Validar datos
    if (!article_id || !event_type) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }
    
    // Registrar evento
    await db.insert('analytics', {
      article_id,
      event_type, // 'view', 'share', 'like'
      user_id: user_id || null,
      session_id: session_id || null,
      created_at: new Date(),
    });
    
    // Actualizar contador en artículo
    if (event_type === 'view') {
      await db.query('UPDATE articles SET views = views + 1 WHERE id = ?', [
        article_id,
      ]);
    } else if (event_type === 'share') {
      await db.query('UPDATE articles SET shares = shares + 1 WHERE id = ?', [
        article_id,
      ]);
    } else if (event_type === 'like') {
      await db.query('UPDATE articles SET likes = likes + 1 WHERE id = ?', [
        article_id,
      ]);
    }
    
    // Invalidar cache
    await invalidateStatsCache();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error registrando evento:', error);
    res.status(500).json({ error: 'Error registrando evento' });
  }
});

/**
 * GET /api/analytics/summary
 * Obtener resumen completo de analytics
 */
router.get('/summary', verifyToken, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const summary = await withCache(
      `analytics:summary:${start_date}:${end_date}`,
      300, // 5 minutos
      async () => {
        const params: any[] = [];
        let whereClause = '';
        
        if (start_date && end_date) {
          whereClause = 'WHERE created_at BETWEEN ? AND ?';
          params.push(start_date, end_date);
        }
        
        const result = await db.query(
          `SELECT 
            COUNT(DISTINCT article_id) as articles_viewed,
            SUM(views) as total_views,
            SUM(unique_visitors) as total_visitors,
            SUM(shares) as total_shares,
            SUM(likes) as total_likes,
            AVG(time_on_page) as avg_time_on_page
          FROM analytics
          ${whereClause}`,
          params
        );
        
        return result[0] || {};
      }
    );
    
    res.json(summary);
  } catch (error) {
    console.error('Error obteniendo resumen:', error);
    res.status(500).json({ error: 'Error obteniendo resumen' });
  }
});

export default router;

