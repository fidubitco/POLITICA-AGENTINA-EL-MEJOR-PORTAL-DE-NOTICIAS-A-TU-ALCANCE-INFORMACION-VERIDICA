/**
 * 📂 CATEGORÍAS COMPLETAS - 12 Categorías Principales
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  subcategories: string[];
  keywords: string[];
  priority: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Política',
    slug: 'politica',
    description: 'Últimas noticias sobre política argentina, gobierno, congreso, elecciones y partidos políticos',
    color: '#3B82F6',
    icon: '🏛️',
    subcategories: ['Gobierno', 'Congreso', 'Partidos Políticos', 'Elecciones', 'Provincias'],
    keywords: ['política argentina', 'gobierno', 'congreso', 'elecciones', 'milei', 'casa rosada', 'senado', 'diputados'],
    priority: 1,
  },
  {
    id: '2',
    name: 'Economía',
    slug: 'economia',
    description: 'Análisis económico, mercados, dólar, inflación, empresas y finanzas personales',
    color: '#10B981',
    icon: '💰',
    subcategories: ['Mercados', 'Dólar', 'Inflación', 'Empresas', 'Finanzas Personales'],
    keywords: ['economía argentina', 'dólar', 'inflación', 'mercados', 'bolsa', 'finanzas', 'inversiones'],
    priority: 2,
  },
  {
    id: '3',
    name: 'Internacional',
    slug: 'internacional',
    description: 'Noticias internacionales de América Latina, Estados Unidos, Europa, Asia y Medio Oriente',
    color: '#EF4444',
    icon: '🌎',
    subcategories: ['América Latina', 'Estados Unidos', 'Europa', 'Asia', 'Medio Oriente'],
    keywords: ['noticias internacionales', 'mundo', 'américa latina', 'eeuu', 'europa', 'asia'],
    priority: 3,
  },
  {
    id: '4',
    name: 'Sociedad',
    slug: 'sociedad',
    description: 'Noticias de sociedad, educación, salud, seguridad, medio ambiente y derechos humanos',
    color: '#F59E0B',
    icon: '👥',
    subcategories: ['Educación', 'Salud', 'Seguridad', 'Medio Ambiente', 'Derechos Humanos'],
    keywords: ['sociedad argentina', 'educación', 'salud', 'seguridad', 'medio ambiente', 'derechos'],
    priority: 4,
  },
  {
    id: '5',
    name: 'Deportes',
    slug: 'deportes',
    description: 'Fútbol, básquet, tenis, rugby, olimpiadas y todas las disciplinas deportivas',
    color: '#8B5CF6',
    icon: '⚽',
    subcategories: ['Fútbol', 'Básquet', 'Tenis', 'Rugby', 'Olimpiadas'],
    keywords: ['deportes argentina', 'fútbol', 'messi', 'selección', 'boca', 'river', 'tenis', 'básquet'],
    priority: 5,
  },
  {
    id: '6',
    name: 'Cultura',
    slug: 'cultura',
    description: 'Cine, música, teatro, literatura, arte y todas las expresiones culturales',
    color: '#EC4899',
    icon: '🎭',
    subcategories: ['Cine', 'Música', 'Teatro', 'Literatura', 'Arte'],
    keywords: ['cultura argentina', 'cine', 'música', 'teatro', 'literatura', 'arte', 'espectáculos'],
    priority: 6,
  },
  {
    id: '7',
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Startups, innovación, ciencia, gadgets, inteligencia artificial y tecnología',
    color: '#06B6D4',
    icon: '💻',
    subcategories: ['Startups', 'Innovación', 'Ciencia', 'Gadgets', 'IA'],
    keywords: ['tecnología', 'startups', 'innovación', 'ciencia', 'ia', 'inteligencia artificial', 'gadgets'],
    priority: 7,
  },
  {
    id: '8',
    name: 'Negocios',
    slug: 'negocios',
    description: 'Empresas, emprendedores, inversiones, startups y mercado laboral',
    color: '#14B8A6',
    icon: '🏢',
    subcategories: ['Empresas', 'Emprendedores', 'Inversiones', 'Startups', 'Mercado Laboral'],
    keywords: ['negocios', 'empresas', 'emprendedores', 'inversiones', 'startups', 'trabajo'],
    priority: 8,
  },
  {
    id: '9',
    name: 'Espectáculos',
    slug: 'espectaculos',
    description: 'TV, streaming, celebridades, eventos, premios y entretenimiento',
    color: '#F97316',
    icon: '🎬',
    subcategories: ['TV', 'Streaming', 'Celebridades', 'Eventos', 'Premios'],
    keywords: ['espectáculos', 'tv', 'streaming', 'celebridades', 'famosos', 'entretenimiento'],
    priority: 9,
  },
  {
    id: '10',
    name: 'Salud',
    slug: 'salud',
    description: 'Medicina, bienestar, nutrición, fitness y salud mental',
    color: '#84CC16',
    icon: '🏥',
    subcategories: ['Medicina', 'Bienestar', 'Nutrición', 'Fitness', 'Salud Mental'],
    keywords: ['salud', 'medicina', 'bienestar', 'nutrición', 'fitness', 'salud mental'],
    priority: 10,
  },
  {
    id: '11',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Gastronomía, viajes, moda, decoración y tendencias',
    color: '#A855F7',
    icon: '🏠',
    subcategories: ['Gastronomía', 'Viajes', 'Moda', 'Decoración', 'Tendencias'],
    keywords: ['lifestyle', 'gastronomía', 'viajes', 'moda', 'decoración', 'tendencias'],
    priority: 11,
  },
  {
    id: '12',
    name: 'Ciencia',
    slug: 'ciencia',
    description: 'Investigación, descubrimientos, espacio, tecnología y medio ambiente',
    color: '#6366F1',
    icon: '🔬',
    subcategories: ['Investigación', 'Descubrimientos', 'Espacio', 'Tecnología', 'Medio Ambiente'],
    keywords: ['ciencia', 'investigación', 'descubrimientos', 'espacio', 'astronomía', 'medio ambiente'],
    priority: 12,
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getAllCategories = (): Category[] => {
  return categories.sort((a, b) => a.priority - b.priority);
};

export const getMainCategories = (): Category[] => {
  return categories.filter(cat => cat.priority <= 6);
};

export const getSecondaryCategories = (): Category[] => {
  return categories.filter(cat => cat.priority > 6);
};
