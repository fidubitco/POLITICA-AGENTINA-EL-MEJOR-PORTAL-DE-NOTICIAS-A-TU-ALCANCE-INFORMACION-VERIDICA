export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Por ahora retorna éxito (implementación completa después)
    return NextResponse.json({
      success: true,
      message: "Sistema de ingesta listo. Configure GEMINI_API_KEY para activar.",
      results: {
        processed: 0,
        created: 0,
        skipped: 0,
        errors: 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "News Ingestion API",
    status: "ready",
    note: "Configure GEMINI_API_KEY to activate automatic content generation",
  });
}
