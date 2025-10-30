/**
 * 🖼️ SISTEMA DE OPTIMIZACIÓN DE IMÁGENES INTELIGENTE
 * URLs optimizadas de Unsplash para cada noticia específica
 */

export interface ImageMapping {
  [key: string]: {
    url: string;
    alt: string;
    description: string;
  };
}

// URLs optimizadas de Unsplash para cada noticia específica
export const optimizedImageMappings: ImageMapping = {
  // POLÍTICA - Milei
  "milei-anuncia-reformas-economicas-2025": {
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Javier Milei presidente de Argentina anunciando reformas económicas",
    description: "Presidente Javier Milei en conferencia de prensa económica"
  },
  "congreso-debate-ley-electoral": {
    url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Congreso Nacional debatiendo ley electoral",
    description: "Diputados y senadores en sesión parlamentaria"
  },
  "gobernadores-milei-coparticipacion": {
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Reunión de gobernadores con presidente Milei",
    description: "Gobernadores provinciales reunidos en Casa Rosada"
  },
  "oposicion-proyecto-ley-dnu": {
    url: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Oposición política en el Congreso",
    description: "Diputados opositores en sesión legislativa"
  },
  "cristina-kirchner-acto-la-plata": {
    url: "https://images.unsplash.com/photo-1494172892988-1329b04bd5c5?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Cristina Kirchner en acto político",
    description: "Ex presidenta Cristina Kirchner en acto público"
  },
  "milei-cumbre-europea": {
    url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Presidente Milei en cumbre internacional",
    description: "Javier Milei en reunión diplomática europea"
  },

  // ECONOMÍA
  "dolar-blue-record-historico": {
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Cotización del dólar blue en Argentina",
    description: "Billetes de dólar americano en mano"
  },
  "inflacion-enero-indec": {
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Gráficos de inflación económica",
    description: "Análisis estadístico de datos económicos"
  },
  "bcra-vende-dolares": {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Banco Central de la República Argentina",
    description: "Edificio del Banco Central en Buenos Aires"
  },
  "supermercados-aumentos-precios": {
    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Productos en supermercado con precios",
    description: "Gondolas de supermercado con productos"
  },
  "fmi-desembolso-argentina": {
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Logo del Fondo Monetario Internacional",
    description: "Edificio corporativo moderno representando finanzas"
  },

  // SOCIEDAD
  "record-inscripcion-universidades": {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Estudiantes universitarios en Argentina",
    description: "Jóvenes estudiantes en campus universitario"
  },
  "ola-calor-temperaturas-record": {
    url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Ola de calor en ciudad argentina",
    description: "Ciudad bajo intenso sol estival"
  },
  "docentes-paro-nacional": {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Docentes en manifestación",
    description: "Profesores y maestros en protesta"
  },

  // INTERNACIONAL
  "argentina-acuerdos-mercosur": {
    url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Reunión de países del Mercosur",
    description: "Líderes sudamericanos en cumbre regional"
  },
  "seleccion-argentina-eliminatorias": {
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Selección argentina de fútbol",
    description: "Jugadores de fútbol entrenando"
  },

  // CULTURA
  "festival-cine-mar-del-plata-2025": {
    url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Festival de Cine de Mar del Plata",
    description: "Cartelera de cine y festival cinematográfico"
  },

  // JUDICIAL - URLs específicas para casos judiciales
  "fiscal-juliana-companys-investigacion": {
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Fiscal Juliana Companys en investigación judicial",
    description: "Profesional jurídica en sala de tribunales"
  },
  "causa-corrupcion-obra-publica": {
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Investigación de corrupción en obra pública",
    description: "Documentos y evidencias judiciales"
  },
  "juez-suprema-corte-fallo": {
    url: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Juez de la Corte Suprema",
    description: "Tribunal de justicia y jueces"
  },
  "denuncia-caso-delitos-financieros": {
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&q=80&auto=format",
    alt: "Investigación de delitos financieros",
    description: "Análisis forense y documentos financieros"
  }
};

/**
 * Obtiene la imagen optimizada para un slug específico
 */
export function getOptimizedImage(slug: string): typeof optimizedImageMappings[keyof typeof optimizedImageMappings] | null {
  return optimizedImageMappings[slug] || null;
}

/**
 * Genera URLs srcset para imágenes responsivas
 */
export function generateSrcSet(baseUrl: string): string {
  if (!baseUrl.includes('unsplash.com')) return baseUrl;

  const sizes = [400, 600, 800, 1200, 1600];
  return sizes
    .map(size => {
      const height = Math.round(size * 0.5625); // 16:9 aspect ratio
      return `${baseUrl.replace(/w=\d+/, `w=${size}`).replace(/h=\d+/, `h=${height}`)} ${size}w`;
    })
    .join(', ');
}

/**
 * Categorías de fallback por tipo de noticia
 */
export const categoryFallbacks: Record<string, string> = {
  politica: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&q=80&auto=format",
  economia: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&q=80&auto=format",
  judicial: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80&auto=format",
  sociedad: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop&q=80&auto=format",
  internacional: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop&q=80&auto=format",
  opinion: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop&q=80&auto=format",
  elecciones: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop&q=80&auto=format",
  provincias: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=450&fit=crop&q=80&auto=format",
  deportes: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop&q=80&auto=format",
  cultura: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop&q=80&auto=format",
};

/**
 * Obtiene imagen de fallback por categoría
 */
export function getCategoryFallback(categorySlug: string): string {
  return categoryFallbacks[categorySlug] || categoryFallbacks.politica;
}

/**
 * Optimiza URL de imagen con parámetros específicos
 */
export function optimizeImageUrl(
  url: string,
  width: number = 800,
  height: number = 450,
  quality: number = 80
): string {
  if (!url.includes('unsplash.com')) return url;

  // Extraer parámetros existentes
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  // Actualizar parámetros
  params.set('w', width.toString());
  params.set('h', height.toString());
  params.set('fit', 'crop');
  params.set('q', quality.toString());
  params.set('auto', 'format');

  return `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
}

/**
 * Genera placeholder de blur para loading
 */
export function generateBlurPlaceholder(width = 8, height = 6): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Crear gradiente sutil
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(0.5, '#e5e7eb');
  gradient.addColorStop(1, '#f3f4f6');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}
