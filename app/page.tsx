'use client';

import Image from 'next/image';

export default function HomePage() {
  // Datos mock simples - Sin dependencias externas
  const articles = [
    {
      id: '1',
      title: 'Milei anuncia nuevas medidas económicas en el Congreso',
      category: 'Política',
      excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
      views: 15420,
      likes: 892,
      imageUrl: `https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=450&fit=crop&q=80&v=${Date.now()}`
    },
    {
      id: '2',
      title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
      category: 'Política',
      excerpt: 'La Vicepresidenta propone nuevas modificaciones al sistema previsional argentino.',
      views: 12890,
      likes: 756,
      imageUrl: `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop&q=80&v=${Date.now()}`
    },
    {
      id: '3',
      title: 'Dólar blue rompe barrera de los $1500',
      category: 'Economía',
      excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
      views: 18750,
      likes: 1243,
      imageUrl: `https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop&q=80&v=${Date.now()}`
    },
    {
      id: '4',
      title: 'Suprema Corte analiza caso de corrupción institucional',
      category: 'Judicial',
      excerpt: 'El máximo tribunal evalúa denuncias sobre irregularidades en contratos del Estado.',
      views: 9320,
      likes: 567,
      imageUrl: `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80&v=${Date.now()}`
    },
    {
      id: '5',
      title: 'Nuevo acuerdo comercial con la Unión Europea',
      category: 'Internacional',
      excerpt: 'Argentina firma tratado de libre comercio que abre mercados europeos.',
      views: 11500,
      likes: 789,
      imageUrl: `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop&q=80&v=${Date.now()}`
    },
    {
      id: '6',
      title: 'Reforma educativa genera debate nacional',
      category: 'Sociedad',
      excerpt: 'Expertos discuten cambios en el sistema educativo argentino.',
      views: 8760,
      likes: 432,
      imageUrl: `https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=450&fit=crop&q=80&v=${Date.now()}`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Política Argentina 🇦🇷
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Portal de Noticias Políticas de Argentina
          </p>
          <p className="text-sm opacity-75">
            Última actualización: {new Date().toLocaleString('es-AR')}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Últimas Noticias
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                  {article.category}
                </span>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👁️ {article.views.toLocaleString()}</span>
                  <span>❤️ {article.likes.toLocaleString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 Política Argentina. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
