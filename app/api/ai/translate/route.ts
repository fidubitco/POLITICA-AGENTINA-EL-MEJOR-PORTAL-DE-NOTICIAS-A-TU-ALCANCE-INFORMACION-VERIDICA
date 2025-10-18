import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'

export async function POST(req: NextRequest) {
  try {
    const { text, from, to, quality = 'high' } = await req.json()

    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'text, from, and to are required' },
        { status: 400 }
      )
    }

    console.log('🌍 Translating content...', { from, to, textLength: text.length })

    // Create cache key (for future Redis integration)
    const cacheKey = `translation:${from}:${to}:${createHash('md5').update(text).digest('hex')}`

    // Translate with Llama 3.1
    const prompt = `Translate the following ${from} text to ${to}. Maintain tone, style, and formatting. Only return the translation, no explanations:\n\n${text}`

    const response = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: quality === 'high' ? 'reasoning' : 'fast',
        options: { temperature: 0.3 } // Low temperature for consistency
      })
    })

    if (!response.ok) {
      throw new Error('Translation failed')
    }

    const data = await response.json()

    console.log('✅ Translation completed', {
      translationLength: data.response?.length || 0
    })

    return NextResponse.json({
      translation: data.response,
      cached: false,
      from,
      to,
      cacheKey
    })
  } catch (error: any) {
    console.error('❌ Translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}
