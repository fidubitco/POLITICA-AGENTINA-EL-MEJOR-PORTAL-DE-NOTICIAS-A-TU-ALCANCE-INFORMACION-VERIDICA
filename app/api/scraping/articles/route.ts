import { NextRequest, NextResponse } from 'next/server';

// GET /api/scraping/articles - Obtener artículos scrapeados
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'approved';
    const limit = parseInt(searchParams.get('limit') || '20');

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Estado inválido',
          message: `Los estados válidos son: ${validStatuses.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para obtener artículos scrapeados de la base de datos
    // Por ahora, devolver datos mock
    const mockScrapedArticles = [
      {
        id: 1,
        title: 'Milei confirma reunión con líderes empresariales para mañana',
        content: 'El Presidente Javier Milei confirmó hoy una reunión crucial con líderes del sector empresarial...',
        excerpt: 'Milei confirma reunión con líderes empresariales para mañana',
        imageUrl: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=400&h=225&fit=crop&q=80&auto=format',
        category: 'Política',
        author: 'La Nación',
        source: 'La Nación',
        sourceUrl: 'https://lanacion.com.ar/politica/milei-reunion-empresarios',
        tags: 'Milei, Economía, Empresarios',
        status: 'approved',
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Dólar paralelo mantiene estabilidad por tercera jornada consecutiva',
        content: 'El mercado paralelo del dólar mantuvo hoy una relativa estabilidad...',
        excerpt: 'Dólar paralelo mantiene estabilidad por tercera jornada consecutiva',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&q=80&auto=format',
        category: 'Economía',
        author: 'Ámbito Financiero',
        source: 'Ámbito Financiero',
        sourceUrl: 'https://ambito.com/economia/dolar-paralelo-estabilidad',
        tags: 'Dólar, Economía, Mercado',
        status: 'pending',
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Suprema Corte resolverá caso de corrupción institucional esta semana',
        content: 'La Suprema Corte de Justicia de la Nación anunció que resolverá esta semana...',
        excerpt: 'Suprema Corte resolverá caso de corrupción institucional esta semana',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop&q=80&auto=format',
        category: 'Judicial',
        author: 'Clarín',
        source: 'Clarín',
        sourceUrl: 'https://clarin.com/politica/suprema-corte-corrupcion',
        tags: 'Suprema Corte, Corrupción, Justicia',
        status: 'approved',
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Filtrar por estado
    const filteredArticles = mockScrapedArticles.filter(article => article.status === status);

    // Limitar resultados
    const limitedArticles = filteredArticles.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedArticles,
      status,
      total: filteredArticles.length,
      limit
    });

  } catch (error: any) {
    console.error('Error en GET /api/scraping/articles:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener artículos scrapeados',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

