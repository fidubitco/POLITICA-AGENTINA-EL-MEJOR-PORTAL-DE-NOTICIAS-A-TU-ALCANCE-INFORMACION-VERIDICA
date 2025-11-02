import { NextRequest, NextResponse } from 'next/server';

// GET /api/push/vapid-public-key - Obtener clave pública VAPID
export async function GET(request: NextRequest) {
  try {
    // Aquí iría la lógica para obtener la clave VAPID de las variables de entorno
    // Por ahora, devolver una clave mock (en producción usar variable de entorno)
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BKxQzA7vKJwzdXmE9vXa9Q8Q5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5';

    return NextResponse.json({
      publicKey: vapidPublicKey
    });

  } catch (error: any) {
    console.error('Error en GET /api/push/vapid-public-key:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener clave VAPID',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}