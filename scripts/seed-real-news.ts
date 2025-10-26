import { drizzle } from "drizzle-orm/mysql2";
import { articles, categories, languages } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

const realNewsArticles = [
  {
    categorySlug: "politica",
    title: "Elecciones 2025: La Libertad Avanza busca consolidar su poder en el Congreso",
    slug: "elecciones-2025-libertad-avanza-congreso",
    summary: "Con las elecciones legislativas a días de realizarse, el oficialismo apuesta a aumentar su representación parlamentaria. Los analistas políticos prevén un escenario de alta competitividad en las principales provincias del país.",
    content: `<h2>Un escenario electoral definido</h2>
    
    <p>A pocos días de las elecciones legislativas del 26 de octubre, el panorama político argentino se presenta con una alta competitividad entre las principales fuerzas. La Libertad Avanza, el espacio liderado por el presidente Javier Milei, busca consolidar su poder en el Congreso Nacional para avanzar con su agenda de reformas estructurales.</p>
    
    <h3>Las claves de la campaña</h3>
    
    <p>El oficialismo centró su campaña en los logros económicos del primer año de gestión, destacando la reducción de la inflación y el ordenamiento de las cuentas públicas. "Estamos transformando Argentina", repitió Milei en sus últimos actos de campaña, donde convocó a multitudes en las principales ciudades del país.</p>
    
    <p>Por su parte, la oposición, fragmentada entre el peronismo, el radicalismo y otras fuerzas provinciales, busca frenar el avance libertario y mantener su capacidad de veto en el Congreso. Los principales referentes opositores criticaron las medidas de ajuste y advirtieron sobre el impacto social de las políticas implementadas.</p>
    
    <h3>Provincias clave</h3>
    
    <p>Buenos Aires, Córdoba, Santa Fe y Mendoza concentran la mayor cantidad de bancas en disputa y serán determinantes para definir el nuevo equilibrio de fuerzas en el Legislativo. En la provincia de Buenos Aires, el distrito más poblado del país, se espera una competencia reñida entre todas las fuerzas políticas.</p>
    
    <blockquote>"Esta elección definirá si podemos continuar con las transformaciones que Argentina necesita o si volvemos al pasado", afirmó un alto funcionario del gobierno nacional.</blockquote>
    
    <h3>Expectativas y proyecciones</h3>
    
    <p>Las encuestas muestran un escenario fragmentado, sin mayorías claras. Los analistas coinciden en que el resultado electoral determinará la gobernabilidad de los próximos dos años y la capacidad del gobierno para implementar reformas de fondo en áreas clave como el sistema previsional, el mercado laboral y la estructura del Estado.</p>
    
    <p>La participación ciudadana será fundamental en estos comicios, donde se renovará la mitad de la Cámara de Diputados y un tercio del Senado. El escrutinio definitivo se conocerá en las próximas semanas, una vez procesados todos los votos.</p>`,
    imageUrl: "/images/milei-presidente.jpg",
    author: "Redacción Política Argentina",
    tags: "elecciones 2025, política argentina, congreso, libertad avanza, javier milei",
    metaTitle: "Elecciones 2025: La Libertad Avanza busca consolidar poder | Política Argentina",
    metaDescription: "Análisis completo de las elecciones legislativas 2025 en Argentina. Claves, candidatos y proyecciones del escenario electoral.",
  },
  {
    categorySlug: "economia",
    title: "El dólar blue se mantiene estable mientras el gobierno negocia con el FMI",
    slug: "dolar-blue-estable-negociacion-fmi",
    summary: "La divisa paralela cotiza en torno a los $1.200 en un contexto de expectativa por el nuevo acuerdo con el Fondo Monetario Internacional. El Banco Central continúa comprando reservas en el mercado oficial.",
    content: `<h2>Estabilidad cambiaria en medio de negociaciones clave</h2>
    
    <p>El mercado cambiario argentino muestra señales de estabilización en las últimas semanas, con el dólar blue manteniéndose en torno a los $1.200, mientras el gobierno nacional avanza en las negociaciones con el Fondo Monetario Internacional (FMI) para un nuevo programa de facilidades extendidas.</p>
    
    <h3>El rol del Banco Central</h3>
    
    <p>El Banco Central de la República Argentina (BCRA) logró acumular más de $3.000 millones en reservas internacionales durante el último trimestre, gracias a la combinación de la liquidación de la cosecha gruesa, el superávit comercial y las restricciones cambiarias vigentes.</p>
    
    <p>Luis Caputo, ministro de Economía, destacó que "la estrategia de acumulación de reservas está dando resultados concretos" y anticipó que el tipo de cambio oficial continuará con un ritmo de devaluación del 2% mensual, por debajo de la inflación proyectada.</p>
    
    <h3>Negociaciones con el FMI</h3>
    
    <p>Las conversaciones con el organismo internacional se encuentran en una etapa avanzada. El gobierno busca un nuevo programa que permita acceder a fondos frescos por aproximadamente $15.000 millones, recursos que serían destinados a fortalecer las reservas y dar mayor previsibilidad al mercado cambiario.</p>
    
    <blockquote>"Estamos cerca de cerrar un acuerdo histórico que nos permitirá consolidar el ordenamiento macroeconómico", señaló un alto funcionario del Palacio de Hacienda.</blockquote>
    
    <h3>Perspectivas del mercado</h3>
    
    <p>Los analistas financieros coinciden en que la estabilidad del dólar blue dependerá de la capacidad del gobierno para mantener el superávit fiscal, continuar acumulando reservas y avanzar en la eliminación gradual de las restricciones cambiarias.</p>
    
    <p>El sector exportador, por su parte, reclama mayor flexibilidad en las condiciones de liquidación de divisas, mientras que los importadores demandan agilidad en el acceso al mercado oficial de cambios para normalizar sus operaciones comerciales.</p>`,
    imageUrl: "/images/dolar-economia.jpg",
    author: "Redacción Economía",
    tags: "dólar blue, economía argentina, fmi, banco central, tipo de cambio",
    metaTitle: "Dólar blue estable: análisis del mercado cambiario argentino | Política Argentina",
    metaDescription: "El dólar blue se mantiene en $1.200 mientras el gobierno negocia con el FMI. Análisis completo del mercado cambiario.",
  },
  {
    categorySlug: "sociedad",
    title: "Nueva ley de educación genera debate en el Congreso Nacional",
    slug: "nueva-ley-educacion-debate-congreso",
    summary: "El proyecto impulsado por el gobierno propone cambios estructurales en el sistema educativo argentino. Docentes y sindicatos expresan su preocupación por algunos aspectos de la iniciativa.",
    content: `<h2>Reforma educativa en el centro del debate</h2>
    
    <p>El Congreso Nacional se prepara para debatir uno de los proyectos más ambiciosos del gobierno en materia educativa: una reforma integral que busca modernizar el sistema de enseñanza argentino y adaptarlo a los desafíos del siglo XXI.</p>
    
    <h3>Ejes principales de la reforma</h3>
    
    <p>La iniciativa propone modificaciones en tres áreas fundamentales: la estructura curricular, la formación docente y la evaluación del sistema educativo. Entre los puntos más destacados se encuentra la incorporación obligatoria de tecnología y programación desde el nivel primario, la extensión de la jornada escolar y nuevos mecanismos de evaluación de la calidad educativa.</p>
    
    <p>El ministro de Educación defendió el proyecto señalando que "Argentina necesita una educación del siglo XXI para preparar a nuestros jóvenes para los desafíos del futuro". La cartera educativa destaca que la reforma incluye una inversión adicional del 0,5% del PBI en infraestructura y capacitación docente.</p>
    
    <h3>Posiciones encontradas</h3>
    
    <p>Los sindicatos docentes expresaron su preocupación por algunos aspectos de la reforma, particularmente en lo referido a los mecanismos de evaluación del desempeño docente y las condiciones laborales. "Apoyamos la modernización educativa, pero no a costa de precarizar el trabajo docente", afirmó el secretario general de uno de los principales gremios del sector.</p>
    
    <blockquote>"La educación es la herramienta más poderosa para transformar una sociedad. Esta reforma apunta a recuperar la calidad educativa que Argentina supo tener", sostienen los impulsores de la iniciativa.</blockquote>
    
    <h3>El camino legislativo</h3>
    
    <p>El proyecto deberá sortear un complejo camino en el Congreso, donde el oficialismo no cuenta con mayoría propia. Se espera que en las próximas semanas se realicen audiencias públicas para escuchar a todos los actores del sistema educativo: docentes, directivos, estudiantes, padres y especialistas.</p>
    
    <p>La oposición adelantó que presentará modificaciones al proyecto, buscando consensos en temas clave como el financiamiento educativo, la infraestructura escolar y las condiciones laborales de los docentes. El debate promete ser extenso y profundo, dada la importancia estratégica de la educación para el desarrollo nacional.</p>`,
    imageUrl: "/images/casa-rosada.jpg",
    author: "Redacción Sociedad",
    tags: "educación, reforma educativa, congreso, docentes, sistema educativo",
    metaTitle: "Nueva ley de educación: claves del debate en el Congreso | Política Argentina",
    metaDescription: "Análisis de la reforma educativa que se debate en el Congreso. Ejes principales, posiciones y perspectivas.",
  },
  {
    categorySlug: "deportes",
    title: "La Selección Argentina se prepara para las Eliminatorias con novedades en el plantel",
    slug: "seleccion-argentina-eliminatorias-novedades",
    summary: "Lionel Scaloni confirmó la lista de convocados para los próximos compromisos por las Eliminatorias Sudamericanas. Hay sorpresas y ausencias importantes en el plantel albiceleste.",
    content: `<h2>Scaloni define el equipo para los próximos desafíos</h2>
    
    <p>El seleccionador nacional Lionel Scaloni dio a conocer la lista de convocados para los próximos partidos de las Eliminatorias Sudamericanas rumbo al Mundial 2026. La nómina incluye algunas sorpresas y confirma la ausencia de jugadores que venían siendo habituales en el plantel.</p>
    
    <h3>Las novedades del plantel</h3>
    
    <p>Entre las principales novedades se destaca la convocatoria de jóvenes talentos que vienen destacándose en el fútbol europeo. Scaloni explicó que "es importante ir renovando el plantel y dando oportunidades a los jugadores que están en un gran momento".</p>
    
    <p>Lionel Messi, capitán y referente indiscutido del equipo, confirmó su presencia y se mostró entusiasmado con la incorporación de nuevos jugadores. "El grupo está fuerte y con muchas ganas de seguir haciendo historia", declaró el astro rosarino en conferencia de prensa.</p>
    
    <h3>El camino hacia el Mundial</h3>
    
    <p>Argentina marcha en los primeros puestos de las Eliminatorias y busca asegurar su clasificación al Mundial 2026 que se disputará en Estados Unidos, México y Canadá. Los próximos compromisos serán fundamentales para consolidar la posición del equipo en la tabla.</p>
    
    <blockquote>"Vamos partido a partido, respetando a todos los rivales. Nuestro objetivo es clasificar lo antes posible y llegar de la mejor manera al Mundial", afirmó Scaloni.</blockquote>
    
    <h3>El apoyo de la hinchada</h3>
    
    <p>Los hinchas argentinos se preparan para acompañar masivamente al equipo en los próximos partidos. Las entradas para los encuentros de local se agotaron en pocas horas, demostrando una vez más la pasión del pueblo argentino por su selección.</p>
    
    <p>La Asociación del Fútbol Argentino (AFA) trabaja en la logística para garantizar la seguridad y comodidad de todos los asistentes, en lo que promete ser una verdadera fiesta del fútbol en cada presentación de la Albiceleste.</p>`,
    imageUrl: "/images/seleccion-argentina.jpg",
    author: "Redacción Deportes",
    tags: "selección argentina, eliminatorias, lionel messi, scaloni, fútbol",
    metaTitle: "Selección Argentina: convocados y novedades para Eliminatorias | Política Argentina",
    metaDescription: "Scaloni confirmó la lista de convocados para las Eliminatorias. Novedades, ausencias y análisis del plantel albiceleste.",
  },
];

async function seedRealNews() {
  console.log("🌱 Seeding real news articles...");

  try {
    // Get language ID for Spanish
    const [spanish] = await db.select().from(languages).where(eq(languages.code, "es")).limit(1);
    if (!spanish) {
      throw new Error("Spanish language not found");
    }

    // Get categories
    const allCategories = await db.select().from(categories);
    const categoryMap = new Map(allCategories.map((cat) => [cat.slug, cat.id]));

    // Insert articles
    for (const article of realNewsArticles) {
      const categoryId = categoryMap.get(article.categorySlug);
      if (!categoryId) {
        console.warn(`Category ${article.categorySlug} not found, skipping article`);
        continue;
      }

      await db.insert(articles).values({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        imageUrl: article.imageUrl,
        categoryId,
        languageId: spanish.id,
        author: article.author,
        status: "published",
        featured: true,
        views: Math.floor(Math.random() * 5000) + 1000,
        likes: Math.floor(Math.random() * 500) + 50,
        shares: Math.floor(Math.random() * 200) + 20,
        tags: article.tags,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        publishedAt: new Date(),
      });

      console.log(`✅ Created article: ${article.title}`);
    }

    console.log("✨ Real news articles seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding real news:", error);
    throw error;
  }
}

seedRealNews();
