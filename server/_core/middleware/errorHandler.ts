import { Request, Response, NextFunction } from 'express';

// ===========================================
// MIDDLEWARE DE MANEJO DE ERRORES AVANZADO
// Manejo profesional de errores 404, 403, 500
// ===========================================

export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export class AppError extends Error implements CustomError {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// ===========================================
// MANEJO DE ERRORES 404 - NOT FOUND
// ===========================================

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Ruta no encontrada: ${req.originalUrl}`, 404);
  next(error);
};

// ===========================================
// MANEJO DE ERRORES 403 - FORBIDDEN
// ===========================================

export const handleForbidden = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Acceso denegado: ${req.originalUrl}`, 403);
  next(error);
};

// ===========================================
// MANEJO DE ERRORES DE VALIDACIÓN
// ===========================================

export const handleValidationError = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Datos de entrada inválidos: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// ===========================================
// MANEJO DE ERRORES DE DUPLICADO
// ===========================================

export const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Valor duplicado: ${value}. Por favor use otro valor.`;
  return new AppError(message, 400);
};

// ===========================================
// MANEJO DE ERRORES DE CAST
// ===========================================

export const handleCastErrorDB = (err: any): AppError => {
  const message = `Formato inválido: ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// ===========================================
// MANEJO DE ERRORES DE JWT
// ===========================================

export const handleJWTError = (): AppError =>
  new AppError('Token inválido. Por favor inicie sesión nuevamente.', 401);

export const handleJWTExpiredError = (): AppError =>
  new AppError('Su token ha expirado. Por favor inicie sesión nuevamente.', 401);

// ===========================================
// ENVIAR ERRORES EN DESARROLLO
// ===========================================

const sendErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// ===========================================
// ENVIAR ERRORES EN PRODUCCIÓN
// ===========================================

const sendErrorProd = (err: CustomError, res: Response) => {
  // Errores operacionales: enviar mensaje al cliente
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    // Errores de programación: no filtrar detalles
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Algo salió muy mal!',
    });
  }
};

// ===========================================
// MIDDLEWARE PRINCIPAL DE ERRORES
// ===========================================

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if ((err as any).code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

// ===========================================
// MIDDLEWARE DE RATE LIMITING
// ===========================================

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Implementar rate limiting aquí
  next();
};

// ===========================================
// MIDDLEWARE DE SEGURIDAD
// ===========================================

export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Headers de seguridad
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

// ===========================================
// MIDDLEWARE DE CORS OPTIMIZADO
// ===========================================

export const corsOptions = {
  origin: [
    'https://politicaargentina.com',
    'https://www.politicaargentina.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ]
};
