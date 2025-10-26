import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { generateArticle, generateFromUrl, generateSEOTags, generateVariations, rewriteArticle, rewriteWithStyle, summarizeArticle, translateArticle } from "./ai-helpers";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { TRPCError } from "@trpc/server";
import { newsRouter } from "./routers/news";
import { aiRouter } from "./routers/ai";
import { serverlessOptimizer } from "./optimization/ServerlessOptimizer";
import { databaseManager } from "./database/DatabaseManager";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// Editor or Admin procedure
const editorProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Editor or Admin access required" });
  }
  return next({ ctx });
});

// Author, Editor or Admin procedure
const authorProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin" && ctx.user.role !== "editor" && ctx.user.role !== "author") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Author, Editor or Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  news: newsRouter,
  ai: aiRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== LANGUAGE ROUTES ====================
  languages: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllLanguages();
    }),
    getActive: publicProcedure.query(async () => {
      return await db.getActiveLanguages();
    }),
    getDefault: publicProcedure.query(async () => {
      return await db.getDefaultLanguage();
    }),
    getByCode: publicProcedure.input(z.object({ code: z.string() })).query(async ({ input }) => {
      return await db.getLanguageByCode(input.code);
    }),
    create: adminProcedure
      .input(
        z.object({
          code: z.string(),
          name: z.string(),
          nativeName: z.string(),
          isActive: z.boolean().optional(),
          isDefault: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createLanguage(input);
      }),
  }),

  // ==================== CATEGORY ROUTES ====================
  categories: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    getActive: publicProcedure.query(async () => {
      return await db.getActiveCategories();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return await db.getCategoryById(input.id);
    }),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return await db.getCategoryBySlug(input.slug);
    }),
    getTranslations: publicProcedure.input(z.object({ categoryId: z.number() })).query(async ({ input }) => {
      return await db.getCategoryTranslations(input.categoryId);
    }),
    getTranslation: publicProcedure
      .input(z.object({ categoryId: z.number(), languageCode: z.string() }))
      .query(async ({ input }) => {
        return await db.getCategoryTranslation(input.categoryId, input.languageCode);
      }),
    create: editorProcedure
      .input(
        z.object({
          slug: z.string(),
          parentId: z.number().optional(),
          icon: z.string().optional(),
          color: z.string().optional(),
          sortOrder: z.number().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createCategory(input);
      }),
    createTranslation: editorProcedure
      .input(
        z.object({
          categoryId: z.number(),
          languageCode: z.string(),
          name: z.string(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createCategoryTranslation(input);
      }),
  }),

  // ==================== TAG ROUTES ====================
  tags: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllTags();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return await db.getTagById(input.id);
    }),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return await db.getTagBySlug(input.slug);
    }),
    getTranslations: publicProcedure.input(z.object({ tagId: z.number() })).query(async ({ input }) => {
      return await db.getTagTranslations(input.tagId);
    }),
    getTranslation: publicProcedure.input(z.object({ tagId: z.number(), languageCode: z.string() })).query(async ({ input }) => {
      return await db.getTagTranslation(input.tagId, input.languageCode);
    }),
    create: authorProcedure
      .input(
        z.object({
          slug: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createTag(input);
      }),
    createTranslation: authorProcedure
      .input(
        z.object({
          tagId: z.number(),
          languageCode: z.string(),
          name: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createTagTranslation(input);
      }),
  }),

  // ==================== ARTICLE ROUTES ====================
  articles: router({
    getAll: publicProcedure
      .input(z.object({ limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getAllArticles(input.limit, input.offset);
      }),
    getPublished: publicProcedure
      .input(z.object({ limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getPublishedArticles(input.limit, input.offset);
      }),
    getFeatured: publicProcedure.input(z.object({ limit: z.number().optional() })).query(async ({ input }) => {
      return await db.getFeaturedArticles(input.limit);
    }),
    getBreaking: publicProcedure.input(z.object({ limit: z.number().optional() })).query(async ({ input }) => {
      return await db.getBreakingNews(input.limit);
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return await db.getArticleById(input.id);
    }),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return await db.getArticleBySlug(input.slug);
    }),
    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number(), limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getArticlesByCategory(input.categoryId, input.limit, input.offset);
      }),
    getByAuthor: publicProcedure
      .input(z.object({ authorId: z.number(), limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getArticlesByAuthor(input.authorId, input.limit, input.offset);
      }),
    search: publicProcedure
      .input(z.object({ query: z.string(), limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.searchArticles(input.query, input.limit, input.offset);
      }),
    getTranslations: publicProcedure.input(z.object({ articleId: z.number() })).query(async ({ input }) => {
      return await db.getArticleTranslations(input.articleId);
    }),
    getTranslation: publicProcedure
      .input(z.object({ articleId: z.number(), languageCode: z.string() }))
      .query(async ({ input }) => {
        return await db.getArticleTranslation(input.articleId, input.languageCode);
      }),
    getTags: publicProcedure.input(z.object({ articleId: z.number() })).query(async ({ input }) => {
      return await db.getArticleTags(input.articleId);
    }),
    incrementViews: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.incrementArticleViews(input.id);
      await db.createAnalyticsEvent({
        articleId: input.id,
        eventType: "view",
        createdAt: new Date(),
      });
      return { success: true };
    }),
    incrementLikes: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.incrementArticleLikes(input.id);
      await db.createAnalyticsEvent({
        articleId: input.id,
        eventType: "like",
        createdAt: new Date(),
      });
      return { success: true };
    }),
    incrementShares: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.incrementArticleShares(input.id);
      await db.createAnalyticsEvent({
        articleId: input.id,
        eventType: "share",
        createdAt: new Date(),
      });
      return { success: true };
    }),
    create: authorProcedure
      .input(
        z.object({
          slug: z.string(),
          categoryId: z.number(),
          status: z.enum(["draft", "published", "archived", "scheduled"]).optional(),
          featuredImage: z.string().optional(),
          featuredImageAlt: z.string().optional(),
          isFeatured: z.boolean().optional(),
          isBreaking: z.boolean().optional(),
          publishedAt: z.date().optional(),
          scheduledAt: z.date().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await db.createArticle({
          ...input,
          authorId: ctx.user.id,
        });
      }),
    update: authorProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().optional(),
          categoryId: z.number().optional(),
          status: z.enum(["draft", "published", "archived", "scheduled"]).optional(),
          featuredImage: z.string().optional(),
          featuredImageAlt: z.string().optional(),
          isFeatured: z.boolean().optional(),
          isBreaking: z.boolean().optional(),
          publishedAt: z.date().optional(),
          scheduledAt: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        return await db.updateArticle(id, updateData);
      }),
    createTranslation: authorProcedure
      .input(
        z.object({
          articleId: z.number(),
          languageCode: z.string(),
          title: z.string(),
          excerpt: z.string().optional(),
          content: z.string(),
          seoTitle: z.string().optional(),
          seoDescription: z.string().optional(),
          seoKeywords: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createArticleTranslation(input);
      }),
    updateTranslation: authorProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          excerpt: z.string().optional(),
          content: z.string().optional(),
          seoTitle: z.string().optional(),
          seoDescription: z.string().optional(),
          seoKeywords: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        return await db.updateArticleTranslation(id, updateData);
      }),
    addTag: authorProcedure
      .input(
        z.object({
          articleId: z.number(),
          tagId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        return await db.addArticleTag(input);
      }),
    removeTag: authorProcedure
      .input(
        z.object({
          articleId: z.number(),
          tagId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        await db.removeArticleTag(input.articleId, input.tagId);
        return { success: true };
      }),
  }),

  // ==================== COMMENT ROUTES ====================
  comments: router({
    getByArticle: publicProcedure.input(z.object({ articleId: z.number() })).query(async ({ input }) => {
      return await db.getApprovedComments(input.articleId);
    }),
    create: protectedProcedure
      .input(
        z.object({
          articleId: z.number(),
          content: z.string(),
          parentId: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await db.createComment({
          ...input,
          userId: ctx.user.id,
        });
      }),
    approve: editorProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.approveComment(input.id);
      return { success: true };
    }),
    delete: editorProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteComment(input.id);
      return { success: true };
    }),
  }),

  // ==================== SUBSCRIBER ROUTES ====================
  subscribers: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllSubscribers();
    }),
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
          languageCode: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const existing = await db.getSubscriberByEmail(input.email);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "Email already subscribed" });
        }
        return await db.createSubscriber(input);
      }),
    unsubscribe: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ input }) => {
      await db.unsubscribe(input.email);
      return { success: true };
    }),
  }),

  // ==================== AI CONTENT JOB ROUTES ====================
  aiJobs: router({
    getAll: adminProcedure
      .input(z.object({ limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getAllAiContentJobs(input.limit, input.offset);
      }),
    getById: authorProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return await db.getAiContentJobById(input.id);
    }),
    getMy: authorProcedure
      .input(z.object({ limit: z.number().optional(), offset: z.number().optional() }))
      .query(async ({ input, ctx }) => {
        return await db.getUserAiContentJobs(ctx.user.id, input.limit, input.offset);
      }),
    getPending: adminProcedure.query(async () => {
      return await db.getPendingAiContentJobs();
    }),
    create: authorProcedure
      .input(
        z.object({
          type: z.enum(["scrape", "rewrite", "generate", "translate"]),
          sourceUrl: z.string().optional(),
          sourceFile: z.string().optional(),
          sourceType: z.string().optional(),
          articleId: z.number().optional(),
          prompt: z.string().optional(),
          metadata: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await db.createAiContentJob({
          ...input,
          userId: ctx.user.id,
        });
      }),
    update: authorProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
          result: z.string().optional(),
          error: z.string().optional(),
          completedAt: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        return await db.updateAiContentJob(id, updateData);
      }),
  }),

  // ==================== AI CONTENT GENERATION ROUTES ====================
    
    rewriteArticle: authorProcedure
      .input(
        z.object({
          originalTitle: z.string(),
          originalContent: z.string(),
          category: z.string(),
          language: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await rewriteArticle(input);
      }),
    
    generateFromUrl: authorProcedure
      .input(
        z.object({
          url: z.string().url(),
          category: z.string(),
          language: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await generateFromUrl(input);
      }),
    
    translateArticle: authorProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          summary: z.string(),
          fromLanguage: z.string(),
          toLanguage: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return await translateArticle(input);
      }),
    
    generateSEOTags: authorProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          category: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return await generateSEOTags(input);
      }),
    
    summarizeArticle: authorProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          targetLength: z.enum(["short", "medium", "long"]).optional(),
          language: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await summarizeArticle(input);
      }),
    
    rewriteWithStyle: authorProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          style: z.enum(["formal", "casual", "technical", "sensationalist", "neutral"]),
          language: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await rewriteWithStyle(input);
      }),
    
    generateVariations: authorProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          numberOfVariations: z.number().min(1).max(5),
          language: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await generateVariations(input);
      }),
});

export type AppRouter = typeof appRouter;

