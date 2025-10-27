import { Request, Response, NextFunction } from 'express';

// Middleware para manejar errores 404
export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'El recurso solicitado no existe',
    path: req.path,
    timestamp: new Date().toISOString(),
    status: 404
  });
};

// Middleware para manejar errores 403
export const handle403 = (req: Request, res: Response, next: NextFunction) => {
  res.status(403).json({
    error: 'Forbidden',
    message: 'No tienes permisos para acceder a este recurso',
    path: req.path,
    timestamp: new Date().toISOString(),
    status: 403
  });
};

// Middleware para manejar errores generales
export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.name || 'Error',
    message: message,
    path: req.path,
    timestamp: new Date().toISOString(),
    status: status,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware para logging de requests
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      timestamp: new Date().toISOString()
    };
    
    if (res.statusCode >= 400) {
      console.error('❌ Error Request:', logData);
    } else {
      console.log('✅ Request:', logData);
    }
  });
  
  next();
};

// Middleware para CORS
export const corsHandler = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://politicaargentina.com',
    'https://www.politicaargentina.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
};

// Middleware para seguridad
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  next();
};
