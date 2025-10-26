// ===========================================

// DASHBOARD DE ADMINISTRACIÓN COMPLETO
// Panel de control profesional
// ===========================================

import React, { useState, useEffect } from 'react';
import { trpc } from '../../utils/trpc';

interface DashboardStats {
  totalArticles: number;
  totalCategories: number;
  totalSources: number;
  totalViews: number;
  totalLikes: number;IHF
  totalShares: number;
}

interface RecentArticle {
  id: string;
  title: string;
  views: number;
  likes: number;
  publishedAt: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Queries
  const { data: newsStats } = trpc.news.getStats.useQuery();
  const { data: articles } = trpc.news.getNews.useQuery({ limit: 10 });

  useEffect(() => {
    if (newsStats) {
      setStats(newsStats);
    }
    if (articles?.articles) {
      setRecentArticles(articles.articles.map(article => ({
        id: article.id,
        title: article.title,
        views: article.views,
        likes: article.likes,
        publishedAt: article.publishedAt,
        category: article.category
      })));
    }
    setIsLoading(false);
  }, [newsStats, articles]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Dashboard de Administración
              </h1>
              <span className="ml-2 text-sm text-gray-500">Política Argentina</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleTimeString('es-AR')}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Artículos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatNumber(stats.totalArticles) : '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">📂</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Categorías</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatNumber(stats.totalCategories) : '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🔗</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Fuentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatNumber(stats.totalSources) : '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vistas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatNumber(stats.totalViews) : '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">❤️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Likes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatNumber(stats.totalLikes) : '0'}
                </p>
              </div>
            </div>
        </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <span className="text-2xl">📤</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Shares</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? formatNumber(stats.totalShares) : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">📰 Artículos Recientes</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                {recentArticles.slice(0, 5).map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>👁️ {formatNumber(article.views)}</span>
                        <span className="mx-2">•</span>
                        <span>❤️ {formatNumber(article.likes)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">⚡ Acciones Rápidas</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">📝</span>
                    <span className="text-sm font-medium text-blue-900">Nuevo Artículo</span>
                  </div>
                </button>
                
                <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">📂</span>
                    <span className="text-sm font-medium text-green-900">Gestionar Categorías</span>
                  </div>
                </button>
                
                <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🔗</span>
                    <span className="text-sm font-medium text-purple-900">Configurar Fuentes</span>
                  </div>
                </button>
                
                <button className="flex items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">📊</span>
                    <span className="text-sm font-medium text-orange-900">Ver Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">🔧 Estado del Sistema</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600">✅</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">API Status</p>
                  <p className="text-sm text-green-600">Operativo</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600">✅</span>
                      </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Base de Datos</p>
                  <p className="text-sm text-green-600">Conectada</p>
                </div>
        </div>

              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600">✅</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Cache</p>
                  <p className="text-sm text-green-600">Activo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;