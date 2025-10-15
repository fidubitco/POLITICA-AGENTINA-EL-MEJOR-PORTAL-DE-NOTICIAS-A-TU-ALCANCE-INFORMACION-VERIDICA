import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    excerpt?: string | null;
    coverImage?: string | null;
    publishedAt?: Date | null;
    category?: { name: string; slug: string } | null;
    author: { name?: string | null; email: string };
  };
  variant?: "hero" | "featured" | "default" | "small";
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
  const timeAgo = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true, locale: es })
    : "";

  if (variant === "hero") {
    return (
      <Link href={`/noticia/${post.slug}`} className="group block relative overflow-hidden rounded-xl">
        <div className="aspect-[16/9] relative">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-red-600 text-xs font-bold uppercase mb-3 rounded">
              {post.category.name}
            </span>
          )}
          <h2 className="text-4xl font-bold mb-3 leading-tight group-hover:text-blue-400 transition">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-zinc-300 text-lg mb-3 line-clamp-2">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span>{post.author.name || post.author.email}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/noticia/${post.slug}`} className="group block">
        <div className="aspect-[16/10] relative mb-3 overflow-hidden rounded-lg">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
          )}
        </div>
        {post.category && (
          <span className="inline-block px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold uppercase mb-2 rounded">
            {post.category.name}
          </span>
        )}
        <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-blue-400 transition line-clamp-3">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-zinc-400 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{timeAgo}</span>
        </div>
      </Link>
    );
  }

  if (variant === "small") {
    return (
      <Link href={`/noticia/${post.slug}`} className="group flex gap-3">
        {post.coverImage && (
          <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden rounded">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm leading-tight mb-1 group-hover:text-blue-400 transition line-clamp-3">
            {post.title}
          </h4>
          <span className="text-xs text-zinc-500">{timeAgo}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/noticia/${post.slug}`} className="group block">
      <div className="aspect-[16/10] relative mb-3 overflow-hidden rounded-lg">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
      </div>
      {post.category && (
        <span className="inline-block px-2 py-1 bg-zinc-900 text-xs font-semibold uppercase mb-2 rounded">
          {post.category.name}
        </span>
      )}
      <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-blue-400 transition line-clamp-2">
        {post.title}
      </h3>
      <p className="text-zinc-400 text-sm line-clamp-2">{post.excerpt}</p>
    </Link>
  );
}
