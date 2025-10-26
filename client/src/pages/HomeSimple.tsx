/**
 * 🚀 HOME PAGE OPTIMIZADA - CARGA RÁPIDA
 * Versión ligera y rápida
 */

import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { MegaExtremeSEO } from '../components/MegaExtremeSEO';
import { BBCHeader } from '../components/BBCHeader';
import { allArticles } from '../data/allNews';

export const HomeSimple = () => {
  const { i18n } = useTranslation();

  // Obtener solo los artículos necesarios
  const featuredArticles = allArticles
    .filter(a => a.featured && a.status === 'published')
    .slice(0, 6);
  
  const breakingNews = allArticles
    .filter(a => a.breaking && a.status === 'published')
    .slice(0, 1);

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const getTimeAgo = (dateString: string) => {
    const hours = Math.floor((Date.now() - new Date(dateString).getTime()) / 3600000);
    if (hours < 1) return 'Hace menos de 1h';
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaExtremeSEO
        title="Política Argentina - Portal de Noticias Políticas #1"
        description="Portal profesional de noticias políticas de Argentina. Últimas noticias sobre Javier Milei, reforma económica, dólar blue, inflación, congreso nacional. Cobertura 24/7 con información veraz y análisis experto."
        keywords="política argentina, noticias argentina, Javier Milei, reforma económica, dólar blue, inflación argentina, congreso nacional, elecciones argentina, gobierno argentino, casa rosada, senado argentina, diputados argentina, economía argentina, análisis político"
        url={`https://politicaargentina.com${i18n.language !== 'es' ? `/${i18n.language}` : ''}/`}
        type="website"
        lang={i18n.language}
      />

      <BBCHeader />

      {/* Breaking News */}
      {breakingNews[0] && (
        <div className="bg-red-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4">
            <Link href={`/noticia/${breakingNews[0].id}`}>
              <a className="flex items-center gap-3 hover:underline">
                <span className="bg-white text-red-600 px-3 py-1 rounded text-sm font-bold">
                  URGENTE
                </span>
                <span className="font-semibold">{breakingNews[0].title}</span>
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Política Argentina
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Información veraz y actualizada
          </p>
          <div className="flex gap-4">
            <Link href="/categoria/politica">
              <a className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Ver Noticias
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Link key={article.id} href={`/noticia/${article.id}`}>
              <a className="block bg-white rounded-lg shadow hover:shadow-xl transition">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  loading="lazy"
                />
                <div className="p-5">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
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
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Política', slug: 'politica', color: 'bg-blue-600' },
              { name: 'Economía', slug: 'economia', color: 'bg-green-600' },
              { name: 'Sociedad', slug: 'sociedad', color: 'bg-yellow-600' },
              { name: 'Internacional', slug: 'internacional', color: 'bg-red-600' },
              { name: 'Deportes', slug: 'deportes', color: 'bg-purple-600' },
              { name: 'Cultura', slug: 'cultura', color: 'bg-pink-600' },
            ].map((cat) => (
              <Link key={cat.slug} href={`/categoria/${cat.slug}`}>
                <a className={`${cat.color} text-white p-6 rounded-lg text-center hover:opacity-90 transition`}>
                  <div className="font-bold text-lg">{cat.name}</div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Política Argentina. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeSimple;

