/**
 * 📑 PÁGINA DE CATEGORÍA - ENTERPRISE GRADE
 * Página optimizada para mostrar noticias por categoría
 */

import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { MainMenu } from '../components/MainMenu';
import { getCategoryBySlug } from '../data/categories';
import { getNewsByCategory } from '../data/newsTemplates';

export const CategoryPage: React.FC = () => {
  const params = useParams();
  const categorySlug = params.category as string;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const category = getCategoryBySlug(categorySlug);
  const news = getNewsByCategory(categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainMenu />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Categoría no encontrada
          </h1>
          <Link href="/">
            <a className="text-blue-600 hover:text-blue-700">
              Volver al inicio
            </a>
          </Link>
          </div>
      </div>
    );
  }

  const sortedNews = [...news].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    return b.views - a.views;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{category.name} - Noticias y Actualidad | Política Argentina</title>
        <meta name="description" content={category.description} />
        <meta name="keywords" content={category.keywords.join(', ')} />
        <link rel="canonical" href={`https://politicaargentina.com/${category.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${category.name} - Política Argentina`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:url" content={`https://politicaargentina.com/${category.slug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content={`${category.name} - Política Argentina`} />
        <meta name="twitter:description" content={category.description} />
      </Helmet>

      <MainMenu />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/">
              <a className="hover:text-blue-600">Inicio</a>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>

          <div className="flex items-center justify-between">
              <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {category.name}
                </h1>
              <p className="text-lg text-gray-600">{category.description}</p>
            </div>
          </div>
                </div>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                  <a className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    {sub.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filters and View Mode */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Más recientes</option>
                <option value="popular">Más populares</option>
              </select>
            </div>
            <span className="text-sm text-gray-600">
              {sortedNews.length} {sortedNews.length === 1 ? 'noticia' : 'noticias'}
            </span>
              </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* News Grid/List */}
        {sortedNews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No hay noticias disponibles en esta categoría.
            </p>
              </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }
          >
            {sortedNews.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <Link href={`/${category.slug}/${article.slug}`}>
                  <a>
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-news.jpg';
                        }}
                      />
                      {article.breaking && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          URGENTE
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500">{article.author}</span>
                        {article.views > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <TrendingUp className="h-3 w-3" />
                            <span>{article.views.toLocaleString()} vistas</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              </article>
            ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default CategoryPage;
