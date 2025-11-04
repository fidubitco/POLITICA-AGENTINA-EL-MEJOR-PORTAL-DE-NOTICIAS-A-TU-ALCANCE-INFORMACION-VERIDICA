'use client';

import Link from 'next/link';
import { noticiasJudicial } from '@/app/data/noticias-completas';

export default function JudicialPage() {
  // NOTICIA BREAKING REAL - 100% VISIBLE
  const breakingNews = noticiasJudicial.find(n => n.id === 'jud-breaking-1') || noticiasJudicial[0];
  const regularNews = noticiasJudicial.filter(n => n.id !== 'jud-breaking-1').slice(0, 6);

  const trendingTopics = [
    { name: 'Fiscal Companys', count: '89.5K' },
    { name: 'Eduardo Accastello', count: '67.2K' },
    { name: 'Corrupción Judicial', count: '125K' },
    { name: 'Villa María', count: '45.8K' },
    { name: 'Narcotráfico', count: '234K' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BANNER ROJO GIGANTE - 100% VISIBLE */}
      <div className="bg-red-600 text-white py-5 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-white text-red-600 rounded font-bold text-sm animate-bounce">
              🔥 ÚLTIMA HORA
            </span>
            <Link 
              href="/judicial/jud-breaking-1" 
              className="hover:underline font-bold text-xl flex-1"
            >
              {breakingNews.title}
            </Link>
            <span className="text-lg font-semibold">
              👁️ {breakingNews.views.toLocaleString()} vistas
            </span>
          </div>
        </div>
      </div>

      {/* NAVIGATION SIMPLE */}
      <nav className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Política Argentina
            </Link>
            <div className="flex space-x-6">
              <Link href="/politica" className="text-gray-700 hover:text-blue-600">Política</Link>
              <Link href="/economia" className="text-gray-700 hover:text-blue-600">Economía</Link>
              <Link href="/judicial" className="text-red-600 font-bold border-b-2 border-red-600">Judicial</Link>
              <Link href="/internacional" className="text-gray-700 hover:text-blue-600">Internacional</Link>
              <Link href="/sociedad" className="text-gray-700 hover:text-blue-600">Sociedad</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* NOTICIA DESTACADA GIGANTE */}
      <div className="bg-red-50 border-l-8 border-red-600 p-10 mb-8 shadow-2xl">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              🔥 BREAKING NEWS
            </span>
            <span className="text-red-600 font-semibold">Judicial</span>
            <span className="text-gray-500 text-sm">• {breakingNews.publishedAt.toLocaleDateString('es-AR')}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {breakingNews.title}
          </h1>
          
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {breakingNews.excerpt}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
              👁️ {breakingNews.views.toLocaleString()} VISTAS
            </span>
            <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
              ⏱️ Hace 30 minutos
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-gray-600 font-semibold">Tags:</span>
            {(breakingNews.tags || []).slice(0, 4).map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <Link 
            href="/judicial/jud-breaking-1"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold inline-block transition-all hover:scale-105 shadow-lg"
          >
            📖 LEER NOTICIA COMPLETA →
          </Link>
        </div>
      </div>

      {/* Real Content - Judicial News */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Noticias Judiciales
            </h2>
            
            <div className="space-y-6">
              {regularNews.map((noticia) => (
                <article key={noticia.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="flex">
                    <div className="w-1/3">
                      <img 
                        src={noticia.imageUrl} 
                        alt={noticia.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-600 font-semibold text-sm">{noticia.category}</span>
                        <span className="text-gray-500 text-sm">• {noticia.publishedAt.toLocaleDateString('es-AR')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link href={`/judicial/${noticia.id}`} className="hover:text-red-600">
                          {noticia.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{noticia.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">
                          👁️ {noticia.views.toLocaleString()} vistas
                        </span>
                        <Link 
                          href={`/judicial/${noticia.id}`}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm"
                        >
                          Leer más →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tendencias</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.name} className="flex justify-between items-center">
                    <span className="text-gray-700">{topic.name}</span>
                    <span className="text-red-600 font-semibold">{topic.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

