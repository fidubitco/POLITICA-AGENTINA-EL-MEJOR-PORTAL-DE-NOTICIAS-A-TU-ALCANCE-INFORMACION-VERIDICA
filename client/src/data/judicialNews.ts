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
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dr. Roberto Martínez - Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop&q=80&auto=format',
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
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
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
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=675&fit=crop&q=80&auto=format',
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
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&h=675&fit=crop&q=80&auto=format',
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
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=1200&h=675&fit=crop&q=80&auto=format',
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
  
  // BATCH 2 - 11 NOTICIAS JUDICIALES ADICIONALES
  {
    id: 206,
    title: 'Corte Suprema Falla a Favor de la Libertad de Expresión en Caso Emblemático',
    slug: 'corte-suprema-falla-favor-libertad-expresion',
    excerpt: 'La Corte Suprema de Justicia emitió un fallo histórico protegiendo la libertad de expresión y el derecho a la información pública en Argentina.',
    content: `<p>La Corte Suprema de Justicia de la Nación emitió un fallo unánime que refuerza la protección constitucional de la libertad de expresión y el acceso a la información pública, estableciendo un precedente importante para el periodismo argentino.</p>

<h2>El Caso</h2>
<p>El caso se originó cuando un periodista fue demandado por difamación tras publicar una investigación sobre irregularidades en contratos públicos. El demandante, un funcionario público, solicitaba una indemnización millonaria y la prohibición de publicar sobre el tema.</p>

<h2>El Fallo</h2>
<p>La Corte estableció que las figuras públicas tienen un umbral más alto de tolerancia a la crítica, que el interés público prevalece sobre el honor individual cuando se trata de funcionarios, que la libertad de prensa es esencial para la democracia y que las restricciones previas a la publicación son inconstitucionales.</p>

<h3>Doctrina Campillay Reforzada</h3>
<p>El fallo refuerza la doctrina Campillay, estableciendo que los periodistas que citan fuentes oficiales y actúan con diligencia profesional están protegidos, incluso si la información resulta ser incorrecta posteriormente.</p>

<h2>Impacto</h2>
<p>Este fallo representa un avance significativo en la protección del periodismo de investigación, establece límites claros a las demandas abusivas contra periodistas, refuerza el derecho ciudadano a la información pública y protege la investigación de corrupción.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dr. Carlos Méndez - Análisis Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: true,
    breaking: false,
    views: 28340,
    likes: 2145,
    shares: 1678,
    publishedAt: new Date(now - 18000000).toISOString(),
    createdAt: new Date(now - 18000000).toISOString(),
    updatedAt: new Date(now - 18000000).toISOString(),
    tags: ['Corte Suprema', 'libertad de expresión', 'periodismo', 'derecho constitucional'],
  },
  {
    id: 207,
    title: 'Condena Histórica por Delitos de Lesa Humanidad en Tucumán',
    slug: 'condena-historica-delitos-lesa-humanidad-tucuman',
    excerpt: 'Un tribunal federal de Tucumán condenó a prisión perpetua a tres ex militares por crímenes de lesa humanidad cometidos durante la última dictadura militar.',
    content: `<p>Un tribunal federal de Tucumán dictó sentencia en un juicio histórico, condenando a prisión perpetua a tres ex militares por su participación en crímenes de lesa humanidad durante la última dictadura militar argentina (1976-1983).</p>

<h2>Los Acusados</h2>
<p>Los condenados son tres ex oficiales del Ejército Argentino que operaban en centros clandestinos de detención en la provincia de Tucumán. Los delitos incluyen privación ilegal de la libertad, tormentos agravados, homicidio agravado y apropiación de menores.</p>

<h2>Las Víctimas</h2>
<p>El juicio abordó casos de 47 víctimas, incluyendo estudiantes universitarios, trabajadores, dirigentes sindicales y activistas políticos. Muchas de las víctimas permanecen desaparecidas hasta el día de hoy.</p>

<h3>Testimonios Clave</h3>
<p>El tribunal escuchó testimonios de sobrevivientes que relataron las torturas sufridas, familiares de desaparecidos que buscan verdad y justicia, peritos que analizaron documentación militar y testigos que identificaron a los responsables.</p>

<h2>Significado del Fallo</h2>
<p>Esta sentencia representa un nuevo paso en la búsqueda de verdad y justicia en Argentina, reafirma que los crímenes de lesa humanidad son imprescriptibles, envía un mensaje de que no hay impunidad y honra la memoria de las víctimas.</p>

<h2>Contexto</h2>
<p>Argentina ha sido pionera en América Latina en juzgar crímenes de la dictadura, con más de 1,000 condenados desde la reapertura de los juicios en 2006, tras la anulación de las leyes de impunidad.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: true,
    breaking: false,
    views: 35670,
    likes: 3245,
    shares: 2456,
    publishedAt: new Date(now - 21600000).toISOString(),
    createdAt: new Date(now - 21600000).toISOString(),
    updatedAt: new Date(now - 21600000).toISOString(),
    tags: ['lesa humanidad', 'dictadura', 'justicia', 'derechos humanos', 'Tucumán'],
  },
  {
    id: 208,
    title: 'Juez Ordena Embargo Millonario en Causa por Evasión Fiscal',
    slug: 'juez-ordena-embargo-millonario-causa-evasion-fiscal',
    excerpt: 'Un juez federal ordenó el embargo de bienes por más de $10,000 millones en una causa por evasión fiscal que involucra a empresarios y contadores.',
    content: `<p>Un juez federal de Buenos Aires ordenó medidas cautelares por más de $10,000 millones en una compleja causa de evasión fiscal que involucra a un grupo empresario, sus directivos y una red de contadores y estudios jurídicos.</p>

<h2>La Investigación</h2>
<p>La causa se inició tras una denuncia de la AFIP que detectó un esquema de evasión mediante facturas apócrifas, empresas fantasma en paraísos fiscales, triangulación de operaciones y subfacturación de exportaciones.</p>

<h3>Modus Operandi</h3>
<p>Los investigadores determinaron que el grupo empresario creaba empresas fantasma que emitían facturas falsas, estas facturas se usaban para deducir impuestos ilegalmente, el dinero se fugaba a cuentas offshore y se reingresaba como préstamos ficticios.</p>

<h2>Los Imputados</h2>
<p>La causa involucra a 15 personas, incluyendo empresarios titulares de empresas del sector agropecuario, contadores que diseñaron el esquema, abogados que crearon las estructuras offshore y testaferros que prestaban sus nombres.</p>

<h2>Medidas Cautelares</h2>
<p>El juez ordenó embargo de cuentas bancarias, inhibición general de bienes, prohibición de salida del país, secuestro de documentación contable y bloqueo de acciones y participaciones societarias.</p>

<h3>Monto Evadido</h3>
<p>Según la AFIP, el monto evadido supera los $10,000 millones en impuestos no pagados durante el período 2018-2023, incluyendo IVA, Ganancias, Bienes Personales y derechos de exportación.</p>

<h2>Próximos Pasos</h2>
<p>La fiscalía está completando la investigación con peritajes contables pendientes, rastreo de fondos en el exterior, identificación de todos los beneficiarios y cuantificación exacta del daño fiscal.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dra. Patricia Fernández - Economía y Derecho',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: false,
    breaking: false,
    views: 22450,
    likes: 1567,
    shares: 892,
    publishedAt: new Date(now - 25200000).toISOString(),
    createdAt: new Date(now - 25200000).toISOString(),
    updatedAt: new Date(now - 25200000).toISOString(),
    tags: ['evasión fiscal', 'AFIP', 'embargo', 'justicia tributaria'],
  },
  {
    id: 209,
    title: 'Absuelven a Médico Acusado de Mala Praxis Tras 5 Años de Juicio',
    slug: 'absuelven-medico-acusado-mala-praxis',
    excerpt: 'Un tribunal de Mar del Plata absolvió a un médico cirujano acusado de mala praxis, tras un extenso juicio que duró cinco años y generó debate en la comunidad médica.',
    content: `<p>Un tribunal de Mar del Plata absolvió por unanimidad a un médico cirujano acusado de mala praxis en una operación realizada en 2019. El fallo pone fin a un proceso judicial que duró cinco años y generó intenso debate sobre la responsabilidad médica.</p>

<h2>El Caso</h2>
<p>El médico fue acusado de negligencia tras una cirugía de vesícula que derivó en complicaciones postoperatorias. La familia del paciente alegaba que el profesional no había tomado todos los recaudos necesarios y que las complicaciones se debieron a errores durante la intervención.</p>

<h3>La Defensa</h3>
<p>La defensa del médico argumentó que se siguieron todos los protocolos establecidos, las complicaciones fueron una consecuencia conocida del procedimiento, se actuó correctamente ante las complicaciones y el paciente fue informado de todos los riesgos.</p>

<h2>Peritajes Médicos</h2>
<p>El tribunal ordenó múltiples peritajes que concluyeron que la técnica quirúrgica fue correcta, los protocolos de seguridad se cumplieron, la atención postoperatoria fue adecuada y las complicaciones no eran previsibles ni evitables.</p>

<h2>El Fallo</h2>
<p>Los jueces consideraron que no hubo negligencia ni impericia, que las complicaciones fueron una consecuencia no imputable al médico, que se cumplieron todos los estándares de atención y que el consentimiento informado fue adecuado.</p>

<h3>Impacto en la Medicina</h3>
<p>El caso generó debate sobre la medicina defensiva, el aumento de juicios contra médicos, la necesidad de protocolos claros y el equilibrio entre derechos de pacientes y profesionales.</p>

<h2>Reacciones</h2>
<p>Las asociaciones médicas celebraron el fallo como un reconocimiento a la labor profesional, mientras que organizaciones de pacientes pidieron mayor transparencia en los procesos de atención médica.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dr. Martín Rodríguez - Derecho Médico',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: false,
    breaking: false,
    views: 18920,
    likes: 1234,
    shares: 678,
    publishedAt: new Date(now - 28800000).toISOString(),
    createdAt: new Date(now - 28800000).toISOString(),
    updatedAt: new Date(now - 28800000).toISOString(),
    tags: ['mala praxis', 'medicina', 'absolución', 'responsabilidad profesional'],
  },
  {
    id: 210,
    title: 'Fiscal Pide Juicio Oral para Banda que Robaba Autos de Alta Gama',
    slug: 'fiscal-pide-juicio-oral-banda-robaba-autos-alta-gama',
    excerpt: 'La fiscalía solicitó la elevación a juicio oral de una causa contra una banda especializada en el robo de vehículos de alta gama que operaba en CABA y GBA.',
    content: `<p>La fiscalía de San Isidro solicitó la elevación a juicio oral de una causa contra 12 personas acusadas de integrar una organización criminal dedicada al robo de vehículos de alta gama, su desarmado y venta de autopartes.</p>

<h2>La Organización</h2>
<p>La banda operaba con una estructura jerárquica que incluía "marcadores" que identificaban los vehículos objetivo, "arrebatadores" que ejecutaban los robos, "desarmadores" en talleres clandestinos y "vendedores" de autopartes en el mercado negro.</p>

<h3>Modus Operandi</h3>
<p>Los delincuentes seguían a las víctimas desde concesionarias o countries, esperaban el momento oportuno para el asalto, utilizaban armas de fuego para intimidar, llevaban los vehículos a talleres clandestinos y los desarmaban en menos de 24 horas.</p>

<h2>La Investigación</h2>
<p>La Policía Federal realizó una investigación de 8 meses que incluyó seguimientos y vigilancia, escuchas telefónicas autorizadas, rastreo de autopartes vendidas online y coordinación con fiscalías de distintos partidos.</p>

<h3>Allanamientos</h3>
<p>Se realizaron 15 allanamientos simultáneos en CABA y GBA, con secuestro de 8 vehículos completos, autopartes por valor de $50 millones, 5 armas de fuego y documentación falsa.</p>

<h2>Víctimas</h2>
<p>Se identificaron más de 40 víctimas en el último año, con vehículos de marcas premium como Audi, BMW, Mercedes Benz y Toyota (modelos 4x4).</p>

<h2>Delitos Imputados</h2>
<p>La fiscalía acusa a los imputados de asociación ilícita, robo agravado por uso de armas, encubrimiento agravado y falsificación de documentos.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Policial',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: false,
    breaking: false,
    views: 16780,
    likes: 987,
    shares: 543,
    publishedAt: new Date(now - 32400000).toISOString(),
    createdAt: new Date(now - 32400000).toISOString(),
    updatedAt: new Date(now - 32400000).toISOString(),
    tags: ['robo de autos', 'crimen organizado', 'seguridad', 'GBA'],
  },
  {
    id: 211,
    title: 'Jueza Declara Inconstitucional Ley de Alquileres en Fallo Innovador',
    slug: 'jueza-declara-inconstitucional-ley-alquileres',
    excerpt: 'Una jueza de primera instancia declaró la inconstitucionalidad de artículos clave de la Ley de Alquileres, generando debate sobre regulación del mercado inmobiliario.',
    content: `<p>Una jueza civil de la Ciudad de Buenos Aires declaró la inconstitucionalidad de varios artículos de la Ley de Alquileres (27.551), en un fallo que podría sentar precedente sobre la regulación del mercado inmobiliario argentino.</p>

<h2>El Caso</h2>
<p>El fallo se dio en el marco de una demanda de desalojo donde el propietario alegaba que la ley vigente lo perjudicaba económicamente al establecer contratos mínimos de 3 años, actualizaciones anuales con índice específico y limitaciones a las garantías exigibles.</p>

<h2>Argumentos de la Jueza</h2>
<p>La magistrada consideró que la ley vulnera el derecho de propiedad garantizado constitucionalmente, restringe excesivamente la libertad contractual, genera efectos contrarios a los buscados (reducción de oferta) y no respeta el principio de razonabilidad.</p>

<h3>Análisis Económico</h3>
<p>El fallo incluye un análisis económico que demuestra que tras la sanción de la ley, la oferta de alquileres se redujo un 40%, los precios aumentaron por encima de la inflación, muchos propietarios retiraron sus inmuebles del mercado y aumentó la informalidad.</p>

<h2>Reacciones</h2>
<p>El fallo generó reacciones encontradas. Los propietarios y desarrolladores celebraron la decisión, inquilinos y organizaciones sociales expresaron preocupación, el Gobierno anunció que apelará y juristas debaten sobre los límites de la regulación estatal.</p>

<h2>Precedente Judicial</h2>
<p>Si bien el fallo solo tiene efectos para el caso concreto, podría sentar precedente para futuros casos similares y generar un debate más amplio sobre la constitucionalidad de la ley.</p>

<h2>Contexto</h2>
<p>La Ley de Alquileres fue sancionada en 2020 con el objetivo de proteger a los inquilinos, pero ha sido objeto de críticas por sus efectos no deseados en el mercado inmobiliario.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dr. Fernando Castro - Derecho Civil',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: true,
    breaking: false,
    views: 31240,
    likes: 2345,
    shares: 1789,
    publishedAt: new Date(now - 36000000).toISOString(),
    createdAt: new Date(now - 36000000).toISOString(),
    updatedAt: new Date(now - 36000000).toISOString(),
    tags: ['ley de alquileres', 'inconstitucionalidad', 'derecho civil', 'propiedad'],
  },
  {
    id: 212,
    title: 'Condenan a Empresario por Trabajo Esclavo en Campo de Mendoza',
    slug: 'condenan-empresario-trabajo-esclavo-campo-mendoza',
    excerpt: 'Un empresario vitivinícola fue condenado a 8 años de prisión por mantener a trabajadores rurales en condiciones de esclavitud en Mendoza.',
    content: `<p>Un tribunal federal de Mendoza condenó a 8 años de prisión a un empresario vitivinícola por el delito de reducción a servidumbre, tras comprobarse que mantenía a trabajadores rurales en condiciones de esclavitud en su establecimiento.</p>

<h2>El Caso</h2>
<p>La investigación se inició tras una denuncia anónima que alertaba sobre las condiciones laborales en una finca vitivinícola. Una inspección conjunta de la AFIP, el Ministerio de Trabajo y la Justicia Federal descubrió la situación de explotación.</p>

<h3>Condiciones Encontradas</h3>
<p>Los trabajadores vivían en condiciones infrahumanas: viviendas precarias sin servicios básicos, hacinamiento de familias enteras, falta de agua potable y electricidad, ausencia de instalaciones sanitarias y alimentación insuficiente.</p>

<h2>Explotación Laboral</h2>
<p>Los trabajadores eran sometidos a jornadas de más de 12 horas diarias, salarios por debajo del mínimo legal, retención de documentos personales, prohibición de abandonar el establecimiento, amenazas y violencia física y trabajo infantil.</p>

<h3>Las Víctimas</h3>
<p>Se identificaron 23 víctimas, incluyendo trabajadores bolivianos y paraguayos, mujeres y niños, familias completas y personas en situación de vulnerabilidad.</p>

<h2>El Fallo</h2>
<p>El tribunal consideró probado el delito de reducción a servidumbre agravado, condenó al empresario a 8 años de prisión, ordenó el pago de indemnizaciones millonarias y dispuso la inhabilitación para ejercer actividad comercial.</p>

<h2>Contexto</h2>
<p>Este caso se suma a otros similares en el sector agrícola argentino, donde persisten prácticas de explotación laboral, especialmente de trabajadores migrantes en situación de vulnerabilidad.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: true,
    breaking: false,
    views: 27650,
    likes: 2134,
    shares: 1567,
    publishedAt: new Date(now - 39600000).toISOString(),
    createdAt: new Date(now - 39600000).toISOString(),
    updatedAt: new Date(now - 39600000).toISOString(),
    tags: ['trabajo esclavo', 'explotación laboral', 'derechos humanos', 'Mendoza'],
  },
  {
    id: 213,
    title: 'Cámara Confirma Prisión Preventiva para Acusados de Trata de Personas',
    slug: 'camara-confirma-prision-preventiva-acusados-trata-personas',
    excerpt: 'La Cámara Federal confirmó la prisión preventiva de 8 personas acusadas de integrar una red de trata de personas con fines de explotación sexual.',
    content: `<p>La Cámara Federal de Apelaciones de Córdoba confirmó la prisión preventiva de 8 personas acusadas de integrar una red de trata de personas con fines de explotación sexual que operaba en varias provincias del centro del país.</p>

<h2>La Red Criminal</h2>
<p>La organización captaba mujeres jóvenes en situación de vulnerabilidad mediante falsas ofertas de trabajo, las trasladaba a otras provincias, las retenía mediante violencia y amenazas y las explotaba sexualmente en prostíbulos clandestinos.</p>

<h3>Modus Operandi</h3>
<p>Los tratantes utilizaban redes sociales para contactar víctimas, ofrecían trabajos falsos con buenos salarios, pagaban el traslado a otras ciudades, retenían documentos y pertenencias y sometían a las víctimas mediante violencia y drogas.</p>

<h2>La Investigación</h2>
<p>La Procuraduría de Trata y Explotación de Personas (PROTEX) coordinó una investigación de 10 meses que incluyó escuchas telefónicas, seguimientos, allanamientos simultáneos y rescate de víctimas.</p>

<h3>Víctimas Rescatadas</h3>
<p>Se rescataron 15 mujeres de entre 18 y 25 años, provenientes de provincias del norte argentino y países limítrofes, que fueron sometidas a explotación sexual durante meses o años.</p>

<h2>Decisión de la Cámara</h2>
<p>Los camaristas confirmaron la prisión preventiva considerando la gravedad de los delitos investigados, el riesgo de fuga de los imputados, el peligro de entorpecimiento de la investigación y la necesidad de proteger a las víctimas.</p>

<h2>Asistencia a Víctimas</h2>
<p>Las víctimas rescatadas reciben asistencia integral: atención psicológica especializada, asesoramiento legal gratuito, alojamiento en refugios seguros y programas de reinserción social y laboral.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dra. Laura Martínez - PROTEX',
    imageUrl: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: true,
    breaking: false,
    views: 24890,
    likes: 1876,
    shares: 1345,
    publishedAt: new Date(now - 43200000).toISOString(),
    createdAt: new Date(now - 43200000).toISOString(),
    updatedAt: new Date(now - 43200000).toISOString(),
    tags: ['trata de personas', 'explotación sexual', 'PROTEX', 'derechos humanos'],
  },
  {
    id: 214,
    title: 'Tribunal Anula Elección en Sindicato por Irregularidades',
    slug: 'tribunal-anula-eleccion-sindicato-irregularidades',
    excerpt: 'Un tribunal laboral anuló la elección de autoridades en un sindicato metalúrgico tras comprobarse graves irregularidades en el proceso electoral.',
    content: `<p>Un tribunal laboral de Buenos Aires anuló la elección de autoridades realizada en un importante sindicato metalúrgico, tras comprobarse graves irregularidades que viciaron el proceso electoral y vulneraron los derechos de los afiliados.</p>

<h2>Las Irregularidades</h2>
<p>La justicia constató múltiples irregularidades: padrones adulterados con afiliados inexistentes o fallecidos, impedimento de fiscalización a listas opositoras, uso de recursos sindicales para campaña oficialista, intimidación a delegados opositores y conteo irregular de votos.</p>

<h3>La Denuncia</h3>
<p>Una lista opositora denunció las irregularidades inmediatamente después de la elección, aportando pruebas documentales, testimonios de afiliados y videos que mostraban las irregularidades.</p>

<h2>La Investigación</h2>
<p>El tribunal ordenó una investigación exhaustiva que incluyó peritaje del padrón electoral, análisis de las actas de escrutinio, testimonios de fiscales y afiliados y revisión de la documentación contable.</p>

<h2>El Fallo</h2>
<p>Los jueces consideraron que las irregularidades fueron graves y sistemáticas, afectaron el resultado de la elección, vulneraron los derechos de los afiliados y violaron el estatuto sindical.</p>

<h3>Medidas Ordenadas</h3>
<p>El tribunal ordenó anular la elección, designar una comisión normalizadora, depurar el padrón de afiliados, convocar a nuevas elecciones en 90 días y garantizar transparencia en el nuevo proceso.</p>

<h2>Contexto</h2>
<p>Este caso se suma a otros similares en el movimiento sindical argentino, donde persisten prácticas antidemocráticas que dificultan la renovación de dirigencias.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dr. Ricardo Gómez - Derecho Laboral',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: false,
    breaking: false,
    views: 19340,
    likes: 1234,
    shares: 789,
    publishedAt: new Date(now - 46800000).toISOString(),
    createdAt: new Date(now - 46800000).toISOString(),
    updatedAt: new Date(now - 46800000).toISOString(),
    tags: ['sindicatos', 'elecciones', 'democracia sindical', 'derecho laboral'],
  },
  {
    id: 215,
    title: 'Procesan a Ex Funcionarios por Irregularidades en Obra Pública',
    slug: 'procesan-ex-funcionarios-irregularidades-obra-publica',
    excerpt: 'Un juez federal procesó a cinco ex funcionarios por presuntas irregularidades en la adjudicación de obras públicas durante la gestión anterior.',
    content: `<p>Un juez federal de Comodoro Rivadavia procesó a cinco ex funcionarios provinciales por presuntas irregularidades en la adjudicación y ejecución de obras públicas, en una causa que investiga sobreprecios y direccionamiento de licitaciones.</p>

<h2>La Causa</h2>
<p>La investigación se centra en la construcción de rutas y edificios públicos entre 2015 y 2019, con un presupuesto total de más de $2,000 millones. Se investigan sobreprecios estimados en 30-40%, direccionamiento de licitaciones, certificaciones de obras no realizadas y pagos anticipados irregulares.</p>

<h3>Los Procesados</h3>
<p>Entre los procesados se encuentran el ex ministro de Obras Públicas, el ex subsecretario de Infraestructura, tres directores de áreas técnicas y varios empresarios contratistas.</p>

<h2>Las Pruebas</h2>
<p>El juez basó su decisión en peritajes técnicos que detectaron sobreprecios, análisis contables de las empresas involucradas, testimonios de empleados públicos y documentación que prueba el direccionamiento.</p>

<h2>Medidas Cautelares</h2>
<p>El magistrado ordenó embargo de bienes por el monto presuntamente defraudado, prohibición de salida del país, inhibición general de bienes y secuestro de documentación adicional.</p>

<h3>Delitos Imputados</h3>
<p>Los ex funcionarios están acusados de administración fraudulenta, negociaciones incompatibles con la función pública, cohecho y asociación ilícita.</p>

<h2>Impacto</h2>
<p>El caso genera debate sobre los controles en la obra pública, la necesidad de mayor transparencia en las licitaciones y la importancia de la rendición de cuentas de los funcionarios.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Redacción Judicial',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: false,
    breaking: false,
    views: 21560,
    likes: 1456,
    shares: 987,
    publishedAt: new Date(now - 50400000).toISOString(),
    createdAt: new Date(now - 50400000).toISOString(),
    updatedAt: new Date(now - 50400000).toISOString(),
    tags: ['obra pública', 'corrupción', 'procesamiento', 'sobreprecios'],
  },
  {
    id: 216,
    title: 'Jueza Otorga Amparo para Acceso a Medicamento de Alto Costo',
    slug: 'jueza-otorga-amparo-acceso-medicamento-alto-costo',
    excerpt: 'Una jueza civil ordenó a una obra social proveer un medicamento oncológico de alto costo a un paciente, en un fallo que refuerza el derecho a la salud.',
    content: `<p>Una jueza civil de la Ciudad de Buenos Aires hizo lugar a un amparo y ordenó a una obra social proveer un medicamento oncológico de alto costo a un paciente con cáncer, en un fallo que refuerza la protección del derecho constitucional a la salud.</p>

<h2>El Caso</h2>
<p>Un paciente de 45 años con cáncer de pulmón avanzado necesitaba un tratamiento de inmunoterapia cuyo costo mensual supera los $500,000. Su obra social rechazó la cobertura alegando que el medicamento no estaba en el vademécum y que existían alternativas más económicas.</p>

<h3>El Amparo</h3>
<p>El paciente presentó un amparo por la salud solicitando que se ordenara la cobertura inmediata del tratamiento, argumentando que era el único tratamiento efectivo según su oncólogo y que la demora ponía en riesgo su vida.</p>

<h2>El Fallo</h2>
<p>La jueza consideró que el derecho a la salud es un derecho humano fundamental, la obra social no puede negar cobertura por razones económicas, el criterio médico debe prevalecer sobre consideraciones administrativas y la urgencia del caso justifica una orden inmediata.</p>

<h3>Precedentes</h3>
<p>El fallo cita jurisprudencia de la Corte Suprema que establece que las obras sociales y prepagas no pueden negar prestaciones médicas necesarias, incluso si no están en el PMO, cuando están indicadas por el médico tratante.</p>

<h2>Cobertura Ordenada</h2>
<p>La jueza ordenó cobertura del 100% del medicamento, provisión inmediata sin demoras administrativas, cobertura de estudios complementarios y prohibición de suspender el tratamiento.</p>

<h2>Impacto</h2>
<p>El fallo refuerza la protección del derecho a la salud, establece límites a las negativas de cobertura y reafirma que la salud no puede estar condicionada por razones económicas.</p>`,
    category: 'judicial',
    categorySlug: 'judicial',
    author: 'Dra. Ana Belén Torres - Derecho de la Salud',
    imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&h=675&fit=crop&q=80&auto=format',
    status: 'published',
    featured: false,
    breaking: false,
    views: 17890,
    likes: 1123,
    shares: 678,
    publishedAt: new Date(now - 54000000).toISOString(),
    createdAt: new Date(now - 54000000).toISOString(),
    updatedAt: new Date(now - 54000000).toISOString(),
    tags: ['amparo', 'derecho a la salud', 'medicamentos', 'obra social'],
  },
];

export default judicialNews;
