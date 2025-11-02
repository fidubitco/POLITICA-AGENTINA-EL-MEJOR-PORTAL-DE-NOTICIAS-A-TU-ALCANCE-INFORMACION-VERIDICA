import { NextRequest, NextResponse } from 'next/server';

// POST /api/ollama/suggest-titles - Sugerir títulos con IA
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, category, style = 'journalistic' } = body;

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contenido requerido',
          message: 'Debe proporcionar contenido para sugerir títulos'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para llamar al servicio de Ollama
    // Por ahora, devolver una respuesta mock
    const mockTitleSuggestions = {
      titles: [
        `Análisis profundo: ${content.substring(0, 30)}...`,
        `${category}: Nuevo enfoque sobre ${content.substring(0, 25)}...`,
        `Perspectivas ${style} sobre ${content.substring(0, 35)}...`,
        `¿Qué significa ${content.substring(0, 20)}... para Argentina?`,
        `El futuro de ${content.substring(0, 15)}... en el contexto actual`,
        `Debate: ${content.substring(0, 25)}... y sus implicaciones`,
        `Análisis: ${content.substring(0, 20)}... en tiempos de cambio`,
        `Reflexiones sobre ${content.substring(0, 30)}...`
      ],
      category,
      style,
      contentPreview: content.substring(0, 100) + '...',
      suggestionsCount: 8,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockTitleSuggestions,
      message: `${mockTitleSuggestions.titles.length} títulos sugeridos generados exitosamente`
    });

  } catch (error: any) {
    console.error('Error en POST /api/ollama/suggest-titles:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al generar títulos',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

