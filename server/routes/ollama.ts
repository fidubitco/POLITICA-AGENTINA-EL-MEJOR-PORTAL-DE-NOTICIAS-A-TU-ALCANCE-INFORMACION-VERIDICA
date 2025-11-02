import { Router } from 'express';
import { ollamaService } from '../services/ollama';

const router = Router();

// ===========================================
// ENDPOINTS DE GENERACIÓN DE CONTENIDO
// ===========================================

// Generar artículo completo con IA
router.post('/generate-article', async (req, res) => {
  try {
    const {
      topic,
      category,
      keywords,
      length,
      style
    } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El campo "topic" es requerido'
      });
    }

    console.log('🎨 Generando artículo con IA:', { topic, category, length, style });

    const result = await ollamaService.generateArticle({
      topic: topic.trim(),
      category,
      keywords,
      length,
      style
    });

    res.json({
      success: true,
      data: result,
      message: 'Artículo generado exitosamente con IA'
    });

  } catch (error: any) {
    console.error('Error generando artículo con IA:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error generando artículo con IA'
    });
  }
});

// Mejorar contenido existente
router.post('/improve-content', async (req, res) => {
  try {
    const { content, improvementType } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El campo "content" es requerido'
      });
    }

    const validTypes = ['grammar', 'style', 'length', 'seo', 'engagement'];
    if (!improvementType || !validTypes.includes(improvementType)) {
      return res.status(400).json({
        success: false,
        message: `Tipo de mejora inválido. Opciones: ${validTypes.join(', ')}`
      });
    }

    console.log('🔧 Mejorando contenido con IA:', { improvementType, contentLength: content.length });

    const improvedContent = await ollamaService.improveContent({
      content: content.trim(),
      improvementType
    });

    res.json({
      success: true,
      data: {
        originalContent: content,
        improvedContent,
        improvementType
      },
      message: `Contenido mejorado exitosamente (${improvementType})`
    });

  } catch (error: any) {
    console.error('Error mejorando contenido con IA:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error mejorando contenido con IA'
    });
  }
});

// Generar sugerencias de títulos
router.post('/suggest-titles', async (req, res) => {
  try {
    const { content, category, style } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El campo "content" es requerido'
      });
    }

    console.log('💡 Generando sugerencias de títulos con IA:', { category, style });

    const titles = await ollamaService.suggestTitles({
      content: content.trim(),
      category,
      style
    });

    res.json({
      success: true,
      data: { titles },
      message: `${titles.length} títulos sugeridos generados`
    });

  } catch (error: any) {
    console.error('Error generando títulos con IA:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error generando títulos con IA'
    });
  }
});

// Categorizar contenido automáticamente
router.post('/categorize', async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El campo "content" es requerido'
      });
    }

    console.log('🏷️ Categorizando contenido con IA:', { titleLength: title?.length || 0 });

    const result = await ollamaService.categorizeContent({
      content: content.trim(),
      title: title?.trim()
    });

    res.json({
      success: true,
      data: result,
      message: `Contenido categorizado como "${result.category}"`
    });

  } catch (error: any) {
    console.error('Error categorizando contenido con IA:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error categorizando contenido con IA'
    });
  }
});

// Evaluar calidad del contenido
router.post('/quality-score', async (req, res) => {
  try {
    const { content, title, category } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El campo "content" es requerido'
      });
    }

    console.log('📊 Evaluando calidad del contenido con IA');

    const result = await ollamaService.scoreContentQuality({
      content: content.trim(),
      title: title?.trim(),
      category
    });

    res.json({
      success: true,
      data: result,
      message: `Puntuación de calidad: ${result.score}/${result.maxScore}`
    });

  } catch (error: any) {
    console.error('Error evaluando calidad con IA:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error evaluando calidad del contenido'
    });
  }
});

// ===========================================
// ENDPOINTS DE CONFIGURACIÓN Y DIAGNÓSTICO
// ===========================================

// Verificar conexión con Ollama
router.get('/status', async (req, res) => {
  try {
    const status = await ollamaService.checkConnection();

    res.json({
      success: true,
      data: status,
      message: status.connected ? 'Ollama conectado correctamente' : 'Ollama no disponible'
    });

  } catch (error: any) {
    console.error('Error verificando status de Ollama:', error);
    res.status(500).json({
      success: false,
      message: 'Error verificando conexión con Ollama'
    });
  }
});

// Obtener configuración actual
router.get('/config', (req, res) => {
  try {
    const config = ollamaService.getConfig();

    res.json({
      success: true,
      data: config,
      message: 'Configuración de Ollama obtenida'
    });

  } catch (error: any) {
    console.error('Error obteniendo configuración:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo configuración'
    });
  }
});

// ===========================================
// ENDPOINTS DE UTILIDADES PARA EL FRONTEND
// ===========================================

// Obtener opciones disponibles para generación
router.get('/options', (req, res) => {
  res.json({
    success: true,
    data: {
      lengths: [
        { value: 'short', label: 'Corto (600-800 palabras)', description: 'Artículo conciso y directo' },
        { value: 'medium', label: 'Medio (1000-1500 palabras)', description: 'Artículo equilibrado con análisis' },
        { value: 'long', label: 'Largo (2000-2500 palabras)', description: 'Artículo profundo y detallado' }
      ],
      styles: [
        { value: 'formal', label: 'Formal', description: 'Estilo académico y profesional' },
        { value: 'journalistic', label: 'Periodístico', description: 'Estilo noticioso profesional' },
        { value: 'analytical', label: 'Analítico', description: 'Enfoque profundo y reflexivo' }
      ],
      improvementTypes: [
        { value: 'grammar', label: 'Gramática', description: 'Corregir errores gramaticales y ortográficos' },
        { value: 'style', label: 'Estilo', description: 'Mejorar redacción y claridad' },
        { value: 'length', label: 'Longitud', description: 'Optimizar extensión del contenido' },
        { value: 'seo', label: 'SEO', description: 'Optimizar para motores de búsqueda' },
        { value: 'engagement', label: 'Engagement', description: 'Aumentar atractivo y participación' }
      ],
      titleStyles: [
        { value: 'clickbait', label: 'Atractivo', description: 'Títulos que generan curiosidad' },
        { value: 'journalistic', label: 'Periodístico', description: 'Títulos profesionales descriptivos' },
        { value: 'analytical', label: 'Analítico', description: 'Títulos que reflejan profundidad' }
      ],
      categories: [
        'Política',
        'Economía',
        'Sociedad',
        'Internacional',
        'Judicial',
        'Seguridad',
        'Tecnología',
        'Deportes',
        'Cultura'
      ]
    },
    message: 'Opciones de IA obtenidas correctamente'
  });
});

// ===========================================
// ENDPOINTS PARA INTEGRACIÓN CON SCRAPING
// ===========================================

// Validar y mejorar contenido scrapeado
router.post('/validate-scraped', async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El campo "content" es requerido'
      });
    }

    console.log('🔍 Validando contenido scrapeado con IA');

    // Evaluar calidad
    const quality = await ollamaService.scoreContentQuality({
      content: content.trim(),
      title: title?.trim(),
      category
    });

    // Sugerir mejoras si la calidad es baja
    let suggestions: string[] = [];
    let improvedContent = content;

    if (quality.score < 70) {
      // Mejorar contenido automáticamente
      improvedContent = await ollamaService.improveContent({
        content: content.trim(),
        improvementType: 'style'
      });

      suggestions = quality.suggestions || [
        'Mejorar estructura del artículo',
        'Agregar más contexto y antecedentes',
        'Incluir fuentes o referencias verificables'
      ];
    }

    // Sugerir mejor categoría si no está clara
    const categorization = await ollamaService.categorizeContent({
      content: content.trim(),
      title: title?.trim()
    });

    res.json({
      success: true,
      data: {
        quality,
        improvedContent,
        suggestedCategory: categorization.category,
        suggestions,
        approved: quality.score >= 75 // Auto-aprobar si calidad >= 75
      },
      message: `Contenido evaluado. Calidad: ${quality.score}/100`
    });

  } catch (error: any) {
    console.error('Error validando contenido scrapeado:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error validando contenido scrapeado'
    });
  }
});

export default router;

