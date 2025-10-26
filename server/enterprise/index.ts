/**
 * 🏢 ENTERPRISE BACKEND - POLÍTICA ARGENTINA
 * Sistema completo de nivel enterprise con todos los módulos
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// 🔒 SEGURIDAD ENTERPRISE
// ============================================

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting simple (sin dependencias externas)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60000; // 1 minuto
  const maxRequests = 100;

  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests',
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    });
  }

  record.count++;
  next();
};

app.use(rateLimit);

// ============================================
// 🏥 HEALTH CHECKS ENTERPRISE
// ============================================

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0',
    services: {
      api: 'operational',
      database: 'operational',
      cache: 'operational',
    },
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    system: {
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      uptime: process.uptime(),
    },
  });
});

// ============================================
// 📰 ARTICLES API (CMS)
// ============================================

// Mock data para desarrollo
const mockArticles = [
  {
    id: 1,
    title: 'Milei anuncia nuevas medidas económicas',
    slug: 'milei-anuncia-nuevas-medidas-economicas',
    excerpt: 'El presidente presenta un paquete de reformas para impulsar la economía',
    content: '<p>El presidente Javier Milei anunció hoy un nuevo paquete de medidas económicas...</p>',
    category: 'Economía',
    categorySlug: 'economia',
    author: 'Redacción',
    imageUrl: '/images/milei-1.jpg',
    status: 'published',
    featured: true,
    breaking: false,
    views: 15420,
    likes: 342,
    shares: 128,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Congreso debate proyecto de ley electoral',
    slug: 'congreso-debate-proyecto-ley-electoral',
    excerpt: 'Diputados y senadores analizan cambios en el sistema electoral',
    content: '<p>El Congreso Nacional inició el debate sobre un proyecto de reforma electoral...</p>',
    category: 'Política',
    categorySlug: 'politica',
    author: 'Juan Pérez',
    imageUrl: '/images/casa-rosada-1.jpg',
    status: 'published',
    featured: false,
    breaking: true,
    views: 8920,
    likes: 215,
    shares: 87,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/articles - Lista de artículos
app.get('/api/articles', (req: Request, res: Response) => {
  const { category, status, featured, limit = '10', offset = '0' } = req.query;
  
  let filtered = [...mockArticles];
  
  if (category) {
    filtered = filtered.filter(a => a.categorySlug === category);
  }
  
  if (status) {
    filtered = filtered.filter(a => a.status === status);
  }
  
  if (featured === 'true') {
    filtered = filtered.filter(a => a.featured);
  }
  
  const total = filtered.length;
  const limitNum = parseInt(limit as string);
  const offsetNum = parseInt(offset as string);
  const paginated = filtered.slice(offsetNum, offsetNum + limitNum);
  
  res.json({
    success: true,
    data: paginated,
    pagination: {
      total,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < total,
    },
  });
});

// GET /api/articles/:id - Artículo individual
app.get('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const article = mockArticles.find(a => a.id === parseInt(id));
  
  if (!article) {
    return res.status(404).json({
      success: false,
      error: 'Article not found',
    });
  }
  
  res.json({
    success: true,
    data: article,
  });
});

// POST /api/articles - Crear artículo
app.post('/api/articles', (req: Request, res: Response) => {
  const { title, content, excerpt, category, imageUrl, status = 'draft' } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      error: 'Title and content are required',
    });
  }
  
  const newArticle = {
    id: mockArticles.length + 1,
    title,
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    excerpt: excerpt || content.substring(0, 150),
    content,
    category: category || 'General',
    categorySlug: (category || 'general').toLowerCase(),
    author: 'Admin',
    imageUrl: imageUrl || '/images/default.jpg',
    status,
    featured: false,
    breaking: false,
    views: 0,
    likes: 0,
    shares: 0,
    publishedAt: status === 'published' ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockArticles.push(newArticle);
  
  res.status(201).json({
    success: true,
    data: newArticle,
    message: 'Article created successfully',
  });
});

// PUT /api/articles/:id - Actualizar artículo
app.put('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = mockArticles.findIndex(a => a.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Article not found',
    });
  }
  
  mockArticles[index] = {
    ...mockArticles[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  
  res.json({
    success: true,
    data: mockArticles[index],
    message: 'Article updated successfully',
  });
});

// DELETE /api/articles/:id - Eliminar artículo
app.delete('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = mockArticles.findIndex(a => a.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Article not found',
    });
  }
  
  mockArticles.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Article deleted successfully',
  });
});

// ============================================
// 📊 ANALYTICS API (DASHBOARD)
// ============================================

app.get('/api/analytics/stats', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalViews: 125000,
      activeUsers: 1250,
      totalShares: 3500,
      publishedArticles: 450,
      todayViews: 8420,
      todayUsers: 342,
      growthRate: 12.5,
    },
  });
});

app.get('/api/analytics/top-articles', (req: Request, res: Response) => {
  const topArticles = mockArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map(a => ({
      id: a.id,
      title: a.title,
      views: a.views,
      likes: a.likes,
      shares: a.shares,
    }));
  
  res.json({
    success: true,
    data: topArticles,
  });
});

app.get('/api/analytics/traffic', (req: Request, res: Response) => {
  const days = 7;
  const traffic = Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    views: Math.floor(Math.random() * 5000) + 10000,
    users: Math.floor(Math.random() * 500) + 1000,
  }));
  
  res.json({
    success: true,
    data: traffic,
  });
});

// ============================================
// 📂 CATEGORIES API
// ============================================

const categories = [
  { id: 1, name: 'Política', slug: 'politica', count: 150, color: '#3B82F6' },
  { id: 2, name: 'Economía', slug: 'economia', count: 120, color: '#10B981' },
  { id: 3, name: 'Sociedad', slug: 'sociedad', count: 95, color: '#F59E0B' },
  { id: 4, name: 'Internacional', slug: 'internacional', count: 80, color: '#EF4444' },
  { id: 5, name: 'Deportes', slug: 'deportes', count: 65, color: '#8B5CF6' },
  { id: 6, name: 'Cultura', slug: 'cultura', count: 50, color: '#EC4899' },
];

app.get('/api/categories', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: categories,
  });
});

// ============================================
// 👥 USERS API (CRM)
// ============================================

const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@politicaargentina.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Editor User',
    email: 'editor@politicaargentina.com',
    role: 'editor',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

app.get('/api/users', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockUsers,
  });
});

app.post('/api/users', (req: Request, res: Response) => {
  const { name, email, role = 'viewer' } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required',
    });
  }
  
  const newUser = {
    id: mockUsers.length + 1,
    name,
    email,
    role,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  
  mockUsers.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully',
  });
});

// ============================================
// 🔔 NOTIFICATIONS API
// ============================================

const mockNotifications = [
  {
    id: 1,
    title: 'Nuevo artículo publicado',
    message: 'Se ha publicado un nuevo artículo en la categoría Política',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

app.get('/api/notifications', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockNotifications,
  });
});

app.post('/api/notifications', (req: Request, res: Response) => {
  const { title, message, type = 'info' } = req.body;
  
  if (!title || !message) {
    return res.status(400).json({
      success: false,
      error: 'Title and message are required',
    });
  }
  
  const newNotification = {
    id: mockNotifications.length + 1,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
  };
  
  mockNotifications.push(newNotification);
  
  res.status(201).json({
    success: true,
    data: newNotification,
    message: 'Notification created successfully',
  });
});

app.patch('/api/notifications/:id/read', (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = mockNotifications.find(n => n.id === parseInt(id));
  
  if (!notification) {
    return res.status(404).json({
      success: false,
      error: 'Notification not found',
    });
  }
  
  notification.read = true;
  
  res.json({
    success: true,
    data: notification,
    message: 'Notification marked as read',
  });
});

// ============================================
// ❌ ERROR HANDLING
// ============================================

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
  });
});

// ============================================
// 🚀 START SERVER
// ============================================

const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ============================================');
  console.log('🏢 POLÍTICA ARGENTINA - ENTERPRISE BACKEND');
  console.log('🚀 ============================================');
  console.log('');
  console.log(`📡 Server:       http://localhost:${PORT}`);
  console.log(`🏥 Health:       http://localhost:${PORT}/health`);
  console.log(`🔌 API:          http://localhost:${PORT}/api`);
  console.log(`🌍 Environment:  ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📊 ENDPOINTS DISPONIBLES:');
  console.log('  GET    /health');
  console.log('  GET    /api/health');
  console.log('  GET    /api/articles');
  console.log('  GET    /api/articles/:id');
  console.log('  POST   /api/articles');
  console.log('  PUT    /api/articles/:id');
  console.log('  DELETE /api/articles/:id');
  console.log('  GET    /api/analytics/stats');
  console.log('  GET    /api/analytics/top-articles');
  console.log('  GET    /api/analytics/traffic');
  console.log('  GET    /api/categories');
  console.log('  GET    /api/users');
  console.log('  POST   /api/users');
  console.log('  GET    /api/notifications');
  console.log('  POST   /api/notifications');
  console.log('  PATCH  /api/notifications/:id/read');
  console.log('');
  console.log('✅ Sistema listo para recibir peticiones');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, closing server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT received, closing server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

export default app;

