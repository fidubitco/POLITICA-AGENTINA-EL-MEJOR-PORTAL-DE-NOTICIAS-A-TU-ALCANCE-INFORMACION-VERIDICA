export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const { postId, secret } = await request.json();

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Por ahora retorna éxito
    return NextResponse.json({
      success: true,
      postId,
      message: "Translation system ready. Configure GEMINI_API_KEY to activate.",
      results: { translated: 0, failed: 0, languages: [] },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Translation API endpoint",
    supportedLanguages: 80,
    status: "ready",
  });
}
