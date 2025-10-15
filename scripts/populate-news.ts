import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SAMPLE_NEWS = [
  {
    title: "Argentina alcanza acuerdo histórico con el FMI por nueva línea de crédito",
    excerpt: "El gobierno argentino cerró negociaciones con el Fondo Monetario Internacional para refinanciar la deuda y obtener nuevos recursos.",
    category: "economia",
    content: `El Ministerio de Economía anunció hoy un acuerdo histórico con el Fondo Monetario Internacional (FMI) que permitirá refinanciar la deuda argentina y obtener acceso a nuevos recursos por USD 10.000 millones.

## Detalles del Acuerdo

El acuerdo incluye metas de inflación revisadas y un nuevo esquema de tipo de cambio que busca estabilizar la economía argentina en el mediano plazo.

### Principales Puntos

- Refinanciación de USD 44.000 millones
- Nuevos desembolsos por USD 10.000 millones
- Metas de inflación del 60% para 2025
- Compromiso de reducir el déficit fiscal

## Reacciones del Mercado

Los mercados financieros reaccionaron positivamente, con el riesgo país cayendo 150 puntos básicos y el dólar blue manteniéndose estable.`,
    tags: ["fmi", "economia", "deuda", "dolar"],
  },
  {
    title: "Récord histórico: Argentina exporta granos por USD 50.000 millones",
    excerpt: "El complejo sojero lidera las exportaciones argentinas con precios internacionales favorables y una cosecha récord.",
    category: "economia",
    content: `Las exportaciones agrícolas argentinas alcanzaron un récord histórico de USD 50.000 millones en 2024, impulsadas principalmente por el complejo sojero y precios internacionales favorables.

## Contexto del Sector

La cosecha 2024 fue una de las más importantes de la historia argentina, con 130 millones de toneladas de granos producidos.

### Principales Productos Exportados

- Soja y derivados: USD 28.000 millones
- Maíz: USD 12.000 millones
- Trigo: USD 6.000 millones`,
    tags: ["agricultura", "exportaciones", "soja", "campo"],
  },
  {
    title: "Nueva ley de educación: cambios profundos en el sistema escolar argentino",
    excerpt: "El Congreso aprobó una reforma educativa que modifica la estructura curricular y extiende la jornada escolar.",
    category: "sociedad",
    content: `El Congreso Nacional aprobó anoche una reforma educativa histórica que modificará profundamente el sistema escolar argentino a partir de 2025.

## Principales Cambios

La nueva ley introduce cambios sustanciales en la estructura curricular, la duración de la jornada escolar y la formación docente.`,
    tags: ["educacion", "congreso", "reforma", "escuelas"],
  },
  {
    title: "Argentina lidera el desarrollo de energías renovables en Latinoamérica",
    excerpt: "Nuevos parques eólicos y solares posicionan al país como referente regional en transición energética.",
    category: "tecnologia",
    content: `Argentina se consolida como líder regional en energías renovables con la inauguración de 15 nuevos parques eólicos y solares.`,
    tags: ["energia", "renovables", "eolica", "solar"],
  },
  {
    title: "Selección Argentina: preparativos intensos para las Eliminatorias",
    excerpt: "El equipo nacional se concentra en Buenos Aires con miras a los próximos partidos clasificatorios al Mundial 2026.",
    category: "deportes",
    content: `La Selección Argentina inició sus entrenamientos en el predio de la AFA en Ezeiza con vistas a los cruciales partidos de Eliminatorias Sudamericanas.`,
    tags: ["futbol", "seleccion", "eliminatorias", "mundial"],
  },
  {
    title: "Inflación de octubre marca nuevo descenso: 3,5% mensual",
    excerpt: "El INDEC reportó una desaceleración inflacionaria que alienta las proyecciones económicas para fin de año.",
    category: "economia",
    content: `El Instituto Nacional de Estadística y Censos (INDEC) informó que la inflación de octubre fue del 3,5% mensual, marcando el nivel más bajo de los últimos 18 meses.`,
    tags: ["inflacion", "indec", "economia", "precios"],
  },
  {
    title: "Tecnológicas argentinas captan USD 300 millones en inversiones",
    excerpt: "El sector tecnológico local atrae inversiones récord de fondos internacionales.",
    category: "tecnologia",
    content: `El ecosistema de startups argentinas captó USD 300 millones en inversiones durante el tercer trimestre, consolidando al país como hub tecnológico regional.`,
    tags: ["startups", "tecnologia", "inversiones", "fintech"],
  },
  {
    title: "Turismo: Argentina espera 7 millones de visitantes extranjeros en 2024",
    excerpt: "El sector turístico proyecta un año récord impulsado por el tipo de cambio favorable.",
    category: "sociedad",
    content: `El Ministerio de Turismo proyecta que Argentina recibirá cerca de 7 millones de turistas extranjeros este año, impulsado por la competitividad cambiaria.`,
    tags: ["turismo", "economia", "visitantes", "argentina"],
  },
];

async function main() {
  console.log('🚀 Iniciando población de noticias...\n');

  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map(c => [c.slug, c]));

  const adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });

  if (!adminUser) {
    throw new Error('No se encontró usuario admin');
  }

  let created = 0;
  let skipped = 0;

  for (const news of SAMPLE_NEWS) {
    const slug = news.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existing = await prisma.post.findUnique({
      where: { slug }
    });

    if (existing) {
      console.log(`⏭️  Ya existe: ${news.title}`);
      skipped++;
      continue;
    }

    const category = categoryMap.get(news.category);
    if (!category) {
      console.log(`❌ Categoría no encontrada: ${news.category}`);
      continue;
    }

    const post = await prisma.post.create({
      data: {
        title: news.title,
        slug,
        excerpt: news.excerpt,
        content: news.content,
        coverImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000000)}?w=1200&h=630&q=80&auto=format&fit=crop`,
        status: 'PUBLISHED',
        featured: created === 0,
        breaking: created < 2,
        metaTitle: news.title,
        metaDesc: news.excerpt,
        authorId: adminUser.id,
        categoryId: category.id,
        publishedAt: new Date(Date.now() - created * 3600000), // Escalonar fechas
      }
    });

    for (const tagName of news.tags) {
      let tag = await prisma.tag.findUnique({
        where: { slug: tagName }
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName.charAt(0).toUpperCase() + tagName.slice(1),
            slug: tagName,
          }
        });
      }

      await prisma.post.update({
        where: { id: post.id },
        data: {
          tags: {
            connect: { id: tag.id }
          }
        }
      });
    }

    console.log(`✅ Creada: ${news.title}`);
    created++;
  }

  console.log(`\n🎉 Completado: ${created} creadas, ${skipped} ya existían`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

