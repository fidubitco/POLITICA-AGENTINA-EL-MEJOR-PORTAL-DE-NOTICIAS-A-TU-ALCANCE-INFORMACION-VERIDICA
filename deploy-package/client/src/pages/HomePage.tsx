// ===========================================
// PÁGINA PRINCIPAL MEGA OPTIMIZADA
// Portal profesional con contenido rico y SEO extremo
// ===========================================

import React, { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import ExtremeSEO from '../components/ExtremeSEO';

interface NewsArticle {
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

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBreaking, setShowBreaking] = useState<boolean>(false);
  const [showTrending, setShowTrending] = useState<boolean>(false);

  // Queries
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = trpc.news.getNews.useQuery({
    category: selectedCategory || undefined,
    limit: 20,
    breaking: showBreaking || undefined,
    trending: showTrending || undefined
  });

  const { data: categories } = trpc.news.getCategories.useQuery();
  const { data: trendingArticles } = trpc.news.getTrending.useQuery({ limit: 5 });
  const { data: breakingNews } = trpc.news.getBreaking.useQuery({ limit: 3 });
  const { data: searchResults, refetch: searchNews } = trpc.news.searchNews.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: false }
  );

  // Mutations
  const incrementViews = trpc.news.incrementViews.useMutation();
  const incrementLikes = trpc.news.incrementLikes.useMutation();
  const incrementShares = trpc.news.incrementShares.useMutation();

  // Handlers
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchNews();
    }
  };

  const handleArticleClick = async (articleId: string) => {
    await incrementViews.mutateAsync({ id: articleId });
  };

  const handleLike = async (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await incrementLikes.mutateAsync({ id: articleId });
    refetchArticles();
  };

  const handleShare = async (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await incrementShares.mutateAsync({ id: articleId });
    refetchArticles();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories?.find((cat: any) => cat.id === categoryId);
    return category?.color || '#3B82F6';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories?.find((cat: any) => cat.id === categoryId);
    return category?.icon || '📰';
  };

  const displayArticles = searchQuery ? searchResults?.articles || [] : articles?.articles || [];

  // SEO Data
  const seoData = {
    title: "Política Argentina - Portal de Noticias Profesional",
    description: "Portal profesional de noticias argentinas. Últimas noticias de política, economía, sociedad, deportes y tecnología. Información confiable y actualizada.",
    keywords: [
      "noticias argentina",
      "política argentina",
      "economía argentina",
      "sociedad argentina",
      "deportes argentina",
      "tecnología argentina",
      "portal noticias",
      "información argentina",
      "actualidad argentina",
      "news argentina"
    ],
    canonicalUrl: "https://politicaargentina.com",
    ogImage: "https://politicaargentina.com/og-image.jpg",
    articleData: {
      author: "Política Argentina",
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: "Noticias",
      tags: ["Argentina", "Noticias", "Política", "Economía", "Sociedad"]
    },
    breadcrumbs: [
      { name: "Inicio", url: "https://politicaargentina.com" }
    ],
    faqData: [
      {
        question: "¿Qué es Política Argentina?",
        answer: "Política Argentina es un portal profesional de noticias que ofrece información confiable y actualizada sobre política, economía, sociedad, deportes y tecnología en Argentina."
      },
      {
        question: "¿Cómo puedo mantenerme informado?",
        answer: "Puedes seguir nuestras noticias en tiempo real, suscribirte a nuestras alertas, o seguirnos en redes sociales para recibir las últimas actualizaciones."
      },
      {
        question: "¿Las noticias son confiables?",
        answer: "Sí, todas nuestras noticias provienen de fuentes verificadas y son revisadas por nuestro equipo editorial profesional."
      }
    ],
    localBusiness: {
      name: "Política Argentina",
      address: "Buenos Aires, Argentina",
      phone: "+54 11 1234-5678",
      email: "contacto@politicaargentina.com",
      openingHours: "Mo-Fr 09:00-18:00"
    }
  };

  return (
    <>
      <ExtremeSEO {...seoData} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        {/* Header Hero Section */}
        <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                🇦🇷 Política Argentina
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Portal Profesional de Noticias Argentinas
              </p>
              <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
                Información confiable, actualizada y profesional sobre política, economía, 
                sociedad, deportes y tecnología en Argentina. Tu fuente de noticias de confianza.
              </p>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  📰 Noticias
                </h2>
                <div className="hidden md:flex items-center space-x-6">
                  <button
                    onClick={() => setShowBreaking(!showBreaking)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      showBreaking 
                        ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🔥 Breaking News
                  </button>
                  <button
                    onClick={() => setShowTrending(!showTrending)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      showTrending 
                        ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    📈 Trending
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar noticias..."
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    🔍
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Búsqueda Avanzada</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar noticias..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    🔍 Buscar
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📂 Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    📰 Todas las Noticias
                  </button>
                  {categories?.map((category: any) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending */}
              {trendingArticles && trendingArticles.articles.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Trending</h3>
                  <div className="space-y-4">
                    {trendingArticles.articles.map((article: NewsArticle) => (
                      <div key={article.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>👁️ {article.views.toLocaleString()}</span>
                          <span className="mx-2">•</span>
                          <span>❤️ {article.likes}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Breaking News */}
              {breakingNews && breakingNews.articles.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                    🔥 Noticias de Último Momento
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {breakingNews.articles.map((article: NewsArticle) => (
                      <div key={article.id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>👁️ {article.views.toLocaleString()}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              <div className="space-y-6">
                {articlesLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : displayArticles.length > 0 ? (
                  displayArticles.map((article: NewsArticle) => (
                    <article
                      key={article.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => handleArticleClick(article.id)}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center mb-3">
                            <span
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-2"
                              style={{ backgroundColor: getCategoryColor(article.category) + '20', color: getCategoryColor(article.category) }}
                            >
                              {getCategoryIcon(article.category)} {article.category}
                            </span>
                            {article.isBreaking && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                                🔥 Breaking
                              </span>
                            )}
                            {article.isTrending && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                📈 Trending
                              </span>
                            )}
                          </div>
                          
                          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h2>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <span>👤 {article.author}</span>
                              <span className="mx-2">•</span>
                              <span>📅 {formatDate(article.publishedAt)}</span>
                              <span className="mx-2">•</span>
                              <span>👁️ {article.views.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={(e) => handleLike(article.id, e)}
                                className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors"
                              >
                                ❤️ {article.likes}
                              </button>
                              <button
                                onClick={(e) => handleShare(article.id, e)}
                                className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-colors"
                              >
                                📤 {article.shares}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📰</div>
                    <p className="text-gray-500 text-lg">No se encontraron noticias</p>
                    <p className="text-gray-400 text-sm">Intenta con otros filtros o términos de búsqueda</p>
                  </div>
                )}
              </div>

              {/* Load More */}
              {articles?.hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => refetchArticles()}
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
                  >
                    📰 Cargar más noticias
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">🇦🇷 Política Argentina</h3>
                <p className="text-gray-400">
                  Portal profesional de noticias argentinas. Información confiable y actualizada.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">📰 Categorías</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Política</li>
                  <li>Economía</li>
                  <li>Sociedad</li>
                  <li>Deportes</li>
                  <li>Tecnología</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">🔗 Enlaces</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Acerca de</li>
                  <li>Contacto</li>
                  <li>Política de Privacidad</li>
                  <li>Términos de Uso</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">📱 Síguenos</h4>
                <div className="flex space-x-4">
                  <span className="text-gray-400">Twitter</span>
                  <span className="text-gray-400">Facebook</span>
                  <span className="text-gray-400">Instagram</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Política Argentina. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;