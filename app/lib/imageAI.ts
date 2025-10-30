import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Sistema avanzado de generación y gestión de imágenes con IA
 */
export class AISystem {
  /**
   * Genera una descripción detallada para generar una imagen basada en el artículo
   */
  static generateImagePrompt(article: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
  }): string {
    const { title, excerpt, content, category } = article;

    const categoryContexts: Record<string, string> = {
      'Política': 'escenario político argentino, Casa Rosada, Congreso Nacional, ambiente institucional',
      'Economía': 'mercado financiero, bolsa de valores, bancos, economía argentina',
      'Judicial': 'tribunales, Corte Suprema, justicia, ambiente legal',
      'Sociedad': 'gente argentina, calles de Buenos Aires, vida cotidiana, sociedad argentina',
      'Internacional': 'relaciones diplomáticas, banderas, reuniones internacionales, diplomacia',
      'Opinión': 'periodistas, editoriales, análisis político, opinión pública',
      'Elecciones': 'urnas electorales, votación, campaña política, elecciones argentinas',
      'Provincias': 'provincias argentinas, paisajes regionales, cultura provincial'
    };

    const context = categoryContexts[category] || 'Argentina, política, sociedad';

    const prompt = `
Genera una descripción detallada para crear una imagen profesional de alta calidad para un artículo de noticias argentinas.

TÍTULO: "${title}"
RESUMEN: "${excerpt}"
CATEGORÍA: ${category}

CONTEXTO: ${context}

INSTRUCCIONES PARA LA IMAGEN:
- Estilo: Fotografía realista, periodística, profesional
- Ambiente: ${context}
- Composición: Horizontal, 16:9, centrada en elementos principales
- Calidad: Alta resolución, bien iluminada, colores naturales
- Elementos: Personas reales argentinas, lugares reconocibles de Argentina
- NO usar: Logos, texto, elementos artificiales, caricaturas

Descripción específica para este artículo:
`;

    return prompt;
  }

  /**
   * Genera una imagen usando DALL-E basado en el contenido del artículo
   */
  static async generateArticleImage(article: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
  }): Promise<string> {
    try {
      const prompt = this.generateImagePrompt(article);

      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        size: '1792x1024', // 16:9 aspect ratio
        quality: 'standard',
        n: 1,
      });

      const imageUrl = response.data[0]?.url;

      if (!imageUrl) {
        throw new Error('No image URL received from OpenAI');
      }

      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      return this.getFallbackImage(article.category);
    }
  }

  /**
   * Sugiere imágenes alternativas basadas en el contenido
   */
  static async suggestAlternativeImages(article: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
  }, count: number = 3): Promise<string[]> {
    try {
      const basePrompt = this.generateImagePrompt(article);

      const suggestions = [];
      for (let i = 0; i < count; i++) {
        const variationPrompt = `${basePrompt}

Variación ${i + 1}: Cambia el ángulo, la composición o algunos elementos visuales para crear una imagen alternativa pero manteniendo el mismo tema y estilo periodístico.`;

        const response = await openai.images.generate({
          model: 'dall-e-3',
          prompt: variationPrompt,
          size: '1792x1024',
          quality: 'standard',
          n: 1,
        });

        const imageUrl = response.data[0]?.url;
        if (imageUrl) {
          suggestions.push(imageUrl);
        }
      }

      return suggestions;
    } catch (error) {
      console.error('Error suggesting images:', error);
      return Array(count).fill(this.getFallbackImage(article.category));
    }
  }

  /**
   * Analiza el contenido del artículo para detectar si necesita una imagen específica
   */
  static analyzeContentForImage(content: string): {
    needsSpecificImage: boolean;
    suggestedElements: string[];
    category: string;
  } {
    const lowerContent = content.toLowerCase();

    // Detectar figuras políticas específicas
    const politicalFigures = [
      { name: 'Milei', keywords: ['milei', 'presidente', 'javier milei'], category: 'Política' },
      { name: 'Casa Rosada', keywords: ['casa rosada', 'gobierno nacional'], category: 'Política' },
      { name: 'Congreso', keywords: ['congreso', 'diputados', 'senadores'], category: 'Política' },
      { name: 'Dólar', keywords: ['dólar', 'moneda', 'cambio', 'blue'], category: 'Economía' },
      { name: 'Corte Suprema', keywords: ['corte suprema', 'justicia', 'tribunal'], category: 'Judicial' },
      { name: 'Salud', keywords: ['hospital', 'médico', 'salud', 'vacuna'], category: 'Sociedad' },
    ];

    const suggestedElements: string[] = [];
    let detectedCategory = 'Política'; // Default

    for (const figure of politicalFigures) {
      if (figure.keywords.some(keyword => lowerContent.includes(keyword))) {
        suggestedElements.push(figure.name);
        detectedCategory = figure.category;
      }
    }

    return {
      needsSpecificImage: suggestedElements.length > 0,
      suggestedElements,
      category: detectedCategory,
    };
  }

  /**
   * Obtiene imagen de fallback basada en categoría
   */
  static getFallbackImage(category: string): string {
    const fallbacks: Record<string, string> = {
      'Política': '/images/fallback-politica.jpg',
      'Economía': '/images/fallback-economia.jpg',
      'Judicial': '/images/fallback-judicial.jpg',
      'Sociedad': '/images/fallback-sociedad.jpg',
      'Internacional': '/images/fallback-internacional.jpg',
      'Opinión': '/images/fallback-opinion.jpg',
      'Elecciones': '/images/fallback-elecciones.jpg',
      'Provincias': '/images/fallback-provincias.jpg',
    };

    return fallbacks[category] || '/images/fallback-default.jpg';
  }

  /**
   * Optimiza imagen existente o genera nueva si es necesario
   */
  static async optimizeOrReplaceImage(
    currentImageUrl: string,
    article: {
      title: string;
      excerpt: string;
      content: string;
      category: string;
    }
  ): Promise<string> {
    // Analizar si la imagen actual es apropiada
    const analysis = this.analyzeContentForImage(article.content);

    if (!analysis.needsSpecificImage) {
      return currentImageUrl; // Mantener imagen actual si no necesita cambios específicos
    }

    // Verificar si la imagen actual contiene elementos relevantes
    const imageElements = await this.analyzeImageContent(currentImageUrl);

    // Si la imagen no contiene elementos relevantes, generar nueva
    const hasRelevantElements = analysis.suggestedElements.some(element =>
      imageElements.some(imgElement => imgElement.toLowerCase().includes(element.toLowerCase()))
    );

    if (!hasRelevantElements) {
      console.log(`Imagen actual no es relevante para "${article.title}". Generando nueva...`);
      return await this.generateArticleImage(article);
    }

    return currentImageUrl;
  }

  /**
   * Analiza el contenido de una imagen usando IA
   */
  static async analyzeImageContent(imageUrl: string): Promise<string[]> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe brevemente qué ves en esta imagen. Enumera los elementos principales, personas, lugares y objetos visibles. Sé específico sobre figuras políticas argentinas si las reconoces.'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 200,
      });

      const description = response.choices[0]?.message?.content || '';
      return description.split(',').map(item => item.trim());
    } catch (error) {
      console.error('Error analyzing image:', error);
      return [];
    }
  }

  /**
   * Genera metadatos SEO para imágenes
   */
  static generateImageMetadata(article: {
    title: string;
    category: string;
  }): {
    alt: string;
    title: string;
    caption: string;
  } {
    const baseAlt = `${article.category}: ${article.title}`;

    return {
      alt: baseAlt,
      title: article.title,
      caption: `Imagen relacionada con: ${article.title} - ${article.category}`,
    };
  }

  /**
   * Valida si una URL de imagen es accesible
   */
  static async validateImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Sistema de cache para imágenes generadas
   */
  private static imageCache = new Map<string, { url: string; timestamp: number }>();

  static getCachedImage(key: string): string | null {
    const cached = this.imageCache.get(key);
    if (cached && (Date.now() - cached.timestamp) < 24 * 60 * 60 * 1000) { // 24 horas
      return cached.url;
    }
    return null;
  }

  static setCachedImage(key: string, url: string): void {
    this.imageCache.set(key, { url, timestamp: Date.now() });
  }
}

/**
 * Servicio de optimización de imágenes para el frontend
 */
export class ImageOptimizationService {
  /**
   * Configuraciones de optimización por dispositivo
   */
  static getImageConfig(deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop') {
    const configs = {
      mobile: { width: 400, quality: 80 },
      tablet: { width: 768, quality: 85 },
      desktop: { width: 1200, quality: 90 },
    };

    return configs[deviceType];
  }

  /**
   * Genera URLs optimizadas para diferentes dispositivos
   */
  static generateResponsiveUrls(baseUrl: string) {
    return {
      mobile: `${baseUrl}?w=400&q=80&fm=webp`,
      tablet: `${baseUrl}?w=768&q=85&fm=webp`,
      desktop: `${baseUrl}?w=1200&q=90&fm=webp`,
    };
  }

  /**
   * Lazy loading configuration
   */
  static getLazyLoadingConfig() {
    return {
      rootMargin: '50px',
      threshold: 0.1,
      placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTMgMTJMMTUgMTBNMjEgMTJDMjEgMTMuNzYxNCAxOS43NjE0IDE1IDE4IDE1QzE2LjIzODYgMTUgMTUgMTMuNzYxNCAxNSAxMkwxNSAxMEMxNSAxMy43NjE0IDE2LjIzODYgMTUgMTggMTVDMTkuNzYxNCAxNSAyMSAxMy43NjE0IDIxIDEyWiIgc3Rvb2s9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cjwvc3ZnPgo8L3JlY+',
    };
  }

  /**
   * Blur placeholder generation
   */
  static generateBlurPlaceholder(width: number = 16, height: number = 9): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Crear un gradiente sutil
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Agregar algunos puntos aleatorios para simular ruido
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
        ctx.fillRect(
          Math.random() * width,
          Math.random() * height,
          1,
          1
        );
      }
    }

    return canvas.toDataURL('image/jpeg', 0.1);
  }
}

export default AISystem;