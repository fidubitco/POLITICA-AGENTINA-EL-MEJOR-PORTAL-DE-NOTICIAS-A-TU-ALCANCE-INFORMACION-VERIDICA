import { NextRequest, NextResponse } from 'next/server';

// POST /api/scraping/reject/[id] - Rechazar artículo scrapeado
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID inválido',
          message: 'El ID del artículo debe ser un número válido'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para rechazar el artículo scrapeado en la base de datos
    // Por ahora, devolver una respuesta mock

    return NextResponse.json({
      success: true,
      message: `Artículo ${articleId} rechazado exitosamente`,
      data: {
        articleId,
        status: 'rejected',
        rejectedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Error en POST /api/scraping/reject/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al rechazar artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}
