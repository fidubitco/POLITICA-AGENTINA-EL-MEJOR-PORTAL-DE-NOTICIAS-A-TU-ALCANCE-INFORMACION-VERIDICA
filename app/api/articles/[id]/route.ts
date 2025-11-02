import { NextRequest, NextResponse } from 'next/server';

// GET /api/articles/[id] - Obtener artículo específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Aquí iría la lógica para obtener el artículo de la base de datos
    // Por ahora, devolver datos mock
    const mockArticle = {
      id,
      title: 'Milei anuncia nuevas medidas económicas en el Congreso',
      content: `
        <p>El Presidente Javier Milei presentó hoy en el Congreso Nacional un paquete integral de reformas económicas que busca transformar fundamentalmente la estructura económica del país.</p>

        <p>Las medidas incluyen:</p>
        <ul>
          <li>Reducción significativa del gasto público</li>
          <li>Eliminación de subsidios estatales</li>
          <li>Apertura comercial completa</li>
          <li>Reforma del sistema previsional</li>
          <li>Desregulación de mercados</li>
        </ul>

        <p>La presentación generó intensos debates entre los diferentes bloques políticos, con posiciones encontradas sobre el impacto que estas reformas tendrán en la economía nacional.</p>

        <blockquote>
          "Estas medidas son necesarias para salvar a la Argentina de la decadencia económica", declaró el Presidente durante su discurso.
        </blockquote>

        <p>Los analistas económicos coinciden en que las reformas propuestas representan un cambio radical en la política económica argentina, similar a las implementadas en otros países de la región durante las últimas décadas.</p>
      `,
      excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
      category: 'Política',
      tags: ['Milei', 'Economía', 'Reformas', 'Congreso'],
      imageUrl: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&h=450&fit=crop&q=80&auto=format',
      author: 'Equipo Editorial',
      views: 15420,
      likes: 892,
      isPublished: true,
      isBreaking: false,
      isTrending: true,
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!mockArticle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Artículo no encontrado',
          message: 'El artículo solicitado no existe'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockArticle
    });

  } catch (error: any) {
    console.error('Error en GET /api/articles/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[id] - Actualizar artículo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Aquí iría la lógica para actualizar el artículo en la base de datos
    // Por ahora, devolver una respuesta mock
    const updatedArticle = {
      id,
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      imageUrl,
      author: author || 'Equipo Editorial',
      isPublished: isPublished || false,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedArticle,
      message: 'Artículo actualizado exitosamente'
    });

  } catch (error: any) {
    console.error('Error en PUT /api/articles/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al actualizar artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - Eliminar artículo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Aquí iría la lógica para eliminar el artículo de la base de datos
    // Por ahora, devolver una respuesta mock

    return NextResponse.json({
      success: true,
      message: 'Artículo eliminado exitosamente'
    });

  } catch (error: any) {
    console.error('Error en DELETE /api/articles/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al eliminar artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}
