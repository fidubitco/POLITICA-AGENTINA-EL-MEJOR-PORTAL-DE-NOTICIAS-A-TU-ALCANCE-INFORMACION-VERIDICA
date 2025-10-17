"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Mock Data
const trafficData = [
  { date: "1 Oct", visitas: 4200, usuarios: 3100, pagVistas: 8500 },
  { date: "3 Oct", visitas: 5100, usuarios: 3800, pagVistas: 10200 },
  { date: "5 Oct", visitas: 4800, usuarios: 3500, pagVistas: 9300 },
  { date: "7 Oct", visitas: 6200, usuarios: 4500, pagVistas: 12100 },
  { date: "9 Oct", visitas: 7100, usuarios: 5200, pagVistas: 14300 },
  { date: "11 Oct", visitas: 6800, usuarios: 4900, pagVistas: 13500 },
  { date: "13 Oct", visitas: 8200, usuarios: 6100, pagVistas: 16800 },
  { date: "15 Oct", visitas: 9500, usuarios: 7200, pagVistas: 19200 },
  { date: "17 Oct", visitas: 8900, usuarios: 6700, pagVistas: 17900 },
];

const categoryData = [
  { name: "Política", views: 25000, articles: 45 },
  { name: "Economía", views: 18000, articles: 32 },
  { name: "Sociedad", views: 12000, articles: 28 },
  { name: "Internacional", views: 9500, articles: 20 },
  { name: "Opinión", views: 7200, articles: 15 },
];

const deviceData = [
  { name: "Mobile", value: 52, color: "#3b82f6" },
  { name: "Desktop", value: 35, color: "#10b981" },
  { name: "Tablet", value: 13, color: "#f59e0b" },
];

const topArticles = [
  { title: "Nueva reforma económica del gobierno", views: 8500, timeOnPage: "4:32" },
  { title: "Debate presidencial: análisis completo", views: 7200, timeOnPage: "6:15" },
  { title: "Crisis energética: medidas urgentes", views: 6800, timeOnPage: "3:48" },
  { title: "Inflación: proyecciones para 2025", views: 5900, timeOnPage: "5:22" },
  { title: "Acuerdo internacional firmado", views: 5200, timeOnPage: "4:05" },
];

const sourceData = [
  { source: "Directo", visits: 12500, percentage: 35 },
  { source: "Google", visits: 10200, percentage: 28 },
  { source: "Redes Sociales", visits: 8900, percentage: 25 },
  { source: "Referencias", visits: 4300, percentage: 12 },
];

export default function AnalyticsDashboardClient() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");

  const stats = [
    {
      label: "Total Visitas",
      value: "142.5K",
      change: "+23.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      label: "Páginas Vistas",
      value: "387.2K",
      change: "+18.2%",
      trend: "up",
      icon: Eye,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      label: "Tiempo Promedio",
      value: "4:35",
      change: "+12.8%",
      trend: "up",
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      label: "Tasa de Rebote",
      value: "42.3%",
      change: "-5.2%",
      trend: "down",
      icon: MousePointer,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {range === "7d" ? "7 días" : range === "30d" ? "30 días" : "90 días"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <Badge
                  variant="secondary"
                  className={`${stat.trend === "up" ? "text-green-400" : "text-red-400"} flex items-center gap-1`}
                >
                  {stat.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-black">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Traffic Overview */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Resumen de Tráfico
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 12 }} stroke="#3f3f46" />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} stroke="#3f3f46" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="visitas"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorVisitas)"
                name="Visitas"
              />
              <Area
                type="monotone"
                dataKey="usuarios"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorUsuarios)"
                name="Usuarios"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Categories & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Bar Chart */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle>Rendimiento por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 11 }} stroke="#3f3f46" />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} stroke="#3f3f46" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Vistas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Pie Chart */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle>Distribución por Dispositivo</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-4 flex-1">
                {deviceData.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: device.color }} />
                      <div className="flex items-center gap-2">
                        {device.name === "Mobile" && <Smartphone className="w-4 h-4 text-zinc-500" />}
                        {device.name === "Desktop" && <Monitor className="w-4 h-4 text-zinc-500" />}
                        {device.name === "Tablet" && <Globe className="w-4 h-4 text-zinc-500" />}
                        <span className="text-sm font-bold">{device.name}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-black">{device.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Articles & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Articles */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle>Artículos Más Vistos</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-black text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm mb-2 line-clamp-1">{article.title}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()} vistas
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.timeOnPage}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle>Fuentes de Tráfico</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {sourceData.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{source.source}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-zinc-500">{source.visits.toLocaleString()} visitas</span>
                      <span className="text-lg font-black">{source.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
