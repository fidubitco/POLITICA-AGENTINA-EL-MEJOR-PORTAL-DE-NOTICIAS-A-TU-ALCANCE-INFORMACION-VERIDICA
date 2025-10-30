import OpenAI from 'openai';

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Tipos para generación de contenido
export interface ArticleGenerationOptions {
  topic: string;
  category: string;
  tone?: 'formal' | 'neutral' | 'informative';
  length?: 'short' | 'medium' | 'long';
  includeSources?: boolean;
  targetAudience?: 'general' | 'experts' | 'students';
}

export interface ImageValidationResult {
  isValid: boolean;
  description: string;
  relevanceScore: number;
  suggestedTags: string[];
  contentWarnings?: string[];
}

export interface TranslationOptions {
  text: string;
  targetLanguage: string;
  context?: string;
  preserveFormatting?: boolean;
}

// Sistema de IA para generación de artículos
export class ArticleGeneratorAI {
  private static readonly SYSTEM_PROMPT = `Eres un periodista político especializado en Argentina con más de 20 años de experiencia.
  Tu tarea es generar artículos de alta calidad, objetivos y bien fundamentados sobre política argentina.

  REGLAS IMPORTANTES:
  - Mantén absoluta neutralidad política
  - Usa fuentes confiables y datos verificables
  - Estructura los artículos con introducción, desarrollo y conclusión
  - Incluye contexto histórico cuando sea relevante
  - Usa un lenguaje profesional pero accesible
  - Evita sensacionalismo y mantén el rigor periodístico
  - Siempre incluye fecha de publicación y actualización`;

  static async generateArticle(options: ArticleGenerationOptions): Promise<{
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
    sources: string[];
  }> {
    try {
      const prompt = this.buildArticlePrompt(options);

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: this.SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No se recibió respuesta de OpenAI');
      }

      return JSON.parse(response);
    } catch (error) {
      console.error('Error generando artículo con IA:', error);
      throw new Error('Error al generar el artículo. Por favor, inténtalo de nuevo.');
    }
  }

  private static buildArticlePrompt(options: ArticleGenerationOptions): string {
    const { topic, category, tone = 'neutral', length = 'medium', includeSources = true, targetAudience = 'general' } = options;

    return `Genera un artículo completo sobre: "${topic}"

INFORMACIÓN REQUERIDA:
- Categoría: ${category}
- Tono: ${tone}
- Longitud: ${length} (${length === 'short' ? '800-1200 palabras' : length === 'medium' ? '1200-1800 palabras' : '1800-2500 palabras'})
- Audiencia: ${targetAudience}
- Incluir fuentes: ${includeSources ? 'Sí' : 'No'}

FORMATO DE RESPUESTA (JSON):
{
  "title": "Título atractivo y SEO-friendly",
  "excerpt": "Resumen de 150-200 caracteres",
  "content": "Artículo completo en HTML con párrafos <p>, encabezados <h2>, <h3> si es necesario",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoTitle": "Título SEO optimizado (50-60 caracteres)",
  "seoDescription": "Meta description (150-160 caracteres)",
  "sources": ["Fuente 1", "Fuente 2", "Fuente 3"]
}

El artículo debe ser completamente original, informativo y mantener los estándares periodísticos más altos.`;
  }

  static async validateImage(imageUrl: string, context: string): Promise<ImageValidationResult> {
    try {
      const prompt = `Analiza esta imagen en el contexto de un artículo sobre: "${context}"

Evalúa:
1. Relevancia con el tema (0-100)
2. Calidad y nitidez de la imagen
3. Adecuación para contenido periodístico
4. Posibles problemas (contenido sensible, derechos de autor, etc.)

Responde en formato JSON:
{
  "isValid": boolean,
  "description": "Descripción detallada de la imagen",
  "relevanceScore": number (0-100),
  "suggestedTags": ["tag1", "tag2"],
  "contentWarnings": ["advertencia1"] (opcional)
}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No se recibió respuesta de validación de imagen');
      }

      return JSON.parse(response);
    } catch (error) {
      console.error('Error validando imagen con IA:', error);
      return {
        isValid: false,
        description: 'Error al validar la imagen',
        relevanceScore: 0,
        suggestedTags: []
      };
    }
  }

  static async translateText(options: TranslationOptions): Promise<string> {
    try {
      const { text, targetLanguage, context, preserveFormatting = true } = options;

      const prompt = `Traduce el siguiente texto al ${targetLanguage}:

TEXTO ORIGINAL:
${text}

${context ? `CONTEXTO: ${context}` : ''}
${preserveFormatting ? 'PRESERVA el formato HTML y la estructura del texto.' : 'Traduce solo el contenido, ignora el formato HTML.'}

INSTRUCCIONES:
- Mantén el tono y estilo periodístico
- Preserva términos técnicos cuando no tengan traducción directa
- Asegúrate de que la traducción sea natural y fluida
- Mantén la objetividad y neutralidad del contenido original`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Eres un traductor profesional especializado en contenido periodístico y político.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const translatedText = completion.choices[0]?.message?.content;
      if (!translatedText) {
        throw new Error('No se recibió respuesta de traducción');
      }

      return translatedText.trim();
    } catch (error) {
      console.error('Error traduciendo texto con IA:', error);
      throw new Error('Error al traducir el contenido. Por favor, inténtalo de nuevo.');
    }
  }

  static async generateImageDescription(imageUrl: string): Promise<{
    description: string;
    altText: string;
    caption: string;
    tags: string[];
  }> {
    try {
      const prompt = `Describe esta imagen para un artículo periodístico. Proporciona:

1. Descripción detallada (2-3 oraciones)
2. Texto alternativo SEO-friendly (una frase concisa)
3. Pie de foto apropiado para publicación
4. Tags relevantes separados por comas

Responde en formato JSON.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 500,
        response_format: { type: 'json_object' }
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No se recibió respuesta de descripción de imagen');
      }

      return JSON.parse(response);
    } catch (error) {
      console.error('Error generando descripción de imagen:', error);
      return {
        description: 'Imagen relacionada con el contenido del artículo',
        altText: 'Imagen del artículo',
        caption: 'Imagen del artículo',
        tags: ['imagen', 'artículo']
      };
    }
  }

  static async suggestRelatedTopics(mainTopic: string, category: string): Promise<string[]> {
    try {
      const prompt = `Sugiere 5 temas relacionados con: "${mainTopic}" en la categoría "${category}"

Los temas deben ser:
- Actuales y relevantes
- Específicos pero no demasiado nicho
- Atractivos para lectores interesados en política argentina
- Variados para cubrir diferentes aspectos

Responde solo con una lista JSON de strings.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 300,
        response_format: { type: 'json_object' }
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No se recibió respuesta de sugerencias');
      }

      const result = JSON.parse(response);
      return result.topics || result.suggestions || [];
    } catch (error) {
      console.error('Error generando sugerencias de temas:', error);
      return [];
    }
  }
}

// Función helper para verificar si OpenAI está configurado
export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

// Función para obtener estadísticas de uso de la API
export async function getOpenAIUsage(): Promise<{
  totalRequests: number;
  totalTokens: number;
  estimatedCost: number;
} | null> {
  try {
    // En producción, implementar lógica para obtener uso real de la API
    return {
      totalRequests: 0,
      totalTokens: 0,
      estimatedCost: 0
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas de OpenAI:', error);
    return null;
  }
}

export default openai;