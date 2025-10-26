// Categorías completas con contenido, contexto y funciones

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  keywords: string[];
  subcategories: Subcategory[];
  featuredTopics: string[];
  relatedCategories: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'politica',
    name: 'Política',
    slug: 'politica',
    description: 'Noticias y análisis sobre política argentina, gobierno, congreso, elecciones y partidos políticos.',
    icon: 'landmark',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-700',
    keywords: ['gobierno', 'congreso', 'senado', 'diputados', 'presidente', 'elecciones', 'partidos', 'legislación'],
    subcategories: [
      {
        id: 'gobierno',
        name: 'Gobierno Nacional',
        slug: 'gobierno',
        description: 'Decisiones y políticas del poder ejecutivo',
        articleCount: 156
      },
      {
        id: 'congreso',
        name: 'Congreso',
        slug: 'congreso',
        description: 'Actividad legislativa en Senado y Diputados',
        articleCount: 89
      },
      {
        id: 'elecciones',
        name: 'Elecciones',
        slug: 'elecciones',
        description: 'Campañas, encuestas y resultados electorales',
        articleCount: 124
      },
      {
        id: 'partidos',
        name: 'Partidos Políticos',
        slug: 'partidos',
        description: 'Noticias sobre los principales partidos',
        articleCount: 67
      },
      {
        id: 'provincias',
        name: 'Política Provincial',
        slug: 'provincias',
        description: 'Política en las provincias argentinas',
        articleCount: 93
      }
    ],
    featuredTopics: [
      'Reforma Económica',
      'Ley Ómnibus',
      'Relaciones Internacionales',
      'Seguridad Nacional',
      'Derechos Humanos'
    ],
    relatedCategories: ['economia', 'sociedad', 'internacional']
  },
  {
    id: 'economia',
    name: 'Economía',
    slug: 'economia',
    description: 'Análisis económico, finanzas, mercados, inflación, dólar y políticas económicas de Argentina.',
    icon: 'trending-up',
    color: '#10b981',
    gradient: 'from-green-500 to-green-700',
    keywords: ['dólar', 'inflación', 'mercado', 'finanzas', 'BCRA', 'FMI', 'deuda', 'inversión'],
    subcategories: [
      {
        id: 'finanzas',
        name: 'Finanzas',
        slug: 'finanzas',
        description: 'Mercados financieros y bolsa',
        articleCount: 234
      },
      {
        id: 'dolar',
        name: 'Dólar',
        slug: 'dolar',
        description: 'Cotizaciones y análisis del dólar',
        articleCount: 187
      },
      {
        id: 'inflacion',
        name: 'Inflación',
        slug: 'inflacion',
        description: 'Índices de precios y análisis',
        articleCount: 145
      },
      {
        id: 'empresas',
        name: 'Empresas',
        slug: 'empresas',
        description: 'Noticias del mundo empresarial',
        articleCount: 112
      },
      {
        id: 'empleo',
        name: 'Empleo',
        slug: 'empleo',
        description: 'Mercado laboral y salarios',
        articleCount: 98
      }
    ],
    featuredTopics: [
      'Dolarización',
      'Acuerdo con FMI',
      'Riesgo País',
      'Inversiones Extranjeras',
      'Reforma Tributaria'
    ],
    relatedCategories: ['politica', 'internacional', 'tecnologia']
  },
  {
    id: 'sociedad',
    name: 'Sociedad',
    slug: 'sociedad',
    description: 'Noticias sociales, educación, salud, seguridad, derechos y movimientos sociales en Argentina.',
    icon: 'users',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-amber-700',
    keywords: ['educación', 'salud', 'seguridad', 'derechos', 'protestas', 'sindicatos', 'justicia'],
    subcategories: [
      {
        id: 'educacion',
        name: 'Educación',
        slug: 'educacion',
        description: 'Sistema educativo y universidades',
        articleCount: 134
      },
      {
        id: 'salud',
        name: 'Salud',
        slug: 'salud',
        description: 'Sistema de salud y medicina',
        articleCount: 156
      },
      {
        id: 'seguridad',
        name: 'Seguridad',
        slug: 'seguridad',
        description: 'Seguridad ciudadana y policiales',
        articleCount: 189
      },
      {
        id: 'derechos',
        name: 'Derechos Humanos',
        slug: 'derechos',
        description: 'Derechos civiles y sociales',
        articleCount: 87
      },
      {
        id: 'medio-ambiente',
        name: 'Medio Ambiente',
        slug: 'medio-ambiente',
        description: 'Ecología y cambio climático',
        articleCount: 76
      }
    ],
    featuredTopics: [
      'Reforma Educativa',
      'Sistema de Salud',
      'Inseguridad',
      'Derechos Laborales',
      'Cambio Climático'
    ],
    relatedCategories: ['politica', 'economia', 'cultura']
  },
  {
    id: 'internacional',
    name: 'Internacional',
    slug: 'internacional',
    description: 'Noticias internacionales, relaciones exteriores, Mercosur, y la posición de Argentina en el mundo.',
    icon: 'globe',
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-purple-700',
    keywords: ['Mercosur', 'BRICS', 'diplomacia', 'comercio exterior', 'ONU', 'relaciones exteriores'],
    subcategories: [
      {
        id: 'latinoamerica',
        name: 'Latinoamérica',
        slug: 'latinoamerica',
        description: 'Noticias de la región',
        articleCount: 167
      },
      {
        id: 'eeuu',
        name: 'Estados Unidos',
        slug: 'eeuu',
        description: 'Relaciones con EEUU',
        articleCount: 123
      },
      {
        id: 'europa',
        name: 'Europa',
        slug: 'europa',
        description: 'Noticias europeas',
        articleCount: 98
      },
      {
        id: 'asia',
        name: 'Asia',
        slug: 'asia',
        description: 'Relaciones con Asia',
        articleCount: 67
      },
      {
        id: 'mercosur',
        name: 'Mercosur',
        slug: 'mercosur',
        description: 'Bloque regional',
        articleCount: 54
      }
    ],
    featuredTopics: [
      'Ingreso a BRICS',
      'Acuerdos Comerciales',
      'Cumbre del Mercosur',
      'Relaciones con China',
      'Política Exterior'
    ],
    relatedCategories: ['politica', 'economia', 'cultura']
  },
  {
    id: 'deportes',
    name: 'Deportes',
    slug: 'deportes',
    description: 'Noticias deportivas, fútbol, selección argentina, Copa América, y otros deportes nacionales.',
    icon: 'trophy',
    color: '#ef4444',
    gradient: 'from-red-500 to-red-700',
    keywords: ['fútbol', 'selección', 'Messi', 'Copa América', 'River', 'Boca', 'AFA', 'deportes'],
    subcategories: [
      {
        id: 'futbol',
        name: 'Fútbol',
        slug: 'futbol',
        description: 'Fútbol argentino e internacional',
        articleCount: 456
      },
      {
        id: 'seleccion',
        name: 'Selección Argentina',
        slug: 'seleccion',
        description: 'La Scaloneta y sus logros',
        articleCount: 234
      },
      {
        id: 'otros-deportes',
        name: 'Otros Deportes',
        slug: 'otros-deportes',
        description: 'Rugby, tenis, básquet y más',
        articleCount: 123
      },
      {
        id: 'olimpicos',
        name: 'Juegos Olímpicos',
        slug: 'olimpicos',
        description: 'Deportes olímpicos',
        articleCount: 67
      }
    ],
    featuredTopics: [
      'Copa América 2024',
      'Eliminatorias Mundial',
      'Superclásico',
      'Messi en Inter Miami',
      'AFA y Política'
    ],
    relatedCategories: ['sociedad', 'cultura', 'internacional']
  },
  {
    id: 'cultura',
    name: 'Cultura',
    slug: 'cultura',
    description: 'Arte, música, cine, literatura, teatro y expresiones culturales de Argentina.',
    icon: 'palette',
    color: '#ec4899',
    gradient: 'from-pink-500 to-pink-700',
    keywords: ['arte', 'música', 'cine', 'literatura', 'teatro', 'cultura', 'entretenimiento'],
    subcategories: [
      {
        id: 'cine',
        name: 'Cine',
        slug: 'cine',
        description: 'Cine argentino e internacional',
        articleCount: 145
      },
      {
        id: 'musica',
        name: 'Música',
        slug: 'musica',
        description: 'Escena musical argentina',
        articleCount: 167
      },
      {
        id: 'literatura',
        name: 'Literatura',
        slug: 'literatura',
        description: 'Libros y autores argentinos',
        articleCount: 98
      },
      {
        id: 'teatro',
        name: 'Teatro',
        slug: 'teatro',
        description: 'Teatro y espectáculos',
        articleCount: 76
      },
      {
        id: 'arte',
        name: 'Arte',
        slug: 'arte',
        description: 'Artes visuales y exposiciones',
        articleCount: 54
      }
    ],
    featuredTopics: [
      'Festival de Cine',
      'Rock Nacional',
      'Literatura Argentina',
      'Teatro Independiente',
      'Arte Contemporáneo'
    ],
    relatedCategories: ['sociedad', 'internacional', 'deportes']
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Innovación tecnológica, startups argentinas, transformación digital y ciencia.',
    icon: 'cpu',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-cyan-700',
    keywords: ['tecnología', 'innovación', 'startups', 'IA', 'ciencia', 'digital', 'internet'],
    subcategories: [
      {
        id: 'startups',
        name: 'Startups',
        slug: 'startups',
        description: 'Emprendimientos tecnológicos',
        articleCount: 123
      },
      {
        id: 'ia',
        name: 'Inteligencia Artificial',
        slug: 'ia',
        description: 'IA y machine learning',
        articleCount: 98
      },
      {
        id: 'ciencia',
        name: 'Ciencia',
        slug: 'ciencia',
        description: 'Investigación científica',
        articleCount: 87
      },
      {
        id: 'internet',
        name: 'Internet',
        slug: 'internet',
        description: 'Conectividad y redes',
        articleCount: 76
      },
      {
        id: 'innovacion',
        name: 'Innovación',
        slug: 'innovacion',
        description: 'Nuevas tecnologías',
        articleCount: 65
      }
    ],
    featuredTopics: [
      'Unicornios Argentinos',
      'IA en Argentina',
      'Transformación Digital',
      'Ciberseguridad',
      'Blockchain'
    ],
    relatedCategories: ['economia', 'educacion', 'internacional']
  },
  {
    id: 'opinion',
    name: 'Opinión',
    slug: 'opinion',
    description: 'Columnas de opinión, análisis político, editoriales y debates sobre la actualidad argentina.',
    icon: 'message-square',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-indigo-700',
    keywords: ['opinión', 'análisis', 'editorial', 'columna', 'debate', 'perspectiva'],
    subcategories: [
      {
        id: 'columnistas',
        name: 'Columnistas',
        slug: 'columnistas',
        description: 'Columnas de opinión',
        articleCount: 234
      },
      {
        id: 'editoriales',
        name: 'Editoriales',
        slug: 'editoriales',
        description: 'Posición editorial',
        articleCount: 156
      },
      {
        id: 'analisis',
        name: 'Análisis',
        slug: 'analisis',
        description: 'Análisis en profundidad',
        articleCount: 189
      },
      {
        id: 'debates',
        name: 'Debates',
        slug: 'debates',
        description: 'Debates y controversias',
        articleCount: 123
      }
    ],
    featuredTopics: [
      'Reforma del Estado',
      'Modelo Económico',
      'Política Exterior',
      'Justicia Social',
      'Democracia'
    ],
    relatedCategories: ['politica', 'economia', 'sociedad']
  }
];

// Función para obtener categoría por slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.slug === slug);
};

// Función para obtener subcategorías de una categoría
export const getSubcategories = (categorySlug: string): Subcategory[] => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories || [];
};

// Función para obtener categorías relacionadas
export const getRelatedCategories = (categorySlug: string): Category[] => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  
  return CATEGORIES.filter(cat => 
    category.relatedCategories.includes(cat.slug)
  );
};

// Función para buscar categorías por keyword
export const searchCategories = (query: string): Category[] => {
  const lowerQuery = query.toLowerCase();
  return CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(lowerQuery) ||
    cat.description.toLowerCase().includes(lowerQuery) ||
    cat.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
};

// Estadísticas de categorías
export const getCategoryStats = () => {
  return CATEGORIES.map(cat => ({
    name: cat.name,
    slug: cat.slug,
    totalArticles: cat.subcategories.reduce((sum, sub) => sum + sub.articleCount, 0),
    subcategoryCount: cat.subcategories.length
  }));
};

