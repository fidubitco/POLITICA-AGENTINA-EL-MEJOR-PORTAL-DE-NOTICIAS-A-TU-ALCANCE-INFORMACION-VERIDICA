/**
 * 📰 NOTICIAS ACTUALES - ARGENTINA 2025
 * Noticias basadas en trending topics y portales principales
 */

import { Article } from './allNews';

export const currentNews: Article[] = [
  // POLÍTICA
  {
    id: 101,
    title: 'Milei Presenta Reforma Laboral Integral en el Congreso',
    slug: 'milei-presenta-reforma-laboral-integral-congreso',
    excerpt: 'El presidente Javier Milei presentó ante el Congreso Nacional un proyecto de reforma laboral que busca modernizar las relaciones laborales en Argentina. La iniciativa genera debate entre distintos sectores.',
    content: `El presidente Javier Milei presentó formalmente ante el Congreso de la Nación un ambicioso proyecto de reforma laboral que busca transformar las relaciones laborales en Argentina.

## Principales Puntos de la Reforma

La propuesta incluye modificaciones sustanciales en varios aspectos del derecho laboral argentino:

- **Flexibilización de contratos**: Nuevas modalidades de contratación adaptadas a la economía digital
- **Modernización de convenios**: Actualización del sistema de negociación colectiva
- **Indemnizaciones**: Modificación del régimen de despidos
- **Jornada laboral**: Opciones de trabajo remoto y horarios flexibles

## Reacciones del Sector Sindical

Los principales gremios expresaron su preocupación por algunos aspectos de la reforma. La CGT convocó a una reunión extraordinaria para analizar el proyecto y definir una postura unificada.

## Apoyo Empresarial

Las cámaras empresariales manifestaron su respaldo a la iniciativa, destacando la necesidad de modernizar el marco regulatorio laboral para aumentar la competitividad.

## Debate Parlamentario

El proyecto ingresó a las comisiones de Legislación del Trabajo de ambas cámaras, donde se espera un intenso debate durante las próximas semanas.

## Impacto Económico

Economistas consultados señalan que la reforma podría impactar positivamente en la generación de empleo formal, aunque advierten sobre la necesidad de proteger los derechos adquiridos de los trabajadores.`,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800',
    category: 'politica',
    author: 'Redacción Política Argentina',
    publishedAt: new Date().toISOString(),
    views: 15420,
    likes: 892,
    tags: ['Milei', 'reforma laboral', 'congreso', 'política', 'economía'],
    status: 'published',
    featured: true,
    breaking: true,
  },
  {
    id: 102,
    title: 'Cristina Kirchner Convoca a Unidad del Peronismo ante Nuevas Medidas',
    slug: 'cristina-kirchner-convoca-unidad-peronismo',
    excerpt: 'La expresidenta Cristina Fernández de Kirchner realizó un llamado a la unidad del peronismo frente a las políticas del gobierno nacional. El mensaje generó repercusiones en todo el arco político.',
    content: `La expresidenta Cristina Fernández de Kirchner realizó un contundente llamado a la unidad del peronismo en un acto realizado en la provincia de Buenos Aires.

## El Mensaje de CFK

En su discurso, la exmandataria enfatizó la necesidad de que el peronismo se mantenga unido para enfrentar las políticas del gobierno actual. "Es momento de dejar de lado las diferencias internas y trabajar juntos por el pueblo argentino", expresó.

## Reacciones en el PJ

Los principales referentes del Partido Justicialista manifestaron su adhesión al llamado de Cristina Kirchner. Gobernadores e intendentes peronistas expresaron su compromiso con la unidad del movimiento.

## Críticas al Gobierno

Durante su intervención, la expresidenta cuestionó duramente las medidas económicas implementadas por la gestión de Javier Milei, particularmente en materia de ajuste fiscal y política social.

## Estrategia Electoral

Analistas políticos interpretan este movimiento como parte de la estrategia del peronismo de cara a las próximas elecciones legislativas, buscando consolidar una alternativa política viable.

## Impacto en la Oposición

El llamado de CFK también generó reacciones en otros sectores de la oposición, algunos de los cuales manifestaron su disposición al diálogo para construir acuerdos amplios.`,
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    category: 'politica',
    author: 'Redacción Política Argentina',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    views: 12350,
    likes: 745,
    tags: ['Cristina Kirchner', 'peronismo', 'política', 'oposición'],
    status: 'published',
    featured: true,
    breaking: false,
  },
  
  // ECONOMÍA
  {
    id: 103,
    title: 'Dólar Blue Alcanza Nuevo Récord: Análisis y Perspectivas',
    slug: 'dolar-blue-alcanza-nuevo-record-analisis',
    excerpt: 'La cotización del dólar blue marcó un nuevo máximo histórico en la jornada de hoy. Economistas analizan las causas y proyectan el comportamiento de la divisa en las próximas semanas.',
    content: `La cotización del dólar blue alcanzó un nuevo récord histórico en la jornada de hoy, generando preocupación en diversos sectores de la economía argentina.

## Cotización Actual

El dólar blue cerró la jornada en $1,250 para la venta, marcando un incremento del 3.5% respecto al cierre anterior. La brecha con el dólar oficial se amplió hasta el 45%.

## Causas del Aumento

Los analistas identifican varios factores que explican la suba:

- **Incertidumbre política**: Las tensiones en el Congreso afectan las expectativas
- **Demanda estacional**: Aumento de la demanda por turismo y ahorro
- **Restricciones cambiarias**: Limitaciones en el acceso al mercado oficial
- **Expectativas inflacionarias**: Proyecciones de inflación elevada

## Impacto en la Economía

El aumento del dólar paralelo tiene consecuencias directas:

- **Inflación**: Presión sobre precios de productos importados
- **Ahorro**: Mayor demanda de dólares como resguardo de valor
- **Inversiones**: Incertidumbre para proyectos a largo plazo

## Medidas del Gobierno

El Banco Central anunció que continuará interviniendo en el mercado cambiario para mantener la estabilidad del tipo de cambio oficial.

## Proyecciones

Economistas consultados proyectan que la cotización podría mantenerse volátil en las próximas semanas, dependiendo de la evolución de las variables macroeconómicas.`,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category: 'economia',
    author: 'Redacción Economía',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    views: 18920,
    likes: 1024,
    tags: ['dólar', 'economía', 'finanzas', 'blue'],
    status: 'published',
    featured: true,
    breaking: true,
  },
  {
    id: 104,
    title: 'Inflación de Enero: Datos Oficiales y Análisis del INDEC',
    slug: 'inflacion-enero-datos-oficiales-indec',
    excerpt: 'El INDEC publicó los datos oficiales de inflación correspondientes al mes de enero. Las cifras muestran una desaceleración respecto a diciembre, aunque se mantienen en niveles elevados.',
    content: `El Instituto Nacional de Estadística y Censos (INDEC) dio a conocer los datos oficiales de inflación correspondientes al mes de enero de 2025.

## Cifras Principales

La inflación de enero se ubicó en el 20.6%, mostrando una desaceleración respecto al 25.5% registrado en diciembre. En términos interanuales, la inflación alcanza el 254.2%.

## Rubros con Mayor Aumento

Los sectores que más aumentaron fueron:

- **Alimentos y bebidas**: 22.8%
- **Indumentaria**: 21.4%
- **Transporte**: 19.7%
- **Salud**: 18.9%
- **Educación**: 17.2%

## Análisis de Economistas

Especialistas consultados destacan que, si bien la desaceleración es positiva, los niveles de inflación siguen siendo preocupantes para el poder adquisitivo de los argentinos.

## Impacto en Salarios

Los sindicatos ya iniciaron negociaciones paritarias buscando recuperar el poder de compra perdido. Se espera que las negociaciones sean intensas en los próximos meses.

## Proyecciones

El Gobierno proyecta una inflación mensual descendente para los próximos meses, aunque analistas privados mantienen proyecciones más conservadoras.

## Medidas Gubernamentales

El Ministerio de Economía ratificó su compromiso con el equilibrio fiscal como herramienta principal para controlar la inflación.`,
    imageUrl: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=800',
    category: 'economia',
    author: 'Redacción Economía',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    views: 14230,
    likes: 823,
    tags: ['inflación', 'INDEC', 'economía', 'precios'],
    status: 'published',
    featured: true,
    breaking: false,
  },

  // SOCIEDAD
  {
    id: 105,
    title: 'Universidades Públicas Anuncian Plan de Lucha por Presupuesto',
    slug: 'universidades-publicas-plan-lucha-presupuesto',
    excerpt: 'El Consejo Interuniversitario Nacional convocó a un plan de lucha en reclamo de mayor presupuesto para las universidades públicas. Se esperan movilizaciones en todo el país.',
    content: `El Consejo Interuniversitario Nacional (CIN) anunció un plan de lucha en reclamo de un aumento presupuestario para las universidades públicas argentinas.

## Reclamos Principales

Los rectores de las universidades nacionales exigen:

- **Aumento presupuestario**: Incremento del 40% en el presupuesto universitario
- **Salarios docentes**: Actualización salarial acorde a la inflación
- **Infraestructura**: Fondos para mantenimiento y obras
- **Becas estudiantiles**: Ampliación del sistema de becas

## Plan de Acción

El plan de lucha incluye:

- Movilizaciones en todo el país
- Clases públicas en plazas
- Campaña de concientización
- Audiencias con legisladores

## Apoyo Estudiantil

Las federaciones estudiantiles manifestaron su total respaldo al reclamo de los rectores y anunciaron su participación activa en las movilizaciones.

## Posición del Gobierno

El Ministerio de Capital Humano expresó su disposición al diálogo, aunque advirtió sobre las restricciones presupuestarias actuales.

## Impacto en las Clases

Por el momento, las actividades académicas continúan con normalidad, aunque no se descarta la posibilidad de medidas de fuerza si no hay respuestas concretas.

## Solidaridad Internacional

Universidades de otros países latinoamericanos expresaron su solidaridad con el reclamo de las universidades argentinas.`,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    category: 'sociedad',
    author: 'Redacción Sociedad',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    views: 9840,
    likes: 612,
    tags: ['educación', 'universidades', 'presupuesto', 'protesta'],
    status: 'published',
    featured: false,
    breaking: false,
  },

  // JUDICIAL
  {
    id: 106,
    title: 'Corte Suprema Define Competencia en Causa de Corrupción',
    slug: 'corte-suprema-define-competencia-causa-corrupcion',
    excerpt: 'La Corte Suprema de Justicia resolvió una disputa de competencia en una importante causa de corrupción. La decisión tiene implicancias para otros expedientes similares.',
    content: `La Corte Suprema de Justicia de la Nación emitió un fallo clave definiendo la competencia en una causa de corrupción que involucra a funcionarios públicos.

## Resolución del Máximo Tribunal

Por mayoría, la Corte determinó que la causa debe tramitar en la justicia federal, rechazando el planteo de incompetencia presentado por la defensa.

## Argumentos del Fallo

Los ministros fundamentaron su decisión en:

- La naturaleza de los delitos investigados
- La participación de fondos públicos nacionales
- Jurisprudencia previa del tribunal
- El interés federal comprometido

## Implicancias Legales

La resolución sienta precedente para otras causas similares que se encuentran en trámite en distintos fueros judiciales.

## Reacciones

Fiscales anticorrupción celebraron la decisión, mientras que las defensas analizan presentar recursos extraordinarios.

## Próximos Pasos

Con la definición de competencia, se espera que la causa avance en la etapa de instrucción en los próximos meses.

## Contexto

Este caso forma parte de una serie de investigaciones por presunta corrupción en la obra pública durante gestiones anteriores.`,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    category: 'judicial',
    author: 'Redacción Judicial',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    views: 7650,
    likes: 445,
    tags: ['corte suprema', 'judicial', 'corrupción', 'justicia'],
    status: 'published',
    featured: false,
    breaking: false,
  },

  // INTERNACIONAL
  {
    id: 107,
    title: 'Argentina Fortalece Relaciones Comerciales con Brasil',
    slug: 'argentina-fortalece-relaciones-comerciales-brasil',
    excerpt: 'Los presidentes de Argentina y Brasil se reunieron para avanzar en acuerdos comerciales bilaterales. Se espera la firma de convenios en sectores estratégicos.',
    content: `Los presidentes de Argentina y Brasil mantuvieron una reunión bilateral para fortalecer las relaciones comerciales entre ambos países.

## Acuerdos Alcanzados

Durante el encuentro se avanzó en:

- **Comercio bilateral**: Facilitación de intercambio comercial
- **Integración energética**: Proyectos conjuntos en energía
- **Infraestructura**: Obras de conectividad fronteriza
- **Cooperación tecnológica**: Desarrollo conjunto en sectores estratégicos

## Declaraciones

Ambos mandatarios destacaron la importancia histórica de la relación bilateral y expresaron su compromiso con la integración regional.

## Impacto Económico

Los acuerdos podrían incrementar el comercio bilateral en un 30% durante el próximo año, beneficiando a empresas de ambos países.

## Mercosur

Los presidentes ratificaron su compromiso con el fortalecimiento del Mercosur y la búsqueda de nuevos acuerdos comerciales con otros bloques.

## Próximos Pasos

Se conformarán comisiones binacionales para implementar los acuerdos alcanzados y monitorear su cumplimiento.`,
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    category: 'internacional',
    author: 'Redacción Internacional',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    views: 6420,
    likes: 378,
    tags: ['internacional', 'Brasil', 'comercio', 'Mercosur'],
    status: 'published',
    featured: false,
    breaking: false,
  },
];

export default currentNews;

