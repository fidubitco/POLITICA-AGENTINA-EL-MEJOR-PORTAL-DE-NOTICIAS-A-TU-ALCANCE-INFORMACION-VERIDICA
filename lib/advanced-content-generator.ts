import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

/**
 * Genera contenido 100% único y expandido basado en la noticia original
 */
export async function generateUniqueExpandedContent(
  originalTitle: string,
  originalContent: string,
  category: string
): Promise<{ title: string; content: string; excerpt: string }> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      title: originalTitle,
      content: originalContent,
      excerpt: originalContent.substring(0, 200),
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Eres un periodista senior argentino de POLÍTICA ARGENTINA, el portal de noticias más prestigioso de Argentina.

Tu tarea: crear una versión COMPLETAMENTE NUEVA y EXTENDIDA de la noticia, con autenticidad 100%.

REGLAS ESTRICTAS:
1. NO copies frases exactas del original
2. EXPANDE el contenido 3-5x más largo
3. Agrega contexto histórico relevante
4. Incluye análisis y perspectiva experta
5. Menciona datos estadísticos cuando sea pertinente
6. Usa vocabulario periodístico argentino profesional
7. Estructura: Introducción impactante + Desarrollo extenso + Cierre con proyección
8. Formato HTML con <p>, <h2>, <h3>, <strong>, <em>
9. Mínimo 800 palabras, idealmente 1200-1500
10. NO menciones la fuente original
11. Escribe como si fuera una investigación propia de POLÍTICA ARGENTINA

ESTILO: Objetivo, profesional, pero con toque humano. Como Clarín/La Nación pero mejor.`,
        },
        {
          role: "user",
          content: `Categoría: ${category}

Título original: ${originalTitle}

Contenido original (SOLO COMO REFERENCIA):
${originalContent.substring(0, 2000)}

Crea una noticia COMPLETAMENTE NUEVA, extendida y única.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 3000,
    });

    const fullResponse = response.choices[0]?.message?.content || originalContent;

    // Generar título único
    const titleResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Crea un título periodístico impactante y SEO-optimizado de máximo 60 caracteres. Estilo argentino profesional.",
        },
        {
          role: "user",
          content: `Basado en esta noticia, crea un título único:\n\n${fullResponse.substring(0, 500)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const newTitle = titleResponse.choices[0]?.message?.content?.trim() || originalTitle;

    // Generar extracto
    const excerptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Crea un extracto periodístico atractivo de máximo 160 caracteres que enganche al lector.",
        },
        {
          role: "user",
          content: `Basado en: ${fullResponse.substring(0, 500)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 80,
    });

    const excerpt = excerptResponse.choices[0]?.message?.content?.trim() || fullResponse.substring(0, 160);

    return {
      title: newTitle,
      content: fullResponse,
      excerpt,
    };
  } catch (error) {
    console.error("Error generating unique content:", error);
    return {
      title: originalTitle,
      content: originalContent,
      excerpt: originalContent.substring(0, 200),
    };
  }
}

/**
 * Genera keywords SEO automáticas
 */
export async function generateSEOKeywords(title: string, content: string, category: string): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    return [category, "argentina", "noticias"];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Genera 8-12 keywords SEO de alto volumen para esta noticia argentina.
          
Incluye:
- Keywords long-tail
- Términos de búsqueda locales (Buenos Aires, CABA, provincias)
- Nombres de personas/instituciones mencionadas
- Palabras trending relacionadas

Formato: lista separada por comas, minúsculas.`,
        },
        {
          role: "user",
          content: `Categoría: ${category}\nTítulo: ${title}\n\nContenido: ${content.substring(0, 800)}`,
        },
      ],
      temperature: 0.6,
      max_tokens: 150,
    });

    const keywordsString = response.choices[0]?.message?.content || "";
    return keywordsString
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 2 && k.length < 50)
      .slice(0, 12);
  } catch (error) {
    console.error("Error generating keywords:", error);
    return [category, "argentina", "noticias"];
  }
}

/**
 * Detecta si una noticia es sensible y requiere verificación adicional
 */
export async function detectSensitiveContent(title: string, content: string): Promise<boolean> {
  if (!process.env.OPENAI_API_KEY) {
    return false;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Detecta si esta noticia contiene: acusaciones sin verificar, información sensible sobre personas, rumores, o contenido que requiera fact-checking adicional. Responde SOLO 'SI' o 'NO'.",
        },
        {
          role: "user",
          content: `Título: ${title}\n\nContenido: ${content.substring(0, 500)}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 10,
    });

    const result = response.choices[0]?.message?.content?.trim().toUpperCase();
    return result === "SI";
  } catch (error) {
    return false;
  }
}
