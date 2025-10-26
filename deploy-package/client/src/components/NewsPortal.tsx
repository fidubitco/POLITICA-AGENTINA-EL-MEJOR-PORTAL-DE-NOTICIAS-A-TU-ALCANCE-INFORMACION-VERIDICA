// ===========================================
// PORTAL DE NOTICIAS PROFESIONAL
// Componente principal funcional
// ===========================================

import React, { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';

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

interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

const NewsPortal: React.FC = () => {
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
    const category = categories?.find((cat: NewsCategory) => cat.id === categoryId);
    return category?.color || '#3B82F6';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories?.find((cat: NewsCategory) => cat.id === categoryId);
    return category?.icon || '📰';
  };

  const displayArticles = searchQuery ? searchResults?.articles || [] : articles?.articles || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🇦🇷 Política Argentina
              </h1>
              <span className="ml-2 text-sm text-gray-500">Portal de Noticias</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowBreaking(!showBreaking)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  showBreaking 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                🔥 Breaking
              </button>
              <button
                onClick={() => setShowTrending(!showTrending)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  showTrending 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                📈 Trending
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Buscar</h3>
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar noticias..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📂 Categorías</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    selectedCategory === '' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📰 Todas
                </button>
                {categories?.map((category: NewsCategory) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      selectedCategory === category.id 
                        ? 'bg-blue-100 text-blue-800' 
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Trending</h3>
                <div className="space-y-3">
                  {trendingArticles.articles.map((article: NewsArticle) => (
                    <div key={article.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{article.views} vistas</span>
                        <span className="mx-1">•</span>
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-red-800 mb-4">🔥 Noticias de Último Momento</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {breakingNews.articles.map((article: NewsArticle) => (
                    <div key={article.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            <div className="space-y-6">
              {articlesLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : displayArticles.length > 0 ? (
                displayArticles.map((article: NewsArticle) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center mb-2">
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: getCategoryColor(article.category) + '20', color: getCategoryColor(article.category) }}
                          >
                            {getCategoryIcon(article.category)} {article.category}
                          </span>
                          {article.isBreaking && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              🔥 Breaking
                            </span>
                          )}
                          {article.isTrending && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              📈 Trending
                            </span>
                          )}
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
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
                            <span>👁️ {article.views}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={(e) => handleLike(article.id, e)}
                              className="flex items-center text-sm text-gray-500 hover:text-red-500"
                            >
                              ❤️ {article.likes}
                            </button>
                            <button
                              onClick={(e) => handleShare(article.id, e)}
                              className="flex items-center text-sm text-gray-500 hover:text-blue-500"
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
                  <p className="text-gray-500 text-lg">No se encontraron noticias</p>
                </div>
              )}
            </div>

            {/* Load More */}
            {articles?.hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => refetchArticles()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cargar más noticias
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPortal;
