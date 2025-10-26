// ===========================================
// PÁGINA DE CATEGORÍAS PROFESIONAL
// Diseño amplio con contenido rico y SEO extremo
// ===========================================

import React, { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
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

interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

const CategoryPage: React.FC = () => {
  const [, params] = useRoute('/category/:slug');
  const categorySlug = params?.slug || '';
  
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [category, setCategory] = useState<NewsCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Queries
  const { data: categories } = trpc.news.getCategories.useQuery();
  const { data: articlesData, refetch: refetchArticles } = trpc.news.getNews.useQuery({
    category: category?.id,
    limit: 20
  });

  // Mutations
  const incrementViews = trpc.news.incrementViews.useMutation();
  const incrementLikes = trpc.news.incrementLikes.useMutation();
  const incrementShares = trpc.news.incrementShares.useMutation();

  useEffect(() => {
    if (categories && categorySlug) {
      const foundCategory = categories.find((cat: NewsCategory) => cat.slug === categorySlug);
      if (foundCategory) {
        setCategory(foundCategory);
      }
    }
  }, [categories, categorySlug]);

  useEffect(() => {
    if (articlesData) {
      setArticles(articlesData.articles);
      setIsLoading(false);
    }
  }, [articlesData]);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📂</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Categoría no encontrada</h1>
          <p className="text-gray-600">La categoría que buscas no existe.</p>
          </div>
      </div>
    );
  }

  // SEO Data
  const seoData = {
    title: `${category.name} - Noticias de ${category.name} en Argentina`,
    description: `Últimas noticias de ${category.name} en Argentina. ${category.description} Información actualizada y confiable sobre ${category.name.toLowerCase()}.`,
    keywords: [
      `${category.name.toLowerCase()} argentina`,
      `noticias ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} argentina`,
      `información ${category.name.toLowerCase()}`,
      `actualidad ${category.name.toLowerCase()}`,
      "argentina",
      "noticias argentina",
      "portal noticias"
    ],
    canonicalUrl: `https://politicaargentina.com/category/${category.slug}`,
    ogImage: `https://politicaargentina.com/category-${category.slug}.jpg`,
    articleData: {
      author: "Política Argentina",
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: category.name,
      tags: [category.name, "Argentina", "Noticias"]
    },
    breadcrumbs: [
      { name: "Inicio", url: "https://politicaargentina.com" },
      { name: category.name, url: `https://politicaargentina.com/category/${category.slug}` }
    ],
    faqData: [
      {
        question: `¿Qué noticias de ${category.name} encuentro aquí?`,
        answer: `En esta sección encontrarás todas las noticias relacionadas con ${category.name.toLowerCase()} en Argentina, actualizadas constantemente por nuestro equipo editorial.`
      },
      {
        question: `¿Con qué frecuencia se actualizan las noticias de ${category.name}?`,
        answer: `Las noticias de ${category.name.toLowerCase()} se actualizan en tiempo real, asegurando que tengas acceso a la información más reciente y relevante.`
      }
    ]
  };

  return (
    <>
      <ExtremeSEO {...seoData} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {category.name}
                </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {category.description}
              </p>
              <div className="flex justify-center items-center space-x-4 text-blue-200">
                <span>📰 {articles.length} artículos</span>
                <span>•</span>
                <span>🕒 Actualizado constantemente</span>
                <span>•</span>
                <span>✅ Información verificada</span>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  ← Volver al inicio
                </a>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{category.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Última actualización: {new Date().toLocaleTimeString('es-AR')}
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Info */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div 
                className="p-4 rounded-lg mr-4"
                style={{ backgroundColor: category.color + '20' }}
              >
                <span className="text-3xl">{category.icon}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 text-lg">
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {articles.length}
                </div>
                <div className="text-sm text-gray-600">Artículos disponibles</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total de vistas</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {articles.filter(article => article.isTrending).length}
                </div>
                <div className="text-sm text-gray-600">Artículos trending</div>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : articles.length > 0 ? (
              articles.map((article: NewsArticle) => (
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
                          style={{ backgroundColor: category.color + '20', color: category.color }}
                        >
                          {category.icon} {category.name}
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
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay artículos en esta categoría
                </h3>
                <p className="text-gray-600">
                  Pronto tendremos contenido sobre {category.name.toLowerCase()}.
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {articlesData?.hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => refetchArticles()}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
              >
                📰 Cargar más artículos de {category.name}
              </button>
            </div>
          )}
        </div>

        {/* Related Categories */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Otras Categorías
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories?.filter((cat: NewsCategory) => cat.id !== category.id).map((cat: NewsCategory) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-medium text-gray-900">{cat.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default CategoryPage;