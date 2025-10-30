import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { allArticles, getArticlesByCategory } from '@/data/allNews';
import { CategoryHeader } from '@/components/CategoryHeader';
import { ArticleGrid } from '@/components/ArticleGrid';
import { CategorySidebar } from '@/components/CategorySidebar';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  return {
    title: `${category.name} - Política Argentina`,
    description: category.description,
    keywords: category.seoKeywords,
    openGraph: {
      title: `${category.name} - Política Argentina`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(params.slug);
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de categoría */}
      <CategoryHeader category={category} articleCount={articles.length} />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna principal */}
          <main className="lg:col-span-8 space-y-8">
            {/* Artículos destacados */}
            {featuredArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 rounded-r-lg" style={{ backgroundColor: category.color }} />
                  Destacados
                </h2>
                <ArticleGrid articles={featuredArticles} featured={true} />
              </section>
            )}

            {/* Todos los artículos */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Todas las noticias de {category.name}
                </h2>
                <span className="text-sm text-gray-600">
                  {articles.length} artículos
                </span>
              </div>
              <ArticleGrid articles={regularArticles} />
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <CategorySidebar category={category} relatedArticles={articles.slice(0, 5)} />
          </aside>
        </div>
      </div>
    </div>
  );
}
