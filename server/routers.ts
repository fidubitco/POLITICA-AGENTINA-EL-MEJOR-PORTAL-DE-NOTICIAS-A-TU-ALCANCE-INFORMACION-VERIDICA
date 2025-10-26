/**
 * 🔌 TRPC ROUTERS - API Endpoints
 */

import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';
import { generateArticleWithAI, improveArticleWithAI } from './services/ai';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// ============================================
// ARTICLES ROUTER
// ============================================
const articlesRouter = router({
  // Listar artículos
  list: publicProcedure
    .input(z.object({
      limit: z.number().optional().default(10),
      offset: z.number().optional().default(0),
      category: z.string().optional(),
      status: z.enum(['published', 'draft', 'archived']).optional(),
    }))
    .query(async ({ input, ctx }) => {
      let sql = 'SELECT * FROM articles WHERE 1=1';
      const params: any[] = [];

      if (input.category) {
        sql += ' AND categorySlug = ?';
        params.push(input.category);
      }

      if (input.status) {
        sql += ' AND status = ?';
        params.push(input.status);
      }

      sql += ' ORDER BY publishedAt DESC LIMIT ? OFFSET ?';
      params.push(input.limit, input.offset);

      const articles = await ctx.db.query(sql, params);
      return articles;
    }),

  // Obtener un artículo
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const article = await ctx.db.queryOne(
        'SELECT * FROM articles WHERE id = ?',
        [input.id]
      );
      return article;
    }),

  // Crear artículo
  create: publicProcedure
    .input(z.object({
      title: z.string(),
      slug: z.string(),
      excerpt: z.string(),
      content: z.string(),
      category: z.string(),
      categorySlug: z.string(),
      author: z.string(),
      imageUrl: z.string(),
      status: z.enum(['published', 'draft', 'archived']).default('draft'),
      featured: z.boolean().default(false),
      breaking: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
    }))
    .mutation(async ({ input, ctx }) => {
      const id = await ctx.db.insert('articles', {
        ...input,
        tags: JSON.stringify(input.tags),
        views: 0,
        likes: 0,
        shares: 0,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id, success: true };
    }),

  // Actualizar artículo
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      category: z.string().optional(),
      categorySlug: z.string().optional(),
      imageUrl: z.string().optional(),
      status: z.enum(['published', 'draft', 'archived']).optional(),
      featured: z.boolean().optional(),
      breaking: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      
      if (data.tags) {
        (data as any).tags = JSON.stringify(data.tags);
      }
      
      (data as any).updatedAt = new Date();
      
      const affected = await ctx.db.update('articles', data, 'id = ?', [id]);
      return { success: affected > 0 };
    }),

  // Eliminar artículo
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const affected = await ctx.db.delete('articles', 'id = ?', [input.id]);
      return { success: affected > 0 };
    }),

  // Generar artículo con IA
  generateWithAI: publicProcedure
    .input(z.object({
      topic: z.string(),
      category: z.string(),
      keywords: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const article = await generateArticleWithAI(input.topic, input.category, input.keywords);
        return { success: true, article };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }),

  // Mejorar artículo con IA
  improveWithAI: publicProcedure
    .input(z.object({
      content: z.string(),
      title: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const improved = await improveArticleWithAI(input.content, input.title);
        return { success: true, improved };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }),
});

// ============================================
// ANALYTICS ROUTER
// ============================================
const analyticsRouter = router({
  // Estadísticas generales
  getStats: publicProcedure
    .query(async ({ ctx }) => {
      const [totalArticles] = await ctx.db.query('SELECT COUNT(*) as count FROM articles');
      const [publishedArticles] = await ctx.db.query('SELECT COUNT(*) as count FROM articles WHERE status = "published"');
      const [totalViews] = await ctx.db.query('SELECT SUM(views) as total FROM articles');
      const [totalLikes] = await ctx.db.query('SELECT SUM(likes) as total FROM articles');
      const [totalShares] = await ctx.db.query('SELECT SUM(shares) as total FROM articles');

      return {
        totalArticles: (totalArticles as any)[0]?.count || 0,
        publishedArticles: (publishedArticles as any)[0]?.count || 0,
        totalViews: (totalViews as any)[0]?.total || 0,
        totalLikes: (totalLikes as any)[0]?.total || 0,
        totalShares: (totalShares as any)[0]?.total || 0,
      };
    }),

  // Top artículos
  getTopArticles: publicProcedure
    .input(z.object({ limit: z.number().optional().default(5) }))
    .query(async ({ input, ctx }) => {
      const articles = await ctx.db.query(
        'SELECT * FROM articles ORDER BY views DESC LIMIT ?',
        [input.limit]
      );
      return articles;
    }),
});

// ============================================
// USERS ROUTER (CRM)
// ============================================
const usersRouter = router({
  // Listar usuarios
  list: publicProcedure
    .input(z.object({
      limit: z.number().optional().default(10),
      offset: z.number().optional().default(0),
    }))
    .query(async ({ input, ctx }) => {
      const users = await ctx.db.query(
        'SELECT id, email, name, role, createdAt FROM users LIMIT ? OFFSET ?',
        [input.limit, input.offset]
      );
      return users;
    }),

  // Crear usuario
  create: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
      role: z.enum(['admin', 'editor', 'author', 'user']).default('user'),
    }))
    .mutation(async ({ input, ctx }) => {
      // TODO: Hash password
      const id = await ctx.db.insert('users', {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id, success: true };
    }),
});

// ============================================
// APP ROUTER (Main)
// ============================================
export const appRouter = router({
  articles: articlesRouter,
  analytics: analyticsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
