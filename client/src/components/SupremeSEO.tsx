/**
 * 🚀 SUPREME SEO - MÁXIMA OPTIMIZACIÓN PARA RANKING #1
 * Sistema de SEO más avanzado del planeta
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SupremeSEOProps {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const SupremeSEO: React.FC<SupremeSEOProps> = ({
  title,
  description,
  keywords = '',
  url,
  image = 'https://politicaargentina.com/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Política Argentina',
  section,
  tags = [],
}) => {
  const siteName = 'Política Argentina';
  const fullTitle = `${title} | ${siteName}`;
  
  // Schema.org JSON-LD para máxima indexación
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebSite
      {
        '@type': 'WebSite',
        '@id': 'https://politicaargentina.com/#website',
        url: 'https://politicaargentina.com/',
        name: siteName,
        description: 'Portal profesional de noticias políticas de Argentina. Información veraz y actualizada.',
        publisher: {
          '@id': 'https://politicaargentina.com/#organization',
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://politicaargentina.com/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        ],
        inLanguage: ['es-AR', 'en-US', 'fr-FR', 'pt-BR'],
      },
      // Organization
      {
        '@type': 'NewsMediaOrganization',
        '@id': 'https://politicaargentina.com/#organization',
        name: siteName,
        url: 'https://politicaargentina.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://politicaargentina.com/logo.png',
          width: 600,
          height: 60,
        },
        sameAs: [
          'https://twitter.com/politicaargentina',
          'https://facebook.com/politicaargentina',
          'https://instagram.com/politicaargentina',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'contacto@politicaargentina.com',
          availableLanguage: ['Spanish', 'English', 'French', 'Portuguese'],
        },
      },
      // WebPage/Article
      type === 'article'
        ? {
            '@type': 'NewsArticle',
            '@id': url + '#article',
            headline: title,
            description: description,
            image: {
              '@type': 'ImageObject',
              url: image,
              width: 1200,
              height: 630,
            },
            datePublished: publishedTime || new Date().toISOString(),
            dateModified: modifiedTime || new Date().toISOString(),
            author: {
              '@type': 'Person',
              name: author,
            },
            publisher: {
              '@id': 'https://politicaargentina.com/#organization',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url,
            },
            articleSection: section || 'Política',
            keywords: tags.join(', '),
            inLanguage: 'es-AR',
          }
        : {
            '@type': 'WebPage',
            '@id': url + '#webpage',
            url: url,
            name: title,
            description: description,
            isPartOf: {
              '@id': 'https://politicaargentina.com/#website',
            },
            inLanguage: 'es-AR',
          },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': url + '#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://politicaargentina.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="pt_BR" />

      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          <meta property="article:author" content={author} />
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@politicaargentina" />
      <meta name="twitter:creator" content="@politicaargentina" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content={author} />
      <meta name="language" content="Spanish" />
      <meta name="geo.region" content="AR" />
      <meta name="geo.placename" content="Argentina" />
      <meta name="geo.position" content="-34.603722;-58.381592" />
      <meta name="ICBM" content="-34.603722, -58.381592" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Performance & Caching */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="es" href={url} />
      <link rel="alternate" hrefLang="en" href={url.replace('//', '//') + (url.includes('/en/') ? '' : '/en/')} />
      <link rel="alternate" hrefLang="fr" href={url.replace('//', '//') + (url.includes('/fr/') ? '' : '/fr/')} />
      <link rel="alternate" hrefLang="pt" href={url.replace('//', '//') + (url.includes('/pt/') ? '' : '/pt/')} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>

      {/* Google News Specific */}
      {type === 'article' && (
        <>
          <meta name="news_keywords" content={tags.join(', ')} />
          <meta name="syndication-source" content={url} />
          <meta name="original-source" content={url} />
        </>
      )}

      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title={`${siteName} RSS Feed`} href="https://politicaargentina.com/rss.xml" />
      <link rel="alternate" type="application/atom+xml" title={`${siteName} Atom Feed`} href="https://politicaargentina.com/atom.xml" />

      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="https://politicaargentina.com/sitemap.xml" />
    </Helmet>
  );
};

export default SupremeSEO;

