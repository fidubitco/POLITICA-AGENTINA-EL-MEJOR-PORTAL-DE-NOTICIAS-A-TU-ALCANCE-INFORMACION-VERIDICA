/**
 * 🎯 ADMIN DASHBOARD ENTERPRISE GRADE
 * Sistema completo de administración con Shadcn UI
 */

import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  TrendingUp,
  Eye,
  ThumbsUp,
  Share2,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Tag,
  Image as ImageIcon,
  Globe,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import { allArticles } from '../../data/allNews';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

export const AdminDashboardEnterprise = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Estadísticas
  const totalArticles = allArticles.length;
  const publishedArticles = allArticles.filter(a => a.status === 'published').length;
  const draftArticles = allArticles.filter(a => a.status === 'draft').length;
  const totalViews = allArticles.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = allArticles.reduce((sum, a) => sum + a.likes, 0);
  const totalShares = allArticles.reduce((sum, a) => sum + a.shares, 0);

  // Artículos recientes
  const recentArticles = [...allArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 10);

  // Top artículos por views
  const topArticles = [...allArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { id: 'cms', icon: Edit, label: 'Editor CMS', href: '/admin/cms' },
    { id: 'articles', icon: FileText, label: 'Artículos', href: '/admin/articles' },
    { id: 'create', icon: Plus, label: 'Crear Noticia', href: '/admin/crear-noticia' },
    { id: 'users', icon: Users, label: 'Usuarios', href: '/admin/users' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { id: 'settings', icon: Settings, label: 'Configuración', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col fixed h-full z-50`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇦🇷</span>
              <span className="font-bold">Admin</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href}>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link href="/">
            <a className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition text-gray-300">
              <Globe size={20} />
              {sidebarOpen && <span>Ver Sitio</span>}
            </a>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido al panel de administración</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <FileText size={24} />
                <Badge className="bg-white/20">Total</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{totalArticles}</div>
              <div className="text-blue-100">Artículos</div>
              <div className="mt-4 text-sm">
                {publishedArticles} publicados • {draftArticles} borradores
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <Eye size={24} />
                <TrendingUp size={20} />
              </div>
              <div className="text-3xl font-bold mb-1">{formatNumber(totalViews)}</div>
              <div className="text-green-100">Visualizaciones</div>
              <div className="mt-4 text-sm">
                Promedio: {formatNumber(Math.round(totalViews / totalArticles))} por artículo
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <ThumbsUp size={24} />
                <TrendingUp size={20} />
              </div>
              <div className="text-3xl font-bold mb-1">{formatNumber(totalLikes)}</div>
              <div className="text-purple-100">Me Gusta</div>
              <div className="mt-4 text-sm">
                Promedio: {formatNumber(Math.round(totalLikes / totalArticles))} por artículo
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <Share2 size={24} />
                <TrendingUp size={20} />
              </div>
              <div className="text-3xl font-bold mb-1">{formatNumber(totalShares)}</div>
              <div className="text-orange-100">Compartidos</div>
              <div className="mt-4 text-sm">
                Promedio: {formatNumber(Math.round(totalShares / totalArticles))} por artículo
              </div>
            </Card>
          </div>

          {/* Top Articles */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Top 5 Artículos</h2>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Exportar
              </Button>
            </div>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{article.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        {formatNumber(article.likes)}
                      </span>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                  </div>
                  <Link href={`/admin/editar/${article.id}`}>
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Articles */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Artículos Recientes</h2>
              <div className="flex items-center gap-2">
                <Input placeholder="Buscar..." className="w-64" />
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filtrar
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Artículo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Categoría</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Views</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recentArticles.map((article) => (
                    <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-900 line-clamp-1">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-600">{article.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{article.category}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            article.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {article.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{formatNumber(article.views)}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/editor/${article.id}`}>
                            <Button variant="ghost" size="sm" title="Editar noticia">
                              <Edit size={16} />
                            </Button>
                          </Link>
                          <Link href={`/noticia/${article.id}`}>
                            <Button variant="ghost" size="sm" title="Ver noticia">
                              <Eye size={16} />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-red-600" title="Eliminar noticia">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin/crear-noticia">
              <Card className="p-6 hover:shadow-lg transition cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
                <Plus size={32} className="text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Crear Noticia</h3>
                <p className="text-gray-600">Publica un nuevo artículo</p>
              </Card>
            </Link>

            <Link href="/admin/analytics">
              <Card className="p-6 hover:shadow-lg transition cursor-pointer bg-gradient-to-br from-green-50 to-green-100">
                <BarChart3 size={32} className="text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ver Analytics</h3>
                <p className="text-gray-600">Analiza el rendimiento</p>
              </Card>
            </Link>

            <Link href="/admin/settings">
              <Card className="p-6 hover:shadow-lg transition cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100">
                <Settings size={32} className="text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Configuración</h3>
                <p className="text-gray-600">Ajusta el sistema</p>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardEnterprise;

