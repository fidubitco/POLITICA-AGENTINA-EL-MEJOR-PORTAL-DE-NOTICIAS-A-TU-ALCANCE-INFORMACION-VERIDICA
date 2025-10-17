import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Query must be at least 2 characters" },
        { status: 400 }
      );
    }

    const [posts, categories, tags] = await Promise.all([
      // Search posts
      db.post.findMany({
        where: {
          AND: [
            { status: "PUBLISHED" },
            {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { excerpt: { contains: query, mode: "insensitive" } },
              ],
            },
          ],
        },
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          views: true,
          publishedAt: true,
          category: { select: { name: true } },
        },
        orderBy: { views: "desc" },
      }),

      // Search categories
      db.category.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
        },
      }),

      // Search tags
      db.tag.findMany({
        where: {
          name: { contains: query, mode: "insensitive" },
        },
        take: 5,
        select: {
          id: true,
          slug: true,
          name: true,
        },
      }),
    ]);

    const results = [
      ...posts.map((post) => ({
        id: post.id,
        type: "article" as const,
        title: post.title,
        description: post.excerpt,
        url: `/noticia/${post.slug}`,
        date: post.publishedAt?.toISOString(),
        views: post.views,
      })),
      ...categories.map((cat) => ({
        id: cat.id,
        type: "category" as const,
        title: cat.name,
        description: cat.description,
        url: `/categoria/${cat.slug}`,
      })),
      ...tags.map((tag) => ({
        id: tag.id,
        type: "tag" as const,
        title: tag.name,
        url: `/tag/${tag.slug}`,
      })),
    ];

    return NextResponse.json({
      success: true,
      results,
      count: results.length
    });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed", details: String(error) },
      { status: 500 }
    );
  }
}
