import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface TranslationOptions {
  text: string;
  targetLanguage: string;
  context?: string;
  tone?: 'formal' | 'casual' | 'neutral';
}

/**
 * Traduce texto usando OpenAI GPT-4
 */
export async function translateText(options: TranslationOptions): Promise<string> {
  const { text, targetLanguage, context, tone = 'neutral' } = options;

  const languageNames: Record<string, string> = {
    es: 'Spanish',
    en: 'English',
    pt: 'Portuguese',
    fr: 'French',
    it: 'Italian',
    de: 'German',
  };

  const toneInstructions: Record<string, string> = {
    formal: 'Use formal and professional language.',
    casual: 'Use casual and conversational language.',
    neutral: 'Use neutral and balanced language.',
  };

  const prompt = `
Translate the following text to ${languageNames[targetLanguage] || targetLanguage}.

${toneInstructions[tone]}

${context ? `Context: ${context}` : ''}

IMPORTANT:
- Maintain the journalistic style and tone
- Keep political terminology accurate
- Preserve the meaning and nuance
- Adapt idioms and expressions appropriately
- Maintain proper punctuation and formatting

Text to translate:
"${text}"

Provide only the translated text without additional comments or explanations.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert translator specializing in political journalism. You translate accurately while maintaining the professional tone and political context.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const translation = completion.choices[0]?.message?.content?.trim();

    if (!translation) {
      throw new Error('No translation received');
    }

    return translation;

  } catch (error) {
    console.error('Translation error:', error);
    // Fallback: return original text
    return text;
  }
}

/**
 * Traduce múltiples textos en lote
 */
export async function translateBatch(
  texts: TranslationOptions[]
): Promise<string[]> {
  const translations: string[] = [];

  // Process in batches to avoid rate limits
  const batchSize = 5;
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    const batchPromises = batch.map(text => translateText(text));
    const batchResults = await Promise.all(batchPromises);

    translations.push(...batchResults);

    // Small delay between batches
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return translations;
}

/**
 * Traduce un artículo completo
 */
export async function translateArticle(
  article: {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
  },
  targetLanguage: string
): Promise<{
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}> {
  const [translatedTitle, translatedExcerpt, translatedContent, translatedTags] = await Promise.all([
    translateText({
      text: article.title,
      targetLanguage,
      context: 'Article title - should be catchy and informative',
      tone: 'neutral'
    }),
    translateText({
      text: article.excerpt,
      targetLanguage,
      context: 'Article summary - should be concise and engaging',
      tone: 'neutral'
    }),
    translateText({
      text: article.content,
      targetLanguage,
      context: 'Full article content - maintain journalistic style',
      tone: 'formal'
    }),
    translateBatch(
      article.tags.map(tag => ({
        text: tag,
        targetLanguage,
        context: 'Article tag/keyword',
        tone: 'neutral'
      }))
    )
  ]);

  return {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    content: translatedContent,
    tags: translatedTags,
  };
}

/**
 * Detecta el idioma del texto
 */
export async function detectLanguage(text: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Detect the language of the following text and return only the ISO 639-1 language code (e.g., "es", "en", "pt", "fr", "it", "de").'
        },
        {
          role: 'user',
          content: text.substring(0, 500) // Limit text length
        }
      ],
      temperature: 0,
      max_tokens: 2,
    });

    const detectedLang = completion.choices[0]?.message?.content?.trim().toLowerCase();

    // Validate the detected language
    const supportedLangs = ['es', 'en', 'pt', 'fr', 'it', 'de'];
    return supportedLangs.includes(detectedLang || '') ? detectedLang! : 'es';

  } catch (error) {
    console.error('Language detection error:', error);
    return 'es'; // Default to Spanish
  }
}

/**
 * Obtiene las traducciones disponibles para un texto
 */
export async function getAvailableTranslations(
  text: string
): Promise<Array<{ language: string; code: string; translated: boolean }>> {
  const supportedLanguages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const originalLang = await detectLanguage(text);

  return supportedLanguages.map(lang => ({
    language: lang.name,
    code: lang.code,
    translated: lang.code === originalLang,
  }));
}

