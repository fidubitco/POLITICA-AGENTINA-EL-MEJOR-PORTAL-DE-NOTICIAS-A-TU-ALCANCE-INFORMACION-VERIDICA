import { validateImageContent, generateNewsImage, ImageGenerationOptions } from './imageValidation';
import { DatabaseService } from './database';

export interface SmartImageConfig {
  articleId?: string;
  title: string;
  category: string;
  categorySlug: string;
  tags: string[];
  currentImageUrl?: string;
  priority: 'high' | 'medium' | 'low';
  autoGenerate: boolean;
}

export interface ImageOptimizationResult {
  originalUrl: string;
  optimizedUrl: string;
  isValid: boolean;
  confidence: number;
  generatedUrl?: string;
  recommendations: string[];
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
    alt: string;
    title: string;
  };
}

/**
 * Gestor inteligente de imágenes que valida y optimiza automáticamente
 */
export class SmartImageManager {
  private static instance: SmartImageManager;
  private imageCache = new Map<string, ImageOptimizationResult>();
  private processingQueue: SmartImageConfig[] = [];
  private isProcessing = false;

  static getInstance(): SmartImageManager {
    if (!SmartImageManager.instance) {
      SmartImageManager.instance = new SmartImageManager();
    }
    return SmartImageManager.instance;
  }

  /**
   * Optimiza una imagen para una noticia específica
   */
  async optimizeImageForArticle(config: SmartImageConfig): Promise<ImageOptimizationResult> {
    const cacheKey = `${config.articleId || 'no-id'}-${config.title}`;

    // Verificar cache
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    let result: ImageOptimizationResult;

    try {
      // 1. Validar imagen actual si existe
      let validation = null;
      if (config.currentImageUrl) {
        validation = await validateImageContent(
          config.currentImageUrl,
          config.title,
          config.category
        );
      }

      // 2. Generar nueva imagen si es necesario
      let generatedUrl: string | undefined;
      if (!validation?.isValid && config.autoGenerate) {
        generatedUrl = await this.generateOptimalImage(config);
      }

      // 3. Crear resultado optimizado
      result = await this.createOptimizedResult(config, validation, generatedUrl);

      // 4. Guardar en cache
      this.imageCache.set(cacheKey, result);

      // 5. Actualizar base de datos si hay articleId
      if (config.articleId) {
        await this.updateArticleImage(config.articleId, result);
      }

    } catch (error) {
      console.error('Error optimizing image:', error);
      // Fallback seguro
      result = this.createFallbackResult(config);
    }

    return result;
  }

  /**
   * Procesa múltiples imágenes en lote
   */
  async optimizeBatch(configs: SmartImageConfig[]): Promise<ImageOptimizationResult[]> {
    const results: ImageOptimizationResult[] = [];

    // Procesar en lotes para optimización
    const batchSize = 5;
    for (let i = 0; i < configs.length; i += batchSize) {
      const batch = configs.slice(i, i + batchSize);
      const batchPromises = batch.map(config => this.optimizeImageForArticle(config));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Pequeña pausa entre lotes
      if (i + batchSize < configs.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return results;
  }

  /**
   * Genera la imagen óptima para una noticia
   */
  private async generateOptimalImage(config: SmartImageConfig): Promise<string | undefined> {
    const generationOptions: ImageGenerationOptions = {
      title: config.title,
      category: config.categorySlug,
      keywords: config.tags,
      style: this.determineOptimalStyle(config.categorySlug),
      aspectRatio: '16:9' // Formato óptimo para noticias
    };

    return await generateNewsImage(generationOptions);
  }

  /**
   * Determina el estilo óptimo basado en la categoría
   */
  private determineOptimalStyle(categorySlug: string): 'professional' | 'news' | 'political' | 'economic' {
    const styleMap: Record<string, ImageGenerationOptions['style']> = {
      'politica': 'political',
      'economia': 'economic',
      'judicial': 'professional',
      'sociedad': 'news',
      'internacional': 'professional',
      'opinion': 'professional',
      'elecciones': 'political',
      'provincias': 'news',
      'deportes': 'news',
      'cultura': 'news'
    };

    return styleMap[categorySlug] || 'news';
  }

  /**
   * Crea el resultado optimizado final
   */
  private async createOptimizedResult(
    config: SmartImageConfig,
    validation: any,
    generatedUrl?: string
  ): Promise<ImageOptimizationResult> {
    const finalUrl = generatedUrl || config.currentImageUrl || this.getFallbackImage(config.categorySlug);

    return {
      originalUrl: config.currentImageUrl || '',
      optimizedUrl: finalUrl,
      isValid: validation?.isValid ?? false,
      confidence: validation?.confidence ?? 0,
      generatedUrl,
      recommendations: validation?.recommendations || [],
      metadata: await this.extractImageMetadata(finalUrl, config.title, config.category)
    };
  }

  /**
   * Crea un resultado de fallback seguro
   */
  private createFallbackResult(config: SmartImageConfig): ImageOptimizationResult {
    const fallbackUrl = this.getFallbackImage(config.categorySlug);

    return {
      originalUrl: config.currentImageUrl || '',
      optimizedUrl: fallbackUrl,
      isValid: false,
      confidence: 0,
      recommendations: ['Imagen generada automáticamente por fallback'],
      metadata: {
        width: 1200,
        height: 675,
        format: 'jpg',
        size: 0,
        alt: `Imagen de ${config.category} - ${config.title}`,
        title: config.title
      }
    };
  }

  /**
   * Obtiene imagen de fallback por categoría
   */
  private getFallbackImage(categorySlug: string): string {
    const fallbacks: Record<string, string> = {
      'politica': '/images/casa-rosada-1.jpg',
      'economia': '/images/economia-argentina-1.jpg',
      'judicial': 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=675&fit=crop&q=80&auto=format',
      'sociedad': '/images/argentina-celebracion-1.jpg',
      'internacional': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80&auto=format',
      'opinion': '/images/casa-rosada-1.jpg',
      'elecciones': '/images/argentina-celebracion-1.jpg',
      'provincias': '/images/argentina-celebracion-2.jpg',
      'deportes': '/images/argentina-celebracion-1.jpg',
      'cultura': '/images/argentina-celebracion-2.jpg'
    };

    return fallbacks[categorySlug] || '/images/argentina-celebracion-1.jpg';
  }

  /**
   * Extrae metadatos de la imagen
   */
  private async extractImageMetadata(
    url: string,
    title: string,
    category: string
  ): Promise<ImageOptimizationResult['metadata']> {
    try {
      // Intentar obtener dimensiones reales
      const img = new Image();
      img.crossOrigin = 'anonymous';

      return new Promise((resolve) => {
        img.onload = () => {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
            format: url.split('.').pop()?.split('?')[0] || 'jpg',
            size: 0, // No podemos obtener el tamaño real desde el cliente
            alt: `Imagen de ${category}: ${title}`,
            title: title
          });
        };

        img.onerror = () => {
          resolve({
            width: 1200,
            height: 675,
            format: 'jpg',
            size: 0,
            alt: `Imagen de ${category}: ${title}`,
            title: title
          });
        };

        img.src = url;
      });
    } catch (error) {
      return {
        width: 1200,
        height: 675,
        format: 'jpg',
        size: 0,
        alt: `Imagen de ${category}: ${title}`,
        title: title
      };
    }
  }

  /**
   * Actualiza la imagen del artículo en la base de datos
   */
  private async updateArticleImage(articleId: string, result: ImageOptimizationResult): Promise<void> {
    try {
      await DatabaseService.updateArticle(articleId, {
        imageUrl: result.optimizedUrl,
        // También podríamos guardar metadatos adicionales aquí
      });
    } catch (error) {
      console.error('Error updating article image:', error);
    }
  }

  /**
   * Limpia el cache de imágenes
   */
  clearCache(): void {
    this.imageCache.clear();
  }

  /**
   * Obtiene estadísticas del gestor de imágenes
   */
  getStats(): {
    cachedImages: number;
    processingQueue: number;
    isProcessing: boolean;
  } {
    return {
      cachedImages: this.imageCache.size,
      processingQueue: this.processingQueue.length,
      isProcessing: this.isProcessing
    };
  }

  /**
   * Procesa la cola de imágenes pendientes
   */
  async processQueue(): Promise<void> {
    if (this.isProcessing || this.processingQueue.length === 0) return;

    this.isProcessing = true;

    try {
      while (this.processingQueue.length > 0) {
        const config = this.processingQueue.shift()!;
        await this.optimizeImageForArticle(config);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Agrega una imagen a la cola de procesamiento
   */
  queueImageOptimization(config: SmartImageConfig): void {
    this.processingQueue.push(config);

    // Iniciar procesamiento si no está corriendo
    if (!this.isProcessing) {
      this.processQueue();
    }
  }
}

/**
 * Función helper para optimizar imagen de artículo
 */
export async function optimizeArticleImage(
  article: {
    id?: string;
    title: string;
    category: string;
    categorySlug: string;
    tags: string[];
    imageUrl?: string;
  },
  options: {
    priority?: 'high' | 'medium' | 'low';
    autoGenerate?: boolean;
  } = {}
): Promise<ImageOptimizationResult> {
  const manager = SmartImageManager.getInstance();

  const config: SmartImageConfig = {
    articleId: article.id,
    title: article.title,
    category: article.category,
    categorySlug: article.categorySlug,
    tags: article.tags,
    currentImageUrl: article.imageUrl,
    priority: options.priority || 'medium',
    autoGenerate: options.autoGenerate !== false
  };

  return await manager.optimizeImageForArticle(config);
}

/**
 * Función helper para optimizar múltiples artículos
 */
export async function optimizeArticlesBatch(
  articles: Array<{
    id?: string;
    title: string;
    category: string;
    categorySlug: string;
    tags: string[];
    imageUrl?: string;
  }>,
  options: {
    autoGenerate?: boolean;
  } = {}
): Promise<ImageOptimizationResult[]> {
  const manager = SmartImageManager.getInstance();

  const configs: SmartImageConfig[] = articles.map(article => ({
    articleId: article.id,
    title: article.title,
    category: article.category,
    categorySlug: article.categorySlug,
    tags: article.tags,
    currentImageUrl: article.imageUrl,
    priority: 'medium',
    autoGenerate: options.autoGenerate !== false
  }));

  return await manager.optimizeBatch(configs);
}

