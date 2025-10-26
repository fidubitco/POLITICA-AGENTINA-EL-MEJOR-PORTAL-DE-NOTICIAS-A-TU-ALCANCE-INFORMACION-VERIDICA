// ===========================================
// ROUTER DE IA PROFESIONAL
// API para servicios de IA avanzados
// ===========================================

import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../_core/trpc';
import { aiProfessionalService } from '../services/AIProfessionalService';
import { newsAutomation } from '../services/NewsAutomation';

const contentRequestSchema = z.object({
  type: z.enum(['title', 'content', 'excerpt', 'tags', 'seo']),
  context: z.object({
    title: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional()
  }),
  prompt: z.string().default("")
});

const contentAnalysisSchema = z.object({
  content: z.string(),
  title: z.string()
});

const seoOptimizationSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string()
});

const automaticContentSchema = z.object({
  topic: z.string(),
  category: z.string()
});

export const aiRouter = router({
  // Generar contenido con IA
  generateContent: protectedProcedure
    .input(contentRequestSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await aiProfessionalService.generateContent(input);
        return {
          success: true,
          data: result
        };
      } catch (error) {
        console.error('Error generating content:', error);
        return {
          success: false,
          error: 'Error generando contenido con IA'
        };
      }
    }),

  // Analizar contenido existente
  analyzeContent: protectedProcedure
    .input(contentAnalysisSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await aiProfessionalService.analyzeContent(input.content, input.title);
        return {
          success: true,
          data: result
        };
      } catch (error) {
        console.error('Error analyzing content:', error);
        return {
          success: false,
          error: 'Error analizando contenido'
        };
      }
    }),

  // Optimizar SEO
  optimizeSEO: protectedProcedure
    .input(seoOptimizationSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await aiProfessionalService.optimizeSEO(input.title, input.content, input.category);
        return {
          success: true,
          data: result
        };
      } catch (error) {
        console.error('Error optimizing SEO:', error);
        return {
          success: false,
          error: 'Error optimizando SEO'
        };
      }
    }),

  // Generar contenido automático
  generateAutomaticContent: protectedProcedure
    .input(automaticContentSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await aiProfessionalService.generateAutomaticContent(input.topic, input.category);
        return {
          success: true,
          data: result
        };
      } catch (error) {
        console.error('Error generating automatic content:', error);
        return {
          success: false,
          error: 'Error generando contenido automático'
        };
      }
    }),

  // Ejecutar automatización de noticias
  runNewsAutomation: protectedProcedure
    .mutation(async () => {
      try {
        await newsAutomation.automateNewsCreation();
        return {
          success: true,
          message: 'Automatización de noticias ejecutada exitosamente'
        };
      } catch (error) {
        console.error('Error running news automation:', error);
        return {
          success: false,
          error: 'Error ejecutando automatización de noticias'
        };
      }
    }),

  // Ejecutar publicaciones programadas
  executeScheduledPublications: protectedProcedure
    .mutation(async () => {
      try {
        await newsAutomation.executeScheduledPublications();
        return {
          success: true,
          message: 'Publicaciones programadas ejecutadas exitosamente'
        };
      } catch (error) {
        console.error('Error executing scheduled publications:', error);
        return {
          success: false,
          error: 'Error ejecutando publicaciones programadas'
        };
      }
    }),

  // Generar reporte de automatización
  getAutomationReport: protectedProcedure
    .query(async () => {
      try {
        const report = await newsAutomation.generateAutomationReport();
        return {
          success: true,
          data: report
        };
      } catch (error) {
        console.error('Error generating automation report:', error);
        return {
          success: false,
          error: 'Error generando reporte de automatización'
        };
      }
    }),

  // Generar reporte de IA
  getAIReport: protectedProcedure
    .query(async () => {
      try {
        const report = await aiProfessionalService.generateAIReport();
        return {
          success: true,
          data: report
        };
      } catch (error) {
        console.error('Error generating AI report:', error);
        return {
          success: false,
          error: 'Error generando reporte de IA'
        };
      }
    }),

  // Obtener sugerencias de IA para contenido
  getAISuggestions: protectedProcedure
    .input(z.object({
      content: z.string(),
      title: z.string(),
      category: z.string().optional()
    }))
    .query(async ({ input }) => {
      try {
        const analysis = await aiProfessionalService.analyzeContent(input.content, input.title);
        return {
          success: true,
          data: analysis.suggestions
        };
      } catch (error) {
        console.error('Error getting AI suggestions:', error);
        return {
          success: false,
          error: 'Error obteniendo sugerencias de IA'
        };
      }
    }),

  // Generar múltiples variantes de contenido
  generateContentVariants: protectedProcedure
    .input(z.object({
      type: z.enum(['title', 'content', 'excerpt']),
      baseContent: z.string(),
      count: z.number().min(1).max(5).default(3)
    }))
    .mutation(async ({ input }) => {
      try {
        const variants = [];
        for (let i = 0; i < input.count; i++) {
          const result = await aiProfessionalService.generateContent({
            type: input.type,
            context: { title: input.baseContent },
            prompt: `Genera una variante ${i + 1} de ${input.type}`
          });
          variants.push(result);
        }
        return {
          success: true,
          data: variants
        };
      } catch (error) {
        console.error('Error generating content variants:', error);
        return {
          success: false,
          error: 'Error generando variantes de contenido'
        };
      }
    }),

  // Optimizar contenido para diferentes audiencias
  optimizeForAudience: protectedProcedure
    .input(z.object({
      content: z.string(),
      audience: z.enum(['general', 'expert', 'beginner', 'youth', 'senior'])
    }))
    .mutation(async ({ input }) => {
      try {
        const optimizedContent = await aiProfessionalService.generateContent({
          type: 'content',
          context: { title: input.content },
          prompt: `Optimiza este contenido para audiencia ${input.audience}`
        });
        return {
          success: true,
          data: optimizedContent
        };
      } catch (error) {
        console.error('Error optimizing for audience:', error);
        return {
          success: false,
          error: 'Error optimizando contenido para audiencia'
        };
      }
    }),

  // Generar contenido para redes sociales
  generateSocialMediaContent: protectedProcedure
    .input(z.object({
      articleTitle: z.string(),
      articleContent: z.string(),
      platform: z.enum(['twitter', 'facebook', 'instagram', 'linkedin'])
    }))
    .mutation(async ({ input }) => {
      try {
        const socialContent = await aiProfessionalService.generateContent({
          type: 'content',
          context: { 
            title: input.articleTitle,
            content: input.articleContent 
          },
          prompt: `Genera contenido optimizado para ${input.platform}`
        });
        return {
          success: true,
          data: socialContent
        };
      } catch (error) {
        console.error('Error generating social media content:', error);
        return {
          success: false,
          error: 'Error generando contenido para redes sociales'
        };
      }
    }),

  // Verificar calidad del contenido
  checkContentQuality: protectedProcedure
    .input(z.object({
      content: z.string(),
      title: z.string()
    }))
    .query(async ({ input }) => {
      try {
        const analysis = await aiProfessionalService.analyzeContent(input.content, input.title);
        const qualityScore = (analysis.aiScore + analysis.readabilityScore + analysis.sentimentScore) / 3;
        
        return {
          success: true,
          data: {
            qualityScore,
            analysis,
            recommendations: analysis.suggestions
          }
        };
      } catch (error) {
        console.error('Error checking content quality:', error);
        return {
          success: false,
          error: 'Error verificando calidad del contenido'
        };
      }
    })
});

export default aiRouter;
