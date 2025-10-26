import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, TrendingUp, Clock, Globe, Share2, Heart, Eye } from 'lucide-react';
import ExtremeSEO from '../components/ExtremeSEO';
import LanguageSelector from '../components/LanguageSelector';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  shares: number;
  isBreaking: boolean;
  isTrending: boolean;
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo para demostración
  useEffect(() => {
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Nuevas medidas económicas del gobierno argentino',
        excerpt: 'El gobierno anuncia un paquete de medidas económicas para reactivar la economía nacional.',
        content: 'Contenido completo del artículo...',
        imageUrl: '/images/news-1.jpg',
        author: 'Redacción Política Argentina',
        publishedAt: new Date().toISOString(),
        category: 'Política',
        tags: ['economía', 'gobierno', 'medidas'],
        views: 1250,
        likes: 45,
        shares: 23,
        isBreaking: true,
        isTrending: true
      },
      {
        id: '2',
        title: 'Análisis del mercado financiero argentino',
        excerpt: 'Expertos analizan las tendencias del mercado financiero y sus implicaciones.',
        content: 'Contenido completo del artículo...',
        imageUrl: '/images/news-2.jpg',
        author: 'Equipo Económico',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'Economía',
        tags: ['finanzas', 'mercado', 'análisis'],
        views: 890,
        likes: 32,
        shares: 15,
        isBreaking: false,
        isTrending: true
      }
    ];

    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ExtremeSEO
        title="Política Argentina - Portal de Noticias Políticas"
        description="Portal profesional de noticias políticas de Argentina. Últimas noticias, análisis y tendencias políticas en tiempo real."
        keywords={['política argentina', 'noticias', 'gobierno', 'elecciones', 'congreso', 'presidente']}
        url="/"
        type="website"
        locale="es_AR"
        alternateLocales={[
          { locale: 'en_US', url: '/en/' },
          { locale: 'fr_FR', url: '/fr/' },
          { locale: 'pt_BR', url: '/pt/' }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  🇦🇷 Política Argentina
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('welcome')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Portal profesional de noticias políticas de Argentina
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('search_news')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-0 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {['Política', 'Economía', 'Sociedad', 'Internacional'].map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Breaking News */}
        {articles.some(article => article.isBreaking) && (
          <section className="py-6 bg-red-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-bold text-lg">{t('breaking_news')}</span>
              </div>
              <p className="mt-2 text-lg">
                {articles.find(article => article.isBreaking)?.title}
              </p>
            </div>
          </section>
        )}

        {/* Main Content */}
        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('loading')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      {article.isBreaking && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          URGENTE
                        </div>
                      )}
                      {article.isTrending && (
                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          <TrendingUp className="w-4 h-4 inline mr-1" />
                          TRENDING
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{article.category}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-4 h-4" />
                            <span>{article.shares}</span>
                          </div>
                        </div>
                        
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          {t('read_more')}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {!loading && filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">{t('no_news_found')}</p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">🇦🇷 Política Argentina</h3>
                <p className="text-gray-400">
                  Portal profesional de noticias políticas de Argentina con tecnología de punta.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Categorías</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Política</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Economía</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sociedad</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Internacional</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Idiomas</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/" className="hover:text-white transition-colors">🇦🇷 Español</a></li>
                  <li><a href="/en/" className="hover:text-white transition-colors">🇺🇸 English</a></li>
                  <li><a href="/fr/" className="hover:text-white transition-colors">🇫🇷 Français</a></li>
                  <li><a href="/pt/" className="hover:text-white transition-colors">🇧🇷 Português</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Síguenos</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Política Argentina. {t('all_rights_reserved')}</p>
              <p className="mt-2">{t('developed_with_passion')}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;