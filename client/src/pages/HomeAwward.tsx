/**
 * 🏆 HOME AWWARD - WORLD-CLASS DESIGN
 * Diseño ganador de premios, mejor que BBC.com
 * Inspirado en: Awwwards, FWA, CSS Design Awards
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Clock, TrendingUp, Zap, ArrowRight, Eye, Share2 } from 'lucide-react';
import { allArticles } from '../data/allNews';
import { categories } from '../data/categories';
import { NewsImage } from '../components/NewsImage';

export const HomeAwward: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  // Artículos destacados
  const featuredArticle = allArticles.find(a => a.featured) || allArticles[0];
  const breakingNews = allArticles.filter(a => a.breaking).slice(0, 3);
  const latestNews = allArticles.slice(0, 12);
  const trendingNews = [...allArticles].sort((a, b) => b.views - a.views).slice(0, 6);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image con Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <NewsImage
            src={featuredArticle.imageUrl}
            alt={featuredArticle.title}
            category={featuredArticle.categorySlug}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Logo Animado */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-500 to-white">
                POLÍTICA
              </span>
            </h1>
            <p className="text-2xl md:text-4xl font-light tracking-widest text-gray-300">
              ARGENTINA
            </p>
          </div>

          {/* Hora en Vivo */}
          <div className="mb-12 text-sm tracking-wider text-gray-400">
            <Clock className="inline w-4 h-4 mr-2" />
            {currentTime.toLocaleTimeString('es-AR', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
            {' • '}
            {currentTime.toLocaleDateString('es-AR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>

          {/* Featured Article */}
          <Link href={`/noticia/${featuredArticle.id}`}>
            <a className="group">
              <div className="max-w-4xl mx-auto">
                <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-bold tracking-wider mb-4 uppercase">
                  Destacado
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight group-hover:text-red-500 transition-colors duration-300">
                  {featuredArticle.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
                  {featuredArticle.excerpt}
                </p>
                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                  Leer Más
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </a>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Breaking News Ticker */}
      {breakingNews.length > 0 && (
        <div className="bg-red-600 py-4 overflow-hidden">
          <div className="flex items-center gap-8 animate-scroll-left">
            <Zap className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider flex-shrink-0">Última Hora</span>
            {breakingNews.map((article, index) => (
              <React.Fragment key={article.id}>
                <Link href={`/noticia/${article.id}`}>
                  <a className="hover:underline flex-shrink-0 whitespace-nowrap">
                    {article.title}
                  </a>
                </Link>
                {index < breakingNews.length - 1 && (
                  <span className="text-white/50 flex-shrink-0">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Latest News Grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl font-black">
              Últimas <span className="text-red-500">Noticias</span>
            </h2>
            <Link href="/todas">
              <a className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                Ver Todas
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article, index) => (
              <Link key={article.id} href={`/noticia/${article.id}`}>
                <a 
                  className="group block"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` 
                  }}
                >
                  <article className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <NewsImage
                        src={article.imageUrl}
                        alt={article.title}
                        category={article.categorySlug}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(article.views / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{article.author}</span>
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <TrendingUp className="w-8 h-8 text-red-500" />
            <h2 className="text-5xl font-black">
              Más <span className="text-red-500">Leídas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingNews.map((article, index) => (
              <Link key={article.id} href={`/noticia/${article.id}`}>
                <a className="group flex gap-6 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-red-500/50 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex-shrink-0">
                    <span className="text-6xl font-black text-gray-700 group-hover:text-red-500 transition-colors">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {article.shares}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">
            Explora por <span className="text-red-500">Categoría</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, index) => (
              <Link key={cat.slug} href={`/${cat.slug}`}>
                <a 
                  className="group relative h-48 rounded-xl overflow-hidden"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both` 
                  }}
                >
                  <div 
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${cat.color}dd, ${cat.color}44)` 
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
                    <cat.icon className="w-12 h-12 mb-3 text-white" />
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <p className="text-xs text-white/70 mt-2">
                      {allArticles.filter(a => a.categorySlug === cat.slug).length} noticias
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Política Argentina. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Portal profesional de noticias políticas de Argentina
          </p>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default HomeAwward;

