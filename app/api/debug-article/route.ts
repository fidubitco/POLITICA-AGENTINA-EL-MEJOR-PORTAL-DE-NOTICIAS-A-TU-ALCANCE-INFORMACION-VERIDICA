import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug requerido" }, { status: 400 });
  try {
    const post = await (db.post as any).findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { name: true, email: true, image: true } },
        category: { select: { name: true, slug: true } },
        tags: { select: { name: true, slug: true } },
      },
    });
    return NextResponse.json({ ok: true, hasPost: Boolean(post), post });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}


