'use client';

import CategoryPage from '../components/CategoryPage';
import { noticiasJudicial } from '../data/noticias-completas';
import Link from 'next/link';

const trendingTopics = [
  { name: 'Fiscal Companys', count: '25.8K' },
  { name: 'Corrupción Córdoba', count: '18.1K' },
  { name: 'Corte Suprema', count: '12.5K' },
  { name: 'Cristina Kirchner', count: '10.8K' },
  { name: 'Causa Vialidad', count: '9.2K' },
];

export default function JudicialPage() {
  // Noticia destacada de última hora
  const breakingNews = {
    id: 'jud-breaking-1',
    title: 'La corrupción judicial en Córdoba: una trama de poder, impunidad y narcotráfico',
    subtitle: 'Fiscal Companys bajo la lupa: denuncias de extorsión, vínculos con el narcotráfico y protección política',
    excerpt: 'El sistema judicial de Córdoba enfrenta un severo escrutinio tras resoluciones de la fiscal Companys que recurre a prisiones preventivas irregulares.',
    url: '/judicial/corrupcion-judicial-cordoba',
    views: 89500,
  };

  return (
    <div>
      {/* Breaking News Alert */}
      <div className="bg-red-600 text-white py-3 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white text-red-600 rounded font-bold text-sm">
              ÚLTIMA HORA
            </span>
            <Link href={breakingNews.url} className="hover:underline font-semibold">
              {breakingNews.title}
            </Link>
          </div>
        </div>
      </div>

      {/* Breaking News Card */}
      <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
        <div className="container mx-auto">
          <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold mb-3">
            🔥 ÚLTIMA HORA
          </span>
          <Link href={breakingNews.url}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors">
              {breakingNews.title}
            </h2>
          </Link>
          <p className="text-gray-700 mb-4">{breakingNews.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>👁️ {breakingNews.views.toLocaleString()} vistas</span>
            <Link 
              href={breakingNews.url}
              className="text-red-600 font-semibold hover:underline"
            >
              Leer más →
            </Link>
          </div>
        </div>
      </div>

      <CategoryPage
        categoryName="Judicial"
        categorySlug="judicial"
        categoryColor="red"
        description="Noticias judiciales de Argentina: Corte Suprema, causas, sentencias y actualidad del poder judicial."
        noticias={noticiasJudicial}
        trendingTopics={trendingTopics}
      />
    </div>
  );
}

