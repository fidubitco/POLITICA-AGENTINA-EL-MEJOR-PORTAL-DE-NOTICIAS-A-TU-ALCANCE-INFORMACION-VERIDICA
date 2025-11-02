import { NextRequest, NextResponse } from 'next/server';

// GET /api/articles/category/[category] - Obtener artículos por categoría
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Aquí iría la lógica para obtener artículos por categoría de la base de datos
    // Por ahora, devolver datos mock según la categoría
    const mockArticlesByCategory = {
      'Política': [
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
          tags: ['Milei', 'Economía', 'Reformas']
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
          publishedAt: new Date().toISOString(),
          tags: ['Kirchner', 'Pensiones', 'Legislación']
        }
      ],
      'Economía': [
        {
          id: '3',
          title: 'Dólar blue rompe barrera de los $1500',
          excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
          category: 'Economía',
          author: 'Equipo Editorial',
          views: 18750,
          likes: 1243,
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&q=80&auto=format',
          publishedAt: new Date().toISOString(),
          tags: ['Dólar', 'Inflación', 'Mercado']
        }
      ],
      'Judicial': [
        {
          id: '4',
          title: 'Suprema Corte analiza caso de corrupción institucional',
          excerpt: 'El máximo tribunal evalúa denuncias sobre irregularidades en contratos del Estado.',
          category: 'Judicial',
          author: 'Equipo Editorial',
          views: 9320,
          likes: 567,
          imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop&q=80&auto=format',
          publishedAt: new Date().toISOString(),
          tags: ['Suprema Corte', 'Corrupción', 'Justicia']
        }
      ]
    };

    const categoryArticles = mockArticlesByCategory[category as keyof typeof mockArticlesByCategory] || [];

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = categoryArticles.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedArticles,
      category,
      pagination: {
        page,
        limit,
        total: categoryArticles.length,
        totalPages: Math.ceil(categoryArticles.length / limit)
      }
    });

  } catch (error: any) {
    console.error('Error en GET /api/articles/category/[category]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener artículos por categoría',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}
