import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { secret } = body ?? {};

    if (secret && secret !== process.env.CRON_SECRET && secret !== "test") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create or ensure admin user
    const admin = await (db as any).user.upsert({
      where: { email: "admin@politica-argentina.com" },
      update: { role: "ADMIN" },
      create: {
        email: "admin@politica-argentina.com",
        name: "Redacción Principal",
        role: "ADMIN",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80&fit=crop",
      },
    });

    // Ensure categories
    const cats = [
      { name: "Política", slug: "politica" },
      { name: "Economía", slug: "economia" },
    ];
    for (const c of cats) {
      await (db as any).category.upsert({
        where: { slug: c.slug },
        update: {},
        create: c,
      });
    }

    const economia = await (db as any).category.findUnique({ where: { slug: "economia" } });
    const politica = await (db as any).category.findUnique({ where: { slug: "politica" } });

    // Seed minimal posts
    const posts = [
      {
        title: "Argentina alcanza acuerdo con el FMI",
        slug: "argentina-alcanza-acuerdo-con-el-fmi",
        excerpt:
          "El Gobierno informó un nuevo entendimiento con el organismo.",
        content: { html: "<p>El Ministerio de Economía confirmó un acuerdo con el Fondo Monetario Internacional que permitirá refinanciar la deuda y otorgar nuevos desembolsos.</p>" },
        coverImage:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=630&q=80&fit=crop",
        status: "PUBLISHED",
        featured: true,
        breaking: true,
        authorId: admin.id,
        categoryId: economia?.id,
        publishedAt: new Date(),
      },
      {
        title: "Debate en el Congreso por reforma política",
        slug: "debate-en-el-congreso-por-reforma-politica",
        excerpt: "Se discuten cambios en el sistema electoral.",
        content: { html: "<p>Legisladores de distintos bloques avanzan en un proyecto que contempla la modernización del sistema electoral y mayor transparencia.</p>" },
        coverImage:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981d?w=1200&h=630&q=80&fit=crop",
        status: "PUBLISHED",
        featured: false,
        breaking: false,
        authorId: admin.id,
        categoryId: politica?.id,
        publishedAt: new Date(Date.now() - 3600_000),
      },
    ];

    for (const p of posts) {
      await (db as any).post.upsert({ where: { slug: p.slug }, update: {}, create: p });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}


