'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SmartImageManager, optimizeArticleImage } from '@/lib/smartImageManager';
import { getOptimizedImageForArticle, convertToOptimizedImage } from '@/lib/optimizedImages';
import { Loader2, AlertTriangle, ImageIcon, CheckCircle } from 'lucide-react';

interface SmartImageProps {
  src?: string;
  alt: string;
  title: string;
  category: string;
  categorySlug: string;
  tags: string[];
  content?: string;
  articleId?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  autoGenerate?: boolean;
  fallbackSrc?: string;
  onImageOptimized?: (result: any) => void;
}

export function SmartImage({
  src,
  alt,
  title,
  category,
  categorySlug,
  tags,
  content,
  articleId,
  width = 1200,
  height = 675,
  className = '',
  priority = false,
  quality = 85,
  autoGenerate = true,
  fallbackSrc,
  onImageOptimized
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const manager = SmartImageManager.getInstance();
  const optimizationAttempted = useRef(false);

  useEffect(() => {
    const optimizeImage = async () => {
      if (optimizationAttempted.current) return;
      optimizationAttempted.current = true;

      setIsOptimizing(true);

      try {
        let imageToUse = src;

        // Si no hay imagen específica, usar el sistema optimizado
        if (!imageToUse && categorySlug && title) {
          const optimizedImage = getOptimizedImageForArticle(categorySlug, title, tags, content);
          if (optimizedImage) {
            imageToUse = optimizedImage.url;
            console.log(`🎯 Imagen optimizada automática para "${title}": ${optimizedImage.title}`);
          }
        }

        // Convertir imágenes locales antiguas al nuevo sistema
        if (imageToUse && imageToUse.startsWith('/images/')) {
          imageToUse = convertToOptimizedImage(imageToUse, categorySlug);
        }

        // Si tenemos una imagen para optimizar
        if (imageToUse) {
          const result = await optimizeArticleImage({
            id: articleId,
            title,
            category,
            categorySlug,
            tags,
            imageUrl: imageToUse
          }, {
            autoGenerate,
            priority: priority ? 'high' : 'medium'
          });

          setOptimizationResult(result);
          setCurrentSrc(result.optimizedUrl);
          onImageOptimized?.(result);

          // Log para debugging
          if (result.generatedUrl) {
            console.log(`🤖 Imagen generada automáticamente para: "${title}"`);
          }
          if (!result.isValid && imageToUse !== result.optimizedUrl) {
            console.warn(`⚠️ Imagen optimizada para: "${title}" - Confianza original: ${result.confidence}%`);
          }
        } else {
          // Fallback si no hay imagen
          const fallbackImage = getOptimizedImageForArticle(categorySlug, title, tags, content);
          const fallbackUrl = fallbackImage ? fallbackImage.url : fallbackSrc || '';
          setCurrentSrc(fallbackUrl);
          console.log(`📋 Usando imagen de fallback para: "${title}"`);
        }

      } catch (error) {
        console.error('Error optimizing image:', error);
        // Usar fallback seguro
        const fallbackImage = getOptimizedImageForArticle(categorySlug, title, tags, content);
        setCurrentSrc(fallbackImage ? fallbackImage.url : (src || fallbackSrc || ''));
      } finally {
        setIsOptimizing(false);
      }
    };

    // Solo optimizar si hay contenido que analizar
    if (title && categorySlug) {
      optimizeImage();
    } else if (src) {
      setCurrentSrc(src);
    }
  }, [src, title, category, categorySlug, tags, articleId, autoGenerate, priority, fallbackSrc, onImageOptimized]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);

    // Intentar con fallback si está disponible
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    }
  };

  const getOptimizationBadge = () => {
    if (!optimizationResult) return null;

    const { isValid, confidence, generatedUrl } = optimizationResult;

    if (generatedUrl) {
      return (
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          IA
        </div>
      );
    }

    if (!isValid && confidence < 50) {
      return (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {confidence}%
        </div>
      );
    }

    if (confidence >= 80) {
      return (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium">
          ✓ {confidence}%
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="text-sm text-gray-600">
              {isOptimizing ? 'Optimizando imagen...' : 'Cargando...'}
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <span className="text-sm text-center px-4">
              Error al cargar la imagen
            </span>
          </div>
        </div>
      )}

      {/* Optimization Indicator */}
      {getOptimizationBadge()}

      {/* Image */}
      {currentSrc && (
        <Image
          src={currentSrc}
          alt={optimizationResult?.metadata?.alt || alt}
          title={optimizationResult?.metadata?.title || title}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          priority={priority}
          quality={quality}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* Debug Info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && optimizationResult && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-2">
          <div className="flex justify-between items-center">
            <span>Confianza: {optimizationResult.confidence}%</span>
            <span>Válida: {optimizationResult.isValid ? '✅' : '❌'}</span>
            {optimizationResult.generatedUrl && <span>Generada: 🤖</span>}
          </div>
          {optimizationResult.recommendations.length > 0 && (
            <div className="mt-1 text-yellow-300">
              💡 {optimizationResult.recommendations[0]}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Componente optimizado para artículos
export function ArticleImage({
  article,
  className = '',
  priority = false,
  width = 1200,
  height = 675
}: {
  article: {
    id?: number | string;
    title: string;
    category: string;
    categorySlug: string;
    tags: string[];
    content?: string;
    imageUrl?: string;
  };
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <SmartImage
      src={article.imageUrl}
      alt={`Imagen de ${article.category}: ${article.title}`}
      title={article.title}
      category={article.category}
      categorySlug={article.categorySlug}
      tags={article.tags}
      content={article.content}
      articleId={article.id?.toString()}
      width={width}
      height={height}
      className={className}
      priority={priority}
      autoGenerate={true}
      fallbackSrc={`/images/${article.categorySlug}-fallback.jpg`}
    />
  );
}

// Hook personalizado para gestión de imágenes
export function useSmartImage() {
  const manager = SmartImageManager.getInstance();

  return {
    optimizeImage: manager.optimizeImageForArticle.bind(manager),
    optimizeBatch: manager.optimizeBatch.bind(manager),
    clearCache: manager.clearCache.bind(manager),
    getStats: manager.getStats.bind(manager),
    queueOptimization: manager.queueImageOptimization.bind(manager)
  };
}