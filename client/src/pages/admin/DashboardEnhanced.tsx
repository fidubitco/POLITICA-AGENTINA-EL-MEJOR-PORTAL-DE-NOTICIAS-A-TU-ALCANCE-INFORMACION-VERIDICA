import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Share2,
  FileText,
  Eye,
  Activity,
  Calendar,
  Globe,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { PremiumCard, PremiumButton, PremiumBadge } from '../../components/ui/premium';
import { MegaSEO } from '../../components/MegaSEO';
import '../../styles/dashboard-premium.css';

interface DashboardStats {
  totalViews: number;
  activeUsers: number;
  totalShares: number;
  totalArticles: number;
  viewsTrend: number;
  usersTrend: number;
  sharesTrend: number;
  articlesTrend: number;
}

interface ChartData {
  name: string;
  views: number;
  visitors: number;
  shares?: number;
  likes?: number;
}

interface CategoryData {
  category: string;
  count: number;
  total_views: number;
}

interface LanguageData {
  language: string;
  users: number;
  percentage: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const DashboardEnhanced = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalViews: 0,
    activeUsers: 0,
    totalShares: 0,
    totalArticles: 0,
    viewsTrend: 0,
    usersTrend: 0,
    sharesTrend: 0,
    articlesTrend: 0,
  });

  const [viewsData, setViewsData] = useState<ChartData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [languageData, setLanguageData] = useState<LanguageData[]>([]);
  const [engagementData, setEngagementData] = useState<ChartData[]>([]);
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [timeFilter]);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      // Simular datos (en producción, vendría de la API)
      // Mock stats
      setStats({
        totalViews: 245680,
        activeUsers: 3420,
        totalShares: 12850,
        totalArticles: 156,
        viewsTrend: 12.5,
        usersTrend: 8.3,
        sharesTrend: -2.1,
        articlesTrend: 5.7,
      });

      // Mock views data
      const days = timeFilter === '7d' ? 7 : timeFilter === '30d' ? 30 : 90;
      const mockViewsData: ChartData[] = [];
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockViewsData.push({
          name: date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }),
          views: Math.floor(Math.random() * 5000) + 3000,
          visitors: Math.floor(Math.random() * 2000) + 1000,
        });
      }
      setViewsData(mockViewsData);

      // Mock category data
      setCategoryData([
        { category: 'Política', count: 45, total_views: 125000 },
        { category: 'Economía', count: 32, total_views: 98000 },
        { category: 'Sociedad', count: 28, total_views: 87000 },
        { category: 'Internacional', count: 24, total_views: 65000 },
        { category: 'Deportes', count: 18, total_views: 45000 },
        { category: 'Cultura', count: 9, total_views: 25000 },
      ]);

      // Mock language data
      setLanguageData([
        { language: 'Español', users: 15420, percentage: 68 },
        { language: 'English', users: 4850, percentage: 21 },
        { language: 'Português', users: 1820, percentage: 8 },
        { language: 'Français', users: 680, percentage: 3 },
      ]);

      // Mock engagement data
      const mockEngagementData: ChartData[] = [];
      for (let i = 14; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockEngagementData.push({
          name: date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }),
          views: Math.floor(Math.random() * 5000) + 3000,
          shares: Math.floor(Math.random() * 500) + 200,
          likes: Math.floor(Math.random() * 800) + 400,
          visitors: 0,
        });
      }
      setEngagementData(mockEngagementData);
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    trend,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string | number;
    trend: number;
    icon: any;
    color: string;
  }) => (
    <PremiumCard className="dashboard-stat-card">
      <div className="dashboard-stat-header">
        <div className={`dashboard-stat-icon ${color}`}>
          <Icon size={24} />
        </div>
        <div className={`dashboard-stat-trend ${trend >= 0 ? 'up' : 'down'}`}>
          {trend >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="dashboard-stat-value">{value.toLocaleString()}</div>
      <div className="dashboard-stat-label">{title}</div>
    </PremiumCard>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Dashboard - Admin"
        description="Panel de administración con analytics en tiempo real"
        noIndex={true}
      />

      <div className="dashboard-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
            <p className="text-gray-600">Métricas y estadísticas en tiempo real</p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
            </select>
            <Link href="/admin/crear-noticia">
              <PremiumButton variant="primary" icon={<FileText size={18} />}>
                Nueva Noticia
              </PremiumButton>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats-grid mb-8">
          <StatCard
            title="Total de Vistas"
            value={stats.totalViews}
            trend={stats.viewsTrend}
            icon={Eye}
            color="blue"
          />
          <StatCard
            title="Usuarios Activos"
            value={stats.activeUsers}
            trend={stats.usersTrend}
            icon={Users}
            color="green"
          />
          <StatCard
            title="Compartidos"
            value={stats.totalShares}
            trend={stats.sharesTrend}
            icon={Share2}
            color="yellow"
          />
          <StatCard
            title="Artículos"
            value={stats.totalArticles}
            trend={stats.articlesTrend}
            icon={FileText}
            color="red"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Views Chart */}
          <PremiumCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Vistas y Visitantes
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Vistas"
                  dot={{ fill: '#3b82f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Visitantes"
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </PremiumCard>

          {/* Category Chart */}
          <PremiumCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText size={20} />
              Artículos por Categoría
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Artículos" />
              </BarChart>
            </ResponsiveContainer>
          </PremiumCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Language Distribution */}
          <PremiumCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe size={20} />
              Usuarios por Idioma
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </PremiumCard>

          {/* Engagement Chart */}
          <PremiumCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity size={20} />
              Engagement (Últimos 14 días)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Vistas"
                />
                <Area
                  type="monotone"
                  dataKey="shares"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Compartidos"
                />
                <Area
                  type="monotone"
                  dataKey="likes"
                  stackId="3"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  name="Likes"
                />
              </AreaChart>
            </ResponsiveContainer>
          </PremiumCard>
        </div>

        {/* Quick Actions */}
        <PremiumCard>
          <h3 className="text-xl font-bold mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/crear-noticia">
              <PremiumButton variant="secondary" fullWidth icon={<FileText size={18} />}>
                Crear Noticia
              </PremiumButton>
            </Link>
            <Link href="/admin/auto-noticias">
              <PremiumButton variant="secondary" fullWidth icon={<Activity size={18} />}>
                Auto Noticias
              </PremiumButton>
            </Link>
            <PremiumButton variant="secondary" fullWidth icon={<Users size={18} />}>
              Usuarios
            </PremiumButton>
            <PremiumButton variant="secondary" fullWidth icon={<Calendar size={18} />}>
              Programadas
            </PremiumButton>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
};

