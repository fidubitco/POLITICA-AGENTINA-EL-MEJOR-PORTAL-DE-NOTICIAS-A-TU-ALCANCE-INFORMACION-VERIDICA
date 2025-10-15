import PostCard from "@/components/post-card";
import { db } from "@/lib/db";
import { TrendingUp, Clock } from "lucide-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Hero post
  const heroPost = await db.post.findFirst({
    where: { status: "PUBLISHED", featured: true },
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  // Featured posts
  const featuredPosts = await db.post.findMany({
    where: { status: "PUBLISHED", featured: true },
    orderBy: { publishedAt: "desc" },
    take: 4,
    skip: 1,
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  // Latest posts
  const latestPosts = await db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 12,
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  // Trending sidebar posts
  const trendingPosts = await db.post.findMany({
    where: { status: "PUBLISHED", breaking: true },
    orderBy: { publishedAt: "desc" },
    take: 8,
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-9">
          {/* Hero Section */}
          {heroPost && (
            <section className="mb-12">
              <PostCard post={heroPost} variant="hero" />
            </section>
          )}

          {/* Featured Grid */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-zinc-800">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <h2 className="text-2xl font-bold">Destacadas</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <PostCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            </section>
          )}

          {/* Latest News Grid */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-zinc-800">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold">Últimas Noticias</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} variant="default" />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            {/* Breaking News */}
            {trendingPosts.length > 0 && (
              <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <h3 className="font-bold uppercase text-sm">Último Momento</h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="small" />
                  ))}
                </div>
              </div>
            )}

            {/* Ad Space */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 text-center">
              <p className="text-zinc-500 text-sm">Espacio Publicitario</p>
              <div className="w-full h-64 bg-zinc-800 rounded mt-4" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
