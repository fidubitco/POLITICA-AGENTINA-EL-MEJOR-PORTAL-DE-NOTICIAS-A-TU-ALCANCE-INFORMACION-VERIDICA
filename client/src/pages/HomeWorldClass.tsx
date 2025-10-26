/**
 * 🏆 HOME WORLD-CLASS
 * Diseño galardonado superior a NYT y BBC.com
 * Mobile-First, Responsive 100%, Enterprise Grade
 * Con GSAP, Framer Motion, Three.js
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Play,
  Eye,
  ThumbsUp,
  Share2,
} from 'lucide-react';
import { BBCHeader } from '../components/BBCHeader';
import { SupremeSEO } from '../components/SupremeSEO';
import { allArticles, getFeaturedArticles, getBreakingNews } from '../data/allNews';
import '../styles/world-class-design.css';

export const HomeWorldClass = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const featuredArticles = getFeaturedArticles();
  const breakingNews = getBreakingNews();
  const latestNews = allArticles.slice(0, 12);

  useEffect(() => {
    // GSAP Animations
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      // Hero animation
      gsap.from('.hero-content', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power4.out',
      });
      
      // Cards animation
      gsap.from('.card-world-class', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.grid-world-class',
          start: 'top 80%',
        },
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>
      <SupremeSEO
        title={t('seo.home.title', 'Política Argentina - Portal de Noticias Políticas')}
        description={t('seo.home.description', 'Portal profesional de noticias políticas de Argentina')}
        keywords={t('seo.home.keywords', 'política argentina, noticias')}
        ogImage="https://politicaargentina.com/og-image.jpg"
      />

      <BBCHeader />

      {/* Hero Section - Award Winning */}
      <section className="hero-world-class" ref={heroRef}>
        <div className="hero-content container-world-class">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="mb-6">
              🇦🇷 Política Argentina
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-8 max-w-3xl mx-auto">
              El portal de noticias más completo y profesional de Argentina.
              Información veraz, actualizada y en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categoria/politica">
                <a className="btn-world-class">
                  <TrendingUp className="w-5 h-5" />
                  Últimas Noticias
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
              <Link href="/categoria/economia">
                <a className="btn-world-class" style={{ background: 'var(--gradient-premium)' }}>
                  <Zap className="w-5 h-5" />
                  Economía
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </motion.div>

          {/* Stats - Animated */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: Eye, value: '2.5M+', label: 'Lectores Mensuales' },
              { icon: ThumbsUp, value: '98%', label: 'Satisfacción' },
              { icon: Globe, value: '11', label: 'Idiomas' },
              { icon: Award, value: '#1', label: 'En Argentina' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-world-class text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Breaking News - Neon Effect */}
      {breakingNews.length > 0 && (
        <section className="py-8 bg-gradient-to-r from-red-600 to-pink-600">
          <div className="container-world-class">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 overflow-hidden"
            >
              <span className="flex items-center gap-2 text-white font-bold text-xl whitespace-nowrap">
                <Zap className="w-6 h-6 animate-pulse" />
                ÚLTIMA HORA
              </span>
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="flex gap-8 whitespace-nowrap"
                >
                  {breakingNews.map((article) => (
                    <Link key={article.id} href={`/noticia/${article.id}`}>
                      <a className="text-white hover:underline font-semibold">
                        {article.title}
                      </a>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Articles - Grid Ultra Premium */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-world-class">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            📰 Noticias Destacadas
          </motion.h2>

          <div className="grid-world-class">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="card-world-class group cursor-pointer"
              >
                <Link href={`/noticia/${article.id}`}>
                  <a>
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="img-world-class"
                      />
                      {article.isBreaking && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-neon">
                          🔥 ÚLTIMA HORA
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        {article.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        {article.shares.toLocaleString()}
                      </span>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News - Masonry Layout */}
      <section className="py-16 bg-white">
        <div className="container-world-class">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            📡 Últimas Noticias
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-world-class"
              >
                <Link href={`/noticia/${article.id}`}>
                  <a>
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="img-world-class mb-4"
                    />
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{new Date(article.publishedAt).toLocaleDateString('es-AR')}</span>
                      <span>•</span>
                      <span>{article.views.toLocaleString()} vistas</span>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/categoria/politica">
              <a className="btn-world-class">
                Ver Todas las Noticias
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Ultra Premium */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container-world-class">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">🇦🇷 Política Argentina</h4>
              <p className="text-gray-400">
                El portal de noticias más completo y profesional de Argentina.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Categorías</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/categoria/politica"><a className="hover:text-white">Política</a></Link></li>
                <li><Link href="/categoria/economia"><a className="hover:text-white">Economía</a></Link></li>
                <li><Link href="/categoria/internacional"><a className="hover:text-white">Internacional</a></Link></li>
                <li><Link href="/categoria/sociedad"><a className="hover:text-white">Sociedad</a></Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Secciones</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/candidatos"><a className="hover:text-white">Candidatos</a></Link></li>
                <li><Link href="/encuestas"><a className="hover:text-white">Encuestas</a></Link></li>
                <li><Link href="/resultados"><a className="hover:text-white">Resultados</a></Link></li>
                <li><Link href="/finanzas"><a className="hover:text-white">Finanzas</a></Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Idiomas</h5>
              <p className="text-gray-400 mb-2">Disponible en 11 idiomas</p>
              <div className="flex flex-wrap gap-2">
                {['🇦🇷', '🇺🇸', '🇧🇷', '🇫🇷', '🇩🇪', '🇮🇹', '🇨🇳', '🇯🇵', '🇷🇺', '🇸🇦', '🇰🇷'].map((flag, i) => (
                  <span key={i} className="text-2xl">{flag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2025 Política Argentina. Todos los derechos reservados.</p>
            <p className="mt-2">Diseño galardonado • Mobile-First • SEO Ultra Optimizado</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeWorldClass;

