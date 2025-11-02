import { NextRequest, NextResponse } from 'next/server';

// GET /api/articles - Obtener artículos con filtros y paginación
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    // Aquí iría la lógica para obtener artículos de la base de datos
    // Por ahora, devolver datos mock con fallback
    const mockArticles = [
      {
        id: '1',
        title: 'Milei anuncia nuevas medidas económicas en el Congreso',
        category: 'Política',
        excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
        views: 15420,
        likes: 892,
        imageUrl: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=400&h=225&fit=crop&q=80&auto=format',
        author: 'Equipo Editorial',
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
        category: 'Política',
        excerpt: 'La Vicepresidenta propone nuevas modificaciones al sistema previsional argentino.',
        views: 12890,
        likes: 756,
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop&q=80&auto=format',
        author: 'Equipo Editorial',
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Dólar blue rompe barrera de los $1500',
        category: 'Economía',
        excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
        views: 18750,
        likes: 1243,
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&q=80&auto=format',
        author: 'Equipo Editorial',
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      }
    ];

    // Filtrar por categoría si se especifica
    let filteredArticles = mockArticles;
    if (category) {
      filteredArticles = mockArticles.filter(article => article.category.toLowerCase() === category.toLowerCase());
    }

    // Filtrar por búsqueda si se especifica
    if (search) {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedArticles,
      pagination: {
        page,
        limit,
        total: filteredArticles.length,
        totalPages: Math.ceil(filteredArticles.length / limit)
      }
    });

  } catch (error: any) {
    console.error('Error en GET /api/articles:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener artículos',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// POST /api/articles - Crear nuevo artículo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, tags, imageUrl, author, isPublished } = body;

    // Validación básica
    if (!title || !content || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos requeridos faltantes',
          message: 'Título, contenido y categoría son obligatorios'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para guardar el artículo en la base de datos
    // Por ahora, devolver una respuesta mock
    const newArticle = {
      id: Date.now().toString(),
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      imageUrl,
      author: author || 'Equipo Editorial',
      isPublished: isPublished || false,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      publishedAt: isPublished ? new Date().toISOString() : null
    };

    return NextResponse.json({
      success: true,
      data: newArticle,
      message: 'Artículo creado exitosamente'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error en POST /api/articles:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al crear artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}