import { NextRequest, NextResponse } from 'next/server';

// POST /api/cache/clear - Limpiar cache
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pattern = searchParams.get('pattern');

    // Aquí iría la lógica para limpiar el cache
    // Por ahora, devolver una respuesta mock

    if (pattern) {
      // Limpiar cache por patrón
      return NextResponse.json({
        success: true,
        message: `Cache limpiado para el patrón: ${pattern}`,
        data: {
          pattern,
          clearedAt: new Date().toISOString()
        }
      });
    } else {
      // Limpiar todo el cache
      return NextResponse.json({
        success: true,
        message: 'Todo el cache ha sido limpiado',
        data: {
          clearedAt: new Date().toISOString(),
          cacheCleared: true
        }
      });
    }

  } catch (error: any) {
    console.error('Error en POST /api/cache/clear:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al limpiar cache',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}