/**
 * 🎯 ADMIN PANEL AWWARD - WORLD-CLASS
 * Panel de administración profesional para crear, editar y controlar noticias
 * Diseño premium, intuitivo y potente
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard, FileText, PlusCircle, Edit3, Trash2, Eye, ThumbsUp,
  Share2, TrendingUp, Search, Filter, Download, Upload, Settings,
  LogOut, Menu, X, Save, Image as ImageIcon, Tag, Calendar, User
} from 'lucide-react';
import { allArticles, Article } from '../../data/allNews';
import { categories } from '../../data/categories';
import { NewsImage } from '../../components/NewsImage';

export const AdminPanelAwward: React.FC = () => {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'articles' | 'create' | 'edit'>('dashboard');
  const [articles, setArticles] = useState<Article[]>(allArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');

  // Estadísticas
  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
    views: articles.reduce((sum, a) => sum + a.views, 0),
    likes: articles.reduce((sum, a) => sum + a.likes, 0),
    shares: articles.reduce((sum, a) => sum + a.shares, 0),
  };

  // Filtrar y ordenar artículos
  const filteredArticles = articles
    .filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || a.categorySlug === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'likes') return b.likes - a.likes;
      return 0;
    });

  // Crear nueva noticia
  const handleCreateArticle = () => {
    setSelectedArticle({
      id: Date.now(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'politica',
      categorySlug: 'politica',
      author: 'Admin',
      imageUrl: '',
      status: 'draft',
      featured: false,
      breaking: false,
      views: 0,
      likes: 0,
      shares: 0,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
    });
    setCurrentView('create');
  };

  // Editar noticia
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('edit');
  };

  // Guardar noticia
  const handleSaveArticle = () => {
    if (!selectedArticle) return;

    if (currentView === 'create') {
      setArticles([selectedArticle, ...articles]);
      alert('✅ Noticia creada exitosamente');
    } else {
      setArticles(articles.map(a => a.id === selectedArticle.id ? selectedArticle : a));
      alert('✅ Noticia actualizada exitosamente');
    }
    
    setCurrentView('articles');
    setSelectedArticle(null);
  };

  // Eliminar noticia
  const handleDeleteArticle = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      setArticles(articles.filter(a => a.id !== id));
      alert('✅ Noticia eliminada exitosamente');
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    if (confirm('¿Cerrar sesión?')) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setLocation('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-black/50 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 fixed h-full z-50 flex flex-col`}>
        {/* Header */}
        <div className="h-20 border-b border-gray-700/50 flex items-center justify-between px-6">
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
                ADMIN
              </h1>
              <p className="text-xs text-gray-400">Panel de Control</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'dashboard'
                ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50'
                : 'hover:bg-gray-700/50'
            }`}
          >
            <LayoutDashboard size={20} />
            {sidebarOpen && <span className="font-semibold">Dashboard</span>}
          </button>

          <button
            onClick={() => setCurrentView('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'articles'
                ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50'
                : 'hover:bg-gray-700/50'
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span className="font-semibold">Noticias</span>}
          </button>

          <button
            onClick={handleCreateArticle}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/50 transition-all"
          >
            <PlusCircle size={20} />
            {sidebarOpen && <span className="font-semibold">Crear Noticia</span>}
          </button>

          <div className="pt-4 border-t border-gray-700/50 mt-4">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-all"
            >
              <Settings size={20} />
              {sidebarOpen && <span className="font-semibold">Configuración</span>}
            </button>
          </div>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-700/50">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center font-bold">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-sm">Administrador</p>
                <p className="text-xs text-gray-400">admin@politicaargentina.com</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-400 text-sm font-semibold"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-80' : 'ml-20'} transition-all duration-300`}>
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="p-8">
            <h2 className="text-4xl font-black mb-8">Dashboard</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 text-blue-400" />
                  <span className="text-3xl font-black">{stats.total}</span>
                </div>
                <p className="text-gray-400 text-sm">Total Noticias</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-8 h-8 text-green-400" />
                  <span className="text-3xl font-black">{(stats.views / 1000).toFixed(1)}k</span>
                </div>
                <p className="text-gray-400 text-sm">Visualizaciones</p>
              </div>

              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
                <div className="flex items-center justify-between mb-4">
                  <ThumbsUp className="w-8 h-8 text-pink-400" />
                  <span className="text-3xl font-black">{stats.likes}</span>
                </div>
                <p className="text-gray-400 text-sm">Me Gusta</p>
              </div>
            </div>

            {/* Top Articles */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-red-500" />
                Noticias Más Leídas
              </h3>
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={article.id} className="flex items-center gap-4 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                    <span className="text-3xl font-black text-gray-600">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <NewsImage
                        src={article.imageUrl}
                        alt={article.title}
                        category={article.categorySlug}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 line-clamp-1">{article.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {article.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          {article.shares}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditArticle(article)}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors text-blue-400 text-sm font-semibold"
                    >
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Articles View */}
        {currentView === 'articles' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black">Gestión de Noticias</h2>
              <button
                onClick={handleCreateArticle}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all"
              >
                <PlusCircle size={20} />
                Nueva Noticia
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar noticias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
              >
                <option value="date">Más recientes</option>
                <option value="views">Más vistas</option>
                <option value="likes">Más gustadas</option>
              </select>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 hover:border-red-500/50 transition-all">
                  <div className="relative h-48">
                    <NewsImage
                      src={article.imageUrl}
                      alt={article.title}
                      category={article.categorySlug}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {article.likes}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors text-blue-400 text-sm font-semibold"
                      >
                        <Edit3 size={14} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-400 text-sm font-semibold"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create/Edit View */}
        {(currentView === 'create' || currentView === 'edit') && selectedArticle && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black">
                {currentView === 'create' ? 'Crear Nueva Noticia' : 'Editar Noticia'}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCurrentView('articles');
                    setSelectedArticle(null);
                  }}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveArticle}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  <Save size={20} />
                  Guardar
                </button>
              </div>
            </div>

            <div className="max-w-4xl space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Título *
                </label>
                <input
                  type="text"
                  value={selectedArticle.title}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
                  placeholder="Título de la noticia"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>

              {/* Extracto */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Extracto *
                </label>
                <textarea
                  value={selectedArticle.excerpt}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, excerpt: e.target.value })}
                  placeholder="Resumen breve de la noticia"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                />
              </div>

              {/* Contenido */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Contenido *
                </label>
                <textarea
                  value={selectedArticle.content}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
                  placeholder="Contenido completo de la noticia (HTML permitido)"
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors resize-none font-mono text-sm"
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Categoría *
                </label>
                <select
                  value={selectedArticle.categorySlug}
                  onChange={(e) => setSelectedArticle({ 
                    ...selectedArticle, 
                    categorySlug: e.target.value,
                    category: categories.find(c => c.slug === e.target.value)?.name || e.target.value
                  })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* URL de Imagen */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  URL de Imagen *
                </label>
                <input
                  type="text"
                  value={selectedArticle.imageUrl}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                />
                {selectedArticle.imageUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden">
                    <NewsImage
                      src={selectedArticle.imageUrl}
                      alt="Preview"
                      category={selectedArticle.categorySlug}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Opciones */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedArticle.featured}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, featured: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-800/50 border-gray-700/50 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm font-semibold">Destacada</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedArticle.breaking}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, breaking: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-800/50 border-gray-700/50 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm font-semibold">Última Hora</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanelAwward;

