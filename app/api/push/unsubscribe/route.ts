import { NextRequest, NextResponse } from 'next/server';

// POST /api/push/unsubscribe - Desuscribir de notificaciones push
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json(
        {
          success: false,
          error: 'Endpoint requerido',
          message: 'Debe proporcionar el endpoint de la suscripción'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para eliminar la suscripción de la base de datos
    // Por ahora, devolver una respuesta mock

    return NextResponse.json({
      success: true,
      message: 'Suscripción a notificaciones push eliminada exitosamente',
      data: {
        endpoint,
        unsubscribedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Error en POST /api/push/unsubscribe:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al desuscribirse',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}