/**
 * 📑 PÁGINA DE CATEGORÍA PROFESIONAL
 * Muestra noticias reales por categoría con diseño BBC/NYT
 */

import React from 'react';
import { useParams, Link } from 'wouter';
import { ChevronRight, Calendar, TrendingUp } from 'lucide-react';
import { allArticles } from '../data/allNews';
import { SupremeSEO } from '../components/SupremeSEO';
import ArticleCardProfessional from '../components/ArticleCardProfessional';
import DolarWidget from '../components/DolarWidget';

const categoryInfo: Record<string, { name: string; description: string; color: string }> = {
  politica: {
    name: 'Política',
    description: 'Noticias políticas de Argentina, gobierno, congreso y elecciones',
    color: '#1565c0'
  },
  economia: {
    name: 'Economía',
    description: 'Economía argentina, dólar, inflación, mercados y finanzas',
    color: '#2e7d32'
  },
  judicial: {
    name: 'Judicial',
    description: 'Noticias judiciales, causas, sentencias y justicia argentina',
    color: '#c62828'
  },
  sociedad: {
    name: 'Sociedad',
    description: 'Noticias sociales, educación, salud y cultura argentina',
    color: '#6a1b9a'
  },
  internacional: {
    name: 'Internacional',
    description: 'Noticias internacionales y relaciones exteriores de Argentina',
    color: '#00838f'
  },
  opinion: {
    name: 'Opinión',
    description: 'Columnas de opinión, análisis político y editorial',
    color: '#0277bd'
  },
  elecciones: {
    name: 'Elecciones',
    description: 'Cobertura electoral, encuestas y resultados',
    color: '#ad1457'
  },
  provincias: {
    name: 'Provincias',
    description: 'Noticias de las provincias argentinas',
    color: '#00695c'
  }
};

export const CategoryPageProfessional: React.FC = () => {
  const params = useParams();
  const categorySlug = params.category as string;

  const category = categoryInfo[categorySlug];

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
            Categoría no encontrada
          </h1>
          <Link href="/">
            <span className="text-red-700 hover:text-red-900 cursor-pointer">
              Volver al inicio
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Filtrar artículos publicados de esta categoría
  const categoryArticles = allArticles.filter(
    article => article.status === 'published' && article.category === categorySlug
  );

  // Artículos destacados (featured o con más vistas)
  const featuredArticles = categoryArticles
    .filter(a => a.featured)
    .slice(0, 1);

  // Artículos recientes
  const recentArticles = categoryArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 12);

  // Artículos más leídos
  const trendingArticles = categoryArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return (
    <>
      <SupremeSEO
        title={`${category.name} - Noticias y Actualidad | Política Argentina`}
        description={category.description}
        keywords={`${category.name.toLowerCase()}, noticias ${category.name.toLowerCase()}, argentina`}
        url={`https://politicaargentina.com/${categorySlug}`}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">
                <span className="text-gray-600 hover:text-red-700 cursor-pointer">Inicio</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{category.name}</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <h1 
              className="font-serif text-4xl md:text-5xl font-bold mb-3"
              style={{ color: category.color }}
            >
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {category.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{categoryArticles.length} artículos</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Actualizado hoy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {categoryArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                No hay artículos publicados en esta categoría aún.
              </p>
              <Link href="/">
                <span className="text-red-700 hover:text-red-900 cursor-pointer font-medium">
                  Ver todas las noticias →
                </span>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Article */}
                {featuredArticles.length > 0 && (
                  <section className="mb-8">
                    <ArticleCardProfessional 
                      article={featuredArticles[0]} 
                      variant="featured"
                      showImage={true}
                      showExcerpt={true}
                      showMeta={true}
                    />
                  </section>
                )}

                {/* Recent Articles */}
                <section>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2" style={{ borderColor: category.color }}>
                    Últimas Noticias
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {recentArticles.map((article) => (
                      <ArticleCardProfessional 
                        key={article.id}
                        article={article} 
                        variant="large"
                        showImage={true}
                        showExcerpt={false}
                        showMeta={true}
                      />
                    ))}
                  </div>

                  {categoryArticles.length > 12 && (
                    <div className="mt-8 text-center">
                      <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors">
                        Cargar más noticias
                      </button>
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Dolar Widget */}
                <div className="bg-gray-50 border border-gray-200 p-4 sticky top-20">
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                    Cotización del Dólar
                  </h3>
                  <DolarWidget />
                </div>

                {/* Trending Articles */}
                {trendingArticles.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 p-4">
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" style={{ color: category.color }} />
                      Más Leídas en {category.name}
                    </h3>
                    <div className="space-y-1">
                      {trendingArticles.map((article, index) => (
                        <div key={article.id} className="flex gap-3 py-3 border-b border-gray-200 last:border-0">
                          <span className="font-serif text-2xl font-bold flex-shrink-0 w-8" style={{ color: category.color }}>
                            {index + 1}
                          </span>
                          <Link href={`/${article.category}/${article.slug}`}>
                            <div className="cursor-pointer group">
                              <h4 className="font-serif text-sm font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <span>{article.views.toLocaleString()} vistas</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className="bg-gray-900 text-white p-6">
                  <h3 className="font-serif text-xl font-bold mb-3">
                    Newsletter de {category.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Recibe las noticias más importantes de {category.name.toLowerCase()} en tu correo.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="w-full px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                    <button
                      type="submit"
                      className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Suscribirse
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default CategoryPageProfessional;

