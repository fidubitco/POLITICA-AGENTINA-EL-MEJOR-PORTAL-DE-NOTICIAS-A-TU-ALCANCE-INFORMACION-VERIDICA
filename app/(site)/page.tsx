import { db } from "@/lib/db";
import Link from "next/link";
import { Clock, Eye, TrendingUp, Flame, Newspaper, Send, ChevronRight, BarChart3 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LiveMetricsTicker from "@/components/LiveMetricsTicker";
import MetricaHumana from "@/components/MetricaHumana";
import DolarHistoryChart from "@/components/DolarHistoryChart";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ========================================
// 🏆 ULTRA ADVANCED SEO METADATA
// ========================================
export async function generateMetadata(): Promise<Metadata> {
  const siteName = "POLÍTICA ARGENTINA";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";
  const description = "Portal líder de noticias políticas y económicas de Argentina. Análisis en profundidad, datos en tiempo real del dólar, inflación y Merval. Cobertura 24/7 de actualidad política.";

  return {
    title: `${siteName} | Noticias Políticas y Económicas en Tiempo Real`,
    description,
    keywords: [
      "política argentina",
      "noticias argentina",
      "dólar blue hoy",
      "inflación argentina",
      "elecciones argentina",
      "congreso nacional",
      "presidencia argentina",
      "economía argentina",
      "merval",
      "análisis político"
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
      languages: {
        'es-AR': siteUrl,
        'en': `${siteUrl}/en`,
        'pt-BR': `${siteUrl}/pt`,
        'fr': `${siteUrl}/fr`,
        'de': `${siteUrl}/de`,
        'it': `${siteUrl}/it`,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: siteUrl,
      siteName,
      title: `${siteName} | Noticias Políticas y Económicas`,
      description,
      images: [{
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} | Noticias Políticas y Económicas`,
      description,
      images: [`${siteUrl}/og-image.jpg`],
      creator: '@PoliticaArg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export default async function HomePage() {
  // ========================================
  // 📊 DATA FETCHING - Optimized Queries
  // ========================================

  const [allPosts, allCategories, metrics, dolarData] = await Promise.all([
    // Posts with optimized includes
    db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 24,
      include: {
        category: { select: { id: true, name: true, slug: true, color: true } },
        author: { select: { name: true, image: true } },
      },
    }),
    // Categories
    db.category.findMany({
      orderBy: { name: "asc" },
      take: 10,
    }),
    // Fetch live metrics
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/metrics`, {
      cache: 'no-store'
    }).then(res => res.json()).catch(() => []),
    // Fetch dolar data
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/dolar`, {
      cache: 'no-store'
    }).then(res => res.json()).catch(() => null),
  ]);

  // Separate posts by type
  const featuredPost = allPosts.find(p => p.featured) || allPosts[0];
  const breakingPosts = allPosts.filter(p => p.breaking).slice(0, 3);
  const latestPosts = allPosts.slice(1, 13);
  const trendingPosts = [...allPosts].sort((a, b) => b.views - a.views).slice(0, 5);

  // Site URL for schema
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  // ========================================
  // 🎯 JSON-LD STRUCTURED DATA - Ultra Advanced
  // ========================================
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "POLÍTICA ARGENTINA",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`,
      "width": 600,
      "height": 60
    },
    "sameAs": [
      "https://twitter.com/PoliticaArg",
      "https://facebook.com/PoliticaArg",
      "https://linkedin.com/company/politica-argentina"
    ],
    "description": "Portal líder de noticias políticas y económicas de Argentina"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "POLÍTICA ARGENTINA",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/buscar?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": siteUrl
    }]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, breadcrumbSchema])
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">

        {/* ========================================
            🔴 LIVE METRICS TICKER - Bloomberg Style
            ======================================== */}
        {metrics && metrics.length > 0 && (
          <LiveMetricsTicker metrics={metrics} />
        )}

        <div className="container mx-auto px-4 py-8 space-y-12">

          {/* ========================================
              🏆 HERO SECTION - Featured Post
              ======================================== */}
          {featuredPost && (
            <section className="relative">
              <Link href={`/noticia/${featuredPost.slug}`}>
                <div className="relative rounded-3xl overflow-hidden group min-h-[650px] flex items-end shadow-2xl shadow-zinc-950/50">
                  {featuredPost.coverImage && (
                    <>
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 90vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </>
                  )}

                  <div className="relative p-8 md:p-16 z-10 w-full space-y-6">
                    {/* Badges */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {featuredPost.breaking && (
                        <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 text-sm font-black uppercase tracking-wide animate-pulse shadow-lg shadow-red-600/50">
                          <Flame className="w-5 h-5 mr-2 inline fill-current" />
                          Último Momento
                        </Badge>
                      )}
                      {featuredPost.category && (
                        <Badge className="bg-white/10 backdrop-blur-xl px-4 py-2 text-sm font-bold border border-white/20">
                          {featuredPost.category.name}
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-red-400 transition-all duration-500">
                      {featuredPost.title}
                    </h1>

                    {/* Excerpt */}
                    {featuredPost.excerpt && (
                      <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed max-w-5xl font-light">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center gap-8 text-base text-zinc-300">
                      {featuredPost.author?.name && (
                        <span className="font-semibold text-white">
                          {featuredPost.author.name}
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        {featuredPost.publishedAt ? formatRelativeTime(featuredPost.publishedAt) : 'Reciente'}
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        {featuredPost.views.toLocaleString()} vistas
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* ========================================
              💹 ECONOMIC METRICS SECTION - Live Data
              ======================================== */}
          {dolarData && (
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                    Economía en Tiempo Real
                  </h2>
                  <p className="text-zinc-500 mt-2 text-sm md:text-base">
                    Datos actualizados al instante • Impacto en tu vida cotidiana
                  </p>
                </div>
              </div>

              {/* Dolar Cards - Mobile First Grid */}
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

              {/* Dolar History Chart */}
              <DolarHistoryChart />
            </section>
          )}

          {/* ========================================
              📰 LATEST NEWS GRID - Masonry Layout
              ======================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-10">

              {/* Section Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                  <div className="w-2 h-10 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
                  Últimas Noticias
                </h2>
                <Link href="/noticias">
                  <Button variant="outline" className="border-zinc-800 hover:border-red-600 hover:text-red-400 transition-colors gap-2 group">
                    Ver todas
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* News Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/noticia/${post.slug}`}>
                    <Card className="overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-500 group h-full">
                      {post.coverImage && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                          {/* Category Badge Overlay */}
                          {post.category && (
                            <div className="absolute top-4 left-4">
                              <Badge
                                className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 text-xs font-bold"
                              >
                                {post.category.name}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}

                      <CardContent className="p-6 space-y-3">
                        <h3 className="font-black text-lg md:text-xl leading-tight group-hover:text-red-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 border-t border-zinc-800">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.publishedAt ? formatRelativeTime(post.publishedAt) : 'Reciente'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* ========================================
                📊 SIDEBAR - Trending & Newsletter
                ======================================== */}
            <aside className="lg:col-span-1 space-y-8">

              {/* Trending Posts */}
              <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 sticky top-24 shadow-2xl shadow-zinc-950/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-xl">
                      Más Leídas
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {trendingPosts.map((post, index) => (
                      <div key={post.id}>
                        <Link href={`/noticia/${post.slug}`} className="group flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            {post.category && (
                              <Badge variant="secondary" className="text-xs">
                                {post.category.name}
                              </Badge>
                            )}
                            <h4 className="font-bold text-sm leading-tight group-hover:text-red-400 transition-colors line-clamp-3">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()}
                            </div>
                          </div>
                        </Link>
                        {index < trendingPosts.length - 1 && (
                          <Separator className="mt-5 bg-zinc-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Card */}
              <Card className="bg-gradient-to-br from-red-950/40 via-red-900/30 to-blue-950/40 border-zinc-800 shadow-2xl shadow-red-600/10">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-600/30">
                    <Newspaper className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl mb-2">Newsletter Diario</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Las noticias más importantes en tu email cada mañana.
                    </p>
                  </div>
                  <form className="space-y-3">
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-zinc-900/50 border-zinc-800 focus:border-red-600 h-12 text-base"
                    />
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-12 text-base font-bold shadow-lg shadow-red-600/30">
                      <Send className="w-5 h-5 mr-2" />
                      Suscribirme Gratis
                    </Button>
                  </form>
                  <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold">+50.000 lectores suscritos</span>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </section>

          {/* ========================================
              🗂️ CATEGORIES SECTION
              ======================================== */}
          <section className="space-y-8 border-t border-zinc-800 pt-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Explora por Categoría
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {allCategories.slice(0, 10).map((category) => (
                <Link key={category.id} href={`/categoria/${category.slug}`}>
                  <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-zinc-800 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/10 transition-all duration-500 group">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-14 h-14 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Newspaper className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold group-hover:text-red-400 transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
