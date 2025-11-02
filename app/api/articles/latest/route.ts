import { NextRequest, NextResponse } from 'next/server';

// GET /api/articles/latest - Obtener artículos más recientes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Aquí iría la lógica para obtener los artículos más recientes de la base de datos
    // Por ahora, devolver datos mock
    const mockLatestArticles = [
      {
        id: '1',
        title: 'Milei anuncia nuevas medidas económicas en el Congreso',
        excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
        category: 'Política',
        author: 'Equipo Editorial',
        views: 15420,
        likes: 892,
        imageUrl: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=400&h=225&fit=crop&q=80&auto=format',
        publishedAt: new Date().toISOString(),
        isBreaking: false,
        isTrending: true
      },
      {
        id: '3',
        title: 'Dólar blue rompe barrera de los $1500',
        excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
        category: 'Economía',
        author: 'Equipo Editorial',
        views: 18750,
        likes: 1243,
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&q=80&auto=format',
        publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
        isBreaking: true,
        isTrending: true
      },
      {
        id: '2',
        title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
        excerpt: 'La Vicepresidenta propone nuevas modificaciones al sistema previsional argentino.',
        category: 'Política',
        author: 'Equipo Editorial',
        views: 12890,
        likes: 756,
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop&q=80&auto=format',
        publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
        isBreaking: false,
        isTrending: false
      },
      {
        id: '4',
        title: 'Suprema Corte analiza caso de corrupción institucional',
        excerpt: 'El máximo tribunal evalúa denuncias sobre irregularidades en contratos del Estado.',
        category: 'Judicial',
        author: 'Equipo Editorial',
        views: 9320,
        likes: 567,
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop&q=80&auto=format',
        publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 horas atrás
        isBreaking: false,
        isTrending: false
      },
      {
        id: '5',
        title: 'Nuevo acuerdo comercial con la Unión Europea',
        excerpt: 'Argentina firma tratado de libre comercio que abre mercados europeos.',
        category: 'Internacional',
        author: 'Equipo Editorial',
        views: 11500,
        likes: 789,
        imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=225&fit=crop&q=80&auto=format',
        publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 horas atrás
        isBreaking: false,
        isTrending: false
      },
      {
        id: '6',
        title: 'Reforma educativa genera debate nacional',
        excerpt: 'Expertos discuten cambios en el sistema educativo argentino.',
        category: 'Sociedad',
        author: 'Equipo Editorial',
        views: 8760,
        likes: 432,
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=225&fit=crop&q=80&auto=format',
        publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 horas atrás
        isBreaking: false,
        isTrending: false
      }
    ];

    // Limitar resultados según el parámetro limit
    const limitedArticles = mockLatestArticles.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedArticles,
      limit,
      total: mockLatestArticles.length
    });

  } catch (error: any) {
    console.error('Error en GET /api/articles/latest:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener artículos recientes',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

