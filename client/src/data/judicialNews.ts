/**
 * 📰 NOTICIAS JUDICIALES - ARGENTINA 2025
 * Noticias actuales del ámbito judicial argentino
 */

import { Article } from './allNews';

const now = Date.now();

export const judicialNews: Article[] = [
  // NOTICIA PRINCIPAL - FISCAL JULIANA COMPANYS
  {
    id: 201,
    title: 'Fiscal Juliana Companys Investiga Megacausa de Corrupción en Obra Pública',
    slug: 'fiscal-juliana-companys-investiga-megacausa-corrupcion-obra-publica',
    excerpt: 'La fiscal federal Juliana Companys avanza en una compleja investigación sobre presuntas irregularidades en contratos de obra pública por más de USD 500 millones. La causa involucra a empresarios y ex funcionarios.',
    content: `<p>La fiscal federal Juliana Companys, reconocida por su trabajo en casos de alta complejidad, lidera una investigación que podría convertirse en una de las causas de corrupción más importantes de los últimos años en Argentina.</p>

<h2>La Investigación</h2>

<h3>Alcance de la Causa</h3>
<p>La fiscal Companys investiga presuntas irregularidades en la adjudicación y ejecución de contratos de obra pública durante el período 2015-2019, con un monto involucrado que supera los USD 500 millones.</p>

<h3>Elementos Bajo Investigación</h3>
<p>La causa se centra en:</p>
<ul>
<li><strong>Sobreprecios:</strong> Aumentos injustificados en costos de obras</li>
<li><strong>Empresas fantasma:</strong> Sociedades creadas para desviar fondos</li>
<li><strong>Sobornos:</strong> Pagos irregulares a funcionarios</li>
<li><strong>Documentación falsa:</strong> Certificaciones de obras no realizadas</li>
</ul>

<h2>Perfil de la Fiscal</h2>

<h3>Trayectoria Profesional</h3>
<p>Juliana Companys se ha destacado por:</p>
<ul>
<li>15 años de carrera en el Ministerio Público Fiscal</li>
<li>Especialización en delitos económicos y corrupción</li>
<li>Casos emblemáticos de lavado de dinero y asociación ilícita</li>
<li>Reconocimientos por su labor en transparencia judicial</li>
</ul>

<h2>Avances de la Investigación</h2>

<h3>Pruebas Recopiladas</h3>
<p>Hasta el momento se han reunido más de 50,000 documentos analizados, 200 testimonios de testigos y peritos, peritajes contables de empresas involucradas, registros bancarios de cuentas sospechosas y comunicaciones interceptadas con autorización judicial.</p>

<h3>Allanamientos Realizados</h3>
<p>En los últimos meses se efectuaron 15 allanamientos simultáneos en CABA y provincia de Buenos Aires, con secuestro de documentación contable, incautación de dispositivos electrónicos y bloqueo preventivo de cuentas bancarias.</p>

<h2>Imputados y Procesados</h2>

<p>La causa involucra a empresarios titulares de constructoras de primer nivel, empresarios con vínculos políticos, directivos de empresas contratistas y testaferros. También están bajo investigación ex secretarios de Obras Públicas, funcionarios de áreas de contrataciones, inspectores de obra y personal administrativo clave.</p>

<h3>Estado Procesal</h3>
<ul>
<li>8 personas procesadas con prisión preventiva</li>
<li>15 imputados con restricciones de salida del país</li>
<li>Embargos por más de USD 300 millones</li>
<li>Inhibición general de bienes</li>
</ul>

<h2>Impacto y Próximos Pasos</h2>

<p>Se estima que el daño patrimonial alcanza los USD 500 millones en fondos públicos desviados. La fiscalía trabaja en la identificación de bienes adquiridos con fondos ilícitos, rastreo de cuentas offshore y decomiso preventivo de propiedades.</p>

<p>El cronograma judicial prevé la finalización de peritajes pendientes en marzo de 2025, con elevación a juicio oral en abril y audiencias preliminares en mayo. El inicio del juicio oral está estimado para junio de 2025.</p>`,
    category: 'Judicial',
    categorySlug: 'judicial',
    author: 'Dr. Roberto Martínez - Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    status: 'published',
    featured: true,
    breaking: true,
    views: 32450,
    likes: 2876,
    shares: 1543,
    publishedAt: new Date(now - 1800000).toISOString(),
    createdAt: new Date(now - 1800000).toISOString(),
    updatedAt: new Date(now - 1800000).toISOString(),
    tags: ['fiscal', 'Juliana Companys', 'corrupción', 'obra pública', 'justicia', 'investigación'],
  },

  // BATCH 1 - 10 NOTICIAS JUDICIALES ACTUALES
  {
    id: 202,
    title: 'Juez Ordena Prisión Preventiva para Acusados de Estafa Piramidal',
    slug: 'juez-ordena-prision-preventiva-acusados-estafa-piramidal',
    excerpt: 'Un juez federal ordenó la prisión preventiva de cinco personas acusadas de organizar una estafa piramidal que afectó a más de 10,000 inversores en todo el país.',
    content: `<p>Un juez federal de Buenos Aires ordenó la prisión preventiva de cinco personas acusadas de liderar una organización dedicada a estafas piramidales que captó más de USD 200 millones de ahorristas en todo el país.</p>

<h2>La Estafa</h2>

<p>Los acusados prometían rendimientos del 20% mensual a través de supuestas inversiones en criptomonedas y trading de divisas. La organización operaba mediante plataformas digitales aparentemente legítimas, eventos masivos de captación, esquema de referidos con comisiones y testimonios falsos de inversores exitosos.</p>

<h3>Víctimas</h3>
<p>La estafa afectó a más de 10,000 inversores en todo el país, incluyendo ahorristas de clase media que invirtieron sus ahorros, jubilados que destinaron sus indemnizaciones y jóvenes profesionales atraídos por promesas de ganancias rápidas.</p>

<h2>Decisión Judicial</h2>

<p>El juez fundamentó la prisión preventiva en el riesgo de fuga de los imputados, peligro de entorpecimiento de la investigación, gravedad de los delitos investigados y el monto significativo involucrado.</p>

<h3>Delitos Imputados</h3>
<ul>
<li>Asociación ilícita</li>
<li>Estafa agravada</li>
<li>Lavado de activos</li>
<li>Captación ilegal de ahorros</li>
</ul>

<h2>Recupero de Fondos</h2>

<p>Se incautaron USD 15 millones en cuentas bancarias, criptomonedas valuadas en USD 8 millones, propiedades inmobiliarias y vehículos de alta gama. La justicia trabaja en la identificación de todos los damnificados y el mecanismo de distribución proporcional.</p>`,
    category: 'Judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    status: 'published',
    featured: true,
    breaking: false,
    views: 18920,
    likes: 1234,
    shares: 678,
    publishedAt: new Date(now - 3600000).toISOString(),
    createdAt: new Date(now - 3600000).toISOString(),
    updatedAt: new Date(now - 3600000).toISOString(),
    tags: ['estafa', 'prisión preventiva', 'justicia', 'criptomonedas', 'inversiones'],
  },
  {
    id: 203,
    title: 'Tribunal Condena a 15 Años de Prisión por Femicidio en Rosario',
    slug: 'tribunal-condena-15-anos-prision-femicidio-rosario',
    excerpt: 'Un tribunal de Rosario condenó a 15 años de prisión a un hombre por el femicidio de su ex pareja. La sentencia fue celebrada por organizaciones de género.',
    content: `<p>Un tribunal de juicio de Rosario condenó a 15 años de prisión a un hombre de 38 años por el femicidio de su ex pareja, ocurrido en marzo de 2024. La sentencia fue unánime y se basó en pruebas contundentes presentadas por la fiscalía.</p>

<h2>El Caso</h2>

<p>El femicidio ocurrió en el domicilio de la víctima, donde el acusado ingresó violentamente pese a tener una orden de restricción vigente. La mujer, de 32 años, había denunciado previamente situaciones de violencia de género y contaba con medidas de protección. Dejó dos hijos menores que quedaron al cuidado de familiares.</p>

<h2>La Sentencia</h2>

<p>Los jueces consideraron la violencia de género como agravante, el incumplimiento de la orden de restricción, los antecedentes de violencia y el impacto en los hijos de la víctima. El tribunal calificó el hecho como homicidio agravado por el vínculo y femicidio.</p>

<h2>Contexto de Violencia de Género</h2>

<p>En Argentina se registra un femicidio cada 35 horas (promedio 2024). Para víctimas de violencia están disponibles la Línea 144 (atención 24/7), centros de atención especializados, asesoramiento legal gratuito y refugios y casas de protección.</p>`,
    category: 'Judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&q=80',
    status: 'published',
    featured: true,
    breaking: false,
    views: 24560,
    likes: 1987,
    shares: 1234,
    publishedAt: new Date(now - 7200000).toISOString(),
    createdAt: new Date(now - 7200000).toISOString(),
    updatedAt: new Date(now - 7200000).toISOString(),
    tags: ['femicidio', 'violencia de género', 'justicia', 'condena', 'Rosario'],
  },
  {
    id: 204,
    title: 'Cámara Federal Confirma Procesamiento en Causa por Narcotráfico',
    slug: 'camara-federal-confirma-procesamiento-causa-narcotrafico',
    excerpt: 'La Cámara Federal confirmó el procesamiento de 12 personas acusadas de integrar una organización dedicada al tráfico de drogas que operaba entre Argentina y Paraguay.',
    content: `<p>La Cámara Federal de Apelaciones confirmó el procesamiento de 12 personas acusadas de integrar una organización criminal dedicada al narcotráfico que operaba en la frontera entre Argentina y Paraguay, con ramificaciones en varias provincias del norte argentino.</p>

<h2>La Organización</h2>

<p>La banda estaba organizada jerárquicamente con líderes en Paraguay que coordinaban el ingreso de droga, operadores logísticos en Argentina, distribuidores en provincias del norte y una red de "mulas" para transporte.</p>

<p>La organización ingresaba cocaína y marihuana desde Paraguay, utilizaba rutas clandestinas y pasos ilegales, ocultaba la droga en vehículos y encomiendas, y distribuía en Formosa, Chaco, Corrientes y Misiones.</p>

<h2>La Investigación</h2>

<p>La Policía Federal y Gendarmería realizaron seguimientos durante 8 meses, escuchas telefónicas autorizadas, vigilancia de movimientos y coordinación con autoridades paraguayas.</p>

<p>Se efectuaron 15 allanamientos simultáneos con secuestro de 300 kg de cocaína, incautación de 2 toneladas de marihuana, detención de los 12 imputados y secuestro de vehículos y dinero en efectivo.</p>

<h2>Impacto Regional</h2>

<p>Este caso representa un golpe significativo al narcotráfico regional, la desarticulación de una ruta de ingreso de drogas, cooperación internacional efectiva y un mensaje disuasivo a otras organizaciones.</p>`,
    category: 'Judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&q=80',
    status: 'published',
    featured: false,
    breaking: false,
    views: 15670,
    likes: 892,
    shares: 456,
    publishedAt: new Date(now - 10800000).toISOString(),
    createdAt: new Date(now - 10800000).toISOString(),
    updatedAt: new Date(now - 10800000).toISOString(),
    tags: ['narcotráfico', 'cámara federal', 'procesamiento', 'crimen organizado'],
  },
  {
    id: 205,
    title: 'Juicio por Abuso Sexual en Mendoza: Piden 20 Años de Prisión',
    slug: 'juicio-abuso-sexual-mendoza-piden-20-anos-prision',
    excerpt: 'La fiscalía solicitó 20 años de prisión para un hombre acusado de abusar sexualmente de menores en un caso que conmocionó a Mendoza.',
    content: `<p>La fiscalía de Mendoza solicitó una condena de 20 años de prisión para un hombre de 52 años acusado de abusar sexualmente de tres menores durante un período de dos años. El juicio oral se desarrolla en la ciudad de Mendoza con estrictas medidas de protección para las víctimas.</p>

<h2>El Caso</h2>

<p>Los abusos habrían ocurrido entre 2021 y 2023 en el domicilio del acusado, quien tenía una relación de confianza con las familias de las víctimas. Las menores, de entre 8 y 12 años al momento de los hechos, finalmente revelaron la situación a sus padres.</p>

<h2>El Juicio</h2>

<p>La fiscalía presentó testimonios de las víctimas en Cámara Gesell, pericias psicológicas, declaraciones de familiares, evidencia digital y testimonios de profesionales que atendieron a las niñas.</p>

<h2>Pedido Fiscal</h2>

<p>La fiscal solicitó 20 años por la gravedad de los hechos, reiteración de los abusos, edad de las víctimas, abuso de confianza y daño psicológico causado.</p>

<h2>Protección de Víctimas</h2>

<p>Durante el juicio se implementaron declaraciones sin presencia del acusado, uso de Cámara Gesell, prohibición de difusión de identidades y acompañamiento permanente.</p>`,
    category: 'Judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=1200&q=80',
    status: 'published',
    featured: true,
    breaking: false,
    views: 19840,
    likes: 1456,
    shares: 892,
    publishedAt: new Date(now - 14400000).toISOString(),
    createdAt: new Date(now - 14400000).toISOString(),
    updatedAt: new Date(now - 14400000).toISOString(),
    tags: ['abuso sexual', 'menores', 'justicia', 'Mendoza', 'protección infantil'],
  },
];

export default judicialNews;
