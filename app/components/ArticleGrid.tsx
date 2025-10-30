'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { Clock, Eye, Heart, Share2, TrendingUp } from 'lucide-react';

interface ArticleGridProps {
  articles: Article[];
  featured?: boolean;
}

export function ArticleGrid({ articles, featured = false }: ArticleGridProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay artículos disponibles en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      featured
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2'
    }`}>
      {articles.map((article) => (
        <article
          key={article.id}
          className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden ${
            featured ? 'transform hover:scale-105' : ''
          }`}
        >
          {/* Imagen */}
          <div className={`relative overflow-hidden ${
            featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
          }`}>
            <NewsImage
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              category={article.categorySlug}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {article.breaking && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
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
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold uppercase">
                {article.category}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(article.publishedAt).toLocaleDateString('es-AR')}
              </span>
            </div>

            <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${
              featured ? 'text-lg' : 'text-base'
            }`}>
              {article.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-2">
              {article.excerpt}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{article.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-3 h-3" />
                  <span>{article.shares}</span>
                </div>
              </div>

              {article.featured && (
                <div className="flex items-center gap-1 text-yellow-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">Trending</span>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
