import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Poblando base de datos con contenido mínimo...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@politica-argentina.com" },
    update: {},
    create: {
      email: "admin@politica-argentina.com",
      name: "Redacción Principal",
      password: "dev",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80&fit=crop",
    },
  });

  const categorias = [
    { name: "Política", slug: "politica" },
    { name: "Economía", slug: "economia" },
    { name: "Sociedad", slug: "sociedad" },
  ];

  for (const c of categorias) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  const catPolitica = await prisma.category.findUnique({ where: { slug: "politica" } });
  const catEconomia = await prisma.category.findUnique({ where: { slug: "economia" } });

  const posts = [
    {
      title: "Argentina alcanza acuerdo con el FMI",
      slug: "argentina-alcanza-acuerdo-con-el-fmi",
      excerpt: "El Gobierno informó un nuevo entendimiento con el organismo.",
      content: { html: "<p>El Ministerio de Economía confirmó un acuerdo con el Fondo Monetario Internacional que permitirá refinanciar la deuda y otorgar nuevos desembolsos.</p>" } as any,
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=630&q=80&fit=crop",
      status: "PUBLISHED" as const,
      featured: true,
      breaking: true,
      authorId: admin.id,
      categoryId: catEconomia?.id,
      publishedAt: new Date(),
    },
    {
      title: "Debate en el Congreso por reforma política",
      slug: "debate-en-el-congreso-por-reforma-politica",
      excerpt: "Se discuten cambios en el sistema electoral.",
      content: { html: "<p>Legisladores de distintos bloques avanzan en un proyecto que contempla la modernización del sistema electoral y mayor transparencia.</p>" } as any,
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981d?w=1200&h=630&q=80&fit=crop",
      status: "PUBLISHED" as const,
      featured: false,
      breaking: false,
      authorId: admin.id,
      categoryId: catPolitica?.id,
      publishedAt: new Date(Date.now() - 3600_000),
    },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: p as any,
    });
  }

  console.log("✅ Población mínima completada.");
}

main().finally(async () => prisma.$disconnect());


