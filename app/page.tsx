'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import PushSubscribe from './components/PushSubscribe';
import PageTransition, { FadeIn, SlideInLeft, SlideInRight, ScaleIn } from './components/animations/PageTransition';
import { AnimatedArticleCard, StaggeredList, ScrollReveal } from './components/animations/ArticleAnimations';
import { FloatingParticles, BackgroundWaves, AnimatedGlassmorphism } from './components/animations/BackgroundEffects';
import { useArticles, useStats } from './lib/api';

// Componente cliente para la página principal
function HomePageClient() {
  // Usar hooks de API para obtener datos reales
  const { data: articlesData, loading: articlesLoading, error: articlesError } = useArticles({
    limit: 6,
    page: 1
  });

  const { data: statsData, loading: statsLoading, error: statsError } = useStats();

  // Fallback a datos mock si hay error o no hay datos
  const articles = articlesData && articlesData.length > 0 ? articlesData : [
    {
      id: '1',
      title: 'Milei anuncia nuevas medidas económicas en el Congreso',
      category: 'Política',
      excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
      views: 15420,
      likes: 892,
      imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=450&fit=crop&q=80' // Buenos Aires Obelisco
    },
    {
      id: '2',
      title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
      category: 'Política',
      excerpt: 'La Vicepresidenta propone nuevas modificaciones al sistema previsional argentino.',
      views: 12890,
      likes: 756,
      imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=450&fit=crop&q=80' // Buenos Aires Puerto Madero
    },
    {
      id: '3',
      title: 'Dólar blue rompe barrera de los $1500',
      category: 'Economía',
      excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
      views: 18750,
      likes: 1243,
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&q=80&auto=format' // Mercado financiero
    },
    {
      id: '4',
      title: 'Suprema Corte analiza caso de corrupción institucional',
      category: 'Judicial',
      excerpt: 'El máximo tribunal evalúa denuncias sobre irregularidades en contratos del Estado.',
      views: 9320,
      likes: 567,
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop&q=80&auto=format' // Palacio de Justicia
    },
    {
      id: '5',
      title: 'Nuevo acuerdo comercial con la Unión Europea',
      category: 'Internacional',
      excerpt: 'Argentina firma tratado de libre comercio que abre mercados europeos.',
      views: 11500,
      likes: 789,
      imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=450&fit=crop&q=80' // Buenos Aires
    },
    {
      id: '6',
      title: 'Reforma educativa genera debate nacional',
      category: 'Sociedad',
      excerpt: 'Expertos discuten cambios en el sistema educativo argentino.',
      views: 8760,
      likes: 432,
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop&q=80' // Educación/Libros
    }
  ];

  const stats = statsData || {
    totalArticles: 73,
    publishedArticles: 68,
    featuredArticles: 12,
    breakingNews: 5
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 relative">
        {/* Efectos de fondo animados */}
        <FloatingParticles count={30} className="opacity-30" />
        <BackgroundWaves />

        {/* Hero Section con animaciones */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Política Argentina 🇦🇷
                <div className="text-sm text-blue-200 mt-2 font-normal">
                  🖼️ Imágenes actualizadas - Último redeploy: {new Date().toLocaleString('es-AR')}
                </div>
              </h1>
            </FadeIn>

            <SlideInLeft delay={0.2}>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                El portal líder de noticias políticas de Argentina. Información actualizada las 24 horas sobre gobierno, economía y sociedad.
                <br /><small className="text-blue-200">🔄 Última actualización: {new Date().toLocaleString('es-AR')}</small>
              </p>
            </SlideInLeft>

            <ScaleIn delay={0.4}>
              <AnimatedGlassmorphism className="inline-block p-6 mb-8">
                <div className="text-lg space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">📰</span>
                    <span>Más de {stats.totalArticles || 73} artículos actualizados</span>
                  </div>
                </div>
              </AnimatedGlassmorphism>
            </ScaleIn>
          </div>
        </section>

        {/* Contenido Principal */}
        <ScrollReveal>
          <div className="container mx-auto px-4 py-12">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                Últimas Noticias
              </h2>
            </FadeIn>

            {articlesLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">Cargando artículos...</span>
              </div>
            ) : articlesError ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error al cargar artículos</div>
                <div className="text-gray-600 text-sm">Mostrando contenido de respaldo</div>
              </div>
            ) : null}

            <StaggeredList staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: any, index: number) => (
                  <AnimatedArticleCard key={article.id} index={index}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-100">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <Image
                          src={article.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=225&fit=crop&q=80&auto=format'}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <span>👁️</span>
                              <span>{article.views?.toLocaleString() || '0'}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>❤️</span>
                              <span>{article.likes || 0}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedArticleCard>
                ))}
              </div>
            </StaggeredList>

            {/* Notificaciones Push con animación */}
            <ScrollReveal>
              <div className="mt-16">
                <PushSubscribe />
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}

export default function HomePage() {
  return <HomePageClient />;
}
