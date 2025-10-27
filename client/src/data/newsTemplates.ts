/**
 * 📰 PLANTILLAS DE NOTICIAS - ENTERPRISE GRADE
 * Sistema de plantillas para generar noticias únicas y optimizadas para SEO
 */

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  subcategory?: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  imageAlt: string;
  tags: string[];
  keywords: string[];
  featured: boolean;
  breaking: boolean;
  views: number;
  readTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    canonicalUrl: string;
  };
}

/**
 * NOTA IMPORTANTE: 
 * Estas son plantillas de ejemplo para demostrar la estructura.
 * El contenido real debe ser creado de forma original por periodistas
 * o mediante APIs legales de noticias con licencia.
 */

export const newsTemplates: NewsArticle[] = [
  // CATEGORÍA: POLÍTICA
  {
    id: 'pol-001',
    title: 'Análisis: Reforma Económica y su Impacto en la Política Argentina',
    slug: 'analisis-reforma-economica-impacto-politica',
    summary: 'Un análisis profundo sobre cómo las reformas económicas están transformando el panorama político nacional.',
    content: `
      <h2>Contexto de la Reforma Económica</h2>
      <p>La reforma económica propuesta ha generado un intenso debate en el Congreso Nacional, con posiciones encontradas entre los diferentes bloques políticos.</p>
      
      <h3>Principales Puntos de la Reforma</h3>
      <ul>
        <li>Ajuste fiscal y reducción del déficit</li>
        <li>Reformas en el sistema tributario</li>
        <li>Modernización del Estado</li>
        <li>Incentivos para la inversión</li>
      </ul>
      
      <h3>Impacto Político</h3>
      <p>Los analistas políticos señalan que esta reforma podría redefinir las alianzas en el Congreso y modificar el mapa electoral de cara a las próximas elecciones.</p>
      
      <h3>Reacciones de los Sectores</h3>
      <p>Diferentes sectores de la sociedad han expresado sus opiniones sobre la reforma, desde el apoyo de cámaras empresariales hasta la preocupación de sindicatos y organizaciones sociales.</p>
      
      <h3>Perspectivas Futuras</h3>
      <p>El debate continuará en las próximas semanas, con audiencias públicas y negociaciones entre los bloques parlamentarios para alcanzar los consensos necesarios.</p>
    `,
    category: 'politica',
    subcategory: 'nacional',
    author: 'Redacción Política Argentina',
    publishedAt: '2025-10-27T10:00:00Z',
    image: '/images/news/politica-congreso.jpg',
    imageAlt: 'Congreso Nacional Argentino',
    tags: ['reforma económica', 'congreso', 'política nacional', 'debate legislativo'],
    keywords: ['reforma', 'economía', 'congreso', 'política', 'argentina'],
    featured: true,
    breaking: false,
    views: 0,
    readTime: 5,
    seo: {
      metaTitle: 'Reforma Económica: Análisis del Impacto Político | Política Argentina',
      metaDescription: 'Análisis completo sobre la reforma económica y su impacto en la política nacional. Debate en el Congreso y perspectivas futuras.',
      focusKeyword: 'reforma económica argentina',
      canonicalUrl: 'https://politicaargentina.com/politica/analisis-reforma-economica-impacto-politica'
    }
  },
  
  // CATEGORÍA: JUDICIAL
  {
    id: 'jud-001',
    title: 'Corte Suprema: Análisis de Sentencia sobre Derechos Constitucionales',
    slug: 'corte-suprema-sentencia-derechos-constitucionales',
    summary: 'La Corte Suprema emitió un fallo histórico que sienta precedente en materia de derechos constitucionales.',
    content: `
      <h2>Fallo Histórico de la Corte Suprema</h2>
      <p>La Corte Suprema de Justicia emitió una sentencia que marca un precedente importante en la interpretación de derechos constitucionales fundamentales.</p>
      
      <h3>Contexto del Caso</h3>
      <p>El caso llegó a la Corte luego de un largo proceso judicial que involucró múltiples instancias y generó amplio debate en la comunidad jurídica.</p>
      
      <h3>Fundamentos del Fallo</h3>
      <p>Los magistrados fundamentaron su decisión en una interpretación amplia de los derechos constitucionales, considerando tratados internacionales y jurisprudencia comparada.</p>
      
      <h3>Impacto Jurídico</h3>
      <p>Este fallo tendrá repercusiones significativas en casos similares y establecerá un nuevo estándar para la interpretación de derechos fundamentales.</p>
      
      <h3>Opiniones de Expertos</h3>
      <p>Constitucionalistas y expertos en derecho han analizado el fallo, destacando su importancia para el sistema judicial argentino.</p>
    `,
    category: 'judicial',
    subcategory: 'corte-suprema',
    author: 'Redacción Judicial',
    publishedAt: '2025-10-27T09:00:00Z',
    image: '/images/news/corte-suprema.jpg',
    imageAlt: 'Corte Suprema de Justicia',
    tags: ['corte suprema', 'sentencia', 'derechos constitucionales', 'justicia'],
    keywords: ['corte', 'suprema', 'sentencia', 'constitucional', 'derechos'],
    featured: true,
    breaking: false,
    views: 0,
    readTime: 6,
    seo: {
      metaTitle: 'Corte Suprema: Sentencia sobre Derechos Constitucionales | Política Argentina',
      metaDescription: 'Análisis del fallo histórico de la Corte Suprema sobre derechos constitucionales. Fundamentos, impacto y opiniones de expertos.',
      focusKeyword: 'corte suprema argentina sentencia',
      canonicalUrl: 'https://politicaargentina.com/judicial/corte-suprema-sentencia-derechos-constitucionales'
    }
  },

  // CATEGORÍA: ECONOMÍA
  {
    id: 'eco-001',
    title: 'Dólar: Análisis de la Cotización y Perspectivas del Mercado',
    slug: 'dolar-analisis-cotizacion-perspectivas-mercado',
    summary: 'Análisis completo sobre la evolución del dólar y las perspectivas económicas para los próximos meses.',
    content: `
      <h2>Situación del Dólar en Argentina</h2>
      <p>El mercado cambiario argentino continúa siendo uno de los indicadores más seguidos por inversores y analistas económicos.</p>
      
      <h3>Cotizaciones Actuales</h3>
      <p>Las diferentes cotizaciones del dólar (oficial, blue, MEP, CCL) muestran la complejidad del mercado cambiario argentino.</p>
      
      <h3>Factores que Influyen</h3>
      <ul>
        <li>Política monetaria del Banco Central</li>
        <li>Reservas internacionales</li>
        <li>Expectativas de inflación</li>
        <li>Contexto internacional</li>
      </ul>
      
      <h3>Perspectivas Económicas</h3>
      <p>Economistas analizan diferentes escenarios para los próximos meses, considerando variables internas y externas.</p>
      
      <h3>Impacto en la Economía Real</h3>
      <p>La evolución del dólar tiene efectos directos en precios, importaciones, exportaciones y el poder adquisitivo de la población.</p>
    `,
    category: 'economia',
    subcategory: 'dolar',
    author: 'Redacción Economía',
    publishedAt: '2025-10-27T08:00:00Z',
    image: '/images/news/dolar-economia.jpg',
    imageAlt: 'Análisis del dólar en Argentina',
    tags: ['dólar', 'economía', 'mercado cambiario', 'BCRA'],
    keywords: ['dólar', 'cotización', 'economía', 'argentina', 'mercado'],
    featured: true,
    breaking: false,
    views: 0,
    readTime: 4,
    seo: {
      metaTitle: 'Dólar Hoy: Cotización y Análisis del Mercado | Política Argentina',
      metaDescription: 'Análisis completo de la cotización del dólar en Argentina. Perspectivas del mercado cambiario y su impacto en la economía.',
      focusKeyword: 'dólar argentina cotización',
      canonicalUrl: 'https://politicaargentina.com/economia/dolar-analisis-cotizacion-perspectivas-mercado'
    }
  }
];

// Función para generar más noticias basadas en plantillas
export const generateNewsFromTemplate = (
  category: string,
  subcategory: string,
  count: number = 50
): NewsArticle[] => {
  const generated: NewsArticle[] = [];
  
  // Esta función debe ser implementada para generar contenido único
  // basado en fuentes legales y con contenido original
  
  return generated;
};

export const getNewsByCategory = (category: string): NewsArticle[] => {
  return newsTemplates.filter(news => news.category === category);
};

export const getNewsBySubcategory = (category: string, subcategory: string): NewsArticle[] => {
  return newsTemplates.filter(
    news => news.category === category && news.subcategory === subcategory
  );
};

export const getFeaturedNews = (): NewsArticle[] => {
  return newsTemplates.filter(news => news.featured);
};

export const getBreakingNews = (): NewsArticle[] => {
  return newsTemplates.filter(news => news.breaking);
};
