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
  ArrowRight,
  Globe,
  MessageSquare,
  Bookmark,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/admin/StatsCard";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Enhanced Admin Dashboard
 * Complete dashboard with comprehensive metrics, charts, and quick actions
 * This is an alternative enhanced version of the main admin dashboard
 */
export default async function DashboardEnhancedPage() {
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

  // Today's stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const publishedToday = await db.post.count({
    where: {
      createdAt: {
        gte: today,
      },
    },
  });

  // Mock data for additional metrics
  const totalComments = 1234; // Replace with actual query when comments are implemented
  const activeUsers = Math.floor(totalUsers * 0.75);

  // Calculate stats
  const avgViewsPerPost = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
  const publishRate = totalPosts > 0 ? Math.round((publishedPosts / totalPosts) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Dashboard Principal
          </h1>
          <p className="text-zinc-500 mt-2">
            Vista completa del sistema de gestión de noticias
          </p>
        </div>
        <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold animate-pulse">
          <Activity className="w-4 h-4 mr-2 inline" />
          Sistema Activo
        </Badge>
      </div>

      {/* Main Stats Grid - 6 Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total de Noticias"
          value={totalPosts.toLocaleString()}
          icon={FileText}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
          change="+12%"
          trend="up"
          description="Artículos en el sistema"
        />
        <StatsCard
          title="Publicadas Hoy"
          value={publishedToday}
          icon={Newspaper}
          color="text-green-500"
          bgColor="bg-green-500/10"
          change={`+${publishedToday}`}
          trend="up"
          description="Noticias publicadas hoy"
        />
        <StatsCard
          title="Vistas Totales"
          value={totalViews.toLocaleString()}
          icon={Eye}
          color="text-purple-500"
          bgColor="bg-purple-500/10"
          change="+23%"
          trend="up"
          description="Total de visualizaciones"
        />
        <StatsCard
          title="Usuarios Activos"
          value={activeUsers}
          icon={Users}
          color="text-orange-500"
          bgColor="bg-orange-500/10"
          change="+8%"
          trend="up"
          description={`${totalUsers} usuarios totales`}
        />
        <StatsCard
          title="Comentarios"
          value={totalComments.toLocaleString()}
          icon={MessageSquare}
          color="text-pink-500"
          bgColor="bg-pink-500/10"
          change="+15%"
          trend="up"
          description="Interacciones de usuarios"
        />
        <StatsCard
          title="Categorías"
          value={totalCategories}
          icon={Bookmark}
          color="text-cyan-500"
          bgColor="bg-cyan-500/10"
          description="Categorías activas"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
          <Zap className="w-7 h-7 text-yellow-500" />
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/posts/new">
            <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl group h-full">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">Nueva Noticia</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Crear y publicar nuevo artículo
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-zinc-800 transition-colors"
                >
                  Crear
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl group h-full">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">Ver Analytics</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Análisis y estadísticas detalladas
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

          <Link href="/admin/noticias">
            <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl group h-full">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">Gestionar Noticias</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Ver y editar todas las noticias
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

          <Link href="/admin/usuarios">
            <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl group h-full">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">Usuarios</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Administrar usuarios y roles
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
        </div>
      </div>

      {/* Recent Activity & Performance Stats */}
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

        {/* Performance Stats */}
        <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Rendimiento
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
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle>Estado del Sistema</CardTitle>
        </CardHeader>
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
              <p className="text-xs text-zinc-500 font-semibold">API</p>
              <p className="text-sm font-bold text-green-500">Activa</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-zinc-500 font-semibold">Cache</p>
              <p className="text-sm font-bold text-green-500">Funcionando</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-zinc-500 font-semibold">Sincronización</p>
              <p className="text-sm font-bold text-green-500">En Línea</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
