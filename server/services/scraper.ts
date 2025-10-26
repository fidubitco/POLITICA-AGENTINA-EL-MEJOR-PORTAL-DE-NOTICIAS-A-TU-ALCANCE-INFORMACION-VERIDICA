import axios from 'axios';
import * as cheerio from 'cheerio';
import cron from 'node-cron';
import { db } from '../api/database';

interface ScrapedArticle {
  source_id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  original_url: string;
  published_at: Date;
}

// Configuración de fuentes de noticias
const NEWS_SOURCES = [
  {
    id: 1,
    name: 'Clarín',
    url: 'https://www.clarin.com',
    selectors: {
      articles: 'article',
      title: 'h2',
      link: 'a',
      image: 'img',
      category: '.section-name',
    },
  },
  {
    id: 2,
    name: 'La Nación',
    url: 'https://www.lanacion.com.ar',
    selectors: {
      articles: 'article',
      title: 'h2',
      link: 'a',
      image: 'img',
      category: '.section',
    },
  },
  {
    id: 3,
    name: 'Infobae',
    url: 'https://www.infobae.com',
    selectors: {
      articles: 'article',
      title: 'h2',
      link: 'a',
      image: 'img',
      category: '.category',
    },
  },
  {
    id: 4,
    name: 'Página/12',
    url: 'https://www.pagina12.com.ar',
    selectors: {
      articles: 'article',
      title: 'h2',
      link: 'a',
      image: 'img',
      category: '.section',
    },
  },
  {
    id: 5,
    name: 'Ámbito',
    url: 'https://www.ambito.com',
    selectors: {
      articles: 'article',
      title: 'h2',
      link: 'a',
      image: 'img',
      category: '.category',
    },
  },
];

/**
 * Scrape de una fuente de noticias específica
 */
export async function scrapeNewsSource(sourceId: number): Promise<ScrapedArticle[]> {
  const source = NEWS_SOURCES.find((s) => s.id === sourceId);
  
  if (!source) {
    throw new Error(`Fuente de noticias no encontrada: ${sourceId}`);
  }
  
  try {
    console.log(`🕷️ Scraping ${source.name}...`);
    
    // Fetch HTML
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });
    
    const $ = cheerio.load(response.data);
    const articles: ScrapedArticle[] = [];
    
    // Extraer artículos
    $(source.selectors.articles).each((_, element) => {
      try {
        const $article = $(element);
        
        const title = $article.find(source.selectors.title).first().text().trim();
        const link = $article.find(source.selectors.link).first().attr('href');
        const image = $article.find(source.selectors.image).first().attr('src');
        const category = $article.find(source.selectors.category).first().text().trim() || 'General';
        
        if (!title || !link) {
          return;
        }
        
        // Construir URL completa
        let fullUrl = link;
        if (!link.startsWith('http')) {
          fullUrl = new URL(link, source.url).href;
        }
        
        // Construir URL de imagen completa
        let fullImageUrl = image || null;
        if (image && !image.startsWith('http')) {
          fullImageUrl = new URL(image, source.url).href;
        }
        
        // Generar excerpt desde el título
        const excerpt = title.length > 150 ? title.substring(0, 147) + '...' : title;
        
        articles.push({
          source_id: sourceId,
          title,
          content: title, // Por ahora usamos el título como contenido
          excerpt,
          image_url: fullImageUrl,
          category: mapCategory(category),
          original_url: fullUrl,
          published_at: new Date(),
        });
      } catch (err) {
        console.error('Error procesando artículo:', err);
      }
    });
    
    console.log(`✅ ${source.name}: ${articles.length} artículos encontrados`);
    return articles;
  } catch (error) {
    console.error(`❌ Error scraping ${source.name}:`, error);
    return [];
  }
}

/**
 * Mapear categorías a nuestro sistema
 */
function mapCategory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'política': 'Política',
    'politica': 'Política',
    'economía': 'Economía',
    'economia': 'Economía',
    'sociedad': 'Sociedad',
    'internacional': 'Internacional',
    'deportes': 'Deportes',
    'cultura': 'Cultura',
    'espectáculos': 'Cultura',
    'espectaculos': 'Cultura',
    'tecnología': 'Tecnología',
    'tecnologia': 'Tecnología',
  };
  
  const lowerCategory = category.toLowerCase();
  
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerCategory.includes(key)) {
      return value;
    }
  }
  
  return 'General';
}

/**
 * Guardar artículos scrapeados en la base de datos
 */
export async function saveScrapedArticles(articles: ScrapedArticle[]): Promise<number> {
  let savedCount = 0;
  
  for (const article of articles) {
    try {
      // Verificar si el artículo ya existe (por URL)
      const existing = await db.query(
        'SELECT id FROM scraped_articles WHERE original_url = ?',
        [article.original_url]
      );
      
      if (existing.length > 0) {
        continue; // Ya existe, skip
      }
      
      // Insertar nuevo artículo
      await db.insert('scraped_articles', {
        source_id: article.source_id,
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        image_url: article.image_url,
        category: article.category,
        original_url: article.original_url,
        published_at: article.published_at,
        status: 'pending',
        created_at: new Date(),
      });
      
      savedCount++;
    } catch (error) {
      console.error('Error guardando artículo:', error);
    }
  }
  
  return savedCount;
}

/**
 * Scrape todas las fuentes configuradas
 */
export async function scrapeAllSources(): Promise<{
  total: number;
  saved: number;
  sources: { [key: string]: number };
}> {
  console.log('🚀 Iniciando scraping de todas las fuentes...');
  
  const results: { [key: string]: number } = {};
  let totalArticles = 0;
  let totalSaved = 0;
  
  for (const source of NEWS_SOURCES) {
    try {
      const articles = await scrapeNewsSource(source.id);
      const saved = await saveScrapedArticles(articles);
      
      results[source.name] = saved;
      totalArticles += articles.length;
      totalSaved += saved;
      
      // Esperar 2 segundos entre fuentes para no sobrecargar
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error en ${source.name}:`, error);
      results[source.name] = 0;
    }
  }
  
  console.log(`✅ Scraping completado: ${totalSaved}/${totalArticles} artículos guardados`);
  
  return {
    total: totalArticles,
    saved: totalSaved,
    sources: results,
  };
}

/**
 * Aprobar un artículo scrapeado y publicarlo
 */
export async function approveScrapedArticle(scrapedId: number): Promise<number> {
  // Obtener artículo scrapeado
  const scraped = await db.query(
    'SELECT * FROM scraped_articles WHERE id = ?',
    [scrapedId]
  );
  
  if (scraped.length === 0) {
    throw new Error('Artículo scrapeado no encontrado');
  }
  
  const article = scraped[0];
  
  // Obtener categoría ID
  const categories = await db.query(
    'SELECT id FROM categories WHERE name = ?',
    [article.category]
  );
  
  const categoryId = categories.length > 0 ? categories[0].id : 1;
  
  // Crear slug
  const slug = article.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
  
  // Insertar en articles
  const articleId = await db.insert('articles', {
    title: article.title,
    slug,
    excerpt: article.excerpt,
    content: article.content,
    image_url: article.image_url,
    category_id: categoryId,
    author_id: 1, // Admin por defecto
    status: 'published',
    published_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });
  
  // Actualizar estado del artículo scrapeado
  await db.update(
    'scraped_articles',
    { status: 'approved', approved_at: new Date() },
    { id: scrapedId }
  );
  
  return articleId;
}

/**
 * Rechazar un artículo scrapeado
 */
export async function rejectScrapedArticle(scrapedId: number): Promise<void> {
  await db.update(
    'scraped_articles',
    { status: 'rejected' },
    { id: scrapedId }
  );
}

/**
 * Configurar scraping automático (cron job)
 */
export function setupAutomaticScraping(): void {
  // Ejecutar cada 6 horas
  cron.schedule('0 */6 * * *', async () => {
    console.log('⏰ Ejecutando scraping automático...');
    try {
      await scrapeAllSources();
    } catch (error) {
      console.error('Error en scraping automático:', error);
    }
  });
  
  console.log('✅ Scraping automático configurado (cada 6 horas)');
}

/**
 * Obtener estadísticas de scraping
 */
export async function getScrapingStats(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  bySource: { [key: string]: number };
}> {
  const stats = await db.query(`
    SELECT 
      status,
      source_id,
      COUNT(*) as count
    FROM scraped_articles
    GROUP BY status, source_id
  `);
  
  const result = {
    pending: 0,
    approved: 0,
    rejected: 0,
    bySource: {} as { [key: string]: number },
  };
  
  for (const stat of stats) {
    if (stat.status === 'pending') result.pending += stat.count;
    if (stat.status === 'approved') result.approved += stat.count;
    if (stat.status === 'rejected') result.rejected += stat.count;
    
    const source = NEWS_SOURCES.find((s) => s.id === stat.source_id);
    if (source) {
      result.bySource[source.name] = (result.bySource[source.name] || 0) + stat.count;
    }
  }
  
  return result;
}

