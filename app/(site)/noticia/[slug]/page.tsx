import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, Share2, Eye, Clock, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import type { Metadata } from "next";
import { NewsArticleLD, BreadcrumbLD } from "@/components/seo/json-ld";
import OptimizedImage from "@/components/optimized-image";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await (db.post as any).findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { 
      category: { select: { name: true, slug: true } },
      author: { select: { name: true, email: true, image: true } }
    },
  });

  if (!post) return {};

  const publishedISO = post.publishedAt
    ? new Date(post.publishedAt as any).toISOString()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
      publishedTime: publishedISO,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const post = await (db.post as any).findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true, email: true, image: true } },
      category: { select: { name: true, slug: true } },
      tags: { select: { name: true, slug: true } },
    },
  });

  if (!post) notFound();

  // Incremento de vistas desactivado para estabilidad en producción

  const relatedPosts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: post.categoryId,
      NOT: { id: post.id },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  const trendingPosts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: post.id },
    },
    orderBy: { views: "desc" },
    take: 5,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";
  const articleUrl = `${siteUrl}/noticia/${post.slug}`;
  const publishedISO = post.publishedAt
    ? new Date(post.publishedAt as any).toISOString()
    : new Date().toISOString();
  const updatedISO = post.updatedAt
    ? new Date(post.updatedAt as any).toISOString()
    : publishedISO;

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-white transition">Inicio</Link>
          <span className="mx-2">/</span>
          {post.category && (
            <>
              <Link href={`/categoria/${post.category.slug}`} className="hover:text-white transition">
                {post.category.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-zinc-400">{post.title.substring(0, 50)}...</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Article */}
          <article className="lg:col-span-8">
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
              
              {/* Article Header */}
              <div className="p-8 md:p-12">
                {post.category && (
                  <Link href={`/categoria/${post.category.slug}`}>
                    <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-bold uppercase">
                      {post.category.name}
                    </Badge>
                  </Link>
                )}
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-xl text-zinc-300 mb-8 leading-relaxed border-l-4 border-red-600 pl-6">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    {post.author.image ? (
                      <OptimizedImage
                        src={post.author.image}
                        alt={post.author.name || "Author"}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{post.author.name || "Redacción"}</p>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatRelativeTime(post.publishedAt)}
                          </span>
                        )}
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {post.views.toLocaleString()} vistas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartir:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-blue-950/30 hover:text-blue-400"
                    asChild
                  >
                    <a 
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-sky-950/30 hover:text-sky-400"
                    asChild
                  >
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-blue-950/30 hover:text-blue-400"
                    asChild
                  >
                    <a 
                      href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  {/* Botón copiar deshabilitado en Server Component */}
                </div>

                {/* Featured Image */}
                {post.coverImage ? (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
                    <OptimizedImage
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* Article Content */}
              <div className="px-8 md:px-12 pb-12">
                {(() => {
                  try {
                    const html = typeof (post as any).content === 'string'
                      ? (post as any).content
                      : (post as any).content?.html ?? '';
                    return (
                      <div 
                        className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300 prose-strong:text-white prose-blockquote:border-l-red-600 prose-blockquote:text-zinc-300 prose-img:rounded-lg"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    );
                  } catch {
                    return <p className="text-zinc-400">Contenido no disponible.</p>;
                  }
                })()}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="px-8 md:px-12 pb-8">
                  <Separator className="mb-6 bg-zinc-800" />
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags:
                    </span>
                    {post.tags.map((tag: any) => (
                      <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                        <Badge variant="secondary" className="hover:bg-zinc-700 transition">
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-red-600 rounded-full" />
                  Artículos relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related: any) => (
                    <Link key={related.id} href={`/noticia/${related.slug}`} className="group">
                      <Card className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300">
                        {related.coverImage && (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <OptimizedImage
                              src={related.coverImage}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <CardContent className="p-5">
                          {related.category && (
                            <Badge variant="secondary" className="mb-3 text-xs">
                              {related.category.name}
                            </Badge>
                          )}
                          <h3 className="font-bold text-lg mb-2 group-hover:text-red-400 transition line-clamp-2">
                            {related.title}
                          </h3>
                          {related.excerpt && (
                            <p className="text-sm text-zinc-400 line-clamp-2">
                              {related.excerpt}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Trending Posts */}
            {trendingPosts.length > 0 && (
              <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </span>
                    Más leídas
                  </h3>
                  <div className="space-y-6">
                    {trendingPosts.map((trending: any, index: number) => (
                      <div key={trending.id}>
                        <Link href={`/noticia/${trending.slug}`} className="group flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            {trending.coverImage && (
                              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg mb-3">
                                <OptimizedImage
                                  src={trending.coverImage}
                                  alt={trending.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            {trending.category && (
                              <Badge variant="secondary" className="text-xs mb-2">
                                {trending.category.name}
                              </Badge>
                            )}
                            <h4 className="font-semibold text-sm leading-tight group-hover:text-red-400 transition line-clamp-3">
                              {trending.title}
                            </h4>
                          </div>
                        </Link>
                        {index < trendingPosts.length - 1 && (
                          <Separator className="mt-6 bg-zinc-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-red-950/30 to-blue-950/30 border-zinc-800">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-3">Suscríbete</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Recibe las noticias más importantes en tu email
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  />
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    Suscribirme
                  </Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <NewsArticleLD
        headline={post.title}
        description={post.excerpt || ""}
        image={post.coverImage || `${siteUrl}/logo.svg`}
        datePublished={publishedISO}
        dateModified={updatedISO}
        author={{ name: post.author?.name || "Redacción" }}
        publisher={{ name: "POLÍTICA ARGENTINA", logo: `${siteUrl}/logo.svg` }}
      />
      <BreadcrumbLD
        items={[
          { name: "Inicio", url: siteUrl },
          ...(post.category ? [{ name: post.category.name, url: `${siteUrl}/categoria/${post.category.slug}` }] : []),
          { name: post.title, url: articleUrl },
        ]}
      />
    </div>
  );
}
