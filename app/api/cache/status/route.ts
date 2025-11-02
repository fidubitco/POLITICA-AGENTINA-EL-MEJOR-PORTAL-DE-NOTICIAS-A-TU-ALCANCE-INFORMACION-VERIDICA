import { NextRequest, NextResponse } from 'next/server';

// GET /api/cache/status - Obtener estado del cache
export async function GET(request: NextRequest) {
  try {
    // Aquí iría la lógica para obtener información del cache
    // Por ahora, devolver datos mock

    const cacheStatus = {
      redis: {
        connected: true,
        memory: {
          used: 245760,
          total: 1048576,
          percentage: 23.4
        },
        keys: 1247,
        hitRate: 94.2
      },
      application: {
        articles: 89,
        stats: 15,
        search: 34,
        scraping: 67
      },
      lastCleanup: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
      uptime: 86400 // segundos
    };

    return NextResponse.json({
      success: true,
      data: cacheStatus
    });

  } catch (error: any) {
    console.error('Error en GET /api/cache/status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener estado del cache',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}