import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface NewsGenerationOptions {
  category: string;
  keywords?: string[];
  length?: 'short' | 'medium' | 'long';
  tone?: 'neutral' | 'formal' | 'informative';
  language?: 'es' | 'en' | 'pt' | 'fr' | 'it' | 'de';
}

export interface GeneratedNews {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  suggestedImage: string;
  category: string;
}

/**
 * Genera una noticia completa usando OpenAI GPT-4
 */
export async function generateNews(options: NewsGenerationOptions): Promise<GeneratedNews> {
  const {
    category,
    keywords = [],
    length = 'medium',
    tone = 'informative',
    language = 'es'
  } = options;

  const lengthMap = {
    short: '400-600 palabras',
    medium: '800-1200 palabras',
    long: '1500-2000 palabras'
  };

  const toneMap = {
    neutral: 'neutral e imparcial',
    formal: 'formal y profesional',
    informative: 'informativo y detallado'
  };

  const prompt = `
Eres un periodista profesional especializado en política argentina. Genera una noticia completa y original sobre ${category} en Argentina.

REQUISITOS:
- Idioma: ${language === 'es' ? 'Español de Argentina' : language}
- Longitud: ${lengthMap[length]}
- Tono: ${toneMap[tone]}
- Categoría: ${category}
- Palabras clave a incluir: ${keywords.join(', ') || 'actualidad política argentina'}

La noticia debe incluir:
1. Título atractivo y SEO-friendly
2. Bajada (excerpt) de 2-3 líneas
3. Contenido completo con introducción, desarrollo y conclusión
4. Tags relevantes
5. Meta título y descripción SEO optimizados
6. Palabras clave SEO
7. Descripción de imagen sugerida (para búsqueda en Unsplash)

IMPORTANTE:
- Debe ser completamente original
- Información verídica y actual
- Lenguaje periodístico profesional
- Optimizado para SEO
- Enfocado en Argentina

Formato de respuesta JSON:
{
  "title": "Título de la noticia",
  "excerpt": "Bajada de la noticia",
  "content": "Contenido completo en HTML",
  "tags": ["tag1", "tag2", "tag3"],
  "seoTitle": "Título SEO",
  "seoDescription": "Descripción SEO",
  "keywords": ["palabra", "clave", "seo"],
  "suggestedImage": "descripción de imagen para Unsplash",
  "category": "${category}"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Eres un periodista profesional argentino especializado en generar contenido periodístico de alta calidad.'
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

    const generatedNews = JSON.parse(response) as GeneratedNews;
    return generatedNews;

  } catch (error) {
    console.error('Error generating news with OpenAI:', error);
    throw new Error('Error al generar la noticia');
  }
}

/**
 * Traduce una noticia a múltiples idiomas
 */
export async function translateNews(
  content: string,
  targetLanguages: string[]
): Promise<Record<string, string>> {
  const translations: Record<string, string> = {};

  for (const lang of targetLanguages) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Traduce el siguiente contenido al ${lang}. Mantén el estilo periodístico profesional y la terminología política argentina apropiada.`
          },
          {
            role: 'user',
            content: content
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const translation = completion.choices[0]?.message?.content;
      if (translation) {
        translations[lang] = translation;
      }
    } catch (error) {
      console.error(`Error translating to ${lang}:`, error);
    }
  }

  return translations;
}

/**
 * Genera sugerencias de imágenes basadas en el contenido
 */
export async function generateImageSuggestions(content: string, count: number = 3): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Genera ${count} descripciones de imágenes optimizadas para búsqueda en Unsplash. Cada descripción debe ser específica, visual y atractiva.`
        },
        {
          role: 'user',
          content: `Analiza este contenido y genera ${count} búsquedas de imágenes apropiadas:\n\n${content.substring(0, 500)}...`
        }
      ],
      temperature: 0.8,
      max_tokens: 300
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return [];

    // Parse the response and extract image suggestions
    const suggestions = response
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, count);

    return suggestions;

  } catch (error) {
    console.error('Error generating image suggestions:', error);
    return [];
  }
}

/**
 * Optimiza el contenido para SEO
 */
export async function optimizeForSEO(content: string, keywords: string[]): Promise<{
  optimizedTitle: string;
  optimizedDescription: string;
  optimizedContent: string;
  keywordDensity: Record<string, number>;
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Optimiza el contenido para SEO. Mejora títulos, meta descriptions y densidad de palabras clave. Palabras clave: ${keywords.join(', ')}`
        },
        {
          role: 'user',
          content: `Optimiza este contenido para SEO:\n\n${content}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No se recibió respuesta de optimización SEO');
    }

    // Parse and structure the response
    const lines = response.split('\n');
    const optimizedTitle = lines.find(line => line.startsWith('Título:'))?.replace('Título:', '').trim() || '';
    const optimizedDescription = lines.find(line => line.startsWith('Descripción:'))?.replace('Descripción:', '').trim() || '';

    return {
      optimizedTitle,
      optimizedDescription,
      optimizedContent: content, // Would be enhanced in full implementation
      keywordDensity: {} // Would be calculated in full implementation
    };

  } catch (error) {
    console.error('Error optimizing for SEO:', error);
    return {
      optimizedTitle: '',
      optimizedDescription: '',
      optimizedContent: content,
      keywordDensity: {}
    };
  }
}

export default openai;
