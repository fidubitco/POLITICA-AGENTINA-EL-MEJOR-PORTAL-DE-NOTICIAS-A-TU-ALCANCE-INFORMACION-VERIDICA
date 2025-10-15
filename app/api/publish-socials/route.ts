import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { publishToAll, type ArticleData } from "@/lib/socials/simple-publishers";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { postId, platforms, secret } = await request.json();

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";
    const articleUrl = `${siteUrl}/noticia/${post.slug}`;

    const articleData: ArticleData = {
      title: post.title,
      excerpt: post.excerpt || post.title,
      url: articleUrl,
      coverImage: post.coverImage || undefined,
      category: post.category?.name,
      hashtags: ["Argentina", "Noticias", post.category?.name].filter(Boolean) as string[],
    };

    const results = await publishToAll(articleData);

    return NextResponse.json({
      success: true,
      postId,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Publish to socials error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Social Media Publishing API",
    platforms: ["Telegram", "Discord", "Reddit", "LinkedIn", "Twitter"],
    status: "active",
  });
}
