import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

/**
 * GET /api/comments?postId=xxx
 * Retrieve comments for a post
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    // For now, return mock data since Comment model needs to be added to schema
    const mockComments = [
      {
        id: "1",
        content: "Excelente análisis de la situación económica actual.",
        author: {
          name: "Juan Pérez",
          image: null,
        },
        guestName: null,
        status: "APPROVED",
        likes: 12,
        dislikes: 2,
        replies: [],
        createdAt: new Date("2025-10-17T10:00:00Z"),
      },
      {
        id: "2",
        content: "Me gustaría ver más información sobre las medidas fiscales.",
        author: null,
        guestName: "María González",
        status: "APPROVED",
        likes: 8,
        dislikes: 1,
        replies: [
          {
            id: "3",
            content: "Estoy de acuerdo, necesitamos más detalles técnicos.",
            author: null,
            guestName: "Carlos López",
            status: "APPROVED",
            likes: 5,
            dislikes: 0,
            createdAt: new Date("2025-10-17T11:30:00Z"),
          },
        ],
        createdAt: new Date("2025-10-17T10:30:00Z"),
      },
    ];

    return NextResponse.json({
      success: true,
      comments: mockComments,
      count: mockComments.length,
    });

  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/comments
 * Create a new comment
 */
export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const { postId, content, parentId, guestName, guestEmail } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "postId and content are required" },
        { status: 400 }
      );
    }

    // AI Moderation with Gemini
    const toxicityScore = await moderateContent(content);
    const isSpam = toxicityScore > 0.8;

    // Create comment (mock for now)
    const comment = {
      id: `comment-${Date.now()}`,
      postId,
      content,
      authorId: session?.user?.id || null,
      guestName: !session ? guestName : null,
      guestEmail: !session ? guestEmail : null,
      parentId: parentId || null,
      status: isSpam ? "SPAM" : "PENDING", // Auto-approve if trusted user
      toxicityScore,
      spam: isSpam,
      likes: 0,
      dislikes: 0,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      comment,
      message: isSpam ? "Comment flagged as spam" : "Comment submitted for moderation",
    });

  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

/**
 * AI Content Moderation
 * Returns toxicity score 0-1
 */
async function moderateContent(content: string): Promise<number> {
  try {
    // Simple rule-based check for demo
    const toxicWords = ['spam', 'viagra', 'casino', 'phishing'];
    const lowerContent = content.toLowerCase();

    for (const word of toxicWords) {
      if (lowerContent.includes(word)) {
        return 0.9;
      }
    }

    // Check length (very short comments might be spam)
    if (content.length < 10) {
      return 0.6;
    }

    // Check for excessive caps
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capsRatio > 0.5) {
      return 0.7;
    }

    return 0.1; // Low toxicity score
  } catch (error) {
    console.error("Moderation error:", error);
    return 0.5; // Default to moderate risk
  }
}
