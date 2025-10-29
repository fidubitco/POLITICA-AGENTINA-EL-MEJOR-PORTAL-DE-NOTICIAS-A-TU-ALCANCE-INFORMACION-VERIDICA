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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl transition-all duration-300 fixed h-full z-30`}
      >
        {/* Logo */}
        <div className="h-20 border-b border-gray-200/50 flex items-center justify-between px-6 bg-gradient-to-r from-blue-600 to-purple-600">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Newspaper className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Política Argentina</h1>
                <p className="text-xs text-blue-100">Panel Administrativo</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/20 rounded-lg transition-all text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md hover:scale-[1.02] ${
                  sidebarOpen ? '' : 'justify-center'
                }`}
              >
                <div className={`${item.bgColor} p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-sm`}>
                  <item.icon size={20} className={item.color} />
                </div>
                {sidebarOpen && (
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                      {item.title}
                    </span>
                  </div>
                )}
                {sidebarOpen && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                )}
              </a>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 bg-gradient-to-t from-white to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">
                  {user?.name || 'Administrador'}
                </p>
                <p className="text-xs text-gray-600">{user?.email || 'admin@politicaargentina.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg text-sm font-semibold"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <p className="text-sm text-gray-600 font-medium">Bienvenido al panel de administración</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all group">
              <Bell size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg"></span>
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            </button>
            <Link href="/">
              <a className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm font-semibold">
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
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-blue-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="px-3 py-1 bg-blue-50 rounded-full">
                  <span className="text-xs font-bold text-blue-600">Total</span>
                </div>
              </div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">
                {stats.totalArticles}
              </h3>
              <p className="text-sm text-gray-600 font-medium">Artículos Publicados</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-green-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="text-white" size={24} />
                </div>
                <div className="px-3 py-1 bg-green-50 rounded-full">
                  <span className="text-xs font-bold text-green-600">Vistas</span>
                </div>
              </div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-1">
                {stats.totalViews.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 font-medium">Visualizaciones Totales</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-pink-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <ThumbsUp className="text-white" size={24} />
                </div>
                <div className="px-3 py-1 bg-pink-50 rounded-full">
                  <span className="text-xs font-bold text-pink-600">Likes</span>
                </div>
              </div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent mb-1">
                {stats.totalLikes.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 font-medium">Me Gusta Recibidos</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-purple-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Share2 className="text-white" size={24} />
                </div>
                <div className="px-3 py-1 bg-purple-50 rounded-full">
                  <span className="text-xs font-bold text-purple-600">Shares</span>
                </div>
              </div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-1">
                {stats.totalShares.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 font-medium">Veces Compartido</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              <h3 className="text-2xl font-black text-gray-900">Acciones Rápidas</h3>
              <Zap size={24} className="text-yellow-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <a className={`group ${action.color} rounded-2xl p-6 text-white hover:scale-[1.05] hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                        <action.icon size={28} />
                      </div>
                      <h4 className="text-xl font-black mb-2">{action.title}</h4>
                      <p className="text-sm opacity-90 font-medium">{action.description}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Articles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <Newspaper size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Artículos Recientes</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="group flex items-start gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all hover:shadow-md">
                      <div className="relative">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-gray-600 font-medium">
                            <Eye size={14} className="text-blue-500" />
                            {article.views?.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600 font-medium">
                            <ThumbsUp size={14} className="text-pink-500" />
                            {article.likes?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Link href={`/admin/editor/${article.id}`}>
                        <a className="p-2.5 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md">
                          <Edit size={18} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Articles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Más Leídos</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {topArticles.map((article, index) => (
                    <div key={article.id} className="group flex items-start gap-4 p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-xl transition-all hover:shadow-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-gray-600 font-medium">
                            <Eye size={14} className="text-orange-500" />
                            {article.views?.toLocaleString()}
                          </span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-bold">
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

