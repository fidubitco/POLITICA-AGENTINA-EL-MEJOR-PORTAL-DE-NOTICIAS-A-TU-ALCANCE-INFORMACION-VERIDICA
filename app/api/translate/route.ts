import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { translateContentWithContext, translateToMultipleLanguages } from "@/lib/auto-translator";
import { getTopLanguages } from "@/lib/languages-config";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const { postId, targetLanguages, secret } = await request.json();

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await db.post.findUnique({
      where: { id: postId },
      include: { category: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const languages = targetLanguages || getTopLanguages(20).map(l => l.code).filter(c => c !== post.originalLang);

    const results = {
      postId,
      translated: 0,
      failed: 0,
      languages: [] as string[],
    };

    for (const langCode of languages) {
      try {
        const translated = await translateContentWithContext(
          post.title,
          JSON.stringify(post.content),
          post.excerpt || "",
          langCode,
          post.category?.name || "General"
        );

        await db.postTranslation.upsert({
          where: {
            postId_languageCode: {
              postId: post.id,
              languageCode: langCode,
            },
          },
          create: {
            postId: post.id,
            languageCode: langCode,
            title: translated.title,
            slug: translated.slug,
            excerpt: translated.excerpt,
            content: translated.content,
            keywords: translated.keywords,
            status: "COMPLETED",
            quality: 85,
          },
          update: {
            title: translated.title,
            excerpt: translated.excerpt,
            content: translated.content,
            keywords: translated.keywords,
            status: "COMPLETED",
            updatedAt: new Date(),
          },
        });

        results.translated++;
        results.languages.push(langCode);

        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(\`Error translating to \${langCode}:\`, error);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const stats = await db.postTranslation.groupBy({
    by: ["languageCode"],
    _count: true,
  });

  return NextResponse.json({
    message: "Translation API endpoint",
    stats,
    supportedLanguages: getTopLanguages(80).length,
  });
}
