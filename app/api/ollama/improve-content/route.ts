import { NextRequest, NextResponse } from 'next/server';

// POST /api/ollama/improve-content - Mejorar contenido con IA
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, improvementType } = body;

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contenido requerido',
          message: 'Debe proporcionar contenido para mejorar'
        },
        { status: 400 }
      );
    }

    const validTypes = ['grammar', 'style', 'length', 'seo', 'engagement'];
    if (!validTypes.includes(improvementType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tipo de mejora inválido',
          message: `Los tipos válidos son: ${validTypes.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para llamar al servicio de Ollama
    // Por ahora, devolver una respuesta mock
    let improvedContent = content;
    let improvement = '';

    switch (improvementType) {
      case 'grammar':
        improvedContent = content.replace(/(\w+)\s+(\w+)/g, '$1 $2'); // Mock grammar fix
        improvement = 'Gramática corregida';
        break;
      case 'style':
        improvedContent = content.replace(/(\w+)/g, '$1'); // Mock style improvement
        improvement = 'Estilo mejorado';
        break;
      case 'length':
        improvedContent = content + '\n\nSe agregaron párrafos adicionales para aumentar la profundidad del contenido.';
        improvement = 'Longitud expandida';
        break;
      case 'seo':
        improvedContent = content.replace(/(\w+)/g, '$1'); // Mock SEO optimization
        improvement = 'Optimización SEO aplicada';
        break;
      case 'engagement':
        improvedContent = content.replace(/^/, '¡Atención! ').replace(/$/, ' ¿Qué opinas tú?');
        improvement = 'Engagement mejorado';
        break;
    }

    const mockImprovedContent = {
      originalContent: content,
      improvedContent,
      improvementType,
      improvement,
      changes: [
        'Se mejoró la estructura del texto',
        'Se optimizó el vocabulario utilizado',
        'Se aumentó la claridad del mensaje'
      ],
      wordCount: improvedContent.split(' ').length,
      improvedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockImprovedContent,
      message: `Contenido mejorado exitosamente (${improvement})`
    });

  } catch (error: any) {
    console.error('Error en POST /api/ollama/improve-content:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al mejorar contenido',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

