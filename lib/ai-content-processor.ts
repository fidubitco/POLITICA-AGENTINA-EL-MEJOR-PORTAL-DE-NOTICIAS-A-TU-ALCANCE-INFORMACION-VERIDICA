import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

/**
 * Reescribe el contenido usando IA para hacerlo único
 */
export async function rewriteContent(originalContent: string, title: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key not configured, returning original content");
    return originalContent;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un periodista profesional argentino. Reescribe la siguiente noticia manteniendo los hechos exactos pero usando tus propias palabras. 
          
Reglas:
- Mantén todos los hechos, fechas, nombres y datos exactos
- Usa un estilo periodístico profesional argentino
- Cambia la estructura de las oraciones
- Usa sinónimos apropiados
- Mantén la longitud similar
- No agregues opiniones personales
- Escribe en español argentino
- Usa párrafos HTML (<p>)`,
        },
        {
          role: "user",
          content: `Título: ${title}\n\nContenido original:\n${originalContent}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || originalContent;
  } catch (error) {
    console.error("Error rewriting content with AI:", error);
    return originalContent;
  }
}

/**
 * Genera un extracto mejorado usando IA
 */
export async function generateExcerpt(content: string, title: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Fallback: tomar primeros 200 caracteres
    return content.replace(/<[^>]*>/g, "").substring(0, 200) + "...";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un editor de noticias. Crea un extracto conciso y atractivo de máximo 150 caracteres que capte la esencia de la noticia.",
        },
        {
          role: "user",
          content: `Título: ${title}\n\nContenido: ${content.substring(0, 1000)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content || content.substring(0, 150);
  } catch (error) {
    console.error("Error generating excerpt:", error);
    return content.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
  }
}

/**
 * Categoriza automáticamente la noticia
 */
export async function categorizeArticle(title: string, content: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "politica"; // Categoría por defecto
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Clasifica esta noticia en UNA de estas categorías: politica, economia, sociedad, internacional, deportes, tecnologia.
          
Responde SOLO con el nombre de la categoría en minúsculas, sin puntuación.`,
        },
        {
          role: "user",
          content: `Título: ${title}\n\nContenido: ${content.substring(0, 500)}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 20,
    });

    const category = response.choices[0]?.message?.content?.trim().toLowerCase();
    const validCategories = ["politica", "economia", "sociedad", "internacional", "deportes", "tecnologia"];
    
    return validCategories.includes(category || "") ? category! : "politica";
  } catch (error) {
    console.error("Error categorizing article:", error);
    return "politica";
  }
}

/**
 * Genera tags relevantes para el artículo
 */
export async function generateTags(title: string, content: string): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    return [];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Genera 3-5 tags relevantes para esta noticia. Responde con una lista separada por comas, en minúsculas.",
        },
        {
          role: "user",
          content: `Título: ${title}\n\nContenido: ${content.substring(0, 500)}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 50,
    });

    const tagsString = response.choices[0]?.message?.content || "";
    return tagsString.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
  } catch (error) {
    console.error("Error generating tags:", error);
    return [];
  }
}
