import { NextRequest, NextResponse } from 'next/server';

// GET /api/stats - Obtener estadísticas generales
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'dashboard' o undefined para stats generales

    // Aquí iría la lógica para obtener estadísticas de la base de datos
    // Por ahora, devolver datos mock

    if (type === 'dashboard') {
      // Estadísticas detalladas para el dashboard
      const dashboardStats = {
        totalArticles: 73,
        publishedArticles: 68,
        draftArticles: 5,
        featuredArticles: 12,
        breakingNews: 5,
        totalViews: 125430,
        totalLikes: 8940,
        totalShares: 2340,
        articlesToday: 3,
        articlesThisWeek: 15,
        articlesThisMonth: 45,
        topCategories: [
          { name: 'Política', count: 25, percentage: 34 },
          { name: 'Economía', count: 18, percentage: 25 },
          { name: 'Sociedad', count: 15, percentage: 21 },
          { name: 'Judicial', count: 10, percentage: 14 },
          { name: 'Internacional', count: 5, percentage: 7 }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'article_published',
            title: 'Nuevo artículo publicado',
            description: 'Milei anuncia nuevas medidas económicas',
            timestamp: new Date().toISOString()
          },
          {
            id: '2',
            type: 'article_viewed',
            title: 'Artículo popular',
            description: 'Cristina Kirchner presenta proyecto de ley',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          }
        ],
        performance: {
          avgLoadTime: 1.2,
          uptime: 99.9,
          errorRate: 0.1,
          cacheHitRate: 95.5
        }
      };

      return NextResponse.json({
        success: true,
        data: dashboardStats
      });
    } else {
      // Estadísticas generales
      const generalStats = {
        totalArticles: 73,
        publishedArticles: 68,
        featuredArticles: 12,
        breakingNews: 5,
        totalViews: 125430,
        totalLikes: 8940
      };

      return NextResponse.json({
        success: true,
        data: generalStats
      });
    }

  } catch (error: any) {
    console.error('Error en GET /api/stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener estadísticas',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}