import axios from 'axios';

// Configuración de Ollama
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'deepseek-r1:1.5b';

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

/**
 * Verificar si Ollama está disponible
 */
export async function checkOllamaAvailability(): Promise<boolean> {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`, {
      timeout: 3000,
    });
    return response.status === 200;
  } catch (error) {
    console.warn('⚠️ Ollama no disponible');
    return false;
  }
}

/**
 * Generar texto con Ollama
 */
export async function generateWithOllama(
  prompt: string,
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  }
): Promise<string> {
  try {
    const model = options?.model || OLLAMA_MODEL;
    
    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model,
        prompt,
        stream: false,
        options: {
          temperature: options?.temperature || 0.7,
          num_predict: options?.max_tokens || 500,
        },
      },
      { timeout: 30000 }
    );
    
    return response.data.response;
  } catch (error) {
    console.error('Error generando con Ollama:', error);
    throw new Error('No se pudo generar contenido con IA');
  }
}

/**
 * Generar noticia completa desde un tema
 */
export async function generateNewsArticle(topic: string): Promise<{
  title: string;
  excerpt: string;
  content: string;
  category: string;
}> {
  const prompt = `Genera una noticia profesional en español sobre: ${topic}

Formato requerido:
TÍTULO: [título atractivo y profesional]
CATEGORÍA: [Política/Economía/Sociedad/Internacional/Deportes/Cultura]
EXTRACTO: [resumen de 2-3 líneas]
CONTENIDO: [artículo completo de 4-5 párrafos, profesional y objetivo]

Importante: La noticia debe ser objetiva, profesional y estar bien escrita.`;

  try {
    const response = await generateWithOllama(prompt, {
      temperature: 0.8,
      max_tokens: 800,
    });
    
    // Parsear respuesta
    const titleMatch = response.match(/TÍTULO:\s*(.+)/i);
    const categoryMatch = response.match(/CATEGORÍA:\s*(.+)/i);
    const excerptMatch = response.match(/EXTRACTO:\s*(.+)/i);
    const contentMatch = response.match(/CONTENIDO:\s*([\s\S]+)/i);
    
    return {
      title: titleMatch?.[1]?.trim() || `Noticia sobre ${topic}`,
      excerpt:
        excerptMatch?.[1]?.trim() ||
        'Extracto generado automáticamente por IA',
      content:
        contentMatch?.[1]?.trim() ||
        'Contenido generado automáticamente por IA',
      category: categoryMatch?.[1]?.trim() || 'General',
    };
  } catch (error) {
    console.error('Error generando noticia:', error);
    
    // Fallback: generar contenido básico
    return {
      title: `Noticia sobre ${topic}`,
      excerpt: `Análisis y cobertura sobre ${topic}`,
      content: `En el día de hoy, se han reportado novedades importantes sobre ${topic}. Este es un tema de gran relevancia para la sociedad argentina y requiere atención especial.`,
      category: 'General',
    };
  }
}

/**
 * Mejorar contenido existente
 */
export async function improveContent(content: string): Promise<string> {
  const prompt = `Mejora el siguiente texto de noticia, haciéndolo más profesional, claro y atractivo. Mantén el mismo significado pero mejora la redacción:

${content}

Texto mejorado:`;

  try {
    return await generateWithOllama(prompt, {
      temperature: 0.6,
      max_tokens: 600,
    });
  } catch (error) {
    console.error('Error mejorando contenido:', error);
    return content; // Devolver original si falla
  }
}

/**
 * Generar título atractivo desde contenido
 */
export async function generateTitle(content: string): Promise<string> {
  const prompt = `Genera un título atractivo y profesional para la siguiente noticia. El título debe ser corto (máximo 80 caracteres), impactante y objetivo:

${content.substring(0, 500)}

TÍTULO:`;

  try {
    const response = await generateWithOllama(prompt, {
      temperature: 0.7,
      max_tokens: 50,
    });
    
    return response.trim().replace(/^TÍTULO:\s*/i, '').substring(0, 80);
  } catch (error) {
    console.error('Error generando título:', error);
    return 'Título generado automáticamente';
  }
}

/**
 * Generar extracto desde contenido
 */
export async function generateExcerpt(content: string): Promise<string> {
  const prompt = `Genera un extracto de 2-3 líneas para la siguiente noticia. Debe ser un resumen atractivo que invite a leer más:

${content.substring(0, 500)}

EXTRACTO:`;

  try {
    const response = await generateWithOllama(prompt, {
      temperature: 0.6,
      max_tokens: 100,
    });
    
    return response.trim().replace(/^EXTRACTO:\s*/i, '').substring(0, 200);
  } catch (error) {
    console.error('Error generando extracto:', error);
    return content.substring(0, 150) + '...';
  }
}

/**
 * Categorizar automáticamente un artículo
 */
export async function categorizeArticle(
  title: string,
  content: string
): Promise<string> {
  const prompt = `Clasifica la siguiente noticia en UNA de estas categorías: Política, Economía, Sociedad, Internacional, Deportes, Cultura, Tecnología.

TÍTULO: ${title}
CONTENIDO: ${content.substring(0, 300)}

Responde SOLO con el nombre de la categoría:`;

  try {
    const response = await generateWithOllama(prompt, {
      temperature: 0.3,
      max_tokens: 20,
    });
    
    const category = response.trim();
    
    // Validar categoría
    const validCategories = [
      'Política',
      'Economía',
      'Sociedad',
      'Internacional',
      'Deportes',
      'Cultura',
      'Tecnología',
    ];
    
    for (const valid of validCategories) {
      if (category.toLowerCase().includes(valid.toLowerCase())) {
        return valid;
      }
    }
    
    return 'General';
  } catch (error) {
    console.error('Error categorizando artículo:', error);
    return 'General';
  }
}

/**
 * Generar tags para un artículo
 */
export async function generateTags(
  title: string,
  content: string
): Promise<string[]> {
  const prompt = `Genera 5 tags relevantes para la siguiente noticia. Los tags deben ser palabras clave importantes, separadas por comas:

TÍTULO: ${title}
CONTENIDO: ${content.substring(0, 300)}

TAGS:`;

  try {
    const response = await generateWithOllama(prompt, {
      temperature: 0.5,
      max_tokens: 50,
    });
    
    const tagsText = response.trim().replace(/^TAGS:\s*/i, '');
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .slice(0, 5);
    
    return tags;
  } catch (error) {
    console.error('Error generando tags:', error);
    return [];
  }
}

/**
 * Validar calidad de un artículo (0-100)
 */
export async function validateArticleQuality(
  title: string,
  content: string
): Promise<{
  score: number;
  issues: string[];
  suggestions: string[];
}> {
  const prompt = `Evalúa la calidad de esta noticia del 0 al 100, considerando: claridad, objetividad, gramática, estructura.

TÍTULO: ${title}
CONTENIDO: ${content.substring(0, 500)}

Responde en formato:
PUNTUACIÓN: [0-100]
PROBLEMAS: [lista de problemas encontrados]
SUGERENCIAS: [lista de sugerencias de mejora]`;

  try {
    const response = await generateWithOllama(prompt, {
      temperature: 0.4,
      max_tokens: 200,
    });
    
    // Parsear respuesta
    const scoreMatch = response.match(/PUNTUACIÓN:\s*(\d+)/i);
    const issuesMatch = response.match(/PROBLEMAS:\s*(.+)/i);
    const suggestionsMatch = response.match(/SUGERENCIAS:\s*(.+)/i);
    
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
    const issues = issuesMatch
      ? issuesMatch[1].split(',').map((i) => i.trim())
      : [];
    const suggestions = suggestionsMatch
      ? suggestionsMatch[1].split(',').map((s) => s.trim())
      : [];
    
    return {
      score: Math.min(100, Math.max(0, score)),
      issues,
      suggestions,
    };
  } catch (error) {
    console.error('Error validando calidad:', error);
    return {
      score: 70,
      issues: [],
      suggestions: [],
    };
  }
}

/**
 * Obtener estadísticas de Ollama
 */
export async function getOllamaStats(): Promise<{
  available: boolean;
  model: string;
  models: string[];
}> {
  try {
    const available = await checkOllamaAvailability();
    
    if (!available) {
      return {
        available: false,
        model: OLLAMA_MODEL,
        models: [],
      };
    }
    
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    const models = response.data.models?.map((m: any) => m.name) || [];
    
    return {
      available: true,
      model: OLLAMA_MODEL,
      models,
    };
  } catch (error) {
    return {
      available: false,
      model: OLLAMA_MODEL,
      models: [],
    };
  }
}

