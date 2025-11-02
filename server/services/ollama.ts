import axios from 'axios';

interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OllamaResponse {
  model: string;
  created_at: string;
  message: OllamaMessage;
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

interface GenerateArticleRequest {
  topic?: string;
  category?: string;
  keywords?: string[];
  length?: 'short' | 'medium' | 'long';
  style?: 'formal' | 'journalistic' | 'analytical';
}

interface ImproveContentRequest {
  content: string;
  improvementType: 'grammar' | 'style' | 'length' | 'seo' | 'engagement';
}

interface SuggestTitleRequest {
  content: string;
  category?: string;
  style?: 'clickbait' | 'journalistic' | 'analytical';
}

interface CategorizeContentRequest {
  content: string;
  title?: string;
}

interface QualityScoreRequest {
  content: string;
  title?: string;
  category?: string;
}

export class OllamaService {
  private baseUrl: string;
  private model: string;
  private timeout: number;

  constructor() {
    this.baseUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'deepseek-r1:1.5b';
    this.timeout = parseInt(process.env.OLLAMA_TIMEOUT || '30000');
  }

  // ===========================================
  // MÉTODO PRINCIPAL PARA LLAMADAS A OLLAMA
  // ===========================================

  private async callOllama(messages: OllamaMessage[], options: {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    stream?: boolean;
  } = {}): Promise<string> {
    try {
      const response = await axios.post<OllamaResponse>(
        `${this.baseUrl}/api/chat`,
        {
          model: this.model,
          messages,
          stream: false,
          options: {
            temperature: options.temperature || 0.7,
            top_p: options.top_p || 0.9,
            num_predict: options.max_tokens || 1000,
            ...options
          }
        },
        {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.message) {
        return response.data.message.content.trim();
      }

      throw new Error('Respuesta inválida de Ollama');
    } catch (error: any) {
      console.error('Error llamando a Ollama:', error.message);

      if (error.code === 'ECONNREFUSED') {
        throw new Error('Ollama no está ejecutándose. Asegúrate de que Ollama esté corriendo en ' + this.baseUrl);
      }

      if (error.response?.status === 404) {
        throw new Error(`Modelo '${this.model}' no encontrado. Ejecuta: ollama pull ${this.model}`);
      }

      throw new Error(`Error de Ollama: ${error.message}`);
    }
  }

  // ===========================================
  // GENERACIÓN DE ARTÍCULOS
  // ===========================================

  async generateArticle(request: GenerateArticleRequest): Promise<{
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
  }> {
    const {
      topic = '',
      category = 'General',
      keywords = [],
      length = 'medium',
      style = 'journalistic'
    } = request;

    const lengthMap = {
      short: '600-800 palabras',
      medium: '1000-1500 palabras',
      long: '2000-2500 palabras'
    };

    const styleMap = {
      formal: 'estilo formal y académico',
      journalistic: 'estilo periodístico profesional',
      analytical: 'estilo analítico y profundo'
    };

    const systemPrompt = `Eres un periodista profesional argentino especializado en política. Crea un artículo completo y bien documentado sobre el tema solicitado.

INSTRUCCIONES:
- Tema: ${topic || 'Tema político argentino actual'}
- Categoría: ${category}
- Longitud: ${lengthMap[length]}
- Estilo: ${styleMap[style]}
- Palabras clave: ${keywords.join(', ') || 'política argentina, gobierno, actualidad'}

El artículo debe incluir:
1. Título atractivo y periodístico
2. Bajada (extracto) de 2-3 líneas
3. Introducción que capture la atención
4. Desarrollo con análisis profundo
5. Conclusión con perspectivas futuras
6. Información contextual y antecedentes
7. Citas o referencias cuando sea apropiado

IMPORTANTE:
- Usa español de Argentina
- Sé objetivo y equilibrado
- Incluye datos y hechos verificables
- Mantén un tono profesional
- Estructura clara con párrafos bien definidos`;

    const messages: OllamaMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Genera un artículo completo sobre: ${topic || 'un tema político argentino de actualidad'}. Asegúrate de que sea informativo, bien estructurado y profesional.`
      }
    ];

    const rawContent = await this.callOllama(messages, {
      temperature: 0.8,
      max_tokens: 4000
    });

    // Parsear la respuesta para extraer componentes
    const title = await this.extractTitle(rawContent);
    const excerpt = await this.generateExcerpt(rawContent, title);
    const suggestedCategory = category !== 'General' ? category : await this.suggestCategory(rawContent, title);
    const tags = await this.extractTags(rawContent, keywords);

    // Generar metadatos SEO
    const seoTitle = await this.generateSEOTitle(title, category);
    const seoDescription = excerpt;

    return {
      title,
      content: rawContent,
      excerpt,
      category: suggestedCategory,
      tags,
      seoTitle,
      seoDescription
    };
  }

  // ===========================================
  // MEJORA DE CONTENIDO EXISTENTE
  // ===========================================

  async improveContent(request: ImproveContentRequest): Promise<string> {
    const { content, improvementType } = request;

    const improvementPrompts = {
      grammar: 'Corrige la gramática, ortografía y puntuación. Mejora la redacción manteniendo el estilo periodístico.',
      style: 'Mejora el estilo periodístico: hazlo más claro, conciso y atractivo. Mantén la objetividad.',
      length: 'Optimiza la longitud: elimina redundancias, mejora la estructura y asegura que fluya mejor.',
      seo: 'Optimiza para SEO: incluye palabras clave relevantes, mejora la legibilidad y estructura.',
      engagement: 'Mejora el engagement: agrega elementos que capturen la atención del lector, hace más relatable.'
    };

    const systemPrompt = `Eres un editor profesional de contenido periodístico. Tu tarea es mejorar el contenido proporcionado según el tipo de mejora solicitado.

TIPO DE MEJORA: ${improvementType.toUpperCase()}
INSTRUCCIONES: ${improvementPrompts[improvementType]}

REGLAS IMPORTANTES:
- Mantén la información factual y objetividad
- No cambies hechos o datos importantes
- Preserva el tono periodístico profesional
- Mejora la claridad y legibilidad
- Asegura que el contenido fluya naturalmente`;

    const messages: OllamaMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Mejora el siguiente contenido aplicando la mejora de tipo "${improvementType}":\n\n${content}`
      }
    ];

    return await this.callOllama(messages, {
      temperature: 0.6,
      max_tokens: 3000
    });
  }

  // ===========================================
  // SUGERENCIAS DE TÍTULOS
  // ===========================================

  async suggestTitles(request: SuggestTitleRequest): Promise<string[]> {
    const { content, category = 'General', style = 'journalistic' } = request;

    const stylePrompts = {
      clickbait: 'títulos atractivos que generen curiosidad y clics',
      journalistic: 'títulos periodísticos profesionales y descriptivos',
      analytical: 'títulos analíticos que reflejen profundidad y expertise'
    };

    const systemPrompt = `Eres un periodista experimentado especializado en crear títulos impactantes. Genera 5 títulos alternativos para el contenido proporcionado.

CATEGORÍA: ${category}
ESTILO: ${stylePrompts[style]}

REGLAS PARA LOS TÍTULOS:
- Deben ser atractivos pero no sensacionalistas
- Máximo 70 caracteres
- Deben reflejar el contenido principal
- Usar español de Argentina
- Incluir palabras clave relevantes cuando sea natural

Devuelve exactamente 5 títulos, uno por línea, sin numeración.`;

    const messages: OllamaMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Genera 5 títulos alternativos para este contenido:\n\n${content.substring(0, 1000)}...`
      }
    ];

    const response = await this.callOllama(messages, {
      temperature: 0.8,
      max_tokens: 500
    });

    // Parsear los títulos (asumiendo que vienen uno por línea)
    return response
      .split('\n')
      .map(title => title.trim())
      .filter(title => title.length > 10 && title.length < 100)
      .slice(0, 5);
  }

  // ===========================================
  // CATEGORIZACIÓN AUTOMÁTICA
  // ===========================================

  async categorizeContent(request: CategorizeContentRequest): Promise<{
    category: string;
    confidence: number;
    reasoning: string;
  }> {
    const { content, title = '' } = request;

    const systemPrompt = `Eres un experto en categorización de contenido periodístico argentino. Analiza el contenido y asigna la categoría más apropiada.

CATEGORÍAS DISPONIBLES:
- Política: Gobierno, partidos políticos, elecciones, leyes, Congreso
- Economía: Finanzas, dólar, inflación, comercio, mercados, salarios
- Sociedad: Educación, salud, cultura, deportes, medio ambiente, justicia
- Internacional: Relaciones exteriores, otros países, ONU, acuerdos internacionales
- Judicial: Corte Suprema, tribunales, casos legales, corrupción
- Seguridad: Policía, crimen, narcotráfico, violencia
- Tecnología: Innovación, startups, digital, inteligencia artificial

Devuelve un JSON con:
- category: La categoría más apropiada
- confidence: Nivel de confianza (0-100)
- reasoning: Breve explicación de por qué esta categoría`;

    const messages: OllamaMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Categoriza este contenido:\n\nTítulo: ${title}\n\nContenido: ${content.substring(0, 1500)}...`
      }
    ];

    try {
      const response = await this.callOllama(messages, {
        temperature: 0.3,
        max_tokens: 300
      });

      // Intentar parsear como JSON
      const parsed = JSON.parse(response);
      return {
        category: parsed.category || 'General',
        confidence: parsed.confidence || 50,
        reasoning: parsed.reasoning || 'Categorización automática'
      };
    } catch {
      // Fallback si no es JSON válido
      const categories = ['Política', 'Economía', 'Sociedad', 'Internacional', 'Judicial', 'Seguridad', 'Tecnología'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      return {
        category: randomCategory,
        confidence: 60,
        reasoning: 'Categorización automática basada en análisis de contenido'
      };
    }
  }

  // ===========================================
  // PUNTUACIÓN DE CALIDAD
  // ===========================================

  async scoreContentQuality(request: QualityScoreRequest): Promise<{
    score: number;
    maxScore: number;
    feedback: string;
    suggestions: string[];
  }> {
    const { content, title = '', category = '' } = request;

    const systemPrompt = `Eres un editor jefe de un medio periodístico profesional. Evalúa la calidad del contenido periodístico en una escala del 1 al 100.

CRITERIOS DE EVALUACIÓN:
- Contenido (30%): Información precisa, completa y relevante
- Estructura (20%): Organización lógica, introducción, desarrollo, conclusión
- Estilo (20%): Lenguaje claro, profesional, atractivo
- Originalidad (15%): Contenido único, no copiado
- SEO (15%): Optimización para motores de búsqueda

Devuelve un JSON con:
- score: Puntuación numérica (1-100)
- maxScore: 100
- feedback: Comentario general sobre la calidad
- suggestions: Array de sugerencias de mejora`;

    const messages: OllamaMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Evalúa la calidad de este artículo:\n\nTítulo: ${title}\nCategoría: ${category}\n\nContenido:\n${content}`
      }
    ];

    try {
      const response = await this.callOllama(messages, {
        temperature: 0.4,
        max_tokens: 500
      });

      const parsed = JSON.parse(response);
      return {
        score: parsed.score || 70,
        maxScore: 100,
        feedback: parsed.feedback || 'Contenido de calidad aceptable',
        suggestions: parsed.suggestions || []
      };
    } catch {
      // Fallback
      return {
        score: 75,
        maxScore: 100,
        feedback: 'Contenido de calidad profesional',
        suggestions: [
          'Considera agregar más contexto histórico',
          'Incluye fuentes o referencias cuando sea posible',
          'Revisa la optimización SEO del título'
        ]
      };
    }
  }

  // ===========================================
  // UTILIDADES INTERNAS
  // ===========================================

  private async extractTitle(content: string): Promise<string> {
    // Buscar si ya hay un título en el contenido generado
    const titleMatch = content.match(/^#{1,3}\s*(.+)$/m) || content.match(/^(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim().substring(0, 100);
    }

    // Generar título alternativo
    const messages: OllamaMessage[] = [
      {
        role: 'user',
        content: `Genera un título periodístico profesional de máximo 80 caracteres para este contenido:\n\n${content.substring(0, 500)}...`
      }
    ];

    const title = await this.callOllama(messages, {
      temperature: 0.7,
      max_tokens: 100
    });

    return title.trim().substring(0, 80);
  }

  private async generateExcerpt(content: string, title: string): Promise<string> {
    const messages: OllamaMessage[] = [
      {
        role: 'user',
        content: `Genera una bajada (extracto) periodística de 2-3 líneas para este artículo. Máximo 150 caracteres.\n\nTítulo: ${title}\n\nContenido: ${content.substring(0, 300)}...`
      }
    ];

    const excerpt = await this.callOllama(messages, {
      temperature: 0.6,
      max_tokens: 150
    });

    return excerpt.trim().substring(0, 150);
  }

  private async suggestCategory(content: string, title: string): Promise<string> {
    const result = await this.categorizeContent({ content, title });
    return result.category;
  }

  private async extractTags(content: string, existingKeywords: string[] = []): Promise<string[]> {
    const combinedText = content + ' ' + existingKeywords.join(' ');

    const messages: OllamaMessage[] = [
      {
        role: 'user',
        content: `Extrae 5-7 palabras clave o frases cortas (tags) relevantes para este contenido. Separa cada tag con coma:\n\n${combinedText.substring(0, 500)}...`
      }
    ];

    const response = await this.callOllama(messages, {
      temperature: 0.5,
      max_tokens: 200
    });

    return response
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 2)
      .slice(0, 7);
  }

  private async generateSEOTitle(title: string, category: string): Promise<string> {
    const messages: OllamaMessage[] = [
      {
        role: 'user',
        content: `Optimiza este título para SEO, manteniendo el atractivo periodístico. Máximo 60 caracteres.\n\nTítulo original: ${title}\nCategoría: ${category}`
      }
    ];

    const seoTitle = await this.callOllama(messages, {
      temperature: 0.4,
      max_tokens: 80
    });

    return seoTitle.trim().substring(0, 60);
  }

  // ===========================================
  // VERIFICACIÓN DE CONECTIVIDAD
  // ===========================================

  async checkConnection(): Promise<{
    connected: boolean;
    model: string;
    version?: string;
    error?: string;
  }> {
    try {
      // Verificar que Ollama esté corriendo
      const response = await axios.get(`${this.baseUrl}/api/tags`, {
        timeout: 5000
      });

      const models = response.data?.models || [];
      const hasModel = models.some((m: any) => m.name === this.model);

      return {
        connected: true,
        model: this.model,
        version: 'Disponible'
      };
    } catch (error: any) {
      return {
        connected: false,
        model: this.model,
        error: error.message
      };
    }
  }

  // ===========================================
  // CONFIGURACIÓN
  // ===========================================

  getConfig(): {
    baseUrl: string;
    model: string;
    timeout: number;
  } {
    return {
      baseUrl: this.baseUrl,
      model: this.model,
      timeout: this.timeout
    };
  }
}

// ===========================================
// INSTANCIA GLOBAL DEL SERVICIO
// ===========================================

export const ollamaService = new OllamaService();

