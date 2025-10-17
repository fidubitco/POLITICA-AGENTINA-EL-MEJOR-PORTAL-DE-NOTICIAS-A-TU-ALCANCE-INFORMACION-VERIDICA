import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Categorías completas
const categories = [
  { name: "Política", slug: "politica", color: "red" },
  { name: "Economía", slug: "economia", color: "blue" },
  { name: "Sociedad", slug: "sociedad", color: "purple" },
  { name: "Internacional", slug: "internacional", color: "green" },
  { name: "Deportes", slug: "deportes", color: "yellow" },
  { name: "Tecnología", slug: "tecnologia", color: "cyan" },
  { name: "Cultura", slug: "cultura", color: "pink" },
  { name: "Salud", slug: "salud", color: "emerald" },
  { name: "Educación", slug: "educacion", color: "indigo" },
  { name: "Medio Ambiente", slug: "medio-ambiente", color: "green" },
];

// Tags completos
const allTags = [
  "FMI", "Dólar", "Inflación", "Elecciones", "Congreso", "Justicia",
  "Exportaciones", "Industria", "Comercio", "Inversión", "Deuda Externa",
  "Derechos Humanos", "Seguridad", "Narcotráfico", "Feminismo",
  "Mundial", "Copa América", "Liga Profesional", "Selección Argentina",
  "Inteligencia Artificial", "Ciberseguridad", "Startups", "5G",
  "Pandemia", "Vacunas", "Salud Mental", "Hospitales",
  "Universidades", "Becas", "Reforma Educativa", "Docentes",
  "Cambio Climático", "Energías Renovables", "Reciclaje", "Contaminación",
];

// Generador de contenido extenso
function generateExtendedContent(category: string, title: string): string {
  const intro = `
    <p class="lead">En un desarrollo de última hora, se confirma que ${title.toLowerCase()}. Este acontecimiento marca un punto de inflexión importante en el panorama ${category.toLowerCase()} argentino y genera gran expectativa en diversos sectores de la sociedad.</p>

    <p>Fuentes cercanas al caso confirmaron que las repercusiones de esta situación se extenderán a lo largo de las próximas semanas, impactando directamente en la agenda política y económica del país. Expertos consultados por nuestro medio anticipan que este será uno de los temas más debatidos en los próximos días.</p>
  `;

  const section1 = `
    <h2>Contexto y Antecedentes</h2>
    
    <p>Para entender la magnitud de este acontecimiento, es necesario remontarse a los últimos meses, donde una serie de eventos previos sentaron las bases para lo que hoy presenciamos. El escenario político y social ha experimentado transformaciones significativas que explican el desenlace actual.</p>

    <div class="highlight-box">
      <h3>Puntos Clave del Desarrollo</h3>
      <ul>
        <li><strong>Primer Factor:</strong> La consolidación de políticas públicas orientadas a modernizar el sistema institucional del país.</li>
        <li><strong>Segundo Factor:</strong> El incremento en la participación ciudadana y el activismo en redes sociales como catalizador de cambios.</li>
        <li><strong>Tercer Factor:</strong> La presión internacional y el papel de organismos multilaterales en la toma de decisiones.</li>
        <li><strong>Cuarto Factor:</strong> El impacto de la situación económica global y su efecto en la economía local.</li>
      </ul>
    </div>

    <p>Los especialistas coinciden en que este proceso no surge de manera aislada, sino que es el resultado de una convergencia de factores estructurales y coyunturales que han ido gestándose durante años. La complejidad del escenario requiere un análisis profundo y multidimensional.</p>

    <blockquote>
      <p>"Este es un momento histórico para Argentina. Las decisiones que se tomen ahora tendrán consecuencias que se extenderán por generaciones."</p>
      <cite>— Dr. Alejandro Martínez, Analista Político, Universidad de Buenos Aires</cite>
    </blockquote>
  `;

  const section2 = `
    <h2>Análisis Detallado de la Situación</h2>

    <p>Un examen minucioso de los acontecimientos revela múltiples aristas que deben ser consideradas. En primer lugar, el aspecto institucional juega un rol fundamental en la configuración del escenario actual. Las instituciones democráticas argentinas se ven desafiadas a responder de manera efectiva ante las nuevas demandas sociales.</p>

    <h3>Dimensión Económica</h3>

    <p>Desde el punto de vista económico, los indicadores muestran una tendencia que merece especial atención. El Producto Bruto Interno (PBI) ha experimentado fluctuaciones significativas en el último trimestre, mientras que la inflación continúa siendo uno de los principales desafíos para la gestión gubernamental.</p>

    <p>Los datos del INDEC revelan que el índice de precios al consumidor acumuló un incremento considerable en lo que va del año. Esta situación afecta directamente el poder adquisitivo de los sectores medios y bajos de la población, generando tensiones sociales que requieren respuestas inmediatas y efectivas.</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Indicador</th>
          <th>Valor Actual</th>
          <th>Variación Mensual</th>
          <th>Variación Anual</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Inflación</td>
          <td>3.5%</td>
          <td>-0.8%</td>
          <td>142.3%</td>
        </tr>
        <tr>
          <td>Dólar Oficial</td>
          <td>$850</td>
          <td>+2.1%</td>
          <td>+98.5%</td>
        </tr>
        <tr>
          <td>Riesgo País</td>
          <td>1,850 pts</td>
          <td>-150 pts</td>
          <td>-320 pts</td>
        </tr>
        <tr>
          <td>Reservas BCRA</td>
          <td>USD 27.5B</td>
          <td>+USD 2.1B</td>
          <td>+USD 8.3B</td>
        </tr>
      </tbody>
    </table>

    <h3>Dimensión Social</h3>

    <p>La dimensión social de este acontecimiento no puede ser subestimada. Las organizaciones de la sociedad civil han manifestado su preocupación y, al mismo tiempo, su expectativa ante los posibles cambios que se avecinan. El diálogo entre los diferentes actores sociales será clave para construir consensos duraderos.</p>

    <p>Encuestas recientes indican que un 68% de la población considera que este es un tema prioritario que requiere atención inmediata. Sin embargo, las opiniones están divididas respecto a cuál debería ser el enfoque más adecuado para abordar la situación.</p>
  `;

  const section3 = `
    <h2>Repercusiones y Reacciones</h2>

    <p>La noticia ha generado un amplio espectro de reacciones en el ámbito político, económico y social. Los principales referentes de todos los espacios políticos se han expresado al respecto, evidenciando posturas diversas que reflejan la complejidad del debate.</p>

    <h3>Sector Político</h3>

    <p>Desde el oficialismo, se destaca el carácter histórico de la medida y se subraya el compromiso del gobierno con la transformación profunda que el país necesita. "Estamos construyendo los cimientos de una Argentina más justa y equitativa", expresaron desde el Poder Ejecutivo.</p>

    <p>Por su parte, la oposición mantiene una postura crítica pero constructiva. Si bien cuestionan algunos aspectos de la implementación, reconocen la necesidad de abordar los desafíos estructurales que enfrenta el país. "Es momento de dejar de lado las diferencias partidarias y trabajar juntos por el bien común", señaló un importante legislador opositor.</p>

    <h3>Sector Empresarial</h3>

    <p>El mundo empresarial observa con atención el desarrollo de los acontecimientos. Las cámaras empresariales han emitido comunicados en los que expresan su disposición al diálogo y su interés en participar activamente en la construcción de soluciones.</p>

    <p>Los representantes del sector productivo destacan la importancia de contar con reglas claras y previsibilidad para planificar inversiones a largo plazo. "La estabilidad institucional es fundamental para generar confianza y atraer capitales", manifestó el presidente de una importante cámara empresaria.</p>

    <blockquote>
      <p>"Argentina tiene un potencial enorme que debe ser aprovechado. Para ello, necesitamos políticas de Estado que trasciendan los ciclos electorales."</p>
      <cite>— Lic. María Fernández, Economista Jefe, Consultora Econviews</cite>
    </blockquote>

    <h3>Organizaciones Sociales</h3>

    <p>Las organizaciones sociales y sindicales han manifestado su posición a través de comunicados y movilizaciones. Demandan participación en las instancias de decisión y garantías de que los derechos adquiridos serán respetados en el marco de los cambios que se implementen.</p>

    <p>"No aceptaremos retrocesos en materia de derechos laborales y sociales", advirtieron desde las centrales sindicales, al tiempo que convocaron a un plenario extraordinario para definir un plan de acción.</p>
  `;

  const section4 = `
    <h2>Perspectivas Internacionales</h2>

    <p>El escenario internacional también juega un papel relevante en este contexto. Los principales organismos multilaterales, como el Fondo Monetario Internacional (FMI), el Banco Mundial y el Banco Interamericano de Desarrollo (BID), han expresado su seguimiento atento de la situación argentina.</p>

    <h3>Posición del FMI</h3>

    <p>En declaraciones recientes, voceros del Fondo Monetario Internacional reconocieron los esfuerzos realizados por Argentina en materia de ajuste fiscal y reformas estructurales. "Vemos con buenos ojos el compromiso del gobierno argentino con la estabilidad macroeconómica y el cumplimiento de las metas acordadas", señalaron desde Washington.</p>

    <p>Sin embargo, el organismo también advirtió sobre la necesidad de mantener la disciplina fiscal y avanzar en reformas de segunda generación que permitan sentar las bases de un crecimiento sostenible en el mediano y largo plazo.</p>

    <h3>Visión Regional</h3>

    <p>Los países vecinos siguen de cerca los acontecimientos en Argentina, conscientes del impacto que las decisiones del gobierno argentino pueden tener en la región. Brasil, como principal socio comercial, ha expresado su deseo de fortalecer los vínculos bilaterales y profundizar la integración regional en el marco del Mercosur.</p>

    <p>Desde Chile, Uruguay y Paraguay también se han manifestado expectativas respecto a la consolidación de una agenda común que permita enfrentar los desafíos globales con una voz regional fortalecida.</p>
  `;

  const section5 = `
    <h2>Desafíos y Oportunidades</h2>

    <p>El camino que se abre presenta tanto desafíos como oportunidades. Entre los principales desafíos se encuentra la necesidad de construir consensos amplios que permitan sostener las políticas en el tiempo, independientemente de los cambios de gobierno.</p>

    <h3>Desafíos Principales</h3>

    <ol>
      <li><strong>Estabilidad Macroeconómica:</strong> Controlar la inflación, estabilizar el tipo de cambio y acumular reservas son prioridades urgentes que requieren medidas coordinadas y consistentes.</li>
      <li><strong>Inclusión Social:</strong> Garantizar que los sectores más vulnerables no sean los más afectados por los ajustes necesarios para ordenar la economía.</li>
      <li><strong>Desarrollo Productivo:</strong> Impulsar sectores con potencial exportador y capacidad de generar empleo de calidad.</li>
      <li><strong>Infraestructura:</strong> Modernizar la infraestructura logística, energética y de comunicaciones para mejorar la competitividad del país.</li>
      <li><strong>Educación y Ciencia:</strong> Fortalecer el sistema educativo y de investigación científica como pilares del desarrollo sostenible.</li>
    </ol>

    <h3>Oportunidades Estratégicas</h3>

    <p>Por el lado de las oportunidades, Argentina cuenta con recursos naturales abundantes, una población educada y una tradición democrática sólida que constituyen activos valiosos para encarar el futuro con optimismo.</p>

    <p>El sector agroindustrial continúa siendo un motor fundamental de la economía, con perspectivas favorables en los mercados internacionales. La transición energética global abre oportunidades para el desarrollo de energías renovables, área en la que Argentina tiene un potencial significativo.</p>

    <p>Asimismo, la economía del conocimiento representa un sector con alto potencial de crecimiento. El talento de los profesionales argentinos en áreas como desarrollo de software, biotecnología y servicios basados en conocimiento es reconocido a nivel mundial.</p>

    <div class="info-box">
      <h4>Sectores con Mayor Potencial de Crecimiento</h4>
      <ul>
        <li>Agroindustria y Alimentos</li>
        <li>Energías Renovables (Solar, Eólica, Hidrógeno Verde)</li>
        <li>Tecnología y Economía del Conocimiento</li>
        <li>Minería Sustentable (Litio, Cobre)</li>
        <li>Turismo (Naturaleza, Cultura, Enogastronomía)</li>
        <li>Biotecnología y Ciencias de la Vida</li>
      </ul>
    </div>
  `;

  const conclusion = `
    <h2>Conclusiones y Perspectivas Futuras</h2>

    <p>En síntesis, nos encontramos ante un momento crucial que demanda responsabilidad, visión de Estado y capacidad de diálogo por parte de todos los actores involucrados. Los desafíos son significativos, pero también lo son las oportunidades que se presentan para construir un país más próspero y equitativo.</p>

    <p>El éxito de este proceso dependerá de la capacidad de generar acuerdos amplios que trasciendan las diferencias ideológicas y partidarias. La historia argentina ha demostrado que cuando existe voluntad política y compromiso ciudadano, es posible superar las crisis y construir un futuro mejor.</p>

    <p>Los próximos meses serán decisivos. La sociedad argentina deberá estar atenta y participar activamente en los debates que se desarrollen, ejerciendo su derecho a la información y a la participación democrática. Solo con una ciudadanía informada y comprometida será posible consolidar los cambios necesarios.</p>

    <p>Desde este medio, continuaremos brindando cobertura exhaustiva de todos los acontecimientos relacionados con este tema, comprometidos con el periodismo de calidad y la búsqueda de la verdad.</p>

    <div class="final-note">
      <p><strong>Nota del Editor:</strong> Este artículo se actualizará a medida que se produzcan nuevos desarrollos en la historia. Para más información y análisis en profundidad, siga nuestras redes sociales y suscríbase a nuestro newsletter.</p>
    </div>

    <div class="sources">
      <h4>Fuentes Consultadas:</h4>
      <ul>
        <li>Instituto Nacional de Estadística y Censos (INDEC)</li>
        <li>Banco Central de la República Argentina (BCRA)</li>
        <li>Ministerio de Economía de la Nación</li>
        <li>Entrevistas con expertos de universidades nacionales</li>
        <li>Informes de organismos internacionales</li>
        <li>Relevamiento propio en territorio</li>
      </ul>
    </div>
  `;

  return intro + section1 + section2 + section3 + section4 + section5 + conclusion;
}

// Noticias extensas de alta calidad
const extendedNews = [
  {
    title: "Argentina alcanza acuerdo histórico con el FMI por nueva línea de crédito de USD 15.000 millones",
    category: "Economía",
    excerpt: "El gobierno argentino cerró negociaciones con el Fondo Monetario Internacional para refinanciar la deuda y obtener nuevos recursos. El acuerdo incluye metas de inflación revisadas y un nuevo esquema de tipo de cambio.",
    tags: ["FMI", "Economía", "Deuda Externa", "Dólar", "Inflación"],
    featured: true,
    breaking: true,
    views: 15420,
  },
  {
    title: "Récord histórico: Argentina exporta granos por USD 50.000 millones y supera todas las proyecciones",
    category: "Economía",
    excerpt: "El complejo sojero lidera las exportaciones argentinas con precios internacionales favorables y una cosecha récord. Los productores celebran un año excepcional que fortalece las reservas del Banco Central.",
    tags: ["Exportaciones", "Granos", "Soja", "Economía", "Comercio"],
    featured: true,
    breaking: false,
    views: 12350,
  },
  {
    title: "Nueva ley de educación: cambios profundos en el sistema escolar argentino que transformarán la enseñanza",
    category: "Educación",
    excerpt: "El Congreso aprobó una reforma educativa que modifica la estructura curricular y extiende la jornada escolar. La ley incluye formación en tecnología, educación financiera y habilidades del siglo XXI.",
    tags: ["Educación", "Ley", "Congreso", "Reforma Educativa", "Docentes"],
    featured: false,
    breaking: true,
    views: 9870,
  },
  {
    title: "Selección Argentina: preparativos intensos para las Eliminatorias rumbo al Mundial 2026",
    category: "Deportes",
    excerpt: "El equipo nacional se concentra en Buenos Aires con miras a los próximos partidos clasificatorios. Lionel Scaloni define el once ideal y trabaja en la estrategia para enfrentar a Brasil y Uruguay.",
    tags: ["Selección Argentina", "Fútbol", "Eliminatorias", "Mundial", "Lionel Messi"],
    featured: false,
    breaking: false,
    views: 18920,
  },
  {
    title: "Inflación de octubre marca nuevo descenso: 3,5% mensual según el INDEC, la más baja en dos años",
    category: "Economía",
    excerpt: "El INDEC reportó una desaceleración inflacionaria que alienta las proyecciones económicas para fin de año. Los analistas ven con optimismo la tendencia y proyectan una inflación anual por debajo del 120%.",
    tags: ["Inflación", "INDEC", "Economía", "Precios"],
    featured: false,
    breaking: false,
    views: 11240,
  },
  {
    title: "Turismo: Argentina espera 7 millones de visitantes extranjeros en 2024 y bate récords prepandemia",
    category: "Sociedad",
    excerpt: "El sector turístico proyecta un año récord impulsado por el tipo de cambio favorable y las campañas de promoción internacional. La Patagonia y las Cataratas del Iguazú lideran las preferencias.",
    tags: ["Turismo", "Argentina", "Viajes", "Economía Regional"],
    featured: false,
    breaking: false,
    views: 8650,
  },
  {
    title: "Inteligencia Artificial: Argentina lanza programa nacional para impulsar startups tecnológicas",
    category: "Tecnología",
    excerpt: "El gobierno presentó un ambicioso programa para posicionar al país como hub regional de IA. Incluye incentivos fiscales, financiamiento y apoyo a emprendedores del sector tech.",
    tags: ["Inteligencia Artificial", "Tecnología", "Startups", "Innovación"],
    featured: false,
    breaking: true,
    views: 7340,
  },
  {
    title: "Crisis climática: Argentina presenta plan para alcanzar carbono neutralidad en 2050",
    category: "Medio Ambiente",
    excerpt: "El Ministerio de Ambiente anunció un plan integral para reducir emisiones y promover energías renovables. El objetivo es cumplir con los compromisos del Acuerdo de París.",
    tags: ["Cambio Climático", "Medio Ambiente", "Energías Renovables", "Sustentabilidad"],
    featured: false,
    breaking: false,
    views: 6420,
  },
  {
    title: "Salud pública: nuevo sistema de atención primaria beneficiará a 20 millones de argentinos",
    category: "Salud",
    excerpt: "El gobierno nacional lanzó un programa para fortalecer la atención primaria de la salud en todo el país. Incluye capacitación de personal, modernización de centros de salud y telemedicina.",
    tags: ["Salud", "Salud Pública", "Hospitales", "Pandemia"],
    featured: false,
    breaking: false,
    views: 5890,
  },
  {
    title: "Elecciones 2025: encuestas muestran polarización y alta participación ciudadana esperada",
    category: "Política",
    excerpt: "Las últimas mediciones anticipan un año electoral con alta competitividad. Los principales candidatos intensifican sus campañas mientras la sociedad debate los temas centrales de la agenda.",
    tags: ["Elecciones", "Política", "Congreso", "Democracia"],
    featured: true,
    breaking: false,
    views: 14780,
  },
  {
    title: "Inversión extranjera: multinacionales anuncian proyectos por USD 5.000 millones en Argentina",
    category: "Economía",
    excerpt: "Empresas de tecnología, energía y minería confirmaron importantes inversiones que generarán miles de empleos. El gobierno destaca la recuperación de la confianza internacional.",
    tags: ["Inversión", "Economía", "Multinacionales", "Empleo"],
    featured: false,
    breaking: true,
    views: 10120,
  },
  {
    title: "Cultura: Argentina postula el tango como Patrimonio Inmaterial de la Humanidad ampliado",
    category: "Cultura",
    excerpt: "UNESCO evaluará la propuesta que busca incluir nuevas expresiones del tango. El expediente destaca la evolución del género y su impacto cultural en América Latina.",
    tags: ["Cultura", "Tango", "UNESCO", "Patrimonio"],
    featured: false,
    breaking: false,
    views: 4230,
  },
];

async function main() {
  console.log("🚀 Iniciando población de base de datos con contenido extenso...\n");

  // Crear usuario admin
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@politica-argentina.com" },
    update: {},
    create: {
      email: "admin@politica-argentina.com",
      name: "Redacción Principal",
      password: "$2a$10$abcdefghijklmnopqrstuvwxyz", // Password hasheado (no usar en producción)
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80&fit=crop",
    },
  });

  console.log("✅ Usuario administrador creado");

  // Crear categorías
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log(`✅ ${categories.length} categorías creadas\n`);

  // Crear tags
  for (const tagName of allTags) {
    const slug = tagName.toLowerCase().replace(/\s+/g, "-");
    await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: tagName, slug },
    });
  }

  console.log(`✅ ${allTags.length} tags creados\n`);

  // Crear noticias extensas
  let createdCount = 0;
  for (const news of extendedNews) {
    const category = await prisma.category.findUnique({
      where: { slug: news.category.toLowerCase().replace(/\s+/g, "-") },
    });

    if (!category) {
      console.log(`⚠️  Categoría no encontrada: ${news.category}`);
      continue;
    }

    const slug = news.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100);

    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      console.log(`⏩ Saltando noticia existente: ${news.title.substring(0, 50)}...`);
      continue;
    }

    // Generar contenido extenso
    const extendedContent = generateExtendedContent(news.category, news.title);

    // Seleccionar múltiples imágenes
    const imageIds = [
      Math.floor(Math.random() * 100000000000) + 1500000000000,
      Math.floor(Math.random() * 100000000000) + 1600000000000,
      Math.floor(Math.random() * 100000000000) + 1700000000000,
    ];

    const coverImage = `https://images.unsplash.com/photo-${imageIds[0]}?w=1200&h=630&q=80&auto=format&fit=crop`;

    const post = await prisma.post.create({
      data: {
        title: news.title,
        slug,
        excerpt: news.excerpt,
        content: extendedContent,
        coverImage,
        status: "PUBLISHED",
        featured: news.featured,
        breaking: news.breaking,
        views: news.views,
        metaTitle: news.title,
        metaDesc: news.excerpt,
        authorId: adminUser.id,
        categoryId: category.id,
        publishedAt: new Date(Date.now() - createdCount * 3600000 * 2), // Escalonado cada 2 horas
      },
    });

    // Agregar tags
    for (const tagName of news.tags) {
      const slug = tagName.toLowerCase().replace(/\s+/g, "-");
      const tag = await prisma.tag.findUnique({ where: { slug } });
      if (tag) {
        await prisma.post.update({
          where: { id: post.id },
          data: { tags: { connect: { id: tag.id } } },
        });
      }
    }

    createdCount++;
    console.log(`✅ [${createdCount}/${extendedNews.length}] ${news.title.substring(0, 60)}...`);
  }

  console.log(`\n🎉 Población completada con éxito!`);
  console.log(`📊 Total de noticias creadas: ${createdCount}`);
  console.log(`📊 Categorías: ${categories.length}`);
  console.log(`📊 Tags: ${allTags.length}`);
  console.log(`\n✅ La base de datos está lista con contenido de alta calidad.\n`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

