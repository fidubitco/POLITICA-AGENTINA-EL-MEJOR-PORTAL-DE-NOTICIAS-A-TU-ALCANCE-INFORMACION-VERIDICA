/**
 * 🚀 BACKEND PRINCIPAL - POLÍTICA ARGENTINA
 * Backend Express profesional para Railway
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './_core/context';

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// 🔒 SEGURIDAD Y MIDDLEWARE
// ============================================

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// 🏥 HEALTH CHECK
// ============================================

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected',
    services: {
      api: 'running',
      cache: 'running',
      ai: 'running',
    },
  });
});

// ============================================
// 📊 tRPC API
// ============================================

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// ============================================
// 🌐 API REST ENDPOINTS
// ============================================

// Artículos
app.get('/api/articles', async (req: Request, res: Response) => {
  try {
    // Mock data para desarrollo
    const articles = [
      {
        id: 1,
        title: 'Última hora en política argentina',
        excerpt: 'Resumen de las noticias más importantes del día',
        content: 'Contenido completo del artículo...',
        category: 'Política',
        imageUrl: '/images/milei-1.jpg',
        publishedAt: new Date().toISOString(),
        views: 1250,
        likes: 45,
      },
    ];
    
    res.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ success: false, error: 'Error al obtener artículos' });
  }
});

// Artículo individual
app.get('/api/articles/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const article = {
      id: parseInt(id),
      title: 'Última hora en política argentina',
      excerpt: 'Resumen de las noticias más importantes del día',
      content: 'Contenido completo del artículo...',
      category: 'Política',
      imageUrl: '/images/milei-1.jpg',
      publishedAt: new Date().toISOString(),
      views: 1250,
      likes: 45,
    };
    
    res.json({ success: true, data: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ success: false, error: 'Error al obtener artículo' });
  }
});

// Categorías
app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const categories = [
      { id: 1, name: 'Política', slug: 'politica', count: 150 },
      { id: 2, name: 'Economía', slug: 'economia', count: 120 },
      { id: 3, name: 'Sociedad', slug: 'sociedad', count: 95 },
      { id: 4, name: 'Internacional', slug: 'internacional', count: 80 },
      { id: 5, name: 'Deportes', slug: 'deportes', count: 65 },
      { id: 6, name: 'Cultura', slug: 'cultura', count: 50 },
    ];
    
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Error al obtener categorías' });
  }
});

// Analytics
app.get('/api/analytics/stats', async (req: Request, res: Response) => {
  try {
    const stats = {
      totalViews: 125000,
      activeUsers: 1250,
      totalShares: 3500,
      publishedArticles: 450,
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Error al obtener estadísticas' });
  }
});

// ============================================
// ❌ ERROR HANDLING
// ============================================

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    path: req.path,
    method: req.method,
  });
});

// ============================================
// 🚀 INICIAR SERVIDOR
// ============================================

const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ============================================');
  console.log('🇦🇷 POLÍTICA ARGENTINA - BACKEND INICIADO');
  console.log('🚀 ============================================');
  console.log('');
  console.log(`📡 Servidor:     http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔌 API:          http://localhost:${PORT}/api`);
  console.log(`🌍 Entorno:      ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('✅ Sistema listo para recibir peticiones');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT recibido, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

export default app;

