import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface MegaSEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const MegaSEO = ({
  title,
  description,
  keywords = 'política argentina, noticias, gobierno, elecciones, congreso, presidente, economía, sociedad',
  image = 'https://politicaargentina.com/og-image.jpg',
  url = 'https://politicaargentina.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Política Argentina',
  section,
  tags = [],
}: MegaSEOProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  
  const langNames: Record<string, string> = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    pt: 'Português',
  };

  const langLocales: Record<string, string> = {
    es: 'es_AR',
    en: 'en_US',
    fr: 'fr_FR',
    pt: 'pt_BR',
  };

  const fullTitle = `${title} | Política Argentina`;
  const canonicalUrl = url.endsWith('/') ? url : `${url}/`;

  // Generar URLs alternativas para idiomas
  const alternateUrls = {
    es: canonicalUrl,
    en: canonicalUrl.replace('politicaargentina.com/', 'politicaargentina.com/en/'),
    fr: canonicalUrl.replace('politicaargentina.com/', 'politicaargentina.com/fr/'),
    pt: canonicalUrl.replace('politicaargentina.com/', 'politicaargentina.com/pt/'),
  };

  // Schema.org JSON-LD para SEO avanzado
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'NewsArticle' : 'WebSite',
    headline: title,
    description: description,
    image: image,
    url: canonicalUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://politicaargentina.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Política Argentina',
      logo: {
        '@type': 'ImageObject',
        url: 'https://politicaargentina.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    inLanguage: langLocales[currentLang],
    ...(section && { articleSection: section }),
    ...(tags.length > 0 && { keywords: tags.join(', ') }),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://politicaargentina.com',
      },
      ...(section ? [{
        '@type': 'ListItem',
        position: 2,
        name: section,
        item: `https://politicaargentina.com/categoria/${section.toLowerCase()}`,
      }] : []),
    ],
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Política Argentina',
    url: 'https://politicaargentina.com',
    logo: 'https://politicaargentina.com/logo.png',
    description: 'Portal profesional de noticias políticas de Argentina',
    sameAs: [
      'https://twitter.com/politicaargentina',
      'https://facebook.com/politicaargentina',
      'https://instagram.com/politicaargentina',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Editorial',
      email: 'contacto@politicaargentina.com',
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content={langNames[currentLang]} />
      <meta name="geo.region" content="AR" />
      <meta name="geo.country" content="Argentina" />
      <meta name="geo.placename" content="Buenos Aires" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate Language URLs */}
      <link rel="alternate" hreflang="es" href={alternateUrls.es} />
      <link rel="alternate" hreflang="en" href={alternateUrls.en} />
      <link rel="alternate" hreflang="fr" href={alternateUrls.fr} />
      <link rel="alternate" hreflang="pt" href={alternateUrls.pt} />
      <link rel="alternate" hreflang="x-default" href={alternateUrls.es} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Política Argentina" />
      <meta property="og:locale" content={langLocales[currentLang]} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@politicaargentina" />
      <meta name="twitter:creator" content="@politicaargentina" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional Meta Tags for SEO */}
      <meta name="theme-color" content="#bb1919" />
      <meta name="msapplication-TileColor" content="#bb1919" />
      <meta name="apple-mobile-web-app-title" content="Política Argentina" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};
