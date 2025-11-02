import axios from 'axios';
import * as cheerio from 'cheerio';
import * as cron from 'node-cron';
import { db } from '../db';
import { scrapedArticles } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { redisCache } from './redis';
import { cacheInvalidation } from './cacheMiddleware';

interface ScrapedArticle {
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  publishDate: Date;
  sourceUrl: string;
  source: string;
  tags: string[];
}

interface NewsSource {
  name: string;
  url: string;
  selectors: {
    articles: string;
    title: string;
    content: string;
    image: string;
    date: string;
    author: string;
    category: string;
  };
  categories: string[];
}

// ===========================================
// CONFIGURACIÓN DE FUENTES DE NOTICIAS
// ===========================================

const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'Clarín',
    url: 'https://www.clarin.com/',
    selectors: {
      articles: 'article h2 a, .nota h2 a, .card-title a',
      title: 'h1, .entry-title',
      content: '.entry-content p, .nota-body p, article p',
      image: 'img[data-src], .featured-image img, article img',
      date: 'time, .date, .published',
      author: '.author, .byline, .autor',
      category: '.category, .section'
    },
    categories: ['Política', 'Economía', 'Sociedad', 'Mundo', 'Deportes']
  },
  {
    name: 'La Nación',
    url: 'https://www.lanacion.com.ar/',
    selectors: {
      articles: '.nota h2 a, .card-title a, article h3 a',
      title: 'h1, .entry-title',
      content: '.nota-body p, .entry-content p',
      image: '.featured-image img, article img',
      date: 'time, .date-published',
      author: '.author-name, .byline',
      category: '.category-name, .section-name'
    },
    categories: ['Política', 'Economía', 'Sociedad', 'Mundo', 'Deportes']
  },
  {
    name: 'Infobae',
    url: 'https://www.infobae.com/',
    selectors: {
      articles: '.headline a, .card-title a, article h2 a',
      title: 'h1, .entry-title',
      content: '.entry-content p, article p',
      image: '.featured-image img, .article-image img',
      date: 'time, .date, .publish-date',
      author: '.author, .byline',
      category: '.category, .section'
    },
    categories: ['Política', 'Economía', 'Sociedad', 'Mundo', 'Deportes']
  },
  {
    name: 'Página 12',
    url: 'https://www.pagina12.com.ar/',
    selectors: {
      articles: '.article-title a, h2 a, .nota h3 a',
      title: 'h1, .article-title',
      content: '.article-text p, .nota-body p',
      image: '.article-image img, .featured img',
      date: '.date, time',
      author: '.author, .byline',
      category: '.section, .category'
    },
    categories: ['Política', 'Economía', 'Sociedad', 'Mundo', 'Deportes']
  },
  {
    name: 'Ámbito Financiero',
    url: 'https://www.ambito.com/',
    selectors: {
      articles: '.nota h2 a, .card-title a, article a',
      title: 'h1, .entry-title',
      content: '.nota-body p, .entry-content p',
      image: '.featured-image img, article img',
      date: '.date, time',
      author: '.author, .byline',
      category: '.category, .section'
    },
    categories: ['Política', 'Economía', 'Finanzas', 'Mundo', 'Deportes']
  },
  {
    name: 'El Cronista',
    url: 'https://www.cronista.com/',
    selectors: {
      articles: '.article-title a, h2 a, .nota a',
      title: 'h1, .entry-title',
      content: '.article-content p, .nota-body p',
      image: '.featured img, article img',
      date: '.date, time, .publish-date',
      author: '.author, .byline',
      category: '.category, .section'
    },
    categories: ['Política', 'Economía', 'Finanzas', 'Mundo', 'Deportes']
  },
  {
    name: 'Perfil',
    url: 'https://www.perfil.com/',
    selectors: {
      articles: '.nota h2 a, .card-title a, article h3 a',
      title: 'h1, .entry-title',
      content: '.nota-body p, .entry-content p',
      image: '.featured-image img, article img',
      date: '.date, time',
      author: '.author, .byline',
      category: '.category, .section'
    },
    categories: ['Política', 'Economía', 'Sociedad', 'Mundo', 'Deportes']
  },
  {
    name: 'Télam',
    url: 'https://www.telam.com.ar/',
    selectors: {
      articles: '.nota h2 a, .card-title a, article h3 a',
      title: 'h1, .entry-title',
      content: '.nota-body p, .entry-content p',
      image: '.featured-image img, article img',
      date: '.date, time, .publish-date',
      author: '.author, .byline',
      category: '.category, .section'
    },
    categories: ['Política', 'Economía', 'Sociedad', 'Mundo', 'Deportes']
  }
];

// ===========================================
// CLASE PRINCIPAL DEL SCRAPER
// ===========================================

export class NewsScraper {
  private userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  constructor() {
    this.setupCronJobs();
  }

  // ===========================================
  // MÉTODO PRINCIPAL DE SCRAPING
  // ===========================================

  async scrapeAllSources(): Promise<{ success: number; failed: number; total: number }> {
    let success = 0;
    let failed = 0;

    console.log('🚀 Iniciando scraping de todas las fuentes...');

    for (const source of NEWS_SOURCES) {
      try {
        console.log(`📄 Scrapeando: ${source.name}`);
        const articles = await this.scrapeSource(source);

        if (articles.length > 0) {
          await this.saveArticles(articles, source.name);
          success++;
          console.log(`✅ ${source.name}: ${articles.length} artículos guardados`);
        } else {
          console.log(`⚠️ ${source.name}: No se encontraron artículos`);
        }
      } catch (error) {
        failed++;
        console.error(`❌ Error scrapeando ${source.name}:`, error.message);
      }

      // Esperar entre requests para no sobrecargar
      await this.delay(2000);
    }

    console.log(`📊 Resultados: ${success} fuentes exitosas, ${failed} fallidas`);

    return { success, failed, total: NEWS_SOURCES.length };
  }

  // ===========================================
  // SCRAPING DE UNA FUENTE ESPECÍFICA
  // ===========================================

  private async scrapeSource(source: NewsSource): Promise<ScrapedArticle[]> {
    try {
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 30000,
        maxRedirects: 5
      });

      const $ = cheerio.load(response.data);
      const articles: ScrapedArticle[] = [];

      // Buscar enlaces de artículos
      const articleLinks = $(source.selectors.articles)
        .map((_, element) => {
          const href = $(element).attr('href');
          if (href && href.startsWith('http') && !href.includes('#')) {
            return href;
          }
          return null;
        })
        .get()
        .filter(href => href !== null)
        .slice(0, 10); // Limitar a 10 artículos por fuente

      // Scrape individual de cada artículo
      for (const link of articleLinks) {
        try {
          const article = await this.scrapeArticle(link, source);
          if (article && article.title && article.content) {
            articles.push(article);
          }
          await this.delay(1000); // Esperar entre artículos
        } catch (error) {
          console.warn(`⚠️ Error scrapeando artículo ${link}:`, error.message);
        }
      }

      return articles;

    } catch (error) {
      throw new Error(`Error scrapeando ${source.name}: ${error.message}`);
    }
  }

  // ===========================================
  // SCRAPING DE UN ARTÍCULO INDIVIDUAL
  // ===========================================

  private async scrapeArticle(url: string, source: NewsSource): Promise<ScrapedArticle | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
          'Referer': source.url,
        },
        timeout: 20000,
        maxRedirects: 5
      });

      const $ = cheerio.load(response.data);

      // Extraer datos del artículo
      const title = this.cleanText($(source.selectors.title).first().text());
      const content = this.cleanText($(source.selectors.content).map((_, el) => $(el).text()).get().join(' '));
      const excerpt = content.substring(0, 200) + '...';

      // Extraer imagen
      let imageUrl = '';
      const imgElement = $(source.selectors.image).first();
      if (imgElement.length > 0) {
        imageUrl = imgElement.attr('data-src') || imgElement.attr('src') || '';
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = new URL(imageUrl, source.url).href;
        }
      }

      // Extraer fecha
      const dateText = $(source.selectors.date).first().attr('datetime') ||
                      $(source.selectors.date).first().text();
      const publishDate = this.parseDate(dateText) || new Date();

      // Extraer autor
      const author = this.cleanText($(source.selectors.author).first().text()) || 'Sin autor';

      // Extraer categoría
      const category = this.cleanText($(source.selectors.category).first().text()) ||
                      this.guessCategory(title, content, source.categories);

      // Generar tags basados en contenido
      const tags = this.extractTags(title + ' ' + content);

      return {
        title,
        content,
        excerpt,
        imageUrl,
        category,
        author,
        publishDate,
        sourceUrl: url,
        source: source.name,
        tags
      };

    } catch (error) {
      console.warn(`Error scrapeando artículo ${url}:`, error.message);
      return null;
    }
  }

  // ===========================================
  // GUARDAR ARTÍCULOS EN BASE DE DATOS
  // ===========================================

  private async saveArticles(articles: ScrapedArticle[], sourceName: string): Promise<void> {
    try {
      for (const article of articles) {
        // Verificar si ya existe
        const existing = await db
          .select()
          .from(scrapedArticles)
          .where(eq(scrapedArticles.sourceUrl, article.sourceUrl))
          .limit(1);

        if (existing.length === 0) {
          const inserted = await db.insert(scrapedArticles).values({
            title: article.title,
            content: article.content,
            excerpt: article.excerpt,
            imageUrl: article.imageUrl,
            category: article.category,
            author: article.author,
            publishDate: article.publishDate,
            sourceUrl: article.sourceUrl,
            source: article.source,
            tags: article.tags.join(','),
            status: 'pending'
          });

          // Invalidar cache de artículos scrapeados
          await cacheInvalidation.onArticleCreate({
            id: inserted.insertId || Date.now(), // Fallback si no tenemos el ID real
            category: article.category,
            tags: article.tags
          });
        }
      }
    } catch (error) {
      throw new Error(`Error guardando artículos de ${sourceName}: ${error.message}`);
    }
  }

  // ===========================================
  // UTILIDADES DE LIMPIEZA Y PROCESAMIENTO
  // ===========================================

  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();
  }

  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;

    try {
      // Intentar diferentes formatos de fecha
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date;
      }

      // Formato español común
      const spanishMonths = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
        'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
      };

      const match = dateString.toLowerCase().match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/);
      if (match) {
        const [, day, month, year] = match;
        const monthIndex = spanishMonths[month as keyof typeof spanishMonths];
        if (monthIndex !== undefined) {
          return new Date(parseInt(year), monthIndex, parseInt(day));
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  private guessCategory(title: string, content: string, availableCategories: string[]): string {
    const text = (title + ' ' + content).toLowerCase();

    // Palabras clave por categoría
    const categoryKeywords: Record<string, string[]> = {
      'Política': ['milei', 'kirchner', 'gobierno', 'congreso', 'senado', 'diputados', 'presidente', 'ministro', 'ley', 'votación'],
      'Economía': ['dólar', 'inflación', 'economía', 'pesos', 'banco', 'financiero', 'mercado', 'precio', 'salario'],
      'Sociedad': ['educación', 'salud', 'cultura', 'deporte', 'seguridad', 'justicia', 'ambiente', 'turismo'],
      'Mundo': ['internacional', 'eeuu', 'china', 'rusia', 'europa', 'onu', 'guerra', 'acuerdos'],
      'Deportes': ['fútbol', 'boca', 'river', 'selección', 'mundial', 'liga', 'partido', 'jugador']
    };

    for (const category of availableCategories) {
      const keywords = categoryKeywords[category] || [];
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }

    return availableCategories[0] || 'General';
  }

  private extractTags(text: string): string[] {
    const keywords = [
      'milei', 'kirchner', 'macri', 'fernandez', 'alberto', 'cristina', 'cfk',
      'dólar', 'inflación', 'economía', 'pesos', 'banco', 'mercado',
      'congreso', 'senado', 'diputados', 'gobierno', 'presidente',
      'corrupción', 'justicia', 'corte', 'suprema',
      'argentina', 'buenos aires', 'cordoba', 'rosario', 'mendoza'
    ];

    return keywords.filter(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 5); // Máximo 5 tags
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ===========================================
  // GESTIÓN DE CRON JOBS
  // ===========================================

  private setupCronJobs(): void {
    // Ejecutar scraping cada 2 horas
    cron.schedule('0 */2 * * *', async () => {
      console.log('⏰ Ejecutando scraping automático programado...');
      try {
        await this.scrapeAllSources();
        console.log('✅ Scraping automático completado');
      } catch (error) {
        console.error('❌ Error en scraping automático:', error);
      }
    });

    console.log('📅 Cron jobs configurados: scraping cada 2 horas');
  }

  // ===========================================
  // MÉTODOS PÚBLICOS PARA GESTIÓN MANUAL
  // ===========================================

  async startScraping(): Promise<{ success: number; failed: number; total: number }> {
    return await this.scrapeAllSources();
  }

  async getScrapedArticles(limit: number = 50): Promise<any[]> {
    const cacheKey = `scraped_articles:pending:${limit}`;

    return redisCache.getOrSet(cacheKey, async () => {
      return await db
        .select()
        .from(scrapedArticles)
        .where(eq(scrapedArticles.status, 'pending'))
        .orderBy(desc(scrapedArticles.publishDate))
        .limit(limit);
    }, {
      ttl: 300, // 5 minutos
      tags: ['scraped_articles', 'pending']
    });
  }

  async getApprovedArticles(limit: number = 50): Promise<any[]> {
    const cacheKey = `scraped_articles:approved:${limit}`;

    return redisCache.getOrSet(cacheKey, async () => {
      return await db
        .select()
        .from(scrapedArticles)
        .where(eq(scrapedArticles.status, 'approved'))
        .orderBy(desc(scrapedArticles.publishDate))
        .limit(limit);
    }, {
      ttl: 600, // 10 minutos
      tags: ['scraped_articles', 'approved']
    });
  }

  async getRejectedArticles(limit: number = 50): Promise<any[]> {
    const cacheKey = `scraped_articles:rejected:${limit}`;

    return redisCache.getOrSet(cacheKey, async () => {
      return await db
        .select()
        .from(scrapedArticles)
        .where(eq(scrapedArticles.status, 'rejected'))
        .orderBy(desc(scrapedArticles.publishDate))
        .limit(limit);
    }, {
      ttl: 600, // 10 minutos
      tags: ['scraped_articles', 'rejected']
    });
  }

  async approveArticle(articleId: number): Promise<void> {
    await db
      .update(scrapedArticles)
      .set({ status: 'approved' })
      .where(eq(scrapedArticles.id, articleId));

    // Invalidar cache de artículos scrapeados
    await cacheInvalidation.onArticleUpdate(articleId);
  }

  async rejectArticle(articleId: number): Promise<void> {
    await db
      .update(scrapedArticles)
      .set({ status: 'rejected' })
      .where(eq(scrapedArticles.id, articleId));

    // Invalidar cache de artículos scrapeados
    await cacheInvalidation.onArticleUpdate(articleId);
  }
}

// ===========================================
// INSTANCIA GLOBAL DEL SCRAPER
// ===========================================

export const newsScraper = new NewsScraper();
