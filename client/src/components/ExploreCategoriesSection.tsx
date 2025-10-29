/**
 * 🗂️ EXPLORA CATEGORÍAS - DISEÑO PROFESIONAL
 * Sección optimizada para engagement con colores profesionales
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
  Map,
  ArrowRight
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  lightColor: string;
  darkColor: string;
  articleCount: number;
}

const categories: Category[] = [
  {
    id: 'politica',
    name: 'Política',
    slug: 'politica',
    description: 'Análisis político, gobierno y congreso nacional',
    icon: <Building2 className="w-6 h-6" />,
    color: '#1565c0',
    lightColor: '#e3f2fd',
    darkColor: '#0d47a1',
    articleCount: 3
  },
  {
    id: 'economia',
    name: 'Economía',
    slug: 'economia',
    description: 'Dólar, inflación, mercados y finanzas',
    icon: <TrendingUp className="w-6 h-6" />,
    color: '#2e7d32',
    lightColor: '#e8f5e9',
    darkColor: '#1b5e20',
    articleCount: 2
  },
  {
    id: 'judicial',
    name: 'Judicial',
    slug: 'judicial',
    description: 'Causas, sentencias y justicia argentina',
    icon: <Scale className="w-6 h-6" />,
    color: '#c62828',
    lightColor: '#ffebee',
    darkColor: '#b71c1c',
    articleCount: 16
  },
  {
    id: 'sociedad',
    name: 'Sociedad',
    slug: 'sociedad',
    description: 'Educación, salud, cultura y derechos',
    icon: <Users className="w-6 h-6" />,
    color: '#6a1b9a',
    lightColor: '#f3e5f5',
    darkColor: '#4a148c',
    articleCount: 1
  },
  {
    id: 'internacional',
    name: 'Internacional',
    slug: 'internacional',
    description: 'Noticias del mundo y relaciones exteriores',
    icon: <Globe className="w-6 h-6" />,
    color: '#00838f',
    lightColor: '#e0f7fa',
    darkColor: '#006064',
    articleCount: 1
  },
  {
    id: 'opinion',
    name: 'Opinión',
    slug: 'opinion',
    description: 'Columnas, análisis y editoriales',
    icon: <MessageSquare className="w-6 h-6" />,
    color: '#0277bd',
    lightColor: '#e1f5fe',
    darkColor: '#01579b',
    articleCount: 0
  },
  {
    id: 'elecciones',
    name: 'Elecciones',
    slug: 'elecciones',
    description: 'Cobertura electoral, encuestas y resultados',
    icon: <Vote className="w-6 h-6" />,
    color: '#ad1457',
    lightColor: '#fce4ec',
    darkColor: '#880e4f',
    articleCount: 0
  },
  {
    id: 'provincias',
    name: 'Provincias',
    slug: 'provincias',
    description: 'Noticias de todo el país',
    icon: <Map className="w-6 h-6" />,
    color: '#00695c',
    lightColor: '#e0f2f1',
    darkColor: '#004d40',
    articleCount: 0
  }
];

export const ExploreCategoriesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explora Todas las Categorías
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente informado con noticias verificadas de todas las áreas que importan
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`}>
              <article 
                className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                style={{
                  borderColor: category.color,
                  backgroundColor: category.lightColor
                }}
              >
                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: category.darkColor }}
                />

                {/* Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: category.color,
                      color: 'white'
                    }}
                  >
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-serif text-2xl font-bold mb-2 transition-colors duration-300"
                    style={{ color: category.darkColor }}
                  >
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: category.color }}
                    >
                      {category.articleCount} {category.articleCount === 1 ? 'artículo' : 'artículos'}
                    </span>
                    <ArrowRight 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: category.color }}
                    />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: category.darkColor }}
                />
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <Link href="/">
            <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Ver Todas las Noticias
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;

