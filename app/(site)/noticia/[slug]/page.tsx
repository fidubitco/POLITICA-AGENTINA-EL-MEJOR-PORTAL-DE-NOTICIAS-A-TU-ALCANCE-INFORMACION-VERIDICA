import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, User, Tag, Share2 } from "lucide-react";
import PostCard from "@/components/post-card";
import type { Metadata } from "next";
import { NewsArticleLD, BreadcrumbLD } from "@/components/seo/json-ld";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { 
      category: { select: { name: true, slug: true } },
      author: { select: { name: true, email: true, image: true } }
    },
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  
  const post = await db.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true, email: true, image: true } },
      category: { select: { name: true, slug: true } },
      tags: { select: { name: true, slug: true } },
    },
  });

  if (!post) notFound();

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

  const timeAgo = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true, locale: es })
    : "";

  return (
    <div className="bg-zinc-950">
      {/* Article Header */}
      <div className="bg-black border-b border-zinc-800">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {post.category && (
            <Link
              href={`/categoria/${post.category.slug}`}
              className="inline-block px-3 py-1 bg-red-600 hover:bg-red-700 text-xs font-bold uppercase mb-4 rounded transition"
            >
              {post.category.name}
            </Link>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-zinc-300 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author.name || post.author.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded transition ml-auto">
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* Cover Image */}
            {post.coverImage && (
              <div className="aspect-video relative mb-8 rounded-xl overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              {typeof post.content === 'string' && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
              {typeof post.content === 'object' && (
                <div>
                  {JSON.stringify(post.content, null, 2)}
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-12 pb-8 border-b border-zinc-800">
                <Tag className="w-4 h-4 text-zinc-500" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded text-sm transition"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relPost) => (
                    <PostCard key={relPost.id} post={relPost} variant="default" />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                <h3 className="font-bold mb-4">Sobre el Autor</h3>
                <div className="flex items-start gap-3">
                  {post.author.image ? (
                    <Image
                      src={post.author.image}
                      alt={post.author.name || "Autor"}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {(post.author.name || post.author.email).charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{post.author.name || post.author.email}</p>
                    <p className="text-sm text-zinc-400">Periodista</p>
                  </div>
                </div>
              </div>

              {/* Ad Space */}
              <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 text-center">
                <p className="text-zinc-500 text-sm mb-4">Publicidad</p>
                <div className="w-full h-64 bg-zinc-800 rounded" />
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* SEO Structured Data */}
      <NewsArticleLD
        headline={post.title}
        description={post.excerpt || post.title}
        image={post.coverImage || undefined}
        datePublished={post.publishedAt?.toISOString() || post.createdAt.toISOString()}
        dateModified={post.updatedAt.toISOString()}
        author={{
          name: post.author.name || post.author.email,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app"}/autor/${post.authorId}`,
        }}
        publisher={{
          name: "POLÍTICA ARGENTINA",
          logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app"}/logo.svg`,
        }}
      />
      <BreadcrumbLD
        items={[
          { name: "Inicio", url: process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app" },
          ...(post.category ? [{ name: post.category.name, url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app"}/categoria/${post.category.slug}` }] : []),
          { name: post.title, url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app"}/noticia/${post.slug}` },
        ]}
      />
    </div>
  );
}
