/**
 * 📰 MÁS NOTICIAS ACTUALES - ARGENTINA 2025
 * Ampliación de noticias trending
 */

import { Article } from './allNews';

export const moreCurrentNews: Article[] = [
  // POLÍTICA - 5 más
  {
    id: 108,
    title: 'Congreso Debate Ley de Bases con Modificaciones Clave',
    slug: 'congreso-debate-ley-bases-modificaciones',
    excerpt: 'El Congreso Nacional retoma el debate de la Ley de Bases con importantes modificaciones propuestas por bloques opositores. Se esperan negociaciones intensas.',
    content: `El Congreso Nacional retomó el debate de la Ley de Bases del gobierno de Javier Milei, con importantes modificaciones propuestas por diferentes bloques legislativos.

## Modificaciones Propuestas

Los principales cambios incluyen:
- Ajustes en la reforma del Estado
- Modificaciones en el régimen de inversiones
- Cambios en las facultades delegadas
- Actualizaciones en materia laboral

## Negociaciones

Los bloques opositores presentaron propuestas alternativas que buscan consensos para la aprobación de la ley. Se espera un intenso debate en comisiones.

## Posición del Oficialismo

El gobierno manifestó su disposición al diálogo, aunque advirtió que no aceptará modificaciones que desvirtúen el espíritu original de la ley.`,
    imageUrl: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=800',
    category: 'politica',
    categorySlug: 'politica',
    author: 'Redacción Política',
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    createdAt: new Date(Date.now() - 25200000).toISOString(),
    updatedAt: new Date(Date.now() - 25200000).toISOString(),
    views: 8920,
    likes: 534,
    shares: 178,
    tags: ['congreso', 'ley de bases', 'política', 'legislación'],
    status: 'published',
    featured: false,
    breaking: false,
  },
  {
    id: 109,
    title: 'Gobernadores Peronistas Se Reúnen Para Definir Estrategia',
    slug: 'gobernadores-peronistas-reunion-estrategia',
    excerpt: 'Los gobernadores del PJ convocaron a una cumbre para coordinar acciones frente a las políticas nacionales y definir la estrategia electoral.',
    content: `Los gobernadores peronistas se reunieron en Buenos Aires para coordinar una estrategia común frente a las políticas del gobierno nacional.

## Agenda de la Cumbre

Los temas centrales fueron:
- Distribución de recursos nacionales
- Obras públicas provinciales
- Estrategia electoral 2025
- Unidad del peronismo

## Acuerdos Alcanzados

Los mandatarios acordaron presentar un frente común en las negociaciones con el gobierno nacional y coordinar acciones legislativas.`,
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800',
    category: 'politica',
    categorySlug: 'politica',
    author: 'Redacción Política',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    updatedAt: new Date(Date.now() - 28800000).toISOString(),
    views: 7650,
    likes: 445,
    shares: 134,
    tags: ['peronismo', 'gobernadores', 'política provincial'],
    status: 'published',
    featured: false,
    breaking: false,
  },

  // ECONOMÍA - 5 más
  {
    id: 110,
    title: 'Banco Central Interviene Para Frenar Escalada del Dólar',
    slug: 'banco-central-interviene-frenar-dolar',
    excerpt: 'El BCRA vendió reservas por USD 150 millones para contener la suba del dólar oficial. La medida generó debate entre economistas.',
    content: `El Banco Central de la República Argentina (BCRA) intervino en el mercado cambiario vendiendo USD 150 millones de sus reservas para contener la escalada del tipo de cambio oficial.

## Intervención del BCRA

La entidad monetaria:
- Vendió USD 150 millones
- Logró estabilizar el tipo de cambio
- Redujo la brecha cambiaria
- Envió señales al mercado

## Debate Económico

La medida generó opiniones encontradas entre economistas, algunos la consideran necesaria mientras otros advierten sobre el impacto en las reservas.`,
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    category: 'economia',
    categorySlug: 'economia',
    author: 'Redacción Economía',
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    createdAt: new Date(Date.now() - 32400000).toISOString(),
    updatedAt: new Date(Date.now() - 32400000).toISOString(),
    views: 11240,
    likes: 678,
    shares: 234,
    tags: ['BCRA', 'dólar', 'reservas', 'economía'],
    status: 'published',
    featured: true,
    breaking: false,
  },

  // SOCIEDAD - 3 más
  {
    id: 111,
    title: 'Docentes Anuncian Paro Nacional Por Salarios',
    slug: 'docentes-paro-nacional-salarios',
    excerpt: 'Los gremios docentes convocaron a un paro nacional de 48 horas en reclamo de mejoras salariales y condiciones laborales.',
    content: `Los principales gremios docentes del país anunciaron un paro nacional de 48 horas en reclamo de aumentos salariales acordes a la inflación.

## Reclamos

Los docentes exigen:
- Aumento salarial del 35%
- Actualización por inflación
- Mejoras en infraestructura escolar
- Recursos para educación

## Impacto

El paro afectará a millones de estudiantes en todo el país. Los gremios manifestaron que es una medida de fuerza necesaria ante la falta de respuestas.`,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    category: 'sociedad',
    categorySlug: 'sociedad',
    author: 'Redacción Sociedad',
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    createdAt: new Date(Date.now() - 36000000).toISOString(),
    updatedAt: new Date(Date.now() - 36000000).toISOString(),
    views: 9340,
    likes: 567,
    shares: 189,
    tags: ['educación', 'docentes', 'paro', 'salarios'],
    status: 'published',
    featured: false,
    breaking: true,
  },
];

export default moreCurrentNews;
