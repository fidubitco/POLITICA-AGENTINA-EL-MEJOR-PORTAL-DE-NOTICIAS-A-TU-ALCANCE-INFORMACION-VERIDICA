'use client';

import { Category } from '@/data/categories';
import { TrendingUp, Clock, Eye } from 'lucide-react';

interface CategoryHeaderProps {
  category: Category;
  articleCount: number;
}

export function CategoryHeader({ category, articleCount }: CategoryHeaderProps) {
  return (
    <div
      className="relative py-20 px-4 text-white"
      style={{
        background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}40 100%)`,
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative container mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
             style={{ backgroundColor: category.color }}>
          <TrendingUp className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          {category.name}
        </h1>

        <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
          {category.description}
        </p>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Eye className="w-4 h-4" />
            <span>{articleCount} artículos publicados</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="w-4 h-4" />
            <span>Actualizado constantemente</span>
          </div>
        </div>

        {/* Keywords */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {category.seoKeywords.slice(0, 6).map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
