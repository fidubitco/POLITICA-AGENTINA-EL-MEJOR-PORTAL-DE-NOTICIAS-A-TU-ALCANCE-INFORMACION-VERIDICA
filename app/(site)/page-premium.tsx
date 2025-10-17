import { db } from "@/lib/db";
import Link from "next/link";
import { Clock, Eye, TrendingUp, Flame, ArrowRight, Calendar, User } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import LiveMetricsTicker from "@/components/LiveMetricsTicker";
import MetricaHumana from "@/components/MetricaHumana";
import DolarHistoryChart from "@/components/DolarHistoryChart";
import NewsletterForm from "@/components/newsletter/newsletter-form";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const siteName = "POLÍTICA ARGENTINA";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";
  const description = "Portal líder de noticias políticas y económicas de Argentina con diseño editorial world-class. Análisis en profundidad, datos en tiempo real y cobertura 24/7.";

  return {
    title: `${siteName} | Noticias Políticas y Económicas de Argentina`,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: siteUrl,
      siteName,
      title: siteName,
      description,
      images: [{
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      }],
    },
  };
}

export default async function PremiumHomePage() {
  // Fetch all data
  const [allPosts, allCategories, metrics, dolarData] = await Promise.all([
    db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 24,
      include: {
        category: { select: { id: true, name: true, slug: true, color: true } },
        author: { select: { name: true, image: true } },
      },
    }),
    db.category.findMany({
      orderBy: { name: "asc" },
      take: 10,
    }),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/metrics`, {
      cache: 'no-store'
    }).then(res => res.json()).catch(() => []),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/dolar`, {
      cache: 'no-store'
    }).then(res => res.json()).catch(() => null),
  ]);

  const featuredPost = allPosts.find(p => p.featured) || allPosts[0];
  const breakingPosts = allPosts.filter(p => p.breaking).slice(0, 3);
  const latestPosts = allPosts.slice(1, 13);
  const trendingPosts = [...allPosts].sort((a, b) => b.views - a.views).slice(0, 5);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  return (
    <div className="min-h-screen bg-surface-1">

      {/* Live Metrics Ticker */}
      {metrics && metrics.length > 0 && (
        <LiveMetricsTicker metrics={metrics} />
      )}

      {/* Breaking News Banner */}
      {breakingPosts.length > 0 && (
        <div className="border-b-2 border-editorial-red bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Badge className="bg-editorial-red text-white px-4 py-2 font-bold uppercase tracking-wider flex-shrink-0 animate-pulse-glow">
                <Flame className="w-4 h-4 mr-2 inline fill-current" />
                Último Momento
              </Badge>
              <div className="flex items-center gap-8 text-sm font-medium">
                {breakingPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/noticia/${post.slug}`}
                    className="hover:text-editorial-red transition whitespace-nowrap"
                  >
                    {post.title}
                    {idx < breakingPosts.length - 1 && (
                      <span className="ml-8 text-gray-300">•</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">

        {/* Magazine-Style Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Main Hero Article - 8 columns */}
          {featuredPost && (
            <article className="lg:col-span-8 group">
              <Link href={`/noticia/${featuredPost.slug}`}>
                <div className="space-y-6">
                  {/* Hero Image */}
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-elevation-3">
                    {featuredPost.coverImage && (
                      <>
                        <Image
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          fill
                          priority
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </>
                    )}
                    {/* Category Badge */}
                    {featuredPost.category && (
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-editorial-red text-white px-4 py-2 text-sm font-bold uppercase tracking-widest shadow-elevation-2">
                          {featuredPost.category.name}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-[1.1] tracking-tight text-editorial-navy group-hover:text-editorial-red transition-colors">
                      {featuredPost.title}
                    </h1>

                    {featuredPost.excerpt && (
                      <p className="text-xl text-editorial-gray leading-relaxed font-light">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-editorial-gray pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-semibold text-editorial-navy">
                          {featuredPost.author?.name || 'Redacción'}
                        </span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.publishedAt ? formatRelativeTime(featuredPost.publishedAt) : 'Reciente'}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views.toLocaleString()} lecturas
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Sidebar - Trending Posts - 4 columns */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-editorial-red rounded-full flex items-center justify-center shadow-elevation-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-editorial-navy">Más Leídas</h2>
            </div>

            <div className="space-y-6">
              {trendingPosts.slice(0, 5).map((post, index) => (
                <Link
                  key={post.id}
                  href={`/noticia/${post.slug}`}
                  className="group flex gap-4 pb-6 border-b last:border-b-0 hover:bg-surface-1 -mx-4 px-4 py-2 rounded-lg transition"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-editorial-red to-orange-600 rounded-lg flex items-center justify-center shadow-elevation-1">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {post.category && (
                      <Badge variant="secondary" className="text-xs">
                        {post.category.name}
                      </Badge>
                    )}
                    <h3 className="font-semibold leading-tight group-hover:text-editorial-red transition line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-editorial-gray">
                      <Eye className="w-3 h-3" />
                      {post.views.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter in Sidebar */}
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </aside>
        </div>

        {/* Economic Metrics Section */}
        {dolarData && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-4xl font-serif font-bold text-editorial-navy mb-2">
                Economía en Vivo
              </h2>
              <p className="text-editorial-gray">
                Seguimiento en tiempo real del dólar y principales indicadores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          </section>
        )}

        {/* Latest Articles Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b-2">
            <h2 className="text-4xl font-serif font-bold text-editorial-navy">Últimas Noticias</h2>
            <Link href="/noticias">
              <Button variant="outline" className="gap-2 group border-editorial-navy hover:bg-editorial-navy hover:text-white transition">
                Ver todas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer space-y-4">
                <Link href={`/noticia/${post.slug}`}>
                  {/* Image */}
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4 shadow-elevation-2">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                    <h3 className="text-2xl font-serif font-bold leading-tight text-editorial-navy group-hover:text-editorial-red transition-colors">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-editorial-gray leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-editorial-gray">
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

        {/* Categories */}
        <section>
          <h2 className="text-4xl font-serif font-bold text-editorial-navy mb-8">Explorar por Tema</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {allCategories.slice(0, 8).map((category) => (
              <Link key={category.id} href={`/categoria/${category.slug}`}>
                <Card className="hover:shadow-elevation-3 hover:border-editorial-red transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-editorial-red to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-sm text-editorial-navy group-hover:text-editorial-red transition">
                      {category.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
