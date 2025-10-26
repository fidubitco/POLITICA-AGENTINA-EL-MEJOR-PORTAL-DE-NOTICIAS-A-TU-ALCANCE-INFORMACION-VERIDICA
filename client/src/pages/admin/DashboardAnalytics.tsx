import { useState, useEffect } from 'react';
import { BBCHeader } from '../../components/BBCHeader';
import { MegaSEO } from '../../components/MegaSEO';
import { newsData } from '../../data/newsData';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Share2, 
  Clock,
  BarChart3,
  Globe,
  Newspaper,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Link } from 'wouter';
import '../../styles/bbc-style.css';

interface AnalyticsData {
  totalViews: number;
  totalArticles: number;
  totalShares: number;
  activeUsers: number;
  avgReadTime: string;
  topArticles: Array<{
    id: number;
    title: string;
    views: number;
    shares: number;
    category: string;
  }>;
  categoryStats: Array<{
    category: string;
    articles: number;
    views: number;
    percentage: number;
  }>;
  languageStats: Array<{
    language: string;
    users: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    time: string;
    action: string;
    details: string;
  }>;
}

export const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    totalArticles: 0,
    totalShares: 0,
    activeUsers: 0,
    avgReadTime: '0:00',
    topArticles: [],
    categoryStats: [],
    languageStats: [],
    recentActivity: [],
  });

  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    // Simular datos analíticos reales
    const generateAnalytics = () => {
      // Calcular estadísticas por categoría
      const categories = ['Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura'];
      const categoryStats = categories.map(cat => {
        const articles = newsData.filter(n => n.category === cat).length;
        const views = Math.floor(Math.random() * 10000) + 5000;
        return {
          category: cat,
          articles,
          views,
          percentage: (articles / newsData.length) * 100,
        };
      });

      // Top artículos más vistos
      const topArticles = newsData
        .map(article => ({
          id: article.id,
          title: article.title,
          views: Math.floor(Math.random() * 5000) + 1000,
          shares: Math.floor(Math.random() * 500) + 100,
          category: article.category,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Estadísticas de idiomas
      const languageStats = [
        { language: 'Español', users: 12543, percentage: 65 },
        { language: 'English', users: 4821, percentage: 25 },
        { language: 'Português', users: 1446, percentage: 7.5 },
        { language: 'Français', users: 578, percentage: 2.5 },
      ];

      // Actividad reciente
      const recentActivity = [
        { time: 'Hace 2 min', action: 'Nueva visita', details: 'Usuario de Buenos Aires' },
        { time: 'Hace 5 min', action: 'Artículo compartido', details: 'Dólar blue alcanza nuevo récord' },
        { time: 'Hace 8 min', action: 'Nueva suscripción', details: 'Newsletter' },
        { time: 'Hace 12 min', action: 'Comentario nuevo', details: 'En artículo de Política' },
        { time: 'Hace 15 min', action: 'Nueva visita', details: 'Usuario de Córdoba' },
      ];

      setAnalytics({
        totalViews: 48523,
        totalArticles: newsData.length,
        totalShares: 3421,
        activeUsers: 1247,
        avgReadTime: '3:42',
        topArticles,
        categoryStats,
        languageStats,
        recentActivity,
      });
    };

    generateAnalytics();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(generateAnalytics, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    change, 
    changeType 
  }: { 
    icon: any; 
    title: string; 
    value: string | number; 
    change: string; 
    changeType: 'up' | 'down' 
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-[#bb1919]/10 rounded-lg">
          <Icon className="text-[#bb1919]" size={24} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          changeType === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {changeType === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-[#1a1a1a]">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Dashboard Analytics - Panel de Control"
        description="Dashboard de analytics y estadísticas del portal de noticias Política Argentina"
        url="https://politicaargentina.com/admin/dashboard"
      />
      <BBCHeader />

      <div className="container-bbc py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Dashboard Analytics</h1>
              <p className="text-gray-600">Panel de control y estadísticas en tiempo real</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('today')}
                className={`px-4 py-2 rounded font-medium transition ${
                  timeRange === 'today'
                    ? 'bg-[#bb1919] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Hoy
              </button>
              <button
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 rounded font-medium transition ${
                  timeRange === 'week'
                    ? 'bg-[#bb1919] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-4 py-2 rounded font-medium transition ${
                  timeRange === 'month'
                    ? 'bg-[#bb1919] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Mes
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Eye}
            title="Vistas Totales"
            value={analytics.totalViews.toLocaleString()}
            change="+12.5%"
            changeType="up"
          />
          <StatCard
            icon={Users}
            title="Usuarios Activos"
            value={analytics.activeUsers.toLocaleString()}
            change="+8.2%"
            changeType="up"
          />
          <StatCard
            icon={Share2}
            title="Compartidos"
            value={analytics.totalShares.toLocaleString()}
            change="+15.3%"
            changeType="up"
          />
          <StatCard
            icon={Newspaper}
            title="Artículos Publicados"
            value={analytics.totalArticles}
            change="+4"
            changeType="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Articles */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <TrendingUp size={24} className="text-[#bb1919]" />
                Artículos Más Vistos
              </h2>
            </div>
            <div className="space-y-4">
              {analytics.topArticles.map((article, index) => (
                <div key={article.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="text-2xl font-bold text-gray-400 w-8">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <Link href={`/noticia/${article.id}`}>
                      <a className="font-semibold text-[#1a1a1a] hover:text-[#bb1919] line-clamp-2">
                        {article.title}
                      </a>
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {article.views.toLocaleString()} vistas
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 size={14} />
                        {article.shares} compartidos
                      </span>
                      <span className="px-2 py-1 bg-[#bb1919] text-white text-xs rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <BarChart3 size={24} className="text-[#bb1919]" />
              Por Categoría
            </h2>
            <div className="space-y-4">
              {analytics.categoryStats.map((stat) => (
                <div key={stat.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{stat.category}</span>
                    <span className="text-sm text-gray-600">{stat.articles} artículos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#bb1919] h-2 rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{stat.views.toLocaleString()} vistas</span>
                    <span>{stat.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Language Stats & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Language Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <Globe size={24} className="text-[#bb1919]" />
              Usuarios por Idioma
            </h2>
            <div className="space-y-4">
              {analytics.languageStats.map((stat) => (
                <div key={stat.language} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-medium text-gray-700 w-24">{stat.language}</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#bb1919] h-2 rounded-full transition-all"
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-semibold text-[#1a1a1a]">
                      {stat.users.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{stat.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <Clock size={24} className="text-[#bb1919]" />
              Actividad Reciente
            </h2>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-[#bb1919] rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.details}</div>
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/crear-noticia">
            <a className="block p-6 bg-gradient-to-br from-[#bb1919] to-[#990000] text-white rounded-lg shadow-md hover:shadow-lg transition">
              <Newspaper size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Crear Noticia</h3>
              <p className="text-white/80">Publicar nueva noticia manualmente</p>
            </a>
          </Link>
          <Link href="/admin/auto-noticias">
            <a className="block p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition">
              <TrendingUp size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Auto Noticias</h3>
              <p className="text-white/80">Sistema automático de noticias</p>
            </a>
          </Link>
          <Link href="/admin/configuracion">
            <a className="block p-6 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-md hover:shadow-lg transition">
              <BarChart3 size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Configuración</h3>
              <p className="text-white/80">Ajustes del sistema</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
