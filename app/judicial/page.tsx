'use client';

import { noticiasJudicial } from '@/app/data/noticias-completas';
import CategoryPage from '@/app/components/CategoryPage';
import Link from 'next/link';

// Datos de trending topics con formato correcto
const trendingTopics = [
  { name: 'Fiscal Companys', count: '2.3k' },
  { name: 'Eduardo Accastello', count: '1.8k' },
  { name: 'Corrupción Judicial', count: '5.1k' },
  { name: 'Córdoba', count: '3.2k' },
  { name: 'Villa María', count: '890' },
  { name: 'Narcotráfico', count: '4.5k' },
  { name: 'Última Hora', count: '12.3k' }
];

// Breaking news desde los datos
const breakingNews = noticiasJudicial[0];
const regularNews = noticiasJudicial.slice(1);

export default function JudicialPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Alert - SIEMPRE VISIBLE */}
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

      {/* Navigation - Componente integrado */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Política Argentina
            </Link>
            <div className="flex space-x-6">
              <Link href="/politica" className="text-gray-700 hover:text-blue-600">Política</Link>
              <Link href="/economia" className="text-gray-700 hover:text-blue-600">Economía</Link>
              <Link href="/judicial" className="text-red-600 font-bold">Judicial</Link>
              <Link href="/internacional" className="text-gray-700 hover:text-blue-600">Internacional</Link>
              <Link href="/sociedad" className="text-gray-700 hover:text-blue-600">Sociedad</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breaking News Card */}
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
              <p className="text-gray-600 mb-3">
                {breakingNews.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>👁️ {breakingNews.views.toLocaleString()} vistas</span>
                <span>⏰ Hace 30 minutos</span>
                <Link 
                  href={`/judicial/${breakingNews.id}`} 
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Leer más →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Page con noticias actualizadas */}
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

