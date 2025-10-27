/**
 * 📊 SERVICIO DE DATOS EN TIEMPO REAL - ENTERPRISE GRADE
 * Integración con APIs legales para datos actualizados
 */

// ============================================
// IMPORTANTE: APIs LEGALES Y GRATUITAS
// ============================================
// 
// 1. COTIZACIONES (Dólar Argentina):
//    - API DolarAPI: https://dolarapi.com/ (Gratis, sin auth)
//    - API Bluelytics: https://api.bluelytics.com.ar (Gratis)
//    - API DolarSi: https://www.dolarsi.com/api/api.php (Gratis)
//
// 2. NOTICIAS LEGALES:
//    - NewsAPI: https://newsapi.org/ (Requiere API key)
//    - RSS Feeds públicos de medios argentinos
//    - Google News RSS (Uso permitido)
//
// 3. CLIMA:
//    - OpenWeatherMap: https://openweathermap.org/api (Gratis)
//
// ============================================

export interface DolarQuote {
  compra: number;
  venta: number;
  fecha: string;
  variacion: number;
}

export interface DolarData {
  oficial: DolarQuote;
  blue: DolarQuote;
  mep: DolarQuote;
  ccl: DolarQuote;
  timestamp: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  rss?: string;
}

// Fuentes de noticias legales (RSS público)
export const legalNewsSources: NewsSource[] = [
  {
    id: 'lanacion',
    name: 'La Nación',
    url: 'https://www.lanacion.com.ar',
    rss: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/'
  },
  {
    id: 'clarin',
    name: 'Clarín',
    url: 'https://www.clarin.com',
    rss: 'https://www.clarin.com/rss/'
  },
  {
    id: 'infobae',
    name: 'Infobae',
    url: 'https://www.infobae.com',
    rss: 'https://www.infobae.com/feeds/rss/'
  },
  {
    id: 'pagina12',
    name: 'Página 12',
    url: 'https://www.pagina12.com.ar',
    rss: 'https://www.pagina12.com.ar/rss/portada'
  },
  {
    id: 'ambito',
    name: 'Ámbito',
    url: 'https://www.ambito.com',
    rss: 'https://www.ambito.com/rss/noticias.xml'
  }
];

/**
 * Obtener cotizaciones del dólar en tiempo real
 * Usa API pública y gratuita: https://dolarapi.com/
 */
export const getDolarQuotes = async (): Promise<DolarData | null> => {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    
    if (!response.ok) {
      throw new Error('Error al obtener cotizaciones');
    }

    const data = await response.json();
    
    // Procesar datos de la API
    const oficial = data.find((d: any) => d.casa === 'oficial');
    const blue = data.find((d: any) => d.casa === 'blue');
    const mep = data.find((d: any) => d.casa === 'bolsa');
    const ccl = data.find((d: any) => d.casa === 'contadoconliqui');

    return {
      oficial: {
        compra: oficial?.compra || 0,
        venta: oficial?.venta || 0,
        fecha: oficial?.fechaActualizacion || new Date().toISOString(),
        variacion: 0
      },
      blue: {
        compra: blue?.compra || 0,
        venta: blue?.venta || 0,
        fecha: blue?.fechaActualizacion || new Date().toISOString(),
        variacion: 0
      },
      mep: {
        compra: mep?.compra || 0,
        venta: mep?.venta || 0,
        fecha: mep?.fechaActualizacion || new Date().toISOString(),
        variacion: 0
      },
      ccl: {
        compra: ccl?.compra || 0,
        venta: ccl?.venta || 0,
        fecha: ccl?.fechaActualizacion || new Date().toISOString(),
        variacion: 0
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching dolar quotes:', error);
    return null;
  }
};

/**
 * Obtener noticias de RSS feeds (legal y permitido)
 * Los RSS feeds son públicos y su uso está permitido
 */
export const fetchRSSNews = async (rssUrl: string): Promise<any[]> => {
  try {
    // En producción, esto debe hacerse desde el backend
    // para evitar problemas de CORS
    const response = await fetch(`/api/rss-proxy?url=${encodeURIComponent(rssUrl)}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener RSS');
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return [];
  }
};

/**
 * NOTA IMPORTANTE SOBRE CONTENIDO:
 * 
 * Los RSS feeds proporcionan:
 * - Título de la noticia
 * - Resumen/descripción
 * - Link a la noticia original
 * - Fecha de publicación
 * 
 * LO QUE PUEDES HACER LEGALMENTE:
 * ✅ Mostrar el título y resumen
 * ✅ Enlazar a la noticia original
 * ✅ Agregar tu propio análisis o comentario
 * ✅ Crear contenido original inspirado en el tema
 * 
 * LO QUE NO PUEDES HACER:
 * ❌ Copiar el contenido completo
 * ❌ Republicar sin permiso
 * ❌ Presentar como contenido propio
 */

/**
 * Servicio para crear contenido original basado en temas
 * Este es el enfoque LEGAL y PROFESIONAL
 */
export interface ContentTemplate {
  topic: string;
  keywords: string[];
  sources: string[];
  outline: string[];
}

export const createOriginalContent = (template: ContentTemplate): string => {
  // Este es un placeholder
  // En producción, aquí integrarías:
  // 1. Un editor CMS donde periodistas escriben contenido original
  // 2. O una API de IA (OpenAI, Claude) para asistir en la creación
  // 3. Siempre con revisión humana y verificación de hechos
  
  return `
    <h2>${template.topic}</h2>
    <p>Contenido original creado por el equipo editorial.</p>
    <p>Fuentes consultadas: ${template.sources.join(', ')}</p>
  `;
};

/**
 * API de Noticias Legales (Requiere API Key)
 * NewsAPI.org - Servicio legal con licencia
 */
export const fetchNewsAPI = async (
  category: string,
  country: string = 'ar'
): Promise<any[]> => {
  const API_KEY = process.env.VITE_NEWS_API_KEY;
  
  if (!API_KEY) {
    console.warn('NewsAPI key not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Error al obtener noticias de NewsAPI');
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching NewsAPI:', error);
    return [];
  }
};

/**
 * Caché de datos para optimizar requests
 */
class DataCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 5 * 60 * 1000; // 5 minutos

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const dataCache = new DataCache();

/**
 * Hook para usar datos en tiempo real con caché
 */
export const useRealTimeData = () => {
  const getDolarWithCache = async (): Promise<DolarData | null> => {
    const cached = dataCache.get('dolar');
    if (cached) return cached;

    const data = await getDolarQuotes();
    if (data) {
      dataCache.set('dolar', data);
    }
    return data;
  };

  return {
    getDolarQuotes: getDolarWithCache,
    fetchRSSNews,
    fetchNewsAPI
  };
};

