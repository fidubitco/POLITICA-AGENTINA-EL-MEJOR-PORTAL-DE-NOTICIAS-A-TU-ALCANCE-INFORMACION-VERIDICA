/**
 * 📊 DASHBOARD ADMIN COMPLETO Y FUNCIONAL
 * Panel de administración con todas las funcionalidades
 */

import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  ThumbsUp,
  Share2,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { allArticles, Article } from '../../data/allNews';

export const AdminDashboardFull: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(allArticles);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'articles' | 'analytics'>('overview');

  // Estadísticas
  const stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
    totalShares: articles.reduce((sum, a) => sum + a.shares, 0),
  };

  // Top artículos
  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Formatear número
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Eliminar artículo
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      setArticles(articles.filter(a => a.id !== id));
      alert('Artículo eliminado exitosamente');
    }
  };

  // Cambiar estado
  const handleStatusChange = (id: number, newStatus: Article['status']) => {
    setArticles(articles.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
    alert(`Estado cambiado a: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="text-2xl font-bold text-blue-600">
                Política Argentina
              </a>
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 font-semibold">
              Panel de Administración
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin/crear-noticia">
              <a className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Nueva Noticia
              </a>
            </Link>
            <Link href="/">
              <a className="text-gray-600 hover:text-gray-900">
                Ver Sitio
              </a>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              selectedTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 inline mr-2" />
            Resumen
          </button>
          <button
            onClick={() => setSelectedTab('articles')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              selectedTab === 'articles'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Artículos ({articles.length})
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              selectedTab === 'analytics'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-5 h-5 inline mr-2" />
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Artículos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalArticles}
                    </p>
                  </div>
                  <FileText className="w-12 h-12 text-blue-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-semibold">
                    {stats.publishedArticles} publicados
                  </span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-yellow-600 font-semibold">
                    {stats.draftArticles} borradores
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Vistas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {formatNumber(stats.totalViews)}
                    </p>
                  </div>
                  <Eye className="w-12 h-12 text-purple-600" />
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.5% vs mes anterior</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Engagement</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {formatNumber(stats.totalLikes + stats.totalShares)}
                    </p>
                  </div>
                  <ThumbsUp className="w-12 h-12 text-pink-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">
                    {formatNumber(stats.totalLikes)} likes • {formatNumber(stats.totalShares)} shares
                  </span>
                </div>
              </div>
            </div>

            {/* Top Articles */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Top 5 Artículos Más Vistos
              </h3>
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-2xl font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {article.category} • {formatDate(article.publishedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {formatNumber(article.likes)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {selectedTab === 'articles' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artículo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vistas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Por {article.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={article.status}
                          onChange={(e) => handleStatusChange(article.id, e.target.value as Article['status'])}
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            article.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : article.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="published">Publicado</option>
                          <option value="draft">Borrador</option>
                          <option value="archived">Archivado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatNumber(article.views)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(article.publishedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link href={`/noticia/${article.id}`}>
                            <a className="text-blue-600 hover:text-blue-900" title="Ver noticia">
                              <Eye className="w-5 h-5" />
                            </a>
                          </Link>
                          <Link href={`/admin/editor/${article.id}`}>
                            <a className="text-green-600 hover:text-green-900" title="Editar noticia">
                              <Edit className="w-5 h-5" />
                            </a>
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar noticia"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Artículos por Categoría
              </h3>
              <div className="space-y-3">
                {['Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura'].map(cat => {
                  const count = articles.filter(a => a.category === cat).length;
                  const percentage = (count / articles.length) * 100;
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{cat}</span>
                        <span className="text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Engagement por Artículo
              </h3>
              <div className="space-y-3">
                {topArticles.slice(0, 5).map(article => {
                  const engagement = article.likes + article.shares;
                  const maxEngagement = Math.max(...articles.map(a => a.likes + a.shares));
                  const percentage = (engagement / maxEngagement) * 100;
                  return (
                    <div key={article.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 line-clamp-1">
                          {article.title}
                        </span>
                        <span className="text-gray-500">{formatNumber(engagement)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardFull;

