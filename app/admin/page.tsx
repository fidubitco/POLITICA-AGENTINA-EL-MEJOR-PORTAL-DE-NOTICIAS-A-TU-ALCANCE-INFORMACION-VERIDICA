'use client';

import { 
  TrendingUp, 
  FileText, 
  Eye, 
  Users,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function AdminDashboard() {
  // Datos de ejemplo - en producción vendrían de la base de datos
  const stats = {
    totalNoticias: 30,
    vistasHoy: 156789,
    usuariosActivos: 8234,
    ingresosMes: 45230,
  };

  const recentNews = [
    { id: 1, title: 'Dólar blue alcanza los $1.445', views: 45230, status: 'published' },
    { id: 2, title: 'BCRA modifica encajes bancarios', views: 32100, status: 'published' },
    { id: 3, title: 'Inflación supera el 8,3%', views: 42100, status: 'published' },
    { id: 4, title: 'Milei anuncia reforma económica', views: 56780, status: 'published' },
    { id: 5, title: 'Exportaciones crecen 15%', views: 18900, status: 'draft' },
  ];

  const topCategories = [
    { name: 'Economía', count: 30, percentage: 33 },
    { name: 'Política', count: 25, percentage: 28 },
    { name: 'Judicial', count: 18, percentage: 20 },
    { name: 'Internacional', count: 12, percentage: 13 },
    { name: 'Sociedad', count: 5, percentage: 6 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido al panel de administración de Política Argentina</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Noticias</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalNoticias}</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>12% vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Vistas Hoy</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.vistasHoy.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>8% vs ayer</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Usuarios Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.usuariosActivos.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>15% vs semana anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Ingresos Mes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.ingresosMes.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span>3% vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Noticias Recientes</h2>
            <a href="/admin/noticias" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver todas
            </a>
          </div>
          <div className="space-y-4">
            {recentNews.map((news) => (
              <div key={news.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{news.title}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {news.views.toLocaleString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      news.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {news.status === 'published' ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Categorías Principales</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
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
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/noticias/nueva"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Nueva Noticia</span>
          </a>
          <a
            href="/admin/imagenes/subir"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Subir Imagen</span>
          </a>
          <a
            href="/admin/analytics"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Ver Analytics</span>
          </a>
        </div>
      </div>
    </div>
  );
}

