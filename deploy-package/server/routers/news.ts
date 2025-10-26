// ===========================================
// ROUTER DE NOTICIAS PROFESIONAL
// API completa y funcional
// ===========================================

import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../_core/trpc';
import { newsService } from '../services/NewsService';

export const newsRouter = router({
  // ===========================================
  // OBTENER NOTICIAS
  // ===========================================
  getNews: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      source: z.string().optional(),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
      trending: z.boolean().optional(),
      breaking: z.boolean().optional()
    }))
    .query(async ({ input }) => {
      try {
        const result = await newsService.getArticles(input);
        return result;
      } catch (error) {
        console.error('Error obteniendo noticias:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener las noticias'
        });
      }
    }),

  // ===========================================
  // OBTENER ARTÍCULO ESPECÍFICO
  // ===========================================
  getArticle: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const article = await newsService.getArticle(input.id);
        if (!article) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Artículo no encontrado'
          });
        }
        return article;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Error obteniendo artículo:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener el artículo'
        });
      }
    }),

  // ===========================================
  // OBTENER CATEGORÍAS
  // ===========================================
  getCategories: publicProcedure
    .query(async () => {
      try {
        return await newsService.getCategories();
      } catch (error) {
        console.error('Error obteniendo categorías:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener categorías'
        });
      }
    }),

  // ===========================================
  // OBTENER FUENTES
  // ===========================================
  getSources: publicProcedure
    .query(async () => {
      try {
        return await newsService.getSources();
      } catch (error) {
        console.error('Error obteniendo fuentes:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener fuentes'
        });
      }
    }),

  // ===========================================
  // OBTENER NOTICIAS TRENDING
  // ===========================================
  getTrending: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ input }) => {
      try {
        const articles = await newsService.getTrendingArticles(input.limit);
        return {
          articles,
          total: articles.length
        };
      } catch (error) {
        console.error('Error obteniendo noticias trending:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener noticias trending'
        });
      }
    }),

  // ===========================================
  // OBTENER NOTICIAS BREAKING
  // ===========================================
  getBreaking: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(5) }))
    .query(async ({ input }) => {
      try {
        const articles = await newsService.getBreakingNews(input.limit);
        return {
          articles,
          total: articles.length
        };
      } catch (error) {
        console.error('Error obteniendo noticias breaking:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener noticias breaking'
        });
      }
    }),

  // ===========================================
  // BUSCAR NOTICIAS
  // ===========================================
  searchNews: publicProcedure
    .input(z.object({
      query: z.string().min(2).max(100),
      limit: z.number().min(1).max(50).default(20)
    }))
    .query(async ({ input }) => {
      try {
        const articles = await newsService.searchArticles(input.query, input.limit);
        return {
          articles,
          total: articles.length,
          query: input.query
        };
      } catch (error) {
        console.error('Error buscando noticias:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al buscar noticias'
        });
      }
    }),

  // ===========================================
  // OBTENER ESTADÍSTICAS
  // ===========================================
  getStats: publicProcedure
    .query(async () => {
      try {
        return await newsService.getStats();
      } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener estadísticas'
        });
      }
    }),

  // ===========================================
  // INCREMENTAR VISTAS
  // ===========================================
  incrementViews: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await newsService.incrementViews(input.id);
        return { success: true };
      } catch (error) {
        console.error('Error incrementando vistas:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al incrementar vistas'
        });
      }
    }),

  // ===========================================
  // INCREMENTAR LIKES
  // ===========================================
  incrementLikes: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await newsService.incrementLikes(input.id);
        return { success: true };
      } catch (error) {
        console.error('Error incrementando likes:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al incrementar likes'
        });
      }
    }),

  // ===========================================
  // INCREMENTAR SHARES
  // ===========================================
  incrementShares: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await newsService.incrementShares(input.id);
        return { success: true };
      } catch (error) {
        console.error('Error incrementando shares:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al incrementar shares'
        });
      }
    })
});
