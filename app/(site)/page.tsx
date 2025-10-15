import { prisma } from "@/lib/db";
import { PostStatus } from "@prisma/client";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: { publishedAt: "desc" },
    take: 10,
    include: { category: true, author: { select: { name: true } } },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Últimas Noticias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <Link href={`/noticia/${post.slug}`}>
              <h2 className="text-xl font-bold mb-2 hover:text-blue-400">{post.title}</h2>
              {post.excerpt && <p className="text-zinc-400">{post.excerpt}</p>}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
