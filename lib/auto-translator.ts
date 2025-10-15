/**
 * Sistema de traducción automática con Gemini
 */

import { translateContent } from "./gemini-client";
import { getLanguageByCode, type Language } from "./languages-config";

export async function translateContentWithContext(
  title: string,
  content: string,
  excerpt: string,
  targetLang: string,
  category: string
): Promise<{
  title: string;
  content: string;
  excerpt: string;
}> {
  const language = getLanguageByCode(targetLang);
  
  if (!language) {
    throw new Error("Language not found: " + targetLang);
  }

  try {
    const [translatedTitle, translatedContent, translatedExcerpt] = await Promise.all([
      translateContent(title, targetLang, category),
      translateContent(content, targetLang, category),
      translateContent(excerpt, targetLang, category),
    ]);

    return {
      title: translatedTitle,
      content: translatedContent,
      excerpt: translatedExcerpt,
    };
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}
