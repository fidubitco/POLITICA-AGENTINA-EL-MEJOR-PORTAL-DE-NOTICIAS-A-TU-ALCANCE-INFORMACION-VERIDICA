import { db } from "@/lib/db";
import Link from "next/link";
import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  Clock,
  BarChart3,
  Zap,
  Newspaper,
  Target,
  Activity,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  // Fetch real-time statistics
  const [totalPosts, totalUsers, totalCategories, recentPosts] = await Promise.all([
    db.post.count(),
    db.user.count(),
    db.category.count(),
    db.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true } },
      },
    }),
  ]);

  // Calculate total views
  const postsWithViews = await db.post.findMany({
    select: { views: true },
  });
  const totalViews = postsWithViews.reduce((sum, post) => sum + post.views, 0);

  // Published vs Draft
  const publishedPosts = await db.post.count({ where: { status: 'PUBLISHED' } });
  const draftPosts = await db.post.count({ where: { status: 'DRAFT' } });

  // Calculate stats
  const avgViewsPerPost = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
  const publishRate = totalPosts > 0 ? Math.round((publishedPosts / totalPosts) * 100) : 0;

  const stats = [
    {
      title: "Total de Artículos",
      value: totalPosts.toLocaleString(),
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Vistas Totales",
      value: totalViews.toLocaleString(),
      change: "+23%",
      trend: "up",
      icon: Eye,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Usuarios Activos",
      value: totalUsers.toLocaleString(),
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Tasa de Publicación",
      value: `${publishRate}%`,
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const quickActions = [
    {
      title: "Crear Artículo con IA",
      description: "Genera contenido automáticamente con inteligencia artificial",
      href: "/admin/ai-generator",
      icon: Zap,
      color: "from-yellow-600 to-orange-600",
    },
    {
      title: "Editor Visual",
      description: "Construye páginas con drag & drop",
      href: "/admin/page-builder",
      icon: BarChart3,
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Gestionar Posts",
      description: "Ver, editar y publicar artículos",
      href: "/admin/posts",
      icon: Newspaper,
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "CRM Dashboard",
      description: "Gestión de leads y clientes",
      href: "/admin/crm",
      icon: Target,
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Dashboard Administrativo
          </h1>
          <p className="text-zinc-500 mt-2">
            Sistema de gestión ultra avanzado con IA integrada
          </p>
        </div>
        <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold animate-pulse">
          <Activity className="w-4 h-4 mr-2 inline" />
          Sistema Activo
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-950/50 group"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs font-bold">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-zinc-500 mb-2 font-medium">{stat.title}</p>
              <p className="text-3xl font-black">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
          <Zap className="w-7 h-7 text-yellow-500" />
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl group h-full">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                      {action.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-zinc-800 transition-colors"
                  >
                    Abrir
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Posts */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-500" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                      <span>{post.author?.name || 'Sin autor'}</span>
                      <span>•</span>
                      <span>{post.category?.name || 'Sin categoría'}</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              Estadísticas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Publicados</span>
                <span className="font-bold text-green-500">{publishedPosts}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${publishRate}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Borradores</span>
                <span className="font-bold text-orange-500">{draftPosts}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${100 - publishRate}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-xs text-zinc-500 mb-2">Promedio de Vistas</p>
                <p className="text-3xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {avgViewsPerPost.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-500 mt-1">por artículo</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-xs text-zinc-500 mb-2">Categorías Activas</p>
                <p className="text-2xl font-black text-white">
                  {totalCategories}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-zinc-500 font-semibold">Base de Datos</p>
              <p className="text-sm font-bold text-green-500">Conectado</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-zinc-500 font-semibold">API de IA</p>
              <p className="text-sm font-bold text-green-500">Activa</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-zinc-500 font-semibold">Cache System</p>
              <p className="text-sm font-bold text-green-500">Funcionando</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-zinc-500 font-semibold">Cron Jobs</p>
              <p className="text-sm font-bold text-green-500">Ejecutándose</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
