import { NextRequest, NextResponse } from 'next/server';

// POST /api/push/subscribe - Suscribir a notificaciones push
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, userId } = body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        {
          success: false,
          error: 'Suscripción inválida',
          message: 'La suscripción debe incluir endpoint y keys válidos'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para guardar la suscripción en la base de datos
    // Por ahora, devolver una respuesta mock

    return NextResponse.json({
      success: true,
      message: 'Suscripción a notificaciones push creada exitosamente',
      data: {
        endpoint: subscription.endpoint,
        userId,
        subscribedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Error en POST /api/push/subscribe:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al suscribirse',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}