import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import EnhancedPostCard from "@/components/enhanced-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Calendar } from "lucide-react";

export const revalidate = 300; // 5 minutos

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await db.category.findUnique({
    where: { slug },
  });

  if (!category) return {};

  return {
    title: `${category.name} - Noticias | POLÍTICA ARGENTINA`,
    description: `Todas las noticias de ${category.name} en POLÍTICA ARGENTINA. Información actualizada y verificada.`,
    openGraph: {
      title: `${category.name} - POLÍTICA ARGENTINA`,
      description: `Noticias de ${category.name}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page);
  const postsPerPage = 12;

  const category = await db.category.findUnique({
    where: { slug },
  });

  if (!category) notFound();

  // Total de posts
  const totalPosts = await db.post.count({
    where: {
      status: "PUBLISHED",
      categoryId: category.id,
    },
  });

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Posts de la categoría
  const posts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: category.id,
    },
    orderBy: { publishedAt: "desc" },
    take: postsPerPage,
    skip: (currentPage - 1) * postsPerPage,
    include: {
      category: { select: { name: true, slug: true } },
      author: { select: { name: true } },
    },
  });

  // Posts destacados de esta categoría
  const featuredPosts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: category.id,
      featured: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });

  // Trending en esta categoría
  const trendingPosts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: category.id,
    },
    orderBy: { views: "desc" },
    take: 5,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });

  // Categorías relacionadas
  const relatedCategories = await db.category.findMany({
    where: {
      NOT: { id: category.id },
    },
    take: 6,
  });

  const categoryColor = getCategoryColor(slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header de Categoría */}
      <div className={`bg-gradient-to-r ${categoryColor.gradient} border-b border-zinc-800`}>
        <div className="container mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl ${categoryColor.bg} flex items-center justify-center`}>
              <span className="text-3xl font-black text-white">{category.name[0]}</span>
            </div>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">{category.name}</h1>
              <p className="text-xl text-zinc-300">
                {totalPosts} {totalPosts === 1 ? "artículo publicado" : "artículos publicados"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contenido Principal */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className={`w-6 h-6 ${categoryColor.text}`} />
                  <h2 className="text-2xl font-bold">Destacados</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPosts.map((post: any) => (
                    <EnhancedPostCard key={post.id} post={post} layout="small" />
                  ))}
                </div>
              </section>
            )}

            {/* Todos los Posts */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className={`w-6 h-6 ${categoryColor.text}`} />
                <h2 className="text-2xl font-bold">Últimas Noticias</h2>
              </div>
              
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post: any) => (
                    <EnhancedPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-12 text-center">
                    <p className="text-zinc-400 text-lg">
                      No hay noticias publicadas en esta categoría todavía.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {currentPage > 1 && (
                    <Button variant="outline" asChild>
                      <Link href={`/categoria/${slug}?page=${currentPage - 1}`}>
                        Anterior
                      </Link>
                    </Button>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        asChild
                      >
                        <Link href={`/categoria/${slug}?page=${pageNum}`}>
                          {pageNum}
                        </Link>
                      </Button>
                    ))}
                  </div>

                  {currentPage < totalPages && (
                    <Button variant="outline" asChild>
                      <Link href={`/categoria/${slug}?page=${currentPage + 1}`}>
                        Siguiente
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Trending en esta categoría */}
            {trendingPosts.length > 0 && (
              <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <TrendingUp className={`w-5 h-5 ${categoryColor.text}`} />
                    Más leídas en {category.name}
                  </h3>
                  <div className="space-y-4">
                    {trendingPosts.map((post: any, index: number) => (
                      <Link key={post.id} href={`/noticia/${post.slug}`} className="group flex gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 ${categoryColor.bg} rounded-lg flex items-center justify-center font-black text-sm`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm leading-tight group-hover:${categoryColor.text} transition line-clamp-3`}>
                            {post.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Categorías Relacionadas */}
            {relatedCategories.length > 0 && (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Otras Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedCategories.map((cat: any) => (
                      <Link key={cat.id} href={`/categoria/${cat.slug}`}>
                        <Badge variant="secondary" className="hover:bg-zinc-700 transition">
                          {cat.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(slug: string): {
  bg: string;
  text: string;
  gradient: string;
} {
  const colors: Record<string, ReturnType<typeof getCategoryColor>> = {
    politica: {
      bg: "bg-red-600",
      text: "text-red-400",
      gradient: "from-red-950/30 to-transparent",
    },
    economia: {
      bg: "bg-blue-600",
      text: "text-blue-400",
      gradient: "from-blue-950/30 to-transparent",
    },
    sociedad: {
      bg: "bg-purple-600",
      text: "text-purple-400",
      gradient: "from-purple-950/30 to-transparent",
    },
    internacional: {
      bg: "bg-green-600",
      text: "text-green-400",
      gradient: "from-green-950/30 to-transparent",
    },
    deportes: {
      bg: "bg-yellow-600",
      text: "text-yellow-400",
      gradient: "from-yellow-950/30 to-transparent",
    },
    tecnologia: {
      bg: "bg-cyan-600",
      text: "text-cyan-400",
      gradient: "from-cyan-950/30 to-transparent",
    },
  };

  return colors[slug] || {
    bg: "bg-zinc-600",
    text: "text-zinc-400",
    gradient: "from-zinc-950/30 to-transparent",
  };
}

