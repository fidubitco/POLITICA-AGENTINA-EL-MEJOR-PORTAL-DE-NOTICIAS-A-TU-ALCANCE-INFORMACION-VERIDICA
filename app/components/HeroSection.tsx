'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Article } from '@/data/allNews';
import { NewsImage } from '@/components/NewsImage';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  breakingNews: Article[];
}

export function HeroSection({ breakingNews }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // Animación del título principal
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      }
    );

    // Animación de las noticias de última hora
    tl.fromTo(
      newsRef.current?.children || [],
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power1.out',
      },
      '-=0.5'
    );

    // Scroll animations
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top center',
      end: 'bottom center',
      animation: tl,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background con Three.js placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/40" />

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Título y descripción */}
          <div className="text-white space-y-8">
            <h1
              ref={titleRef}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              Política
              <span className="block text-blue-400">Argentina</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed">
              El portal líder de noticias políticas de Argentina.
              Información actualizada las 24 horas sobre gobierno, congreso y economía.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Últimas Noticias
              </button>
              <button className="border-2 border-white/30 hover:border-white/60 px-8 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300">
                Ver Categorías
              </button>
            </div>
          </div>

          {/* Columna derecha - Última hora */}
          <div
            ref={newsRef}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" />
              ÚLTIMA HORA
            </h2>

            {breakingNews.slice(0, 3).map((article, index) => (
              <article
                key={article.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-red-400 bg-red-400/20 px-2 py-1 rounded-full uppercase">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(article.publishedAt).toLocaleTimeString('es-AR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-300 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <NewsImage
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      category={article.categorySlug}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
