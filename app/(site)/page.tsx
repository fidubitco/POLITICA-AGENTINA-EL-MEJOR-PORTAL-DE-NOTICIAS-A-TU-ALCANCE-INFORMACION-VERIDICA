import { db } from "@/lib/db";
import Link from "next/link";
import { Clock, Eye, TrendingUp, Flame, Bookmark, Share2, ArrowRight, Play, Calendar } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const description = "Portal líder de noticias políticas y económicas de Argentina. Análisis en profundidad, datos en tiempo real.";

  return {
    title: `${siteName} | El Portal Líder de Noticias Políticas`,
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
  // Data fetching with comprehensive error handling
  let allPosts: any[] = [];
  let allCategories: any[] = [];
  let metrics: any[] = [];
  let dolarData: any = null;

  try {
    [allPosts, allCategories, metrics, dolarData] = await Promise.all([
      db.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 30,
        include: {
          category: { select: { id: true, name: true, slug: true, color: true } },
          author: { select: { name: true, image: true } },
        },
      }).catch(() => []),
      db.category.findMany({
        orderBy: { name: "asc" },
        take: 12,
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
  const breakingPosts = allPosts.filter(p => p.breaking).slice(0, 5);
  const topStories = allPosts.slice(1, 5);
  const latestPosts = allPosts.slice(5, 17);
  const trendingPosts = [...allPosts].sort((a, b) => b.views - a.views).slice(0, 6);
  const editorsPicks = allPosts.filter(p => p.featured).slice(0, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* Live Metrics Ticker */}
      {metrics && metrics.length > 0 && (
        <LiveMetricsTicker metrics={metrics} />
      )}

      {/* Breaking News Strip */}
      {breakingPosts.length > 0 && (
        <div className="border-b-2 border-red-600 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-6 py-3 overflow-x-auto scrollbar-thin">
              <Badge className="bg-red-600 text-white px-4 py-1.5 font-bold uppercase tracking-widest flex-shrink-0 shadow-lg">
                <Flame className="w-4 h-4 mr-2 inline animate-pulse" />
                Último Momento
              </Badge>
              <div className="flex items-center gap-8">
                {breakingPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/noticia/${post.slug}`}
                    className="text-sm font-semibold hover:text-red-600 transition whitespace-nowrap group"
                  >
                    <span className="group-hover:underline">{post.title}</span>
                    {idx < breakingPosts.length - 1 && (
                      <span className="ml-8 text-zinc-300 dark:text-zinc-700">•</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">

        {/* Magazine-Style Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">

          {/* Main Feature - Large */}
          {featuredPost && (
            <article className="lg:col-span-8 group cursor-pointer">
              <Link href={`/noticia/${featuredPost.slug}`}>
                <div className="relative aspect-[16/10] lg:aspect-[16/9] rounded-sm overflow-hidden mb-6">
                  {featuredPost.coverImage && (
                    <>
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    </>
                  )}

                  {/* Floating Category Badge */}
                  {featuredPost.category && (
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-red-600 text-white px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-2xl border-0">
                        {featuredPost.category.name}
                      </Badge>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-black text-white leading-[1.1] mb-4 group-hover:text-red-400 transition-colors">
                      {featuredPost.title}
                    </h1>

                    {featuredPost.excerpt && (
                      <p className="text-base sm:text-lg lg:text-xl text-zinc-100 leading-relaxed mb-6 max-w-3xl line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    {/* Meta Bar */}
                    <div className="flex items-center gap-6 text-sm text-zinc-200">
                      <span className="font-bold">{featuredPost.author?.name || 'Redacción'}</span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.publishedAt ? formatRelativeTime(featuredPost.publishedAt) : 'Reciente'}
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Side Stories - Stacked */}
          <aside className="lg:col-span-4 space-y-6">
            {topStories.map((post, idx) => (
              <article key={post.id} className="group cursor-pointer">
                <Link href={`/noticia/${post.slug}`}>
                  <div className="flex gap-4">
                    {/* Image */}
                    {post.coverImage && (
                      <div className="relative w-32 h-24 flex-shrink-0 rounded-sm overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="128px"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      {post.category && (
                        <Badge variant="outline" className="text-xs border-red-600 text-red-600">
                          {post.category.name}
                        </Badge>
                      )}
                      <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span>{post.publishedAt ? formatRelativeTime(post.publishedAt) : 'Reciente'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {idx < topStories.length - 1 && (
                  <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
                )}
              </article>
            ))}
          </aside>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Primary Column */}
          <div className="lg:col-span-8 space-y-12">

            {/* Latest News Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 dark:border-white pb-4">
                <h2 className="text-3xl font-serif font-black">Últimas Noticias</h2>
                <Link href="/noticias">
                  <Button variant="ghost" size="sm" className="gap-2 group font-semibold">
                    Ver todas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Dynamic Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestPosts.map((post) => (
                  <article key={post.id} className="group cursor-pointer">
                    <Link href={`/noticia/${post.slug}`}>
                      <Card className="overflow-hidden border-0 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                        {/* Image */}
                        {post.coverImage && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {post.category && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold border-0">
                                  {post.category.name}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <h3 className="font-serif font-bold text-xl leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                              <span>{post.publishedAt ? formatRelativeTime(post.publishedAt) : 'Reciente'}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views.toLocaleString()}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* Economic Data Section */}
            {dolarData && (
              <section className="pt-12 border-t-2 border-zinc-200 dark:border-zinc-800">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-serif font-black mb-2">Economía en Vivo</h2>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Seguimiento en tiempo real • Actualizado cada 5 minutos
                      </p>
                    </div>
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
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">

              {/* Trending */}
              <Card className="border-0 bg-white dark:bg-zinc-900 shadow-lg">
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b-2 border-zinc-900 dark:border-white">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-black">Tendencias</h3>
                  </div>

                  <div className="space-y-5">
                    {trendingPosts.map((post, index) => (
                      <div key={post.id}>
                        <Link href={`/noticia/${post.slug}`} className="group flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xl font-black text-red-600">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold text-sm leading-tight group-hover:text-red-600 transition line-clamp-3">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()} lecturas
                            </div>
                          </div>
                        </Link>
                        {index < trendingPosts.length - 1 && (
                          <Separator className="mt-5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Newsletter */}
              <NewsletterForm />
            </div>
          </aside>
        </div>

        {/* Categories Section */}
        <section className="py-16 border-t-2 border-zinc-200 dark:border-zinc-800 mt-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-black">Explorar por Categoría</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allCategories.slice(0, 12).map((category) => (
                <Link key={category.id} href={`/categoria/${category.slug}`}>
                  <Card className="p-6 text-center hover:shadow-lg hover:border-red-600 transition-all duration-300 cursor-pointer border bg-white dark:bg-zinc-900">
                    <div className="space-y-3">
                      <div className="w-14 h-14 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{category.name.charAt(0)}</span>
                      </div>
                      <p className="font-bold text-sm">{category.name}</p>
                    </div>
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
