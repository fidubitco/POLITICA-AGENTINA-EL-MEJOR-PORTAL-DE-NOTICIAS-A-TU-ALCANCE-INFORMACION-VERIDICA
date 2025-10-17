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
];

const ARTICLES = [
  {
    title: 'Gobierno anuncia medidas económicas para combatir la inflación',
    slug: 'gobierno-medidas-economicas-inflacion',
    excerpt: 'El Ministerio de Economía presentó un paquete de medidas destinadas a frenar el aumento de precios y estabilizar la economía. Las medidas incluyen controles de precios y acuerdos con sectores clave.',
    category: 'Política',
    breaking: true,
    featured: true,
    views: 45230,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
  },
  {
    title: 'Dólar blue alcanza nuevo récord histórico en medio de tensión cambiaria',
    slug: 'dolar-blue-record-historico',
    excerpt: 'La cotización del dólar paralelo superó la barrera de los $1.500 en medio de una fuerte demanda y escasez en el mercado informal. Expertos analizan las causas y posibles consecuencias.',
    category: 'Economía',
    breaking: true,
    views: 38920,
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80',
  },
  {
    title: 'Congreso debate proyecto de reforma laboral con fuerte polémica',
    slug: 'congreso-debate-reforma-laboral',
    excerpt: 'Diputados y senadores enfrentan posturas encontradas sobre las modificaciones propuestas a la ley de contratos de trabajo. Sindicatos y empresarios expresan sus opiniones.',
    category: 'Política',
    views: 28450,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  },
  {
    title: 'Argentina firma acuerdos comerciales estratégicos con países del Mercosur',
    slug: 'argentina-acuerdos-mercosur',
    excerpt: 'El canciller anunció la firma de convenios bilaterales que facilitarán el intercambio comercial y fortalecerán las relaciones diplomáticas en la región sudamericana.',
    category: 'Internacional',
    views: 22180,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  },
  {
    title: 'Merval registra la mayor suba del año impulsado por acciones bancarias',
    slug: 'merval-mayor-suba-ano',
    excerpt: 'El índice bursátil argentino cerró con un incremento del 4.2%, liderado por el sector financiero. Analistas destacan el optimismo de los inversores ante las nuevas medidas económicas.',
    category: 'Economía',
    views: 19850,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
  },
  {
    title: 'Inflación de septiembre supera las proyecciones del Banco Central',
    slug: 'inflacion-septiembre-supera-proyecciones',
    excerpt: 'El IPC registró un aumento del 3.7% mensual, por encima del 3.2% estimado. Los alimentos y servicios públicos fueron los rubros con mayor incremento.',
    category: 'Economía',
    breaking: true,
    views: 31240,
    coverImage: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=1200&q=80',
  },
  {
    title: 'Masiva movilización ciudadana reclama mejoras en el sistema de salud',
    slug: 'movilizacion-sistema-salud',
    excerpt: 'Miles de personas se congregaron frente al Congreso exigiendo mayores recursos para hospitales públicos y mejores condiciones laborales para el personal de salud.',
    category: 'Sociedad',
    views: 25670,
    coverImage: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&q=80',
  },
  {
    title: 'Startup argentina de inteligencia artificial recibe inversión millonaria',
    slug: 'startup-argentina-inversion-ia',
    excerpt: 'Una empresa tecnológica local captó USD 15 millones de fondos internacionales para expandir su plataforma de IA aplicada al agro. El sector tech argentino muestra señales de crecimiento.',
    category: 'Tecnología',
    views: 17890,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  },
  {
    title: 'Selección argentina se prepara para las eliminatorias del Mundial',
    slug: 'seleccion-argentina-eliminatorias',
    excerpt: 'Lionel Scaloni confirmó la lista de convocados para los próximos partidos clasificatorios. El equipo buscará mantener su buen momento tras la Copa América.',
    category: 'Deportes',
    views: 41230,
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
  },
  {
    title: 'Festival de Cine Independiente destaca producciones nacionales',
    slug: 'festival-cine-independiente',
    excerpt: 'El evento cultural reunió a más de 50 directores emergentes que presentaron sus obras. La industria cinematográfica argentina busca nuevos espacios de exhibición.',
    category: 'Cultura',
    views: 12450,
    coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
  },
  {
    title: 'Estudio revela preocupantes datos sobre salud mental en jóvenes',
    slug: 'estudio-salud-mental-jovenes',
    excerpt: 'Una investigación de universidades nacionales muestra un aumento del 35% en casos de ansiedad y depresión en personas de 18 a 25 años durante los últimos dos años.',
    category: 'Salud',
    views: 28940,
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
  },
  {
    title: 'Argentina presentará ambicioso plan de energías renovables en COP29',
    slug: 'argentina-plan-energias-renovables',
    excerpt: 'El gobierno nacional expondrá su estrategia para alcanzar el 30% de matriz energética limpia para 2030. Proyectos de parques eólicos y solares en evaluación.',
    category: 'Medio Ambiente',
    views: 15720,
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80',
  },
  {
    title: 'Crisis educativa: docentes amenazan con nuevas medidas de fuerza',
    slug: 'crisis-educativa-paros-docentes',
    excerpt: 'Los gremios docentes advirtieron sobre la posibilidad de extender las medidas de protesta si no se concretan las mejoras salariales prometidas. El conflicto se profundiza.',
    category: 'Sociedad',
    views: 21340,
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
  },
  {
    title: 'Reservas del Banco Central caen a mínimos de los últimos seis meses',
    slug: 'reservas-banco-central-minimos',
    excerpt: 'Las reservas internacionales descendieron USD 800 millones en la última semana debido a pagos de deuda y intervenciones cambiarias. El BCRA busca estrategias para revertir la tendencia.',
    category: 'Economía',
    views: 26780,
    coverImage: 'https://images.unsplash.com/photo-1639754390580-2e7437267698?w=1200&q=80',
  },
  {
    title: 'Histórico fallo judicial reconoce derechos de comunidades originarias',
    slug: 'fallo-judicial-comunidades-originarias',
    excerpt: 'La Corte Suprema dictaminó a favor de pueblos indígenas en disputa por tierras ancestrales. El fallo sienta precedente en materia de derechos colectivos y territoriales.',
    category: 'Sociedad',
    views: 18560,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  },
];

async function main() {
  console.log('🌱 Seeding premium content...\n');

  // Create admin user
  console.log('👤 Creating admin user...');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@politica-argentina.com' },
    update: {},
    create: {
      email: 'admin@politica-argentina.com',
      name: 'Editor Principal',
      role: 'ADMIN',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });
  console.log('✅ Admin user created\n');

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
  for (const article of ARTICLES) {
    const category = categories.find(c => c.name === article.category);
    if (!category) continue;

    const content = `
<p class="text-lg leading-relaxed text-zinc-300 mb-6">
  ${article.excerpt}
</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Contexto y antecedentes</h2>
<p class="text-zinc-300 leading-relaxed mb-4">
  En el marco de la actual coyuntura económica y política, esta noticia cobra especial relevancia para entender
  el panorama nacional. Los analistas consultados coinciden en que se trata de un desarrollo significativo que
  podría tener impacto en diversos sectores de la sociedad argentina.
</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Análisis de expertos</h2>
<p class="text-zinc-300 leading-relaxed mb-4">
  Economistas y analistas políticos han expresado opiniones divididas sobre las implicancias de esta situación.
  Mientras algunos ven oportunidades de mejora, otros advierten sobre posibles riesgos que deben ser considerados
  por las autoridades correspondientes.
</p>

<blockquote class="border-l-4 border-red-600 pl-4 italic text-zinc-400 my-6">
  "Este es un momento crucial que define el rumbo de las próximas decisiones estratégicas del país."
  <footer class="text-sm mt-2">- Analista consultado</footer>
</blockquote>

<h2 class="text-2xl font-bold mt-8 mb-4">Impacto esperado</h2>
<p class="text-zinc-300 leading-relaxed mb-4">
  Las consecuencias de estos desarrollos se sentirán en múltiples áreas, desde la economía familiar hasta
  las relaciones internacionales. Los próximos meses serán determinantes para evaluar los resultados de
  estas medidas y su efectividad en resolver los desafíos planteados.
</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Próximos pasos</h2>
<p class="text-zinc-300 leading-relaxed mb-4">
  Las autoridades han anunciado que continuarán monitoreando la situación de cerca y están preparadas para
  implementar ajustes según sea necesario. La ciudadanía mantiene expectativas sobre los resultados concretos
  que estas iniciativas puedan generar en el corto y mediano plazo.
</p>
    `.trim();

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
        publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random within last week
        categoryId: category.id,
        authorId: admin.id,
      },
    });
    console.log(`  ✅ ${article.title.substring(0, 60)}...`);
  }

  console.log('\n✅ Premium content seeded successfully!');
  console.log(`📊 Created: ${categories.length} categories, ${ARTICLES.length} articles`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
