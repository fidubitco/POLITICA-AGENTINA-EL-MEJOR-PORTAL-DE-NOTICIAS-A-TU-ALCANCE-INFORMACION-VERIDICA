'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Clock, TrendingUp, Eye, Share2, Bookmark, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  getFeaturedNoticia, 
  getRecentNoticias, 
  trendingTopics,
  type Noticia 
} from './data/noticias';

// Datos del dólar actualizados desde dolarhoy.com
const dolarData = {
  blue: {
    compra: 1425,
    venta: 1445,
    variacion: 0.00,
  },
  oficial: {
    compra: 1425,
    venta: 1475,
    variacion: 0.00,
  },
  mep: {
    compra: 1484.10,
    venta: 1495.20,
    variacion: 0.00,
  },
  ccl: {
    compra: 1496.30,
    venta: 1499.10,
    variacion: 0.00,
  },
  actualizado: new Date(),
};

const featuredNews = getFeaturedNoticia();

const allNews = getRecentNoticias(12);
const topNews = allNews.slice(1, 4); // Noticias 2-4
const latestNews = allNews.slice(4, 8); // Noticias 5-8

function getCategoryClass(slug: string) {
  const classes: Record<string, string> = {
    politica: 'category-politica',
    economia: 'category-economia',
    judicial: 'category-judicial',
    internacional: 'category-internacional',
    sociedad: 'category-sociedad',
  };
  return classes[slug] || 'bg-gray-600 text-white';
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Bar */}
      {featuredNews.isBreaking && (
        <div className="breaking-news-bar">
          <div className="container mx-auto px-4 flex items-center gap-3">
            <span className="font-bold uppercase">🔴 Última Hora</span>
            <span className="flex-1 truncate">{featuredNews.title}</span>
          </div>
        </div>
      )}

      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            <article className="article-card-featured">
              <div className="relative h-[400px] md:h-[500px] mb-6">
                <Image
                  src={featuredNews.imageUrl}
                  alt={featuredNews.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`category-badge ${getCategoryClass(featuredNews.categorySlug)}`}>
                    {featuredNews.category}
                  </span>
                  {featuredNews.isBreaking && (
                    <span className="text-red-600 text-sm font-bold uppercase">
                      Breaking News
                    </span>
                  )}
                </div>
                <h2 className="article-title article-title-large text-balance">
                  {featuredNews.title}
                </h2>
                {featuredNews.subtitle && (
                  <p className="text-xl text-gray-700 font-medium text-balance">
                    {featuredNews.subtitle}
                  </p>
                )}
                <p className="article-excerpt">
                  {featuredNews.excerpt}
                </p>
                <div className="article-meta">
                  <span>Por {featuredNews.author}</span>
                  <span>•</span>
                  <time>
                    {formatDistanceToNow(featuredNews.publishedAt, { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {featuredNews.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </article>

            {/* Top News Grid */}
            <section>
              <h3 className="text-2xl font-serif font-bold mb-6 pb-3 border-b-2 border-gray-900">
                Noticias Destacadas
              </h3>
              <div className="news-grid">
                {topNews.map((article) => (
                  <article key={article.id} className="article-card group cursor-pointer">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-3 p-4">
                      <span className={`category-badge ${getCategoryClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                      <h3 className="article-title group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="article-excerpt line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="article-meta">
                        <span>{article.author}</span>
                        <span>•</span>
                        <time>
                          {formatDistanceToNow(article.publishedAt, { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Latest News List */}
            <section>
              <h3 className="text-2xl font-serif font-bold mb-6 pb-3 border-b-2 border-gray-900">
                Últimas Noticias
              </h3>
              <div className="news-list">
                {latestNews.map((article) => (
                  <article key={article.id} className="article-card group cursor-pointer flex gap-4 p-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className={`category-badge ${getCategoryClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="article-meta">
                        <time>
                          {formatDistanceToNow(article.publishedAt, { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </time>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Cotización del Dólar */}
            <div className="sidebar-widget bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <h3 className="sidebar-title flex items-center gap-2 text-green-900 border-green-900">
                <DollarSign className="w-5 h-5" />
                Cotización del Dólar
              </h3>
              <div className="space-y-3">
                {/* Dólar Blue */}
                <div className="bg-white p-4 rounded border-l-4 border-green-600">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-green-900">Dólar Blue</span>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                      {dolarData.blue.variacion.toFixed(2)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600 text-xs">Compra</span>
                      <p className="font-bold text-lg">${dolarData.blue.compra.toLocaleString('es-AR')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">Venta</span>
                      <p className="font-bold text-lg text-green-600">${dolarData.blue.venta.toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Dólar Oficial */}
                <div className="bg-white p-3 rounded border-l-4 border-blue-600">
                  <span className="font-semibold text-sm">Dólar Oficial</span>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                    <div>
                      <span className="text-gray-600">Compra</span>
                      <p className="font-bold">${dolarData.oficial.compra.toLocaleString('es-AR')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Venta</span>
                      <p className="font-bold">${dolarData.oficial.venta.toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Dólar MEP */}
                <div className="bg-white p-3 rounded border-l-4 border-purple-600">
                  <span className="font-semibold text-sm">Dólar MEP</span>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                    <div>
                      <span className="text-gray-600">Compra</span>
                      <p className="font-bold">${dolarData.mep.compra.toLocaleString('es-AR')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Venta</span>
                      <p className="font-bold">${dolarData.mep.venta.toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Actualizado: {dolarData.actualizado.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <a 
                href="https://dolarhoy.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center text-xs text-blue-600 hover:text-blue-800 mt-2"
              >
                Fuente: DolarHoy.com
              </a>
            </div>

            {/* Trending Topics */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Temas del Momento
              </h3>
              <ul className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="font-medium text-gray-900">{topic.name}</span>
                    <span className="text-sm text-gray-500">{topic.count.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Most Read */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Más Leídas</h3>
              <ol className="space-y-4">
                {topNews.slice(0, 5).map((article, index) => (
                  <li key={article.id} className="flex gap-3 group cursor-pointer">
                    <span className="text-2xl font-bold text-gray-300 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-sm group-hover:text-blue-600 transition-colors line-clamp-3">
                        {article.title}
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        {article.views.toLocaleString()} lecturas
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget bg-blue-50 border-blue-200">
              <h3 className="sidebar-title text-blue-900 border-blue-900">
                Newsletter
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Recibe las noticias más importantes en tu email
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-section py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-4">
                Política Argentina
              </h4>
              <p className="text-sm text-gray-400">
                Portal líder de noticias políticas de Argentina. Cobertura en tiempo real y análisis experto.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Secciones</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/politica" className="footer-link">Política</Link></li>
                <li><Link href="/economia" className="footer-link">Economía</Link></li>
                <li><Link href="/judicial" className="footer-link">Judicial</Link></li>
                <li><Link href="/internacional" className="footer-link">Internacional</Link></li>
                <li><Link href="/sociedad" className="footer-link">Sociedad</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Información</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre-nosotros" className="footer-link">Sobre Nosotros</Link></li>
                <li><Link href="/contacto" className="footer-link">Contacto</Link></li>
                <li><Link href="/terminos" className="footer-link">Términos y Condiciones</Link></li>
                <li><Link href="/privacidad" className="footer-link">Política de Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Síguenos</h5>
              <div className="flex gap-4">
                <a href="https://twitter.com/politicaarg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="https://facebook.com/politicaargentina" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="https://instagram.com/politicaargentina" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 Política Argentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
