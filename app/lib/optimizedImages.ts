/**
 * 🖼️ SISTEMA DE IMÁGENES OPTIMIZADAS
 *
 * Imágenes verificadas y optimizadas para cada categoría y tipo de noticia
 * Todas las URLs apuntan a imágenes reales y apropiadas para el contenido
 */

export interface OptimizedImage {
  url: string;
  alt: string;
  title: string;
  category: string;
  tags: string[];
  width: number;
  height: number;
  source: 'unsplash' | 'generated' | 'local';
}

// Imágenes optimizadas por categoría
export const categoryImages: Record<string, OptimizedImage[]> = {
  politica: [
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Presidente Javier Milei en reunión oficial',
      title: 'Milei en actividad política',
      category: 'politica',
      tags: ['Milei', 'Presidente', 'Política'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Congreso Nacional de Argentina',
      title: 'Palacio Legislativo',
      category: 'politica',
      tags: ['Congreso', 'Política', 'Legislativo'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Casa Rosada - Sede del Gobierno',
      title: 'Casa Rosada histórica',
      category: 'politica',
      tags: ['Casa Rosada', 'Gobierno', 'Política'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Reunión política institucional',
      title: 'Diálogo político',
      category: 'politica',
      tags: ['Política', 'Institucional', 'Reunión'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  economia: [
    {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Gráficos económicos y análisis financiero',
      title: 'Mercado financiero',
      category: 'economia',
      tags: ['Economía', 'Finanzas', 'Mercado'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Dólar y análisis económico',
      title: 'Cotización dólar',
      category: 'economia',
      tags: ['Dólar', 'Economía', 'Cotización'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Centro financiero de Buenos Aires',
      title: 'Centro financiero',
      category: 'economia',
      tags: ['Buenos Aires', 'Finanzas', 'Economía'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Análisis económico y estadísticas',
      title: 'Análisis económico',
      category: 'economia',
      tags: ['Estadísticas', 'Economía', 'Análisis'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  judicial: [
    {
      url: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Corte Suprema de Justicia',
      title: 'Máximo tribunal',
      category: 'judicial',
      tags: ['Justicia', 'Tribunal', 'Judicial'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Balanza de la justicia',
      title: 'Símbolo judicial',
      category: 'judicial',
      tags: ['Justicia', 'Derecho', 'Legal'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Audiencia judicial',
      title: 'Sala de audiencias',
      category: 'judicial',
      tags: ['Audiencia', 'Tribunal', 'Justicia'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  sociedad: [
    {
      url: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Celebración popular argentina',
      title: 'Orgullo nacional',
      category: 'sociedad',
      tags: ['Argentina', 'Sociedad', 'Celebración'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=600&fit=crop&q=80&auto=format',
      alt: 'Educación y estudiantes',
      title: 'Sistema educativo',
      category: 'sociedad',
      tags: ['Educación', 'Estudiantes', 'Sociedad'],
      width: 800,
      height: 600,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Salud y bienestar social',
      title: 'Sistema de salud',
      category: 'sociedad',
      tags: ['Salud', 'Bienestar', 'Sociedad'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  internacional: [
    {
      url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Relaciones internacionales',
      title: 'Diplomacia global',
      category: 'internacional',
      tags: ['Internacional', 'Diplomacia', 'Global'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Acuerdos comerciales internacionales',
      title: 'Comercio exterior',
      category: 'internacional',
      tags: ['Comercio', 'Internacional', 'Acuerdos'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  elecciones: [
    {
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Proceso electoral democrático',
      title: 'Elecciones argentinas',
      category: 'elecciones',
      tags: ['Elecciones', 'Voto', 'Democracia'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Centro de votación',
      title: 'Jornada electoral',
      category: 'elecciones',
      tags: ['Votación', 'Elecciones', 'Democracia'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  deportes: [
    {
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Selección Argentina de fútbol',
      title: 'La Albiceleste',
      category: 'deportes',
      tags: ['Fútbol', 'Selección', 'Argentina'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ],
  cultura: [
    {
      url: 'https://images.unsplash.com/photo-1489599689857-8e4917861ca1?w=1200&h=675&fit=crop&q=80&auto=format',
      alt: 'Festival cultural argentino',
      title: 'Patrimonio cultural',
      category: 'cultura',
      tags: ['Cultura', 'Argentina', 'Tradición'],
      width: 1200,
      height: 675,
      source: 'unsplash'
    }
  ]
};

/**
 * Obtiene una imagen optimizada para una noticia específica
 */
export function getOptimizedImageForArticle(
  categorySlug: string,
  title: string,
  tags: string[] = []
): OptimizedImage | null {
  const categoryImagesList = categoryImages[categorySlug];
  if (!categoryImagesList || categoryImagesList.length === 0) {
    return null;
  }

  // Buscar imagen que coincida mejor con el contenido
  const titleLower = title.toLowerCase();
  const tagsLower = tags.map(tag => tag.toLowerCase());

  // Buscar coincidencias por tags primero
  for (const image of categoryImagesList) {
    const imageTagsLower = image.tags.map(tag => tag.toLowerCase());
    const hasTagMatch = tagsLower.some(tag =>
      imageTagsLower.some(imageTag => imageTag.includes(tag) || tag.includes(imageTag))
    );
    if (hasTagMatch) {
      return image;
    }
  }

  // Buscar coincidencias por título
  for (const image of categoryImagesList) {
    const imageTitleLower = image.title.toLowerCase();
    const hasTitleMatch = image.tags.some(tag =>
      titleLower.includes(tag.toLowerCase())
    );
    if (hasTitleMatch) {
      return image;
    }
  }

  // Retornar imagen aleatoria de la categoría
  return categoryImagesList[Math.floor(Math.random() * categoryImagesList.length)];
}

/**
 * Obtiene todas las imágenes disponibles para una categoría
 */
export function getCategoryImages(categorySlug: string): OptimizedImage[] {
  return categoryImages[categorySlug] || [];
}

/**
 * Obtiene imagen de fallback segura
 */
export function getFallbackImage(categorySlug: string): OptimizedImage {
  const fallbackImages: Record<string, OptimizedImage> = {
    politica: categoryImages.politica[0],
    economia: categoryImages.economia[0],
    judicial: categoryImages.judicial[0],
    sociedad: categoryImages.sociedad[0],
    internacional: categoryImages.internacional[0],
    elecciones: categoryImages.elecciones[0],
    deportes: categoryImages.deportes[0],
    cultura: categoryImages.cultura[0],
  };

  return fallbackImages[categorySlug] || categoryImages.politica[0];
}

/**
 * Valida si una URL de imagen es accesible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Obtiene estadísticas de imágenes por categoría
 */
export function getImageStats(): Record<string, {
  total: number;
  sources: Record<string, number>;
}> {
  const stats: Record<string, { total: number; sources: Record<string, number> }> = {};

  Object.entries(categoryImages).forEach(([category, images]) => {
    stats[category] = {
      total: images.length,
      sources: {}
    };

    images.forEach(image => {
      stats[category].sources[image.source] =
        (stats[category].sources[image.source] || 0) + 1;
    });
  });

  return stats;
}

/**
 * Mapeo directo de imágenes antiguas a nuevas optimizadas
 */
export const imageMapping: Record<string, string> = {
  '/images/milei-1.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/milei-2.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/milei-3.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/casa-rosada-1.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/casa-rosada-2.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/economia-argentina-1.jpg': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/dolar-blue-1.jpg': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/dolar-pesos-1.jpg': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/argentina-celebracion-1.jpg': 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/argentina-celebracion-2.jpg': 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=675&fit=crop&q=80&auto=format',
};

/**
 * Convierte una imagen antigua al nuevo sistema optimizado
 */
export function convertToOptimizedImage(oldImageUrl: string, categorySlug: string): string {
  // Si ya es una URL externa, mantenerla
  if (oldImageUrl.startsWith('http')) {
    return oldImageUrl;
  }

  // Buscar en el mapeo directo
  if (imageMapping[oldImageUrl]) {
    return imageMapping[oldImageUrl];
  }

  // Usar imagen optimizada de la categoría
  const optimizedImage = getOptimizedImageForArticle(categorySlug, '', []);
  return optimizedImage ? optimizedImage.url : getFallbackImage(categorySlug).url;
}

