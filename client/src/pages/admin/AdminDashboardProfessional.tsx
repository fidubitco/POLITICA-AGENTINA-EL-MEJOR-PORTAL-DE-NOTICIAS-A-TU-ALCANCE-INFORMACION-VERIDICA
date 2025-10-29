/**
 * 🎯 ADMIN DASHBOARD PROFESSIONAL
 * Dashboard completo con CMS, CRM y AI Creator integrados
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Edit,
  BarChart3,
  Users,
  Settings,
  TrendingUp,
  Eye,
  ThumbsUp,
  Share2,
  Sparkles,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  Newspaper,
  Brain,
  Zap,
} from 'lucide-react';
import { allArticles } from '../../data/allNews';

export const AdminDashboardProfessional: React.FC = () => {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Cargar usuario desde localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setLocation('/admin/login');
  };

  // Estadísticas
  const stats = {
    totalArticles: allArticles.length,
    publishedArticles: allArticles.filter(a => a.status === 'published').length,
    draftArticles: allArticles.filter(a => a.status === 'draft').length,
    totalViews: allArticles.reduce((sum, a) => sum + (a.views || 0), 0),
    totalLikes: allArticles.reduce((sum, a) => sum + (a.likes || 0), 0),
    totalShares: allArticles.reduce((sum, a) => sum + (a.shares || 0), 0),
  };

  // Artículos recientes
  const recentArticles = allArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  // Artículos más leídos
  const topArticles = allArticles
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Crear Noticia',
      icon: PlusCircle,
      href: '/admin/crear-noticia',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'CMS Editor',
      icon: Edit,
      href: '/admin/cms',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'AI Creator',
      icon: Brain,
      href: '/admin/ai-creator',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Artículos',
      icon: FileText,
      href: '/admin/articles',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'SEO Auditor',
      icon: Search,
      href: '/admin/seo-auditor',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Usuarios',
      icon: Users,
      href: '/admin/users',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
  ];

  const quickActions = [
    {
      title: 'Nueva Noticia',
      description: 'Crear artículo desde cero',
      icon: PlusCircle,
      href: '/admin/crear-noticia',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'AI Creator',
      description: 'Generar con inteligencia artificial',
      icon: Sparkles,
      href: '/admin/ai-creator',
      color: 'bg-gradient-to-br from-pink-500 to-purple-600',
    },
    {
      title: 'CMS Editor',
      description: 'Editor visual completo',
      icon: Edit,
      href: '/admin/cms',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Ver Sitio',
      description: 'Ir al sitio público',
      icon: Home,
      href: '/',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 fixed h-full z-30`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-gray-50 ${
                  sidebarOpen ? '' : 'justify-center'
                }`}
              >
                <div className={`${item.bgColor} p-2 rounded-lg`}>
                  <item.icon size={20} className={item.color} />
                </div>
                {sidebarOpen && (
                  <span className="text-sm font-medium text-gray-700">
                    {item.title}
                  </span>
                )}
              </a>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'Administrador'}
                </p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@politicaargentina.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">Bienvenido al panel de administración</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/">
              <a className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                <Home size={16} />
                Ver Sitio
              </a>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <span className="text-sm font-medium text-gray-500">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalArticles}</h3>
              <p className="text-sm text-gray-500">Artículos</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Eye className="text-green-600" size={24} />
                </div>
                <span className="text-sm font-medium text-gray-500">Vistas</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalViews.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">Visualizaciones</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <ThumbsUp className="text-pink-600" size={24} />
                </div>
                <span className="text-sm font-medium text-gray-500">Likes</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalLikes.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">Me gusta</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Share2 className="text-purple-600" size={24} />
                </div>
                <span className="text-sm font-medium text-gray-500">Shares</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalShares.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">Compartidos</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <a className={`${action.color} rounded-xl p-6 text-white hover:opacity-90 transition-opacity`}>
                    <action.icon size={32} className="mb-3" />
                    <h4 className="text-lg font-bold mb-1">{action.title}</h4>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Articles */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Artículos Recientes</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {article.views?.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp size={12} />
                            {article.likes?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Link href={`/admin/editor/${article.id}`}>
                        <a className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit size={16} className="text-gray-600" />
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Articles */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Más Leídos</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topArticles.map((article, index) => (
                    <div key={article.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {article.views?.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp size={12} />
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardProfessional;

