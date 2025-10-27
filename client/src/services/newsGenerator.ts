/**
 * 📰 GENERADOR DE NOTICIAS ÚNICAS - ENTERPRISE GRADE
 * Sistema automático de generación de contenido original
 */

export interface NewsSource {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  content?: string;
}

export interface GeneratedNews {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  author: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    slug: string;
  };
  translations?: Record<string, {
    title: string;
    excerpt: string;
    content: string;
  }>;
}

/**
 * Buscar noticias en NewsAPI
 */
export const searchNewsAPI = async (query: string, options?: {
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
}): Promise<NewsSource[]> => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  
  if (!apiKey) {
    console.warn('NewsAPI key not configured');
    return [];
  }

  try {
    const params = new URLSearchParams({
      q: query,
      language: options?.language || 'es',
      sortBy: options?.sortBy || 'publishedAt',
      pageSize: String(options?.pageSize || 10),
      apiKey
    });

    const response = await fetch(`https://newsapi.org/v2/everything?${params}`);
    const data = await response.json();

    if (data.status === 'ok') {
      return data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        content: article.content
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};

/**
 * Generar noticia única con IA
 */
export const generateUniqueNews = async (
  source: NewsSource,
  category: string
): Promise<GeneratedNews | null> => {
  try {
    // Aquí se llamaría a tu backend que usa OpenAI/Claude
    const response = await fetch('/api/trpc/ai.generateUniqueArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: {
          title: source.title,
          description: source.description,
          content: source.content,
          url: source.url
        },
        category,
        language: 'es'
      })
    });

    const data = await response.json();
    
    if (data.result?.data) {
      return data.result.data;
    }

    return null;
  } catch (error) {
    console.error('Error generating unique news:', error);
    return null;
  }
};

/**
 * Optimizar noticia para SEO
 */
export const optimizeForSEO = (news: GeneratedNews): GeneratedNews => {
  // Generar slug
  const slug = news.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Optimizar meta title (máximo 60 caracteres)
  const metaTitle = news.title.length > 60
    ? news.title.substring(0, 57) + '...'
    : news.title;

  // Optimizar meta description (máximo 160 caracteres)
  const metaDescription = news.excerpt.length > 160
    ? news.excerpt.substring(0, 157) + '...'
    : news.excerpt;

  // Extraer keywords del contenido
  const keywords = extractKeywords(news.content, news.category);

  return {
    ...news,
    seo: {
      metaTitle,
      metaDescription,
      keywords,
      slug
    }
  };
};

/**
 * Extraer keywords del contenido
 */
const extractKeywords = (content: string, category: string): string[] => {
  // Palabras comunes a ignorar
  const stopWords = new Set([
    'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'haber',
    'por', 'con', 'su', 'para', 'como', 'estar', 'tener', 'le', 'lo', 'todo',
    'pero', 'más', 'hacer', 'o', 'poder', 'decir', 'este', 'ir', 'otro', 'ese',
    'la', 'si', 'me', 'ya', 'ver', 'porque', 'dar', 'cuando', 'él', 'muy',
    'sin', 'vez', 'mucho', 'saber', 'qué', 'sobre', 'mi', 'alguno', 'mismo',
    'yo', 'también', 'hasta', 'año', 'dos', 'querer', 'entre', 'así', 'primero'
  ]);

  // Extraer palabras
  const words = content
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\W+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Contar frecuencia
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Ordenar por frecuencia
  const sorted = Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);

  // Agregar categoría
  return [category, ...sorted];
};

/**
 * Traducir noticia a múltiples idiomas
 */
export const translateNews = async (
  news: GeneratedNews,
  targetLanguages: string[]
): Promise<GeneratedNews> => {
  try {
    const response = await fetch('/api/trpc/ai.translateArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title: news.title,
          excerpt: news.excerpt,
          content: news.content
        },
        targetLanguages
      })
    });

    const data = await response.json();
    
    if (data.result?.data?.translations) {
      return {
        ...news,
        translations: data.result.data.translations
      };
    }

    return news;
  } catch (error) {
    console.error('Error translating news:', error);
    return news;
  }
};

/**
 * Indexar noticia en Google
 */
export const indexInGoogle = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/trpc/seo.indexUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    return data.result?.data?.success || false;
  } catch (error) {
    console.error('Error indexing in Google:', error);
    return false;
  }
};

/**
 * Proceso completo de generación
 */
export const generateCompleteNews = async (
  query: string,
  category: string,
  options?: {
    translate?: boolean;
    index?: boolean;
    publish?: boolean;
  }
): Promise<GeneratedNews | null> => {
  try {
    // 1. Buscar noticias en NewsAPI
    console.log('🔍 Buscando noticias en NewsAPI...');
    const sources = await searchNewsAPI(query, { pageSize: 1 });
    
    if (sources.length === 0) {
      console.error('No se encontraron noticias');
      return null;
    }

    // 2. Generar versión única con IA
    console.log('🤖 Generando versión única con IA...');
    let news = await generateUniqueNews(sources[0], category);
    
    if (!news) {
      console.error('Error generando noticia única');
      return null;
    }

    // 3. Optimizar para SEO
    console.log('🔍 Optimizando para SEO...');
    news = optimizeForSEO(news);

    // 4. Traducir (opcional)
    if (options?.translate) {
      console.log('🌐 Traduciendo a múltiples idiomas...');
      const languages = ['en', 'pt', 'fr', 'de', 'it'];
      news = await translateNews(news, languages);
    }

    // 5. Indexar en Google (opcional)
    if (options?.index && news.seo.slug) {
      console.log('📊 Indexando en Google...');
      const url = `https://politicaargentina.com/${category}/${news.seo.slug}`;
      await indexInGoogle(url);
    }

    // 6. Publicar (opcional)
    if (options?.publish) {
      console.log('📰 Publicando noticia...');
      await publishNews(news);
    }

    console.log('✅ Noticia generada exitosamente');
    return news;
  } catch (error) {
    console.error('Error en proceso completo:', error);
    return null;
  }
};

/**
 * Publicar noticia
 */
const publishNews = async (news: GeneratedNews): Promise<boolean> => {
  try {
    const response = await fetch('/api/trpc/articles.create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: news.title,
        excerpt: news.excerpt,
        content: news.content,
        category: news.category,
        tags: news.tags,
        imageUrl: news.imageUrl,
        author: news.author,
        status: 'published',
        seo: news.seo
      })
    });

    const data = await response.json();
    return data.result?.data?.success || false;
  } catch (error) {
    console.error('Error publishing news:', error);
    return false;
  }
};

/**
 * Verificar plagio
 */
export const checkPlagiarism = async (content: string): Promise<{
  isPlagiarized: boolean;
  similarity: number;
  sources: string[];
}> => {
  // Aquí se integraría con un servicio de detección de plagio
  // Por ahora, retornamos un resultado simulado
  return {
    isPlagiarized: false,
    similarity: 0,
    sources: []
  };
};

/**
 * Calcular score de calidad
 */
export const calculateQualityScore = (news: GeneratedNews): {
  overall: number;
  readability: number;
  seo: number;
  uniqueness: number;
} => {
  // Readability (basado en longitud y estructura)
  const readability = Math.min(100, (news.content.length / 20) + 50);

  // SEO (basado en keywords y meta tags)
  const seo = news.seo.keywords.length * 10;

  // Uniqueness (simulado - en producción usaría un servicio real)
  const uniqueness = 100;

  // Overall
  const overall = (readability + seo + uniqueness) / 3;

  return {
    overall: Math.round(overall),
    readability: Math.round(readability),
    seo: Math.round(seo),
    uniqueness: Math.round(uniqueness)
  };
};

