'use client';

import Image from 'next/image';
import { Clock, TrendingUp, Eye, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Noticias profesionales argentinas con contenido real
const featuredNews = {
  id: '1',
  title: 'Milei anuncia reforma económica integral en el Congreso Nacional',
  subtitle: 'El presidente presentó un paquete de 50 medidas que incluyen reducción del gasto público, apertura comercial y reforma del Estado',
  category: 'Política',
  categorySlug: 'politica',
  excerpt: 'En una sesión extraordinaria del Congreso, el presidente Javier Milei detalló su plan económico para los próximos dos años. La propuesta incluye la eliminación de 12 ministerios, la privatización de empresas estatales y la apertura total del comercio exterior. Los bloques opositores anticiparon resistencia.',
  imageUrl: `https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=675&fit=crop&q=90&v=${Date.now()}`,
  author: 'Redacción Política Argentina',
  publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  views: 45230,
  isBreaking: true,
};

const topNews = [
  {
    id: '2',
    title: 'Cristina Kirchner presenta proyecto de ley sobre reforma previsional',
    category: 'Política',
    categorySlug: 'politica',
    excerpt: 'La expresidenta propone aumentar las jubilaciones mínimas y modificar la fórmula de movilidad. El oficialismo adelantó que no apoyará la iniciativa.',
    imageUrl: `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop&q=85&v=${Date.now()}`,
    author: 'Juan Martínez',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    views: 32100,
  },
  {
    id: '3',
    title: 'Dólar blue alcanza nuevo récord histórico: supera los $1.500',
    category: 'Economía',
    categorySlug: 'economia',
    excerpt: 'El mercado paralelo registra una suba del 8% en la última semana. Economistas advierten sobre presiones inflacionarias y piden medidas urgentes del Banco Central.',
    imageUrl: `https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop&q=85&v=${Date.now()}`,
    author: 'María González',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    views: 56780,
  },
  {
    id: '4',
    title: 'Corte Suprema analiza caso clave sobre corrupción institucional',
    category: 'Judicial',
    categorySlug: 'judicial',
    excerpt: 'El máximo tribunal evalúa denuncias sobre irregularidades en la obra pública durante el gobierno anterior. La decisión podría sentar jurisprudencia.',
    imageUrl: `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=85&v=${Date.now()}`,
    author: 'Carlos Rodríguez',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    views: 28450,
  },
];

const latestNews = [
  {
    id: '5',
    title: 'Argentina firma acuerdo comercial histórico con la Unión Europea',
    category: 'Internacional',
    categorySlug: 'internacional',
    excerpt: 'El tratado abre mercados europeos para productos argentinos y elimina aranceles en sectores clave como agricultura y tecnología.',
    imageUrl: `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=85&v=${Date.now()}`,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    views: 19230,
  },
  {
    id: '6',
    title: 'Reforma educativa genera debate en todo el país',
    category: 'Sociedad',
    categorySlug: 'sociedad',
    excerpt: 'Docentes, padres y expertos discuten los cambios propuestos en el sistema educativo. Habrá audiencias públicas en todas las provincias.',
    imageUrl: `https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop&q=85&v=${Date.now()}`,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    views: 15670,
  },
  {
    id: '7',
    title: 'Inflación de octubre supera las proyecciones del gobierno',
    category: 'Economía',
    categorySlug: 'economia',
    excerpt: 'El INDEC informó que los precios subieron 8.3% en el mes, por encima del 6.5% estimado. Alimentos y servicios lideraron los aumentos.',
    imageUrl: `https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop&q=85&v=${Date.now()}`,
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    views: 42100,
  },
  {
    id: '8',
    title: 'Gobernadores del interior reclaman mayor coparticipación federal',
    category: 'Política',
    categorySlug: 'politica',
    excerpt: 'Mandatarios provinciales se reunieron en Córdoba para coordinar estrategia ante el gobierno nacional. Amenazan con acciones legales.',
    imageUrl: `https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop&q=85&v=${Date.now()}`,
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    views: 22450,
  },
];

const trendingTopics = [
  { name: 'Reforma Económica', count: 45230 },
  { name: 'Dólar Blue', count: 38900 },
  { name: 'Elecciones 2025', count: 32100 },
  { name: 'Inflación', count: 28700 },
  { name: 'Corrupción', count: 25400 },
];

function getCategoryClass(slug: string) {
  const classes: Record<string, string> = {
    politica: 'category-politica',
    economia: 'category-economia',
    judicial: 'category-judicial',
    internacional: 'category-internacional',
    sociedad: 'category-sociedad',
  };
  return classes[slug] || 'bg-gray-600 text-white';
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Bar */}
      {featuredNews.isBreaking && (
        <div className="breaking-news-bar">
          <div className="container mx-auto px-4 flex items-center gap-3">
            <span className="font-bold uppercase">🔴 Última Hora</span>
            <span className="flex-1 truncate">{featuredNews.title}</span>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="top-bar no-print">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <time className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleDateString('es-AR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </div>
          <div className="flex items-center gap-4">
            <span>Buenos Aires, Argentina</span>
            <span>|</span>
            <span className="text-green-400">● En Vivo</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="logo-text">Política Argentina</h1>
            <p className="text-xs text-gray-500 hidden md:block">
              El portal líder de noticias políticas
            </p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="border-t border-gray-200 no-print">
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-6 py-3 overflow-x-auto">
              <li><a href="#" className="nav-link nav-link-active">Inicio</a></li>
              <li><a href="#" className="nav-link">Política</a></li>
              <li><a href="#" className="nav-link">Economía</a></li>
              <li><a href="#" className="nav-link">Judicial</a></li>
              <li><a href="#" className="nav-link">Internacional</a></li>
              <li><a href="#" className="nav-link">Sociedad</a></li>
              <li><a href="#" className="nav-link">Opinión</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            <article className="article-card-featured">
              <div className="relative h-[400px] md:h-[500px] mb-6">
                <Image
                  src={featuredNews.imageUrl}
                  alt={featuredNews.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`category-badge ${getCategoryClass(featuredNews.categorySlug)}`}>
                    {featuredNews.category}
                  </span>
                  {featuredNews.isBreaking && (
                    <span className="text-red-600 text-sm font-bold uppercase">
                      Breaking News
                    </span>
                  )}
                </div>
                <h2 className="article-title article-title-large text-balance">
                  {featuredNews.title}
                </h2>
                {featuredNews.subtitle && (
                  <p className="text-xl text-gray-700 font-medium text-balance">
                    {featuredNews.subtitle}
                  </p>
                )}
                <p className="article-excerpt">
                  {featuredNews.excerpt}
                </p>
                <div className="article-meta">
                  <span>Por {featuredNews.author}</span>
                  <span>•</span>
                  <time>
                    {formatDistanceToNow(featuredNews.publishedAt, { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {featuredNews.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </article>

            {/* Top News Grid */}
            <section>
              <h3 className="text-2xl font-serif font-bold mb-6 pb-3 border-b-2 border-gray-900">
                Noticias Destacadas
              </h3>
              <div className="news-grid">
                {topNews.map((article) => (
                  <article key={article.id} className="article-card group cursor-pointer">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-3 p-4">
                      <span className={`category-badge ${getCategoryClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                      <h3 className="article-title group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="article-excerpt line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="article-meta">
                        <span>{article.author}</span>
                        <span>•</span>
                        <time>
                          {formatDistanceToNow(article.publishedAt, { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Latest News List */}
            <section>
              <h3 className="text-2xl font-serif font-bold mb-6 pb-3 border-b-2 border-gray-900">
                Últimas Noticias
              </h3>
              <div className="news-list">
                {latestNews.map((article) => (
                  <article key={article.id} className="article-card group cursor-pointer flex gap-4 p-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className={`category-badge ${getCategoryClass(article.categorySlug)}`}>
                        {article.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="article-meta">
                        <time>
                          {formatDistanceToNow(article.publishedAt, { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </time>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending Topics */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Temas del Momento
              </h3>
              <ul className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="font-medium text-gray-900">{topic.name}</span>
                    <span className="text-sm text-gray-500">{topic.count.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Most Read */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Más Leídas</h3>
              <ol className="space-y-4">
                {topNews.slice(0, 5).map((article, index) => (
                  <li key={article.id} className="flex gap-3 group cursor-pointer">
                    <span className="text-2xl font-bold text-gray-300 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-sm group-hover:text-blue-600 transition-colors line-clamp-3">
                        {article.title}
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        {article.views.toLocaleString()} lecturas
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget bg-blue-50 border-blue-200">
              <h3 className="sidebar-title text-blue-900 border-blue-900">
                Newsletter
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Recibe las noticias más importantes en tu email
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-section py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-4">
                Política Argentina
              </h4>
              <p className="text-sm text-gray-400">
                Portal líder de noticias políticas de Argentina. Cobertura en tiempo real y análisis experto.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Secciones</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="footer-link">Política</a></li>
                <li><a href="#" className="footer-link">Economía</a></li>
                <li><a href="#" className="footer-link">Judicial</a></li>
                <li><a href="#" className="footer-link">Internacional</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Información</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="footer-link">Sobre Nosotros</a></li>
                <li><a href="#" className="footer-link">Contacto</a></li>
                <li><a href="#" className="footer-link">Términos y Condiciones</a></li>
                <li><a href="#" className="footer-link">Política de Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Síguenos</h5>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 Política Argentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
