import { NextRequest, NextResponse } from 'next/server';

// POST /api/push/send-all - Enviar notificación push a todos los suscriptores
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: messageBody, url, data } = body;

    if (!title || !messageBody) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos requeridos faltantes',
          message: 'Título y cuerpo del mensaje son obligatorios'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para enviar notificaciones push a todos los suscriptores
    // Por ahora, devolver una respuesta mock

    return NextResponse.json({
      success: true,
      message: 'Notificación enviada a todos los suscriptores',
      data: {
        title,
        body: messageBody,
        url,
        sentAt: new Date().toISOString(),
        subscribers: 1250 // Número mock de suscriptores
      }
    });

  } catch (error: any) {
    console.error('Error en POST /api/push/send-all:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al enviar notificación',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}