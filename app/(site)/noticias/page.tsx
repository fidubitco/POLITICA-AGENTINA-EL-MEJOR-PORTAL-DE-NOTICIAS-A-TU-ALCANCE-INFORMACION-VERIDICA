import { db } from "@/lib/db";
import Link from "next/link";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Metadata } from "next";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren, { StaggerItem } from "@/components/animations/stagger-children";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Todas las Noticias | POLÍTICA ARGENTINA",
  description: "Explora todas las noticias políticas y económicas de Argentina. Cobertura completa y análisis en profundidad.",
};

export default async function NoticiasPage() {
  const allPosts = await db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 50,
    include: {
      category: { select: { name: true, slug: true } },
      author: { select: { name: true } },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-12">

        <FadeIn direction="up">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Todas las Noticias
            </h1>
            <p className="text-xl text-zinc-400">
              Explora nuestra cobertura completa de la actualidad política y económica argentina
            </p>
          </div>
        </FadeIn>

        {allPosts.length === 0 ? (
          <FadeIn direction="up" delay={0.2}>
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <p className="text-2xl text-zinc-400 mb-4">No hay noticias disponibles en este momento</p>
              <p className="text-zinc-500">Vuelve pronto para más contenido</p>
            </Card>
          </FadeIn>
        ) : (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/noticia/${post.slug}`}>
                  <Card className="overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-500 group h-full">
                    {post.coverImage && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 text-xs font-bold">
                              {post.category.name}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <CardContent className="p-6 space-y-3">
                      <h2 className="font-black text-xl leading-tight group-hover:text-red-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-800">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.publishedAt ? formatRelativeTime(post.publishedAt) : 'Reciente'}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views.toLocaleString()}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </div>
  );
}
