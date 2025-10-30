'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { TrendingUp, Clock, Eye } from 'lucide-react';

interface FeaturedNewsProps {
  articles: Article[];
}

export function FeaturedNews({ articles }: FeaturedNewsProps) {
  if (!articles.length) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Noticias Destacadas</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Artículo principal */}
        <article className="lg:col-span-2 group cursor-pointer">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
            <NewsImage
              src={mainArticle.imageUrl}
              alt={mainArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              category={mainArticle.categorySlug}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  DESTACADO
                </span>
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {mainArticle.category}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-2 line-clamp-2">
                {mainArticle.title}
              </h3>
              <p className="text-gray-200 text-lg line-clamp-2">
                {mainArticle.excerpt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(mainArticle.publishedAt).toLocaleDateString('es-AR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{mainArticle.views.toLocaleString()} vistas</span>
            </div>
          </div>
        </article>

        {/* Artículos laterales */}
        <div className="space-y-6">
          {sideArticles.map((article, index) => (
            <article key={article.id} className="flex gap-4 group cursor-pointer">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <NewsImage
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  category={article.categorySlug}
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    article.breaking
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {article.breaking ? 'ÚLTIMA HORA' : article.category}
                  </span>
                </div>

                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
                  <span>{article.views} vistas</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
