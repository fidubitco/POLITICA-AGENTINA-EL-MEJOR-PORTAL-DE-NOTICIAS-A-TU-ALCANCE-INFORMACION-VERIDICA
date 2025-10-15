/**
 * Procesador de contenido con IA usando Gemini
 */

import { rewriteArticle, generateKeywords, summarizeArticle } from "./gemini-client";

export interface ProcessedContent {
  title: string;
  content: string;
  excerpt: string;
  keywords: string[];
}

/**
 * Procesar artículo completo con Gemini
 */
export async function processArticleWithAI(
  originalTitle: string,
  originalContent: string,
  category: string = "General"
): Promise<ProcessedContent> {
  try {
    // 1. Reescribir artículo
    console.log("Reescribiendo artículo con Gemini...");
    const rewritten = await rewriteArticle(originalTitle, originalContent, category);

    // 2. Generar keywords
    console.log("Generando keywords SEO...");
    const keywords = await generateKeywords(rewritten.title, category, rewritten.content);

    // 3. Generar excerpt si no existe
    let excerpt = rewritten.excerpt;
    if (!excerpt || excerpt.length < 50) {
      console.log("Generando excerpt...");
      excerpt = await summarizeArticle(rewritten.content, 200);
    }

    return {
      title: rewritten.title,
      content: rewritten.content,
      excerpt,
      keywords: keywords.slice(0, 30),
    };
  } catch (error) {
    console.error("Error procesando con Gemini:", error);
    
    // Fallback: devolver contenido original con mínimas modificaciones
    return {
      title: originalTitle,
      content: originalContent,
      excerpt: originalContent.substring(0, 200),
      keywords: [category.toLowerCase(), "argentina", "noticias"],
    };
  }
}

/**
 * Expandir artículo (hacer más largo)
 */
export async function expandArticle(
  title: string,
  content: string,
  targetWordCount: number = 2000
): Promise<string> {
  const { generateContent } = await import("./gemini-client");
  
  const prompt = `Expande este artículo a aproximadamente ${targetWordCount} palabras.

TÍTULO: ${title}

CONTENIDO ACTUAL:
${content}

INSTRUCCIONES:
- Mantener el mensaje principal
- Añadir más detalles, contexto y análisis
- Incluir datos y estadísticas relevantes
- Mantener estilo periodístico argentino
- Formato HTML con <p>, <h2>, <h3>

Responde SOLO con el contenido expandido:`;

  return await generateContent(prompt);
}
