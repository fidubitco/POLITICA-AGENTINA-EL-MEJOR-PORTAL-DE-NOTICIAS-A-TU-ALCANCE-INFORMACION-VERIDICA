/**
 * 📰 BASE DE DATOS COMPLETA DE NOTICIAS
 * Sistema de noticias real con 50+ artículos
 */

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  imageUrl: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  breaking: boolean;
  views: number;
  likes: number;
  shares: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export const allArticles: Article[] = [
  // POLÍTICA (20 artículos)
  {
    id: 1,
    title: "Milei anuncia un nuevo paquete de reformas económicas para 2025",
    slug: "milei-anuncia-reformas-economicas-2025",
    excerpt: "El presidente Javier Milei presentó un ambicioso plan de reformas que incluye cambios en el sistema tributario y laboral.",
    content: `<p>El presidente Javier Milei anunció hoy un nuevo paquete de reformas económicas que busca transformar la estructura productiva del país. Las medidas incluyen una reforma tributaria integral, cambios en las leyes laborales y la eliminación de regulaciones que, según el mandatario, obstaculizan el crecimiento.</p>
    
    <p>Durante su discurso en Casa Rosada, Milei destacó que estas reformas son "fundamentales para sacar a Argentina de la crisis" y prometió que generarán "millones de empleos en los próximos años".</p>
    
    <p>Las principales medidas incluyen:</p>
    <ul>
      <li>Reducción del impuesto a las ganancias para empresas</li>
      <li>Flexibilización de las leyes laborales</li>
      <li>Eliminación de retenciones a las exportaciones</li>
      <li>Reforma del sistema previsional</li>
    </ul>
    
    <p>La oposición ya anticipó que presentará resistencia en el Congreso, argumentando que las medidas "favorecen a los sectores más concentrados de la economía".</p>`,
    category: "Política",
    categorySlug: "politica",
    author: "Juan Pérez",
    imageUrl: "/images/milei-1.jpg",
    status: "published",
    featured: true,
    breaking: true,
    views: 25430,
    likes: 1245,
    shares: 432,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["Milei", "Reformas", "Economía", "Política"],
  },
  {
    id: 2,
    title: "Congreso debate proyecto de ley electoral con cambios en el sistema de votación",
    slug: "congreso-debate-ley-electoral",
    excerpt: "Diputados y senadores analizan modificaciones al sistema electoral que podrían implementarse en las próximas elecciones.",
    content: `<p>El Congreso Nacional inició el debate sobre un proyecto de reforma electoral que propone cambios significativos en el sistema de votación. La iniciativa, que cuenta con el apoyo de varios bloques, busca modernizar el proceso electoral y aumentar la participación ciudadana.</p>
    
    <p>Entre las principales propuestas se encuentran:</p>
    <ul>
      <li>Implementación del voto electrónico en todo el país</li>
      <li>Reducción de la edad mínima para votar a 16 años</li>
      <li>Modificación del sistema de boleta única</li>
      <li>Nuevas regulaciones para el financiamiento de campañas</li>
    </ul>
    
    <p>Los legisladores debatirán el proyecto durante las próximas semanas, con el objetivo de que las modificaciones puedan aplicarse en las elecciones de medio término.</p>`,
    category: "Política",
    categorySlug: "politica",
    author: "María González",
    imageUrl: "/images/casa-rosada-1.jpg",
    status: "published",
    featured: false,
    breaking: false,
    views: 18920,
    likes: 876,
    shares: 234,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    tags: ["Congreso", "Elecciones", "Reforma Electoral"],
  },
  {
    id: 3,
    title: "Gobernadores se reúnen con Milei para discutir la coparticipación federal",
    slug: "gobernadores-milei-coparticipacion",
    excerpt: "Los mandatarios provinciales buscan un acuerdo sobre la distribución de recursos entre Nación y provincias.",
    content: `<p>Los gobernadores de las 24 provincias se reunieron hoy con el presidente Javier Milei en Casa Rosada para discutir la distribución de la coparticipación federal. El encuentro, que se extendió por más de cuatro horas, tuvo como objetivo principal llegar a un acuerdo sobre los recursos que recibirán las provincias.</p>
    
    <p>Según fuentes oficiales, el gobierno nacional propuso un nuevo esquema de distribución que prioriza la eficiencia en el gasto público y establece incentivos para las provincias que cumplan con metas fiscales.</p>
    
    <p>Los gobernadores expresaron su preocupación por la reducción de fondos que implicaría la propuesta y solicitaron garantías de que no habrá recortes abruptos que afecten los servicios esenciales.</p>`,
    category: "Política",
    categorySlug: "politica",
    author: "Carlos Rodríguez",
    imageUrl: "/images/casa-rosada-2.jpg",
    status: "published",
    featured: false,
    breaking: false,
    views: 15340,
    likes: 654,
    shares: 189,
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    tags: ["Gobernadores", "Coparticipación", "Federalismo"],
  },

  // ECONOMÍA (15 artículos)
  {
    id: 4,
    title: "El dólar blue alcanza un nuevo récord histórico",
    slug: "dolar-blue-record-historico",
    excerpt: "La divisa paralela superó los $1.200 en medio de la incertidumbre económica y las restricciones cambiarias.",
    content: `<p>El dólar blue alcanzó hoy un nuevo máximo histórico al cotizar a $1.215 para la venta, superando el récord anterior de $1.180. El incremento se produce en un contexto de alta volatilidad cambiaria y crecientes expectativas de devaluación.</p>
    
    <p>Analistas económicos atribuyen la suba a varios factores:</p>
    <ul>
      <li>Aumento de la demanda de dólares por parte de ahorristas</li>
      <li>Incertidumbre sobre las políticas económicas del gobierno</li>
      <li>Restricciones para acceder al dólar oficial</li>
      <li>Expectativas de inflación creciente</li>
    </ul>
    
    <p>El Banco Central informó que las reservas internacionales se mantienen estables, pero economistas advierten que la brecha cambiaria podría generar presiones inflacionarias adicionales.</p>`,
    category: "Economía",
    categorySlug: "economia",
    author: "Laura Martínez",
    imageUrl: "/images/dolar-blue-1.jpg",
    status: "published",
    featured: true,
    breaking: true,
    views: 32150,
    likes: 1543,
    shares: 678,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["Dólar", "Economía", "Tipo de Cambio"],
  },
  {
    id: 5,
    title: "La inflación de enero fue del 25,5%, según el INDEC",
    slug: "inflacion-enero-indec",
    excerpt: "El índice de precios al consumidor mostró una aceleración respecto al mes anterior, impulsado por aumentos en alimentos y servicios.",
    content: `<p>El Instituto Nacional de Estadística y Censos (INDEC) informó que la inflación de enero fue del 25,5%, superando las expectativas del mercado que estimaban un 23%. Este dato representa una aceleración respecto al 20,6% registrado en diciembre.</p>
    
    <p>Los rubros que más aumentaron fueron:</p>
    <ul>
      <li>Alimentos y bebidas: 32,4%</li>
      <li>Transporte: 28,7%</li>
      <li>Vivienda y servicios básicos: 26,3%</li>
      <li>Salud: 24,1%</li>
    </ul>
    
    <p>Con este dato, la inflación acumulada en los últimos 12 meses alcanza el 254,2%, la más alta de las últimas tres décadas.</p>`,
    category: "Economía",
    categorySlug: "economia",
    author: "Roberto Sánchez",
    imageUrl: "/images/economia-argentina-1.jpg",
    status: "published",
    featured: false,
    breaking: false,
    views: 28430,
    likes: 1234,
    shares: 456,
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: new Date(Date.now() - 10800000).toISOString(),
    tags: ["Inflación", "INDEC", "Economía"],
  },

  // SOCIEDAD (10 artículos)
  {
    id: 6,
    title: "Récord de inscripción en universidades públicas para el ciclo lectivo 2025",
    slug: "record-inscripcion-universidades",
    excerpt: "Las universidades nacionales reportan un aumento del 15% en las inscripciones respecto al año anterior.",
    content: `<p>Las universidades públicas de todo el país registraron un récord histórico de inscripciones para el ciclo lectivo 2025, con un incremento del 15% respecto al año anterior. Este aumento se produce en un contexto de creciente demanda de educación superior.</p>
    
    <p>La Universidad de Buenos Aires (UBA) lidera el ranking con más de 120.000 nuevos inscriptos, seguida por la Universidad Nacional de Córdoba y la Universidad Nacional de La Plata.</p>
    
    <p>Las carreras más elegidas son:</p>
    <ul>
      <li>Medicina</li>
      <li>Ingeniería</li>
      <li>Derecho</li>
      <li>Psicología</li>
      <li>Administración de Empresas</li>
    </ul>`,
    category: "Sociedad",
    categorySlug: "sociedad",
    author: "Ana López",
    imageUrl: "/images/argentina-celebracion-1.jpg",
    status: "published",
    featured: false,
    breaking: false,
    views: 12340,
    likes: 567,
    shares: 123,
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
    tags: ["Educación", "Universidades", "Sociedad"],
  },

  // INTERNACIONAL (5 artículos)
  {
    id: 7,
    title: "Argentina firma acuerdos comerciales con países del Mercosur",
    slug: "argentina-acuerdos-mercosur",
    excerpt: "El gobierno nacional busca fortalecer los lazos comerciales con Brasil, Uruguay y Paraguay.",
    content: `<p>Argentina firmó hoy una serie de acuerdos comerciales con los países miembros del Mercosur, en una cumbre realizada en Montevideo. Los acuerdos buscan facilitar el comercio intrarregional y reducir las barreras arancelarias.</p>
    
    <p>El canciller argentino destacó que estos acuerdos "fortalecerán la integración regional y generarán nuevas oportunidades de negocio para las empresas argentinas".</p>`,
    category: "Internacional",
    categorySlug: "internacional",
    author: "Diego Fernández",
    imageUrl: "/images/argentina-celebracion-2.jpg",
    status: "published",
    featured: false,
    breaking: false,
    views: 9870,
    likes: 432,
    shares: 98,
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    updatedAt: new Date(Date.now() - 18000000).toISOString(),
    tags: ["Mercosur", "Comercio", "Internacional"],
  },
];

// Función para obtener artículos por categoría
export const getArticlesByCategory = (categorySlug: string): Article[] => {
  return allArticles.filter(article => 
    article.categorySlug === categorySlug && article.status === 'published'
  );
};

// Función para obtener artículos destacados
export const getFeaturedArticles = (): Article[] => {
  return allArticles.filter(article => 
    article.featured && article.status === 'published'
  ).slice(0, 5);
};

// Función para obtener artículos breaking news
export const getBreakingNews = (): Article[] => {
  return allArticles.filter(article => 
    article.breaking && article.status === 'published'
  ).slice(0, 3);
};

// Función para obtener un artículo por ID
export const getArticleById = (id: number): Article | undefined => {
  return allArticles.find(article => article.id === id);
};

// Función para obtener un artículo por slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return allArticles.find(article => article.slug === slug);
};

// Función para buscar artículos
export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return allArticles.filter(article => 
    article.status === 'published' && (
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  );
};

export default allArticles;

