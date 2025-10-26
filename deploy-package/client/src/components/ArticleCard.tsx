import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Eye, Heart, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

interface ArticleCardProps {
  article: any;
  featured?: boolean;
  horizontal?: boolean;
}

export default function ArticleCard({ article, featured = false, horizontal = false }: ArticleCardProps) {
  const { t, i18n } = useTranslation();
  const utils = trpc.useUtils();

  const { data: translation } = trpc.articles.getTranslation.useQuery({
    articleId: article.id,
    languageCode: i18n.language,
  });

  const { data: category } = trpc.categories.getById.useQuery({ id: article.categoryId });
  const { data: categoryTranslation } = trpc.categories.getTranslation.useQuery(
    {
      categoryId: article.categoryId,
      languageCode: i18n.language,
    },
    { enabled: !!category }
  );

  const { data: author } = trpc.users.getById.useQuery({ id: article.authorId });

  const incrementViewsMutation = trpc.articles.incrementViews.useMutation();
  const incrementLikesMutation = trpc.articles.incrementLikes.useMutation({
    onSuccess: () => {
      utils.articles.getById.invalidate({ id: article.id });
    },
  });
  const incrementSharesMutation = trpc.articles.incrementShares.useMutation({
    onSuccess: () => {
      utils.articles.getById.invalidate({ id: article.id });
    },
  });

  const handleArticleClick = () => {
    incrementViewsMutation.mutate({ id: article.id });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    incrementLikesMutation.mutate({ id: article.id });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    incrementSharesMutation.mutate({ id: article.id });
    if (navigator.share) {
      navigator.share({
        title: translation?.title || article.slug,
        text: translation?.excerpt || "",
        url: `/article/${article.slug}`,
      });
    }
  };

  const timeAgo = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: es })
    : "";

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} onClick={handleArticleClick}>
        <Card className="featured-article hover-lift cursor-pointer overflow-hidden border-0 shadow-2xl">
          <div className="relative h-[500px]">
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.featuredImageAlt || translation?.title}
                loading="lazy"
                decoding="async"
                fetchPriority={featured ? "high" : "auto"}
                sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : horizontal ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 100vw"}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white text-6xl font-serif">PA</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {categoryTranslation && (
                <Badge className="mb-3" style={{ backgroundColor: category?.color || undefined }}>
                  {categoryTranslation.name}
                </Badge>
              )}
              {article.isBreaking && (
                <Badge variant="destructive" className="mb-3 ml-2">
                  {t("breaking")}
                </Badge>
              )}
              <h2 className="font-serif text-3xl font-bold mb-2 text-balance">{translation?.title || article.slug}</h2>
              <p className="text-sm line-clamp-2 mb-3 opacity-90">{translation?.excerpt}</p>
              <div className="flex items-center gap-4 text-xs">
                <span>{author?.name}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeAgo}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (horizontal) {
    return (
      <Link href={`/article/${article.slug}`} onClick={handleArticleClick}>
        <Card className="hover-lift cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex gap-4">
              {article.featuredImage ? (
                <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-l-lg">
                  <img
                    src={article.featuredImage}
                    alt={article.featuredImageAlt || translation?.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ) : (
                <div className="w-48 h-32 flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-l-lg">
                  <span className="text-primary text-3xl font-serif">PA</span>
                </div>
              )}
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-2">
                  {categoryTranslation && (
                    <Badge variant="outline" className="text-xs">
                      {categoryTranslation.name}
                    </Badge>
                  )}
                  {article.isBreaking && (
                    <Badge variant="destructive" className="text-xs">
                      {t("breaking")}
                    </Badge>
                  )}
                </div>
                <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {translation?.title || article.slug}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{translation?.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>{author?.name}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeAgo}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleLike}>
                      <Heart className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleShare}>
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} onClick={handleArticleClick}>
      <Card className="hover-lift cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden bg-muted">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt || translation?.title}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 100vw"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-primary text-5xl font-serif">PA</span>
            </div>
          )}
          {article.isBreaking && (
            <Badge variant="destructive" className="absolute top-3 right-3 shadow-lg">
              {t("breaking")}
            </Badge>
          )}
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            {categoryTranslation && (
              <Badge variant="outline" className="text-xs" style={{ borderColor: category?.color || undefined, color: category?.color || undefined }}>
                {categoryTranslation.name}
              </Badge>
            )}
          </div>
          <h3 className="font-serif font-bold text-xl mb-2 line-clamp-2 hover:text-primary transition-colors">
            {translation?.title || article.slug}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{translation?.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{author?.name}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.views}
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleLike}>
                <Heart className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleShare}>
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

