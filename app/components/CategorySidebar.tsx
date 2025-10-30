'use client';

import { Category, Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { TrendingUp, DollarSign, Calendar, Users, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CategorySidebarProps {
  category: Category;
  relatedArticles: Article[];
}

export function CategorySidebar({ category, relatedArticles }: CategorySidebarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Artículos relacionados */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" style={{ color: category.color }} />
          Más en {category.name}
        </h3>

        <div className="space-y-4">
          {relatedArticles.slice(0, 4).map((article) => (
            <article key={article.id} className="flex gap-3 group cursor-pointer">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <NewsImage
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  category={article.categorySlug}
                />
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
                  <span>{article.views} vistas</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Estadísticas de categoría */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" style={{ color: category.color }} />
          Estadísticas
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Artículos esta semana</span>
            <span className="font-semibold text-gray-900">24</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Lectores únicos</span>
            <span className="font-semibold text-gray-900">15.2K</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tiempo promedio</span>
            <span className="font-semibold text-gray-900">3:42 min</span>
          </div>
        </div>
      </div>

      {/* Reloj y fecha */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Actualización</h3>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {currentTime.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-gray-600">
            {currentTime.toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Última actualización: hace 5 minutos
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div
        className="rounded-xl p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`
        }}
      >
        <h3 className="font-semibold text-lg mb-2">Newsletter de {category.name}</h3>
        <p className="text-white/80 text-sm mb-4">
          Recibe las noticias más importantes de {category.name.toLowerCase()} en tu email
        </p>

        <form className="space-y-3">
          <input
            type="email"
            placeholder="Tu email"
            className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Suscribirse
          </button>
        </form>
      </div>

      {/* Subcategorías */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Subcategorías</h3>

          <div className="space-y-2">
            {category.subcategories.map((subcategory) => (
              <a
                key={subcategory.id}
                href={`/categoria/${category.slug}/${subcategory.slug}`}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    {subcategory.name}
                  </span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {subcategory.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
