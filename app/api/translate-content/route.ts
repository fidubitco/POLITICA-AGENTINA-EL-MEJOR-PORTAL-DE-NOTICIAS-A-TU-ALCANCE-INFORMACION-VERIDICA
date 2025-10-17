import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface TranslateRequest {
  postId: string;
  targetLanguages: string[];
}

export async function POST(request: Request) {
  try {
    const body: TranslateRequest = await request.json();
    const { postId, targetLanguages } = body;

    if (!postId || !targetLanguages || targetLanguages.length === 0) {
      return NextResponse.json(
        { error: "postId and targetLanguages are required" },
        { status: 400 }
      );
    }

    // Get original post
    const post = await db.post.findUnique({
      where: { id: postId },
      include: { category: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const translations: any[] = [];

    // Translate to each target language
    for (const langCode of targetLanguages) {
      const prompt = `
Translate the following news article to ${langCode} (language code).

IMPORTANT INSTRUCTIONS:
- Maintain journalistic tone and accuracy
- Preserve all proper nouns (names, places)
- Adapt idioms and expressions culturally
- Keep technical and political terms accurate
- Maintain paragraph structure
- Use natural, native-level language

ORIGINAL TITLE:
${post.title}

ORIGINAL EXCERPT:
${post.excerpt || ''}

ORIGINAL CONTENT (HTML):
${typeof post.content === 'string' ? post.content : JSON.stringify(post.content)}

Respond ONLY with a JSON object in this exact format:
{
  "title": "Translated title",
  "excerpt": "Translated excerpt",
  "content": "Translated content in HTML format",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "metaTitle": "SEO optimized title for ${langCode}",
  "metaDescription": "SEO optimized description for ${langCode}"
}
`;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

        // Clean JSON response
        if (text.startsWith('```json')) {
          text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (text.startsWith('```')) {
          text = text.replace(/```\n?/g, '');
        }

        const translation = JSON.parse(text);

        // Generate unique slug for translation
        const baseSlug = post.slug;
        const translatedSlug = `${baseSlug}-${langCode}`;

        // Check if translation already exists
        const existing = await db.postTranslation.findUnique({
          where: {
            slug: translatedSlug,
          },
        });

        if (existing) {
          // Update existing translation
          await db.postTranslation.update({
            where: { id: existing.id },
            data: {
              title: translation.title,
              excerpt: translation.excerpt,
              content: { html: translation.content },
              keywords: translation.keywords || [],
              metaTitle: translation.metaTitle,
              metaDesc: translation.metaDescription,
              status: 'COMPLETED',
              quality: 85, // AI translation quality score
            },
          });
        } else {
          // Create new translation
          await db.postTranslation.create({
            data: {
              postId: post.id,
              languageCode: langCode,
              slug: translatedSlug,
              title: translation.title,
              excerpt: translation.excerpt,
              content: { html: translation.content },
              keywords: translation.keywords || [],
              metaTitle: translation.metaTitle,
              metaDesc: translation.metaDescription,
              status: 'COMPLETED',
              quality: 85,
            },
          });
        }

        translations.push({
          language: langCode,
          slug: translatedSlug,
          title: translation.title,
        });

      } catch (langError) {
        console.error(`Error translating to ${langCode}:`, langError);
        translations.push({
          language: langCode,
          error: langError instanceof Error ? langError.message : 'Translation failed',
        });
      }
    }

    return NextResponse.json({
      success: true,
      postId,
      translations,
      message: `Translated to ${targetLanguages.length} language(s)`,
    });

  } catch (error) {
    console.error('Error in translate-content:', error);
    return NextResponse.json(
      {
        error: 'Translation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
