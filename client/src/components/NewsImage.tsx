/**
 * 🖼️ NEWS IMAGE COMPONENT
 * Componente simple y robusto para imágenes de noticias con fallback automático
 */

import React, { useState } from 'react';
import { getCategoryPlaceholder } from '../utils/imageUtils';

interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

export const NewsImage: React.FC<NewsImageProps> = ({
  src,
  alt,
  className = '',
  category = 'politica',
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // Intentar con placeholder de categoría
      const placeholder = getCategoryPlaceholder(category);
      setImgSrc(placeholder);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-200">
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default NewsImage;

