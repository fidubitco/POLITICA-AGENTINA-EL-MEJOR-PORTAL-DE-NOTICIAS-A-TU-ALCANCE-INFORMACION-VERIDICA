'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { Clock, Eye, Heart, Share2, User, Calendar } from 'lucide-react';
import { useState } from 'react';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [likes, setLikes] = useState(article.likes);
  const [shares, setShares] = useState(article.shares);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShares(prev => prev + 1);
    }
  };

  return (
    <header className="relative">
      {/* Imagen principal */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <NewsImage
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          category={article.categorySlug}
          width={1200}
          height={500}
          priority
        />

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-3">
          {article.breaking && (
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              ÚLTIMA HORA
            </span>
          )}
          {article.featured && (
            <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              DESTACADO
            </span>
          )}
        </div>

        {/* Categoría */}
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
            {article.category}
          </span>
        </div>

        {/* Contenido del header */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg lg:text-xl text-gray-200 mb-6 max-w-4xl leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('es-AR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleTimeString('es-AR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de acciones */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()} vistas</span>
              </div>

              <button
                onClick={handleLike}
                className={`flex items-center gap-2 hover:text-red-600 transition-colors ${
                  hasLiked ? 'text-red-600' : ''
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{shares}</span>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

