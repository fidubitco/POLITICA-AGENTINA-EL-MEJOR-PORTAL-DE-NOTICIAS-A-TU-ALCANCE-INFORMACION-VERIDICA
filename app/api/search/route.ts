import { NextRequest, NextResponse } from 'next/server';

// GET /api/search - Buscar artículos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Parámetro de búsqueda requerido',
          message: 'Debe proporcionar un término de búsqueda con el parámetro "q"'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para buscar artículos en la base de datos
    // Por ahora, devolver datos mock
    const mockSearchResults = [
      {
        id: '1',
        title: 'Milei anuncia nuevas medidas económicas en el Congreso',
        excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
        category: 'Política',
        author: 'Equipo Editorial',
        publishedAt: new Date().toISOString(),
        relevanceScore: 0.95,
        highlights: {
          title: 'Milei anuncia nuevas medidas <mark>económicas</mark> en el Congreso',
          excerpt: 'El Presidente presentó un paquete de reformas <mark>económicas</mark>...'
        }
      },
      {
        id: '3',
        title: 'Dólar blue rompe barrera de los $1500',
        excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
        category: 'Economía',
        author: 'Equipo Editorial',
        publishedAt: new Date().toISOString(),
        relevanceScore: 0.87,
        highlights: {
          title: 'Dólar blue rompe barrera de los $1500',
          excerpt: 'El mercado paralelo registra un nuevo récord histórico...'
        }
      },
      {
        id: '2',
        title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
        excerpt: 'La Vicepresidenta propone nuevas modificaciones al sistema previsional argentino.',
        category: 'Política',
        author: 'Equipo Editorial',
        publishedAt: new Date().toISOString(),
        relevanceScore: 0.82,
        highlights: {
          title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
          excerpt: 'La Vicepresidenta propone nuevas modificaciones...'
        }
      }
    ];

    // Filtrar por categoría si se especifica
    let filteredResults = mockSearchResults;
    if (category) {
      filteredResults = mockSearchResults.filter(result =>
        result.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Ordenar por relevancia
    filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedResults,
      query,
      total: filteredResults.length,
      pagination: {
        page,
        limit,
        total: filteredResults.length,
        totalPages: Math.ceil(filteredResults.length / limit)
      },
      facets: {
        categories: [
          { name: 'Política', count: 2 },
          { name: 'Economía', count: 1 }
        ],
        dateRanges: [
          { name: 'Última semana', count: 3 },
          { name: 'Último mes', count: 3 }
        ]
      }
    });

  } catch (error: any) {
    console.error('Error en GET /api/search:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error en la búsqueda',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

