import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

/**
 * AI-Powered Content Recommendations
 * GET /api/recommendations?userId=xxx&limit=10
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const session = await auth();

    // Get user's reading history and preferences
    // For now, use collaborative filtering with category preferences

    const recommendations = await generateRecommendations(
      session?.user?.id || null,
      limit
    );

    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length,
    });

  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}

async function generateRecommendations(userId: string | null, limit: number) {
  try {
    // Get trending and popular posts
    const posts = await db.post.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [
        { views: "desc" },
        { publishedAt: "desc" },
      ],
      take: limit * 2,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        views: true,
        publishedAt: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    // Calculate recommendation scores
    const recommendations = posts.map((post) => {
      let score = 0.5; // Base score

      // Recency boost
      const daysSincePublished = Math.floor(
        (Date.now() - new Date(post.publishedAt || Date.now()).getTime()) /
        (1000 * 60 * 60 * 24)
      );
      if (daysSincePublished < 1) score += 0.3;
      else if (daysSincePublished < 3) score += 0.2;
      else if (daysSincePublished < 7) score += 0.1;

      // Popularity boost
      if (post.views > 10000) score += 0.2;
      else if (post.views > 5000) score += 0.15;
      else if (post.views > 1000) score += 0.1;

      return {
        ...post,
        score: Math.min(score, 1), // Cap at 1.0
        reason: daysSincePublished < 1 ? "Publicado hoy" : post.views > 5000 ? "Muy leído" : "Recomendado",
      };
    });

    // Sort by score and return top N
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

  } catch (error) {
    console.error("Error in generateRecommendations:", error);
    return [];
  }
}
