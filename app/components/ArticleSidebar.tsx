'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { TrendingUp, Share2, Bookmark, Flag, DollarSign, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ArticleSidebarProps {
  article: Article;
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dollarQuote, setDollarQuote] = useState({ blue: 1200, oficial: 890 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulación de API para cotización del dólar
    const fetchDollarQuote = async () => {
      try {
        setDollarQuote({
          blue: 1200 + Math.random() * 20 - 10,
          oficial: 890 + Math.random() * 10 - 5,
        });
      } catch (error) {
        console.error('Error fetching dollar quote:', error);
      }
    };

    fetchDollarQuote();
    const interval = setInterval(fetchDollarQuote, 300000); // Actualizar cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Aquí iría la lógica para guardar en localStorage o enviar a API
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
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleReport = () => {
    // Lógica para reportar artículo
    alert('Artículo reportado. Gracias por tu feedback.');
  };

  return (
    <div className="space-y-8">
      {/* Acciones del artículo */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Acciones</h3>

        <div className="space-y-3">
          <button
            onClick={handleBookmark}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Guardado' : 'Guardar'}</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Compartir</span>
          </button>

          <button
            onClick={handleReport}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Flag className="w-5 h-5" />
            <span>Reportar</span>
          </button>
        </div>
      </div>

      {/* Información del artículo */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Información</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Categoría</span>
            <span className="font-medium text-gray-900">{article.category}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Publicado</span>
            <span className="font-medium text-gray-900">
              {new Date(article.publishedAt).toLocaleDateString('es-AR')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Última actualización</span>
            <span className="font-medium text-gray-900">
              {new Date(article.updatedAt).toLocaleDateString('es-AR')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Vistas</span>
            <span className="font-medium text-gray-900">{article.views.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Likes</span>
            <span className="font-medium text-gray-900">{article.likes}</span>
          </div>
        </div>
      </div>

      {/* Cotización del dólar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Dólar Hoy</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Dólar Blue</span>
            <span className="font-semibold text-gray-900">
              ${dollarQuote.blue.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Dólar Oficial</span>
            <span className="font-semibold text-gray-900">
              ${dollarQuote.oficial.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Brecha</span>
              <span className="font-semibold text-orange-600">
                {((dollarQuote.blue / dollarQuote.oficial - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center pt-2">
            Actualizado: {currentTime.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Tags del artículo */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Etiquetas</h3>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Estadísticas de engagement */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Engagement</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Compartidos en redes</span>
            <span className="font-semibold text-gray-900">{article.shares}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tiempo promedio de lectura</span>
            <span className="font-semibold text-gray-900">3:42 min</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Posición en tendencias</span>
            <span className="font-semibold text-green-600">#2</span>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
        <p className="text-blue-100 text-sm mb-4">
          Recibe las noticias más importantes en tu email
        </p>

        <form className="space-y-3">
          <input
            type="email"
            placeholder="Tu email"
            className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </div>
  );
}
