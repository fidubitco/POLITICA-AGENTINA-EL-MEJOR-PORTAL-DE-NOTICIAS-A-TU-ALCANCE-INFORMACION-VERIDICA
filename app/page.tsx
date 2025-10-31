import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Política Argentina - Portal de Noticias Políticas',
  description: 'Portal líder de noticias políticas de Argentina. Información actualizada las 24 horas sobre política, economía, judicial y sociedad.',
  openGraph: {
    title: 'Política Argentina - Noticias Políticas',
    description: 'Portal líder de noticias políticas de Argentina',
  },
};

// Datos de ejemplo simplificados
const mockArticles = [
  {
    id: '1',
    title: 'Milei anuncia nuevas medidas económicas en el Congreso',
    category: 'Política',
    excerpt: 'El Presidente presentó un paquete de reformas económicas que incluye reducción del gasto público y apertura comercial.',
    views: 15420,
    likes: 892,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop&q=80&auto=format'
  },
  {
    id: '2',
    title: 'Cristina Kirchner presenta proyecto de ley sobre pensiones',
    category: 'Política',
    excerpt: 'La Vicepresidenta propone nuevas modificaciones al sistema previsional argentino.',
    views: 12890,
    likes: 756,
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=225&fit=crop&q=80&auto=format'
  },
  {
    id: '3',
    title: 'Dólar blue rompe barrera de los $1500',
    category: 'Economía',
    excerpt: 'El mercado paralelo registra un nuevo récord histórico en la cotización del dólar estadounidense.',
    views: 18750,
    likes: 1243,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&q=80&auto=format'
  },
  {
    id: '4',
    title: 'Suprema Corte analiza caso de corrupción institucional',
    category: 'Judicial',
    excerpt: 'El máximo tribunal evalúa denuncias sobre irregularidades en contratos del Estado.',
    views: 9320,
    likes: 567,
    imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&h=225&fit=crop&q=80&auto=format'
  },
  {
    id: '5',
    title: 'Nuevo acuerdo comercial con la Unión Europea',
    category: 'Internacional',
    excerpt: 'Argentina firma tratado de libre comercio que abre mercados europeos.',
    views: 11500,
    likes: 789,
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=225&fit=crop&q=80&auto=format'
  },
  {
    id: '6',
    title: 'Reforma educativa genera debate nacional',
    category: 'Sociedad',
    excerpt: 'Expertos discuten cambios en el sistema educativo argentino.',
    views: 8760,
    likes: 432,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=225&fit=crop&q=80&auto=format'
  }
];

const stats = {
  totalArticles: 73,
  publishedArticles: 68,
  featuredArticles: 12,
  breakingNews: 5
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Política Argentina</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            El portal líder de noticias políticas de Argentina. Información actualizada las 24 horas sobre gobierno, economía y sociedad.
          </p>
          <div className="text-lg space-y-2">
            <p>📰 Más de 70 artículos actualizados</p>
            <p>🎯 Cobertura completa de política argentina</p>
            <p>⚡ Información en tiempo real</p>
            <p>🔧 Panel de administración separado disponible</p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <Image
                  src={article.imageUrl}
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
                  <span>{article.views.toLocaleString()} vistas</span>
                  <span>{article.likes} likes</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">{stats.totalArticles}</div>
            <div className="text-gray-600">Artículos Totales</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">{stats.publishedArticles}</div>
            <div className="text-gray-600">Publicados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">{stats.featuredArticles}</div>
            <div className="text-gray-600">Destacados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-orange-600">{stats.breakingNews}</div>
            <div className="text-gray-600">Última Hora</div>
          </div>
        </div>

        {/* Información del Admin Panel */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">🔧 Panel de Administración Separado</h2>
          <p className="text-gray-600 mb-6">
            Para mayor seguridad y organización, hemos separado completamente el panel de administración en un proyecto independiente con su propia base de datos y dominio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">📊 Funcionalidades del Admin Panel:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ✅ Gestión completa de artículos (crear, editar, publicar)</li>
                <li>• ✅ Sistema de autenticación seguro (NextAuth.js)</li>
                <li>• ✅ Estadísticas y analytics en tiempo real</li>
                <li>• ✅ Gestión de multimedia (imágenes, videos, audio)</li>
                <li>• ✅ Control de categorías y etiquetas</li>
                <li>• ✅ Sistema de borradores y publicación</li>
                <li>• ✅ Artículos destacados y breaking news</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 Tecnologías del Admin Panel:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ✅ Next.js 15 con App Router</li>
                <li>• ✅ Base de datos PostgreSQL dedicada</li>
                <li>• ✅ Prisma ORM para gestión de datos</li>
                <li>• ✅ NextAuth.js para autenticación</li>
                <li>• ✅ Shadcn/ui para interfaz moderna</li>
                <li>• ✅ Tailwind CSS optimizado</li>
                <li>• ✅ Puerto independiente (3001)</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📁 Ubicación:</strong> El admin panel se encuentra en la carpeta <code className="bg-blue-100 px-2 py-1 rounded">admin-portal/</code> del proyecto.
            </p>
            <p className="text-sm text-blue-800 mt-2">
              <strong>🔗 Próximos pasos:</strong> Para activar el admin panel, configura las variables de entorno y ejecuta <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code> en la carpeta admin-portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}