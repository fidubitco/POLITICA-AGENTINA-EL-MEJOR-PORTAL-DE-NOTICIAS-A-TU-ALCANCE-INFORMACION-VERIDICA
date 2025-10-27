/**
 * 🗂️ SISTEMA DE CATEGORÍAS - ENTERPRISE GRADE
 * Estructura completa de categorías y subcategorías
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories?: Subcategory[];
  seoKeywords: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'politica',
    name: 'Política',
    slug: 'politica',
    description: 'Noticias políticas de Argentina, gobierno, congreso y elecciones',
    icon: 'Building2',
    color: '#3B82F6',
    seoKeywords: ['política argentina', 'gobierno', 'congreso', 'elecciones', 'presidente'],
    subcategories: [
      { id: 'nacional', name: 'Nacional', slug: 'nacional', description: 'Política nacional argentina' },
      { id: 'provincial', name: 'Provincial', slug: 'provincial', description: 'Política provincial' },
      { id: 'municipal', name: 'Municipal', slug: 'municipal', description: 'Política municipal' },
      { id: 'partidos', name: 'Partidos Políticos', slug: 'partidos', description: 'Noticias de partidos políticos' },
      { id: 'elecciones', name: 'Elecciones', slug: 'elecciones', description: 'Cobertura electoral' },
      { id: 'congreso', name: 'Congreso', slug: 'congreso', description: 'Senado y Diputados' },
    ]
  },
  {
    id: 'economia',
    name: 'Economía',
    slug: 'economia',
    description: 'Economía argentina, dólar, inflación, mercados y finanzas',
    icon: 'TrendingUp',
    color: '#10B981',
    seoKeywords: ['economía argentina', 'dólar', 'inflación', 'mercados', 'finanzas'],
    subcategories: [
      { id: 'macroeconomia', name: 'Macroeconomía', slug: 'macroeconomia', description: 'Indicadores macroeconómicos' },
      { id: 'dolar', name: 'Dólar', slug: 'dolar', description: 'Cotización del dólar' },
      { id: 'inflacion', name: 'Inflación', slug: 'inflacion', description: 'Índices de inflación' },
      { id: 'mercados', name: 'Mercados', slug: 'mercados', description: 'Bolsa y mercados financieros' },
      { id: 'empresas', name: 'Empresas', slug: 'empresas', description: 'Noticias empresariales' },
      { id: 'comercio', name: 'Comercio', slug: 'comercio', description: 'Comercio exterior e interior' },
    ]
  },
  {
    id: 'judicial',
    name: 'Judicial',
    slug: 'judicial',
    description: 'Noticias judiciales, causas, sentencias y justicia argentina',
    icon: 'Scale',
    color: '#8B5CF6',
    seoKeywords: ['justicia argentina', 'causas judiciales', 'sentencias', 'corte suprema', 'fiscalía'],
    subcategories: [
      { id: 'corte-suprema', name: 'Corte Suprema', slug: 'corte-suprema', description: 'Fallos de la Corte Suprema' },
      { id: 'causas', name: 'Causas Judiciales', slug: 'causas', description: 'Causas en curso' },
      { id: 'sentencias', name: 'Sentencias', slug: 'sentencias', description: 'Sentencias judiciales' },
      { id: 'fiscalia', name: 'Fiscalía', slug: 'fiscalia', description: 'Noticias de fiscalías' },
      { id: 'derechos-humanos', name: 'Derechos Humanos', slug: 'derechos-humanos', description: 'Causas de DDHH' },
      { id: 'corrupcion', name: 'Corrupción', slug: 'corrupcion', description: 'Casos de corrupción' },
    ]
  },
  {
    id: 'sociedad',
    name: 'Sociedad',
    slug: 'sociedad',
    description: 'Noticias sociales, educación, salud y cultura argentina',
    icon: 'Users',
    color: '#F59E0B',
    seoKeywords: ['sociedad argentina', 'educación', 'salud', 'cultura', 'derechos'],
    subcategories: [
      { id: 'educacion', name: 'Educación', slug: 'educacion', description: 'Sistema educativo' },
      { id: 'salud', name: 'Salud', slug: 'salud', description: 'Salud pública' },
      { id: 'cultura', name: 'Cultura', slug: 'cultura', description: 'Cultura y arte' },
      { id: 'derechos', name: 'Derechos', slug: 'derechos', description: 'Derechos civiles' },
      { id: 'medio-ambiente', name: 'Medio Ambiente', slug: 'medio-ambiente', description: 'Ecología y ambiente' },
      { id: 'seguridad', name: 'Seguridad', slug: 'seguridad', description: 'Seguridad ciudadana' },
    ]
  },
  {
    id: 'internacional',
    name: 'Internacional',
    slug: 'internacional',
    description: 'Noticias internacionales y relaciones exteriores de Argentina',
    icon: 'Globe',
    color: '#EF4444',
    seoKeywords: ['internacional', 'relaciones exteriores', 'diplomacia', 'comercio exterior'],
    subcategories: [
      { id: 'latinoamerica', name: 'Latinoamérica', slug: 'latinoamerica', description: 'Noticias de la región' },
      { id: 'mercosur', name: 'Mercosur', slug: 'mercosur', description: 'Bloque regional' },
      { id: 'usa', name: 'Estados Unidos', slug: 'usa', description: 'Relaciones con EEUU' },
      { id: 'europa', name: 'Europa', slug: 'europa', description: 'Noticias europeas' },
      { id: 'asia', name: 'Asia', slug: 'asia', description: 'Noticias asiáticas' },
      { id: 'organismos', name: 'Organismos Internacionales', slug: 'organismos', description: 'ONU, FMI, etc.' },
    ]
  },
  {
    id: 'opinion',
    name: 'Opinión',
    slug: 'opinion',
    description: 'Columnas de opinión, análisis político y editorial',
    icon: 'MessageSquare',
    color: '#06B6D4',
    seoKeywords: ['opinión política', 'análisis', 'editorial', 'columnistas'],
    subcategories: [
      { id: 'columnistas', name: 'Columnistas', slug: 'columnistas', description: 'Columnas de opinión' },
      { id: 'analisis', name: 'Análisis', slug: 'analisis', description: 'Análisis político' },
      { id: 'editorial', name: 'Editorial', slug: 'editorial', description: 'Línea editorial' },
      { id: 'entrevistas', name: 'Entrevistas', slug: 'entrevistas', description: 'Entrevistas exclusivas' },
    ]
  },
  {
    id: 'elecciones',
    name: 'Elecciones',
    slug: 'elecciones',
    description: 'Cobertura electoral, encuestas y resultados',
    icon: 'Vote',
    color: '#EC4899',
    seoKeywords: ['elecciones argentina', 'encuestas', 'resultados electorales', 'candidatos'],
    subcategories: [
      { id: 'presidenciales', name: 'Presidenciales', slug: 'presidenciales', description: 'Elecciones presidenciales' },
      { id: 'legislativas', name: 'Legislativas', slug: 'legislativas', description: 'Elecciones legislativas' },
      { id: 'provinciales', name: 'Provinciales', slug: 'provinciales', description: 'Elecciones provinciales' },
      { id: 'encuestas', name: 'Encuestas', slug: 'encuestas', description: 'Encuestas electorales' },
      { id: 'resultados', name: 'Resultados', slug: 'resultados', description: 'Resultados en vivo' },
    ]
  },
  {
    id: 'provincias',
    name: 'Provincias',
    slug: 'provincias',
    description: 'Noticias de las provincias argentinas',
    icon: 'Map',
    color: '#14B8A6',
    seoKeywords: ['provincias argentina', 'noticias provinciales', 'gobernadores'],
    subcategories: [
      { id: 'buenos-aires', name: 'Buenos Aires', slug: 'buenos-aires', description: 'Provincia de Buenos Aires' },
      { id: 'caba', name: 'CABA', slug: 'caba', description: 'Ciudad de Buenos Aires' },
      { id: 'cordoba', name: 'Córdoba', slug: 'cordoba', description: 'Provincia de Córdoba' },
      { id: 'santa-fe', name: 'Santa Fe', slug: 'santa-fe', description: 'Provincia de Santa Fe' },
      { id: 'mendoza', name: 'Mendoza', slug: 'mendoza', description: 'Provincia de Mendoza' },
      { id: 'otras', name: 'Otras Provincias', slug: 'otras', description: 'Resto del país' },
    ]
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories?.find(sub => sub.slug === subcategorySlug);
};

export const getAllSubcategories = (): Array<Subcategory & { categorySlug: string }> => {
  return categories.flatMap(cat => 
    (cat.subcategories || []).map(sub => ({
      ...sub,
      categorySlug: cat.slug
    }))
  );
};
