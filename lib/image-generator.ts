import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY || '')

export interface ImageGenerationOptions {
  prompt: string
  negativePrompt?: string
  width?: number
  height?: number
  numInferenceSteps?: number
  guidanceScale?: number
  model?: string
}

/**
 * Generate hyper-realistic news images using Stable Diffusion
 */
export async function generateNewsImage(options: ImageGenerationOptions): Promise<Blob> {
  const {
    prompt,
    negativePrompt = 'blurry, low quality, distorted, ugly, cartoon',
    width = 1024,
    height = 768,
    numInferenceSteps = 50,
    guidanceScale = 7.5,
    model = 'stabilityai/stable-diffusion-xl-base-1.0'
  } = options

  try {
    const enhancedPrompt = `
      Hyper-realistic, professional news photography, ${prompt},
      photojournalism style, high quality, 8K resolution,
      professional lighting, sharp focus, detailed
    `.trim()

    const imageBlob = await hf.textToImage({
      model,
      inputs: enhancedPrompt,
      parameters: {
        negative_prompt: negativePrompt,
        width,
        height,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale,
      }
    })

    return imageBlob
  } catch (error) {
    console.error('Error generating image:', error)
    throw new Error('Failed to generate news image')
  }
}

/**
 * Create news-specific image prompt from article data
 */
export function createNewsImagePrompt(article: {
  title: string
  category: string
  excerpt: string
}): string {
  const categoryPrompts: Record<string, string> = {
    'escandalo-judicial': 'courtroom, judge, legal documents, justice scale, professional photography',
    'gran-injusticia': 'protest, people marching, justice, social movement, documentary style',
    'impunidad': 'government building, political figures, serious atmosphere, news photography',
    'manipulacion': 'media, screens, information, technology, modern newsroom',
    'cronologia': 'timeline, calendar, historical events, documentation',
  }

  const categoryPrompt = categoryPrompts[article.category] || 'news event, professional journalism'

  return `
    ${categoryPrompt},
    related to: ${article.title.substring(0, 100)},
    professional news photography,
    realistic, high quality
  `.trim()
}

/**
 * Alternative: Use Dall-E 3 for ultra-realistic images
 */
export async function generateWithDallE3(prompt: string): Promise<string> {
  // This would require OpenAI API integration
  // For now, return placeholder
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `Professional news photography: ${prompt}`,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
        style: 'natural',
      }),
    })

    const data = await response.json()
    return data.data[0].url
  } catch (error) {
    console.error('Error with DALL-E 3:', error)
    throw new Error('Failed to generate image with DALL-E 3')
  }
}

/**
 * Save generated image to public directory
 */
export async function saveGeneratedImage(
  imageBlob: Blob,
  filename: string
): Promise<string> {
  const buffer = Buffer.from(await imageBlob.arrayBuffer())
  const fs = await import('fs/promises')
  const path = await import('path')

  const publicPath = path.join(process.cwd(), 'public', 'generated', filename)

  // Ensure directory exists
  await fs.mkdir(path.dirname(publicPath), { recursive: true })

  // Save image
  await fs.writeFile(publicPath, buffer)

  return `/generated/${filename}`
}
