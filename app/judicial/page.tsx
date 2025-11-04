'use client';

import Link from 'next/link';
import { noticiasJudicial } from '@/app/data/noticias-completas';
import { Navigation } from '@/app/components/Navigation';
import { CategoryPage } from '@/app/components/CategoryPage';
import { TrendingUp, Clock, Eye } from 'lucide-react';

export default function JudicialPage() {
  // Noticia breaking real
  const breakingNews = noticiasJudicial[0];
  const regularNews = noticiasJudicial.slice(1);

  const trendingTopics = [
    { name: 'Fiscal Companys', count: '89.5K' },
    { name: 'Eduardo Accastello', count: '67.2K' },
    { name: 'Corrupción Judicial', count: '125K' },
    { name: 'Villa María', count: '45.8K' },
    { name: 'Narcotráfico', count: '234K' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* EMERGENCY BREAKING NEWS BANNER - REAL CONTENT */}
      <div className="bg-red-600 text-white py-4 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-white text-red-600 rounded font-bold text-sm animate-bounce">
              ÚLTIMA HORA
            </span>
            <Link 
              href="/judicial/jud-breaking-1" 
              className="hover:underline font-semibold text-lg"
            >
              {breakingNews.title}
            </Link>
            <span className="ml-auto text-sm opacity-90">
              <Eye className="inline w-4 h-4 mr-1" />
              {breakingNews.views.toLocaleString()} vistas
            </span>
          </div>
        </div>
      </div>

      {/* Professional Navigation */}
      <Navigation />

      {/* Real Breaking News Card */}
      <div className="bg-red-50 border-l-4 border-red-600 p-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                  BREAKING NEWS
                </span>
                <span className="text-red-600 text-sm flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Hace 30 minutos
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {breakingNews.title}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {breakingNews.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {breakingNews.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href="/judicial/jud-breaking-1"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Leer Noticia Completa →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Content Category */}
      <CategoryPage
        categoryName="Judicial"
        categorySlug="judicial"
        categoryColor="red"
        description="Noticias judiciales de Argentina: Corte Suprema, causas, sentencias y actualidad del poder judicial."
        noticias={regularNews}
        trendingTopics={trendingTopics}
      />
    </div>
  );
}

