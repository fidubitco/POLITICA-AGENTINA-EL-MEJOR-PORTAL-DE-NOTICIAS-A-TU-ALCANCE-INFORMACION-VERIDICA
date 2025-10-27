// Error handling para el frontend
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: any[] = [];

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    // Manejar errores de JavaScript no capturados
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Manejar promesas rechazadas
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'Unhandled Promise Rejection',
        message: event.reason?.message || event.reason,
        stack: event.reason?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Manejar errores de recursos (imágenes, scripts, etc.)
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.logError({
          type: 'Resource Error',
          message: `Failed to load resource: ${(event.target as any).src || (event.target as any).href}`,
          element: event.target,
          timestamp: new Date().toISOString()
        });
      }
    }, true);
  }

  private logError(error: any) {
    this.errorLog.push(error);
    console.error('🚨 Error capturado:', error);

    // En producción, enviar errores al servidor
    if (process.env.NODE_ENV === 'production') {
      this.sendErrorToServer(error);
    }
  }

  private async sendErrorToServer(error: any) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...error,
          userAgent: navigator.userAgent,
          url: window.location.href,
          userId: localStorage.getItem('userId') || 'anonymous'
        })
      });
    } catch (err) {
      console.error('Error enviando error al servidor:', err);
    }
  }

  public getErrorLog() {
    return this.errorLog;
  }

  public clearErrorLog() {
    this.errorLog = [];
  }

  public logCustomError(message: string, details?: any) {
    this.logError({
      type: 'Custom Error',
      message,
      details,
      timestamp: new Date().toISOString()
    });
  }
}

// Inicializar el manejador de errores
export const errorHandler = ErrorHandler.getInstance();

// Función helper para manejar errores en componentes
export const handleComponentError = (error: any, errorInfo?: any) => {
  errorHandler.logCustomError('Component Error', {
    error: error.message || error,
    stack: error.stack,
    errorInfo
  });
};

// Función para manejar errores de API
export const handleApiError = (error: any, endpoint?: string) => {
  errorHandler.logCustomError('API Error', {
    error: error.message || error,
    endpoint,
    status: error.status || error.statusCode,
    response: error.response
  });
};
