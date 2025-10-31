'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { Clock, Eye, Heart, Share2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'large' | 'medium' | 'small' | 'list';
  showCategory?: boolean;
  showExcerpt?: boolean;
  showStats?: boolean;
  priority?: boolean;
}

export function ArticleCard({
  article,
  variant = 'default',
  showCategory = true,
  showExcerpt = true,
  showStats = true,
  priority = false,
}: ArticleCardProps) {
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: `${window.location.origin}/noticia/${article.slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/noticia/${article.slug}`);
    }
  };

  const cardClasses = {
    default: 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden',
    featured: 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:scale-105',
    large: 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden md:col-span-2',
    medium: 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden',
    small: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden',
    list: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex gap-4',
  };

  const imageClasses = {
    default: 'aspect-[4/3]',
    featured: 'aspect-[16/9]',
    large: 'aspect-[16/9]',
    medium: 'aspect-[4/3]',
    small: 'aspect-[4/3]',
    list: 'w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden',
  };

  const titleClasses = {
    default: 'text-lg font-semibold',
    featured: 'text-2xl font-bold',
    large: 'text-xl font-bold',
    medium: 'text-lg font-semibold',
    small: 'text-sm font-medium',
    list: 'text-base font-semibold',
  };

  return (
    <Link href={`/noticia/${article.slug}`} className={cardClasses[variant]}>
      {/* Imagen */}
      <div className={`relative overflow-hidden ${imageClasses[variant]}`}>
        <NewsImage
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          category={article.categorySlug}
          priority={priority}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {article.breaking && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              ÚLTIMA HORA
            </span>
          )}
          {article.featured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              DESTACADO
            </span>
          )}
        </div>

        {/* Categoría indicator */}
        <div className="absolute top-4 right-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: getCategoryColor(article.categorySlug)
            }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className={`p-6 ${variant === 'list' ? 'flex-1' : ''}`}>
        {/* Categoría y fecha */}
        {showCategory && (
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2 py-1 rounded-full text-xs font-semibold text-white"
              style={{
                backgroundColor: getCategoryColor(article.categorySlug)
              }}
            >
              {article.category}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString('es-AR')}
            </span>
          </div>
        )}

        {/* Título */}
        <h3 className={`${titleClasses[variant]} text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        {showExcerpt && variant !== 'small' && (
          <p className={`text-gray-600 mb-3 line-clamp-2 ${
            variant === 'list' ? 'text-sm' : 'text-sm'
          }`}>
            {article.excerpt}
          </p>
        )}

        {/* Estadísticas */}
        {showStats && (
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{article.views}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                  hasLiked ? 'text-red-600' : ''
                }`}
              >
                <Heart className={`w-3 h-3 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>{article.shares}</span>
              </button>
            </div>

            {article.featured && (
              <div className="flex items-center gap-1 text-yellow-600">
                <TrendingUp className="w-3 h-3" />
                <span className="font-medium">Trending</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

// Función helper para obtener colores de categoría
function getCategoryColor(categorySlug: string): string {
  const colors: Record<string, string> = {
    politica: '#1565c0',
    economia: '#2e7d32',
    judicial: '#c62828',
    sociedad: '#f57c00',
    internacional: '#d32f2f',
    opinion: '#00838f',
    elecciones: '#c2185b',
    provincias: '#00695c',
  };
  return colors[categorySlug] || '#6b7280';
}


