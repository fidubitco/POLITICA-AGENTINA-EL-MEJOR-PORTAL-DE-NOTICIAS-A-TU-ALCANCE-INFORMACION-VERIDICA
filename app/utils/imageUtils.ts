/**
 * 🖼️ UTILIDADES DE IMÁGENES - WORLD-CLASS
 * Funciones avanzadas para optimización y manejo de imágenes
 */

export function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  if (!url) return getDefaultPlaceholder();

  // Si es Unsplash, optimizar automáticamente
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('fit', 'crop');
    params.set('q', '80');
    params.set('auto', 'format');

    return `${url}?${params.toString()}`;
  }

  // Para otras URLs, devolver como está
  return url;
}

export function getCategoryPlaceholder(category: string): string {
  const placeholders: Record<string, string> = {
    politica: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=450&fit=crop&q=80&auto=format',
    economia: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&q=80&auto=format',
    judicial: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80&auto=format',
    sociedad: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop&q=80&auto=format',
    internacional: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop&q=80&auto=format',
    opinion: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop&q=80&auto=format',
    elecciones: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop&q=80&auto=format',
    provincias: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=450&fit=crop&q=80&auto=format',
    deportes: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop&q=80&auto=format',
    cultura: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop&q=80&auto=format',
  };

  return placeholders[category] || getDefaultPlaceholder();
}

export function getDefaultPlaceholder(): string {
  return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&q=80&auto=format';
}

export function generateGradientPlaceholder(category: string): string {
  const gradients: Record<string, string> = {
    politica: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
    economia: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
    judicial: 'linear-gradient(135deg, #c62828 0%, #ef5350 100%)',
    sociedad: 'linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)',
    internacional: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
    opinion: 'linear-gradient(135deg, #00838f 0%, #4dd0e1 100%)',
    elecciones: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
    provincias: 'linear-gradient(135deg, #00695c 0%, #26a69a 100%)',
  };

  return gradients[category] || 'linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%)';
}

export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

export function getImageWithFallback(url: string, category: string): string {
  return isValidImageUrl(url) ? url : getCategoryPlaceholder(category);
}

// Funciones para lazy loading y performance
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function createLazyLoadObserver(callback: IntersectionObserverCallback): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.1,
  });
}

export function getBlurDataURL(width = 8, height = 8): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Crear un patrón de blur simple
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(0.5, '#e5e7eb');
  gradient.addColorStop(1, '#f3f4f6');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}
