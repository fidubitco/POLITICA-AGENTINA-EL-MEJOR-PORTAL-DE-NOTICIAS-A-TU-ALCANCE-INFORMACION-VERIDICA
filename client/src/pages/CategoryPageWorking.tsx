/**
 * 📂 PÁGINA DE CATEGORÍA FUNCIONAL
 * Sistema completo de categorías con noticias reales
 */

import React from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Eye, ThumbsUp, Share2 } from 'lucide-react';
import { getArticlesByCategory, allArticles } from '../data/allNews';

const categories = {
  politica: { name: 'Política', color: '#3B82F6', description: 'Últimas noticias sobre política argentina' },
  economia: { name: 'Economía', color: '#10B981', description: 'Análisis económico y financiero' },
  sociedad: { name: 'Sociedad', color: '#F59E0B', description: 'Noticias de la sociedad argentina' },
  internacional: { name: 'Internacional', color: '#EF4444', description: 'Noticias internacionales' },
  deportes: { name: 'Deportes', color: '#8B5CF6', description: 'Deportes y competiciones' },
  cultura: { name: 'Cultura', color: '#EC4899', description: 'Arte, cultura y entretenimiento' },
};

export const CategoryPageWorking: React.FC = () => {
  const params = useParams();
  const categorySlug = (params.category || 'politica').toLowerCase();
  
  console.log('CategoryPageWorking - categorySlug:', categorySlug);
  console.log('CategoryPageWorking - params:', params);
  
  const category = categories[categorySlug as keyof typeof categories] || categories.politica;
  
  // Obtener artículos de esta categoría
  const articles = getArticlesByCategory(categorySlug);
  
  console.log('CategoryPageWorking - articles found:', articles.length);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Formatear número
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  return (
    <>
      <Helmet>
        <title>{category.name} - Política Argentina</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} - Política Argentina`} />
        <meta property="og:description" content={category.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/">
              <a className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al inicio
              </a>
            </Link>
          </div>
        </header>

        {/* Category Header */}
        <div 
          className="py-12 mb-8"
          style={{ backgroundColor: category.color }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-white/90">
              {category.description}
            </p>
            <p className="text-white/80 mt-2">
              {articles.length} {articles.length === 1 ? 'artículo' : 'artículos'}
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No hay artículos disponibles en esta categoría.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link key={article.id} href={`/noticia/${article.id}`}>
                  <a className="group">
                    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {article.breaking && (
                          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            URGENTE
                          </div>
                        )}
                        {article.featured && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            DESTACADO
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category Badge */}
                        <div 
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 self-start"
                          style={{ backgroundColor: category.color }}
                        >
                          {article.category}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                          {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {formatNumber(article.views)}
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {formatNumber(article.likes)}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>

                        {/* Author */}
                        <div className="mt-3 text-sm text-gray-500">
                          Por {article.author}
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* All Categories */}
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Explorar otras categorías
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categories).map(([slug, cat]) => (
                <Link key={slug} href={`/categoria/${slug}`}>
                  <a 
                    className="p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{ 
                      backgroundColor: cat.color,
                      opacity: slug === categorySlug ? 1 : 0.8
                    }}
                  >
                    <div className="text-white font-bold">
                      {cat.name}
                    </div>
                    <div className="text-white/80 text-sm mt-1">
                      {getArticlesByCategory(slug).length} artículos
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPageWorking;

