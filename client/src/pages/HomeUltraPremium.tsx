/**
 * 🚀 HOME PAGE ULTRA PREMIUM
 * World-class design for politicaargentina.com
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  ArrowRight,
  Zap,
  Globe,
  Calendar
} from 'lucide-react';
import { SupremeSEO } from '../components/SupremeSEO';
import { BBCHeader } from '../components/BBCHeader';
import { allArticles, getFeaturedArticles, getBreakingNews, getArticlesByCategory } from '../data/allNews';
import '../styles/ultra-premium.css';

export const HomeUltraPremium: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredArticles = getFeaturedArticles();
  const breakingNews = getBreakingNews();
  const politicaNews = getArticlesByCategory('politica').slice(0, 4);
  const economiaNews = getArticlesByCategory('economia').slice(0, 4);
  const sociedadNews = getArticlesByCategory('sociedad').slice(0, 3);
  const internacionalNews = getArticlesByCategory('internacional').slice(0, 3);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours === 1) return 'Hace 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Hace 1 día';
    return `Hace ${diffInDays} días`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SupremeSEO
        title="Noticias Políticas de Argentina - Información Veraz y Actualizada"
        description="Portal profesional de noticias políticas de Argentina. Últimas noticias sobre Milei, Congreso, economía, dólar, inflación. Cobertura 24/7 de política, economía, sociedad e internacional. Análisis experto y datos en tiempo real."
        keywords="política argentina, noticias argentina, Milei, gobierno argentino, elecciones argentina, congreso nacional, presidente argentina, economía argentina, dólar blue, inflación argentina, noticias políticas, análisis político, casa rosada, senado, diputados, reforma económica"
        url={`https://politicaargentina.com${i18n.language !== 'es' ? `/${i18n.language}` : ''}/`}
        type="website"
      />

      <BBCHeader />

      {/* Breaking News Banner */}
      {breakingNews.length > 0 && (
        <div className="ultra-breaking-banner">
          <div className="container-ultra">
            <div className="ultra-breaking-content">
              <div className="ultra-breaking-label flex items-center gap-2">
                <Zap className="w-4 h-4" />
                ÚLTIMA HORA
              </div>
              <div className="flex-1">
                <Link href={`/noticia/${breakingNews[0].id}`}>
                  <a className="text-white hover:underline font-semibold text-lg">
                    {breakingNews[0].title}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="ultra-hero">
        <div className="container-ultra">
          <div className={`ultra-hero-content ${isVisible ? 'fade-in' : ''}`}>
            <h1 className="ultra-hero-title">
              Política Argentina
            </h1>
            <p className="ultra-hero-subtitle">
              Tu fuente confiable de noticias políticas y análisis en profundidad
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/categoria/politica">
                <a className="ultra-button ultra-button-primary">
                  Explorar Noticias
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
              <Link href="/candidatos">
                <a className="ultra-button ultra-button-secondary">
                  Ver Candidatos
                  <Globe className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="ultra-section bg-white">
          <div className="container-ultra">
            <h2 className="ultra-section-title">
              <TrendingUp className="inline-block w-8 h-8 mr-3" />
              Destacadas
            </h2>
            <div className="ultra-grid ultra-grid-3">
              {featuredArticles.map((article, index) => (
                <Link key={article.id} href={`/noticia/${article.id}`}>
                  <a className={`block ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <article className="ultra-card">
                      <div className="relative overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="ultra-card-image"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {article.breaking && (
                            <span className="ultra-badge ultra-badge-breaking">
                              Urgente
                            </span>
                          )}
                          {article.featured && (
                            <span className="ultra-badge ultra-badge-featured">
                              Destacado
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ultra-card-content">
                        <span className="ultra-badge ultra-badge-category mb-3">
                          {article.category}
                        </span>
                        <h3 className="ultra-card-title">
                          {article.title}
                        </h3>
                        <p className="ultra-card-excerpt">
                          {article.excerpt}
                        </p>
                        <div className="ultra-card-meta">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {formatNumber(article.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {formatNumber(article.likes)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {getTimeAgo(article.publishedAt)}
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
      )}

      {/* Política Section */}
      {politicaNews.length > 0 && (
        <section className="ultra-section" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' }}>
          <div className="container-ultra">
            <div className="flex justify-between items-center mb-8">
              <h2 className="ultra-section-title">Política</h2>
              <Link href="/categoria/politica">
                <a className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                  Ver todas
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
            <div className="ultra-grid ultra-grid-2">
              {politicaNews.map((article) => (
                <Link key={article.id} href={`/noticia/${article.id}`}>
                  <a className="block">
                    <article className="ultra-card">
                      <div className="flex gap-4">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {formatNumber(article.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {getTimeAgo(article.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Economía Section */}
      {economiaNews.length > 0 && (
        <section className="ultra-section bg-white">
          <div className="container-ultra">
            <div className="flex justify-between items-center mb-8">
              <h2 className="ultra-section-title">Economía</h2>
              <Link href="/categoria/economia">
                <a className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-2">
                  Ver todas
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
            <div className="ultra-grid ultra-grid-2">
              {economiaNews.map((article) => (
                <Link key={article.id} href={`/noticia/${article.id}`}>
                  <a className="block">
                    <article className="ultra-card">
                      <div className="flex gap-4">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {formatNumber(article.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {getTimeAgo(article.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-ultra">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Política Argentina</h3>
              <p className="text-gray-400">
                Tu fuente confiable de noticias políticas y análisis en profundidad.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/categoria/politica"><a className="hover:text-white">Política</a></Link></li>
                <li><Link href="/categoria/economia"><a className="hover:text-white">Economía</a></Link></li>
                <li><Link href="/categoria/sociedad"><a className="hover:text-white">Sociedad</a></Link></li>
                <li><Link href="/categoria/internacional"><a className="hover:text-white">Internacional</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Secciones</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/candidatos"><a className="hover:text-white">Candidatos</a></Link></li>
                <li><Link href="/encuestas"><a className="hover:text-white">Encuestas</a></Link></li>
                <li><Link href="/resultados"><a className="hover:text-white">Resultados</a></Link></li>
                <li><Link href="/finanzas"><a className="hover:text-white">Finanzas</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <p className="text-gray-400">
                contacto@politicaargentina.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Política Argentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeUltraPremium;

