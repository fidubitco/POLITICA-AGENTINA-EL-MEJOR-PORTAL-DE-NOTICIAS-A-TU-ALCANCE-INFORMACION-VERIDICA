/**
 * 🚀 BACKEND ENTERPRISE GRADE - tRPC + Express
 * Sistema completo de API con IA integrada
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './context';
import rssProxyRouter from './routes/rss-proxy';
import { 
  handle404, 
  handle403, 
  handleErrors, 
  requestLogger, 
  corsHandler, 
  securityHeaders 
} from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad y logging
app.use(requestLogger);
app.use(securityHeaders);
app.use(corsHandler);

// Compression
app.use(compression());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// RSS Proxy endpoint
app.use('/api', rssProxyRouter);

// Sitemap endpoints
import sitemapRouter from './routes/sitemap';
app.use('/', sitemapRouter);

// News Aggregator endpoints
import newsAggregatorRouter from './routes/news-aggregator';
app.use('/api/news', newsAggregatorRouter);

// tRPC endpoint
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Error handling middleware
app.use(handle404);
app.use(handle403);
app.use(handleErrors);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 BACKEND ENTERPRISE GRADE - RUNNING                   ║
║                                                            ║
║   📡 Server:      http://localhost:${PORT}                    ║
║   🔌 API:         http://localhost:${PORT}/api/trpc           ║
║   ❤️  Health:      http://localhost:${PORT}/health            ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}                    ║
║   🤖 Telegram Bot: @capitansparrowia_bot                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export { app };
