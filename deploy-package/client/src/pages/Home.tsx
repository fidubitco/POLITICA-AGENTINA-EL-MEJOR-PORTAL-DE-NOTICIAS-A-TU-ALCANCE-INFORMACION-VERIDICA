import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export default function Home() {
  const { t, i18n } = useTranslation();

  const { data: featuredArticles, isLoading: loadingFeatured } = trpc.articles.getFeatured.useQuery({ limit: 3 });
  const { data: breakingNews, isLoading: loadingBreaking } = trpc.articles.getBreaking.useQuery({ limit: 3 });
  const { data: latestArticles, isLoading: loadingLatest } = trpc.articles.getPublished.useQuery({ limit: 12 });
  const { data: categories } = trpc.categories.getActive.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breaking News Banner */}
        {breakingNews && breakingNews.length > 0 && (
          <div className="bg-destructive text-destructive-foreground py-2">
            <div className="container">
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {t("breaking").toUpperCase()}
                </span>
                <div className="flex-1 overflow-hidden">
                  <div className="flex gap-8 animate-marquee">
                    {breakingNews.map((article) => (
                      <Link key={article.id} href={`/article/${article.slug}`}>
                        <span className="text-sm hover:underline cursor-pointer whitespace-nowrap">{article.slug}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section - Featured Articles */}
        <section className="container py-8">
          {loadingFeatured ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-96 rounded-lg" />
              <div className="grid grid-cols-1 gap-6">
                <Skeleton className="h-44 rounded-lg" />
                <Skeleton className="h-44 rounded-lg" />
              </div>
            </div>
          ) : featuredArticles && featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Featured Article */}
              <div className="lg:row-span-2">
                <ArticleCard article={featuredArticles[0]} featured />
              </div>

              {/* Secondary Featured Articles */}
              <div className="grid grid-cols-1 gap-6">
                {featuredArticles.slice(1, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} horizontal />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noResults")}</p>
            </div>
          )}
        </section>

        {/* Latest News Section */}
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-3xl font-bold">Últimas Noticias</h2>
            <Button variant="ghost" asChild>
              <Link href="/latest">
                <span className="flex items-center gap-2 cursor-pointer">
                  Ver todas
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>

        {/* Latest News Grid */}
        {loadingLatest ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noResults")}</p>
            </div>
          )}
        </section>

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="container">
              <h2 className="font-serif text-3xl font-bold mb-6">Explora por Categoría</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <div
                      className="p-6 rounded-lg text-center hover:shadow-lg transition-all cursor-pointer border-2"
                      style={{ borderColor: category.color || "#ccc" }}
                    >
                      <div className="text-4xl mb-2">{category.icon}</div>
                      <h3 className="font-semibold">{t(category.slug)}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trending Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-3xl font-bold">Tendencias</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {latestArticles?.slice(0, 4).map((article) => (
              <ArticleCard key={article.id} article={article} horizontal />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="font-serif text-4xl font-bold mb-4">Mantente Informado</h2>
            <p className="text-lg mb-8 opacity-90">Recibe las noticias más importantes directamente en tu correo electrónico</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#newsletter">
                <span className="cursor-pointer">Suscribirse al Newsletter</span>
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

