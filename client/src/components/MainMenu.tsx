/**
 * 🎯 MENÚ PRINCIPAL - ENTERPRISE GRADE
 * Sistema de navegación profesional con categorías y subcategorías
 */

import React, { useState } from 'react';
import { Link } from 'wouter';
import { 
  Menu, 
  X, 
  ChevronDown,
  Building2,
  TrendingUp,
  Scale,
  Users,
  Shield,
  Globe,
  Trophy,
  Cpu
} from 'lucide-react';
import { categories } from '../data/categories';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, any> = {
  Building2,
  TrendingUp,
  Scale,
  Users,
  Shield,
  Globe,
  Trophy,
  Cpu
};

export const MainMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();

  const toggleDropdown = (categoryId: string) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  Política Argentina
                </span>
              </a>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              
              return (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(category.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={`/${category.slug}`}>
                    <a
                      className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                      style={{ borderBottom: `2px solid ${activeDropdown === category.id ? category.color : 'transparent'}` }}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{category.name}</span>
                      {category.subcategories && category.subcategories.length > 0 && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </a>
                  </Link>

                  {/* Dropdown */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div
                      className={`absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                        activeDropdown === category.id
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="py-1">
                        {category.subcategories.map((sub) => (
                          <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                              {sub.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              const hasSubcategories = category.subcategories && category.subcategories.length > 0;
              
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between">
                    <Link href={`/${category.slug}`}>
                      <a
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md flex-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                        <span>{category.name}</span>
                      </a>
                    </Link>
                    {hasSubcategories && (
                      <button
                        onClick={() => toggleDropdown(category.id)}
                        className="px-3 py-2 text-gray-700 hover:text-blue-600"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            activeDropdown === category.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Subcategories */}
                  {hasSubcategories && activeDropdown === category.id && (
                    <div className="pl-8 space-y-1">
                      {category.subcategories!.map((sub) => (
                        <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                          <a
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainMenu;

