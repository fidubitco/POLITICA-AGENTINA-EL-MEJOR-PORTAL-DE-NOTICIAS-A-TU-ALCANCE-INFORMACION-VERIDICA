// ===========================================
// INTELLIGENT NEWS AUTOMATION SYSTEM
// Sistema de automatización inteligente de noticias con scraping avanzado
// ===========================================

import { z } from 'zod';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { createHash } from 'crypto';

// ===========================================
// INTERFACES Y TIPOS
// ===========================================

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  language: string;
  country: string;
  category: string;
  priority: number;
  enabled: boolean;
  selectors: SourceSelectors;
  rateLimit: RateLimit;
  lastScraped?: Date;
  successRate: number;
  errorCount: number;
}

export interface SourceSelectors {
  articleList: string;
  articleLink: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string;
  nextPage?: string;
  pagination?: string;
}

export interface RateLimit {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  delayBetweenRequests: number;
}

export interface ScrapedArticle {
  id: string;
  sourceId: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  url: string;
  language: string;
  country: string;
  priority: number;
  qualityScore: number;
  seoScore: number;
  sentimentScore: number;
  trendingScore: number;
  hash: string;
  scrapedAt: Date;
  processed: boolean;
  published: boolean;
  errors: string[];
}

export interface NewsAnalysis {
  articleId: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  topics: string[];
  keywords: string[];
  entities: string[];
  summary: string;
  translation: Record<string, string>;
  seoOptimization: Record<string, any>;
  trendingPotential: number;
  viralPotential: number;
  qualityScore: number;
  recommendations: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  enabled: boolean;
  priority: number;
  createdAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'regex';
  value: any;
  logic: 'AND' | 'OR';
}

export interface AutomationAction {
  type: 'publish' | 'schedule' | 'translate' | 'categorize' | 'tag' | 'seo_optimize' | 'notify' | 'archive';
  parameters: Record<string, any>;
  delay?: number;
}

// ===========================================
// TOP 50 PORTALES DE ARGENTINA
// ===========================================

export const ARGENTINE_NEWS_SOURCES: NewsSource[] = [
  // Periódicos principales
  {
    id: 'clarin',
    name: 'Clarín',
    url: 'https://www.clarin.com',
    language: 'es',
    country: 'AR',
    category: 'general',
    priority: 10,
    enabled: true,
    selectors: {
      articleList: '.nota',
      articleLink: 'a',
      title: 'h2, h3',
      content: '.cuerpo',
      excerpt: '.bajada',
      image: 'img',
      author: '.autor',
      publishedAt: '.fecha',
      category: '.seccion',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      requestsPerDay: 1000,
      delayBetweenRequests: 6000
    },
    successRate: 95,
    errorCount: 0
  },
  {
    id: 'lanacion',
    name: 'La Nación',
    url: 'https://www.lanacion.com.ar',
    language: 'es',
    country: 'AR',
    category: 'general',
    priority: 10,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      requestsPerDay: 1000,
      delayBetweenRequests: 6000
    },
    successRate: 95,
    errorCount: 0
  },
  {
    id: 'pagina12',
    name: 'Página/12',
    url: 'https://www.pagina12.com.ar',
    language: 'es',
    country: 'AR',
    category: 'general',
    priority: 9,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-content',
      excerpt: '.article-summary',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  },
  {
    id: 'infobae',
    name: 'Infobae',
    url: 'https://www.infobae.com',
    language: 'es',
    country: 'AR',
    category: 'general',
    priority: 9,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      requestsPerDay: 1000,
      delayBetweenRequests: 6000
    },
    successRate: 95,
    errorCount: 0
  },
  {
    id: 'perfil',
    name: 'Perfil',
    url: 'https://www.perfil.com',
    language: 'es',
    country: 'AR',
    category: 'general',
    priority: 8,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  },
  {
    id: 'ambito',
    name: 'Ámbito Financiero',
    url: 'https://www.ambito.com',
    language: 'es',
    country: 'AR',
    category: 'economia',
    priority: 9,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  },
  {
    id: 'cronista',
    name: 'El Cronista',
    url: 'https://www.cronista.com',
    language: 'es',
    country: 'AR',
    category: 'economia',
    priority: 8,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  },
  {
    id: 'teleshow',
    name: 'Teleshow',
    url: 'https://www.teleshow.com.ar',
    language: 'es',
    country: 'AR',
    category: 'espectaculos',
    priority: 7,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  },
  {
    id: 'tycsports',
    name: 'TyC Sports',
    url: 'https://www.tycsports.com',
    language: 'es',
    country: 'AR',
    category: 'deportes',
    priority: 8,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  },
  {
    id: 'ole',
    name: 'Olé',
    url: 'https://www.ole.com.ar',
    language: 'es',
    country: 'AR',
    category: 'deportes',
    priority: 8,
    enabled: true,
    selectors: {
      articleList: '.article',
      articleLink: 'a',
      title: 'h1, h2',
      content: '.article-body',
      excerpt: '.article-excerpt',
      image: 'img',
      author: '.author',
      publishedAt: '.date',
      category: '.section',
      tags: '.tags a'
    },
    rateLimit: {
      requestsPerMinute: 8,
      requestsPerHour: 80,
      requestsPerDay: 800,
      delayBetweenRequests: 7500
    },
    successRate: 90,
    errorCount: 0
  }
  // ... (más fuentes se pueden agregar)
];

// ===========================================
// CLASE PRINCIPAL DE AUTOMATIZACIÓN
// ===========================================

export class IntelligentNewsAutomation {
  private sources: NewsSource[];
  private rules: AutomationRule[];
  private isRunning: boolean;
  private scrapedArticles: Map<string, ScrapedArticle>;
  private analysisCache: Map<string, NewsAnalysis>;
  private rateLimitTracker: Map<string, RateLimitTracker>;

  constructor() {
    this.sources = ARGENTINE_NEWS_SOURCES;
    this.rules = [];
    this.isRunning = false;
    this.scrapedArticles = new Map();
    this.analysisCache = new Map();
    this.rateLimitTracker = new Map();
  }

  // ===========================================
  // INICIALIZACIÓN DEL SISTEMA
  // ===========================================

  async initialize(): Promise<void> {
    console.log('🚀 Inicializando sistema de automatización de noticias...');
    
    // Cargar fuentes habilitadas
    this.sources = this.sources.filter(source => source.enabled);
    
    // Inicializar rate limiters
    for (const source of this.sources) {
      this.rateLimitTracker.set(source.id, new RateLimitTracker(source.rateLimit));
    }
    
    // Cargar reglas de automatización
    await this.loadAutomationRules();
    
    console.log(`✅ Sistema inicializado con ${this.sources.length} fuentes activas`);
  }

  // ===========================================
  // SCRAPING INTELIGENTE
  // ===========================================

  async scrapeAllSources(): Promise<ScrapedArticle[]> {
    console.log('🔍 Iniciando scraping de todas las fuentes...');
    
    const allArticles: ScrapedArticle[] = [];
    const promises = this.sources.map(source => this.scrapeSource(source));
    
    const results = await Promise.allSettled(promises);
    
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      } else {
        console.error('❌ Error en scraping:', result.reason);
      }
    }
    
    console.log(`✅ Scraping completado: ${allArticles.length} artículos encontrados`);
    return allArticles;
  }

  async scrapeSource(source: NewsSource): Promise<ScrapedArticle[]> {
    console.log(`📰 Scraping ${source.name}...`);
    
    try {
      // Verificar rate limit
      const rateLimiter = this.rateLimitTracker.get(source.id);
      if (rateLimiter && !rateLimiter.canMakeRequest()) {
        console.log(`⏳ Rate limit alcanzado para ${source.name}`);
        return [];
      }
      
      // Realizar request
      const response = await axios.get(source.url, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const articles: ScrapedArticle[] = [];
      
      // Extraer artículos
      $(source.selectors.articleList).each((index, element) => {
        try {
          const article = this.extractArticle($, element, source);
          if (article) {
            articles.push(article);
          }
        } catch (error) {
          console.error(`❌ Error extrayendo artículo ${index}:`, error);
        }
      });
      
      // Actualizar rate limiter
      if (rateLimiter) {
        rateLimiter.recordRequest();
      }
      
      // Actualizar estadísticas de la fuente
      source.lastScraped = new Date();
      source.successRate = Math.min(100, source.successRate + 1);
      
      console.log(`✅ ${source.name}: ${articles.length} artículos extraídos`);
      return articles;
      
    } catch (error) {
      console.error(`❌ Error scraping ${source.name}:`, error);
      
      // Actualizar estadísticas de error
      source.errorCount++;
      source.successRate = Math.max(0, source.successRate - 5);
      
      return [];
    }
  }

  private extractArticle($: cheerio.CheerioAPI, element: cheerio.Element, source: NewsSource): ScrapedArticle | null {
    try {
      const $element = $(element);
      
      // Extraer enlace del artículo
      const linkElement = $element.find(source.selectors.articleLink).first();
      const articleUrl = linkElement.attr('href');
      
      if (!articleUrl) return null;
      
      // Construir URL completa
      const fullUrl = articleUrl.startsWith('http') ? articleUrl : new URL(articleUrl, source.url).href;
      
      // Extraer datos básicos
      const title = this.extractText($element, source.selectors.title);
      const excerpt = this.extractText($element, source.selectors.excerpt);
      const imageUrl = this.extractImageUrl($element, source.selectors.image, source.url);
      const category = this.extractText($element, source.selectors.category);
      const tags = this.extractTags($element, source.selectors.tags);
      
      if (!title || title.length < 10) return null;
      
      // Generar hash único
      const hash = this.generateHash(title + fullUrl);
      
      // Verificar si ya existe
      if (this.scrapedArticles.has(hash)) {
        return null;
      }
      
      const article: ScrapedArticle = {
        id: hash,
        sourceId: source.id,
        title: title.trim(),
        content: '', // Se extraerá después
        excerpt: excerpt?.trim() || '',
        imageUrl: imageUrl || '',
        author: '',
        publishedAt: new Date(),
        category: category || source.category,
        tags: tags,
        url: fullUrl,
        language: source.language,
        country: source.country,
        priority: source.priority,
        qualityScore: 0,
        seoScore: 0,
        sentimentScore: 0,
        trendingScore: 0,
        hash,
        scrapedAt: new Date(),
        processed: false,
        published: false,
        errors: []
      };
      
      this.scrapedArticles.set(hash, article);
      return article;
      
    } catch (error) {
      console.error('❌ Error extrayendo artículo:', error);
      return null;
    }
  }

  private extractText($element: cheerio.Cheerio<cheerio.Element>, selector: string): string {
    const text = $element.find(selector).first().text().trim();
    return text || '';
  }

  private extractImageUrl($element: cheerio.Cheerio<cheerio.Element>, selector: string, baseUrl: string): string {
    const imgElement = $element.find(selector).first();
    const src = imgElement.attr('src') || imgElement.attr('data-src');
    
    if (!src) return '';
    
    return src.startsWith('http') ? src : new URL(src, baseUrl).href;
  }

  private extractTags($element: cheerio.Cheerio<cheerio.Element>, selector: string): string[] {
    const tags: string[] = [];
    $element.find(selector).each((_, element) => {
      const tag = $(element).text().trim();
      if (tag) tags.push(tag);
    });
    return tags;
  }

  private generateHash(text: string): string {
    return createHash('md5').update(text).digest('hex');
  }

  // ===========================================
  // ANÁLISIS INTELIGENTE DE CONTENIDO
  // ===========================================

  async analyzeArticle(article: ScrapedArticle): Promise<NewsAnalysis> {
    console.log(`🧠 Analizando artículo: ${article.title}`);
    
    // Verificar cache
    const cached = this.analysisCache.get(article.id);
    if (cached) {
      return cached;
    }
    
    try {
      // Análisis de sentimiento
      const sentiment = await this.analyzeSentiment(article.content || article.excerpt);
      
      // Extracción de temas
      const topics = await this.extractTopics(article.content || article.excerpt);
      
      // Extracción de keywords
      const keywords = await this.extractKeywords(article.content || article.excerpt);
      
      // Extracción de entidades
      const entities = await this.extractEntities(article.content || article.excerpt);
      
      // Generación de resumen
      const summary = await this.generateSummary(article.content || article.excerpt);
      
      // Traducción automática
      const translation = await this.translateContent(article, ['en', 'fr', 'pt']);
      
      // Optimización SEO
      const seoOptimization = await this.optimizeSEO(article);
      
      // Análisis de tendencias
      const trendingPotential = await this.analyzeTrendingPotential(article);
      const viralPotential = await this.analyzeViralPotential(article);
      
      // Puntuación de calidad
      const qualityScore = this.calculateQualityScore(article, sentiment, topics, keywords);
      
      // Recomendaciones
      const recommendations = this.generateRecommendations(article, sentiment, qualityScore);
      
      const analysis: NewsAnalysis = {
        articleId: article.id,
        sentiment: sentiment.sentiment,
        sentimentScore: sentiment.score,
        topics,
        keywords,
        entities,
        summary,
        translation,
        seoOptimization,
        trendingPotential,
        viralPotential,
        qualityScore,
        recommendations
      };
      
      // Guardar en cache
      this.analysisCache.set(article.id, analysis);
      
      return analysis;
      
    } catch (error) {
      console.error('❌ Error analizando artículo:', error);
      throw error;
    }
  }

  private async analyzeSentiment(text: string): Promise<{ sentiment: 'positive' | 'negative' | 'neutral'; score: number }> {
    // Simulación de análisis de sentimiento
    // En producción se integraría con servicios de IA
    const positiveWords = ['bueno', 'excelente', 'mejor', 'positivo', 'éxito', 'ganar', 'victoria'];
    const negativeWords = ['malo', 'terrible', 'peor', 'negativo', 'fracaso', 'perder', 'derrota'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    for (const word of words) {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    }
    
    const total = positiveCount + negativeCount;
    if (total === 0) {
      return { sentiment: 'neutral', score: 0 };
    }
    
    const score = (positiveCount - negativeCount) / total;
    const sentiment = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';
    
    return { sentiment, score };
  }

  private async extractTopics(text: string): Promise<string[]> {
    // Simulación de extracción de temas
    // En producción se usaría NLP avanzado
    const topics = [
      'política', 'economía', 'deportes', 'tecnología', 'salud', 'educación',
      'seguridad', 'medio ambiente', 'cultura', 'internacional', 'local'
    ];
    
    const foundTopics: string[] = [];
    const lowerText = text.toLowerCase();
    
    for (const topic of topics) {
      if (lowerText.includes(topic)) {
        foundTopics.push(topic);
      }
    }
    
    return foundTopics;
  }

  private async extractKeywords(text: string): Promise<string[]> {
    // Simulación de extracción de keywords
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = new Set(['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le']);
    
    const wordCount: Record<string, number> = {};
    
    for (const word of words) {
      if (word.length > 3 && !stopWords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }
    
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private async extractEntities(text: string): Promise<string[]> {
    // Simulación de extracción de entidades
    // En producción se usaría NER (Named Entity Recognition)
    const entities: string[] = [];
    
    // Buscar nombres propios (capitalizados)
    const words = text.split(/\s+/);
    for (const word of words) {
      if (word.length > 2 && word[0] === word[0].toUpperCase() && /[a-zA-Z]/.test(word[0])) {
        entities.push(word);
      }
    }
    
    return [...new Set(entities)].slice(0, 10);
  }

  private async generateSummary(text: string): Promise<string> {
    // Simulación de generación de resumen
    // En producción se usaría IA para generar resúmenes
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const firstSentence = sentences[0] || '';
    const secondSentence = sentences[1] || '';
    
    return `${firstSentence}. ${secondSentence}`.trim();
  }

  private async translateContent(article: ScrapedArticle, targetLanguages: string[]): Promise<Record<string, string>> {
    // Simulación de traducción
    // En producción se integraría con servicios de traducción
    const translations: Record<string, string> = {};
    
    for (const lang of targetLanguages) {
      translations[lang] = `[Translated to ${lang}] ${article.title}`;
    }
    
    return translations;
  }

  private async optimizeSEO(article: ScrapedArticle): Promise<Record<string, any>> {
    // Simulación de optimización SEO
    return {
      title: article.title,
      description: article.excerpt,
      keywords: article.tags,
      metaTags: {
        title: article.title,
        description: article.excerpt,
        keywords: article.tags.join(', ')
      }
    };
  }

  private async analyzeTrendingPotential(article: ScrapedArticle): Promise<number> {
    // Simulación de análisis de tendencias
    const factors = [
      article.priority,
      article.tags.length,
      article.title.length,
      article.excerpt.length
    ];
    
    return factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
  }

  private async analyzeViralPotential(article: ScrapedArticle): Promise<number> {
    // Simulación de análisis viral
    const viralKeywords = ['exclusivo', 'último momento', 'breaking', 'sorprendente', 'increíble'];
    const titleLower = article.title.toLowerCase();
    
    let viralScore = 0;
    for (const keyword of viralKeywords) {
      if (titleLower.includes(keyword)) {
        viralScore += 20;
      }
    }
    
    return Math.min(viralScore, 100);
  }

  private calculateQualityScore(
    article: ScrapedArticle,
    sentiment: { sentiment: string; score: number },
    topics: string[],
    keywords: string[]
  ): number {
    let score = 0;
    
    // Longitud del contenido
    if (article.excerpt.length > 100) score += 20;
    if (article.title.length > 20) score += 20;
    
    // Presencia de elementos
    if (article.imageUrl) score += 15;
    if (article.tags.length > 0) score += 15;
    if (topics.length > 0) score += 15;
    if (keywords.length > 0) score += 15;
    
    return Math.min(score, 100);
  }

  private generateRecommendations(
    article: ScrapedArticle,
    sentiment: { sentiment: string; score: number },
    qualityScore: number
  ): string[] {
    const recommendations: string[] = [];
    
    if (qualityScore < 70) {
      recommendations.push('Mejorar la calidad del contenido');
    }
    
    if (article.tags.length === 0) {
      recommendations.push('Agregar etiquetas relevantes');
    }
    
    if (!article.imageUrl) {
      recommendations.push('Agregar imagen destacada');
    }
    
    if (article.excerpt.length < 50) {
      recommendations.push('Expandir el resumen del artículo');
    }
    
    return recommendations;
  }

  // ===========================================
  // REGLAS DE AUTOMATIZACIÓN
  // ===========================================

  async loadAutomationRules(): Promise<void> {
    // Reglas predefinidas
    this.rules = [
      {
        id: 'auto-publish-high-priority',
        name: 'Publicación automática de alta prioridad',
        description: 'Publica automáticamente artículos de alta prioridad',
        conditions: [
          { field: 'priority', operator: 'greaterThan', value: 8, logic: 'AND' },
          { field: 'qualityScore', operator: 'greaterThan', value: 80, logic: 'AND' }
        ],
        actions: [
          { type: 'publish', parameters: {}, delay: 0 }
        ],
        enabled: true,
        priority: 1,
        createdAt: new Date(),
        triggerCount: 0
      },
      {
        id: 'auto-translate-important',
        name: 'Traducción automática de artículos importantes',
        description: 'Traduce automáticamente artículos importantes',
        conditions: [
          { field: 'priority', operator: 'greaterThan', value: 7, logic: 'AND' },
          { field: 'trendingScore', operator: 'greaterThan', value: 70, logic: 'AND' }
        ],
        actions: [
          { type: 'translate', parameters: { languages: ['en', 'fr', 'pt'] }, delay: 300 }
        ],
        enabled: true,
        priority: 2,
        createdAt: new Date(),
        triggerCount: 0
      },
      {
        id: 'auto-categorize',
        name: 'Categorización automática',
        description: 'Categoriza automáticamente artículos según su contenido',
        conditions: [
          { field: 'category', operator: 'equals', value: 'general', logic: 'AND' }
        ],
        actions: [
          { type: 'categorize', parameters: { autoDetect: true }, delay: 0 }
        ],
        enabled: true,
        priority: 3,
        createdAt: new Date(),
        triggerCount: 0
      }
    ];
    
    console.log(`✅ ${this.rules.length} reglas de automatización cargadas`);
  }

  async applyAutomationRules(article: ScrapedArticle, analysis: NewsAnalysis): Promise<void> {
    console.log(`🤖 Aplicando reglas de automatización para: ${article.title}`);
    
    for (const rule of this.rules) {
      if (!rule.enabled) continue;
      
      try {
        const shouldApply = this.evaluateRuleConditions(rule, article, analysis);
        
        if (shouldApply) {
          console.log(`✅ Aplicando regla: ${rule.name}`);
          
          for (const action of rule.actions) {
            await this.executeAction(action, article, analysis);
          }
          
          rule.lastTriggered = new Date();
          rule.triggerCount++;
        }
      } catch (error) {
        console.error(`❌ Error aplicando regla ${rule.name}:`, error);
      }
    }
  }

  private evaluateRuleConditions(rule: AutomationRule, article: ScrapedArticle, analysis: NewsAnalysis): boolean {
    let result = true;
    let logicOperator = 'AND';
    
    for (const condition of rule.conditions) {
      const fieldValue = this.getFieldValue(condition.field, article, analysis);
      const conditionResult = this.evaluateCondition(condition, fieldValue);
      
      if (logicOperator === 'AND') {
        result = result && conditionResult;
      } else {
        result = result || conditionResult;
      }
      
      logicOperator = condition.logic;
    }
    
    return result;
  }

  private getFieldValue(field: string, article: ScrapedArticle, analysis: NewsAnalysis): any {
    const fieldMap: Record<string, any> = {
      'priority': article.priority,
      'qualityScore': analysis.qualityScore,
      'trendingScore': analysis.trendingPotential,
      'viralScore': analysis.viralPotential,
      'sentiment': analysis.sentiment,
      'category': article.category,
      'language': article.language,
      'country': article.country
    };
    
    return fieldMap[field] || null;
  }

  private evaluateCondition(condition: AutomationCondition, value: any): boolean {
    if (value === null || value === undefined) return false;
    
    switch (condition.operator) {
      case 'equals':
        return value === condition.value;
      case 'contains':
        return String(value).toLowerCase().includes(String(condition.value).toLowerCase());
      case 'startsWith':
        return String(value).toLowerCase().startsWith(String(condition.value).toLowerCase());
      case 'endsWith':
        return String(value).toLowerCase().endsWith(String(condition.value).toLowerCase());
      case 'greaterThan':
        return Number(value) > Number(condition.value);
      case 'lessThan':
        return Number(value) < Number(condition.value);
      case 'regex':
        return new RegExp(condition.value).test(String(value));
      default:
        return false;
    }
  }

  private async executeAction(action: AutomationAction, article: ScrapedArticle, analysis: NewsAnalysis): Promise<void> {
    console.log(`⚡ Ejecutando acción: ${action.type}`);
    
    switch (action.type) {
      case 'publish':
        await this.publishArticle(article);
        break;
      case 'schedule':
        await this.scheduleArticle(article, action.parameters);
        break;
      case 'translate':
        await this.translateArticle(article, action.parameters);
        break;
      case 'categorize':
        await this.categorizeArticle(article, action.parameters);
        break;
      case 'tag':
        await this.tagArticle(article, action.parameters);
        break;
      case 'seo_optimize':
        await this.optimizeArticleSEO(article, action.parameters);
        break;
      case 'notify':
        await this.notifyArticle(article, action.parameters);
        break;
      case 'archive':
        await this.archiveArticle(article);
        break;
    }
  }

  // ===========================================
  // ACCIONES DE AUTOMATIZACIÓN
  // ===========================================

  private async publishArticle(article: ScrapedArticle): Promise<void> {
    console.log(`📢 Publicando artículo: ${article.title}`);
    // Implementar lógica de publicación
    article.published = true;
  }

  private async scheduleArticle(article: ScrapedArticle, parameters: any): Promise<void> {
    console.log(`⏰ Programando artículo: ${article.title}`);
    // Implementar lógica de programación
  }

  private async translateArticle(article: ScrapedArticle, parameters: any): Promise<void> {
    console.log(`🌐 Traduciendo artículo: ${article.title}`);
    // Implementar lógica de traducción
  }

  private async categorizeArticle(article: ScrapedArticle, parameters: any): Promise<void> {
    console.log(`📂 Categorizando artículo: ${article.title}`);
    // Implementar lógica de categorización
  }

  private async tagArticle(article: ScrapedArticle, parameters: any): Promise<void> {
    console.log(`🏷️ Etiquetando artículo: ${article.title}`);
    // Implementar lógica de etiquetado
  }

  private async optimizeArticleSEO(article: ScrapedArticle, parameters: any): Promise<void> {
    console.log(`🔍 Optimizando SEO del artículo: ${article.title}`);
    // Implementar lógica de optimización SEO
  }

  private async notifyArticle(article: ScrapedArticle, parameters: any): Promise<void> {
    console.log(`🔔 Notificando artículo: ${article.title}`);
    // Implementar lógica de notificación
  }

  private async archiveArticle(article: ScrapedArticle): Promise<void> {
    console.log(`📦 Archivando artículo: ${article.title}`);
    // Implementar lógica de archivado
  }

  // ===========================================
  // CONTROL DEL SISTEMA
  // ===========================================

  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ El sistema ya está ejecutándose');
      return;
    }
    
    console.log('🚀 Iniciando sistema de automatización de noticias...');
    this.isRunning = true;
    
    try {
      await this.initialize();
      
      // Ejecutar scraping inicial
      const articles = await this.scrapeAllSources();
      
      // Procesar artículos
      for (const article of articles) {
        try {
          const analysis = await this.analyzeArticle(article);
          await this.applyAutomationRules(article, analysis);
        } catch (error) {
          console.error(`❌ Error procesando artículo ${article.title}:`, error);
        }
      }
      
      console.log('✅ Sistema de automatización iniciado correctamente');
      
    } catch (error) {
      console.error('❌ Error iniciando sistema:', error);
      this.isRunning = false;
      throw error;
    }
  }

  async stop(): Promise<void> {
    console.log('🛑 Deteniendo sistema de automatización...');
    this.isRunning = false;
    console.log('✅ Sistema detenido');
  }

  getStatus(): {
    isRunning: boolean;
    sourcesCount: number;
    articlesCount: number;
    rulesCount: number;
    cacheSize: number;
  } {
    return {
      isRunning: this.isRunning,
      sourcesCount: this.sources.length,
      articlesCount: this.scrapedArticles.size,
      rulesCount: this.rules.length,
      cacheSize: this.analysisCache.size
    };
  }
}

// ===========================================
// CLASE AUXILIAR PARA RATE LIMITING
// ===========================================

class RateLimitTracker {
  private requests: Date[];
  private rateLimit: RateLimit;

  constructor(rateLimit: RateLimit) {
    this.requests = [];
    this.rateLimit = rateLimit;
  }

  canMakeRequest(): boolean {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const oneDayAgo = new Date(now.getTime() - 86400000);

    // Limpiar requests antiguos
    this.requests = this.requests.filter(date => date > oneDayAgo);

    // Verificar límites
    const requestsLastMinute = this.requests.filter(date => date > oneMinuteAgo).length;
    const requestsLastHour = this.requests.filter(date => date > oneHourAgo).length;
    const requestsLastDay = this.requests.length;

    return (
      requestsLastMinute < this.rateLimit.requestsPerMinute &&
      requestsLastHour < this.rateLimit.requestsPerHour &&
      requestsLastDay < this.rateLimit.requestsPerDay
    );
  }

  recordRequest(): void {
    this.requests.push(new Date());
  }

  getDelayUntilNextRequest(): number {
    if (this.canMakeRequest()) return 0;
    
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const requestsLastMinute = this.requests.filter(date => date > oneMinuteAgo).length;
    
    if (requestsLastMinute >= this.rateLimit.requestsPerMinute) {
      const oldestRequest = this.requests.find(date => date > oneMinuteAgo);
      if (oldestRequest) {
        const delay = 60000 - (now.getTime() - oldestRequest.getTime());
        return Math.max(0, delay);
      }
    }
    
    return this.rateLimit.delayBetweenRequests;
  }
}
