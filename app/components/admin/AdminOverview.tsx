import { allArticles } from '@/data/allNews';
import { categories } from '@/data/categories';
import {
  Newspaper,
  Users,
  TrendingUp,
  Eye,
  FileText,
  BarChart3,
  Clock,
  AlertCircle
} from 'lucide-react';

export function AdminOverview() {
  // Estadísticas principales
  const totalArticles = allArticles.length;
  const publishedArticles = allArticles.filter(a => a.status === 'published').length;
  const totalViews = allArticles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = allArticles.reduce((sum, article) => sum + article.likes, 0);
  const recentArticles = allArticles.filter(article => {
    const articleDate = new Date(article.publishedAt);
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return articleDate > oneWeekAgo;
  }).length;

  // Artículos por categoría
  const articlesByCategory = categories.map(category => ({
    ...category,
    count: allArticles.filter(a => a.categorySlug === category.slug).length
  })).sort((a, b) => b.count - a.count);

  // Artículos más populares
  const topArticles = allArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Newspaper className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Artículos</p>
              <p className="text-2xl font-bold text-gray-900">{totalArticles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Publicados</p>
              <p className="text-2xl font-bold text-gray-900">{publishedArticles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vistas</p>
              <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Esta Semana</p>
              <p className="text-2xl font-bold text-gray-900">{recentArticles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y estadísticas detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artículos por categoría */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Artículos por Categoría</h3>
          <div className="space-y-4">
            {articlesByCategory.slice(0, 8).map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Artículos más populares */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Artículos Más Populares</h3>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div key={article.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas y notificaciones */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Notificaciones del Sistema
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Sistema funcionando correctamente</li>
              <li>• {publishedArticles} artículos publicados activos</li>
              <li>• Base de datos actualizada</li>
              <li>• Próxima actualización automática en 24 horas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Crear Artículo</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">Ver Analytics</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Gestionar Usuarios</span>
          </button>
        </div>
      </div>
    </div>
  );
}

