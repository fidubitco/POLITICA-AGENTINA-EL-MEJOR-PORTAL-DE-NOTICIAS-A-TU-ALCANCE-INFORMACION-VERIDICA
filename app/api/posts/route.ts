export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "publishedAt";
    const limit = parseInt(searchParams.get("limit") || "10");

    let whereClause: any = {
      status: "PUBLISHED",
    };

    if (featured === "true") {
      whereClause.OR = [
        { featured: true },
        { breaking: true }
      ];
    }

    if (category) {
      whereClause.category = {
        slug: category
      };
    }

    let orderBy: any = { publishedAt: "desc" };
    if (sortBy === "views") {
      orderBy = { views: "desc" };
    }

    const posts = await (db.post as any).findMany({
      where: whereClause,
      orderBy,
      take: limit,
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
      },
    });

    return NextResponse.json({ 
      success: true, 
      posts,
      count: posts.length
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      categoryId,
      tags = [],
      metaTitle,
      metaDesc,
      status = "DRAFT",
      publishedAt,
      coverImage,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "El título es requerido" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let slugExists = await db.post.findUnique({ where: { slug } });
    let counter = 1;

    while (slugExists) {
      slug = `${generateSlug(title)}-${counter}`;
      slugExists = await db.post.findUnique({ where: { slug } });
      counter++;
    }

    // Handle tags - find or create
    const tagObjects = await Promise.all(
      tags.map(async (tagName: string) => {
        const tagSlug = generateSlug(tagName);

        let tag = await db.tag.findUnique({
          where: { slug: tagSlug },
        });

        if (!tag) {
          tag = await db.tag.create({
            data: {
              slug: tagSlug,
              name: tagName,
            },
          });
        }

        return tag;
      })
    );

    // Create post
    const post = await db.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || { html: "" },
        coverImage: coverImage || null,
        authorId: user.id,
        status,
        categoryId: categoryId || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        publishedAt: publishedAt ? new Date(publishedAt) : status === "PUBLISHED" ? new Date() : null,
        tags: {
          connect: tagObjects.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        author: { select: { name: true, email: true } },
        category: { select: { name: true } },
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      post,
      message: status === "PUBLISHED" ? "Artículo publicado exitosamente" : "Artículo guardado como borrador",
    });

  } catch (error) {
    console.error('Error creating post:', error);

    return NextResponse.json(
      {
        error: 'Error al crear el artículo',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

