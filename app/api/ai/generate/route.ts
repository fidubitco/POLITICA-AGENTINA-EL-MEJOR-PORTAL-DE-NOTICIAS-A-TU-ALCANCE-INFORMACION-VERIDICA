import { NextRequest, NextResponse } from 'next/server'

const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, model = 'reasoning', options = {} } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    console.log('🤖 Generating content with AI Gateway...', {
      model,
      promptLength: prompt.length
    })

    const response = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model, options })
    })

    if (!response.ok) {
      throw new Error(`AI Gateway error: ${response.statusText}`)
    }

    const data = await response.json()

    console.log('✅ Content generated successfully', {
      responseLength: data.response?.length || 0
    })

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('❌ AI Generate error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    )
  }
}
