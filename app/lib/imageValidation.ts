import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface ImageValidationResult {
  isValid: boolean;
  confidence: number;
  detectedContent: string[];
  issues: string[];
  recommendations: string[];
}

export interface ImageGenerationOptions {
  title: string;
  category: string;
  keywords: string[];
  style: 'professional' | 'news' | 'political' | 'economic';
  aspectRatio: '16:9' | '4:3' | '1:1';
}

/**
 * Valida el contenido de una imagen usando visión AI
 */
export async function validateImageContent(
  imageUrl: string,
  expectedContent: string,
  category: string
): Promise<ImageValidationResult> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return {
        isValid: false,
        confidence: 0,
        detectedContent: [],
        issues: ['Imagen no accesible'],
        recommendations: ['Verificar URL de la imagen']
      };
    }

    const imageBuffer = await response.arrayBuffer();

    // Usar GPT-4 Vision para analizar la imagen
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analiza esta imagen de una noticia de ${category}. El título de la noticia es: "${expectedContent}". 

Por favor identifica:
1. ¿Qué personas aparecen en la imagen? (nombres específicos si es posible)
2. ¿Qué lugares o edificios se muestran?
3. ¿Qué elementos políticos o económicos se ven?
4. ¿La imagen es relevante para el título de la noticia?
5. ¿Hay algún problema de contenido o contexto?

Responde en formato JSON con esta estructura:
{
  "persons": ["nombre1", "nombre2"],
  "locations": ["lugar1", "lugar2"],
  "political_elements": ["elemento1", "elemento2"],
  "economic_elements": ["elemento1", "elemento2"],
  "relevance_score": 0-100,
  "issues": ["problema1", "problema2"],
  "recommendations": ["sugerencia1", "sugerencia2"]
}`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.1,
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');

    const confidence = analysis.relevance_score || 0;
    const isValid = confidence >= 70;

    return {
      isValid,
      confidence,
      detectedContent: [
        ...analysis.persons || [],
        ...analysis.locations || [],
        ...analysis.political_elements || [],
        ...analysis.economic_elements || []
      ],
      issues: analysis.issues || [],
      recommendations: analysis.recommendations || []
    };

  } catch (error) {
    console.error('Error validating image:', error);
    return {
      isValid: false,
      confidence: 0,
      detectedContent: [],
      issues: ['Error al analizar la imagen'],
      recommendations: ['Revisar conexión y formato de imagen']
    };
  }
}

/**
 * Genera una descripción detallada para crear una imagen con DALL-E
 */
export function generateImagePrompt(options: ImageGenerationOptions): string {
  const { title, category, keywords, style, aspectRatio } = options;

  const styleDescriptions = {
    professional: 'estilo profesional periodístico, iluminación natural, composición equilibrada',
    news: 'estilo fotográfico de agencia de noticias, composición dinámica, enfoque nítido',
    political: 'escena política formal, composición institucional, elementos simbólicos argentinos',
    economic: 'gráficos económicos, datos financieros, elementos de mercado bursátil'
  };

  const aspectRatioDesc = {
    '16:9': 'formato horizontal panorámico',
    '4:3': 'formato rectangular estándar',
    '1:1': 'formato cuadrado para redes sociales'
  };

  const basePrompt = `Crea una imagen ${styleDescriptions[style]} en ${aspectRatioDesc[aspectRatio]} para una noticia argentina de ${category.toLowerCase()}.

Título de la noticia: "${title}"
Palabras clave: ${keywords.join(', ')}

La imagen debe ser:
- Altamente realista y profesional
- Contextualmente precisa para Argentina
- Apropiada para medios periodísticos
- Sin texto superpuesto
- De alta calidad para publicación web

Elementos específicos para ${category.toLowerCase()}:`;

  const categoryPrompts = {
    'política': `- Casa Rosada, Congreso Nacional, o contextos políticos argentinos
- Figuras políticas argentinas reconocibles
- Elementos institucionales (banderas, escudos, etc.)
- Atmósfera formal y seria`,

    'economía': `- Gráficos de mercados, cotizaciones bursátiles
- Edificios financieros, bancos centrales
- Símbolos económicos (dólar, gráficos, etc.)
- Atmósfera de análisis financiero`,

    'judicial': `- Tribunales, cortes supremas, balanzas de justicia
- Edificios judiciales, togas, martillos
- Atmósfera de justicia y legalidad
- Elementos formales del sistema judicial`,

    'sociedad': `- Gente en contextos sociales argentinos
- Escenas urbanas, manifestaciones, celebraciones
- Elementos culturales y sociales
- Atmósfera comunitaria y diversa`,

    'internacional': `- Elementos diplomáticos, banderas, reuniones internacionales
- Aeropuertos, salas de conferencias
- Atmósfera de relaciones exteriores
- Contexto global con enfoque argentino`,

    'elecciones': `- Urnas electorales, boletas de voto
- Centros de votación, colas de votantes
- Elementos democráticos, banderas
- Atmósfera electoral`,

    'provincias': `- Paisajes característicos de diferentes provincias argentinas
- Monumentos regionales, naturaleza provincial
- Elementos culturales regionales
- Diversidad geográfica argentina`
  };

  return `${basePrompt} ${categoryPrompts[category.toLowerCase()] || 'Contexto general argentino'}`;
}

/**
 * Genera una imagen usando DALL-E basado en el contenido de la noticia
 */
export async function generateNewsImage(options: ImageGenerationOptions): Promise<string | null> {
  try {
    const prompt = generateImagePrompt(options);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: options.aspectRatio === '16:9' ? '1792x1024' :
            options.aspectRatio === '4:3' ? '1024x768' : '1024x1024',
      quality: 'standard',
      n: 1,
    });

    return response.data[0]?.url || null;

  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

/**
 * Valida múltiples imágenes en lote
 */
export async function validateImageBatch(
  images: Array<{ url: string; title: string; category: string }>
): Promise<ImageValidationResult[]> {
  const results: ImageValidationResult[] = [];

  // Procesar en lotes para evitar rate limits
  const batchSize = 3;
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);

    const batchPromises = batch.map(img =>
      validateImageContent(img.url, img.title, img.category)
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Pausa entre lotes
    if (i + batchSize < images.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return results;
}

/**
 * Genera imágenes para noticias que no tienen imágenes válidas
 */
export async function generateMissingImages(
  articles: Array<{
    title: string;
    category: string;
    categorySlug: string;
    tags: string[];
    imageUrl?: string;
  }>
): Promise<Array<{ originalUrl?: string; generatedUrl: string | null; articleTitle: string }>> {
  const results = [];

  for (const article of articles) {
    // Verificar si la imagen actual es válida
    let needsGeneration = true;

    if (article.imageUrl) {
      const validation = await validateImageContent(
        article.imageUrl,
        article.title,
        article.category
      );
      needsGeneration = !validation.isValid;
    }

    if (needsGeneration) {
      const generatedUrl = await generateNewsImage({
        title: article.title,
        category: article.categorySlug,
        keywords: article.tags,
        style: article.categorySlug === 'politica' ? 'political' :
               article.categorySlug === 'economia' ? 'economic' : 'news',
        aspectRatio: '16:9'
      });

      results.push({
        originalUrl: article.imageUrl,
        generatedUrl,
        articleTitle: article.title
      });

      // Pausa entre generaciones
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/**
 * Obtiene estadísticas de calidad de imágenes
 */
export async function getImageQualityStats(
  articles: Array<{ imageUrl: string; title: string; category: string }>
): Promise<{
  total: number;
  valid: number;
  invalid: number;
  averageConfidence: number;
  issues: Record<string, number>;
}> {
  const validations = await validateImageBatch(articles);

  const stats = {
    total: validations.length,
    valid: validations.filter(v => v.isValid).length,
    invalid: validations.filter(v => !v.isValid).length,
    averageConfidence: validations.reduce((sum, v) => sum + v.confidence, 0) / validations.length,
    issues: {} as Record<string, number>
  };

  // Contar issues
  validations.forEach(validation => {
    validation.issues.forEach(issue => {
      stats.issues[issue] = (stats.issues[issue] || 0) + 1;
    });
  });

  return stats;
}

