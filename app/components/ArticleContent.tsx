'use client';

import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';
import { Clock, User, Calendar } from 'lucide-react';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  // Simular contenido con párrafos y posibles imágenes inline
  const contentSections = article.content.split('\n\n').filter(section => section.trim());

  return (
    <article className="prose prose-lg max-w-none">
      {/* Meta información adicional */}
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="font-medium">{article.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Publicado el {new Date(article.publishedAt).toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Tiempo de lectura: ~{Math.ceil(article.content.length / 1000)} min</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="space-y-6 text-gray-800 leading-relaxed">
        {contentSections.map((section, index) => {
          // Si la sección contiene una etiqueta de imagen
          if (section.includes('<img')) {
            return (
              <div key={index} className="my-8">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                  <NewsImage
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    category={article.categorySlug}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded px-3 py-2">
                      {article.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          // Si es un párrafo normal
          if (section.startsWith('<p>') || !section.includes('<')) {
            return (
              <p
                key={index}
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: section.replace(/^<p>/, '').replace(/<\/p>$/, '')
                }}
              />
            );
          }

          // Para otras etiquetas HTML
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: section }}
            />
          );
        })}
      </div>

      {/* Separador */}
      <div className="my-12 border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Fin del artículo</span>
          <div className="flex items-center gap-4">
            <span>{article.views} vistas</span>
            <span>{article.likes} likes</span>
            <span>{article.shares} compartidos</span>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          ¿Te gustó este artículo?
        </h3>
        <p className="text-blue-800 mb-4">
          Suscríbete a nuestro newsletter para recibir más contenido como este.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Suscribirse
        </button>
      </div>

      {/* Información del autor */}
      <div className="bg-gray-50 rounded-xl p-6 my-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-gray-600" />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{article.author}</h4>
            <p className="text-gray-600 text-sm mb-3">
              Periodista especializado en temas políticos y económicos de Argentina.
            </p>
            <div className="flex gap-3 text-sm text-gray-500">
              <span>📧 contacto@politicaargentina.com</span>
              <span>📍 Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
