import { NextRequest, NextResponse } from 'next/server';

// GET /api/stats/article/[id] - Obtener estadísticas de un artículo específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Aquí iría la lógica para obtener estadísticas del artículo de la base de datos
    // Por ahora, devolver datos mock
    const articleStats = {
      articleId: id,
      views: {
        total: 15420,
        today: 245,
        thisWeek: 1820,
        thisMonth: 5420,
        history: [
          { date: '2024-11-20', views: 120 },
          { date: '2024-11-21', views: 180 },
          { date: '2024-11-22', views: 245 }
        ]
      },
      engagement: {
        likes: 892,
        shares: 156,
        comments: 43,
        bookmarks: 67,
        avgTimeSpent: 180 // segundos
      },
      demographics: {
        ageGroups: [
          { range: '18-24', percentage: 15 },
          { range: '25-34', percentage: 35 },
          { range: '35-44', percentage: 28 },
          { range: '45-54', percentage: 15 },
          { range: '55+', percentage: 7 }
        ],
        regions: [
          { name: 'Buenos Aires', percentage: 42 },
          { name: 'Córdoba', percentage: 12 },
          { name: 'Santa Fe', percentage: 10 },
          { name: 'Mendoza', percentage: 8 },
          { name: 'Otras', percentage: 28 }
        ]
      },
      sources: {
        direct: 45,
        search: 30,
        social: 15,
        referral: 10
      },
      performance: {
        loadTime: 1.2,
        bounceRate: 25,
        scrollDepth: 75,
        seoScore: 85
      }
    };

    return NextResponse.json({
      success: true,
      data: articleStats
    });

  } catch (error: any) {
    console.error('Error en GET /api/stats/article/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener estadísticas del artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}
