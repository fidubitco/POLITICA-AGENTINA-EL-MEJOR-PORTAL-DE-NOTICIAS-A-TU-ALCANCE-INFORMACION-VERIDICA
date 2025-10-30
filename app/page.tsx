import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedNews } from '@/components/FeaturedNews';
import { CategorySections } from '@/components/CategorySections';
import { SidebarWidgets } from '@/components/SidebarWidgets';
import { allArticles, getFeaturedArticles, getBreakingNews } from '@/data/allNews';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Portal líder de noticias políticas de Argentina. Información actualizada las 24 horas.',
  openGraph: {
    title: 'Política Argentina - Noticias Políticas',
    description: 'Portal líder de noticias políticas de Argentina',
  },
};

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const breakingNews = getBreakingNews();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection breakingNews={breakingNews} />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna Principal */}
          <main className="lg:col-span-8 space-y-8">
            {/* Noticias Destacadas */}
            <FeaturedNews articles={featuredArticles} />

            {/* Secciones por Categoría */}
            <CategorySections articles={allArticles} />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <SidebarWidgets />
          </aside>
        </div>
      </div>
    </div>
  );
}