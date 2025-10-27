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
import TelegramBotService from './services/TelegramBotService';
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

// tRPC endpoint
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Inicializar Telegram Bot
let telegramBot: TelegramBotService | null = null;

try {
  telegramBot = new TelegramBotService();
  console.log('✅ Telegram Bot iniciado correctamente');
} catch (error) {
  console.error('❌ Error iniciando Telegram Bot:', error);
}

// Error handler
// Error handling middleware
app.use(handle404);
app.use(handle403);
app.use(handleErrors);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Cerrando servidor...');
  if (telegramBot) {
    telegramBot.stop();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 Cerrando servidor...');
  if (telegramBot) {
    telegramBot.stop();
  }
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
