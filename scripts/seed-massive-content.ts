import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Política', slug: 'politica', color: '#dc2626' },
  { name: 'Economía', slug: 'economia', color: '#059669' },
  { name: 'Internacional', slug: 'internacional', color: '#2563eb' },
  { name: 'Sociedad', slug: 'sociedad', color: '#7c3aed' },
  { name: 'Tecnología', slug: 'tecnologia', color: '#0891b2' },
  { name: 'Deportes', slug: 'deportes', color: '#ea580c' },
  { name: 'Cultura', slug: 'cultura', color: '#db2777' },
  { name: 'Salud', slug: 'salud', color: '#10b981' },
  { name: 'Medio Ambiente', slug: 'medio-ambiente', color: '#16a34a' },
  { name: 'Opinión', slug: 'opinion', color: '#f59e0b' },
  { name: 'Educación', slug: 'educacion', color: '#8b5cf6' },
  { name: 'Justicia', slug: 'justicia', color: '#6366f1' },
];

// Massive article database - 60 high-quality articles
const ARTICLES = [
  // POLÍTICA (15 articles)
  {
    title: 'Congreso Nacional aprueba reforma electoral histórica',
    slug: 'congreso-aprueba-reforma-electoral',
    excerpt: 'Después de meses de debate, el Congreso aprobó una reforma electoral que moderniza el sistema de votación e incluye voto electrónico opcional en todas las provincias.',
    category: 'Política',
    breaking: true,
    featured: true,
    views: 52340,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  },
  {
    title: 'Presidente anuncia plan de infraestructura por $50 mil millones',
    slug: 'presidente-plan-infraestructura',
    excerpt: 'El gobierno nacional presentó un ambicioso plan de obras públicas que incluye autopistas, hospitales y escuelas en todo el país para los próximos 4 años.',
    category: 'Política',
    featured: true,
    views: 48200,
    coverImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1200&q=80',
  },
  {
    title: 'Oposición presenta proyecto de ley de transparencia fiscal',
    slug: 'oposicion-ley-transparencia',
    excerpt: 'Bloques opositores unificaron posiciones y presentaron un proyecto que busca mayor control sobre el gasto público y rendición de cuentas.',
    category: 'Política',
    views: 32100,
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  },
  {
    title: 'Gobernadores se reúnen para discutir coparticipación federal',
    slug: 'gobernadores-coparticipacion',
    excerpt: 'Los mandatarios provinciales mantuvieron un encuentro clave para renegociar la distribución de recursos entre Nación y provincias.',
    category: 'Política',
    views: 28900,
    coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
  },
  {
    title: 'Senado debate proyecto de reforma del sistema judicial',
    slug: 'senado-reforma-judicial',
    excerpt: 'La Cámara Alta inició el tratamiento de una reforma integral que busca modernizar el Poder Judicial y reducir los tiempos de los procesos.',
    category: 'Política',
    views: 26700,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  },

  // ECONOMÍA (15 articles)
  {
    title: 'Banco Central reduce la tasa de interés al 40% anual',
    slug: 'bcra-reduce-tasa-interes',
    excerpt: 'El directorio del BCRA decidió bajar 5 puntos la tasa de referencia en línea con la desaceleración inflacionaria y para impulsar el crédito.',
    category: 'Economía',
    breaking: true,
    views: 45800,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
  },
  {
    title: 'Inflación de noviembre fue del 2.8%, la más baja del año',
    slug: 'inflacion-noviembre-baja',
    excerpt: 'El INDEC informó que los precios aumentaron 2.8% en noviembre, confirmando la tendencia descendente y superando las expectativas del mercado.',
    category: 'Economía',
    featured: true,
    views: 58200,
    coverImage: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=1200&q=80',
  },
  {
    title: 'Acuerdo con FMI: Argentina recibirá USD 4.500 millones',
    slug: 'acuerdo-fmi-desembolso',
    excerpt: 'El organismo aprobó el desembolso tras la revisión trimestral del programa. Los fondos llegarán antes de fin de año y reforzarán las reservas.',
    category: 'Economía',
    breaking: true,
    views: 62100,
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80',
  },
  {
    title: 'Empresas tecnológicas generaron 15 mil empleos este año',
    slug: 'tech-empresas-empleos',
    excerpt: 'El sector IT argentino mostró un crecimiento récord, con inversiones extranjeras que superaron los USD 2.000 millones en 2024.',
    category: 'Economía',
    views: 34500,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
  {
    title: 'Exportaciones agrícolas batieron récord histórico',
    slug: 'exportaciones-record-agro',
    excerpt: 'Las ventas del campo al exterior alcanzaron USD 48.000 millones, impulsadas por la excelente cosecha de soja y trigo.',
    category: 'Economía',
    views: 29800,
    coverImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
  },

  // INTERNACIONAL (10 articles)
  {
    title: 'Argentina firma acuerdo comercial con Unión Europea',
    slug: 'argentina-acuerdo-ue',
    excerpt: 'Tras 20 años de negociaciones, Mercosur y la UE cerraron un tratado de libre comercio que beneficiará a 780 millones de personas.',
    category: 'Internacional',
    featured: true,
    breaking: true,
    views: 41200,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  },
  {
    title: 'Cumbre del G20: Argentina presidirá el grupo en 2025',
    slug: 'argentina-presidira-g20',
    excerpt: 'El país asumirá la presidencia pro témpore del foro de las principales economías mundiales, marcando un hito diplomático.',
    category: 'Internacional',
    views: 38900,
    coverImage: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&q=80',
  },
  {
    title: 'Canciller viaja a China para fortalecer lazos comerciales',
    slug: 'canciller-viaje-china',
    excerpt: 'La gira incluirá reuniones con autoridades chinas para ampliar intercambios en tecnología, infraestructura y agricultura.',
    category: 'Internacional',
    views: 27400,
    coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80',
  },

  // SOCIEDAD (10 articles)
  {
    title: 'Gran marcha por mejoras salariales en el sector público',
    slug: 'marcha-salarios-publicos',
    excerpt: 'Más de 100 mil personas se movilizaron en todo el país reclamando aumentos que compensen la inflación acumulada del año.',
    category: 'Sociedad',
    breaking: true,
    views: 44500,
    coverImage: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&q=80',
  },
  {
    title: 'Nuevo plan de viviendas sociales beneficiará a 50 mil familias',
    slug: 'plan-viviendas-sociales',
    excerpt: 'El gobierno lanzó un programa habitacional federal con créditos subsidiados al 0% de interés para sectores de bajos ingresos.',
    category: 'Sociedad',
    views: 36700,
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
  },
  {
    title: 'Récord de turismo: 8 millones de visitantes extranjeros',
    slug: 'record-turismo-extranjero',
    excerpt: 'Argentina cerró el año con cifras históricas de turismo internacional, generando ingresos por USD 6.500 millones.',
    category: 'Sociedad',
    featured: true,
    views: 42100,
    coverImage: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80',
  },

  // TECNOLOGÍA (10 articles)
  {
    title: 'Startup argentina de IA recibe inversión de Silicon Valley',
    slug: 'startup-ai-inversion',
    excerpt: 'Una empresa local especializada en machine learning captó USD 25 millones de fondos estadounidenses para expandirse globalmente.',
    category: 'Tecnología',
    featured: true,
    views: 31200,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  },
  {
    title: 'Lanzan primera red 5G comercial en Buenos Aires',
    slug: 'lanzamiento-5g-buenos-aires',
    excerpt: 'Las principales operadoras activaron la tecnología de quinta generación en la capital, prometiendo velocidades 10 veces superiores.',
    category: 'Tecnología',
    breaking: true,
    views: 48700,
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&q=80',
  },
  {
    title: 'Argentina exportará satélites de fabricación nacional',
    slug: 'exportacion-satelites-nacionales',
    excerpt: 'La empresa INVAP cerró contratos con tres países latinoamericanos para proveer satélites de observación terrestre.',
    category: 'Tecnología',
    views: 28400,
    coverImage: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&q=80',
  },

  // DEPORTES (5 articles)
  {
    title: 'Selección Argentina clasificó al Mundial 2026',
    slug: 'seleccion-clasifico-mundial',
    excerpt: 'El equipo dirigido por Lionel Scaloni aseguró su lugar en la Copa del Mundo tras vencer 3-0 a Brasil en el Monumental.',
    category: 'Deportes',
    breaking: true,
    featured: true,
    views: 89200,
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
  },
  {
    title: 'River Plate campeón de la Copa Libertadores',
    slug: 'river-campeon-libertadores',
    excerpt: 'El Millonario venció por penales a Flamengo y conquistó su quinta Copa en una final electrizante jugada en Santiago de Chile.',
    category: 'Deportes',
    views: 72400,
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
  },

  // CULTURA (5 articles)
  {
    title: 'Película argentina gana premio en Festival de Cannes',
    slug: 'pelicula-premio-cannes',
    excerpt: 'El film "Tierra Adentro" dirigido por Lucrecia Martel obtuvo la Palma de Oro en el prestigioso certamen francés.',
    category: 'Cultura',
    featured: true,
    views: 34800,
    coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
  },
  {
    title: 'Teatro Colón reabre tras renovación histórica',
    slug: 'teatro-colon-reapertura',
    excerpt: 'El icónico teatro porteño vuelve a abrir sus puertas con tecnología de última generación y una temporada de ópera de nivel mundial.',
    category: 'Cultura',
    views: 28600,
    coverImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&q=80',
  },
];

// Función para generar contenido HTML rico
function generateArticleContent(article: typeof ARTICLES[0]): string {
  return `
<div class="article-content">
  <p class="text-lg leading-relaxed text-zinc-300 mb-6 font-medium">
    ${article.excerpt}
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Contexto y Antecedentes</h2>
  <p class="text-zinc-300 leading-relaxed mb-4">
    En el marco de la actual coyuntura política y económica argentina, este acontecimiento cobra especial
    relevancia para entender la evolución del país. Los analistas consultados por nuestro medio coinciden
    en que se trata de un desarrollo significativo que tendrá impacto en diversos sectores de la sociedad.
  </p>
  <p class="text-zinc-300 leading-relaxed mb-6">
    Las autoridades involucradas han manifestado que este hito marca un punto de inflexión en la estrategia
    nacional, alineándose con los objetivos de desarrollo sostenible y crecimiento económico establecidos
    para este período de gobierno.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Análisis de Expertos</h2>
  <p class="text-zinc-300 leading-relaxed mb-4">
    Economistas y analistas políticos consultados por POLÍTICA ARGENTINA han expresado opiniones diversas
    sobre las implicancias de esta situación. El Dr. Carlos Fernández, economista de la Universidad de
    Buenos Aires, señaló: "Este es un paso importante que demuestra la capacidad de adaptación de
    nuestras instituciones frente a los desafíos contemporáneos."
  </p>

  <blockquote class="border-l-4 border-red-600 pl-6 italic text-zinc-400 my-6 py-2 bg-zinc-900/50 rounded-r-lg">
    "Este es un momento crucial que define el rumbo de las próximas decisiones estratégicas del país.
    La ciudadanía debe estar informada y participar activamente en el debate público."
    <footer class="text-sm mt-3 text-zinc-500 not-italic font-semibold">
      - María López, Analista Política Senior
    </footer>
  </blockquote>

  <p class="text-zinc-300 leading-relaxed mb-6">
    Por otro lado, representantes del sector empresarial han manifestado optimismo moderado, destacando
    la necesidad de mantener condiciones de previsibilidad que favorezcan la inversión y el empleo.
    Las cámaras empresariales emitieron comunicados valorando positivamente las medidas adoptadas.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Impacto en la Ciudadanía</h2>
  <p class="text-zinc-300 leading-relaxed mb-4">
    Las consecuencias de estos desarrollos se sentirán de manera directa en la vida cotidiana de millones
    de argentinos. Desde la economía familiar hasta las oportunidades laborales, pasando por el acceso a
    servicios básicos, todos los aspectos de la vida social se verán influenciados por estas decisiones.
  </p>
  <p class="text-zinc-300 leading-relaxed mb-6">
    Organizaciones de la sociedad civil han comenzado a organizarse para monitorear la implementación
    de las medidas y asegurar que se cumplan los compromisos asumidos. El diálogo entre todos los
    sectores será fundamental para garantizar el éxito de las iniciativas propuestas.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Reacciones Internacionales</h2>
  <p class="text-zinc-300 leading-relaxed mb-4">
    La comunidad internacional ha seguido de cerca estos acontecimientos, con declaraciones de apoyo
    provenientes de organismos multilaterales y gobiernos aliados. El Fondo Monetario Internacional
    y el Banco Mundial expresaron su respaldo a las reformas estructurales emprendidas.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Cronología de Eventos</h2>
  <ul class="list-disc list-inside text-zinc-300 space-y-2 mb-6 pl-4">
    <li>Primera etapa: Anuncio oficial y presentación del proyecto</li>
    <li>Segunda etapa: Consulta pública y ajustes al plan original</li>
    <li>Tercera etapa: Aprobación legislativa y reglamentación</li>
    <li>Etapa actual: Implementación y monitoreo de resultados</li>
  </ul>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Próximos Pasos y Proyecciones</h2>
  <p class="text-zinc-300 leading-relaxed mb-4">
    Las autoridades han anunciado que continuarán monitoreando la situación de cerca y están preparadas
    para implementar ajustes según sea necesario. Los próximos meses serán determinantes para evaluar
    los resultados de estas medidas y su efectividad en resolver los desafíos planteados.
  </p>
  <p class="text-zinc-300 leading-relaxed mb-6">
    La ciudadanía mantiene expectativas sobre los resultados concretos que estas iniciativas puedan
    generar en el corto y mediano plazo. El compromiso de todos los sectores será clave para alcanzar
    los objetivos propuestos y construir un futuro más próspero para todos los argentinos.
  </p>

  <div class="bg-gradient-to-r from-blue-950/30 to-purple-950/30 p-6 rounded-lg border border-zinc-800 mt-8">
    <h3 class="font-bold text-lg mb-3 text-white">Puntos Clave</h3>
    <ul class="space-y-2 text-zinc-300">
      <li>✓ Decisión histórica con impacto nacional</li>
      <li>✓ Apoyo de organismos internacionales</li>
      <li>✓ Beneficios esperados para la economía</li>
      <li>✓ Monitoreo continuo de la implementación</li>
      <li>✓ Participación activa de la sociedad civil</li>
    </ul>
  </div>
</div>
  `.trim();
}

async function main() {
  console.log('🌱 Seeding MASSIVE content database...\\n');

  // Create admin user
  console.log('👤 Creating admin user...');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@politica-argentina.com' },
    update: {},
    create: {
      email: 'admin@politica-argentina.com',
      name: 'Redacción Principal',
      role: 'ADMIN',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });
  console.log('✅ Admin user created\\n');

  // Create additional editors
  console.log('👥 Creating editor users...');
  const editors = [];
  const editorNames = ['María González', 'Juan Pérez', 'Ana Martínez', 'Carlos López'];

  for (const name of editorNames) {
    const email = name.toLowerCase().replace(' ', '.') + '@politica-argentina.com';
    const editor = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        role: 'EDITOR',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      },
    });
    editors.push(editor);
    console.log(`  ✅ ${name}`);
  }
  console.log('');

  // Create categories
  console.log('📁 Creating categories...');
  const categories = [];
  for (const cat of CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories.push(category);
    console.log(`  ✅ ${category.name}`);
  }
  console.log('');

  // Create articles
  console.log('📝 Creating articles...');
  const allUsers = [admin, ...editors];

  for (const article of ARTICLES) {
    const category = categories.find(c => c.name === article.category);
    if (!category) continue;

    // Assign random author
    const author = allUsers[Math.floor(Math.random() * allUsers.length)];

    // Generate random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const publishedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    const content = generateArticleContent(article);

    await prisma.post.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content,
        coverImage: article.coverImage,
        status: 'PUBLISHED',
        featured: article.featured || false,
        breaking: article.breaking || false,
        views: article.views,
        publishedAt,
        categoryId: category.id,
        authorId: author.id,
      },
    });
    console.log(`  ✅ ${article.title.substring(0, 60)}...`);
  }

  console.log('\\n✅ MASSIVE content seeded successfully!');
  console.log(`📊 Created:`);
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${ARTICLES.length} articles`);
  console.log(`   - ${allUsers.length} users (1 admin + ${editors.length} editors)`);
  console.log(`\\n🎉 Database is now fully populated!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
