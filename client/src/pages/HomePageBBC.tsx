import { BBCHeader } from '../components/BBCHeader';
import { BBCNewsCard } from '../components/BBCNewsCard';
import { MegaSEO } from '../components/MegaSEO';
import { allArticles, getFeaturedArticles, getBreakingNews, getArticlesByCategory } from '../data/allNews';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/bbc-style.css';

export const HomePageBBC = () => {
  const { t, i18n } = useTranslation();
  
  // Usar las noticias reales de allNews
  const featuredNews = getFeaturedArticles()[0];
  const breakingNews = getBreakingNews();
  const politicaNews = getArticlesByCategory('politica').slice(0, 4);
  const economiaNews = getArticlesByCategory('economia').slice(0, 4);
  const sociedadNews = getArticlesByCategory('sociedad').slice(0, 4);
  const internacionalNews = getArticlesByCategory('internacional').slice(0, 3);
  const deportesNews = getArticlesByCategory('deportes').slice(0, 3);
  const culturaNews = getArticlesByCategory('cultura').slice(0, 2);
  const latestNews = allArticles.filter(a => a.status === 'published').slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <MegaSEO
        title={t('home.title', 'Noticias Políticas de Argentina')}
        description={t('home.description', 'Portal profesional de noticias políticas de Argentina. Últimas noticias, análisis y tendencias políticas en tiempo real. Cobertura completa de política, economía, sociedad e internacional.')}
        keywords="política argentina, noticias argentina, gobierno argentino, elecciones argentina, congreso nacional, presidente argentina, economía argentina, dólar, inflación, noticias políticas, análisis político"
        url={`https://politicaargentina.com${i18n.language !== 'es' ? `/${i18n.language}` : ''}/`}
        type="website"
      />
      <BBCHeader />

      {/* Breaking News Banner */}
      {breakingNews.length > 0 && (
        <div className="bbc-breaking">
          <div className="container-bbc">
            <div className="flex items-center gap-4">
              <span className="bbc-breaking-label flex items-center gap-2">
                <TrendingUp size={16} />
                Última Hora
              </span>
              <p className="bbc-breaking-text">
                {breakingNews[0].title}
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container-bbc py-8">
        {/* Featured News Section */}
        <section className="bbc-news-main fade-in">
          {/* Main Featured Article */}
          <div>
            {featuredNews && (
              <BBCNewsCard
                id={featuredNews.id}
                title={featuredNews.title}
                excerpt={featuredNews.excerpt}
                category={featuredNews.category}
                imageUrl={featuredNews.imageUrl}
                publishedAt={featuredNews.publishedAt}
                isBreaking={featuredNews.isBreaking}
                isFeatured={true}
              />
            )}
          </div>

          {/* Sidebar - Latest News */}
          <div className="bbc-sidebar">
            <div className="bbc-sidebar-section">
              <h3 className="bbc-sidebar-title">Últimas Noticias</h3>
              {latestNews.slice(1, 6).map((news) => (
                <div key={news.id} className="bbc-sidebar-item">
                  <BBCNewsCard
                    id={news.id}
                    title={news.title}
                    excerpt={news.excerpt}
                    category={news.category}
                    publishedAt={news.publishedAt}
                    variant="compact"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Política Section */}
        <section className="bbc-section fade-in">
          <div className="bbc-section-header">
            <h2 className="bbc-section-title">Política</h2>
            <a href="/categoria/politica" className="bbc-section-link">
              Ver todas las noticias <ArrowRight size={16} />
            </a>
          </div>
          <div className="bbc-section-grid">
            {politicaNews.map((news) => (
              <BBCNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                category={news.category}
                imageUrl={news.imageUrl}
                publishedAt={news.publishedAt}
              />
            ))}
          </div>
        </section>

        {/* Economía Section */}
        <section className="bbc-section fade-in">
          <div className="bbc-section-header">
            <h2 className="bbc-section-title">Economía</h2>
            <a href="/categoria/economia" className="bbc-section-link">
              Ver todas las noticias <ArrowRight size={16} />
            </a>
          </div>
          <div className="bbc-section-grid">
            {economiaNews.map((news) => (
              <BBCNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                category={news.category}
                imageUrl={news.imageUrl}
                publishedAt={news.publishedAt}
              />
            ))}
          </div>
        </section>

        {/* Sociedad Section */}
        <section className="bbc-section fade-in">
          <div className="bbc-section-header">
            <h2 className="bbc-section-title">Sociedad</h2>
            <a href="/categoria/sociedad" className="bbc-section-link">
              Ver todas las noticias <ArrowRight size={16} />
            </a>
          </div>
          <div className="bbc-section-grid">
            {sociedadNews.map((news) => (
              <BBCNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                category={news.category}
                imageUrl={news.imageUrl}
                publishedAt={news.publishedAt}
              />
            ))}
          </div>
        </section>

        {/* Grid de 3 columnas: Internacional, Deportes, Cultura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          {/* Internacional */}
          <section className="fade-in">
            <div className="bbc-section-header">
              <h2 className="bbc-section-title text-xl">Internacional</h2>
              <a href="/categoria/internacional" className="bbc-section-link text-sm">
                Ver más <ArrowRight size={14} />
              </a>
            </div>
            <div className="space-y-4">
              {internacionalNews.map((news) => (
                <BBCNewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  category={news.category}
                  publishedAt={news.publishedAt}
                  variant="compact"
                />
              ))}
            </div>
          </section>

          {/* Deportes */}
          <section className="fade-in">
            <div className="bbc-section-header">
              <h2 className="bbc-section-title text-xl">Deportes</h2>
              <a href="/categoria/deportes" className="bbc-section-link text-sm">
                Ver más <ArrowRight size={14} />
              </a>
            </div>
            <div className="space-y-4">
              {deportesNews.map((news) => (
                <BBCNewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  category={news.category}
                  publishedAt={news.publishedAt}
                  variant="compact"
                />
              ))}
            </div>
          </section>

          {/* Cultura */}
          <section className="fade-in">
            <div className="bbc-section-header">
              <h2 className="bbc-section-title text-xl">Cultura</h2>
              <a href="/categoria/cultura" className="bbc-section-link text-sm">
                Ver más <ArrowRight size={14} />
              </a>
            </div>
            <div className="space-y-4">
              {culturaNews.map((news) => (
                <BBCNewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  category={news.category}
                  publishedAt={news.publishedAt}
                  variant="compact"
                />
              ))}
            </div>
          </section>
        </div>

        {/* Más Noticias - Horizontal Cards */}
        <section className="bbc-section fade-in">
          <div className="bbc-section-header">
            <h2 className="bbc-section-title">Más Noticias</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData.slice(10, 18).map((news) => (
              <BBCNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                category={news.category}
                imageUrl={news.imageUrl}
                publishedAt={news.publishedAt}
                variant="horizontal"
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bbc-footer">
        <div className="container-bbc">
          <div className="bbc-footer-grid">
            <div className="bbc-footer-section">
              <h4>Secciones</h4>
              <ul className="bbc-footer-links">
                <li><a href="/categoria/politica">Política</a></li>
                <li><a href="/categoria/economia">Economía</a></li>
                <li><a href="/categoria/sociedad">Sociedad</a></li>
                <li><a href="/categoria/internacional">Internacional</a></li>
                <li><a href="/categoria/deportes">Deportes</a></li>
                <li><a href="/categoria/cultura">Cultura</a></li>
              </ul>
            </div>
            <div className="bbc-footer-section">
              <h4>Acerca de</h4>
              <ul className="bbc-footer-links">
                <li><a href="/nosotros">Quiénes Somos</a></li>
                <li><a href="/contacto">Contacto</a></li>
                <li><a href="/equipo">Nuestro Equipo</a></li>
                <li><a href="/publicidad">Publicidad</a></li>
              </ul>
            </div>
            <div className="bbc-footer-section">
              <h4>Legal</h4>
              <ul className="bbc-footer-links">
                <li><a href="/terminos">Términos de Uso</a></li>
                <li><a href="/privacidad">Política de Privacidad</a></li>
                <li><a href="/cookies">Política de Cookies</a></li>
              </ul>
            </div>
            <div className="bbc-footer-section">
              <h4>Síguenos</h4>
              <ul className="bbc-footer-links">
                <li><a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="bbc-footer-bottom">
            <p>© 2025 Política Argentina. Todos los derechos reservados.</p>
            <p className="mt-2">Portal de noticias políticas de Argentina - Información veraz y actualizada</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
