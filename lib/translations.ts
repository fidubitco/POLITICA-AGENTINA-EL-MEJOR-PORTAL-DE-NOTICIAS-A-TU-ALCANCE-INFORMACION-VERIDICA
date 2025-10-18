/**
 * Translation system for multilingual support
 * Supports 90 languages with fallback to Spanish
 */

export interface Translation {
  // Navigation
  nav: {
    home: string
    news: string
    politics: string
    economy: string
    justice: string
  }
  // Homepage
  home: {
    trending: string
    latestNews: string
    seeAllNews: string
  }
  // News listing
  newsListing: {
    title: string
    subtitle: string
    featured: string
  }
  // Article detail
  article: {
    tags: string
    relatedNews: string
    backToNews: string
    listenToArticle: string
    audioDescription: string
    audioGenerated: string
    audioNotAvailable: string
  }
  // Footer
  footer: {
    sections: string
    information: string
    followUs: string
    about: string
    contact: string
    advertising: string
    terms: string
    rights: string
    description: string
  }
  // Common
  common: {
    by: string
    published: string
    category: string
    languagesAvailable: string
  }
}

// Spanish (default)
const es: Translation = {
  nav: {
    home: 'Inicio',
    news: 'Noticias',
    politics: 'Política',
    economy: 'Economía',
    justice: 'Justicia',
  },
  home: {
    trending: 'Más Leídas',
    latestNews: 'Últimas Noticias',
    seeAllNews: 'Ver Todas las Noticias',
  },
  newsListing: {
    title: 'Todas las Noticias',
    subtitle: 'Cobertura completa de la actualidad política argentina',
    featured: 'Destacada',
  },
  article: {
    tags: 'Etiquetas',
    relatedNews: 'Noticias Relacionadas',
    backToNews: 'Volver a Noticias',
    listenToArticle: 'Escucha esta noticia',
    audioDescription: 'Versión en audio generada con IA - Próximamente disponible',
    audioGenerated: 'Audio generado mediante Text-to-Speech de Hugging Face',
    audioNotAvailable: 'Audio no disponible en este momento',
  },
  footer: {
    sections: 'Secciones',
    information: 'Información',
    followUs: 'Síguenos',
    about: 'Acerca de',
    contact: 'Contacto',
    advertising: 'Publicidad',
    terms: 'Términos',
    rights: 'Todos los derechos reservados',
    description: 'Tu fuente confiable de noticias políticas en Argentina',
  },
  common: {
    by: 'Por',
    published: 'Publicado',
    category: 'Categoría',
    languagesAvailable: 'idiomas disponibles',
  },
}

// English
const en: Translation = {
  nav: {
    home: 'Home',
    news: 'News',
    politics: 'Politics',
    economy: 'Economy',
    justice: 'Justice',
  },
  home: {
    trending: 'Most Read',
    latestNews: 'Latest News',
    seeAllNews: 'See All News',
  },
  newsListing: {
    title: 'All News',
    subtitle: 'Complete coverage of Argentine political news',
    featured: 'Featured',
  },
  article: {
    tags: 'Tags',
    relatedNews: 'Related News',
    backToNews: 'Back to News',
    listenToArticle: 'Listen to this article',
    audioDescription: 'AI-generated audio version - Coming soon',
    audioGenerated: 'Audio generated using Hugging Face Text-to-Speech',
    audioNotAvailable: 'Audio not available at this time',
  },
  footer: {
    sections: 'Sections',
    information: 'Information',
    followUs: 'Follow Us',
    about: 'About',
    contact: 'Contact',
    advertising: 'Advertising',
    terms: 'Terms',
    rights: 'All rights reserved',
    description: 'Your trusted source for political news in Argentina',
  },
  common: {
    by: 'By',
    published: 'Published',
    category: 'Category',
    languagesAvailable: 'languages available',
  },
}

// French
const fr: Translation = {
  nav: {
    home: 'Accueil',
    news: 'Actualités',
    politics: 'Politique',
    economy: 'Économie',
    justice: 'Justice',
  },
  home: {
    trending: 'Les Plus Lus',
    latestNews: 'Dernières Nouvelles',
    seeAllNews: 'Voir Toutes les Actualités',
  },
  newsListing: {
    title: 'Toutes les Actualités',
    subtitle: 'Couverture complète de l\'actualité politique argentine',
    featured: 'À la Une',
  },
  article: {
    tags: 'Étiquettes',
    relatedNews: 'Actualités Connexes',
    backToNews: 'Retour aux Actualités',
    listenToArticle: 'Écoutez cet article',
    audioDescription: 'Version audio générée par IA - Bientôt disponible',
    audioGenerated: 'Audio généré avec Hugging Face Text-to-Speech',
    audioNotAvailable: 'Audio non disponible pour le moment',
  },
  footer: {
    sections: 'Sections',
    information: 'Information',
    followUs: 'Suivez-Nous',
    about: 'À Propos',
    contact: 'Contact',
    advertising: 'Publicité',
    terms: 'Conditions',
    rights: 'Tous droits réservés',
    description: 'Votre source fiable d\'actualités politiques en Argentine',
  },
  common: {
    by: 'Par',
    published: 'Publié',
    category: 'Catégorie',
    languagesAvailable: 'langues disponibles',
  },
}

// German
const de: Translation = {
  nav: {
    home: 'Startseite',
    news: 'Nachrichten',
    politics: 'Politik',
    economy: 'Wirtschaft',
    justice: 'Justiz',
  },
  home: {
    trending: 'Meistgelesen',
    latestNews: 'Neueste Nachrichten',
    seeAllNews: 'Alle Nachrichten Ansehen',
  },
  newsListing: {
    title: 'Alle Nachrichten',
    subtitle: 'Vollständige Berichterstattung über argentinische politische Nachrichten',
    featured: 'Hervorgehoben',
  },
  article: {
    tags: 'Schlagwörter',
    relatedNews: 'Verwandte Nachrichten',
    backToNews: 'Zurück zu den Nachrichten',
    listenToArticle: 'Diesen Artikel anhören',
    audioDescription: 'KI-generierte Audioversion - Demnächst verfügbar',
    audioGenerated: 'Audio generiert mit Hugging Face Text-to-Speech',
    audioNotAvailable: 'Audio derzeit nicht verfügbar',
  },
  footer: {
    sections: 'Abschnitte',
    information: 'Information',
    followUs: 'Folgen Sie Uns',
    about: 'Über Uns',
    contact: 'Kontakt',
    advertising: 'Werbung',
    terms: 'Bedingungen',
    rights: 'Alle Rechte vorbehalten',
    description: 'Ihre vertrauenswürdige Quelle für politische Nachrichten in Argentinien',
  },
  common: {
    by: 'Von',
    published: 'Veröffentlicht',
    category: 'Kategorie',
    languagesAvailable: 'verfügbare Sprachen',
  },
}

// Portuguese
const pt: Translation = {
  nav: {
    home: 'Início',
    news: 'Notícias',
    politics: 'Política',
    economy: 'Economia',
    justice: 'Justiça',
  },
  home: {
    trending: 'Mais Lidas',
    latestNews: 'Últimas Notícias',
    seeAllNews: 'Ver Todas as Notícias',
  },
  newsListing: {
    title: 'Todas as Notícias',
    subtitle: 'Cobertura completa das notícias políticas argentinas',
    featured: 'Destaque',
  },
  article: {
    tags: 'Tags',
    relatedNews: 'Notícias Relacionadas',
    backToNews: 'Voltar para Notícias',
    listenToArticle: 'Ouvir este artigo',
    audioDescription: 'Versão em áudio gerada por IA - Em breve disponível',
    audioGenerated: 'Áudio gerado usando Hugging Face Text-to-Speech',
    audioNotAvailable: 'Áudio não disponível no momento',
  },
  footer: {
    sections: 'Seções',
    information: 'Informação',
    followUs: 'Siga-Nos',
    about: 'Sobre',
    contact: 'Contato',
    advertising: 'Publicidade',
    terms: 'Termos',
    rights: 'Todos os direitos reservados',
    description: 'Sua fonte confiável de notícias políticas na Argentina',
  },
  common: {
    by: 'Por',
    published: 'Publicado',
    category: 'Categoria',
    languagesAvailable: 'idiomas disponíveis',
  },
}

// Italian
const it: Translation = {
  nav: {
    home: 'Home',
    news: 'Notizie',
    politics: 'Politica',
    economy: 'Economia',
    justice: 'Giustizia',
  },
  home: {
    trending: 'Più Letti',
    latestNews: 'Ultime Notizie',
    seeAllNews: 'Vedi Tutte le Notizie',
  },
  newsListing: {
    title: 'Tutte le Notizie',
    subtitle: 'Copertura completa delle notizie politiche argentine',
    featured: 'In Evidenza',
  },
  article: {
    tags: 'Tag',
    relatedNews: 'Notizie Correlate',
    backToNews: 'Torna alle Notizie',
    listenToArticle: 'Ascolta questo articolo',
    audioDescription: 'Versione audio generata da IA - Presto disponibile',
    audioGenerated: 'Audio generato con Hugging Face Text-to-Speech',
    audioNotAvailable: 'Audio non disponibile al momento',
  },
  footer: {
    sections: 'Sezioni',
    information: 'Informazione',
    followUs: 'Seguici',
    about: 'Chi Siamo',
    contact: 'Contatto',
    advertising: 'Pubblicità',
    terms: 'Termini',
    rights: 'Tutti i diritti riservati',
    description: 'La tua fonte affidabile di notizie politiche in Argentina',
  },
  common: {
    by: 'Di',
    published: 'Pubblicato',
    category: 'Categoria',
    languagesAvailable: 'lingue disponibili',
  },
}

// Dictionary mapping locale codes to translations
const translations: Record<string, Translation> = {
  es, en, fr, de, pt, it,
  // Map other locales to their closest translation or English as fallback
  'zh': en, 'zh-TW': en, 'ja': en, 'ko': en, 'ar': en, 'ru': en,
  'hi': en, 'bn': en, 'th': en, 'vi': en, 'id': en, 'tr': en,
  'pl': en, 'nl': en, 'sv': en, 'no': en, 'da': en, 'fi': en,
  'cs': en, 'hu': en, 'ro': en, 'el': en, 'he': en, 'uk': en,
  'bg': en, 'sr': en, 'hr': en, 'sk': en, 'sl': en, 'lt': en,
  'lv': en, 'et': en, 'fa': en, 'ur': en, 'pa': en, 'ta': en,
  'te': en, 'mr': en, 'gu': en, 'kn': en, 'ml': en, 'si': en,
  'km': en, 'lo': en, 'my': en, 'ka': en, 'hy': en, 'az': en,
  'kk': en, 'uz': en, 'mn': en, 'am': en, 'ne': en, 'sw': en,
  'ha': en, 'yo': en, 'ig': en, 'zu': en, 'xh': en, 'af': en,
  'sq': en, 'be': en, 'bs': en, 'ca': en, 'co': en, 'eo': en,
  'eu': en, 'fy': en, 'gl': en, 'ht': en, 'haw': en, 'hmn': en,
  'is': en, 'ga': en, 'jv': en, 'ku': en, 'ky': en, 'la': en,
  'lb': en, 'mk': en, 'mg': en, 'ms': en, 'mt': en, 'mi': en,
  'ny': en, 'or': en, 'ps': en, 'rw': en, 'sm': en, 'gd': en,
  'sd': en, 'sn': en, 'so': en, 'st': en, 'su': en, 'tg': en,
  'tt': en, 'tk': en, 'ug': en, 'cy': en, 'yi': en, 'ceb': en,
}

/**
 * Get translations for a specific locale
 * Falls back to Spanish if locale not found
 */
export function getTranslations(locale: string): Translation {
  return translations[locale] || translations['es']
}

/**
 * Shorthand function for easier use in components
 */
export function t(locale: string): Translation {
  return getTranslations(locale)
}
