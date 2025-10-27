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

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://politicaargentina.com', 'https://www.politicaargentina.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

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
