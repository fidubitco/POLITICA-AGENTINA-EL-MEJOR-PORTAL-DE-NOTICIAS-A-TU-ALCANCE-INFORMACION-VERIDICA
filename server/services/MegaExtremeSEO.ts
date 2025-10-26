// ===========================================
// MEGA EXTREME SEO OPTIMIZER
// Sistema de SEO de clase mundial para máximo rendimiento
// ===========================================

import { z } from 'zod';

// ===========================================
// INTERFACES Y TIPOS
// ===========================================

export interface SEOAnalysis {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  h2: string[];
  h3: string[];
  images: SEOImage[];
  videos: SEOVideo[];
  links: SEOLink[];
  structuredData: StructuredData;
  metaTags: MetaTags;
  performance: PerformanceMetrics;
  accessibility: AccessibilityMetrics;
  mobile: MobileMetrics;
  social: SocialMetrics;
  technical: TechnicalMetrics;
  content: ContentMetrics;
  language: LanguageMetrics;
  score: number;
  suggestions: SEOSuggestion[];
}

export interface SEOImage {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif';
  size: number;
  optimized: boolean;
  seoScore: number;
}

export interface SEOVideo {
  src: string;
  title: string;
  description?: string;
  duration?: number;
  thumbnail?: string;
  format: 'mp4' | 'webm' | 'ogg' | 'youtube' | 'vimeo';
  seoScore: number;
}

export interface SEOLink {
  href: string;
  text: string;
  title?: string;
  rel?: string;
  target?: '_blank' | '_self';
  internal: boolean;
  seoScore: number;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  image?: string;
  author?: {
    '@type': string;
    name: string;
  };
  publisher?: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: {
    '@type': string;
    '@id': string;
  };
  articleSection?: string;
  keywords?: string[];
  wordCount?: number;
  inLanguage?: string;
  isPartOf?: {
    '@type': string;
    name: string;
    url: string;
  };
}

export interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  robots: string;
  viewport: string;
  charset: string;
  language: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  ogLocale: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  themeColor: string;
  msapplicationTileColor: string;
  appleMobileWebAppTitle: string;
  appleMobileWebAppCapable: string;
  appleMobileWebAppStatusBarStyle: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  totalBlockingTime: number;
  speedIndex: number;
  seoScore: number;
}

export interface AccessibilityMetrics {
  altTexts: number;
  missingAltTexts: number;
  headings: number;
  headingStructure: boolean;
  colorContrast: number;
  keyboardNavigation: boolean;
  screenReader: boolean;
  seoScore: number;
}

export interface MobileMetrics {
  responsive: boolean;
  viewport: boolean;
  touchFriendly: boolean;
  mobileFirst: boolean;
  seoScore: number;
}

export interface SocialMetrics {
  facebookShares: number;
  twitterShares: number;
  linkedinShares: number;
  whatsappShares: number;
  telegramShares: number;
  totalShares: number;
  engagement: number;
  seoScore: number;
}

export interface TechnicalMetrics {
  https: boolean;
  ssl: boolean;
  compression: boolean;
  caching: boolean;
  cdn: boolean;
  minification: boolean;
  seoScore: number;
}

export interface ContentMetrics {
  wordCount: number;
  readingTime: number;
  readabilityScore: number;
  keywordDensity: number;
  keywordDistribution: number;
  contentLength: number;
  paragraphCount: number;
  sentenceCount: number;
  seoScore: number;
}

export interface LanguageMetrics {
  language: string;
  hreflang: string[];
  alternateLanguages: string[];
  translationQuality: number;
  seoScore: number;
}

export interface SEOSuggestion {
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'title' | 'description' | 'keywords' | 'images' | 'videos' | 'links' | 'structured' | 'performance' | 'accessibility' | 'mobile' | 'social' | 'technical' | 'content' | 'language';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  priority: number;
  action: string;
  code?: string;
  resources?: string[];
}

// ===========================================
// CLASE PRINCIPAL MEGA EXTREME SEO
// ===========================================

export class MegaExtremeSEO {
  private languages: string[];
  private defaultLanguage: string;
  private baseUrl: string;
  private siteName: string;
  private siteDescription: string;
  private author: string;
  private publisher: string;
  private logo: string;
  private socialMedia: Record<string, string>;

  constructor(config: {
    languages: string[];
    defaultLanguage: string;
    baseUrl: string;
    siteName: string;
    siteDescription: string;
    author: string;
    publisher: string;
    logo: string;
    socialMedia: Record<string, string>;
  }) {
    this.languages = config.languages;
    this.defaultLanguage = config.defaultLanguage;
    this.baseUrl = config.baseUrl;
    this.siteName = config.siteName;
    this.siteDescription = config.siteDescription;
    this.author = config.author;
    this.publisher = config.publisher;
    this.logo = config.logo;
    this.socialMedia = config.socialMedia;
  }

  // ===========================================
  // ANÁLISIS COMPLETO DE SEO
  // ===========================================

  async analyzeSEO(content: {
    title: string;
    description: string;
    content: string;
    images: Array<{ src: string; alt?: string; title?: string; width?: number; height?: number }>;
    videos: Array<{ src: string; title?: string; description?: string; duration?: number }>;
    links: Array<{ href: string; text: string; title?: string; rel?: string; target?: string }>;
    url: string;
    language: string;
    category: string;
    tags: string[];
    author: string;
    publishedAt: Date;
    modifiedAt: Date;
  }): Promise<SEOAnalysis> {
    console.log('🔍 Iniciando análisis MEGA EXTREME SEO...');

    // Análisis de elementos básicos
    const titleAnalysis = this.analyzeTitle(content.title);
    const descriptionAnalysis = this.analyzeDescription(content.description);
    const keywordsAnalysis = this.analyzeKeywords(content.title, content.description, content.content, content.tags);
    
    // Análisis de encabezados
    const headingsAnalysis = this.analyzeHeadings(content.content);
    
    // Análisis de imágenes
    const imagesAnalysis = await this.analyzeImages(content.images);
    
    // Análisis de videos
    const videosAnalysis = this.analyzeVideos(content.videos);
    
    // Análisis de enlaces
    const linksAnalysis = this.analyzeLinks(content.links, content.url);
    
    // Datos estructurados
    const structuredData = this.generateStructuredData(content);
    
    // Meta tags
    const metaTags = this.generateMetaTags(content);
    
    // Métricas de rendimiento
    const performance = await this.analyzePerformance(content.url);
    
    // Métricas de accesibilidad
    const accessibility = this.analyzeAccessibility(content);
    
    // Métricas móviles
    const mobile = this.analyzeMobile(content);
    
    // Métricas sociales
    const social = await this.analyzeSocial(content.url);
    
    // Métricas técnicas
    const technical = await this.analyzeTechnical(content.url);
    
    // Métricas de contenido
    const contentMetrics = this.analyzeContent(content);
    
    // Métricas de idioma
    const language = this.analyzeLanguage(content, content.language);
    
    // Calcular puntuación general
    const score = this.calculateOverallScore({
      title: titleAnalysis,
      description: descriptionAnalysis,
      keywords: keywordsAnalysis,
      headings: headingsAnalysis,
      images: imagesAnalysis,
      videos: videosAnalysis,
      links: linksAnalysis,
      performance,
      accessibility,
      mobile,
      social,
      technical,
      content: contentMetrics,
      language
    });
    
    // Generar sugerencias
    const suggestions = this.generateSuggestions({
      title: titleAnalysis,
      description: descriptionAnalysis,
      keywords: keywordsAnalysis,
      headings: headingsAnalysis,
      images: imagesAnalysis,
      videos: videosAnalysis,
      links: linksAnalysis,
      performance,
      accessibility,
      mobile,
      social,
      technical,
      content: contentMetrics,
      language
    });

    return {
      title: content.title,
      description: content.description,
      keywords: keywordsAnalysis.keywords,
      h1: headingsAnalysis.h1,
      h2: headingsAnalysis.h2,
      h3: headingsAnalysis.h3,
      images: imagesAnalysis,
      videos: videosAnalysis,
      links: linksAnalysis,
      structuredData,
      metaTags,
      performance,
      accessibility,
      mobile,
      social,
      technical,
      content: contentMetrics,
      language,
      score,
      suggestions
    };
  }

  // ===========================================
  // ANÁLISIS DE TÍTULO
  // ===========================================

  private analyzeTitle(title: string): {
    length: number;
    optimal: boolean;
    keywords: string[];
    seoScore: number;
    suggestions: string[];
  } {
    const length = title.length;
    const optimal = length >= 30 && length <= 60;
    const keywords = this.extractKeywords(title);
    const seoScore = this.calculateTitleScore(title, length, optimal, keywords);
    const suggestions = this.generateTitleSuggestions(title, length, optimal, keywords);

    return {
      length,
      optimal,
      keywords,
      seoScore,
      suggestions
    };
  }

  private calculateTitleScore(title: string, length: number, optimal: boolean, keywords: string[]): number {
    let score = 0;
    
    // Longitud óptima (30-60 caracteres)
    if (optimal) score += 30;
    else if (length >= 20 && length <= 70) score += 20;
    else if (length >= 10 && length <= 80) score += 10;
    
    // Presencia de keywords
    if (keywords.length > 0) score += 25;
    
    // Título descriptivo
    if (title.length > 20) score += 20;
    
    // Caracteres especiales
    if (!/[<>"']/.test(title)) score += 15;
    
    // Capitalización
    if (title === title.charAt(0).toUpperCase() + title.slice(1)) score += 10;
    
    return Math.min(score, 100);
  }

  private generateTitleSuggestions(title: string, length: number, optimal: boolean, keywords: string[]): string[] {
    const suggestions: string[] = [];
    
    if (!optimal) {
      if (length < 30) {
        suggestions.push('El título es muy corto. Agrega más palabras clave relevantes.');
      } else if (length > 60) {
        suggestions.push('El título es muy largo. Acórtalo para mejor SEO.');
      }
    }
    
    if (keywords.length === 0) {
      suggestions.push('Incluye palabras clave relevantes en el título.');
    }
    
    if (title.length < 20) {
      suggestions.push('Haz el título más descriptivo y atractivo.');
    }
    
    return suggestions;
  }

  // ===========================================
  // ANÁLISIS DE DESCRIPCIÓN
  // ===========================================

  private analyzeDescription(description: string): {
    length: number;
    optimal: boolean;
    keywords: string[];
    seoScore: number;
    suggestions: string[];
  } {
    const length = description.length;
    const optimal = length >= 120 && length <= 160;
    const keywords = this.extractKeywords(description);
    const seoScore = this.calculateDescriptionScore(description, length, optimal, keywords);
    const suggestions = this.generateDescriptionSuggestions(description, length, optimal, keywords);

    return {
      length,
      optimal,
      keywords,
      seoScore,
      suggestions
    };
  }

  private calculateDescriptionScore(description: string, length: number, optimal: boolean, keywords: string[]): number {
    let score = 0;
    
    // Longitud óptima (120-160 caracteres)
    if (optimal) score += 40;
    else if (length >= 100 && length <= 180) score += 30;
    else if (length >= 80 && length <= 200) score += 20;
    
    // Presencia de keywords
    if (keywords.length > 0) score += 25;
    
    // Descripción atractiva
    if (description.includes('!') || description.includes('?')) score += 15;
    
    // Llamada a la acción
    if (description.toLowerCase().includes('descubre') || 
        description.toLowerCase().includes('conoce') ||
        description.toLowerCase().includes('aprende')) score += 20;
    
    return Math.min(score, 100);
  }

  private generateDescriptionSuggestions(description: string, length: number, optimal: boolean, keywords: string[]): string[] {
    const suggestions: string[] = [];
    
    if (!optimal) {
      if (length < 120) {
        suggestions.push('La descripción es muy corta. Agrega más detalles relevantes.');
      } else if (length > 160) {
        suggestions.push('La descripción es muy larga. Acórtala para mejor SEO.');
      }
    }
    
    if (keywords.length === 0) {
      suggestions.push('Incluye palabras clave relevantes en la descripción.');
    }
    
    if (!description.includes('!') && !description.includes('?')) {
      suggestions.push('Haz la descripción más atractiva con signos de exclamación o interrogación.');
    }
    
    return suggestions;
  }

  // ===========================================
  // ANÁLISIS DE KEYWORDS
  // ===========================================

  private analyzeKeywords(title: string, description: string, content: string, tags: string[]): {
    keywords: string[];
    density: number;
    distribution: number;
    seoScore: number;
    suggestions: string[];
  } {
    const allText = `${title} ${description} ${content}`.toLowerCase();
    const keywords = this.extractKeywords(allText);
    const density = this.calculateKeywordDensity(keywords, allText);
    const distribution = this.calculateKeywordDistribution(keywords, content);
    const seoScore = this.calculateKeywordsScore(keywords, density, distribution, tags);
    const suggestions = this.generateKeywordsSuggestions(keywords, density, distribution, tags);

    return {
      keywords,
      density,
      distribution,
      seoScore,
      suggestions
    };
  }

  private extractKeywords(text: string): string[] {
    // Limpiar texto
    const cleanText = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Palabras comunes a excluir
    const stopWords = new Set([
      'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'las', 'una', 'uno', 'pero', 'sus', 'le', 'ha', 'me', 'si', 'sin', 'sobre', 'este', 'esta', 'estos', 'estas', 'sido', 'son', 'también', 'tiene', 'muy', 'más', 'hasta', 'desde', 'entre', 'durante', 'mediante', 'según', 'hacia', 'contra', 'bajo', 'sobre', 'ante', 'tras', 'durante', 'mediante', 'según', 'hacia', 'contra', 'bajo', 'sobre', 'ante', 'tras'
    ]);
    
    // Extraer palabras
    const words = cleanText.split(' ').filter(word => 
      word.length > 3 && 
      !stopWords.has(word) && 
      !/^\d+$/.test(word)
    );
    
    // Contar frecuencia
    const frequency: Record<string, number> = {};
    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
    
    // Ordenar por frecuencia y tomar las top 20
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);
  }

  private calculateKeywordDensity(keywords: string[], text: string): number {
    if (keywords.length === 0) return 0;
    
    const totalWords = text.split(' ').length;
    const keywordCount = keywords.reduce((sum, keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = text.match(regex);
      return sum + (matches ? matches.length : 0);
    }, 0);
    
    return (keywordCount / totalWords) * 100;
  }

  private calculateKeywordDistribution(keywords: string[], content: string): number {
    if (keywords.length === 0) return 0;
    
    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
    let paragraphsWithKeywords = 0;
    
    for (const paragraph of paragraphs) {
      const hasKeyword = keywords.some(keyword => 
        paragraph.toLowerCase().includes(keyword.toLowerCase())
      );
      if (hasKeyword) paragraphsWithKeywords++;
    }
    
    return (paragraphsWithKeywords / paragraphs.length) * 100;
  }

  private calculateKeywordsScore(keywords: string[], density: number, distribution: number, tags: string[]): number {
    let score = 0;
    
    // Cantidad de keywords
    if (keywords.length >= 10) score += 25;
    else if (keywords.length >= 5) score += 20;
    else if (keywords.length >= 3) score += 15;
    
    // Densidad óptima (1-3%)
    if (density >= 1 && density <= 3) score += 25;
    else if (density >= 0.5 && density <= 5) score += 20;
    else if (density >= 0.1 && density <= 7) score += 15;
    
    // Distribución
    if (distribution >= 70) score += 25;
    else if (distribution >= 50) score += 20;
    else if (distribution >= 30) score += 15;
    
    // Coincidencia con tags
    const tagMatches = keywords.filter(keyword => 
      tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    ).length;
    if (tagMatches > 0) score += 25;
    
    return Math.min(score, 100);
  }

  private generateKeywordsSuggestions(keywords: string[], density: number, distribution: number, tags: string[]): string[] {
    const suggestions: string[] = [];
    
    if (keywords.length < 5) {
      suggestions.push('Agrega más palabras clave relevantes al contenido.');
    }
    
    if (density < 1) {
      suggestions.push('Aumenta la densidad de palabras clave en el contenido.');
    } else if (density > 3) {
      suggestions.push('Reduce la densidad de palabras clave para evitar keyword stuffing.');
    }
    
    if (distribution < 50) {
      suggestions.push('Distribuye mejor las palabras clave a lo largo del contenido.');
    }
    
    const tagMatches = keywords.filter(keyword => 
      tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    ).length;
    
    if (tagMatches === 0) {
      suggestions.push('Incluye palabras clave que coincidan con las etiquetas.');
    }
    
    return suggestions;
  }

  // ===========================================
  // ANÁLISIS DE ENCABEZADOS
  // ===========================================

  private analyzeHeadings(content: string): {
    h1: string;
    h2: string[];
    h3: string[];
    structure: boolean;
    seoScore: number;
    suggestions: string[];
  } {
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/gi;
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;
    
    const h1 = this.extractHeading(h1Regex, content);
    const h2 = this.extractHeadings(h2Regex, content);
    const h3 = this.extractHeadings(h3Regex, content);
    
    const structure = this.analyzeHeadingStructure(h1, h2, h3);
    const seoScore = this.calculateHeadingsScore(h1, h2, h3, structure);
    const suggestions = this.generateHeadingsSuggestions(h1, h2, h3, structure);

    return {
      h1,
      h2,
      h3,
      structure,
      seoScore,
      suggestions
    };
  }

  private extractHeading(regex: RegExp, content: string): string {
    const match = regex.exec(content);
    return match ? this.cleanHtml(match[1]) : '';
  }

  private extractHeadings(regex: RegExp, content: string): string[] {
    const headings: string[] = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      headings.push(this.cleanHtml(match[1]));
    }
    
    return headings;
  }

  private cleanHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  private analyzeHeadingStructure(h1: string, h2: string[], h3: string[]): boolean {
    // Debe tener al menos un H1
    if (!h1) return false;
    
    // H1 debe ser único
    if (h1.split(' ').length > 0) return true;
    
    // Estructura jerárquica
    return h2.length > 0 || h3.length > 0;
  }

  private calculateHeadingsScore(h1: string, h2: string[], h3: string[], structure: boolean): number {
    let score = 0;
    
    // H1 presente
    if (h1) score += 30;
    
    // H1 único
    if (h1 && h1.length > 0) score += 20;
    
    // Estructura jerárquica
    if (structure) score += 25;
    
    // Cantidad de encabezados
    const totalHeadings = h2.length + h3.length;
    if (totalHeadings >= 3) score += 15;
    else if (totalHeadings >= 1) score += 10;
    
    // Longitud de encabezados
    if (h1 && h1.length >= 10 && h1.length <= 60) score += 10;
    
    return Math.min(score, 100);
  }

  private generateHeadingsSuggestions(h1: string, h2: string[], h3: string[], structure: boolean): string[] {
    const suggestions: string[] = [];
    
    if (!h1) {
      suggestions.push('Agrega un encabezado H1 al contenido.');
    }
    
    if (!structure) {
      suggestions.push('Mejora la estructura jerárquica de encabezados.');
    }
    
    if (h2.length === 0 && h3.length === 0) {
      suggestions.push('Agrega encabezados H2 y H3 para mejor estructura.');
    }
    
    if (h1 && h1.length < 10) {
      suggestions.push('Haz el encabezado H1 más descriptivo.');
    }
    
    return suggestions;
  }

  // ===========================================
  // ANÁLISIS DE IMÁGENES
  // ===========================================

  private async analyzeImages(images: Array<{ src: string; alt?: string; title?: string; width?: number; height?: number }>): Promise<SEOImage[]> {
    const analyzedImages: SEOImage[] = [];
    
    for (const image of images) {
      const seoImage: SEOImage = {
        src: image.src,
        alt: image.alt || '',
        title: image.title,
        width: image.width,
        height: image.height,
        loading: 'lazy',
        format: this.detectImageFormat(image.src),
        size: 0, // Se calcularía en producción
        optimized: this.isImageOptimized(image.src),
        seoScore: this.calculateImageSEOScore(image)
      };
      
      analyzedImages.push(seoImage);
    }
    
    return analyzedImages;
  }

  private detectImageFormat(src: string): 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif' {
    const extension = src.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'jpeg';
      case 'png':
        return 'png';
      case 'webp':
        return 'webp';
      case 'avif':
        return 'avif';
      default:
        return 'jpeg';
    }
  }

  private isImageOptimized(src: string): boolean {
    // Verificar si la imagen está optimizada
    return src.includes('webp') || src.includes('avif') || src.includes('optimized');
  }

  private calculateImageSEOScore(image: { src: string; alt?: string; title?: string; width?: number; height?: number }): number {
    let score = 0;
    
    // Alt text presente
    if (image.alt && image.alt.length > 0) score += 40;
    
    // Alt text descriptivo
    if (image.alt && image.alt.length >= 5) score += 20;
    
    // Dimensiones presentes
    if (image.width && image.height) score += 20;
    
    // Formato optimizado
    if (this.isImageOptimized(image.src)) score += 20;
    
    return Math.min(score, 100);
  }

  // ===========================================
  // ANÁLISIS DE VIDEOS
  // ===========================================

  private analyzeVideos(videos: Array<{ src: string; title?: string; description?: string; duration?: number }>): SEOVideo[] {
    return videos.map(video => ({
      src: video.src,
      title: video.title || '',
      description: video.description,
      duration: video.duration,
      thumbnail: this.extractVideoThumbnail(video.src),
      format: this.detectVideoFormat(video.src),
      seoScore: this.calculateVideoSEOScore(video)
    }));
  }

  private extractVideoThumbnail(src: string): string | undefined {
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const videoId = this.extractYouTubeVideoId(src);
      return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined;
    }
    return undefined;
  }

  private extractYouTubeVideoId(url: string): string | undefined {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : undefined;
  }

  private detectVideoFormat(src: string): 'mp4' | 'webm' | 'ogg' | 'youtube' | 'vimeo' {
    if (src.includes('youtube.com') || src.includes('youtu.be')) return 'youtube';
    if (src.includes('vimeo.com')) return 'vimeo';
    if (src.includes('.mp4')) return 'mp4';
    if (src.includes('.webm')) return 'webm';
    if (src.includes('.ogg')) return 'ogg';
    return 'mp4';
  }

  private calculateVideoSEOScore(video: { src: string; title?: string; description?: string; duration?: number }): number {
    let score = 0;
    
    // Título presente
    if (video.title && video.title.length > 0) score += 30;
    
    // Descripción presente
    if (video.description && video.description.length > 0) score += 25;
    
    // Duración presente
    if (video.duration && video.duration > 0) score += 20;
    
    // Formato optimizado
    if (this.detectVideoFormat(video.src) === 'mp4') score += 25;
    
    return Math.min(score, 100);
  }

  // ===========================================
  // ANÁLISIS DE ENLACES
  // ===========================================

  private analyzeLinks(links: Array<{ href: string; text: string; title?: string; rel?: string; target?: string }>, baseUrl: string): SEOLink[] {
    return links.map(link => ({
      href: link.href,
      text: link.text,
      title: link.title,
      rel: link.rel,
      target: link.target as '_blank' | '_self' | undefined,
      internal: this.isInternalLink(link.href, baseUrl),
      seoScore: this.calculateLinkSEOScore(link)
    }));
  }

  private isInternalLink(href: string, baseUrl: string): boolean {
    try {
      const linkUrl = new URL(href, baseUrl);
      const baseUrlObj = new URL(baseUrl);
      return linkUrl.hostname === baseUrlObj.hostname;
    } catch {
      return false;
    }
  }

  private calculateLinkSEOScore(link: { href: string; text: string; title?: string; rel?: string; target?: string }): number {
    let score = 0;
    
    // Texto descriptivo
    if (link.text && link.text.length >= 3) score += 30;
    
    // Título presente
    if (link.title && link.title.length > 0) score += 20;
    
    // Enlace externo con target="_blank"
    if (link.target === '_blank') score += 20;
    
    // Rel="nofollow" para enlaces externos
    if (link.rel === 'nofollow') score += 15;
    
    // Longitud del texto
    if (link.text && link.text.length >= 5 && link.text.length <= 100) score += 15;
    
    return Math.min(score, 100);
  }

  // ===========================================
  // GENERACIÓN DE DATOS ESTRUCTURADOS
  // ===========================================

  private generateStructuredData(content: {
    title: string;
    description: string;
    content: string;
    url: string;
    language: string;
    category: string;
    tags: string[];
    author: string;
    publishedAt: Date;
    modifiedAt: Date;
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: content.title,
      description: content.description,
      url: content.url,
      image: this.extractFirstImage(content.content),
      author: {
        '@type': 'Person',
        name: content.author
      },
      publisher: {
        '@type': 'Organization',
        name: this.publisher,
        logo: {
          '@type': 'ImageObject',
          url: this.logo
        }
      },
      datePublished: content.publishedAt.toISOString(),
      dateModified: content.modifiedAt.toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': content.url
      },
      articleSection: content.category,
      keywords: content.tags,
      wordCount: this.countWords(content.content),
      inLanguage: content.language,
      isPartOf: {
        '@type': 'WebSite',
        name: this.siteName,
        url: this.baseUrl
      }
    };
  }

  private extractFirstImage(content: string): string | undefined {
    const imgRegex = /<img[^>]+src="([^"]+)"/i;
    const match = content.match(imgRegex);
    return match ? match[1] : undefined;
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  // ===========================================
  // GENERACIÓN DE META TAGS
  // ===========================================

  private generateMetaTags(content: {
    title: string;
    description: string;
    content: string;
    url: string;
    language: string;
    category: string;
    tags: string[];
    author: string;
    publishedAt: Date;
    modifiedAt: Date;
  }): MetaTags {
    return {
      title: content.title,
      description: content.description,
      keywords: content.tags,
      author: content.author,
      robots: 'index, follow',
      viewport: 'width=device-width, initial-scale=1.0',
      charset: 'UTF-8',
      language: content.language,
      canonical: content.url,
      ogTitle: content.title,
      ogDescription: content.description,
      ogImage: this.extractFirstImage(content.content) || this.logo,
      ogUrl: content.url,
      ogType: 'article',
      ogSiteName: this.siteName,
      ogLocale: this.getLocale(content.language),
      twitterCard: 'summary_large_image',
      twitterSite: this.socialMedia.twitter || '',
      twitterCreator: this.socialMedia.twitter || '',
      twitterTitle: content.title,
      twitterDescription: content.description,
      twitterImage: this.extractFirstImage(content.content) || this.logo,
      themeColor: '#3B82F6',
      msapplicationTileColor: '#3B82F6',
      appleMobileWebAppTitle: this.siteName,
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'default'
    };
  }

  private getLocale(language: string): string {
    const locales: Record<string, string> = {
      'es': 'es_AR',
      'en': 'en_US',
      'fr': 'fr_FR',
      'pt': 'pt_BR'
    };
    return locales[language] || 'es_AR';
  }

  // ===========================================
  // ANÁLISIS DE RENDIMIENTO
  // ===========================================

  private async analyzePerformance(url: string): Promise<PerformanceMetrics> {
    // En producción, esto se integraría con herramientas como Lighthouse
    return {
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
      totalBlockingTime: 0,
      speedIndex: 0,
      seoScore: 85 // Simulado
    };
  }

  // ===========================================
  // ANÁLISIS DE ACCESIBILIDAD
  // ===========================================

  private analyzeAccessibility(content: {
    title: string;
    description: string;
    content: string;
    images: Array<{ src: string; alt?: string; title?: string; width?: number; height?: number }>;
  }): AccessibilityMetrics {
    const images = content.images;
    const altTexts = images.filter(img => img.alt && img.alt.length > 0).length;
    const missingAltTexts = images.length - altTexts;
    
    return {
      altTexts,
      missingAltTexts,
      headings: this.countHeadings(content.content),
      headingStructure: this.hasProperHeadingStructure(content.content),
      colorContrast: 4.5, // Simulado
      keyboardNavigation: true, // Simulado
      screenReader: true, // Simulado
      seoScore: this.calculateAccessibilityScore(altTexts, missingAltTexts, images.length)
    };
  }

  private countHeadings(content: string): number {
    const headingRegex = /<h[1-6][^>]*>/gi;
    const matches = content.match(headingRegex);
    return matches ? matches.length : 0;
  }

  private hasProperHeadingStructure(content: string): boolean {
    const h1Regex = /<h1[^>]*>/gi;
    const h1Matches = content.match(h1Regex);
    return h1Matches ? h1Matches.length === 1 : false;
  }

  private calculateAccessibilityScore(altTexts: number, missingAltTexts: number, totalImages: number): number {
    if (totalImages === 0) return 100;
    
    const altTextPercentage = (altTexts / totalImages) * 100;
    return Math.round(altTextPercentage);
  }

  // ===========================================
  // ANÁLISIS MÓVIL
  // ===========================================

  private analyzeMobile(content: {
    title: string;
    description: string;
    content: string;
  }): MobileMetrics {
    return {
      responsive: true, // Simulado
      viewport: true, // Simulado
      touchFriendly: true, // Simulado
      mobileFirst: true, // Simulado
      seoScore: 90 // Simulado
    };
  }

  // ===========================================
  // ANÁLISIS SOCIAL
  // ===========================================

  private async analyzeSocial(url: string): Promise<SocialMetrics> {
    // En producción, esto se integraría con APIs de redes sociales
    return {
      facebookShares: 0,
      twitterShares: 0,
      linkedinShares: 0,
      whatsappShares: 0,
      telegramShares: 0,
      totalShares: 0,
      engagement: 0,
      seoScore: 75 // Simulado
    };
  }

  // ===========================================
  // ANÁLISIS TÉCNICO
  // ===========================================

  private async analyzeTechnical(url: string): Promise<TechnicalMetrics> {
    return {
      https: url.startsWith('https://'),
      ssl: true, // Simulado
      compression: true, // Simulado
      caching: true, // Simulado
      cdn: false, // Simulado
      minification: true, // Simulado
      seoScore: 85 // Simulado
    };
  }

  // ===========================================
  // ANÁLISIS DE CONTENIDO
  // ===========================================

  private analyzeContent(content: {
    title: string;
    description: string;
    content: string;
    tags: string[];
  }): ContentMetrics {
    const wordCount = this.countWords(content.content);
    const readingTime = Math.ceil(wordCount / 200); // 200 palabras por minuto
    const readabilityScore = this.calculateReadabilityScore(content.content);
    const keywordDensity = this.calculateKeywordDensity(content.tags, content.content);
    const keywordDistribution = this.calculateKeywordDistribution(content.tags, content.content);
    const contentLength = content.content.length;
    const paragraphCount = content.content.split('\n').filter(p => p.trim().length > 0).length;
    const sentenceCount = content.content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    return {
      wordCount,
      readingTime,
      readabilityScore,
      keywordDensity,
      keywordDistribution,
      contentLength,
      paragraphCount,
      sentenceCount,
      seoScore: this.calculateContentSEOScore(wordCount, readabilityScore, keywordDensity, keywordDistribution)
    };
  }

  private calculateReadabilityScore(text: string): number {
    // Fórmula simplificada de legibilidad
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const syllables = this.countSyllables(text);
    
    if (sentences === 0 || words === 0) return 0;
    
    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, score));
  }

  private countSyllables(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    let syllables = 0;
    
    for (const word of words) {
      syllables += this.countWordSyllables(word);
    }
    
    return syllables;
  }

  private countWordSyllables(word: string): number {
    if (word.length === 0) return 0;
    
    const vowels = 'aeiouáéíóú';
    let syllableCount = 0;
    let previousWasVowel = false;
    
    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !previousWasVowel) {
        syllableCount++;
      }
      previousWasVowel = isVowel;
    }
    
    return Math.max(1, syllableCount);
  }

  private calculateContentSEOScore(wordCount: number, readabilityScore: number, keywordDensity: number, keywordDistribution: number): number {
    let score = 0;
    
    // Longitud del contenido
    if (wordCount >= 300) score += 25;
    else if (wordCount >= 150) score += 15;
    else if (wordCount >= 100) score += 10;
    
    // Legibilidad
    if (readabilityScore >= 60) score += 25;
    else if (readabilityScore >= 40) score += 15;
    else if (readabilityScore >= 20) score += 10;
    
    // Densidad de keywords
    if (keywordDensity >= 1 && keywordDensity <= 3) score += 25;
    else if (keywordDensity >= 0.5 && keywordDensity <= 5) score += 15;
    else if (keywordDensity >= 0.1 && keywordDensity <= 7) score += 10;
    
    // Distribución de keywords
    if (keywordDistribution >= 70) score += 25;
    else if (keywordDistribution >= 50) score += 15;
    else if (keywordDistribution >= 30) score += 10;
    
    return Math.min(score, 100);
  }

  // ===========================================
  // ANÁLISIS DE IDIOMA
  // ===========================================

  private analyzeLanguage(content: {
    title: string;
    description: string;
    content: string;
    language: string;
  }, detectedLanguage: string): LanguageMetrics {
    return {
      language: detectedLanguage,
      hreflang: this.generateHreflangTags(),
      alternateLanguages: this.languages.filter(lang => lang !== detectedLanguage),
      translationQuality: this.calculateTranslationQuality(content, detectedLanguage),
      seoScore: this.calculateLanguageSEOScore(detectedLanguage, this.languages)
    };
  }

  private generateHreflangTags(): string[] {
    return this.languages.map(lang => `${this.baseUrl}/${lang}/`);
  }

  private calculateTranslationQuality(content: {
    title: string;
    description: string;
    content: string;
  }, language: string): number {
    // Simulado - en producción se usaría un servicio de traducción
    return 85;
  }

  private calculateLanguageSEOScore(language: string, supportedLanguages: string[]): number {
    let score = 0;
    
    // Idioma soportado
    if (supportedLanguages.includes(language)) score += 40;
    
    // Múltiples idiomas
    if (supportedLanguages.length > 1) score += 30;
    
    // Hreflang implementado
    if (supportedLanguages.length > 1) score += 30;
    
    return Math.min(score, 100);
  }

  // ===========================================
  // CÁLCULO DE PUNTUACIÓN GENERAL
  // ===========================================

  private calculateOverallScore(metrics: any): number {
    const weights = {
      title: 0.15,
      description: 0.15,
      keywords: 0.15,
      headings: 0.10,
      images: 0.10,
      videos: 0.05,
      links: 0.05,
      performance: 0.10,
      accessibility: 0.05,
      mobile: 0.05,
      social: 0.05
    };
    
    let totalScore = 0;
    
    for (const [metric, weight] of Object.entries(weights)) {
      if (metrics[metric] && typeof metrics[metric].seoScore === 'number') {
        totalScore += metrics[metric].seoScore * weight;
      }
    }
    
    return Math.round(totalScore);
  }

  // ===========================================
  // GENERACIÓN DE SUGERENCIAS
  // ===========================================

  private generateSuggestions(metrics: any): SEOSuggestion[] {
    const suggestions: SEOSuggestion[] = [];
    
    // Sugerencias críticas
    if (metrics.title && metrics.title.seoScore < 70) {
      suggestions.push({
        type: 'critical',
        category: 'title',
        title: 'Título no optimizado',
        description: 'El título necesita mejoras para SEO',
        impact: 'high',
        effort: 'easy',
        priority: 1,
        action: 'Optimizar el título para mejor SEO'
      });
    }
    
    // Sugerencias de advertencia
    if (metrics.description && metrics.description.seoScore < 80) {
      suggestions.push({
        type: 'warning',
        category: 'description',
        title: 'Descripción mejorable',
        description: 'La descripción puede ser más atractiva',
        impact: 'medium',
        effort: 'easy',
        priority: 2,
        action: 'Mejorar la descripción para mayor atractivo'
      });
    }
    
    // Sugerencias informativas
    if (metrics.images && metrics.images.some((img: any) => img.seoScore < 60)) {
      suggestions.push({
        type: 'info',
        category: 'images',
        title: 'Imágenes no optimizadas',
        description: 'Algunas imágenes necesitan optimización',
        impact: 'medium',
        effort: 'medium',
        priority: 3,
        action: 'Optimizar imágenes para mejor rendimiento'
      });
    }
    
    return suggestions.sort((a, b) => a.priority - b.priority);
  }
}
