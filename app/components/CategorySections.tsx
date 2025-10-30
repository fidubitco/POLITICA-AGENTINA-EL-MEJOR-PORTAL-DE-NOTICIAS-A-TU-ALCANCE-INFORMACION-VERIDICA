'use client';

import { Article } from '@/data/allNews';
import { categories } from '@/data/categories';
import { NewsImage } from '@/components/NewsImage';
import { ChevronRight, TrendingUp } from 'lucide-react';

interface CategorySectionsProps {
  articles: Article[];
}

export function CategorySections({ articles }: CategorySectionsProps) {
  return (
    <div className="space-y-12">
      {categories.slice(0, 6).map((category) => {
        const categoryArticles = articles
          .filter(article => article.categorySlug === category.slug)
          .slice(0, 6);

        if (categoryArticles.length === 0) return null;

        return (
          <section key={category.slug} className="space-y-6">
            {/* Header de categoría */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-12 rounded-r-lg"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Ver más
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid de artículos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden ${
                    index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${
                    index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}>
                    <NewsImage
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      category={article.categorySlug}
                    />
                    {article.breaking && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          ÚLTIMA HORA
                        </span>
                      </div>
                    )}
                    <div
                      className="absolute top-4 right-4 w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                      </span>
                    </div>

                    <h4 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${
                      index === 0 ? 'text-lg' : 'text-base'
                    }`}>
                      {article.title}
                    </h4>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span>{article.views} vistas</span>
                        <span>{article.likes} likes</span>
                      </div>
                      {article.featured && (
                        <div className="flex items-center gap-1 text-yellow-600">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-medium">Destacado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}