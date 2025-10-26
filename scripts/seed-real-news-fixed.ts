import { drizzle } from "drizzle-orm/mysql2";
import { articles, categories, languages, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

const realNewsArticles = [
  {
    categorySlug: "politica",
    title: "Elecciones 2025: La Libertad Avanza busca consolidar su poder en el Congreso",
    slug: "elecciones-2025-libertad-avanza-congreso-2025",
    summary: "Con las elecciones legislativas a días de realizarse, el oficialismo apuesta a aumentar su representación parlamentaria.",
    content: "<p>Contenido completo de la noticia sobre las elecciones 2025.</p>",
    imageUrl: "/images/milei-presidente.jpg",
    tags: "elecciones 2025, política argentina",
  },
  {
    categorySlug: "economia",
    title: "El dólar blue se mantiene estable mientras el gobierno negocia con el FMI",
    slug: "dolar-blue-estable-negociacion-fmi-2025",
    summary: "La divisa paralela cotiza en torno a los $1.200 en un contexto de expectativa por el nuevo acuerdo.",
    content: "<p>Análisis del mercado cambiario argentino.</p>",
    imageUrl: "/images/dolar-economia.jpg",
    tags: "dólar blue, economía argentina",
  },
];

async function seedRealNews() {
  console.log("🌱 Seeding real news articles...");

  try {
    const [spanish] = await db.select().from(languages).where(eq(languages.code, "es")).limit(1);
    const [firstUser] = await db.select().from(users).limit(1);
    const allCategories = await db.select().from(categories);
    const categoryMap = new Map(allCategories.map((cat) => [cat.slug, cat.id]));

    for (const article of realNewsArticles) {
      const categoryId = categoryMap.get(article.categorySlug);
      if (!categoryId) continue;

      await db.insert(articles).values({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        featuredImage: article.imageUrl,
        categoryId,
        languageId: spanish!.id,
        authorId: firstUser!.id,
        status: "published",
        isFeatured: true,
        views: Math.floor(Math.random() * 5000) + 1000,
        likes: Math.floor(Math.random() * 500) + 50,
        shares: Math.floor(Math.random() * 200) + 20,
        tags: article.tags,
        publishedAt: new Date(),
      });

      console.log(`✅ Created: ${article.title}`);
    }

    console.log("✨ Done!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

seedRealNews();
