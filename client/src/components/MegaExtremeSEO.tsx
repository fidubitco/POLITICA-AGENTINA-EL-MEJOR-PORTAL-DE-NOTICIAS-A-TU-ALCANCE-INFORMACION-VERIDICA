/**
 * 🚀 MEGA EXTREME SEO - MÁXIMA OPTIMIZACIÓN PARA RANKING #1
 * Sistema de SEO más avanzado del planeta
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MegaExtremeSEOProps {
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
  lang?: string;
}

export const MegaExtremeSEO: React.FC<MegaExtremeSEOProps> = ({
  title,
  description,
  keywords = 'política argentina, noticias, Milei, economía, dólar, inflación',
  url,
  image = 'https://politicaargentina.com/logo.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Política Argentina',
  section,
  tags = [],
  lang = 'es',
}) => {
  const siteName = 'Política Argentina';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Idiomas soportados
  const languages = ['es', 'en', 'pt', 'fr', 'de', 'it', 'zh', 'ja', 'ru', 'ar', 'ko'];
  
  // Schema.org JSON-LD MEGA COMPLETO
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebSite
      {
        '@type': 'WebSite',
        '@id': 'https://politicaargentina.com/#website',
        url: 'https://politicaargentina.com/',
        name: siteName,
        description: 'Portal profesional de noticias políticas de Argentina',
        publisher: {
          '@id': 'https://politicaargentina.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://politicaargentina.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: languages,
      },
      // Organization
      {
        '@type': 'NewsMediaOrganization',
        '@id': 'https://politicaargentina.com/#organization',
        name: siteName,
        url: 'https://politicaargentina.com/',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://politicaargentina.com/#logo',
          url: 'https://politicaargentina.com/logo.png',
          width: 600,
          height: 60,
          caption: siteName,
        },
        image: {
          '@id': 'https://politicaargentina.com/#logo',
        },
        sameAs: [
          'https://twitter.com/politicaargentina',
          'https://facebook.com/politicaargentina',
          'https://instagram.com/politicaargentina',
          'https://linkedin.com/company/politicaargentina',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'contacto@politicaargentina.com',
          availableLanguage: languages,
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AR',
          addressLocality: 'Buenos Aires',
        },
      },
      // WebPage o Article
      type === 'article' && publishedTime
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
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            author: {
              '@type': 'Person',
              name: author,
              url: 'https://politicaargentina.com/autor/' + author.toLowerCase().replace(/\s+/g, '-'),
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
            inLanguage: lang,
            isAccessibleForFree: true,
            copyrightYear: new Date().getFullYear(),
            copyrightHolder: {
              '@id': 'https://politicaargentina.com/#organization',
            },
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
            about: {
              '@id': 'https://politicaargentina.com/#organization',
            },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: image,
            },
            datePublished: publishedTime || new Date().toISOString(),
            dateModified: modifiedTime || new Date().toISOString(),
            inLanguage: lang,
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
          ...(section
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: section,
                  item: `https://politicaargentina.com/categoria/${section.toLowerCase()}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: title,
                  item: url,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title,
                  item: url,
                },
              ]),
        ],
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang === 'es' ? 'es_AR' : `${lang}_${lang.toUpperCase()}`} />
      {languages.map((l) => (
        <meta key={l} property="og:locale:alternate" content={`${l}_${l.toUpperCase()}`} />
      ))}

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
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@politicaargentina" />
      <meta name="twitter:creator" content="@politicaargentina" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content={author} />
      <meta name="language" content={lang} />
      <meta name="geo.region" content="AR" />
      <meta name="geo.placename" content="Argentina" />
      <meta name="geo.position" content="-34.603722;-58.381592" />
      <meta name="ICBM" content="-34.603722, -58.381592" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="format-detection" content="telephone=no" />

      {/* Performance & Caching */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Alternate Languages */}
      {languages.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={url.replace(/\/(en|pt|fr|de|it|zh|ja|ru|ar|ko)\//, l === 'es' ? '/' : `/${l}/`)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url.replace(/\/(en|pt|fr|de|it|zh|ja|ru|ar|ko)\//, '/')} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>

      {/* Google News Specific */}
      {type === 'article' && (
        <>
          <meta name="news_keywords" content={tags.join(', ')} />
          <meta name="syndication-source" content={url} />
          <meta name="original-source" content={url} />
          <meta name="standout" content={url} />
        </>
      )}

      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteName} RSS Feed`}
        href="https://politicaargentina.com/rss.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={`${siteName} Atom Feed`}
        href="https://politicaargentina.com/atom.xml"
      />

      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="https://politicaargentina.com/sitemap.xml" />

      {/* Verification Tags (agregar cuando estén disponibles) */}
      {/* <meta name="google-site-verification" content="..." /> */}
      {/* <meta name="msvalidate.01" content="..." /> */}
      {/* <meta name="yandex-verification" content="..." /> */}
    </Helmet>
  );
};

export default MegaExtremeSEO;

