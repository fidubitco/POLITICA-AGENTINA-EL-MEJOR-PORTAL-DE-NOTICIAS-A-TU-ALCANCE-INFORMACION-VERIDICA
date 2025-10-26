import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Share2, 
  Bookmark, 
  Clock,
  TrendingUp,
  Globe,
  Filter,
  SortAsc,
  RefreshCw
} from 'lucide-react';

// ===========================================
// TIPOS PROFESIONALES
// ===========================================
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  imageUrl: string;
  source: string;
  readTime: number;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
  likes: number;
  shares: number;
}

interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

interface NewsSource {
  id: string;
  name: string;
  url: string;
  logo: string;
  credibility: number;
  isVerified: boolean;
}

// ===========================================
// DATOS DE FUENTES ARGENTINAS (TOP 50)
// ===========================================
const ARGENTINE_NEWS_SOURCES: NewsSource[] = [
  { id: 'clarin', name: 'Clarín', url: 'https://clarin.com', logo: '/logos/clarin.png', credibility: 95, isVerified: true },
  { id: 'lanacion', name: 'La Nación', url: 'https://lanacion.com.ar', logo: '/logos/lanacion.png', credibility: 98, isVerified: true },
  { id: 'pagina12', name: 'Página/12', url: 'https://pagina12.com.ar', logo: '/logos/pagina12.png', credibility: 92, isVerified: true },
  { id: 'infobae', name: 'Infobae', url: 'https://infobae.com', logo: '/logos/infobae.png', credibility: 90, isVerified: true },
  { id: 'perfil', name: 'Perfil', url: 'https://perfil.com', logo: '/logos/perfil.png', credibility: 88, isVerified: true },
  { id: 'ambito', name: 'Ámbito Financiero', url: 'https://ambito.com', logo: '/logos/ambito.png', credibility: 85, isVerified: true },
  { id: 'cronista', name: 'El Cronista', url: 'https://cronista.com', logo: '/logos/cronista.png', credibility: 87, isVerified: true },
  { id: 'telesur', name: 'Télam', url: 'https://telam.com.ar', logo: '/logos/telam.png', credibility: 93, isVerified: true },
  { id: 'rt', name: 'RT en Español', url: 'https://actualidad.rt.com', logo: '/logos/rt.png', credibility: 80, isVerified: true },
  { id: 'dw', name: 'DW Español', url: 'https://dw.com/es', logo: '/logos/dw.png', credibility: 95, isVerified: true },
  // ... más fuentes argentinas
];

const NEWS_CATEGORIES: NewsCategory[] = [
  { id: 'politica', name: 'Política', slug: 'politica', color: '#d32f2f', icon: '🏛️' },
  { id: 'economia', name: 'Economía', slug: 'economia', color: '#1976d2', icon: '💰' },
  { id: 'sociedad', name: 'Sociedad', slug: 'sociedad', color: '#388e3c', icon: '👥' },
  { id: 'deportes', name: 'Deportes', slug: 'deportes', color: '#f57c00', icon: '⚽' },
  { id: 'tecnologia', name: 'Tecnología', slug: 'tecnologia', color: '#7b1fa2', icon: '💻' },
  { id: 'cultura', name: 'Cultura', slug: 'cultura', color: '#5d4037', icon: '🎭' },
  { id: 'internacional', name: 'Internacional', slug: 'internacional', color: '#455a64', icon: '🌍' },
  { id: 'salud', name: 'Salud', slug: 'salud', color: '#c2185b', icon: '🏥' },
];

// ===========================================
// HOOKS AVANZADOS
// ===========================================
const useNewsAPI = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (category?: string, source?: string) => {
    setLoading(true);
    try {
      // Simulación de API - en producción sería una llamada real
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: 'Javier Milei anuncia nuevas medidas económicas para 2025',
          excerpt: 'El presidente argentino presentó un paquete de reformas que incluye reducción de impuestos y simplificación de trámites.',
          content: 'Contenido completo del artículo...',
          author: 'María González',
          publishedAt: new Date().toISOString(),
          category: 'politica',
          tags: ['milei', 'economia', 'reformas'],
          imageUrl: '/images/milei-1.jpg',
          source: 'Clarín',
          readTime: 5,
          isBreaking: true,
          isTrending: true,
          views: 15420,
          likes: 892,
          shares: 234
        },
        // ... más artículos
      ];
      
      setArticles(mockArticles);
    } catch (err) {
      setError('Error al cargar las noticias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, refetch: fetchNews };
};

const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (hasMore) {
          callback();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, hasMore]);
};

// ===========================================
// COMPONENTES PROFESIONALES
// ===========================================

const ProfessionalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.header 
      className="header-professional"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Política Argentina
          </motion.a>

          {/* Navegación Desktop */}
          <nav className="nav-professional hidden md:flex">
            {NEWS_CATEGORIES.map((category) => (
              <motion.a
                key={category.id}
                href={`/categoria/${category.slug}`}
                whileHover={{ y: -2 }}
                className="relative"
              >
                {category.icon} {category.name}
              </motion.a>
            ))}
          </nav>

          {/* Búsqueda */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Menú Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <nav className="flex flex-col space-y-2">
                {NEWS_CATEGORIES.map((category) => (
                  <a
                    key={category.id}
                    href={`/categoria/${category.slug}`}
                    className="py-2 px-4 rounded-lg hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.icon} {category.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const HeroArticle: React.FC<{ article: NewsArticle }> = ({ article }) => {
  return (
    <motion.article 
      className="article-hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid-hero">
          <div>
            {article.isBreaking && (
              <motion.div 
                className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                🔥 URGENTE
              </motion.div>
            )}
            
            <h1 className="article-hero h1">{article.title}</h1>
            <p className="article-hero lead">{article.excerpt}</p>
            
            <div className="article-meta">
              <span className="author">Por {article.author}</span>
              <span className="date">{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
              <span className="read-time">{article.readTime} min de lectura</span>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-professional"
              >
                Leer más
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-professional secondary"
              >
                <Bookmark size={16} />
                Guardar
              </motion.button>
            </div>
          </div>
          
          <div>
            <motion.img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const NewsCard: React.FC<{ article: NewsArticle; index: number }> = ({ article, index }) => {
  return (
    <motion.article
      className="card-professional"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} />
        {article.isTrending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <TrendingUp size={12} className="inline mr-1" />
            Trending
          </div>
        )}
      </div>
      
      <div className="content">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        
        <div className="meta">
          <span>{article.author}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {article.readTime} min
            </span>
            <span>{article.views} vistas</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 size={16} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const NewsGrid: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid-professional">
        {articles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  );
};

const FilterBar: React.FC<{ 
  categories: NewsCategory[];
  sources: NewsSource[];
  onFilterChange: (filters: any) => void;
}> = ({ categories, sources, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const handleFilterChange = useCallback(() => {
    onFilterChange({
      category: selectedCategory,
      source: selectedSource,
      sort: sortBy
    });
  }, [selectedCategory, selectedSource, sortBy, onFilterChange]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <motion.div 
      className="bg-white border-b border-gray-200 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} />
            <span className="font-medium">Filtros:</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Todas las fuentes</option>
            {sources.map(source => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="newest">Más recientes</option>
            <option value="trending">Más populares</option>
            <option value="views">Más vistas</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

// ===========================================
// COMPONENTE PRINCIPAL
// ===========================================
const ProfessionalNewsPortal: React.FC = () => {
  const { articles, loading, error, refetch } = useNewsAPI();
  const [filters, setFilters] = useState<any>({});
  const [hasMore, setHasMore] = useState(true);

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(article => article.category === filters.category);
    }
    
    if (filters.source && filters.source !== 'all') {
      filtered = filtered.filter(article => article.source === filters.source);
    }
    
    if (filters.sort === 'trending') {
      filtered = filtered.sort((a, b) => b.views - a.views);
    } else if (filters.sort === 'views') {
      filtered = filtered.sort((a, b) => b.views - a.views);
    } else {
      filtered = filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    
    return filtered;
  }, [articles, filters]);

  const loadMore = useCallback(() => {
    // Implementar carga infinita
    console.log('Cargando más artículos...');
  }, []);

  useInfiniteScroll(loadMore, hasMore);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={32} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error al cargar las noticias</h2>
          <button 
            onClick={() => refetch()}
            className="btn-professional"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalHeader />
      
      <FilterBar 
        categories={NEWS_CATEGORIES}
        sources={ARGENTINE_NEWS_SOURCES}
        onFilterChange={setFilters}
      />
      
      {filteredArticles.length > 0 && (
        <HeroArticle article={filteredArticles[0]} />
      )}
      
      <NewsGrid articles={filteredArticles.slice(1)} />
    </div>
  );
};

export default ProfessionalNewsPortal;
