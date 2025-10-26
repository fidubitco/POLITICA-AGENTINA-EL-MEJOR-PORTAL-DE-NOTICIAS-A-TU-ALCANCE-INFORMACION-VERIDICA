import { useRoute } from 'wouter';
import { BBCHeader } from '../components/BBCHeader';
import { BBCNewsCard } from '../components/BBCNewsCard';
import { MegaSEO } from '../components/MegaSEO';
import { newsData } from '../data/newsData';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import '../styles/bbc-style.css';

export const CategoryPageBBC = () => {
  const [, params] = useRoute('/categoria/:category');
  const categorySlug = params?.category;
  
  // Capitalizar primera letra
  const categoryName = categorySlug 
    ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
    : '';

  const categoryArticles = newsData.filter(
    a => a.category.toLowerCase() === categorySlug?.toLowerCase()
  );

  const categoryDescriptions: Record<string, string> = {
    politica: 'Últimas noticias políticas de Argentina. Cobertura completa del gobierno, congreso, elecciones y análisis político en profundidad.',
    economia: 'Noticias económicas de Argentina. Información sobre dólar, inflación, mercados, empresas y política económica.',
    sociedad: 'Noticias de sociedad argentina. Educación, salud, cultura, medio ambiente y temas sociales relevantes.',
    internacional: 'Noticias internacionales con foco en Argentina. Relaciones exteriores, acuerdos comerciales y política internacional.',
    deportes: 'Noticias deportivas de Argentina. Fútbol, selección nacional, deportes olímpicos y competencias internacionales.',
    cultura: 'Noticias culturales de Argentina. Cine, teatro, música, literatura y eventos culturales del país.',
  };

  if (!categorySlug || categoryArticles.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <BBCHeader />
        <div className="container-bbc py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Categoría no encontrada</h1>
          <p className="text-gray-600 mb-8">Lo sentimos, la categoría que buscas no existe.</p>
          <Link href="/">
            <a className="inline-flex items-center gap-2 bg-[#bb1919] text-white px-6 py-3 rounded hover:bg-[#990000] transition">
              <ArrowLeft size={20} />
              Volver al inicio
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MegaSEO
        title={`${categoryName} - Noticias de ${categoryName}`}
        description={categoryDescriptions[categorySlug.toLowerCase()] || `Todas las noticias de ${categoryName} en Argentina`}
        keywords={`${categoryName.toLowerCase()}, noticias ${categoryName.toLowerCase()}, argentina ${categoryName.toLowerCase()}, política argentina`}
        url={`https://politicaargentina.com/categoria/${categorySlug}/`}
        type="website"
      />
      <BBCHeader />

      <main className="container-bbc py-8">
        {/* Category Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/">
              <a className="hover:text-[#bb1919]">Inicio</a>
            </Link>
            <span>/</span>
            <span className="text-gray-900">{categoryName}</span>
          </nav>
          
          <div className="border-l-4 border-[#bb1919] pl-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-3">
              {categoryName}
            </h1>
            <p className="text-lg text-gray-700">
              {categoryDescriptions[categorySlug.toLowerCase()]}
            </p>
          </div>
        </div>

        {/* Articles Count */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <p className="text-gray-600">
            <span className="font-semibold text-[#1a1a1a]">{categoryArticles.length}</span> noticias encontradas
          </p>
        </div>

        {/* Featured Article */}
        {categoryArticles[0] && (
          <div className="mb-12">
            <BBCNewsCard
              id={categoryArticles[0].id}
              title={categoryArticles[0].title}
              excerpt={categoryArticles[0].excerpt}
              category={categoryArticles[0].category}
              imageUrl={categoryArticles[0].imageUrl}
              publishedAt={categoryArticles[0].publishedAt}
              isFeatured={true}
            />
          </div>
        )}

        {/* Articles Grid */}
        <div className="bbc-section-grid">
          {categoryArticles.slice(1).map((article) => (
            <BBCNewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              imageUrl={article.imageUrl}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Otras Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura']
              .filter(cat => cat.toLowerCase() !== categorySlug.toLowerCase())
              .map((cat) => (
                <Link key={cat} href={`/categoria/${cat.toLowerCase()}`}>
                  <a className="block p-4 bg-gray-50 hover:bg-[#bb1919] hover:text-white text-center font-semibold rounded transition">
                    {cat}
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bbc-footer mt-16">
        <div className="container-bbc">
          <div className="text-center py-8 border-t border-white/10">
            <p>© 2025 Política Argentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
