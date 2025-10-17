import { db } from "@/lib/db";
import Link from "next/link";
import { Clock, Eye, TrendingUp, Flame, Newspaper, ChevronRight, BarChart3, Play, Bookmark, Share2, MessageCircle } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LiveMetricsTicker from "@/components/LiveMetricsTicker";
import MetricaHumana from "@/components/MetricaHumana";
import DolarHistoryChart from "@/components/DolarHistoryChart";
import NewsletterForm from "@/components/newsletter/newsletter-form";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteName = "POLÍTICA ARGENTINA";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";
  const description = "Portal líder de noticias políticas y económicas de Argentina. Análisis en profundidad, datos en tiempo real del dólar, inflación y Merval. Cobertura 24/7 de actualidad política.";

  return {
    title: `${siteName} | Noticias Políticas y Económicas en Tiempo Real`,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: siteUrl,
      siteName,
      title: `${siteName} | Noticias Políticas y Económicas`,
      description,
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage() {
  // Data fetching with error handling
  let allPosts: any[] = [];
  let allCategories: any[] = [];
  let metrics: any[] = [];
  let dolarData: any = null;

  try {
    [allPosts, allCategories, metrics, dolarData] = await Promise.all([
      db.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 24,
        include: {
          category: { select: { id: true, name: true, slug: true, color: true } },
          author: { select: { name: true, image: true } },
        },
      }).catch(() => []),
      db.category.findMany({
        orderBy: { name: "asc" },
        take: 10,
      }).catch(() => []),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/metrics`, {
        cache: 'no-store'
      }).then(res => res.ok ? res.json() : []).catch(() => []),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/dolar`, {
        cache: 'no-store'
      }).then(res => res.ok ? res.json() : null).catch(() => null),
    ]);
  } catch (error) {
    console.error('Data fetching error:', error);
  }

  const featuredPost = allPosts.find(p => p.featured) || allPosts[0];
  const breakingPosts = allPosts.filter(p => p.breaking).slice(0, 4);
  const latestPosts = allPosts.slice(1, 13);
  const trendingPosts = [...allPosts].sort((a, b) => b.views - a.views).slice(0, 5);
  const editorsPicks = allPosts.filter(p => p.featured).slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">

      {/* Live Metrics Ticker */}
      {metrics && metrics.length > 0 && (
        <LiveMetricsTicker metrics={metrics} />
      )}

      {/* Breaking News Banner */}
      {breakingPosts.length > 0 && (
        <div className="border-y border-red-600 bg-gradient-to-r from-red-950/20 to-red-900/10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Badge className="bg-red-600 text-white px-3 py-1 font-bold uppercase tracking-wider flex-shrink-0 animate-pulse">
                <Flame className="w-3 h-3 mr-1.5 inline" />
                Último Momento
              </Badge>
              <div className="flex items-center gap-6 text-sm">
                {breakingPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/noticia/${post.slug}`}
                    className="hover:text-red-600 transition whitespace-nowrap font-medium"
                  >
                    {post.title}
                    {idx < breakingPosts.length - 1 && (
                      <span className="ml-6 text-zinc-400">•</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-12">

            {/* Hero Story */}
            {featuredPost && (
              <article className="group cursor-pointer">
                <Link href={`/noticia/${featuredPost.slug}`}>
                  <div className="space-y-6">
                    {/* Image */}
                    <div className="relative aspect-[16/9] rounded-sm overflow-hidden">
                      {featuredPost.coverImage && (
                        <>
                          <Image
                            src={featuredPost.coverImage}
                            alt={featuredPost.title}
                            fill
                            priority
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </>
                      )}
                      {/* Category Badge */}
                      {featuredPost.category && (
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                            {featuredPost.category.name}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-[1.1] tracking-tight group-hover:text-red-600 transition-colors">
                        {featuredPost.title}
                      </h1>

                      {featuredPost.excerpt && (
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                          {featuredPost.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                          <span className="font-semibold text-zinc-900 dark:text-white">
                            {featuredPost.author?.name || 'Redacción'}
                          </span>
                          <span>•</span>
                          <span>{featuredPost.publishedAt ? formatRelativeTime(featuredPost.publishedAt) : 'Reciente'}</span>
                          <span>•</span>
                          <span>{featuredPost.views.toLocaleString()} lecturas</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm" className="hover:bg-zinc-100 dark:hover:bg-zinc-900">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-zinc-100 dark:hover:bg-zinc-900">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            <Separator className="my-12" />

            {/* Latest News Grid */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif font-bold">Últimas Noticias</h2>
                <Link href="/noticias">
                  <Button variant="outline" size="sm" className="gap-2 group">
                    Ver todas
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestPosts.map((post) => (
                  <article key={post.id} className="group cursor-pointer space-y-4">
                    <Link href={`/noticia/${post.slug}`}>
                      {/* Image */}
                      {post.coverImage && (
                        <div className="relative aspect-[16/9] rounded-sm overflow-hidden mb-4">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {post.category && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold">
                                {post.category.name}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-red-600 transition-colors">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span>{post.publishedAt ? formatRelativeTime(post.publishedAt) : 'Reciente'}</span>
                          <span>•</span>
                          <span>{post.views.toLocaleString()} lecturas</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Trending */}
            <div className="sticky top-24 space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-bold">Más Leídas</h3>
                  </div>

                  <div className="space-y-6">
                    {trendingPosts.map((post, index) => (
                      <div key={post.id}>
                        <Link href={`/noticia/${post.slug}`} className="group flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold leading-tight group-hover:text-red-600 transition line-clamp-3">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()}
                            </div>
                          </div>
                        </Link>
                        {index < trendingPosts.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <NewsletterForm />
            </div>

          </aside>
        </div>

        {/* Economic Data Section */}
        {dolarData && (
          <section className="py-16 border-t">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-2">Economía en Vivo</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Seguimiento en tiempo real del dólar y principales indicadores
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricaHumana
                  tipo="blue"
                  dolarData={dolarData?.blue}
                  variacionDiaria={dolarData?.variaciones?.blue || 0}
                />
                <MetricaHumana
                  tipo="oficial"
                  dolarData={dolarData?.oficial}
                  variacionDiaria={dolarData?.variaciones?.oficial || 0}
                />
                <MetricaHumana
                  tipo="mep"
                  dolarData={dolarData?.mep}
                  variacionDiaria={dolarData?.variaciones?.mep || 0}
                />
              </div>

              <DolarHistoryChart />
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-16 border-t">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold">Explorar por Tema</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {allCategories.slice(0, 8).map((category) => (
                <Link key={category.id} href={`/categoria/${category.slug}`}>
                  <Card className="hover:shadow-lg hover:border-red-600 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4 text-center space-y-2">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                        <Newspaper className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-semibold text-sm">{category.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
