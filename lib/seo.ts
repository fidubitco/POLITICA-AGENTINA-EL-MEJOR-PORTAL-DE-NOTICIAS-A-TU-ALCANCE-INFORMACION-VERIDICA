import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  url: string
  siteName: string
  locale: string
  type?: 'website' | 'article'
  image?: string
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Generate comprehensive metadata for Next.js pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    url,
    siteName,
    locale,
    type = 'website',
    image = '/og-image.png',
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
  } = config

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && publishedTime && modifiedTime
        ? {
            publishedTime,
            modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Generate JSON-LD schema for Organization
 */
export function generateOrganizationSchema(config: {
  name: string
  url: string
  logo: string
  description: string
  contactEmail: string
  socialMedia: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo: {
      '@type': 'ImageObject',
      url: config.logo,
    },
    description: config.description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: config.contactEmail,
      contactType: 'customer service',
    },
    sameAs: Object.values(config.socialMedia).filter(Boolean),
  }
}

/**
 * Generate JSON-LD schema for Website
 */
export function generateWebsiteSchema(config: {
  name: string
  url: string
  description: string
  searchAction?: {
    target: string
    queryInput: string
  }
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    description: config.description,
  }

  if (config.searchAction) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: config.searchAction.target,
      'query-input': config.searchAction.queryInput,
    }
  }

  return schema
}

/**
 * Generate JSON-LD schema for NewsArticle
 */
export function generateArticleSchema(config: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: string
  publisher: {
    name: string
    logo: string
  }
  url: string
  articleBody: string
  keywords: string[]
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: config.headline,
    description: config.description,
    image: {
      '@type': 'ImageObject',
      url: config.image,
    },
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    author: {
      '@type': 'Person',
      name: config.author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: config.publisher.logo,
      },
    },
    url: config.url,
    articleBody: config.articleBody,
    keywords: config.keywords.join(', '),
    articleSection: config.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url,
    },
  }
}

/**
 * Generate JSON-LD schema for BreadcrumbList
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate JSON-LD schema for ItemList (for news listings)
 */
export function generateItemListSchema(config: {
  name: string
  description: string
  url: string
  items: Array<{
    name: string
    url: string
    image: string
    description: string
    datePublished: string
  }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.name,
    description: config.description,
    url: config.url,
    numberOfItems: config.items.length,
    itemListElement: config.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'NewsArticle',
        headline: item.name,
        url: item.url,
        image: item.image,
        description: item.description,
        datePublished: item.datePublished,
      },
    })),
  }
}

/**
 * Default SEO configuration
 */
export const DEFAULT_SEO_CONFIG = {
  siteName: 'Política Argentina',
  siteUrl: 'https://politica-argentina.vercel.app',
  description: 'Portal de noticias políticas de Argentina con cobertura en 90 idiomas. Noticias actualizadas, análisis profundo y contenido multimedia sobre la actualidad política argentina.',
  keywords: [
    'política argentina',
    'noticias argentina',
    'actualidad política',
    'gobierno argentino',
    'elecciones argentina',
    'economía argentina',
    'justicia argentina',
  ],
  logo: '/logo.png',
  ogImage: '/og-image.png',
  contactEmail: 'contacto@politica-argentina.com',
  socialMedia: {
    twitter: 'https://twitter.com/politica_ar',
    facebook: 'https://facebook.com/politicaargentina',
    linkedin: 'https://linkedin.com/company/politica-argentina',
  },
}
