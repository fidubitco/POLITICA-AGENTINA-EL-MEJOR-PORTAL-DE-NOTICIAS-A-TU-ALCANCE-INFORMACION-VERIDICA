'use client';

import { noticiasJudicial } from '@/app/data/noticias-completas';
import { CategoryPage } from '@/app/components/CategoryPage';
import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function JudicialPage() {
  // La noticia breaking está en la posición 0 del array
  const breakingNews = noticiasJudicial[0];
  const regularNews = noticiasJudicial.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Alert - AHORA SIEMPRE VISIBLE */}
      <div className="bg-red-600 text-white py-3 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white text-red-600 rounded font-bold text-sm">
              ÚLTIMA HORA
            </span>
            <Link href={`/judicial/${breakingNews.id}`} className="hover:underline font-semibold">
              {breakingNews.title}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Component */}
      <Navigation />

      {/* Breaking News Card - AHORA SIEMPRE VISIBLE */}
      <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
              🔥 ÚLTIMA HORA
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {breakingNews.title}
              </h2>
              <p className="text-gray-700 mb-3">
                {breakingNews.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Por {breakingNews.author}</span>
                <span>•</span>
                <span>{breakingNews.views.toLocaleString()} vistas</span>
                <span>•</span>
                <Link 
                  href={`/judicial/${breakingNews.id}`} 
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Leer más →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoryPage
        categoryName="Judicial"
        categorySlug="judicial"
        categoryColor="red"
        description="Noticias judiciales de Argentina: Corte Suprema, causas, sentencias y actualidad del poder judicial."
        noticias={regularNews}
        trendingTopics={[
          { name: 'Corte Suprema', count: '12.5K' },
          { name: 'Cristina Kirchner', count: '10.8K' },
          { name: 'Causa Vialidad', count: '9.2K' },
          { name: 'Reforma Judicial', count: '7.6K' },
          { name: 'Poder Judicial', count: '6.4K' }
        ]}
      />
    </div>
  );
}

