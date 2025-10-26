import { useRoute } from 'wouter';
import { BBCHeader } from '../components/BBCHeader';
import { MegaSEO } from '../components/MegaSEO';
import { newsData } from '../data/newsData';
import { Clock, Share2, Facebook, Twitter, Linkedin, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import '../styles/bbc-style.css';

export const ArticleDetailPage = () => {
  const [, params] = useRoute('/noticia/:id');
  const articleId = params?.id ? parseInt(params.id) : null;
  
  const article = newsData.find(a => a.id === articleId);
  const relatedArticles = newsData
    .filter(a => a.category === article?.category && a.id !== articleId)
    .slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <BBCHeader />
        <div className="container-bbc py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-8">Lo sentimos, el artículo que buscas no existe.</p>
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareUrl = `https://politicaargentina.com/noticia/${article.id}`;
  const shareTitle = article.title;

  return (
    <div className="min-h-screen bg-white">
      <MegaSEO
        title={article.title}
        description={article.excerpt}
        keywords={`${article.category}, política argentina, noticias, ${article.author}`}
        image={article.imageUrl}
        url={shareUrl}
        type="article"
        publishedTime={article.publishedAt}
        author={article.author}
        section={article.category}
        tags={[article.category, 'Argentina', 'Noticias']}
      />
      <BBCHeader />

      <article className="container-bbc py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/">
            <a className="hover:text-[#bb1919]">Inicio</a>
          </Link>
          <span>/</span>
          <Link href={`/categoria/${article.category.toLowerCase()}`}>
            <a className="hover:text-[#bb1919]">{article.category}</a>
          </Link>
          <span>/</span>
          <span className="text-gray-900">{article.title.substring(0, 50)}...</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-[#bb1919] text-white px-4 py-2 text-sm font-bold uppercase">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-6 mb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <div className="text-gray-600">
                Por <span className="font-semibold text-gray-900">{article.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            {article.imageUrl && (
              <figure className="mb-8">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full aspect-video object-cover rounded"
                />
                <figcaption className="text-sm text-gray-600 mt-2">
                  {article.title}
                </figcaption>
              </figure>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                {article.content}
              </p>
              
              {/* Contenido extendido simulado */}
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                En un contexto de creciente complejidad política y económica, esta noticia representa un punto de inflexión 
                importante para el desarrollo del país. Los analistas políticos coinciden en que las decisiones tomadas en 
                este período tendrán un impacto significativo en el futuro inmediato de la nación.
              </p>

              <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Contexto y Antecedentes</h2>
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                Para comprender plenamente el alcance de estos acontecimientos, es fundamental analizar el contexto histórico 
                y político que los rodea. Durante los últimos meses, diversos factores han convergido para crear la situación 
                actual, incluyendo cambios en las dinámicas políticas internas y presiones económicas externas.
              </p>

              <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Implicaciones y Perspectivas</h2>
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                Las implicaciones de estos desarrollos son de amplio alcance y afectarán múltiples sectores de la sociedad 
                argentina. Expertos en política y economía están monitoreando de cerca la evolución de los acontecimientos, 
                anticipando posibles escenarios futuros y sus consecuencias para la población.
              </p>

              <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Reacciones y Opiniones</h2>
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                La noticia ha generado diversas reacciones en el espectro político argentino. Mientras algunos sectores 
                celebran las medidas anunciadas, otros expresan preocupación por sus posibles consecuencias. El debate público 
                continúa desarrollándose a medida que más actores políticos y sociales expresan sus posiciones.
              </p>
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Share2 size={20} />
                Compartir esta noticia
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1877f2] text-white px-6 py-3 rounded hover:bg-[#0d65d9] transition"
                >
                  <Facebook size={20} />
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1da1f2] text-white px-6 py-3 rounded hover:bg-[#0d8bd9] transition"
                >
                  <Twitter size={20} />
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded hover:bg-[#006399] transition"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
                  className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                >
                  <Mail size={20} />
                  Email
                </a>
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-12 p-6 bg-gray-50 rounded">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Sobre el autor</h3>
              <p className="text-gray-700">
                <span className="font-semibold">{article.author}</span> es periodista especializado en {article.category.toLowerCase()} 
                argentina. Con años de experiencia en el campo, ha cubierto los principales acontecimientos políticos y sociales del país.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Related Articles */}
              <div className="bg-gray-50 p-6 rounded mb-6">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-3 border-b-2 border-[#bb1919]">
                  Noticias Relacionadas
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={`/noticia/${related.id}`}>
                      <a className="block group">
                        <div className="flex gap-3">
                          {related.imageUrl && (
                            <img 
                              src={related.imageUrl} 
                              alt={related.title}
                              className="w-24 h-24 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-[#1a1a1a] group-hover:text-[#bb1919] transition line-clamp-3">
                              {related.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {formatDate(related.publishedAt).split(',')[0]}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-gray-50 p-6 rounded">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-3 border-b-2 border-[#bb1919]">
                  Categorías
                </h3>
                <div className="space-y-2">
                  {['Política', 'Economía', 'Sociedad', 'Internacional', 'Deportes', 'Cultura'].map((cat) => (
                    <Link key={cat} href={`/categoria/${cat.toLowerCase()}`}>
                      <a className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-[#bb1919] rounded transition">
                        {cat}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

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
