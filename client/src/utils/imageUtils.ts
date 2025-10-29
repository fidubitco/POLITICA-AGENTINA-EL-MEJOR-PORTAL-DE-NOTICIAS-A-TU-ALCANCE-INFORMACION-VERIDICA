/**
 * 🖼️ IMAGE UTILITIES
 * Utilidades para manejo de imágenes con fallbacks
 */

/**
 * Obtiene una URL de imagen optimizada con fallback
 */
export const getOptimizedImageUrl = (url: string): string => {
  // Si es una URL de Unsplash, asegurarse que tenga los parámetros correctos
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=1200&h=675&fit=crop&q=80&auto=format&fm=jpg`;
  }
  
  return url;
};

/**
 * Obtiene una imagen placeholder basada en la categoría
 */
export const getCategoryPlaceholder = (category: string): string => {
  const placeholders: Record<string, string> = {
    politica: 'https://via.placeholder.com/1200x675/1565c0/ffffff?text=Política',
    economia: 'https://via.placeholder.com/1200x675/2e7d32/ffffff?text=Economía',
    judicial: 'https://via.placeholder.com/1200x675/c62828/ffffff?text=Judicial',
    sociedad: 'https://via.placeholder.com/1200x675/6a1b9a/ffffff?text=Sociedad',
    internacional: 'https://via.placeholder.com/1200x675/00838f/ffffff?text=Internacional',
    deportes: 'https://via.placeholder.com/1200x675/e65100/ffffff?text=Deportes',
    cultura: 'https://via.placeholder.com/1200x675/ad1457/ffffff?text=Cultura',
    tecnologia: 'https://via.placeholder.com/1200x675/283593/ffffff?text=Tecnología',
  };
  
  return placeholders[category.toLowerCase()] || placeholders.politica;
};

/**
 * Genera una imagen de gradiente como placeholder
 */
export const generateGradientPlaceholder = (category: string): string => {
  const colors: Record<string, string> = {
    politica: '1565c0',
    economia: '2e7d32',
    judicial: 'c62828',
    sociedad: '6a1b9a',
    internacional: '00838f',
    deportes: 'e65100',
    cultura: 'ad1457',
    tecnologia: '283593',
  };
  
  const color = colors[category.toLowerCase()] || colors.politica;
  
  // Crear un data URL con un gradiente SVG
  const svg = `
    <svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${color}cc;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#grad)"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Valida si una URL de imagen es válida
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:' || urlObj.protocol === 'data:';
  } catch {
    return false;
  }
};

/**
 * Obtiene la URL de imagen con fallback automático
 */
export const getImageWithFallback = (url: string, category: string): string => {
  if (!url || !isValidImageUrl(url)) {
    return generateGradientPlaceholder(category);
  }
  
  return getOptimizedImageUrl(url);
};

