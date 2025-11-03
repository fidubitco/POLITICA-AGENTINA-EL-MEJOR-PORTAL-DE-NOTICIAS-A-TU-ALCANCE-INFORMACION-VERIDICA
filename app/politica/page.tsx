'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, TrendingUp, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { noticiasPolitica } from '../data/noticias-completas';

function getCategoryClass(slug: string) {
  return 'category-politica';
}

export default function PoliticaPage() {
  const featuredNews = noticiasPolitica[0];
  const topNews = noticiasPolitica.slice(1, 7);
  const moreNews = noticiasPolitica.slice(7);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="top-bar no-print">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <time className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleDateString('es-AR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </div>
          <div className="flex items-center gap-4">
            <span>Buenos Aires, Argentina</span>
            <span>|</span>
            <span className="text-green-400">● En Vivo</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="logo-text hover:text-gray-700 transition-colors">
              Política Argentina
            </Link>
            <p className="text-xs text-gray-500 hidden md:block">
              El portal líder de noticias políticas
            </p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="border-t border-gray-200 no-print">
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-6 py-3 overflow-x-auto">
              <li><Link href="/" className="nav-link">Inicio</Link></li>
              <li><Link href="/politica" className="nav-link nav-link-active">Política</Link></li>
              <li><Link href="/economia" className="nav-link">Economía</Link></li>
              <li><Link href="/judicial" className="nav-link">Judicial</Link></li>
              <li><Link href="/internacional" className="nav-link">Internacional</Link></li>
              <li><Link href="/sociedad" className="nav-link">Sociedad</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Política</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8 pb-6 border-b-4 border-blue-600">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
            Política
          </h1>
          <p className="text-lg text-gray-600">
            Cobertura completa de la actualidad política argentina. Gobierno, Congreso, elecciones y análisis político.
          </p>
        </div>

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
                      Última Hora
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
                Noticias Destacadas de Política
              </h3>
              <div className="news-grid">
                {topNews.map((article) => (
                  <article key={article.id} className="article-card group cursor-pointer">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <span className={`category-badge ${getCategoryClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                      <h4 className="article-title mt-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="article-excerpt mt-2 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="article-meta mt-4">
                        <span>Por {article.author}</span>
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

            {/* More News List */}
            <section>
              <h3 className="text-2xl font-serif font-bold mb-6 pb-3 border-b-2 border-gray-900">
                Más Noticias de Política
              </h3>
              <div className="news-list">
                {moreNews.map((article) => (
                  <article key={article.id} className="flex flex-col md:flex-row gap-4 pb-4 mb-4 border-b border-gray-200 last:border-0">
                    <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 20vw"
                      />
                    </div>
                    <div className="flex-1">
                      <span className={`category-badge ${getCategoryClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                      <h4 className="article-title mt-2 hover:text-blue-700 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="article-excerpt mt-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="article-meta mt-2">
                        <span>Por {article.author}</span>
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
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending Topics */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Temas Políticos del Momento
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Javier Milei</span>
                  <span className="text-sm text-gray-500">15.2K</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Cristina Kirchner</span>
                  <span className="text-sm text-gray-500">12.8K</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Congreso Nacional</span>
                  <span className="text-sm text-gray-500">9.5K</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Reforma Económica</span>
                  <span className="text-sm text-gray-500">8.3K</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Elecciones 2025</span>
                  <span className="text-sm text-gray-500">7.1K</span>
                </li>
              </ul>
            </div>

            {/* Most Read */}
            <div className="sidebar-widget bg-gray-50">
              <h3 className="sidebar-title">
                Más Leídas en Política
              </h3>
              <ol className="space-y-4">
                {noticiasPolitica.slice(0, 5).map((article, index) => (
                  <li key={article.id} className="flex gap-3">
                    <span className="text-3xl font-bold text-blue-600">{index + 1}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors line-clamp-2 cursor-pointer">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {article.views.toLocaleString()} vistas
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget bg-blue-50 border-blue-200">
              <h3 className="sidebar-title text-blue-900 border-blue-900">
                Newsletter Política
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Recibe las noticias políticas más importantes en tu email
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

