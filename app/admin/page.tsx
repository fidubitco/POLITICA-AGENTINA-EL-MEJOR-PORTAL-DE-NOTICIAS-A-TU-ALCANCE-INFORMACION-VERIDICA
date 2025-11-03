'use client';

import { 
  FileText, 
  Eye, 
  Users, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { todasLasNoticias } from '../data/noticias-completas';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalNoticias: 0,
    noticiasHoy: 0,
    totalVistas: 0,
    vistasHoy: 0,
    usuarios: 0,
    categorias: 5,
  });

  const [recentNews, setRecentNews] = useState<any[]>([]);

  useEffect(() => {
    // Calcular estadísticas
    const total = todasLasNoticias.length;
    const totalViews = todasLasNoticias.reduce((sum, n) => sum + n.views, 0);
    
    // Noticias de hoy (últimas 24 horas)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newsToday = todasLasNoticias.filter(n => n.publishedAt >= today).length;
    
    setStats({
      totalNoticias: total,
      noticiasHoy: newsToday,
      totalVistas: totalViews,
      vistasHoy: Math.floor(totalViews * 0.15), // Simulado: 15% del total
      usuarios: 3,
      categorias: 5,
    });

    // Últimas noticias
    const recent = todasLasNoticias
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 10);
    setRecentNews(recent);
  }, []);

  const statCards = [
    {
      name: 'Total Noticias',
      value: stats.totalNoticias,
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'blue',
    },
    {
      name: 'Vistas Totales',
      value: stats.totalVistas.toLocaleString(),
      change: '+23%',
      trend: 'up',
      icon: Eye,
      color: 'green',
    },
    {
      name: 'Noticias Hoy',
      value: stats.noticiasHoy,
      change: '+5',
      trend: 'up',
      icon: Calendar,
      color: 'purple',
    },
    {
      name: 'Usuarios Activos',
      value: stats.usuarios,
      change: '0%',
      trend: 'neutral',
      icon: Users,
      color: 'orange',
    },
  ];

  const topCategories = [
    { name: 'Economía', count: 30, percentage: 20 },
    { name: 'Política', count: 30, percentage: 20 },
    { name: 'Judicial', count: 30, percentage: 20 },
    { name: 'Internacional', count: 30, percentage: 20 },
    { name: 'Sociedad', count: 30, percentage: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido al panel de administración de Política Argentina</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
          }[stat.color];

          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Noticias por Categoría</h2>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-600">{category.count} noticias</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/noticias/nueva"
              className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Nueva Noticia</span>
            </a>
            <a
              href="/admin/noticias"
              className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
            >
              <Eye className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Ver Noticias</span>
            </a>
            <a
              href="/admin/categorias"
              className="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
            >
              <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Categorías</span>
            </a>
            <a
              href="/admin/usuarios"
              className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer"
            >
              <Users className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Usuarios</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recent News Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Noticias Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
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
              {recentNews.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-md">
                        {news.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      news.categorySlug === 'economia' ? 'bg-green-100 text-green-800' :
                      news.categorySlug === 'politica' ? 'bg-blue-100 text-blue-800' :
                      news.categorySlug === 'judicial' ? 'bg-red-100 text-red-800' :
                      news.categorySlug === 'internacional' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {news.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {news.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {news.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(news.publishedAt).toLocaleDateString('es-AR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 font-medium">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
