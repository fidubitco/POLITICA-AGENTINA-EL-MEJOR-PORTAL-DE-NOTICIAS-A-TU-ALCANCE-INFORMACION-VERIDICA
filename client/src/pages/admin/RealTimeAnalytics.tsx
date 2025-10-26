/**
 * 📊 REAL-TIME ANALYTICS - Sistema profesional de analytics en tiempo real
 * Enterprise Grade Level
 * Features:
 * - Tráfico en tiempo real
 * - Usuarios activos
 * - Páginas más visitadas
 * - Fuentes de tráfico
 * - Dispositivos
 * - Geolocalización
 * - Conversiones
 * - Eventos personalizados
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  TrendingDown,
  MapPin,
  ExternalLink,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RealTimeMetrics {
  activeUsers: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversions: number;
}

interface TrafficSource {
  source: string;
  users: number;
  percentage: number;
  color: string;
}

interface TopPage {
  url: string;
  title: string;
  views: number;
  avgTime: number;
  bounceRate: number;
}

interface DeviceData {
  device: string;
  users: number;
  percentage: number;
}

interface GeoData {
  country: string;
  city: string;
  users: number;
  flag: string;
}

interface TimeSeriesData {
  time: string;
  users: number;
  pageViews: number;
}

export const RealTimeAnalytics = () => {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    activeUsers: 0,
    pageViews: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    conversions: 0,
  });
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    // Simular actualización en tiempo real
    const interval = setInterval(() => {
      updateMetrics();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateMetrics = () => {
    // Simular datos en tiempo real (en producción, conectarías con tu API)
    setMetrics({
      activeUsers: Math.floor(Math.random() * 50) + 100,
      pageViews: Math.floor(Math.random() * 500) + 1500,
      avgSessionDuration: Math.floor(Math.random() * 60) + 180,
      bounceRate: Math.floor(Math.random() * 20) + 30,
      conversions: Math.floor(Math.random() * 10) + 25,
    });

    setTrafficSources([
      { source: 'Google', users: 850, percentage: 45, color: '#4285F4' },
      { source: 'Direct', users: 520, percentage: 27, color: '#34A853' },
      { source: 'Social Media', users: 320, percentage: 17, color: '#FBBC05' },
      { source: 'Referral', users: 210, percentage: 11, color: '#EA4335' },
    ]);

    setTopPages([
      {
        url: '/',
        title: 'Inicio - Política Argentina',
        views: 1250,
        avgTime: 245,
        bounceRate: 32,
      },
      {
        url: '/noticia/milei-economia',
        title: 'Milei anuncia nuevas medidas económicas',
        views: 890,
        avgTime: 320,
        bounceRate: 28,
      },
      {
        url: '/categoria/economia',
        title: 'Economía - Noticias',
        views: 650,
        avgTime: 180,
        bounceRate: 45,
      },
      {
        url: '/categoria/politica',
        title: 'Política - Noticias',
        views: 520,
        avgTime: 210,
        bounceRate: 38,
      },
    ]);

    setDevices([
      { device: 'Mobile', users: 1200, percentage: 60 },
      { device: 'Desktop', users: 600, percentage: 30 },
      { device: 'Tablet', users: 200, percentage: 10 },
    ]);

    setGeoData([
      { country: 'Argentina', city: 'Buenos Aires', users: 850, flag: '🇦🇷' },
      { country: 'Argentina', city: 'Córdoba', users: 320, flag: '🇦🇷' },
      { country: 'España', city: 'Madrid', users: 180, flag: '🇪🇸' },
      { country: 'México', city: 'Ciudad de México', users: 150, flag: '🇲🇽' },
      { country: 'Chile', city: 'Santiago', users: 120, flag: '🇨🇱' },
    ]);

    // Generar datos de serie temporal
    const now = new Date();
    const data: TimeSeriesData[] = [];
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.getHours() + ':00',
        users: Math.floor(Math.random() * 100) + 50,
        pageViews: Math.floor(Math.random() * 300) + 150,
      });
    }
    setTimeSeriesData(data);
  };

  useEffect(() => {
    updateMetrics();
  }, [timeRange]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">📊 Analytics en Tiempo Real</h1>
            <p className="text-gray-600">
              Monitoreo en vivo del tráfico y comportamiento de usuarios
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            >
              <option value="1h">Última hora</option>
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>
            <Button variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Real-Time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <Badge variant="default" className="bg-green-600">
                <span className="animate-pulse">●</span> En vivo
              </Badge>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {metrics.activeUsers}
            </div>
            <p className="text-sm text-gray-600">Usuarios Activos</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <Eye className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-4xl font-bold text-green-600 mb-1">
              {metrics.pageViews.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Páginas Vistas</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <Clock className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-4xl font-bold text-purple-600 mb-1">
              {formatDuration(metrics.avgSessionDuration)}
            </div>
            <p className="text-sm text-gray-600">Duración Promedio</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
            <MousePointer className="w-8 h-8 text-orange-600 mb-2" />
            <div className="text-4xl font-bold text-orange-600 mb-1">
              {metrics.bounceRate}%
            </div>
            <p className="text-sm text-gray-600">Tasa de Rebote</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <TrendingUp className="w-8 h-8 text-pink-600 mb-2" />
            <div className="text-4xl font-bold text-pink-600 mb-1">
              {metrics.conversions}
            </div>
            <p className="text-sm text-gray-600">Conversiones</p>
          </Card>
        </div>

        {/* Time Series Chart */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-blue-600" />
            Tráfico en Tiempo Real
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4285F4"
                strokeWidth={2}
                name="Usuarios"
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#34A853"
                strokeWidth={2}
                name="Páginas Vistas"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Sources */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-green-600" />
              Fuentes de Tráfico
            </h3>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{source.source}</span>
                    <span className="text-gray-600">
                      {source.users} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: source.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={trafficSources}
                    dataKey="users"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Devices */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-purple-600" />
              Dispositivos
            </h3>
            <div className="space-y-4">
              {devices.map((device, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {device.device === 'Mobile' && <Smartphone className="w-6 h-6 text-purple-600" />}
                    {device.device === 'Desktop' && <Monitor className="w-6 h-6 text-blue-600" />}
                    {device.device === 'Tablet' && <Tablet className="w-6 h-6 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{device.device}</span>
                      <span className="text-gray-600">
                        {device.users} ({device.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={200}>
                <RechartsBarChart data={devices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="device" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Top Pages */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-600" />
            Páginas Más Visitadas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3">Página</th>
                  <th className="text-center p-3">Vistas</th>
                  <th className="text-center p-3">Tiempo Promedio</th>
                  <th className="text-center p-3">Tasa de Rebote</th>
                  <th className="text-center p-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-semibold">{page.title}</p>
                        <p className="text-sm text-gray-600">{page.url}</p>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className="text-lg">
                        {page.views.toLocaleString()}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">{formatDuration(page.avgTime)}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`font-semibold ${
                          page.bounceRate < 40 ? 'text-green-600' : 'text-orange-600'
                        }`}
                      >
                        {page.bounceRate}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        <ExternalLink className="w-5 h-5 inline" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Geo Data */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            Ubicación Geográfica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {geoData.map((geo, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{geo.flag}</span>
                  <div>
                    <p className="font-bold">{geo.city}</p>
                    <p className="text-sm text-gray-600">{geo.country}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-2xl font-bold text-blue-600">{geo.users}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;

