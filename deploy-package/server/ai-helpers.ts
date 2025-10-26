import { invokeLLM } from "./_core/llm";

/**
 * Generate a news article from a topic or URL
 */
export async function generateArticle(params: {
  topic: string;
  category: string;
  language?: string;
  sourceUrl?: string;
  sourceContent?: string;
}): Promise<{
  title: string;
  summary: string;
  content: string;
  tags: string[];
  metaDescription: string;
}> {
  const { topic, category, language = "es", sourceUrl, sourceContent } = params;

  const systemPrompt = `Eres un periodista profesional argentino especializado en ${category}. 
Tu tarea es escribir artículos de noticias de alta calidad, objetivos y bien investigados.
Debes escribir en español argentino (${language}) con un tono profesional y periodístico.
IMPORTANTE: Si se proporciona contenido fuente, debes reescribirlo completamente con tus propias palabras,
manteniendo los hechos pero cambiando la estructura, vocabulario y enfoque para evitar plagio.`;

  const userPrompt = sourceContent
    ? `Reescribe profesionalmente la siguiente noticia sobre "${topic}" en la categoría ${category}.
    
Contenido original:
${sourceContent}

${sourceUrl ? `Fuente: ${sourceUrl}` : ""}

Instrucciones:
1. Reescribe completamente el contenido con tus propias palabras
2. Mantén todos los hechos y datos importantes
3. Cambia la estructura y el orden de la información
4. Usa sinónimos y diferentes construcciones gramaticales
5. Agrega contexto adicional si es relevante
6. Mantén un tono profesional y objetivo
7. El artículo debe tener al menos 500 palabras
8. Incluye subtítulos para organizar el contenido

Genera un artículo completo en formato JSON con esta estructura:
{
  "title": "Título atractivo y descriptivo",
  "summary": "Resumen breve de 2-3 oraciones",
  "content": "Contenido completo del artículo en HTML con <h2>, <h3>, <p>, etc.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaDescription": "Meta descripción SEO de 150-160 caracteres"
}`
    : `Escribe un artículo de noticias profesional sobre "${topic}" en la categoría ${category}.

${sourceUrl ? `Investiga y basa el artículo en información de: ${sourceUrl}` : ""}

Instrucciones:
1. Investiga el tema y escribe un artículo completo y original
2. Incluye datos, estadísticas y contexto relevante
3. Mantén un tono profesional y objetivo
4. El artículo debe tener al menos 500 palabras
5. Incluye subtítulos para organizar el contenido
6. Asegúrate de que el contenido sea actual y relevante

Genera un artículo completo en formato JSON con esta estructura:
{
  "title": "Título atractivo y descriptivo",
  "summary": "Resumen breve de 2-3 oraciones",
  "content": "Contenido completo del artículo en HTML con <h2>, <h3>, <p>, etc.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaDescription": "Meta descripción SEO de 150-160 caracteres"
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_generation",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string", description: "Article title" },
              summary: { type: "string", description: "Brief summary" },
              content: { type: "string", description: "Full article content in HTML" },
              tags: {
                type: "array",
                items: { type: "string" },
                description: "Article tags",
              },
              metaDescription: { type: "string", description: "SEO meta description" },
            },
            required: ["title", "summary", "content", "tags", "metaDescription"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
      throw new Error("No content generated");
    }

    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error("Error generating article:", error);
    throw new Error(`Failed to generate article: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Rewrite an existing article to avoid plagiarism
 */
export async function rewriteArticle(params: {
  originalTitle: string;
  originalContent: string;
  category: string;
  language?: string;
}): Promise<{
  title: string;
  summary: string;
  content: string;
  tags: string[];
}> {
  const { originalTitle, originalContent, category, language = "es" } = params;

  const systemPrompt = `Eres un periodista profesional argentino especializado en reescritura de contenido.
Tu tarea es reescribir artículos manteniendo los hechos pero cambiando completamente la forma de expresarlos.
Debes escribir en español argentino (${language}) con un tono profesional y periodístico.`;

  const userPrompt = `Reescribe completamente el siguiente artículo sobre "${originalTitle}" en la categoría ${category}.

Contenido original:
${originalContent}

Instrucciones de reescritura:
1. Mantén todos los hechos, datos y cifras importantes
2. Cambia completamente la estructura del artículo
3. Usa sinónimos y diferentes construcciones gramaticales
4. Reorganiza los párrafos y el orden de la información
5. Agrega contexto adicional si es relevante
6. Cambia el título a algo diferente pero igualmente atractivo
7. El artículo reescrito debe ser único y no detectarse como plagio
8. Mantén la longitud similar al original (mínimo 500 palabras)
9. Incluye subtítulos diferentes

Genera el artículo reescrito en formato JSON:
{
  "title": "Nuevo título atractivo y diferente",
  "summary": "Nuevo resumen de 2-3 oraciones",
  "content": "Contenido completamente reescrito en HTML con <h2>, <h3>, <p>, etc.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_rewrite",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              summary: { type: "string" },
              content: { type: "string" },
              tags: { type: "array", items: { type: "string" } },
            },
            required: ["title", "summary", "content", "tags"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
      throw new Error("No content generated");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error rewriting article:", error);
    throw new Error(`Failed to rewrite article: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Generate article from URL by scraping and rewriting
 */
export async function generateFromUrl(params: {
  url: string;
  category: string;
  language?: string;
}): Promise<{
  title: string;
  summary: string;
  content: string;
  tags: string[];
  metaDescription: string;
  sourceUrl: string;
}> {
  // Note: In production, you would use a web scraping library here
  // For now, we'll use the LLM to generate content based on the URL
  const result = await generateArticle({
    topic: `Contenido de ${params.url}`,
    category: params.category,
    language: params.language,
    sourceUrl: params.url,
  });

  return {
    ...result,
    sourceUrl: params.url,
  };
}

/**
 * Translate article to another language
 */
export async function translateArticle(params: {
  title: string;
  content: string;
  summary: string;
  fromLanguage: string;
  toLanguage: string;
}): Promise<{
  title: string;
  summary: string;
  content: string;
}> {
  const { title, content, summary, fromLanguage, toLanguage } = params;

  const systemPrompt = `Eres un traductor profesional especializado en contenido periodístico.
Tu tarea es traducir artículos de noticias de ${fromLanguage} a ${toLanguage} manteniendo el tono profesional y la precisión.`;

  const userPrompt = `Traduce el siguiente artículo de ${fromLanguage} a ${toLanguage}:

Título: ${title}

Resumen: ${summary}

Contenido:
${content}

Instrucciones:
1. Mantén el formato HTML del contenido
2. Traduce de manera natural y fluida
3. Mantén el tono profesional y periodístico
4. Adapta expresiones idiomáticas cuando sea necesario
5. Mantén los nombres propios sin traducir

Genera la traducción en formato JSON:
{
  "title": "Título traducido",
  "summary": "Resumen traducido",
  "content": "Contenido traducido en HTML"
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_translation",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              summary: { type: "string" },
              content: { type: "string" },
            },
            required: ["title", "summary", "content"],
            additionalProperties: false,
          },
        },
      },
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent || typeof responseContent !== 'string') {
      throw new Error("No content generated");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error translating article:", error);
    throw new Error(`Failed to translate article: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Summarize a long article into a concise version
 */
export async function summarizeArticle(params: {
  title: string;
  content: string;
  targetLength?: "short" | "medium" | "long";
  language?: string;
}): Promise<{
  summary: string;
  keyPoints: string[];
  wordCount: number;
}> {
  const { title, content, targetLength = "medium", language = "es" } = params;

  const lengthInstructions = {
    short: "un resumen muy breve de 2-3 oraciones (50-75 palabras)",
    medium: "un resumen conciso de 1 párrafo (100-150 palabras)",
    long: "un resumen detallado de 2-3 párrafos (200-300 palabras)",
  };

  const systemPrompt = `Eres un experto en síntesis de información y resumen de contenido periodístico.
Tu tarea es crear resúmenes precisos, informativos y bien estructurados en español (${language}).`;

  const userPrompt = `Resume el siguiente artículo titulado "${title}":

${content}

Instrucciones:
1. Crea ${lengthInstructions[targetLength]}
2. Mantén los hechos más importantes y relevantes
3. Usa un lenguaje claro y directo
4. Extrae 5 puntos clave del artículo
5. El resumen debe ser objetivo y profesional

Genera el resultado en formato JSON:
{
  "summary": "Resumen del artículo",
  "keyPoints": ["punto1", "punto2", "punto3", "punto4", "punto5"],
  "wordCount": número_de_palabras_del_resumen
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_summary",
          strict: true,
          schema: {
            type: "object",
            properties: {
              summary: { type: "string" },
              keyPoints: { type: "array", items: { type: "string" } },
              wordCount: { type: "number" },
            },
            required: ["summary", "keyPoints", "wordCount"],
            additionalProperties: false,
          },
        },
      },
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent || typeof responseContent !== 'string') {
      throw new Error("No content generated");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error summarizing article:", error);
    throw new Error(`Failed to summarize article: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Rewrite article with different tone or style
 */
export async function rewriteWithStyle(params: {
  title: string;
  content: string;
  style: "formal" | "casual" | "technical" | "sensationalist" | "neutral";
  language?: string;
}): Promise<{
  title: string;
  content: string;
  summary: string;
}> {
  const { title, content, style, language = "es" } = params;

  const styleInstructions = {
    formal: "un tono formal, académico y profesional, usando vocabulario técnico apropiado",
    casual: "un tono casual, cercano y conversacional, como si hablaras con un amigo",
    technical: "un tono técnico y especializado, con terminología precisa y análisis profundo",
    sensationalist: "un tono sensacionalista y llamativo, con titulares impactantes (pero manteniendo la veracidad)",
    neutral: "un tono completamente neutral y objetivo, estilo agencia de noticias",
  };

  const systemPrompt = `Eres un periodista profesional experto en adaptar el tono y estilo de escritura.
Tu tarea es reescribir artículos manteniendo los hechos pero cambiando el estilo de redacción.
Debes escribir en español (${language}).`;

  const userPrompt = `Reescribe el siguiente artículo con ${styleInstructions[style]}:

Título original: ${title}

Contenido original:
${content}

Instrucciones:
1. Reescribe el artículo completo con el estilo solicitado
2. Mantén todos los hechos, datos y cifras importantes
3. Cambia la estructura, vocabulario y construcciones gramaticales
4. Crea un nuevo título que refleje el estilo
5. El artículo reescrito debe tener una longitud similar al original
6. Incluye subtítulos apropiados al estilo

Genera el resultado en formato JSON:
{
  "title": "Nuevo título en el estilo solicitado",
  "content": "Contenido completo reescrito en HTML con <h2>, <h3>, <p>, etc.",
  "summary": "Breve resumen de 2-3 oraciones"
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_rewrite_style",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              content: { type: "string" },
              summary: { type: "string" },
            },
            required: ["title", "content", "summary"],
            additionalProperties: false,
          },
        },
      },
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent || typeof responseContent !== 'string') {
      throw new Error("No content generated");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error rewriting with style:", error);
    throw new Error(`Failed to rewrite with style: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Generate multiple versions of the same article
 */
export async function generateVariations(params: {
  title: string;
  content: string;
  numberOfVariations: number;
  language?: string;
}): Promise<Array<{
  title: string;
  content: string;
  summary: string;
  variation: number;
}>> {
  const { title, content, numberOfVariations, language = "es" } = params;
  const variations = [];

  for (let i = 0; i < numberOfVariations; i++) {
    const result = await rewriteArticle({
      originalTitle: title,
      originalContent: content,
      category: "general",
      language,
    });
    variations.push({
      ...result,
      variation: i + 1,
    });
  }

  return variations;
}

/**
 * Generate SEO-optimized meta tags for an article
 */
export async function generateSEOTags(params: {
  title: string;
  content: string;
  category: string;
}): Promise<{
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}> {
  const { title, content, category } = params;

  const systemPrompt = `Eres un experto en SEO especializado en optimización de contenido para motores de búsqueda.`;

  const userPrompt = `Genera etiquetas SEO optimizadas para el siguiente artículo:

Título: ${title}
Categoría: ${category}
Contenido: ${content.substring(0, 500)}...

Genera las etiquetas en formato JSON:
{
  "metaTitle": "Título SEO optimizado (50-60 caracteres)",
  "metaDescription": "Descripción SEO (150-160 caracteres)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "ogTitle": "Título para Open Graph",
  "ogDescription": "Descripción para Open Graph"
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "seo_tags",
          strict: true,
          schema: {
            type: "object",
            properties: {
              metaTitle: { type: "string" },
              metaDescription: { type: "string" },
              keywords: { type: "array", items: { type: "string" } },
              ogTitle: { type: "string" },
              ogDescription: { type: "string" },
            },
            required: ["metaTitle", "metaDescription", "keywords", "ogTitle", "ogDescription"],
            additionalProperties: false,
          },
        },
      },
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent || typeof responseContent !== 'string') {
      throw new Error("No content generated");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error generating SEO tags:", error);
    throw new Error(`Failed to generate SEO tags: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

