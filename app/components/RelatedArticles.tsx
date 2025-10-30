'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { TrendingUp, Clock, Eye } from 'lucide-react';

interface RelatedArticlesProps {
  articles: Article[];
  currentCategory: string;
}

export function RelatedArticles({ articles, currentCategory }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Artículos Relacionados</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <NewsImage
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                category={article.categorySlug}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {article.breaking && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    ÚLTIMA HORA
                  </span>
                )}
              </div>

              {/* Categoría indicator */}
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold uppercase">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>3 min</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
          Ver más artículos de {currentCategory}
          <TrendingUp className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

