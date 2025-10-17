import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * Production Seeding API Endpoint
 *
 * Call this endpoint ONCE to populate your production database:
 * https://politica-argentina.vercel.app/api/seed-production
 */

export async function GET(req: Request) {
  try {
    // Security: Check if database already has content
    const existingPosts = await db.post.count();
    if (existingPosts > 5) {
      return NextResponse.json({
        success: false,
        message: `Database already has ${existingPosts} posts. Seeding skipped to prevent duplicates.`,
        existingContent: existingPosts,
      });
    }

    console.log('🌱 Starting production database seeding via API...');

    // Create admin user
    const admin = await db.user.upsert({
      where: { email: 'admin@politica-argentina.com' },
      update: {},
      create: {
        email: 'admin@politica-argentina.com',
        name: 'Redacción Principal',
        role: 'ADMIN',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      },
    });

    // Create categories
    const categories = [
      { name: 'Política', slug: 'politica', description: 'Cobertura política nacional y análisis', color: '#dc2626' },
      { name: 'Economía', slug: 'economia', description: 'Análisis económico y financiero', color: '#2563eb' },
      { name: 'Sociedad', slug: 'sociedad', description: 'Temas sociales y culturales', color: '#16a34a' },
      { name: 'Internacional', slug: 'internacional', description: 'Noticias del mundo', color: '#ea580c' },
      { name: 'Tecnología', slug: 'tecnologia', description: 'Innovación y tecnología', color: '#7c3aed' },
      { name: 'Deportes', slug: 'deportes', description: 'Cobertura deportiva', color: '#f59e0b' },
      { name: 'Cultura', slug: 'cultura', description: 'Arte y cultura', color: '#ec4899' },
      { name: 'Salud', slug: 'salud', description: 'Salud y bienestar', color: '#10b981' },
    ];

    const createdCategories = await Promise.all(
      categories.map((cat) =>
        db.category.upsert({
          where: { slug: cat.slug },
          update: {},
          create: cat,
        })
      )
    );

    // Create sample posts with rich content
    const samplePosts = [
      {
        title: 'Gobierno anuncia nuevo paquete de medidas económicas para estabilizar la inflación',
        slug: 'gobierno-anuncia-nuevo-paquete-medidas-economicas',
        excerpt: 'El Ministerio de Economía presentó un conjunto integral de políticas destinadas a controlar la inflación y promover el crecimiento económico sostenible.',
        content: `
          <h2>Medidas Económicas Integrales</h2>
          <p>El gobierno nacional anunció hoy un ambicioso paquete de medidas económicas diseñadas para abordar los desafíos inflacionarios actuales. El ministro de Economía detalló las iniciativas durante una conferencia de prensa en Casa Rosada.</p>

          <h3>Puntos Principales</h3>
          <ul>
            <li>Control de precios en productos de la canasta básica</li>
            <li>Acuerdos sectoriales con empresas privadas</li>
            <li>Medidas de estímulo para sectores productivos</li>
            <li>Políticas de apoyo a pequeñas y medianas empresas</li>
          </ul>

          <p>Las medidas buscan generar un marco de previsibilidad para inversores y consumidores por igual.</p>
        `,
        categoryId: createdCategories[1].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: true,
        breaking: true,
        views: 15234,
        coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
      },
      {
        title: 'Congreso Nacional debate reforma electoral con amplio consenso',
        slug: 'congreso-debate-reforma-electoral-consenso',
        excerpt: 'Diputados y senadores de distintos bloques analizan modificaciones al sistema electoral argentino con vistas a las próximas elecciones nacionales.',
        content: `
          <h2>Reforma del Sistema Electoral</h2>
          <p>El Congreso Nacional inició el debate sobre una reforma electoral que podría modificar aspectos clave del sistema de votación en Argentina. Representantes de todos los bloques participan activamente en las discusiones.</p>

          <h3>Ejes del Debate</h3>
          <p>Los principales temas en discusión incluyen la digitalización del voto, la reducción del financiamiento de campañas, y nuevas regulaciones sobre propaganda electoral en medios digitales.</p>

          <blockquote>Esta reforma busca modernizar nuestro sistema electoral y hacerlo más transparente para todos los ciudadanos.</blockquote>
        `,
        categoryId: createdCategories[0].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: false,
        breaking: false,
        views: 8523,
        coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
      },
      {
        title: 'Dólar blue alcanza nuevo récord: supera los $1000 en el mercado paralelo',
        slug: 'dolar-blue-record-historico-1000-pesos',
        excerpt: 'La divisa paralela superó la barrera psicológica de los $1000 pesos en el mercado informal, generando inquietud en sectores empresariales y ahorristas.',
        content: `
          <h2>Tensión Cambiaria</h2>
          <p>El dólar blue alcanzó hoy un nuevo máximo histórico al superar los $1000 pesos por unidad, marcando una brecha del 120% respecto al tipo de cambio oficial.</p>

          <h3>Análisis del Mercado</h3>
          <p>Economistas consultados atribuyen el aumento a la incertidumbre global, la demanda de cobertura ante la inflación local, y las expectativas sobre futuras políticas monetarias.</p>

          <h3>Impacto en la Economía Real</h3>
          <p>El sector importador expresa preocupación por el impacto en costos, mientras el turismo internacional se beneficia de la diferencia cambiaria.</p>
        `,
        categoryId: createdCategories[1].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: true,
        breaking: true,
        views: 23456,
        coverImage: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200&q=80',
      },
      {
        title: 'Educación: gobierno presenta plan de modernización tecnológica en escuelas',
        slug: 'educacion-plan-modernizacion-tecnologica',
        excerpt: 'El Ministerio de Educación lanzó un programa integral para incorporar tecnología de última generación en todas las instituciones educativas del país.',
        content: `
          <h2>Transformación Digital Educativa</h2>
          <p>Un ambicioso plan de inversión en infraestructura tecnológica busca revolucionar la experiencia educativa en Argentina. El programa incluye conectividad, dispositivos y capacitación docente.</p>

          <h3>Componentes del Plan</h3>
          <ul>
            <li>Provisión de laptops y tablets para estudiantes</li>
            <li>Conectividad de alta velocidad en todas las escuelas</li>
            <li>Plataformas educativas interactivas</li>
            <li>Capacitación continua para docentes</li>
          </ul>
        `,
        categoryId: createdCategories[2].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: false,
        breaking: false,
        views: 5432,
        coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
      },
      {
        title: 'Argentina y Brasil firman acuerdo comercial histórico en Brasilia',
        slug: 'argentina-brasil-acuerdo-comercial-historico',
        excerpt: 'Los presidentes de ambas naciones sellaron un tratado bilateral que facilitará el comercio, promoverá inversiones y fortalecerá la integración regional sudamericana.',
        content: `
          <h2>Nuevo Capítulo en Relaciones Bilaterales</h2>
          <p>En una ceremonia en el Palacio de Planalto en Brasilia, los mandatarios argentino y brasileño firmaron un acuerdo comercial que marca un hito en la relación entre ambos países.</p>

          <h3>Sectores Beneficiados</h3>
          <p>El tratado contempla reducción de aranceles en industria automotriz, tecnología, agroindustria y servicios profesionales. Se espera un incremento del 40% en el comercio bilateral en los próximos dos años.</p>

          <blockquote>Este acuerdo fortalece no solo nuestras economías, sino toda la región sudamericana.</blockquote>
        `,
        categoryId: createdCategories[3].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: false,
        breaking: false,
        views: 7234,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
      },
      {
        title: 'Innovación: startup argentina desarrolla IA para diagnóstico médico',
        slug: 'startup-argentina-ia-diagnostico-medico',
        excerpt: 'Una empresa tecnológica nacional creó un sistema de inteligencia artificial que asiste a médicos en el diagnóstico temprano de enfermedades.',
        content: `
          <h2>Tecnología Argentina en Salud</h2>
          <p>Una startup con sede en Buenos Aires desarrolló una plataforma de IA que analiza estudios médicos y proporciona recomendaciones diagnósticas con precisión del 95%.</p>

          <h3>Aplicaciones Clínicas</h3>
          <p>El sistema ya se utiliza en 15 hospitales del país y ha demostrado reducir tiempos de diagnóstico en un 60%. La empresa busca expandirse a toda Latinoamérica.</p>
        `,
        categoryId: createdCategories[4].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: true,
        breaking: false,
        views: 12345,
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
      },
      {
        title: 'Fútbol: la Selección Argentina anuncia lista para próximas eliminatorias',
        slug: 'seleccion-argentina-lista-eliminatorias',
        excerpt: 'El director técnico reveló la nómina de jugadores convocados para los compromisos de las eliminatorias sudamericanas rumbo al Mundial.',
        content: `
          <h2>Convocatoria Oficial</h2>
          <p>La Selección Argentina presentó la lista de 26 jugadores que buscarán mantener el liderazgo en las eliminatorias sudamericanas. Incluye figuras consagradas y jóvenes promesas.</p>

          <h3>Próximos Partidos</h3>
          <p>El equipo enfrentará a Uruguay de visitante y recibirá a Chile en el Monumental. Ambos partidos serán clave para asegurar la clasificación anticipada.</p>
        `,
        categoryId: createdCategories[5].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: false,
        breaking: false,
        views: 18765,
        coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
      },
      {
        title: 'Teatro Nacional: estreno de obra con elenco estelar genera expectativa',
        slug: 'teatro-nacional-estreno-obra-estelar',
        excerpt: 'El Teatro Nacional Cervantes presentará una nueva producción que reúne a destacadas figuras del teatro y cine argentino.',
        content: `
          <h2>Gran Estreno Teatral</h2>
          <p>Una ambiciosa puesta en escena llega al escenario principal del Cervantes con un elenco que combina experiencia y talento joven. La obra aborda temáticas sociales contemporáneas.</p>

          <h3>Producción de Excelencia</h3>
          <p>Con dirección de un reconocido dramaturgo nacional, la producción cuenta con escenografía innovadora y tecnología de última generación para crear una experiencia inmersiva.</p>
        `,
        categoryId: createdCategories[6].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: false,
        breaking: false,
        views: 4567,
        coverImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&q=80',
      },
      {
        title: 'Salud: campaña de vacunación alcanza el 85% de cobertura nacional',
        slug: 'campana-vacunacion-85-cobertura',
        excerpt: 'El Ministerio de Salud reporta éxito en la campaña de inmunización, superando las metas establecidas para este trimestre.',
        content: `
          <h2>Campaña de Vacunación Exitosa</h2>
          <p>La estrategia sanitaria nacional alcanzó un 85% de cobertura en vacunación contra enfermedades prioritarias, superando las expectativas iniciales del programa.</p>

          <h3>Logística y Organización</h3>
          <p>La campaña implementó centros móviles de vacunación, extensión de horarios y coordinación con municipios para garantizar acceso universal. Se vacunaron más de 15 millones de personas.</p>
        `,
        categoryId: createdCategories[7].id,
        authorId: admin.id,
        status: 'PUBLISHED',
        featured: false,
        breaking: false,
        views: 6789,
        coverImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
      },
    ];

    const createdPosts = await Promise.all(
      samplePosts.map((post) =>
        db.post.create({
          data: {
            ...post,
            publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: '🎉 Production database seeded successfully!',
      data: {
        users: 1,
        categories: createdCategories.length,
        posts: createdPosts.length,
      },
    });

  } catch (error: any) {
    console.error('❌ Seeding error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to seed production database',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
