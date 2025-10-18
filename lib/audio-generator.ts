import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY || '')

export interface AudioGenerationOptions {
  text: string
  locale: string
  voice?: 'male' | 'female'
  speed?: number
}

/**
 * Generate podcast-style audio from text using Hugging Face TTS models
 */
export async function generatePodcastAudio(options: AudioGenerationOptions): Promise<Blob> {
  const { text, locale, voice = 'female', speed = 1.0 } = options

  try {
    // Use Facebook's MMS-TTS model for multilingual support
    const model = 'facebook/mms-tts-spa' // Spanish model, can be changed per locale

    const audioBlob = await hf.textToSpeech({
      model,
      inputs: text,
    })

    return audioBlob
  } catch (error) {
    console.error('Error generating audio:', error)
    throw new Error('Failed to generate podcast audio')
  }
}

/**
 * Get the appropriate TTS model for a given locale
 */
export function getTTSModel(locale: string): string {
  const modelMap: Record<string, string> = {
    'es': 'facebook/mms-tts-spa',
    'en': 'facebook/mms-tts-eng',
    'pt': 'facebook/mms-tts-por',
    'fr': 'facebook/mms-tts-fra',
    'de': 'facebook/mms-tts-deu',
    'it': 'facebook/mms-tts-ita',
    'ja': 'facebook/mms-tts-jpn',
    'zh': 'facebook/mms-tts-cmn',
    'ru': 'facebook/mms-tts-rus',
    'ar': 'facebook/mms-tts-arb',
  }

  return modelMap[locale] || 'facebook/mms-tts-eng'
}

/**
 * Convert news article to podcast script with intro and outro
 */
export function createPodcastScript(article: {
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
}): string {
  const date = new Date(article.publishedAt).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `
[Música de introducción]

Bienvenidos a Política Argentina, tu fuente de noticias políticas confiable.
Hoy es ${date}.

${article.title}

${article.excerpt}

[Pausa]

${article.content}

[Pausa]

Esta noticia fue reportada por ${article.author}.

Gracias por escuchar Política Argentina.
No olvides suscribirte para más actualizaciones.

[Música de cierre]
  `.trim()
}
