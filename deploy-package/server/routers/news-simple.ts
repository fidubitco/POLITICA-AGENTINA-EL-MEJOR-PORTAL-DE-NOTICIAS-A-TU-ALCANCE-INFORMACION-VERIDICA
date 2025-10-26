// ===========================================
// API DE NOTICIAS SIMPLIFICADA - tRPC
// Versión simplificada para evitar errores de tipos
// ===========================================

import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../_core/trpc';
import { newsAggregator } from '../services/NewsAggregator';

// ===========================================
// ESQUEMAS DE VALIDACIÓN
// ===========================================
const NewsFiltersSchema = z.object({
  category: z.string().optional(),
  source: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  trending: z.boolean().optional(),
  breaking: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0)
});

const SearchSchema = z.object({
  query: z.string().min(2).max(100),
  category: z.string().optional(),
  source: z.string().optional(),
  limit: z.number().min(1).max(50).default(20)
});

// ===========================================
// ROUTER DE NOTICIAS SIMPLIFICADO
// ===========================================
export const newsRouter = router({
  // ===========================================
  // ENDPOINTS PÚBLICOS
  // ===========================================
  
  /**
   * Obtiene noticias con filtros avanzados
   */
  getNews: publicProcedure
    .input(NewsFiltersSchema)
    .query(async ({ input }) => {
      try {
        let articles = await newsAggregator.extractFromAllSources(input.limit);
        
        // Aplicar filtros
        if (input.category) {
          articles = articles.filter(article => article.category === input.category);
        }
        
        if (input.source) {
          articles = articles.filter(article => article.source === input.source);
        }
        
        if (input.dateFrom) {
          const fromDate = new Date(input.dateFrom);
          articles = articles.filter(article => new Date(article.publishedAt) >= fromDate);
        }
        
        if (input.dateTo) {
          const toDate = new Date(input.dateTo);
          articles = articles.filter(article => new Date(article.publishedAt) <= toDate);
        }
        
        if (input.search) {
          const searchTerm = input.search.toLowerCase();
          articles = articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        }
        
        if (input.trending) {
          articles = articles.filter(article => article.isTrending);
        }
        
        if (input.breaking) {
          articles = articles.filter(article => article.isBreaking);
        }
        
        // Ordenar por fecha
        articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        
        // Paginación
        const paginatedArticles = articles.slice(input.offset, input.offset + input.limit);
        
        return {
          articles: paginatedArticles,
          total: articles.length,
          hasMore: input.offset + input.limit < articles.length,
          filters: input
        };
      } catch (error) {
        console.error('Error obteniendo noticias:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener las noticias'
        });
      }
    }),

  /**
   * Obtiene noticias trending
   */
  getTrending: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ input }) => {
      try {
        const trendingArticles = await newsAggregator.getTrendingNews(input.limit);
        return {
          articles: trendingArticles,
          total: trendingArticles.length
        };
      } catch (error) {
        console.error('Error obteniendo noticias trending:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener noticias trending'
        });
      }
    }),

  /**
   * Obtiene noticias breaking
   */
  getBreaking: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(5) }))
    .query(async ({ input }) => {
      try {
        const breakingArticles = await newsAggregator.getBreakingNews(input.limit);
        return {
          articles: breakingArticles,
          total: breakingArticles.length
        };
      } catch (error) {
        console.error('Error obteniendo noticias breaking:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener noticias breaking'
        });
      }
    }),

  /**
   * Busca noticias
   */
  searchNews: publicProcedure
    .input(SearchSchema)
    .query(async ({ input }) => {
      try {
        const searchResults = await newsAggregator.searchNews(input.query, input.limit);
        
        // Aplicar filtros adicionales
        let filteredResults = searchResults;
        
        if (input.category) {
          filteredResults = filteredResults.filter(article => article.category === input.category);
        }
        
        if (input.source) {
          filteredResults = filteredResults.filter(article => article.source === input.source);
        }
        
        return {
          articles: filteredResults,
          total: filteredResults.length,
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

  /**
   * Obtiene noticias por categoría
   */
  getNewsByCategory: publicProcedure
    .input(z.object({ 
      category: z.string(), 
      limit: z.number().min(1).max(50).default(20) 
    }))
    .query(async ({ input }) => {
      try {
        const categoryArticles = await newsAggregator.getNewsByCategory(input.category, input.limit);
        return {
          articles: categoryArticles,
          total: categoryArticles.length,
          category: input.category
        };
      } catch (error) {
        console.error('Error obteniendo noticias por categoría:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener noticias por categoría'
        });
      }
    }),

  /**
   * Obtiene un artículo específico
   */
  getArticle: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        // Buscar en las fuentes
        const allArticles = await newsAggregator.extractFromAllSources(100);
        const article = allArticles.find(a => a.id === input.id);
        
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

  /**
   * Obtiene categorías disponibles
   */
  getCategories: publicProcedure
    .query(async () => {
      try {
        return [
          { id: 'politica', name: 'Política', slug: 'politica' },
          { id: 'economia', name: 'Economía', slug: 'economia' },
          { id: 'sociedad', name: 'Sociedad', slug: 'sociedad' },
          { id: 'deportes', name: 'Deportes', slug: 'deportes' },
          { id: 'tecnologia', name: 'Tecnología', slug: 'tecnologia' },
          { id: 'cultura', name: 'Cultura', slug: 'cultura' },
          { id: 'internacional', name: 'Internacional', slug: 'internacional' },
          { id: 'salud', name: 'Salud', slug: 'salud' }
        ];
      } catch (error) {
        console.error('Error obteniendo categorías:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener categorías'
        });
      }
    }),

  /**
   * Obtiene fuentes de noticias
   */
  getSources: publicProcedure
    .query(async () => {
      try {
        const stats = newsAggregator.getSourceStats();
        
        return {
          sources: [
            { id: 'clarin', name: 'Clarín', credibility: 95 },
            { id: 'lanacion', name: 'La Nación', credibility: 98 },
            { id: 'pagina12', name: 'Página/12', credibility: 92 },
            { id: 'infobae', name: 'Infobae', credibility: 90 },
            { id: 'perfil', name: 'Perfil', credibility: 88 }
          ],
          stats
        };
      } catch (error) {
        console.error('Error obteniendo fuentes:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener fuentes'
        });
      }
    }),

  /**
   * Obtiene estadísticas del portal
   */
  getStats: publicProcedure
    .query(async () => {
      try {
        const stats = newsAggregator.getSourceStats();
        
        return {
          totalArticles: 0,
          totalCategories: 8,
          totalSources: stats.total,
          lastUpdate: new Date().toISOString()
        };
      } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al obtener estadísticas'
        });
      }
    })
});
