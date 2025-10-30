import { PrismaClient } from '@prisma/client';
import { supabase } from './supabase';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database operations
export class DatabaseService {
  // Articles
  static async getArticles(options: {
    category?: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    featured?: boolean;
    limit?: number;
    offset?: number;
    language?: string;
  } = {}) {
    const {
      category,
      status = 'PUBLISHED',
      featured,
      limit = 10,
      offset = 0,
      language = 'es'
    } = options;

    const articles = await prisma.article.findMany({
      where: {
        status,
        ...(category && { categorySlug: category }),
        ...(featured !== undefined && { featured }),
      },
      include: {
        author: {
          select: { id: true, name: true, image: true }
        },
        translations: {
          where: { language },
          select: { title: true, excerpt: true, content: true }
        },
        tags: {
          select: { name: true, slug: true }
        },
        _count: {
          select: { comments: true, likes: true }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit,
      skip: offset,
    });

    return articles.map(article => ({
      ...article,
      // Use translation if available, otherwise use original
      title: article.translations[0]?.title || article.title,
      excerpt: article.translations[0]?.excerpt || article.excerpt,
      content: article.translations[0]?.content || article.content,
    }));
  }

  static async getArticleBySlug(slug: string, language = 'es') {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, image: true }
        },
        translations: {
          where: { language },
          select: { title: true, excerpt: true, content: true, seoTitle: true, seoDescription: true }
        },
        tags: {
          select: { name: true, slug: true }
        },
        comments: {
          include: {
            author: { select: { id: true, name: true, image: true } },
            replies: {
              include: {
                author: { select: { id: true, name: true, image: true } }
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
    });

    if (!article) return null;

    return {
      ...article,
      // Use translation if available
      title: article.translations[0]?.title || article.title,
      excerpt: article.translations[0]?.excerpt || article.excerpt,
      content: article.translations[0]?.content || article.content,
      seoTitle: article.translations[0]?.seoTitle || article.seoTitle,
      seoDescription: article.translations[0]?.seoDescription || article.seoDescription,
    };
  }

  static async createArticle(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    categorySlug: string;
    authorId: string;
    imageUrl?: string;
    featured?: boolean;
    breaking?: boolean;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
  }) {
    const { tags = [], ...articleData } = data;

    return await prisma.article.create({
      data: {
        ...articleData,
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, '-')
            }
          }))
        }
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: { select: { name: true, slug: true } }
      }
    });
  }

  static async updateArticle(id: string, data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    categorySlug: string;
    imageUrl: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    featured: boolean;
    breaking: boolean;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
  }>) {
    const { tags, ...updateData } = data;

    return await prisma.article.update({
      where: { id },
      data: {
        ...updateData,
        ...(tags && {
          tags: {
            set: [],
            connectOrCreate: tags.map(tag => ({
              where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-')
              }
            }))
          }
        })
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: { select: { name: true, slug: true } }
      }
    });
  }

  // Users
  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async createUser(data: {
    email: string;
    name?: string;
    password?: string;
    role?: 'VIEWER' | 'EDITOR' | 'ADMIN';
  }) {
    return await prisma.user.create({
      data,
    });
  }

  // Analytics
  static async trackEvent(event: {
    event: string;
    category: string;
    action: string;
    label?: string;
    value?: number;
    userId?: string;
    sessionId?: string;
    page?: string;
    referrer?: string;
    userAgent?: string;
    ip?: string;
  }) {
    return await prisma.analyticsEvent.create({
      data: event,
    });
  }

  // Search
  static async searchArticles(query: string, language = 'es', limit = 20) {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          {
            translations: {
              some: {
                language,
                OR: [
                  { title: { contains: query, mode: 'insensitive' } },
                  { excerpt: { contains: query, mode: 'insensitive' } },
                  { content: { contains: query, mode: 'insensitive' } },
                ]
              }
            }
          },
          {
            tags: {
              some: {
                name: { contains: query, mode: 'insensitive' }
              }
            }
          }
        ]
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        translations: {
          where: { language },
          select: { title: true, excerpt: true }
        },
        tags: { select: { name: true, slug: true } }
      },
      take: limit,
      orderBy: { publishedAt: 'desc' }
    });

    return articles.map(article => ({
      ...article,
      title: article.translations[0]?.title || article.title,
      excerpt: article.translations[0]?.excerpt || article.excerpt,
    }));
  }

  // Categories
  static async getCategories(activeOnly = true) {
    return await prisma.category.findMany({
      where: activeOnly ? { active: true } : {},
      include: {
        subcategories: {
          where: activeOnly ? { active: true } : {},
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
  }

  // Knowledge Base
  static async getKnowledgeBaseEntries(type?: string, category?: string) {
    return await prisma.knowledgeBaseEntry.findMany({
      where: {
        ...(type && { type: type as any }),
        ...(category && { category })
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async createKnowledgeBaseEntry(data: {
    title: string;
    content: string;
    type: 'TEXT' | 'PDF' | 'AUDIO' | 'VIDEO' | 'LINK';
    category: string;
    tags: string[];
    metadata?: any;
  }) {
    return await prisma.knowledgeBaseEntry.create({
      data
    });
  }
}

