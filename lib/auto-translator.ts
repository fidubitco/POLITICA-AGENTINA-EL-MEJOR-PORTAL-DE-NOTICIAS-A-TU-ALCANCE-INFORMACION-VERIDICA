import OpenAI from "openai";
import { getLanguageByCode } from "./languages-config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export interface TranslatedContent {
  title: string;
  content: string;
  excerpt: string;
  keywords: string[];
  slug: string;
}

/**
 * Traduce y adapta culturalmente el contenido a otro idioma
 */
export async function translateContentWithContext(
  originalTitle: string,
  originalContent: string,
  originalExcerpt: string,
  targetLanguageCode: string,
  category: string
): Promise<TranslatedContent> {
  const language = getLanguageByCode(targetLanguageCode);
  
  if (!process.env.OPENAI_API_KEY) {
    return {
      title: originalTitle,
      content: originalContent,
      excerpt: originalExcerpt,
      keywords: [],
      slug: generateSlug(originalTitle, targetLanguageCode),
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Eres un traductor profesional experto en periodismo y localización cultural.

MISIÓN: Traducir esta noticia de Argentina al ${language.nativeName} (${language.name}).

REGLAS CRÍTICAS:
1. NO hagas traducción literal. Adapta culturalmente.
2. Explica referencias argentinas que el público ${language.name} no conocería.
3. Convierte montos (pesos argentinos → moneda local cuando sea relevante).
4. Adapta expresiones idiomáticas.
5. Mantén el tono periodístico profesional del idioma destino.
6. Preserva nombres propios pero agrega contexto si es necesario.
7. Formato HTML con <p>, <h2>, <h3>, <strong>.
8. Extensión similar al original (no acortes).

ESTILO: Como si fuera escrito originalmente en ${language.nativeName} por un periodista local que conoce Argentina.`,
        },
        {
          role: "user",
          content: `Categoría: ${category}
Idioma destino: ${language.nativeName} (${language.code})

TÍTULO: ${originalTitle}

EXTRACTO: ${originalExcerpt}

CONTENIDO:
${originalContent}

Traduce y adapta TODO (título, extracto y contenido completo) al ${language.nativeName}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const translated = response.choices[0]?.message?.content || originalContent;

    // Extraer título, extracto y contenido del response
    const lines = translated.split("\n").filter(l => l.trim());
    let title = lines[0]?.replace(/^(TÍTULO|TITLE|TITOLO|TITRE|TITEL):\s*/i, "") || originalTitle;
    title = title.replace(/^#+\s*/, "").trim();

    // Buscar el extracto
    const excerptIndex = lines.findIndex(l => 
      /^(EXTRACTO|EXCERPT|RIASSUNTO|EXTRAIT|AUSZUG|RESUMO):/i.test(l)
    );
    let excerpt = originalExcerpt;
    if (excerptIndex >= 0) {
      excerpt = lines[excerptIndex]
        .replace(/^(EXTRACTO|EXCERPT|RIASSUNTO|EXTRAIT|AUSZUG|RESUMO):\s*/i, "")
        .trim();
    }

    // El resto es el contenido
    let content = lines
      .filter((l, i) => i > 0 && i !== excerptIndex)
      .join("\n")
      .trim();

    // Limpiar cualquier encabezado residual
    content = content.replace(/^(CONTENIDO|CONTENT|CONTENUTO|CONTENU|INHALT):\s*/i, "");

    // Generar keywords en el idioma destino
    const keywordsResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Genera 8-10 keywords SEO en ${language.nativeName} para esta noticia. Incluye términos de búsqueda locales y trending. Formato: lista separada por comas.`,
        },
        {
          role: "user",
          content: `${title}\n\n${content.substring(0, 500)}`,
        },
      ],
      temperature: 0.6,
      max_tokens: 100,
    });

    const keywords = (keywordsResponse.choices[0]?.message?.content || "")
      .split(",")
      .map(k => k.trim())
      .filter(k => k.length > 2);

    return {
      title,
      content,
      excerpt: excerpt || content.substring(0, 160),
      keywords,
      slug: generateSlug(title, targetLanguageCode),
    };
  } catch (error) {
    console.error(`Error translating to ${targetLanguageCode}:`, error);
    return {
      title: originalTitle,
      content: originalContent,
      excerpt: originalExcerpt,
      keywords: [],
      slug: generateSlug(originalTitle, targetLanguageCode),
    };
  }
}

/**
 * Traduce contenido a múltiples idiomas en batch
 */
export async function translateToMultipleLanguages(
  originalTitle: string,
  originalContent: string,
  originalExcerpt: string,
  targetLanguages: string[],
  category: string
): Promise<Record<string, TranslatedContent>> {
  const results: Record<string, TranslatedContent> = {};

  // Procesar en grupos de 3 para no saturar la API
  for (let i = 0; i < targetLanguages.length; i += 3) {
    const batch = targetLanguages.slice(i, i + 3);
    
    const translations = await Promise.all(
      batch.map(lang =>
        translateContentWithContext(
          originalTitle,
          originalContent,
          originalExcerpt,
          lang,
          category
        )
      )
    );

    batch.forEach((lang, index) => {
      results[lang] = translations[index];
    });

    // Pausa entre batches
    if (i + 3 < targetLanguages.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return results;
}

/**
 * Genera slug optimizado para el idioma
 */
function generateSlug(title: string, languageCode: string): string {
  let slug = title
    .toLowerCase()
    .trim();

  // Normalizar según el idioma
  if (["ar", "he", "fa"].includes(languageCode)) {
    // RTL languages: mantener caracteres nativos
    slug = slug.replace(/\s+/g, "-");
  } else if (["zh", "ja", "ko"].includes(languageCode)) {
    // Asian languages: transliterar o usar timestamp
    slug = `article-${Date.now().toString(36)}`;
  } else {
    // Latin-based: normalizar
    slug = slug
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");
  }

  slug = slug
    .replace(/(^-|-$)/g, "")
    .substring(0, 100);

  // Agregar sufijo de idioma
  return `${slug}-${languageCode}`;
}

/**
 * Detecta el idioma de un texto
 */
export async function detectLanguage(text: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "es";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Detecta el idioma de este texto. Responde SOLO con el código ISO 639-1 (ej: es, en, fr, de, etc).",
        },
        {
          role: "user",
          content: text.substring(0, 500),
        },
      ],
      temperature: 0,
      max_tokens: 10,
    });

    return response.choices[0]?.message?.content?.trim().toLowerCase() || "es";
  } catch {
    return "es";
  }
}
