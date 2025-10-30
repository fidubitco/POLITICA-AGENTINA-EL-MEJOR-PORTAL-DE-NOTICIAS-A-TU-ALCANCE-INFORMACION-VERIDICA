import { generateImageSuggestion, optimizeUnsplashUrl, generateSrcSet } from './imageAI';
import { Article } from '@/data/allNews';

export interface OptimizedImage {
  url: string;
  srcSet: string;
  blurDataURL?: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Servicio inteligente de imágenes para el portal
 */
export class ImageService {
  private static instance: ImageService;
  private cache = new Map<string, OptimizedImage>();

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  /**
   * Optimiza una imagen para una noticia específica
   */
  async optimizeImageForArticle(article: Article): Promise<OptimizedImage> {
    const cacheKey = `article-${article.id}`;

    // Verificar caché
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Generar sugerencia inteligente de imagen
      const suggestion = await generateImageSuggestion(
        article.title,
        article.categorySlug,
        article.excerpt
      );

      // Construir URL optimizada (simulada con Unsplash por ahora)
      const baseUrl = this.generateImageUrlFromSuggestion(suggestion);
      const optimizedUrl = optimizeUnsplashUrl(baseUrl, 800, 450);
      const srcSet = generateSrcSet(baseUrl);

      const optimizedImage: OptimizedImage = {
        url: optimizedUrl,
        srcSet,
        alt: `${article.title} - ${article.category}`,
        width: 800,
        height: 450,
        blurDataURL: this.generateBlurDataURL()
      };

      // Cachear resultado
      this.cache.set(cacheKey, optimizedImage);

      return optimizedImage;

    } catch (error) {
      console.error('Error optimizing image:', error);

      // Fallback a imagen por defecto
      return this.getFallbackImage(article);
    }
  }

  /**
   * Genera URL de imagen basada en la sugerencia de IA
   */
  private generateImageUrlFromSuggestion(suggestion: any): string {
    // Por ahora, generamos URLs de Unsplash basadas en las sugerencias
    const query = encodeURIComponent(suggestion.query);
    return `https://source.unsplash.com/featured/?${query}`;
  }

  /**
   * Genera imagen de fallback
   */
  private getFallbackImage(article: Article): OptimizedImage {
    const fallbackUrls: Record<string, string> = {
      politica: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=450&fit=crop&q=80&auto=format',
      economia: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&q=80&auto=format',
      judicial: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80&auto=format',
      sociedad: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop&q=80&auto=format',
      internacional: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop&q=80&auto=format',
    };

    const baseUrl = fallbackUrls[article.categorySlug] || fallbackUrls.politica;
    const optimizedUrl = optimizeUnsplashUrl(baseUrl, 800, 450);
    const srcSet = generateSrcSet(baseUrl);

    return {
      url: optimizedUrl,
      srcSet,
      alt: `${article.title} - ${article.category}`,
      width: 800,
      height: 450,
      blurDataURL: this.generateBlurDataURL()
    };
  }

  /**
   * Genera blur data URL para placeholder
   */
  private generateBlurDataURL(): string {
    // Crear un placeholder SVG simple
    const svg = `
      <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="16">
          Cargando imagen...
        </text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }

  /**
   * Preload de imágenes críticas
   */
  async preloadCriticalImages(articles: Article[]): Promise<void> {
    const criticalArticles = articles.slice(0, 3); // Primeras 3 noticias

    for (const article of criticalArticles) {
      try {
        const optimizedImage = await this.optimizeImageForArticle(article);
        // Preload the image
        if (typeof window !== 'undefined') {
          const img = new Image();
          img.src = optimizedImage.url;
        }
      } catch (error) {
        console.error('Error preloading image:', error);
      }
    }
  }

  /**
   * Limpia el caché
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Obtiene estadísticas del servicio
   */
  getStats() {
    return {
      cacheSize: this.cache.size,
      cacheKeys: Array.from(this.cache.keys())
    };
  }
}

// Exportar instancia singleton
export const imageService = ImageService.getInstance();

