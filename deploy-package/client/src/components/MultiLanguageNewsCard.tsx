// ===========================================
// TARJETA DE NOTICIAS MULTI-IDIOMA
// Componente responsive para mostrar noticias en múltiples idiomas
// ===========================================

import React, { useState, useCallback } from 'react';
import { useTranslation } from '../lib/i18n';
import { SupportedLanguage } from '../lib/i18n';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { 
  Globe, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark, 
  Clock,
  User,
  Calendar,
  Tag,
  ChevronRight,
  Languages,
  Translate
} from 'lucide-react';

interface MultiLanguageNewsCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
    category: string;
    tags: string[];
    views: number;
    likes: number;
    shares: number;
    isBreaking?: boolean;
    isFeatured?: boolean;
    isTrending?: boolean;
    translations?: {
      [key in SupportedLanguage]?: {
        title: string;
        excerpt: string;
        content: string;
      };
    };
  };
  variant?: 'default' | 'compact' | 'featured' | 'trending';
  showTranslations?: boolean;
  onReadMore?: (articleId: string) => void;
  onLike?: (articleId: string) => void;
  onShare?: (articleId: string) => void;
  onBookmark?: (articleId: string) => void;
  className?: string;
}

const MultiLanguageNewsCard: React.FC<MultiLanguageNewsCardProps> = ({
  article,
  variant = 'default',
  showTranslations = true,
  onReadMore,
  onLike,
  onShare,
  onBookmark,
  className = ''
}) => {
  const { t, currentLanguage } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(currentLanguage);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleLanguageChange = useCallback(async (language: SupportedLanguage) => {
    if (article.translations?.[language]) {
      setSelectedLanguage(language);
      return;
    }

    setIsTranslating(true);
    try {
      // Aquí se haría la llamada a la API de traducción
      // const translatedContent = await translateContent(article.content, language);
      // setArticle({ ...article, translations: { ...article.translations, [language]: translatedContent } });
      setSelectedLanguage(language);
    } catch (error) {
      console.error('Error translating content:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [article]);

  const getTranslatedContent = () => {
    if (selectedLanguage === 'es') {
      return {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content
      };
    }

    const translation = article.translations?.[selectedLanguage];
    if (translation) {
      return translation;
    }

    return {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content
    };
  };

  const translatedContent = getTranslatedContent();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'max-w-sm';
      case 'featured':
        return 'max-w-2xl';
      case 'trending':
        return 'max-w-lg';
      default:
        return 'max-w-md';
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case 'compact':
        return 'h-32';
      case 'featured':
        return 'h-64';
      case 'trending':
        return 'h-48';
      default:
        return 'h-48';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className={`multi-language-news-card-compact ${getVariantClasses()} ${className}`}>
        <div className="flex gap-4 p-4">
          <div className="flex-shrink-0">
            <img
              src={article.imageUrl}
              alt={translatedContent.title}
              className={`w-24 h-24 object-cover rounded-lg ${getImageHeight()}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {article.category}
              </Badge>
              {showTranslations && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {selectedLanguage.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
              {translatedContent.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
              {translatedContent.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {article.likes}
                </span>
              </div>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`multi-language-news-card ${getVariantClasses()} ${className}`}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={article.imageUrl}
            alt={translatedContent.title}
            className={`w-full object-cover rounded-t-lg ${getImageHeight()}`}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {article.isBreaking && (
              <Badge variant="destructive" className="text-xs">
                {t('common.breaking')}
              </Badge>
            )}
            {article.isFeatured && (
              <Badge variant="default" className="text-xs">
                {t('common.featured')}
              </Badge>
            )}
            {article.isTrending && (
              <Badge variant="secondary" className="text-xs">
                {t('common.trending')}
              </Badge>
            )}
          </div>
          {showTranslations && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <Globe className="h-3 w-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">
                  {selectedLanguage.toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {article.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 mb-3">
          {translatedContent.title}
        </CardTitle>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {translatedContent.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Tag className="h-2 w-2 mr-1" />
              {tag}
            </Badge>
          ))}
          {article.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{article.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              {article.shares}
            </span>
          </div>
        </div>

        {showTranslations && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {t('common.available_languages')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(article.translations || {}).map(([lang, translation]) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange(lang as SupportedLanguage)}
                  className="text-xs"
                  disabled={isTranslating}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLanguageChange('es')}
                className="text-xs"
                disabled={isTranslating}
              >
                <Translate className="h-3 w-3 mr-1" />
                {t('common.translate')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBookmark?.(article.id)}
            className="flex items-center gap-2"
          >
            <Bookmark className="h-4 w-4" />
            {t('common.bookmark')}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLike?.(article.id)}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              {t('common.like')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare?.(article.id)}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              {t('common.share')}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onReadMore?.(article.id)}
              className="flex items-center gap-2"
            >
              {t('common.read_more')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MultiLanguageNewsCard;
