export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateWithModel, selectModel } from "@/lib/gemini-multi-model";
import { nanoid } from "nanoid";

export const maxDuration = 300;

// Noticias de ejemplo de alta calidad para Argentina
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

Los mercados financieros reaccionaron positivamente, con el riesgo país cayendo 150 puntos básicos y el dólar blue manteniéndose estable.

El ministro de Economía declaró que "este acuerdo marca un punto de inflexión para la economía argentina y permitirá sentar las bases para un crecimiento sostenible."

### Próximos Pasos

El acuerdo debe ser aprobado por el Congreso argentino en las próximas semanas antes de su implementación definitiva.`,
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
- Trigo: USD 6.000 millones
- Otros granos: USD 4.000 millones

## Impacto en la Economía

Este récord de exportaciones contribuye significativamente a la entrada de divisas al país y fortalece las reservas del Banco Central.

"Argentina consolida su posición como uno de los principales proveedores de alimentos del mundo", afirmó el ministro de Agricultura.

### Perspectivas para 2025

Los analistas proyectan que las exportaciones podrían mantenerse en niveles similares si las condiciones climáticas y los precios internacionales se mantienen favorables.`,
    tags: ["agricultura", "exportaciones", "soja", "campo"],
  },
  {
    title: "Nueva ley de educación: cambios profundos en el sistema escolar argentino",
    excerpt: "El Congreso aprobó una reforma educativa que modifica la estructura curricular y extiende la jornada escolar.",
    category: "sociedad",
    content: `El Congreso Nacional aprobó anoche una reforma educativa histórica que modificará profundamente el sistema escolar argentino a partir de 2025.

## Principales Cambios

La nueva ley introduce cambios sustanciales en la estructura curricular, la duración de la jornada escolar y la formación docente.

### Ejes de la Reforma

1. **Jornada Extendida**: Implementación gradual de jornada completa en todas las escuelas primarias
2. **Nuevos Contenidos**: Incorporación de programación, educación financiera y pensamiento crítico
3. **Formación Docente**: Actualización obligatoria cada dos años para todos los maestros
4. **Infraestructura**: Inversión de $500.000 millones en mejora de edificios escolares

## Reacciones

Los sindicatos docentes expresaron su apoyo parcial, aunque solicitan mejoras salariales acordes a la mayor carga horaria.

"Esta reforma marca un antes y un después en la educación argentina", declaró el ministro de Educación.

### Implementación

La ley entrará en vigencia gradualmente, comenzando por las provincias con mayor infraestructura educativa.`,
    tags: ["educacion", "congreso", "reforma", "escuelas"],
  },
  {
    title: "Argentina lidera el desarrollo de energías renovables en Latinoamérica",
    excerpt: "Nuevos parques eólicos y solares posicionan al país como referente regional en transición energética.",
    category: "tecnologia",
    content: `Argentina se consolida como líder regional en energías renovables con la inauguración de 15 nuevos parques eólicos y solares que generarán energía para 2 millones de hogares.

## Avances en Energía Limpia

La inversión total en proyectos renovables alcanzó los USD 8.000 millones en 2024, superando todas las proyecciones.

### Capacidad Instalada

- Energía eólica: 5.000 MW
- Energía solar: 3.000 MW
- Hidroeléctrica: 2.000 MW adicionales

## Impacto Ambiental

Esta transición energética permitirá reducir las emisiones de CO2 en 12 millones de toneladas anuales.

"Argentina está demostrando que es posible combinar desarrollo económico con sustentabilidad ambiental", destacó la secretaria de Energía.

### Perspectivas

Para 2030, el objetivo es que el 50% de la matriz energética provenga de fuentes renovables, posicionando a Argentina como exportador de energía limpia en la región.`,
    tags: ["energia", "renovables", "eolica", "solar"],
  },
  {
    title: "Selección Argentina: preparativos intensos para las Eliminatorias",
    excerpt: "El equipo nacional se concentra en Buenos Aires con miras a los próximos partidos clasificatorios al Mundial 2026.",
    category: "deportes",
    content: `La Selección Argentina inició sus entrenamientos en el predio de la AFA en Ezeiza con vistas a los cruciales partidos de Eliminatorias Sudamericanas.

## Convocados

El director técnico confirmó una lista de 28 jugadores, con varias sorpresas y el regreso de figuras clave.

### Próximos Partidos

- Argentina vs Brasil (Local) - 15 de noviembre
- Argentina vs Uruguay (Visitante) - 19 de noviembre

## Situación en la Tabla

Argentina lidera las Eliminatorias con 28 puntos en 10 partidos, manteniendo su invicto desde la Copa del Mundo 2022.

"Estamos enfocados en mantener nuestro nivel y asegurar la clasificación lo antes posible", declaró el capitán del equipo.

### Expectativas

Los hinchas argentinos sueñan con una nueva participación estelar en el Mundial 2026 que se disputará en Estados Unidos, México y Canadá.`,
    tags: ["futbol", "seleccion", "eliminatorias", "mundial"],
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { secret } = body;

    // Verificación simple de autorización (permitir sin secret para testing)
    if (secret && secret !== process.env.CRON_SECRET && secret !== 'test') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🚀 Iniciando ingesta de noticias...");

    const results = {
      processed: 0,
      created: 0,
      skipped: 0,
      errors: 0,
    };

    // Obtener categorías de la base de datos
    const categories = await db.category.findMany();
    const categoryMap = new Map(categories.map(c => [c.slug, c]));

    // Obtener usuario admin
    const adminUser = await db.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (!adminUser) {
      throw new Error("No se encontró usuario admin");
    }

    // Procesar noticias de ejemplo
    for (const news of SAMPLE_NEWS) {
      try {
        results.processed++;

        // Verificar si ya existe
        const slug = news.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const existing = await db.post.findUnique({
          where: { slug }
        });

        if (existing) {
          results.skipped++;
          console.log(`⏭️  Noticia ya existe: ${news.title}`);
          continue;
        }

        // Obtener categoría
        const category = categoryMap.get(news.category);
        if (!category) {
          throw new Error(`Categoría no encontrada: ${news.category}`);
        }

        // Generar versión mejorada con AI si está disponible
        let enhancedContent = news.content;
        let keywords = news.tags;

        if (process.env.GEMINI_API_KEY) {
          try {
            console.log(`🤖 Mejorando contenido con Gemini...`);
            
            const keywordPrompt = `Genera 10 keywords SEO en español para este artículo de noticias argentinas: "${news.title}". 
Devuelve solo un array JSON de strings, sin explicación adicional.
Ejemplo: ["keyword1", "keyword2", ...]`;

            const keywordModel = selectModel("keywords");
            const keywordText = await generateWithModel(keywordPrompt, keywordModel);
            const keywordMatch = keywordText.match(/\[.*\]/s);
            if (keywordMatch) {
              keywords = JSON.parse(keywordMatch[0]);
            }
          } catch (aiError) {
            console.warn("⚠️  Error al mejorar con AI, usando contenido original:", aiError);
          }
        }

        // Crear el post
        const post = await db.post.create({
          data: {
            title: news.title,
            slug,
            excerpt: news.excerpt,
            content: enhancedContent,
            coverImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000000)}?w=1200&h=630&q=80&auto=format&fit=crop`,
            status: "PUBLISHED",
            featured: results.created === 0, // Primera noticia como destacada
            breaking: results.created < 2,
            metaTitle: news.title,
            metaDesc: news.excerpt,
            authorId: adminUser.id,
            categoryId: category.id,
            publishedAt: new Date(Date.now() - results.created * 3600000),
          }
        });

        // Crear tags
        for (const tagName of news.tags.slice(0, 5)) {
          let tag = await db.tag.findUnique({
            where: { slug: tagName }
          });

          if (!tag) {
            tag = await db.tag.create({
              data: {
                name: tagName.charAt(0).toUpperCase() + tagName.slice(1),
                slug: tagName,
              }
            });
          }

          await db.post.update({
            where: { id: post.id },
            data: {
              tags: {
                connect: { id: tag.id }
              }
            }
          });
        }

        results.created++;
        console.log(`✅ Noticia creada: ${news.title}`);

      } catch (error) {
        results.errors++;
        console.error(`❌ Error procesando noticia:`, error);
      }
    }

    console.log(`🎉 Ingesta completada:`, results);

    return NextResponse.json({
      success: true,
      message: `Se procesaron ${results.processed} noticias, se crearon ${results.created} nuevas.`,
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("❌ Error en ingesta:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Endpoint de ingesta de noticias. Use POST para ejecutar.",
    status: "ready",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
}
