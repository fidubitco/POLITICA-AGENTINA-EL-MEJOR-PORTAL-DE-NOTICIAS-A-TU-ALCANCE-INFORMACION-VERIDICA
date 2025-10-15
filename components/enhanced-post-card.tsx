'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface EnhancedPostCardProps {
  title: string;
  excerpt?: string | null;
  slug: string;
  coverImage?: string | null;
  category?: {
    name: string;
    slug: string;
  } | null;
  publishedAt?: Date | null;
  views?: number;
  featured?: boolean;
  breaking?: boolean;
  index?: number;
}

export default function EnhancedPostCard({
  title,
  excerpt,
  slug,
  coverImage,
  category,
  publishedAt,
  views = 0,
  featured = false,
  breaking = false,
  index = 0,
}: EnhancedPostCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
    },
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        "group relative overflow-hidden rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300",
        featured && "md:col-span-2 md:row-span-2",
        breaking && "ring-2 ring-red-600/50"
      )}
    >
      <Link href={`/noticia/${slug}`} className="block">
        {/* Image Container */}
        <div className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/9]" : "aspect-[16/10]"
        )}>
          <motion.div
            variants={imageVariants}
            className="absolute inset-0"
          >
            <Image
              src={coverImage || '/placeholder.jpg'}
              alt={title}
              fill
              sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover"
              quality={90}
              priority={index < 3}
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Hover Overlay */}
          <motion.div
            variants={overlayVariants}
            className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"
          />

          {/* Breaking Badge */}
          {breaking && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="absolute top-4 left-0 bg-red-600 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Último Momento
              </span>
            </motion.div>
          )}

          {/* Category Badge */}
          {category && !breaking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wide rounded-full shadow-lg"
            >
              {category.name}
            </motion.div>
          )}

          {/* Views Counter */}
          {views > 0 && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
              <Eye className="w-3 h-3" />
              <span>{views.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn(
          "p-5",
          featured && "md:p-6"
        )}>
          {/* Title */}
          <h3 className={cn(
            "font-bold leading-tight mb-2 text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2",
            featured ? "text-2xl md:text-3xl" : "text-lg"
          )}>
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className={cn(
              "text-zinc-400 mb-3 line-clamp-2",
              featured ? "text-base md:line-clamp-3" : "text-sm"
            )}>
              {excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <time dateTime={publishedAt?.toISOString()}>
                {formatDate(publishedAt)}
              </time>
            </div>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.div>
      </Link>
    </motion.article>
  );
}

