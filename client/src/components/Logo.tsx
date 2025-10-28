/**
 * 🎨 LOGO PROFESIONAL - BRANDING ENTERPRISE GRADE
 * Inspirado en BBC.com y New York Times
 */

import React from 'react';
import { Link } from 'wouter';

interface LogoProps {
  variant?: 'default' | 'compact' | 'footer';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  const baseClasses = 'flex flex-col cursor-pointer group transition-all duration-300';
  
  const variants = {
    default: {
      titleClasses: 'font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none transition-colors group-hover:text-red-700',
      subtitleClasses: 'text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase mt-1 font-sans font-medium'
    },
    compact: {
      titleClasses: 'font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-none transition-colors group-hover:text-red-700',
      subtitleClasses: 'text-[9px] md:text-[10px] text-gray-500 tracking-[0.15em] uppercase mt-0.5 font-sans font-medium'
    },
    footer: {
      titleClasses: 'font-serif text-2xl md:text-3xl font-bold text-white tracking-tight leading-none',
      subtitleClasses: 'text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1 font-sans font-medium'
    }
  };

  const { titleClasses, subtitleClasses } = variants[variant];

  return (
    <Link href="/">
      <div className={`${baseClasses} ${className}`}>
        <h1 className={titleClasses}>
          Política Argentina
        </h1>
        <p className={subtitleClasses}>
          Portal de Noticias
        </p>
      </div>
    </Link>
  );
};

export default Logo;

