import { Metadata } from 'next';
import { allArticles, getFeaturedArticles } from '../client/src/data/allNews';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Política Argentina - Portal de Noticias Políticas',
  description: 'Portal líder de noticias políticas de Argentina. Información actualizada las 24 horas sobre política, economía, judicial y sociedad.',
  openGraph: {
    title: 'Política Argentina - Noticias Políticas',
    description: 'Portal líder de noticias políticas de Argentina',
  },
};

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Política Argentina</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            El portal líder de noticias políticas de Argentina. Información actualizada las 24 horas sobre gobierno, economía y sociedad.
          </p>
          <div className="text-lg">
            <p>📰 Más de 70 artículos actualizados</p>
            <p>🎯 Cobertura completa de política argentina</p>
            <p>⚡ Información en tiempo real</p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.slice(0, 9).map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <Image
                  src={article.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&q=80&auto=format'}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {article.category}
                </div>
                <h3 className="text-lg font-bold mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.views} vistas</span>
                  <span>{article.likes} likes</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">{allArticles.length}</div>
            <div className="text-gray-600">Artículos Totales</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">
              {allArticles.filter(a => a.status === 'published').length}
            </div>
            <div className="text-gray-600">Publicados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">
              {allArticles.filter(a => a.featured).length}
            </div>
            <div className="text-gray-600">Destacados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-orange-600">
              {allArticles.filter(a => a.breaking).length}
            </div>
            <div className="text-gray-600">Última Hora</div>
          </div>
        </div>
      </div>
    </div>
  );
}