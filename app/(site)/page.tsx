import { db } from "@/lib/db";
import EnhancedPostCard from "@/components/enhanced-post-card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Zap } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Featured/Breaking posts
  const featuredPosts = await (db.post as any).findMany({
    where: { 
      status: "PUBLISHED",
      OR: [
        { featured: true },
        { breaking: true }
      ]
    },
    orderBy: [
      { breaking: 'desc' },
      { featured: 'desc' },
      { publishedAt: "desc" }
    ],
    take: 1,
    include: {
      category: { select: { name: true, slug: true } },
      author: { select: { name: true } },
    },
  });

  // Latest posts
  const latestPosts = await (db.post as any).findMany({
    where: { 
      status: "PUBLISHED",
      id: { notIn: featuredPosts.map((p: any) => p.id) }
    },
    orderBy: { publishedAt: "desc" },
    take: 8,
    include: {
      category: { select: { name: true, slug: true } },
      author: { select: { name: true } },
    },
  });

  // Trending posts (más vistos)
  const trendingPosts = await (db.post as any).findMany({
    where: { status: "PUBLISHED" },
    orderBy: { views: "desc" },
    take: 5,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });

  // Posts por categoría
  const economyPosts = await (db.post as any).findMany({
    where: { 
      status: "PUBLISHED",
      category: { slug: "economia" }
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });

  const politicsPosts = await (db.post as any).findMany({
    where: { 
      status: "PUBLISHED",
      category: { slug: "politica" }
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Hero Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-red-600" />
              <h2 className="text-3xl font-bold text-white">Destacado</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {featuredPosts.map((post: any, index: number) => (
                <EnhancedPostCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  category={post.category}
                  publishedAt={post.publishedAt}
                  views={post.views}
                  featured={post.featured}
                  breaking={post.breaking}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Latest News Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-white">Últimas Noticias</h2>
                </div>
                <Link href="/noticias">
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    Ver todas →
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestPosts.map((post: any, index: number) => (
                  <EnhancedPostCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    coverImage={post.coverImage}
                    category={post.category}
                    publishedAt={post.publishedAt}
                    views={post.views}
                    index={index}
                  />
                ))}
              </div>
            </section>

            {/* Economy Section */}
            {economyPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
                  <div className="w-1 h-6 bg-green-600 rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Economía</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {economyPosts.map((post: any, index: number) => (
                    <EnhancedPostCard
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      slug={post.slug}
                      coverImage={post.coverImage}
                      category={post.category}
                      publishedAt={post.publishedAt}
                      views={post.views}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Politics Section */}
            {politicsPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
                  <div className="w-1 h-6 bg-purple-600 rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Política</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {politicsPosts.map((post: any, index: number) => (
                    <EnhancedPostCard
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      slug={post.slug}
                      coverImage={post.coverImage}
                      category={post.category}
                      publishedAt={post.publishedAt}
                      views={post.views}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Trending Posts */}
            {trendingPosts.length > 0 && (
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl font-bold text-white">Más Vistas</h3>
                </div>
                
                <div className="space-y-4">
                  {trendingPosts.map((post: any, index: number) => (
                    <Link 
                      key={post.id} 
                      href={`/noticia/${post.slug}`}
                      className="group block"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-lg font-bold text-lg text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h4>
                          {post.category && (
                            <span className="text-xs text-zinc-500 mt-1 block">
                              {post.category.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Newsletter</h3>
              <p className="text-sm text-blue-100 mb-4">
                Recibe las noticias más importantes en tu email
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Suscribirse
                </Button>
              </form>
            </div>

            {/* Ad Space */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 text-center">
              <p className="text-zinc-500 text-sm mb-4">Espacio Publicitario</p>
              <div className="w-full h-64 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                <span className="text-zinc-600 text-xs">300 x 250</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
