// ===========================================
// SERVICIO DE NOTICIAS PROFESIONAL
// Sistema completo y funcional
// ===========================================

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  source: string;
  url: string;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
  likes: number;
  shares: number;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  logo: string;
  credibility: number;
  isActive: boolean;
}

class NewsService {
  private articles: NewsArticle[] = [];
  private categories: NewsCategory[] = [];
  private sources: NewsSource[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Inicializar categorías
    this.categories = [
      {
        id: 'politica',
        name: 'Política',
        slug: 'politica',
        description: 'Noticias políticas de Argentina',
        color: '#3B82F6',
        icon: '🏛️'
      },
      {
        id: 'economia',
        name: 'Economía',
        slug: 'economia',
        description: 'Noticias económicas y financieras',
        color: '#10B981',
        icon: '💰'
      },
      {
        id: 'sociedad',
        name: 'Sociedad',
        slug: 'sociedad',
        description: 'Noticias sociales y culturales',
        color: '#F59E0B',
        icon: '👥'
      },
      {
        id: 'deportes',
        name: 'Deportes',
        slug: 'deportes',
        description: 'Noticias deportivas',
        color: '#EF4444',
        icon: '⚽'
      },
      {
        id: 'tecnologia',
        name: 'Tecnología',
        slug: 'tecnologia',
        description: 'Noticias tecnológicas',
        color: '#8B5CF6',
        icon: '💻'
      }
    ];

    // Inicializar fuentes
    this.sources = [
      {
        id: 'clarin',
        name: 'Clarín',
        url: 'https://www.clarin.com',
        logo: 'https://www.clarin.com/static/CLARIN-TopBar/img/logo-clarin.svg',
        credibility: 95,
        isActive: true
      },
      {
        id: 'lanacion',
        name: 'La Nación',
        url: 'https://www.lanacion.com.ar',
        logo: 'https://www.lanacion.com.ar/static/logo-lanacion.svg',
        credibility: 98,
        isActive: true
      },
      {
        id: 'pagina12',
        name: 'Página/12',
        url: 'https://www.pagina12.com.ar',
        logo: 'https://www.pagina12.com.ar/static/logo-pagina12.svg',
        credibility: 92,
        isActive: true
      },
      {
        id: 'infobae',
        name: 'Infobae',
        url: 'https://www.infobae.com',
        logo: 'https://www.infobae.com/static/logo-infobae.svg',
        credibility: 90,
        isActive: true
      }
    ];

    // Generar artículos de ejemplo
    this.generateSampleArticles();
  }

  private generateSampleArticles(): void {
    const sampleArticles: Omit<NewsArticle, 'id'>[] = [
      {
        title: 'Nueva medida económica del gobierno impacta el mercado',
        content: 'El gobierno anunció una nueva serie de medidas económicas que buscan estabilizar la economía nacional. Estas medidas incluyen...',
        excerpt: 'El gobierno anunció nuevas medidas económicas para estabilizar la economía nacional.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        author: 'María González',
        publishedAt: new Date().toISOString(),
        category: 'economia',
        tags: ['economía', 'gobierno', 'medidas'],
        source: 'clarin',
        url: 'https://www.clarin.com/economia/nueva-medida-economica',
        isBreaking: false,
        isTrending: true,
        views: 15420,
        likes: 234,
        shares: 89
      },
      {
        title: 'Elecciones 2025: Los candidatos presentan sus propuestas',
        content: 'Los principales candidatos a las elecciones presidenciales de 2025 presentaron sus propuestas en un debate televisado...',
        excerpt: 'Candidatos presidenciales presentan sus propuestas en debate televisado.',
        imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop',
        author: 'Carlos Rodríguez',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'politica',
        tags: ['elecciones', 'política', 'candidatos'],
        source: 'lanacion',
        url: 'https://www.lanacion.com.ar/politica/elecciones-2025-candidatos',
        isBreaking: true,
        isTrending: true,
        views: 28750,
        likes: 456,
        shares: 123
      },
      {
        title: 'Argentina gana el Mundial de Fútbol 2026',
        content: 'En una final épica, la selección argentina se coronó campeona del mundo por tercera vez en su historia...',
        excerpt: 'Argentina se corona campeona del mundo en una final épica.',
        imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop',
        author: 'Diego Martínez',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        category: 'deportes',
        tags: ['fútbol', 'mundial', 'argentina'],
        source: 'infobae',
        url: 'https://www.infobae.com/deportes/argentina-gana-mundial-2026',
        isBreaking: true,
        isTrending: true,
        views: 45680,
        likes: 1234,
        shares: 567
      },
      {
        title: 'Nueva tecnología argentina revoluciona la medicina',
        content: 'Científicos argentinos desarrollaron una nueva tecnología que promete revolucionar el tratamiento de enfermedades...',
        excerpt: 'Científicos argentinos desarrollan tecnología revolucionaria para la medicina.',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        author: 'Ana Fernández',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        category: 'tecnologia',
        tags: ['tecnología', 'medicina', 'ciencia'],
        source: 'pagina12',
        url: 'https://www.pagina12.com.ar/tecnologia/nueva-tecnologia-medicina',
        isBreaking: false,
        isTrending: false,
        views: 8920,
        likes: 156,
        shares: 34
      },
      {
        title: 'Festival de música reúne a miles en Buenos Aires',
        content: 'El festival de música más importante del año reunió a miles de personas en el centro de Buenos Aires...',
        excerpt: 'Festival de música reúne a miles en Buenos Aires.',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
        author: 'Laura Sánchez',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        category: 'sociedad',
        tags: ['música', 'festival', 'cultura'],
        source: 'clarin',
        url: 'https://www.clarin.com/sociedad/festival-musica-buenos-aires',
        isBreaking: false,
        isTrending: false,
        views: 5670,
        likes: 89,
        shares: 23
      }
    ];

    this.articles = sampleArticles.map((article, index) => ({
      ...article,
      id: `article-${index + 1}`
    }));
  }

  // ===========================================
  // MÉTODOS PÚBLICOS
  // ===========================================

  async getArticles(filters: {
    category?: string;
    source?: string;
    limit?: number;
    offset?: number;
    trending?: boolean;
    breaking?: boolean;
  } = {}): Promise<{
    articles: NewsArticle[];
    total: number;
    hasMore: boolean;
  }> {
    let filteredArticles = [...this.articles];

    // Aplicar filtros
    if (filters.category) {
      filteredArticles = filteredArticles.filter(article => article.category === filters.category);
    }

    if (filters.source) {
      filteredArticles = filteredArticles.filter(article => article.source === filters.source);
    }

    if (filters.trending) {
      filteredArticles = filteredArticles.filter(article => article.isTrending);
    }

    if (filters.breaking) {
      filteredArticles = filteredArticles.filter(article => article.isBreaking);
    }

    // Ordenar por fecha (más recientes primero)
    filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const total = filteredArticles.length;
    const offset = filters.offset || 0;
    const limit = filters.limit || 20;
    const paginatedArticles = filteredArticles.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return {
      articles: paginatedArticles,
      total,
      hasMore
    };
  }

  async getArticle(id: string): Promise<NewsArticle | null> {
    return this.articles.find(article => article.id === id) || null;
  }

  async getCategories(): Promise<NewsCategory[]> {
    return [...this.categories];
  }

  async getSources(): Promise<NewsSource[]> {
    return [...this.sources];
  }

  async getTrendingArticles(limit: number = 10): Promise<NewsArticle[]> {
    return this.articles
      .filter(article => article.isTrending)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  async getBreakingNews(limit: number = 5): Promise<NewsArticle[]> {
    return this.articles
      .filter(article => article.isBreaking)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  async searchArticles(query: string, limit: number = 20): Promise<NewsArticle[]> {
    const searchTerm = query.toLowerCase();
    return this.articles
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  async getStats(): Promise<{
    totalArticles: number;
    totalCategories: number;
    totalSources: number;
    totalViews: number;
    totalLikes: number;
    totalShares: number;
  }> {
    return {
      totalArticles: this.articles.length,
      totalCategories: this.categories.length,
      totalSources: this.sources.length,
      totalViews: this.articles.reduce((sum, article) => sum + article.views, 0),
      totalLikes: this.articles.reduce((sum, article) => sum + article.likes, 0),
      totalShares: this.articles.reduce((sum, article) => sum + article.shares, 0)
    };
  }

  async incrementViews(id: string): Promise<void> {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      article.views++;
    }
  }

  async incrementLikes(id: string): Promise<void> {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      article.likes++;
    }
  }

  async incrementShares(id: string): Promise<void> {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      article.shares++;
    }
  }
}

export const newsService = new NewsService();
export default newsService;
