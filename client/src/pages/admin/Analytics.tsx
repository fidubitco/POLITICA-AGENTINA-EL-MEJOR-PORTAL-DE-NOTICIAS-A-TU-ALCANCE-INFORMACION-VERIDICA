import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { BarChart3, Eye, Heart, MessageSquare, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  
  const { data: articles, isLoading: articlesLoading } = trpc.articles.getPublished.useQuery({ limit: 100 });
  const { data: users, isLoading: usersLoading } = trpc.users.getAll.useQuery();

  // Calculate metrics
  const totalViews = articles?.reduce((sum, a) => sum + a.views, 0) || 0;
  const totalLikes = articles?.reduce((sum, a) => sum + a.likes, 0) || 0;
  const totalShares = articles?.reduce((sum, a) => sum + a.shares, 0) || 0;
  const avgViewsPerArticle = articles?.length ? Math.round(totalViews / articles.length) : 0;

  // Top articles
  const topArticlesByViews = [...(articles || [])].sort((a, b) => b.views - a.views).slice(0, 5);
  const topArticlesByLikes = [...(articles || [])].sort((a, b) => b.likes - a.likes).slice(0, 5);

  const isLoading = articlesLoading || usersLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold">Analytics</h1>
            <p className="text-muted-foreground">Métricas y estadísticas del portal</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="all">Todo el tiempo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vistas</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">+12.5%</span> vs período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Me Gusta</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">+8.2%</span> vs período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compartidos</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span className="text-red-500">-2.4%</span> vs período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{users?.length || 0}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">+5.1%</span> vs período anterior
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Promedio de Vistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgViewsPerArticle.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Por artículo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tasa de Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(2) : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Likes / Vistas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tasa de Compartidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalViews > 0 ? ((totalShares / totalViews) * 100).toFixed(2) : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Shares / Vistas</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top by Views */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Artículos Más Vistos
              </CardTitle>
              <CardDescription>Top 5 artículos por número de vistas</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {topArticlesByViews.map((article, index) => (
                    <div key={article.id} className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</div>
                      {article.featuredImage && (
                        <img src={article.featuredImage} alt={article.slug} className="w-16 h-12 rounded object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1">{article.slug}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {article.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top by Likes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Artículos Más Gustados
              </CardTitle>
              <CardDescription>Top 5 artículos por número de likes</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {topArticlesByLikes.map((article, index) => (
                    <div key={article.id} className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</div>
                      {article.featuredImage && (
                        <img src={article.featuredImage} alt={article.slug} className="w-16 h-12 rounded object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1">{article.slug}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {article.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

