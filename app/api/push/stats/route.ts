import { NextRequest, NextResponse } from 'next/server';

// GET /api/push/stats - Obtener estadísticas de push notifications
export async function GET(request: NextRequest) {
  try {
    // Aquí iría la lógica para obtener estadísticas de push notifications
    // Por ahora, devolver datos mock

    const pushStats = {
      total: 1250,
      active: 1180,
      inactive: 70,
      today: {
        sent: 15,
        delivered: 14,
        clicked: 8
      },
      thisWeek: {
        sent: 89,
        delivered: 85,
        clicked: 42
      },
      thisMonth: {
        sent: 345,
        delivered: 332,
        clicked: 156
      },
      clickRate: 45.2,
      deliveryRate: 96.4,
      lastActivity: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: pushStats
    });

  } catch (error: any) {
    console.error('Error en GET /api/push/stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener estadísticas de push',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}