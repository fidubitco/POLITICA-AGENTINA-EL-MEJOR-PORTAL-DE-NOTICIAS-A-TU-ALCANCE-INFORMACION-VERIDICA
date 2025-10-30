'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCategoryPlaceholder } from '@/utils/imageUtils';

interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function NewsImage({
  src,
  alt,
  className = '',
  category = 'politica',
  width,
  height,
  priority = false,
}: NewsImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      const placeholder = getCategoryPlaceholder(category);
      setImgSrc(placeholder);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Si es una URL externa de Unsplash, optimizarla
  const optimizedSrc = imgSrc.includes('unsplash.com')
    ? `${imgSrc}?w=${width || 800}&h=${height || 450}&fit=crop&q=80&auto=format`
    : imgSrc;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gray-200 ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs">Imagen no disponible</p>
          </div>
        </div>
      )}
    </div>
  );
}

