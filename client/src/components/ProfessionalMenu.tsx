/**
 * 📋 MENÚ PROFESIONAL - ORGANIZACIÓN ENTERPRISE GRADE
 * Menú principal con categorías organizadas profesionalmente
 */

import React from 'react';
import { Link } from 'wouter';
import { 
  Building2, 
  TrendingUp, 
  Scale, 
  Users, 
  Globe, 
  MessageSquare,
  Vote,
  Map
} from 'lucide-react';

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
  priority: number; // Para ordenar en el menú
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'politica',
    name: 'Política',
    slug: 'politica',
    icon: <Building2 className="w-4 h-4" />,
    color: '#1565c0',
    priority: 1
  },
  {
    id: 'economia',
    name: 'Economía',
    slug: 'economia',
    icon: <TrendingUp className="w-4 h-4" />,
    color: '#2e7d32',
    priority: 2
  },
  {
    id: 'judicial',
    name: 'Judicial',
    slug: 'judicial',
    icon: <Scale className="w-4 h-4" />,
    color: '#c62828',
    priority: 3
  },
  {
    id: 'sociedad',
    name: 'Sociedad',
    slug: 'sociedad',
    icon: <Users className="w-4 h-4" />,
    color: '#6a1b9a',
    priority: 4
  },
  {
    id: 'internacional',
    name: 'Internacional',
    slug: 'internacional',
    icon: <Globe className="w-4 h-4" />,
    color: '#00838f',
    priority: 5
  },
  {
    id: 'opinion',
    name: 'Opinión',
    slug: 'opinion',
    icon: <MessageSquare className="w-4 h-4" />,
    color: '#0277bd',
    priority: 6
  },
  {
    id: 'elecciones',
    name: 'Elecciones',
    slug: 'elecciones',
    icon: <Vote className="w-4 h-4" />,
    color: '#ad1457',
    priority: 7
  },
  {
    id: 'provincias',
    name: 'Provincias',
    slug: 'provincias',
    icon: <Map className="w-4 h-4" />,
    color: '#00695c',
    priority: 8
  }
];

interface ProfessionalMenuProps {
  currentPath?: string;
  variant?: 'horizontal' | 'vertical';
  maxItems?: number;
}

export const ProfessionalMenu: React.FC<ProfessionalMenuProps> = ({ 
  currentPath = '',
  variant = 'horizontal',
  maxItems = 8
}) => {
  const sortedCategories = menuCategories
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxItems);

  if (variant === 'vertical') {
    return (
      <nav className="flex flex-col gap-1">
        {sortedCategories.map((category) => {
          const isActive = currentPath.includes(`/${category.slug}`);
          return (
            <Link key={category.id} href={`/${category.slug}`}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-50 text-red-700 font-semibold'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span style={{ color: isActive ? category.color : undefined }}>
                  {category.icon}
                </span>
                <span className="text-sm">{category.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-6">
      {sortedCategories.map((category) => {
        const isActive = currentPath.includes(`/${category.slug}`);
        return (
          <Link key={category.id} href={`/${category.slug}`}>
            <div
              className={`flex items-center gap-2 py-3 border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-red-700 text-red-700 font-semibold'
                  : 'border-transparent text-white hover:text-red-400'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default ProfessionalMenu;

