import { Link } from 'wouter';
import { Clock, TrendingUp } from 'lucide-react';

interface BBCNewsCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  publishedAt: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  variant?: 'default' | 'horizontal' | 'compact';
}

export const BBCNewsCard = ({
  id,
  title,
  excerpt,
  category,
  imageUrl,
  publishedAt,
  isBreaking = false,
  isFeatured = false,
  variant = 'default',
}: BBCNewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Ayer';
    
    return date.toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      politica: 'bg-[#bb1919]',
      economia: 'bg-[#0a7373]',
      sociedad: 'bg-[#8e44ad]',
      internacional: 'bg-[#2980b9]',
      deportes: 'bg-[#27ae60]',
      cultura: 'bg-[#e67e22]',
    };
    return colors[cat.toLowerCase()] || 'bg-[#bb1919]';
  };

  // Featured Card (Grande con imagen arriba)
  if (isFeatured) {
    return (
      <Link href={`/noticia/${id}`}>
        <a className="bbc-news-featured hover-lift block">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title}
              className="bbc-news-featured-image"
            />
          )}
          <div className="bbc-news-featured-content">
            {isBreaking && (
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-[#bb1919]" />
                <span className="text-[#bb1919] font-bold text-sm uppercase">Última Hora</span>
              </div>
            )}
            <span className={`bbc-news-category ${getCategoryColor(category)}`}>
              {category}
            </span>
            <h2 className="bbc-headline bbc-headline-large mb-3">
              {title}
            </h2>
            <p className="bbc-body text-truncate-3 mb-3">
              {excerpt}
            </p>
            <div className="bbc-news-meta">
              <div className="bbc-news-time">
                <Clock size={14} />
                <span>{formatDate(publishedAt)}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  // Horizontal Card (Imagen a la izquierda)
  if (variant === 'horizontal') {
    return (
      <Link href={`/noticia/${id}`}>
        <a className="bbc-news-card block">
          <div className="bbc-news-card-horizontal">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={title}
                className="bbc-news-card-image"
              />
            )}
            <div>
              <span className={`inline-block px-2 py-1 text-xs font-bold text-white mb-2 ${getCategoryColor(category)}`}>
                {category}
              </span>
              <h3 className="bbc-headline bbc-headline-small mb-2 text-truncate-2">
                {title}
              </h3>
              <div className="bbc-news-meta">
                <Clock size={12} />
                <span className="text-xs">{formatDate(publishedAt)}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  // Compact Card (Sin imagen, solo texto)
  if (variant === 'compact') {
    return (
      <Link href={`/noticia/${id}`}>
        <a className="bbc-news-card block">
          <span className={`inline-block px-2 py-1 text-xs font-bold text-white mb-2 ${getCategoryColor(category)}`}>
            {category}
          </span>
          <h3 className="bbc-headline bbc-headline-small mb-2 text-truncate-2">
            {title}
          </h3>
          <div className="bbc-news-meta">
            <Clock size={12} />
            <span className="text-xs">{formatDate(publishedAt)}</span>
          </div>
        </a>
      </Link>
    );
  }

  // Default Card (Imagen arriba, texto abajo)
  return (
    <Link href={`/noticia/${id}`}>
      <a className="bbc-news-card hover-lift block bg-white">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full aspect-video object-cover"
          />
        )}
        <div className="p-4">
          <span className={`bbc-news-category ${getCategoryColor(category)}`}>
            {category}
          </span>
          <h3 className="bbc-headline bbc-headline-medium mb-2 text-truncate-2">
            {title}
          </h3>
          <p className="bbc-body text-sm text-truncate-2 mb-3">
            {excerpt}
          </p>
          <div className="bbc-news-meta">
            <Clock size={14} />
            <span>{formatDate(publishedAt)}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};
