import { NextRequest, NextResponse } from 'next/server';

// POST /api/ollama/generate-article - Generar artículo con IA
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      topic,
      category = 'Política',
      keywords = [],
      length = 'medium',
      style = 'journalistic'
    } = body;

    if (!topic) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tema requerido',
          message: 'Debe proporcionar un tema para generar el artículo'
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para llamar al servicio de Ollama
    // Por ahora, devolver una respuesta mock
    const mockGeneratedArticle = {
      title: `Análisis profundo sobre ${topic}`,
      content: `
        <p>En el contexto político argentino actual, el tema de <strong>${topic}</strong> representa uno de los desafíos más importantes que enfrenta nuestra sociedad.</p>

        <p>La situación se desarrolla en un marco donde <em>${keywords.join(', ')}</em> juegan un rol fundamental en la toma de decisiones estratégicas del gobierno nacional.</p>

        <h2>Análisis de la situación actual</h2>
        <p>Expertos coinciden en que la implementación de políticas efectivas requiere un enfoque integral que considere múltiples factores económicos y sociales.</p>

        <blockquote>
          "La clave está en encontrar el equilibrio entre las necesidades inmediatas y las reformas estructurales necesarias", afirma un analista político consultado.
        </blockquote>

        <p>El debate público se centra actualmente en las posibles soluciones que permitan abordar esta problemática de manera sostenible y efectiva.</p>

        <h2>Perspectivas a futuro</h2>
        <p>Las proyecciones indican que las próximas semanas serán decisivas para definir el rumbo que tomará la agenda legislativa en relación a este tema.</p>
      `,
      excerpt: `Análisis detallado sobre ${topic} en el contexto político argentino actual.`,
      category,
      tags: keywords,
      suggestedTitle: `Perspectivas sobre ${topic} en Argentina`,
      wordCount: 450,
      readingTime: 3,
      seoOptimized: true,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockGeneratedArticle,
      message: 'Artículo generado exitosamente con IA'
    });

  } catch (error: any) {
    console.error('Error en POST /api/ollama/generate-article:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al generar artículo',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

