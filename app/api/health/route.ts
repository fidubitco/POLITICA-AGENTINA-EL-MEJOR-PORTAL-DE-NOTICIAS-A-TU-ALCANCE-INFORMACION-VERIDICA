import { NextRequest, NextResponse } from 'next/server';

// GET /api/health - Health check del servicio
export async function GET(request: NextRequest) {
  try {
    // Aquí iría la lógica para verificar el estado de los servicios
    // (base de datos, Redis, servicios externos, etc.)
    // Por ahora, devolver un health check básico

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: 'healthy', // En producción verificar conexión real
        redis: 'healthy',     // En producción verificar conexión real
        ollama: 'healthy',    // En producción verificar servicio real
        scraping: 'healthy'   // En producción verificar servicios de scraping
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };

    return NextResponse.json({
      success: true,
      data: healthStatus
    });

  } catch (error: any) {
    console.error('Error en GET /api/health:', error);

    const errorHealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      services: {
        database: 'unknown',
        redis: 'unknown',
        ollama: 'unknown',
        scraping: 'unknown'
      }
    };

    return NextResponse.json(
      {
        success: false,
        data: errorHealthStatus,
        message: 'Servicio no saludable'
      },
      { status: 503 }
    );
  }
}

