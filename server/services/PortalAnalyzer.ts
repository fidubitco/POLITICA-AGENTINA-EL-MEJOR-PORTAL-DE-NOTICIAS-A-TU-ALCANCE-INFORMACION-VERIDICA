// ===========================================
// ANALIZADOR DE PORTALES ARGENTINOS TOP 50
// Sistema de análisis y extracción inteligente
// ===========================================

import axios from 'axios';
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

// ===========================================
// TOP 50 PORTALES DE ARGENTINA
// ===========================================

export const TOP_50_ARGENTINE_PORTALS = [
  // Medios principales
  { name: 'Clarín', url: 'https://www.clarin.com', category: 'general', priority: 1 },
  { name: 'La Nación', url: 'https://www.lanacion.com.ar', category: 'general', priority: 1 },
  { name: 'Página/12', url: 'https://www.pagina12.com.ar', category: 'general', priority: 1 },
  { name: 'Infobae', url: 'https://www.infobae.com', category: 'general', priority: 1 },
  { name: 'Ámbito Financiero', url: 'https://www.ambito.com', category: 'economia', priority: 1 },
  
  // Política
  { name: 'Perfil', url: 'https://www.perfil.com', category: 'politica', priority: 2 },
  { name: 'El Cronista', url: 'https://www.cronista.com', category: 'economia', priority: 2 },
  { name: 'La Política Online', url: 'https://www.lapoliticaonline.com', category: 'politica', priority: 2 },
  { name: 'Noticias Argentinas', url: 'https://www.noticiasargentinas.com', category: 'general', priority: 2 },
  { name: 'Télam', url: 'https://www.telam.com.ar', category: 'general', priority: 2 },
  
  // Economía y finanzas
  { name: 'El Economista', url: 'https://www.eleconomista.com.ar', category: 'economia', priority: 2 },
  { name: 'Cronista Comercial', url: 'https://www.cronista.com', category: 'economia', priority: 2 },
  { name: 'Buenos Aires Herald', url: 'https://www.buenosairesherald.com', category: 'general', priority: 3 },
  { name: 'La Capital', url: 'https://www.lacapital.com.ar', category: 'general', priority: 3 },
  { name: 'Los Andes', url: 'https://www.losandes.com.ar', category: 'general', priority: 3 },
  
  // Regionales
  { name: 'La Voz del Interior', url: 'https://www.lavoz.com.ar', category: 'general', priority: 3 },
  { name: 'Río Negro', url: 'https://www.rionegro.com.ar', category: 'general', priority: 3 },
  { name: 'El Tribuno', url: 'https://www.eltribuno.com', category: 'general', priority: 3 },
  { name: 'El Litoral', url: 'https://www.ellitoral.com', category: 'general', priority: 3 },
  { name: 'La Gaceta', url: 'https://www.lagaceta.com.ar', category: 'general', priority: 3 },
  
  // Deportes
  { name: 'Olé', url: 'https://www.ole.com.ar', category: 'deportes', priority: 3 },
  { name: 'TyC Sports', url: 'https://www.tycsports.com', category: 'deportes', priority: 3 },
  { name: 'ESPN Argentina', url: 'https://www.espn.com.ar', category: 'deportes', priority: 3 },
  { name: 'Fox Sports Argentina', url: 'https://www.foxsports.com.ar', category: 'deportes', priority: 3 },
  { name: 'La Red', url: 'https://www.lared.com.ar', category: 'deportes', priority: 3 },
  
  // Tecnología
  { name: 'Tecno', url: 'https://www.tecnoxplora.com', category: 'tecnologia', priority: 3 },
  { name: 'Canal AR', url: 'https://www.canal-ar.com.ar', category: 'tecnologia', priority: 3 },
  { name: 'IT Business', url: 'https://www.itbusiness.com.ar', category: 'tecnologia', priority: 3 },
  
  // Entretenimiento
  { name: 'Cine Argentino', url: 'https://www.cineargentino.com', category: 'entretenimiento', priority: 3 },
  { name: 'Revista Viva', url: 'https://www.revistaviva.com.ar', category: 'entretenimiento', priority: 3 },
  { name: 'Gente', url: 'https://www.gente.com.ar', category: 'entretenimiento', priority: 3 },
  
  // Especializados
  { name: 'Mercado', url: 'https://www.mercado.com.ar', category: 'economia', priority: 3 },
  { name: 'Apertura', url: 'https://www.apertura.com', category: 'economia', priority: 3 },
  { name: 'El Observador', url: 'https://www.elobservador.com.ar', category: 'general', priority: 3 },
  { name: 'La Mañana', url: 'https://www.lamanana.com.ar', category: 'general', priority: 3 },
  { name: 'El Diario', url: 'https://www.eldiario.com.ar', category: 'general', priority: 3 },
  
  // Digitales nativos
  { name: 'Chequeado', url: 'https://www.chequeado.com', category: 'verificacion', priority: 2 },
  { name: 'Posta', url: 'https://www.posta.com.ar', category: 'general', priority: 3 },
  { name: 'Urgente24', url: 'https://www.urgente24.com', category: 'general', priority: 3 },
  { name: 'Minuto Uno', url: 'https://www.minutouno.com', category: 'general', priority: 3 },
  { name: 'El Destape', url: 'https://www.eldestapeweb.com', category: 'general', priority: 3 },
  
  // Radio y TV
  { name: 'Radio Mitre', url: 'https://www.radiomitre.com.ar', category: 'general', priority: 3 },
  { name: 'Radio Continental', url: 'https://www.continental.com.ar', category: 'general', priority: 3 },
  { name: 'Radio Rivadavia', url: 'https://www.rivadavia.com.ar', category: 'general', priority: 3 },
  { name: 'TN', url: 'https://www.tn.com.ar', category: 'general', priority: 2 },
  { name: 'C5N', url: 'https://www.c5n.com', category: 'general', priority: 2 },
  
  // Internacionales con sección Argentina
  { name: 'BBC Mundo Argentina', url: 'https://www.bbc.com/mundo/topics/argentina', category: 'internacional', priority: 3 },
  { name: 'CNN en Español Argentina', url: 'https://cnnespanol.cnn.com/category/argentina/', category: 'internacional', priority: 3 },
  { name: 'DW Argentina', url: 'https://www.dw.com/es/argentina', category: 'internacional', priority: 3 },
  { name: 'France 24 Argentina', url: 'https://www.france24.com/es/argentina', category: 'internacional', priority: 3 },
  { name: 'RT en Español Argentina', url: 'https://actualidad.rt.com/argentina', category: 'internacional', priority: 3 },
  
  // Blogs y medios independientes
  { name: 'El Cohete a la Luna', url: 'https://www.elcohetealaluna.com', category: 'opinion', priority: 3 },
  { name: 'La Izquierda Diario', url: 'https://www.laizquierdadiario.com', category: 'opinion', priority: 3 },
  { name: 'Anfibia', url: 'https://www.revistaanfibia.com', category: 'cultura', priority: 3 },
  { name: 'Cosecha Roja', url: 'https://www.cosecharoja.org', category: 'derechos', priority: 3 },
  { name: 'Faro Digital', url: 'https://www.farodigital.com.ar', category: 'tecnologia', priority: 3 }
];

// ===========================================
// INTERFACES Y TIPOS
// ===========================================

export interface PortalStructure {
  name: string;
  url: string;
  category: string;
  priority: number;
  selectors: {
    article: string;
    title: string;
    content: string;
    image: string;
    author: string;
    date: string;
    category: string;
    tags: string;
  };
  patterns: {
    articleUrl: RegExp;
    imageUrl: RegExp;
    videoUrl: RegExp;
  };
  headers?: Record<string, string>;
  delay?: number;
}

export interface ExtractedArticle {
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  videoUrl?: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  language: string;
  wordCount: number;
  readingTime: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  seoScore: number;
  qualityScore: number;
}

export interface PortalAnalysis {
  portal: PortalStructure;
  articles: ExtractedArticle[];
  successRate: number;
  errorCount: number;
  lastScraped: Date;
  totalArticles: number;
  averageQuality: number;
}

// ===========================================
// CLASE PRINCIPAL DEL ANALIZADOR
// ===========================================

export class PortalAnalyzer {
  private portals: PortalStructure[];
  private userAgent: string;
  private delay: number;

  constructor() {
    this.portals = this.initializePortals();
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    this.delay = 1000; // 1 segundo entre requests
  }

  // ===========================================
  // INICIALIZAR PORTALES CON SELECTORES
  // ===========================================

  private initializePortals(): PortalStructure[] {
    return TOP_50_ARGENTINE_PORTALS.map(portal => ({
      ...portal,
      selectors: this.getSelectorsForPortal(portal.name),
      patterns: this.getPatternsForPortal(portal.name),
      headers: this.getHeadersForPortal(portal.name),
      delay: this.getDelayForPortal(portal.name)
    }));
  }

  private getSelectorsForPortal(portalName: string): PortalStructure['selectors'] {
    const selectors: Record<string, PortalStructure['selectors']> = {
      'Clarín': {
        article: 'article, .nota, .story',
        title: 'h1, .titulo, .headline',
        content: '.cuerpo, .texto, .content, p',
        image: 'img, .imagen img, .foto img',
        author: '.autor, .author, .byline',
        date: '.fecha, .date, time',
        category: '.categoria, .section, .rubro',
        tags: '.tags, .etiquetas, .keywords'
      },
      'La Nación': {
        article: 'article, .nota, .story',
        title: 'h1, .titulo, .headline',
        content: '.cuerpo, .texto, .content, p',
        image: 'img, .imagen img, .foto img',
        author: '.autor, .author, .byline',
        date: '.fecha, .date, time',
        category: '.categoria, .section, .rubro',
        tags: '.tags, .etiquetas, .keywords'
      },
      'Infobae': {
        article: 'article, .nota, .story',
        title: 'h1, .titulo, .headline',
        content: '.cuerpo, .texto, .content, p',
        image: 'img, .imagen img, .foto img',
        author: '.autor, .author, .byline',
        date: '.fecha, .date, time',
        category: '.categoria, .section, .rubro',
        tags: '.tags, .etiquetas, .keywords'
      }
      // Agregar más selectores específicos para cada portal
    };

    return selectors[portalName] || this.getDefaultSelectors();
  }

  private getDefaultSelectors(): PortalStructure['selectors'] {
    return {
      article: 'article, .nota, .story, .post, .entry',
      title: 'h1, .titulo, .headline, .title',
      content: '.cuerpo, .texto, .content, .body, p',
      image: 'img, .imagen img, .foto img, .photo img',
      author: '.autor, .author, .byline, .writer',
      date: '.fecha, .date, time, .published',
      category: '.categoria, .section, .rubro, .category',
      tags: '.tags, .etiquetas, .keywords, .tag'
    };
  }

  private getPatternsForPortal(portalName: string): PortalStructure['patterns'] {
    return {
      articleUrl: /\/\d{4}\/\d{2}\/\d{2}\/|\/nota\/|\/article\/|\/news\//,
      imageUrl: /\.(jpg|jpeg|png|gif|webp)$/i,
      videoUrl: /\.(mp4|webm|ogg|youtube|vimeo)/i
    };
  }

  private getHeadersForPortal(portalName: string): Record<string, string> {
    return {
      'User-Agent': this.userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    };
  }

  private getDelayForPortal(portalName: string): number {
    // Delays específicos para evitar rate limiting
    const delays: Record<string, number> = {
      'Clarín': 2000,
      'La Nación': 1500,
      'Infobae': 1000,
      'Página/12': 1500,
      'Ámbito Financiero': 1000
    };

    return delays[portalName] || 1000;
  }

  // ===========================================
  // ANÁLISIS DE ESTRUCTURA DE PORTAL
  // ===========================================

  async analyzePortalStructure(portalUrl: string): Promise<PortalStructure> {
    try {
      const response = await axios.get(portalUrl, {
        headers: this.getHeadersForPortal('default'),
        timeout: 30000
      });

      const $ = cheerio.load(response.data);
      
      // Analizar estructura de artículos
      const articleSelectors = this.findArticleSelectors($);
      const titleSelectors = this.findTitleSelectors($);
      const contentSelectors = this.findContentSelectors($);
      const imageSelectors = this.findImageSelectors($);
      const authorSelectors = this.findAuthorSelectors($);
      const dateSelectors = this.findDateSelectors($);
      const categorySelectors = this.findCategorySelectors($);
      const tagSelectors = this.findTagSelectors($);

      return {
        name: this.extractPortalName(portalUrl),
        url: portalUrl,
        category: 'general',
        priority: 1,
        selectors: {
          article: articleSelectors.join(', '),
          title: titleSelectors.join(', '),
          content: contentSelectors.join(', '),
          image: imageSelectors.join(', '),
          author: authorSelectors.join(', '),
          date: dateSelectors.join(', '),
          category: categorySelectors.join(', '),
          tags: tagSelectors.join(', ')
        },
        patterns: {
          articleUrl: /\/\d{4}\/\d{2}\/\d{2}\/|\/nota\/|\/article\/|\/news\//,
          imageUrl: /\.(jpg|jpeg|png|gif|webp)$/i,
          videoUrl: /\.(mp4|webm|ogg|youtube|vimeo)/i
        },
        headers: this.getHeadersForPortal('default'),
        delay: 1000
      };
    } catch (error) {
      console.error(`Error analyzing portal structure for ${portalUrl}:`, error);
      throw error;
    }
  }

  private findArticleSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    // Buscar elementos comunes de artículos
    const commonSelectors = [
      'article', '.nota', '.story', '.post', '.entry',
      '.article', '.news-item', '.content-item',
      '[data-testid*="article"]', '[class*="article"]',
      '[class*="nota"]', '[class*="story"]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findTitleSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      'h1', '.titulo', '.headline', '.title',
      '.article-title', '.news-title',
      '[data-testid*="title"]', '[class*="title"]',
      '[class*="titulo"]', '[class*="headline"]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findContentSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      '.cuerpo', '.texto', '.content', '.body',
      '.article-body', '.news-content', 'p',
      '[data-testid*="content"]', '[class*="content"]',
      '[class*="cuerpo"]', '[class*="texto"]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findImageSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      'img', '.imagen img', '.foto img', '.photo img',
      '.article-image img', '.news-image img',
      '[data-testid*="image"] img', '[class*="image"] img',
      '[class*="imagen"] img', '[class*="foto"] img'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findAuthorSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      '.autor', '.author', '.byline', '.writer',
      '.article-author', '.news-author',
      '[data-testid*="author"]', '[class*="author"]',
      '[class*="autor"]', '[class*="byline"]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findDateSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      '.fecha', '.date', 'time', '.published',
      '.article-date', '.news-date',
      '[data-testid*="date"]', '[class*="date"]',
      '[class*="fecha"]', '[datetime]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findCategorySelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      '.categoria', '.section', '.rubro', '.category',
      '.article-category', '.news-category',
      '[data-testid*="category"]', '[class*="category"]',
      '[class*="categoria"]', '[class*="section"]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private findTagSelectors($: cheerio.CheerioAPI): string[] {
    const selectors = [];
    
    const commonSelectors = [
      '.tags', '.etiquetas', '.keywords', '.tag',
      '.article-tags', '.news-tags',
      '[data-testid*="tag"]', '[class*="tag"]',
      '[class*="tags"]', '[class*="etiquetas"]'
    ];

    for (const selector of commonSelectors) {
      if ($(selector).length > 0) {
        selectors.push(selector);
      }
    }

    return selectors;
  }

  private extractPortalName(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'Unknown Portal';
    }
  }

  // ===========================================
  // EXTRACCIÓN DE ARTÍCULOS
  // ===========================================

  async extractArticlesFromPortal(portal: PortalStructure, maxArticles: number = 10): Promise<ExtractedArticle[]> {
    const articles: ExtractedArticle[] = [];
    
    try {
      console.log(`🔍 Extrayendo artículos de ${portal.name}...`);
      
      const response = await axios.get(portal.url, {
        headers: portal.headers,
        timeout: 30000
      });

      const $ = cheerio.load(response.data);
      
      // Buscar enlaces a artículos
      const articleLinks = this.findArticleLinks($, portal);
      
      for (let i = 0; i < Math.min(articleLinks.length, maxArticles); i++) {
        try {
          const articleUrl = articleLinks[i];
          const article = await this.extractSingleArticle(articleUrl, portal);
          
          if (article) {
            articles.push(article);
          }
          
          // Delay entre requests
          await this.delay(portal.delay || 1000);
          
        } catch (error) {
          console.error(`Error extracting article ${i + 1} from ${portal.name}:`, error);
        }
      }
      
      console.log(`✅ Extraídos ${articles.length} artículos de ${portal.name}`);
      
    } catch (error) {
      console.error(`Error extracting articles from ${portal.name}:`, error);
    }
    
    return articles;
  }

  private findArticleLinks($: cheerio.CheerioAPI, portal: PortalStructure): string[] {
    const links: string[] = [];
    
    // Buscar enlaces que coincidan con los patrones de artículos
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href && portal.patterns.articleUrl.test(href)) {
        const fullUrl = this.resolveUrl(href, portal.url);
        if (fullUrl && !links.includes(fullUrl)) {
          links.push(fullUrl);
        }
      }
    });
    
    return links;
  }

  private async extractSingleArticle(articleUrl: string, portal: PortalStructure): Promise<ExtractedArticle | null> {
    try {
      const response = await axios.get(articleUrl, {
        headers: portal.headers,
        timeout: 30000
      });

      const $ = cheerio.load(response.data);
      
      // Extraer datos del artículo
      const title = this.extractTitle($, portal.selectors);
      const content = this.extractContent($, portal.selectors);
      const imageUrl = this.extractImage($, portal.selectors, portal.url);
      const videoUrl = this.extractVideo($, portal.selectors);
      const author = this.extractAuthor($, portal.selectors);
      const publishedAt = this.extractDate($, portal.selectors);
      const category = this.extractCategory($, portal.selectors);
      const tags = this.extractTags($, portal.selectors);
      
      if (!title || !content) {
        return null;
      }
      
      // Procesar contenido
      const excerpt = this.generateExcerpt(content);
      const wordCount = this.countWords(content);
      const readingTime = this.calculateReadingTime(wordCount);
      const sentiment = this.analyzeSentiment(content);
      const keywords = this.extractKeywords(title, content);
      const seoScore = this.calculateSEOScore(title, content, keywords);
      const qualityScore = this.calculateQualityScore(title, content, wordCount);
      
      return {
        title,
        content,
        excerpt,
        imageUrl,
        videoUrl,
        author,
        publishedAt,
        category,
        tags,
        source: portal.name,
        sourceUrl: articleUrl,
        language: 'es',
        wordCount,
        readingTime,
        sentiment,
        keywords,
        seoScore,
        qualityScore
      };
      
    } catch (error) {
      console.error(`Error extracting article from ${articleUrl}:`, error);
      return null;
    }
  }

  // ===========================================
  // MÉTODOS DE EXTRACCIÓN
  // ===========================================

  private extractTitle($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): string {
    const titleSelectors = selectors.title.split(', ');
    
    for (const selector of titleSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        return element.text().trim();
      }
    }
    
    return '';
  }

  private extractContent($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): string {
    const contentSelectors = selectors.content.split(', ');
    
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        return element.text().trim();
      }
    }
    
    return '';
  }

  private extractImage($: cheerio.CheerioAPI, selectors: PortalStructure['selectors'], baseUrl: string): string {
    const imageSelectors = selectors.image.split(', ');
    
    for (const selector of imageSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        const src = element.attr('src') || element.attr('data-src');
        if (src) {
          return this.resolveUrl(src, baseUrl);
        }
      }
    }
    
    return '';
  }

  private extractVideo($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): string | undefined {
    // Buscar videos en iframes, videos, etc.
    const videoSelectors = [
      'iframe[src*="youtube"]', 'iframe[src*="vimeo"]',
      'video source', 'video',
      '[data-video]', '[class*="video"]'
    ];
    
    for (const selector of videoSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        const src = element.attr('src') || element.attr('data-src');
        if (src) {
          return src;
        }
      }
    }
    
    return undefined;
  }

  private extractAuthor($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): string {
    const authorSelectors = selectors.author.split(', ');
    
    for (const selector of authorSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        return element.text().trim();
      }
    }
    
    return 'Redacción';
  }

  private extractDate($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): Date {
    const dateSelectors = selectors.date.split(', ');
    
    for (const selector of dateSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        const dateText = element.text().trim();
        const dateAttr = element.attr('datetime');
        
        if (dateAttr) {
          const date = new Date(dateAttr);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }
        
        if (dateText) {
          const date = this.parseDate(dateText);
          if (date) {
            return date;
          }
        }
      }
    }
    
    return new Date();
  }

  private extractCategory($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): string {
    const categorySelectors = selectors.category.split(', ');
    
    for (const selector of categorySelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        return element.text().trim();
      }
    }
    
    return 'General';
  }

  private extractTags($: cheerio.CheerioAPI, selectors: PortalStructure['selectors']): string[] {
    const tagSelectors = selectors.tags.split(', ');
    const tags: string[] = [];
    
    for (const selector of tagSelectors) {
      const elements = $(selector);
      elements.each((_, element) => {
        const tag = $(element).text().trim();
        if (tag && !tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    
    return tags;
  }

  // ===========================================
  // MÉTODOS DE PROCESAMIENTO
  // ===========================================

  private generateExcerpt(content: string, maxLength: number = 160): string {
    const cleanContent = content.replace(/\s+/g, ' ').trim();
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    const excerpt = cleanContent.substring(0, maxLength);
    const lastSpace = excerpt.lastIndexOf(' ');
    
    return lastSpace > 0 ? excerpt.substring(0, lastSpace) + '...' : excerpt + '...';
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  private calculateReadingTime(wordCount: number): number {
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    // Análisis básico de sentimiento
    const positiveWords = ['bueno', 'excelente', 'positivo', 'éxito', 'mejor', 'increíble', 'fantástico'];
    const negativeWords = ['malo', 'terrible', 'negativo', 'fracaso', 'peor', 'horrible', 'desastre'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    for (const word of words) {
      if (positiveWords.some(pw => word.includes(pw))) {
        positiveCount++;
      }
      if (negativeWords.some(nw => word.includes(nw))) {
        negativeCount++;
      }
    }
    
    if (positiveCount > negativeCount) {
      return 'positive';
    } else if (negativeCount > positiveCount) {
      return 'negative';
    } else {
      return 'neutral';
    }
  }

  private extractKeywords(title: string, content: string): string[] {
    const text = `${title} ${content}`.toLowerCase();
    const words = text.split(/\s+/).filter(word => word.length > 3);
    
    // Contar frecuencia de palabras
    const wordCount: Record<string, number> = {};
    for (const word of words) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
    
    // Ordenar por frecuencia y tomar las top 10
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private calculateSEOScore(title: string, content: string, keywords: string[]): number {
    let score = 0;
    
    // Título entre 30-60 caracteres
    if (title.length >= 30 && title.length <= 60) {
      score += 20;
    }
    
    // Contenido mínimo 300 palabras
    if (this.countWords(content) >= 300) {
      score += 20;
    }
    
    // Keywords en título
    const titleLower = title.toLowerCase();
    const keywordInTitle = keywords.some(keyword => titleLower.includes(keyword));
    if (keywordInTitle) {
      score += 20;
    }
    
    // Keywords en contenido
    const contentLower = content.toLowerCase();
    const keywordInContent = keywords.some(keyword => contentLower.includes(keyword));
    if (keywordInContent) {
      score += 20;
    }
    
    // Estructura de párrafos
    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
    if (paragraphs.length >= 3) {
      score += 20;
    }
    
    return Math.min(score, 100);
  }

  private calculateQualityScore(title: string, content: string, wordCount: number): number {
    let score = 0;
    
    // Título no vacío
    if (title.trim().length > 0) {
      score += 20;
    }
    
    // Contenido no vacío
    if (content.trim().length > 0) {
      score += 20;
    }
    
    // Longitud adecuada
    if (wordCount >= 100 && wordCount <= 2000) {
      score += 20;
    }
    
    // Título descriptivo
    if (title.length >= 20) {
      score += 20;
    }
    
    // Contenido estructurado
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 3) {
      score += 20;
    }
    
    return Math.min(score, 100);
  }

  private parseDate(dateText: string): Date | null {
    // Patrones comunes de fecha en español
    const patterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
      /(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/
    ];
    
    for (const pattern of patterns) {
      const match = dateText.match(pattern);
      if (match) {
        try {
          return new Date(dateText);
        } catch {
          continue;
        }
      }
    }
    
    return null;
  }

  private resolveUrl(url: string, baseUrl: string): string {
    try {
      return new URL(url, baseUrl).href;
    } catch {
      return url;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ===========================================
  // MÉTODO PRINCIPAL DE ANÁLISIS
  // ===========================================

  async analyzeAllPortals(maxArticlesPerPortal: number = 5): Promise<PortalAnalysis[]> {
    const analyses: PortalAnalysis[] = [];
    
    console.log(`🚀 Iniciando análisis de ${this.portals.length} portales argentinos...`);
    
    for (const portal of this.portals) {
      try {
        console.log(`📰 Analizando ${portal.name}...`);
        
        const articles = await this.extractArticlesFromPortal(portal, maxArticlesPerPortal);
        const successRate = articles.length / maxArticlesPerPortal;
        const averageQuality = articles.length > 0 
          ? articles.reduce((sum, article) => sum + article.qualityScore, 0) / articles.length 
          : 0;
        
        const analysis: PortalAnalysis = {
          portal,
          articles,
          successRate,
          errorCount: maxArticlesPerPortal - articles.length,
          lastScraped: new Date(),
          totalArticles: articles.length,
          averageQuality
        };
        
        analyses.push(analysis);
        
        console.log(`✅ ${portal.name}: ${articles.length} artículos extraídos (${(successRate * 100).toFixed(1)}% éxito)`);
        
        // Delay entre portales
        await this.delay(2000);
        
      } catch (error) {
        console.error(`❌ Error analizando ${portal.name}:`, error);
        
        const analysis: PortalAnalysis = {
          portal,
          articles: [],
          successRate: 0,
          errorCount: maxArticlesPerPortal,
          lastScraped: new Date(),
          totalArticles: 0,
          averageQuality: 0
        };
        
        analyses.push(analysis);
      }
    }
    
    console.log(`🎉 Análisis completado: ${analyses.length} portales procesados`);
    
    return analyses;
  }
}
