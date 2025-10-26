import { useAuth } from "@/_core/hooks/useAuth";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useParams } from "wouter";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery({ slug: slug || "" }, { enabled: !!slug });
  const { data: translation } = trpc.articles.getTranslation.useQuery(
    {
      articleId: article?.id || 0,
      languageCode: i18n.language,
    },
    { enabled: !!article }
  );
  const { data: category } = trpc.categories.getById.useQuery({ id: article?.categoryId || 0 }, { enabled: !!article });
  const { data: categoryTranslation } = trpc.categories.getTranslation.useQuery(
    {
      categoryId: article?.categoryId || 0,
      languageCode: i18n.language,
    },
    { enabled: !!article && !!category }
  );
  const { data: author } = trpc.users.getById.useQuery({ id: article?.authorId || 0 }, { enabled: !!article });
  const { data: comments } = trpc.comments.getByArticle.useQuery({ articleId: article?.id || 0 }, { enabled: !!article });
  const { data: relatedArticles } = trpc.articles.getByCategory.useQuery(
    { categoryId: article?.categoryId || 0, limit: 4 },
    { enabled: !!article }
  );

  const utils = trpc.useUtils();
  const incrementLikesMutation = trpc.articles.incrementLikes.useMutation({
    onSuccess: () => {
      utils.articles.getBySlug.invalidate({ slug: slug || "" });
      toast.success("¡Gracias por tu apoyo!");
    },
  });
  const incrementSharesMutation = trpc.articles.incrementShares.useMutation({
    onSuccess: () => {
      utils.articles.getBySlug.invalidate({ slug: slug || "" });
    },
  });
  const createCommentMutation = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.getByArticle.invalidate({ articleId: article?.id || 0 });
      setCommentText("");
      toast.success(t("commentPending"));
    },
  });

  const handleLike = () => {
    if (article) {
      incrementLikesMutation.mutate({ id: article.id });
    }
  };

  const handleShare = async () => {
    if (article) {
      incrementSharesMutation.mutate({ id: article.id });
      if (navigator.share) {
        await navigator.share({
          title: translation?.title || article.slug,
          text: translation?.excerpt || "",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Enlace copiado al portapapeles");
      }
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!commentText.trim() || !article) return;

    createCommentMutation.mutate({
      articleId: article.id,
      content: commentText,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <Skeleton className="h-96 w-full mb-8 rounded-lg" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article || !translation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">{t("pageNotFound")}</h1>
          <p className="text-muted-foreground mb-8">El artículo que buscas no existe o ha sido eliminado.</p>
          <Button asChild>
            <a href="/">{t("backToHome")}</a>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Article Header */}
        <article className="container py-8 max-w-4xl">
          {/* Category and Breaking Badge */}
          <div className="flex items-center gap-2 mb-4">
            {categoryTranslation && (
              <Badge style={{ backgroundColor: category?.color || undefined }}>{categoryTranslation.name}</Badge>
            )}
            {article.isBreaking && <Badge variant="destructive">{t("breaking")}</Badge>}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">{translation.title}</h1>

          {/* Excerpt */}
          {translation.excerpt && <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{translation.excerpt}</p>}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author?.avatar || undefined} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{author?.name}</p>
                <p className="text-xs">{author?.role}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {article.publishedAt && format(new Date(article.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {translation.content ? `${Math.ceil(translation.content.length / 1000)} min de lectura` : ""}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views} vistas
            </div>
          </div>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img src={article.featuredImage} alt={article.featuredImageAlt || translation.title} className="w-full h-auto" />
              {article.featuredImageAlt && <p className="text-sm text-muted-foreground mt-2 text-center">{article.featuredImageAlt}</p>}
            </div>
          )}

          {/* Article Content */}
          <div className="article-content mb-8" dangerouslySetInnerHTML={{ __html: translation.content }} />

          {/* Social Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="lg" onClick={handleLike} disabled={incrementLikesMutation.isPending}>
                    <Heart className="h-5 w-5 mr-2" />
                    {article.likes} Me gusta
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleShare} disabled={incrementSharesMutation.isPending}>
                    <Share2 className="h-5 w-5 mr-2" />
                    {article.shares} Compartir
                  </Button>
                </div>
                <Button variant="outline" size="lg" asChild>
                  <a href="#comments">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {comments?.length || 0} {t("comments")}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Author Bio */}
          {author && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={author.avatar || undefined} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold mb-2">{author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{author.role}</p>
                    {author.bio && <p className="text-sm">{author.bio}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comments Section */}
          <div id="comments" className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-6">
              {t("comments")} ({comments?.length || 0})
            </h2>

            {/* Comment Form */}
            {isAuthenticated ? (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitComment}>
                    <Textarea
                      placeholder={t("writeComment")}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-4"
                      rows={4}
                    />
                    <Button type="submit" disabled={!commentText.trim() || createCommentMutation.isPending}>
                      {createCommentMutation.isPending ? "Enviando..." : t("submitComment")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6">
                <CardContent className="p-6 text-center">
                  <p className="mb-4">Inicia sesión para dejar un comentario</p>
                  <Button asChild>
                    <a href={getLoginUrl()}>{t("login")}</a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Comments List */}
            {comments && comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Usuario #{comment.userId}</span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(comment.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">{t("noComments")}</p>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="container">
              <h2 className="font-serif text-3xl font-bold mb-6">{t("relatedArticles")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedArticles.filter((a) => a.id !== article.id).map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

