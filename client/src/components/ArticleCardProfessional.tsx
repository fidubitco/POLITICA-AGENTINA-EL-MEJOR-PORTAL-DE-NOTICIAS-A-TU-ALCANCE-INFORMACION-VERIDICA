/**
 * 📰 ARTICLE CARD PROFESIONAL - ESTILO BBC/NYT
 * Diseño limpio, elegante y responsive
 */

import React from 'react';
import { Link } from 'wouter';
import { Clock, Eye, TrendingUp } from 'lucide-react';
import { Article } from '../data/allNews';

interface ArticleCardProfessionalProps {
  article: Article;
  variant?: 'featured' | 'large' | 'medium' | 'small' | 'list';
  showImage?: boolean;
  showExcerpt?: boolean;
  showMeta?: boolean;
}

export const ArticleCardProfessional: React.FC<ArticleCardProfessionalProps> = ({
  article,
  variant = 'medium',
  showImage = true,
  showExcerpt = true,
  showMeta = true,
}) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      politica: 'text-[#0d47a1] bg-[#e3f2fd] hover:bg-[#bbdefb]',
      economia: 'text-[#1b5e20] bg-[#e8f5e9] hover:bg-[#c8e6c9]',
      sociedad: 'text-[#4a148c] bg-[#f3e5f5] hover:bg-[#e1bee7]',
      judicial: 'text-[#b71c1c] bg-[#ffebee] hover:bg-[#ffcdd2]',
      internacional: 'text-[#006064] bg-[#e0f7fa] hover:bg-[#b2ebf2]',
      deportes: 'text-[#bf360c] bg-[#fff3e0] hover:bg-[#ffe0b2]',
      cultura: 'text-[#880e4f] bg-[#fce4ec] hover:bg-[#f8bbd0]',
      tecnologia: 'text-[#1a237e] bg-[#e8eaf6] hover:bg-[#c5cae9]',
      opinion: 'text-[#01579b] bg-[#e1f5fe] hover:bg-[#b3e5fc]',
      elecciones: 'text-[#880e4f] bg-[#fce4ec] hover:bg-[#f8bbd0]',
      provincias: 'text-[#004d40] bg-[#e0f2f1] hover:bg-[#b2dfdb]',
    };
    return colors[category] || 'text-gray-700 bg-gray-50 hover:bg-gray-100';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const renderFeatured = () => (
    <article className="group relative overflow-hidden bg-white border-b border-gray-200 pb-8">
      <Link href={`/${article.category}/${article.slug}`}>
        <div className="grid md:grid-cols-2 gap-6">
          {showImage && article.imageUrl && (
            <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {article.breaking && (
                <span className="absolute top-4 left-4 bg-red-700 text-white text-xs font-bold px-3 py-1 uppercase tracking-wide">
                  Última Hora
                </span>
              )}
            </div>
          )}
          <div className="flex flex-col justify-center">
            <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-3 px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-red-700 transition-colors">
              {article.title}
            </h2>
            {showExcerpt && (
              <p className="text-lg text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
            )}
            {showMeta && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );

  const renderLarge = () => (
    <article className="group relative overflow-hidden bg-white border-b border-gray-200 pb-6">
      <Link href={`/${article.category}/${article.slug}`}>
        {showImage && article.imageUrl && (
          <div className="relative overflow-hidden aspect-[16/9] bg-gray-100 mb-4">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {article.breaking && (
              <span className="absolute top-3 left-3 bg-red-700 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
                Última Hora
              </span>
            )}
          </div>
        )}
        <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-2 px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-red-700 transition-colors">
          {article.title}
        </h3>
        {showExcerpt && (
          <p className="text-base text-gray-600 leading-relaxed mb-3 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        {showMeta && (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        )}
      </Link>
    </article>
  );

  const renderMedium = () => (
    <article className="group relative overflow-hidden bg-white border-b border-gray-200 pb-5">
      <Link href={`/${article.category}/${article.slug}`}>
        {showImage && article.imageUrl && (
          <div className="relative overflow-hidden aspect-[16/9] bg-gray-100 mb-3">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-2 px-1.5 py-0.5 rounded ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <h4 className="font-serif text-lg md:text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-red-700 transition-colors line-clamp-3">
          {article.title}
        </h4>
        {showMeta && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        )}
      </Link>
    </article>
  );

  const renderSmall = () => (
    <article className="group relative overflow-hidden bg-white border-b border-gray-200 pb-4">
      <Link href={`/${article.category}/${article.slug}`}>
        <div className="flex gap-3">
          {showImage && article.imageUrl && (
            <div className="relative overflow-hidden w-24 h-24 flex-shrink-0 bg-gray-100">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <h5 className="font-serif text-base font-bold text-gray-900 leading-snug mb-1 group-hover:text-red-700 transition-colors line-clamp-2">
              {article.title}
            </h5>
            {showMeta && (
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                <Clock className="w-2.5 h-2.5" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );

  const renderList = () => (
    <article className="group relative overflow-hidden bg-white border-b border-gray-200 py-3">
      <Link href={`/${article.category}/${article.slug}`}>
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-red-700 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <h6 className="font-serif text-sm font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
              {article.title}
            </h6>
            <span className="text-[10px] text-gray-500 mt-1 inline-block">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );

  switch (variant) {
    case 'featured':
      return renderFeatured();
    case 'large':
      return renderLarge();
    case 'medium':
      return renderMedium();
    case 'small':
      return renderSmall();
    case 'list':
      return renderList();
    default:
      return renderMedium();
  }
};

export default ArticleCardProfessional;

