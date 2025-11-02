'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  TrendingUp,
  Users,
  Eye,
  ThumbsUp,
  Share,
  Newspaper,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

// ===========================================
// DATOS DE EJEMPLO PARA GRÁFICOS
// ===========================================

// Datos de vistas por día (últimos 30 días)
const generateViewsData = () => {
  const endDate = new Date();
  const startDate = subDays(endDate, 29);
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  return dates.map(date => ({
    date: format(date, 'dd/MM', { locale: es }),
    fullDate: date,
    views: Math.floor(Math.random() * 5000) + 1000,
    uniqueVisitors: Math.floor(Math.random() * 2000) + 500,
    pageViews: Math.floor(Math.random() * 8000) + 1500,
  }));
};

// Datos de artículos por categoría
const categoriesData = [
  { name: 'Política', articles: 45, views: 125000, color: '#3B82F6' },
  { name: 'Economía', articles: 32, views: 98000, color: '#10B981' },
  { name: 'Sociedad', articles: 28, views: 76000, color: '#F59E0B' },
  { name: 'Internacional', articles: 21, views: 54000, color: '#EF4444' },
  { name: 'Deportes', articles: 18, views: 42000, color: '#8B5CF6' },
  { name: 'Cultura', articles: 15, views: 38000, color: '#06B6D4' },
];

// Datos de engagement (vistas, likes, shares)
const engagementData = [
  { name: 'Lun', views: 4200, likes: 245, shares: 89, comments: 34 },
  { name: 'Mar', views: 3800, likes: 198, shares: 67, comments: 28 },
  { name: 'Mié', views: 5100, likes: 312, shares: 95, comments: 41 },
  { name: 'Jue', views: 4600, likes: 276, shares: 82, comments: 37 },
  { name: 'Vie', views: 5900, likes: 345, shares: 108, comments: 52 },
  { name: 'Sáb', views: 7200, likes: 423, shares: 134, comments: 68 },
  { name: 'Dom', views: 6500, likes: 387, shares: 121, comments: 59 },
];

// Datos de usuarios por idioma
const languageData = [
  { name: 'Español', value: 68, users: 6800, color: '#3B82F6' },
  { name: 'Inglés', value: 22, users: 2200, color: '#10B981' },
  { name: 'Portugués', value: 8, users: 800, color: '#F59E0B' },
  { name: 'Francés', value: 2, users: 200, color: '#EF4444' },
];

// Datos de rendimiento por hora
const hourlyData = [
  { hour: '00:00', sessions: 120, bounce: 65 },
  { hour: '02:00', sessions: 95, bounce: 58 },
  { hour: '04:00', sessions: 78, bounce: 52 },
  { hour: '06:00', sessions: 156, bounce: 45 },
  { hour: '08:00', sessions: 289, bounce: 38 },
  { hour: '10:00', sessions: 345, bounce: 32 },
  { hour: '12:00', sessions: 412, bounce: 28 },
  { hour: '14:00', sessions: 398, bounce: 31 },
  { hour: '16:00', sessions: 456, bounce: 29 },
  { hour: '18:00', sessions: 523, bounce: 26 },
  { hour: '20:00', sessions: 487, bounce: 30 },
  { hour: '22:00', sessions: 298, bounce: 42 },
];

// ===========================================
// COMPONENTES DE GRÁFICOS REUTILIZABLES
// ===========================================

const ViewsLineChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
      <XAxis
        dataKey="date"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
        labelFormatter={(label) => `Fecha: ${label}`}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="views"
        stroke="#3B82F6"
        strokeWidth={3}
        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
        name="Vistas Totales"
      />
      <Line
        type="monotone"
        dataKey="uniqueVisitors"
        stroke="#10B981"
        strokeWidth={2}
        strokeDasharray="5 5"
        dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
        name="Visitantes Únicos"
      />
    </LineChart>
  </ResponsiveContainer>
);

const CategoriesBarChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
      <XAxis
        dataKey="name"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
        formatter={(value, name) => [
          name === 'articles' ? `${value} artículos` : `${value.toLocaleString()} vistas`,
          name === 'articles' ? 'Artículos' : 'Vistas'
        ]}
      />
      <Legend />
      <Bar
        dataKey="articles"
        fill="#3B82F6"
        radius={[4, 4, 0, 0]}
        name="Artículos"
      />
      <Bar
        dataKey="views"
        fill="#10B981"
        radius={[4, 4, 0, 0]}
        name="Vistas"
      />
    </BarChart>
  </ResponsiveContainer>
);

const EngagementAreaChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
      <XAxis
        dataKey="name"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
        formatter={(value, name) => [
          value.toLocaleString(),
          name === 'views' ? 'Vistas' :
          name === 'likes' ? 'Likes' :
          name === 'shares' ? 'Compartidos' : 'Comentarios'
        ]}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey="views"
        stackId="1"
        stroke="#3B82F6"
        fill="#3B82F6"
        fillOpacity={0.6}
        name="Vistas"
      />
      <Area
        type="monotone"
        dataKey="likes"
        stackId="2"
        stroke="#10B981"
        fill="#10B981"
        fillOpacity={0.6}
        name="Likes"
      />
      <Area
        type="monotone"
        dataKey="shares"
        stackId="3"
        stroke="#F59E0B"
        fill="#F59E0B"
        fillOpacity={0.6}
        name="Compartidos"
      />
    </AreaChart>
  </ResponsiveContainer>
);

const LanguagePieChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
        formatter={(value, name) => [
          `${value}% (${data.find(d => d.name === name)?.users} usuarios)`,
          'Porcentaje'
        ]}
      />
    </PieChart>
  </ResponsiveContainer>
);

// ===========================================
// COMPONENTE PRINCIPAL
// ===========================================

export default function DashboardAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [viewsData] = useState(generateViewsData());

  // Estadísticas principales
  const stats = {
    totalViews: 245678,
    totalArticles: 159,
    totalUsers: 12450,
    avgEngagement: 3.2,
    growth: 12.5
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Métricas detalladas del rendimiento del portal
          </p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 días</SelectItem>
              <SelectItem value="30d">30 días</SelectItem>
              <SelectItem value="90d">90 días</SelectItem>
              <SelectItem value="1y">1 año</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <TrendingUp className="h-4 w-4 mr-1" />
            +{stats.growth}% crecimiento
          </Badge>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Vistas Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.totalArticles}</p>
                <p className="text-sm text-gray-600">Artículos Publicados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Usuarios Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.avgEngagement}%</p>
                <p className="text-sm text-gray-600">Engagement Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">
            <BarChart3 className="h-4 w-4 mr-2" />
            Tráfico
          </TabsTrigger>
          <TabsTrigger value="content">
            <Newspaper className="h-4 w-4 mr-2" />
            Contenido
          </TabsTrigger>
          <TabsTrigger value="engagement">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="demographics">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Demografía
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Tráfico */}
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Vistas por Día
                </CardTitle>
                <CardDescription>
                  Evolución del tráfico en los últimos 30 días
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ViewsLineChart data={viewsData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sesiones por Hora</CardTitle>
                <CardDescription>
                  Distribución horaria del tráfico diario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="hour" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Contenido */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Artículos por Categoría</CardTitle>
              <CardDescription>
                Distribución de contenido y rendimiento por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoriesBarChart data={categoriesData} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoriesData.slice(0, 3).map((category) => (
              <Card key={category.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{category.name}</h3>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{category.articles}</p>
                    <p className="text-sm text-gray-600">Artículos</p>
                    <p className="text-lg font-semibold text-green-600">
                      {category.views.toLocaleString()} vistas
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pestaña de Engagement */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Engagement</CardTitle>
              <CardDescription>
                Interacción semanal: vistas, likes, shares y comentarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementAreaChart data={engagementData} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">32.4K</p>
                <p className="text-sm text-gray-600">Vistas Semanales</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ThumbsUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">2.1K</p>
                <p className="text-sm text-gray-600">Likes Totales</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Share className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">612</p>
                <p className="text-sm text-gray-600">Compartidos</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">319</p>
                <p className="text-sm text-gray-600">Comentarios</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Demografía */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios por Idioma</CardTitle>
                <CardDescription>
                  Distribución geográfica por preferencia de idioma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LanguagePieChart data={languageData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dispositivos y Plataformas</CardTitle>
                <CardDescription>
                  Uso por tipo de dispositivo y sistema operativo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Desktop</span>
                    <span className="font-semibold">58%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobile</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tablet</span>
                    <span className="font-semibold">7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Países con Más Tráfico</CardTitle>
              <CardDescription>
                Top 10 países por número de visitantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { country: 'Argentina', visitors: 85600, percentage: 68.8 },
                  { country: 'México', visitors: 12300, percentage: 9.9 },
                  { country: 'Colombia', visitors: 8900, percentage: 7.2 },
                  { country: 'Chile', visitors: 6700, percentage: 5.4 },
                  { country: 'Perú', visitors: 4500, percentage: 3.6 },
                  { country: 'Uruguay', visitors: 3200, percentage: 2.6 },
                  { country: 'Estados Unidos', visitors: 2100, percentage: 1.7 },
                  { country: 'España', visitors: 1800, percentage: 1.5 },
                ].map((item, index) => (
                  <div key={item.country} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-6">{index + 1}.</span>
                      <span className="text-sm">{item.country}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">
                        {item.visitors.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
