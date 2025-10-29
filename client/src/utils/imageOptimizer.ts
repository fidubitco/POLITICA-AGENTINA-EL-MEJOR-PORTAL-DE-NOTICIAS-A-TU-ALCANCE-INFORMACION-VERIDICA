/**
 * 🖼️ IMAGE OPTIMIZER - PERFORMANCE ENHANCEMENT
 * Optimiza carga de imágenes con lazy loading y srcset
 */

export interface ImageOptimizationOptions {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  className?: string;
}

/**
 * Genera srcset para imágenes responsive
 */
export function generateSrcSet(baseUrl: string): string {
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * Genera sizes attribute para responsive images
 */
export function generateSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}

/**
 * Optimiza URL de imagen de Unsplash
 */
export function optimizeUnsplashUrl(url: string, width: number = 1200, quality: number = 80): string {
  if (!url.includes('unsplash.com')) return url;
  
  const urlObj = new URL(url);
  urlObj.searchParams.set('w', width.toString());
  urlObj.searchParams.set('q', quality.toString());
  urlObj.searchParams.set('fm', 'webp'); // Formato WebP para mejor compresión
  urlObj.searchParams.set('fit', 'crop');
  
  return urlObj.toString();
}

/**
 * Preload de imagen crítica
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Lazy load observer para imágenes
 */
export function createLazyLoadObserver(callback: (entry: IntersectionObserverEntry) => void): IntersectionObserver {
  const options = {
    root: null,
    rootMargin: '50px', // Cargar 50px antes de que sea visible
    threshold: 0.01
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
}

/**
 * Obtiene el placeholder blur para imagen
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

/**
 * Componente de imagen optimizada (helper)
 */
export const OptimizedImageProps = {
  loading: 'lazy' as const,
  decoding: 'async' as const,
  fetchPriority: 'low' as const
};

