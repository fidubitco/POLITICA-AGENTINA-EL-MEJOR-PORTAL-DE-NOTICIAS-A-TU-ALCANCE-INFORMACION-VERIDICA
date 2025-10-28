/**
 * 🏠 HOME PROFESIONAL - ESTILO BBC/NYT
 * Diseño enterprise-grade, mobile-first, SEO-optimized
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { allArticles } from '../data/allNews';
import { SupremeSEO } from '../components/SupremeSEO';
import DolarWidget from '../components/DolarWidget';
import ArticleCardProfessional from '../components/ArticleCardProfessional';

export const HomeProfessional: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Filtrar y organizar artículos
  const publishedArticles = allArticles.filter(a => a.status === 'published');
  const breakingNews = publishedArticles.filter(a => a.breaking).slice(0, 1)[0];
  const featuredArticle = publishedArticles.filter(a => a.featured && !a.breaking).slice(0, 1)[0];
  const topStories = publishedArticles.slice(0, 8);
  const politicaArticles = publishedArticles.filter(a => a.category === 'politica').slice(0, 6);
  const economiaArticles = publishedArticles.filter(a => a.category === 'economia').slice(0, 6);
  const judicialArticles = publishedArticles.filter(a => a.category === 'judicial').slice(0, 6);
  const trendingArticles = publishedArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const formatDate = () => {
    return currentTime.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <SupremeSEO
        title="Política Argentina - Portal de Noticias Políticas"
        description="Portal profesional de noticias políticas de Argentina. Cobertura completa de política, economía, sociedad, judicial y más. Información verificada y actualizada."
        keywords="política argentina, noticias argentina, milei, cristina kirchner, economía, dólar, judicial"
        url="https://politicaargentina.com/"
      />

      <div className="min-h-screen bg-white">
        {/* Breaking News Banner */}
        {breakingNews && (
          <div className="bg-red-700 text-white py-2 border-b border-red-800">
            <div className="container mx-auto px-4">
              <Link href={`/${breakingNews.category}/${breakingNews.slug}`}>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <span className="flex items-center gap-2 bg-white text-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wide flex-shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Última Hora
                  </span>
                  <span className="text-sm md:text-base font-medium group-hover:underline line-clamp-1">
                    {breakingNews.title}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Featured Article */}
          {featuredArticle && (
            <section className="mb-12">
              <ArticleCardProfessional 
                article={featuredArticle} 
                variant="featured"
                showImage={true}
                showExcerpt={true}
                showMeta={true}
              />
            </section>
          )}

          {/* Top Stories Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-900">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                Principales Noticias
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topStories.slice(0, 6).map((article) => (
                <ArticleCardProfessional 
                  key={article.id}
                  article={article} 
                  variant="large"
                  showImage={true}
                  showExcerpt={false}
                  showMeta={true}
                />
              ))}
            </div>
          </section>

          {/* Main Grid: Content + Sidebar */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Política Section */}
              <section>
                <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-blue-700">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Política
                  </h2>
                  <Link href="/category/politica">
                    <span className="text-sm font-medium text-blue-700 hover:text-blue-900 cursor-pointer">
                      Ver todo →
                    </span>
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {politicaArticles.slice(0, 4).map((article) => (
                    <ArticleCardProfessional 
                      key={article.id}
                      article={article} 
                      variant="medium"
                      showImage={true}
                      showExcerpt={false}
                      showMeta={true}
                    />
                  ))}
                </div>
              </section>

              {/* Economía Section */}
              <section>
                <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-green-700">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Economía
                  </h2>
                  <Link href="/category/economia">
                    <span className="text-sm font-medium text-green-700 hover:text-green-900 cursor-pointer">
                      Ver todo →
                    </span>
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {economiaArticles.slice(0, 4).map((article) => (
                    <ArticleCardProfessional 
                      key={article.id}
                      article={article} 
                      variant="medium"
                      showImage={true}
                      showExcerpt={false}
                      showMeta={true}
                    />
                  ))}
                </div>
              </section>

              {/* Judicial Section */}
              <section>
                <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-red-700">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Judicial
                  </h2>
                  <Link href="/category/judicial">
                    <span className="text-sm font-medium text-red-700 hover:text-red-900 cursor-pointer">
                      Ver todo →
                    </span>
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {judicialArticles.slice(0, 4).map((article) => (
                    <ArticleCardProfessional 
                      key={article.id}
                      article={article} 
                      variant="medium"
                      showImage={true}
                      showExcerpt={false}
                      showMeta={true}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Dolar Widget */}
              <div className="bg-gray-50 border border-gray-200 p-4 sticky top-20">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  Cotización del Dólar
                </h3>
                <DolarWidget />
              </div>

              {/* Trending Articles */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-700" />
                  Más Leídas
                </h3>
                <div className="space-y-1">
                  {trendingArticles.map((article, index) => (
                    <div key={article.id} className="flex gap-3 py-3 border-b border-gray-200 last:border-0">
                      <span className="font-serif text-2xl font-bold text-red-700 flex-shrink-0 w-8">
                        {index + 1}
                      </span>
                      <Link href={`/${article.category}/${article.slug}`}>
                        <div className="cursor-pointer group">
                          <h4 className="font-serif text-sm font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span className="capitalize">{article.category}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.views.toLocaleString()} vistas</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gray-900 text-white p-6">
                <h3 className="font-serif text-xl font-bold mb-3">
                  Suscríbete a nuestro Newsletter
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Recibe las noticias más importantes directamente en tu correo.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Suscribirse
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-3">
                  Al suscribirte, aceptas nuestra política de privacidad.
                </p>
              </div>
            </aside>
          </div>

          {/* More Articles Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-900">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Más Noticias
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publishedArticles.slice(8, 16).map((article) => (
                <ArticleCardProfessional 
                  key={article.id}
                  article={article} 
                  variant="small"
                  showImage={true}
                  showExcerpt={false}
                  showMeta={true}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Política Argentina</h3>
                <p className="text-sm text-gray-400">
                  Portal profesional de noticias políticas de Argentina. Información verificada y actualizada.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Secciones</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/category/politica"><span className="text-gray-400 hover:text-white cursor-pointer">Política</span></Link></li>
                  <li><Link href="/category/economia"><span className="text-gray-400 hover:text-white cursor-pointer">Economía</span></Link></li>
                  <li><Link href="/category/judicial"><span className="text-gray-400 hover:text-white cursor-pointer">Judicial</span></Link></li>
                  <li><Link href="/category/sociedad"><span className="text-gray-400 hover:text-white cursor-pointer">Sociedad</span></Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Información</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about"><span className="text-gray-400 hover:text-white cursor-pointer">Acerca de</span></Link></li>
                  <li><Link href="/contact"><span className="text-gray-400 hover:text-white cursor-pointer">Contacto</span></Link></li>
                  <li><Link href="/privacy"><span className="text-gray-400 hover:text-white cursor-pointer">Privacidad</span></Link></li>
                  <li><Link href="/terms"><span className="text-gray-400 hover:text-white cursor-pointer">Términos</span></Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Síguenos</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Mantente informado en nuestras redes sociales
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                    <span className="sr-only">Twitter</span>
                    𝕏
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                    <span className="sr-only">Facebook</span>
                    f
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                    <span className="sr-only">Instagram</span>
                    📷
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Política Argentina. Todos los derechos reservados.</p>
              <p className="mt-2 capitalize">{formatDate()}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeProfessional;

