import { NextRequest, NextResponse } from 'next/server'

const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    console.log('🔢 Generating embedding...', { textLength: text.length })

    const response = await fetch(`${AI_GATEWAY_URL}/api/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })

    if (!response.ok) {
      throw new Error('Embedding generation failed')
    }

    const data = await response.json()

    console.log('✅ Embedding generated', { dimensions: data.dimensions })

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('❌ Embedding error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate embedding' },
      { status: 500 }
    )
  }
}
