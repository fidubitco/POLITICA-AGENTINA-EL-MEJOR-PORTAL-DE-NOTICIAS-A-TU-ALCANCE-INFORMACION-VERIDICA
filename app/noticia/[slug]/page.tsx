import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allArticles, getArticleBySlug } from '@/data/allNews';
import { ArticleHeader } from '@/components/ArticleHeader';
import { ArticleContent } from '@/components/ArticleContent';
import { ArticleSidebar } from '@/components/ArticleSidebar';
import { RelatedArticles } from '@/components/RelatedArticles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author }],
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Encontrar artículos relacionados (misma categoría, excluyendo el actual)
  const relatedArticles = allArticles
    .filter(a => a.categorySlug === article.categorySlug && a.id !== article.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Header del artículo */}
      <ArticleHeader article={article} />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna principal */}
          <main className="lg:col-span-8">
            <ArticleContent article={article} />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <ArticleSidebar article={article} />
          </aside>
        </div>

        {/* Artículos relacionados */}
        <RelatedArticles articles={relatedArticles} currentCategory={article.categorySlug} />
      </div>
    </div>
  );
}
