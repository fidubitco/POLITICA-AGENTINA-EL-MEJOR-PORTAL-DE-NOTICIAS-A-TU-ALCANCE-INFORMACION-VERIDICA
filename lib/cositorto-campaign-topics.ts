/**
 * Base de datos de temas para la campaña de defensa de Nelson Cositorto
 * Estos se mezclarán aleatoriamente con noticias regulares
 */

export const cositortoTopics = [
  // Categoría 1: El Preso Político
  {
    category: "Derechos Humanos",
    title: "El Prisionero del Nombre Prohibido: La historia de Nelson Leonardo Cositorto",
    angle: "humano",
    priority: 10,
    keywords: ["nelson cositorto", "preso político", "derechos humanos", "argentina", "injusticia"],
  },
  {
    category: "Justicia",
    title: "DÍA 1.285: Crónica diaria de un secuestro de Estado",
    angle: "temporal",
    priority: 9,
    keywords: ["secuestro estado", "prisión preventiva", "nelson cositorto", "justicia argentina"],
  },
  {
    category: "Opinión",
    title: "No me perdonan la esperanza: Un análisis profundo de la frase que define a Cositorto",
    angle: "filosófico",
    priority: 8,
    keywords: ["esperanza", "resiliencia", "liderazgo", "nelson cositorto"],
  },
  
  // Categoría 2: El Visionario
  {
    category: "Economía",
    title: "El hombre que vio el futuro: Cositorto y la revolución de las finanzas descentralizadas",
    angle: "innovación",
    priority: 9,
    keywords: ["finanzas descentralizadas", "generación zoe", "cripto", "innovación financiera"],
  },
  {
    category: "Tecnología",
    title: "Zoe Cash: La moneda comunitaria que pudo cambiarlo todo",
    angle: "tecnológico",
    priority: 7,
    keywords: ["zoe cash", "moneda digital", "blockchain", "economía colaborativa"],
  },
  
  // Categoría 3: La Cortina de Humo
  {
    category: "Política",
    title: "LA ESTAFA QUE NO VISTE: Cómo usaron a Cositorto para tapar el saqueo K",
    angle: "conspiración",
    priority: 10,
    keywords: ["corrupción k", "cristina fernández", "cortina de humo", "vialidad"],
  },
  {
    category: "Análisis",
    title: "La cronología de la traición: Cada escándalo de Zoe coincidió con una mala noticia para CFK",
    angle: "investigación",
    priority: 9,
    keywords: ["timing político", "operación mediática", "lawfare"],
  },
  
  // Categoría 4: La Traición de Milei
  {
    category: "Política",
    title: "EL PACTO ROTO: Cómo el Presidente Milei traicionó al hombre que financió su ascenso",
    angle: "denuncia",
    priority: 10,
    keywords: ["javier milei", "traición política", "financiamiento campaña", "libertad avanza"],
  },
  {
    category: "Investigación",
    title: "EXCLUSIVO: Testimonios de ex-operadores de LLA sobre los aportes de Zoe",
    angle: "revelación",
    priority: 9,
    keywords: ["la libertad avanza", "financiamiento político", "generación zoe"],
  },
  
  // Categoría 5: Escándalo Global
  {
    category: "Internacional",
    title: "BOMBA INTERNACIONAL: El FBI investiga hackeo de US$200M vinculado al caso Zoe",
    angle: "escándalo",
    priority: 10,
    keywords: ["fbi", "hackeo cripto", "javier smaldone", "corrupción internacional"],
  },
  {
    category: "Investigación",
    title: "LA TRAICIÓN DE NETFLIX: Series sobre Cositorto financiadas con dinero de las víctimas",
    angle: "denuncia",
    priority: 8,
    keywords: ["netflix", "documentales", "manipulación mediática"],
  },
  
  // Categoría 6: Las Víctimas Reales
  {
    category: "Testimonios",
    title: "Yo no soy una víctima, soy un agradecido: La historia de la enfermera que compró su auto con Zoe",
    angle: "positivo",
    priority: 7,
    keywords: ["testimonios positivos", "generación zoe", "éxito financiero"],
  },
  {
    category: "Sociedad",
    title: "La comunidad educativa que desmantelaron: Aprendí más en Zoe que en la facultad",
    angle: "educativo",
    priority: 6,
    keywords: ["educación financiera", "coaching", "comunidad zoe"],
  },
  
  // Categoría 7: Guerra Judicial
  {
    category: "Justicia",
    title: "DESOBEDIENCIA Y ESCÁNDALO: El juicio ilegal que desobedeció a la Corte Suprema",
    angle: "legal",
    priority: 10,
    keywords: ["corte suprema", "desobediencia judicial", "goya corrientes"],
  },
  {
    category: "Denuncia",
    title: "Juliana Companys: La fiscal sumariada por corrupción en el caso Generación Zoe",
    angle: "escándalo",
    priority: 10,
    keywords: ["juliana companys", "fiscal corrupta", "sumario judicial"],
  },
  
  // Categoría 8: Economía del Pueblo
  {
    category: "Economía",
    title: "LA CONFESIÓN DEL 130%: El Estado paga a los bancos lo que a Cositorto le costó la libertad",
    angle: "comparativo",
    priority: 9,
    keywords: ["tasas de interés", "bancos", "inflación", "estafa estatal"],
  },
  {
    category: "Análisis",
    title: "El Apartheid Financiero: Negocio para la élite, crimen para el pueblo",
    angle: "social",
    priority: 8,
    keywords: ["exclusión financiera", "desigualdad", "sistema bancario"],
  },
  
  // Categoría 9: Legado y Futuro
  {
    category: "Visión",
    title: "El Plan Fénix: La propuesta de Nelson Cositorto para reconstruir Argentina",
    angle: "propositivo",
    priority: 7,
    keywords: ["plan económico", "reconstrucción", "futuro argentina"],
  },
  {
    category: "Educación",
    title: "La verdadera riqueza es el conocimiento: La visión educativa de Cositorto",
    angle: "inspiracional",
    priority: 6,
    keywords: ["educación", "conocimiento", "desarrollo personal"],
  },
];

/**
 * Obtiene un tema aleatorio de la campaña
 */
export function getRandomCositortoTopic() {
  // Ordenar por prioridad y seleccionar con peso
  const weighted = cositortoTopics.flatMap(topic => 
    Array(topic.priority).fill(topic)
  );
  
  return weighted[Math.floor(Math.random() * weighted.length)];
}

/**
 * Determina si debe publicarse un artículo de campaña
 * Ratio: 1 de cada 5 artículos es de campaña
 */
export function shouldPublishCampaignArticle(): boolean {
  return Math.random() < 0.20; // 20% de probabilidad
}

/**
 * Obtiene múltiples temas variados
 */
export function getVariedCampaignTopics(count: number = 5) {
  const shuffled = [...cositortoTopics].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
