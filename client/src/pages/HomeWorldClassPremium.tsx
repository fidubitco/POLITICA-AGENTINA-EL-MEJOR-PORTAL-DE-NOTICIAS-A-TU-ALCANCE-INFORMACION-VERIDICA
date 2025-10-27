/**
 * 🏠 HOME WORLD CLASS PREMIUM
 * Diseño inspirado en BBC.com y New York Times
 * Mobile-first, responsive, SEO-optimized
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Clock, TrendingUp, Eye, Share2, Menu, X, Search, Globe, Sun, Moon } from 'lucide-react';
import { allArticles } from '../data/allNews';
import { categories } from '../data/categories';
import { useTheme } from '../contexts/ThemeContext';
import { SupremeSEO } from '../components/SupremeSEO';
import DolarWidget from '../components/DolarWidget';
import '../styles/world-class-premium.css';

export const HomeWorldClassPremium: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Obtener artículos
  const breakingNews = allArticles.filter(a => a.breaking && a.status === 'published').slice(0, 1)[0];
  const featuredArticle = allArticles.filter(a => a.featured && a.status === 'published').slice(0, 1)[0];
  const latestArticles = allArticles.filter(a => a.status === 'published').slice(0, 12);
  const politicaArticles = allArticles.filter(a => a.category === 'politica' && a.status === 'published').slice(0, 4);
  const economiaArticles = allArticles.filter(a => a.category === 'economia' && a.status === 'published').slice(0, 4);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <SupremeSEO
        title="Política Argentina - Portal de Noticias Políticas"
        description="Portal profesional de noticias políticas de Argentina. Cobertura completa de política, economía, sociedad y más."
        keywords="política argentina, noticias argentina, milei, cristina kirchner, economía, dólar"
        url="https://politicaargentina.com/"
      />

      <div className="world-class-layout">
        {/* Breaking News Banner */}
        {breakingNews && (
          <div className="breaking-news no-print">
            <div className="container">
              <div className="flex items-center gap-4">
                <span className="breaking-label">ÚLTIMA HORA</span>
                <Link href={`/${breakingNews.category}/${breakingNews.slug}`}>
                  <span className="text-white hover:underline">{breakingNews.title}</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="world-class-header no-print">
          {/* Header Top */}
          <div className="header-top">
            <div className="container">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {formatTime(currentTime)}
                  </span>
                  <span className="hidden md:inline text-gray-600">
                    {formatDate(currentTime)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <Globe className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Header Main */}
          <div className="header-main">
            <div className="container">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <h1 className="logo">Política Argentina</h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                  <ul className="nav-main">
                    {categories.slice(0, 6).map((cat) => (
                      <li key={cat.slug}>
                        <Link href={`/${cat.slug}`}>
                          <a className="nav-link">{cat.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="container py-4">
                <nav>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link href={`/${cat.slug}`}>
                          <a className="block py-2 text-lg hover:text-red-600 transition">
                            {cat.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="container py-8">
          {/* Hero Section */}
          {featuredArticle && (
            <section className="hero-section">
              <div className="hero-main">
                {/* Featured Article */}
                <article className="hero-featured">
                  <Link href={`/${featuredArticle.category}/${featuredArticle.slug}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        className="hero-image"
                        loading="eager"
                      />
                    </div>
                    <div className="hero-content">
                      <span className="hero-category">{featuredArticle.category}</span>
                      <h2 className="hero-title">{featuredArticle.title}</h2>
                      <p className="hero-excerpt">{featuredArticle.excerpt}</p>
                      <div className="hero-meta">
                        <span>{featuredArticle.author}</span>
                        <span>•</span>
                        <span>{new Date(featuredArticle.publishedAt).toLocaleDateString('es-AR')}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {featuredArticle.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>

                {/* Sidebar - Top Stories */}
                <aside>
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-red-600">
                    Más Leídas
                  </h3>
                  <div className="space-y-4">
                    {latestArticles.slice(0, 5).map((article, index) => (
                      <article key={article.id} className="flex gap-3 pb-4 border-b border-gray-200">
                        <span className="text-3xl font-bold text-gray-300">{index + 1}</span>
                        <div>
                          <Link href={`/${article.category}/${article.slug}`}>
                            <h4 className="font-bold text-base hover:text-red-600 transition line-clamp-2">
                              {article.title}
                            </h4>
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </aside>
              </div>
            </section>
          )}

          {/* Dolar Widget */}
          <section className="py-8">
            <DolarWidget />
          </section>

          {/* Latest News Grid */}
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-600">
              Últimas Noticias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <article key={article.id} className="article-card fade-in">
                  <Link href={`/${article.category}/${article.slug}`}>
                    <div className="article-image-wrapper">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="article-image"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="article-category">{article.category}</span>
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-excerpt">{article.excerpt}</p>
                      <div className="article-meta">
                        <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Política Section */}
          <section className="py-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold pb-2 border-b-2 border-red-600">
                Política
              </h2>
              <Link href="/politica">
                <a className="text-red-600 hover:underline font-semibold">Ver todas →</a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {politicaArticles.map((article) => (
                <article key={article.id} className="article-card">
                  <Link href={`/${article.category}/${article.slug}`}>
                    <div className="article-image-wrapper">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="article-image"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="article-title">{article.title}</h3>
                    <div className="article-meta">
                      <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Economía Section */}
          <section className="py-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold pb-2 border-b-2 border-red-600">
                Economía
              </h2>
              <Link href="/economia">
                <a className="text-red-600 hover:underline font-semibold">Ver todas →</a>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {economiaArticles.map((article) => (
                <article key={article.id} className="article-card">
                  <Link href={`/${article.category}/${article.slug}`}>
                    <div className="article-image-wrapper">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="article-image"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="article-title">{article.title}</h3>
                    <div className="article-meta">
                      <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="world-class-footer no-print">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section">
                <h3>Secciones</h3>
                <ul className="footer-links">
                  {categories.slice(0, 6).map((cat) => (
                    <li key={cat.slug}>
                      <Link href={`/${cat.slug}`}>
                        <a>{cat.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-section">
                <h3>Información</h3>
                <ul className="footer-links">
                  <li><Link href="/about"><a>Sobre Nosotros</a></Link></li>
                  <li><Link href="/contact"><a>Contacto</a></Link></li>
                  <li><Link href="/privacy"><a>Privacidad</a></Link></li>
                  <li><Link href="/terms"><a>Términos</a></Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Síguenos</h3>
                <ul className="footer-links">
                  <li><a href="#" target="_blank" rel="noopener">Facebook</a></li>
                  <li><a href="#" target="_blank" rel="noopener">Twitter</a></li>
                  <li><a href="#" target="_blank" rel="noopener">Instagram</a></li>
                  <li><a href="#" target="_blank" rel="noopener">YouTube</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Newsletter</h3>
                <p className="text-sm mb-4">Recibe las últimas noticias en tu email</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="flex-1 px-3 py-2 rounded bg-white/10 text-white placeholder-white/50"
                  />
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                    Suscribir
                  </button>
                </form>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 Política Argentina. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeWorldClassPremium;

