import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'

const prisma = new PrismaClient()
const AI_GATEWAY_URL = process.env.AI_GATEWAY_URL || 'http://localhost:4000'

interface TranslateRequest {
  postId: string
  targetLang: string
  quality?: 'high' | 'fast'
}

export async function POST(req: NextRequest) {
  try {
    const { postId, targetLang, quality = 'high' }: TranslateRequest = await req.json()

    if (!postId || !targetLang) {
      return NextResponse.json(
        { error: 'postId and targetLang are required' },
        { status: 400 }
      )
    }

    console.log('🌍 Starting post translation...', { postId, targetLang })

    // 1. Check if translation already exists
    const existingTranslation = await prisma.postTranslation.findFirst({
      where: { postId, languageCode: targetLang }
    })

    if (existingTranslation) {
      console.log('✅ Translation already exists', { translationId: existingTranslation.id })
      return NextResponse.json({
        translation: existingTranslation,
        cached: true
      })
    }

    // 2. Fetch original post
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true } }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // 3. Update status to TRANSLATING
    const newTranslation = await prisma.postTranslation.create({
      data: {
        postId,
        languageCode: targetLang,
        title: 'Translating...',
        slug: `translating-${Date.now()}`,
        content: {},
        status: 'TRANSLATING'
      }
    })

    console.log('🔄 Translation record created', { translationId: newTranslation.id })

    // 4. Translate content fields
    const sourceLang = post.originalLang

    // Translate title
    const titleResponse = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Translate this ${sourceLang} title to ${targetLang}. Only return the translation, no explanations:\n\n${post.title}`,
        model: quality === 'high' ? 'reasoning' : 'fast',
        options: { temperature: 0.3 }
      })
    })

    if (!titleResponse.ok) throw new Error('Title translation failed')
    const titleData = await titleResponse.json()
    const translatedTitle = titleData.response.trim()

    // Translate excerpt
    let translatedExcerpt = null
    if (post.excerpt) {
      const excerptResponse = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Translate this ${sourceLang} excerpt to ${targetLang}. Only return the translation:\n\n${post.excerpt}`,
          model: quality === 'high' ? 'reasoning' : 'fast',
          options: { temperature: 0.3 }
        })
      })

      if (excerptResponse.ok) {
        const excerptData = await excerptResponse.json()
        translatedExcerpt = excerptData.response.trim()
      }
    }

    // Translate content (assuming JSON structure with text blocks)
    let translatedContent = post.content
    if (typeof post.content === 'object' && post.content !== null) {
      const contentString = JSON.stringify(post.content)

      const contentResponse = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Translate this ${sourceLang} content to ${targetLang}. Maintain JSON structure. Only return the translated JSON:\n\n${contentString}`,
          model: quality === 'high' ? 'reasoning' : 'fast',
          options: { temperature: 0.3 }
        })
      })

      if (contentResponse.ok) {
        const contentData = await contentResponse.json()
        try {
          translatedContent = JSON.parse(contentData.response)
        } catch {
          // If parsing fails, keep original content structure
          translatedContent = post.content
        }
      }
    }

    // Translate meta title
    let translatedMetaTitle = null
    if (post.metaTitle) {
      const metaTitleResponse = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Translate this ${sourceLang} SEO title to ${targetLang}. Only return the translation:\n\n${post.metaTitle}`,
          model: quality === 'high' ? 'reasoning' : 'fast',
          options: { temperature: 0.3 }
        })
      })

      if (metaTitleResponse.ok) {
        const metaTitleData = await metaTitleResponse.json()
        translatedMetaTitle = metaTitleData.response.trim()
      }
    }

    // Translate meta description
    let translatedMetaDesc = null
    if (post.metaDesc) {
      const metaDescResponse = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Translate this ${sourceLang} SEO description to ${targetLang}. Only return the translation:\n\n${post.metaDesc}`,
          model: quality === 'high' ? 'reasoning' : 'fast',
          options: { temperature: 0.3 }
        })
      })

      if (metaDescResponse.ok) {
        const metaDescData = await metaDescResponse.json()
        translatedMetaDesc = metaDescData.response.trim()
      }
    }

    // 5. Generate slug from translated title
    const slug = translatedTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100)

    // Ensure unique slug
    const uniqueSlug = `${slug}-${targetLang}-${createHash('md5').update(postId + targetLang).digest('hex').substring(0, 8)}`

    // 6. Generate keywords (optional - using AI)
    const keywordsResponse = await fetch(`${AI_GATEWAY_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Generate 5-7 SEO keywords in ${targetLang} for this article titled "${translatedTitle}". Return only comma-separated keywords.`,
        model: 'fast',
        options: { temperature: 0.5 }
      })
    })

    let keywords: string[] = []
    if (keywordsResponse.ok) {
      const keywordsData = await keywordsResponse.json()
      keywords = keywordsData.response
        .split(',')
        .map((k: string) => k.trim())
        .filter((k: string) => k.length > 0)
        .slice(0, 7)
    }

    // 7. Update translation with completed data
    const updatedTranslation = await prisma.postTranslation.update({
      where: { id: newTranslation.id },
      data: {
        title: translatedTitle,
        slug: uniqueSlug,
        excerpt: translatedExcerpt,
        content: translatedContent as any,
        metaTitle: translatedMetaTitle,
        metaDesc: translatedMetaDesc,
        keywords,
        status: 'COMPLETED',
        quality: 85 // High quality AI translation
      }
    })

    console.log('✅ Translation completed successfully', {
      translationId: updatedTranslation.id,
      slug: uniqueSlug,
      keywordsCount: keywords.length
    })

    return NextResponse.json({
      translation: updatedTranslation,
      cached: false,
      originalPost: {
        id: post.id,
        title: post.title,
        slug: post.slug
      }
    })

  } catch (error: any) {
    console.error('❌ Translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// GET endpoint to retrieve translation status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('postId')
    const lang = searchParams.get('lang')

    if (!postId || !lang) {
      return NextResponse.json(
        { error: 'postId and lang query parameters are required' },
        { status: 400 }
      )
    }

    const translation = await prisma.postTranslation.findFirst({
      where: {
        postId,
        languageCode: lang
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
            originalLang: true
          }
        }
      }
    })

    if (!translation) {
      return NextResponse.json(
        { error: 'Translation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ translation })

  } catch (error: any) {
    console.error('❌ Get translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch translation' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
