// ===========================================
// SISTEMA DE SEO EXTREMO OPTIMIZADO
// SEO de clase mundial para máximo rendimiento
// ===========================================

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ExtremeSEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  articleData?: {
    author: string;
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tags: string[];
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
  localBusiness?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    openingHours: string;
  };
}

const ExtremeSEO: React.FC<ExtremeSEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  articleData,
  breadcrumbs,
  faqData,
  localBusiness
}) => {
  const fullTitle = `${title} | Política Argentina - Portal de Noticias Profesional`;
  const fullDescription = `${description} | Noticias de Argentina, política, economía, sociedad y más. Portal profesional de noticias argentinas.`;

  // Generar JSON-LD estructurado
  const generateStructuredData = () => {
    const structuredData: any = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://politicaargentina.com/#website",
          "url": "https://politicaargentina.com",
          "name": "Política Argentina",
          "description": "Portal profesional de noticias argentinas",
          "publisher": {
            "@id": "https://politicaargentina.com/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://politicaargentina.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://politicaargentina.com/#organization",
          "name": "Política Argentina",
          "url": "https://politicaargentina.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://politicaargentina.com/logo.png",
            "width": 300,
            "height": 100
          },
          "sameAs": [
            "https://twitter.com/politicaargentina",
            "https://facebook.com/politicaargentina",
            "https://instagram.com/politicaargentina"
          ]
        },
        {
          "@type": "WebPage",
          "@id": canonicalUrl,
          "url": canonicalUrl,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://politicaargentina.com/#website"
          },
          "about": {
            "@id": "https://politicaargentina.com/#organization"
          },
          "datePublished": articleData?.publishedTime,
          "dateModified": articleData?.modifiedTime,
          "author": {
            "@type": "Person",
            "name": articleData?.author
          }
        }
      ]
    };

    // Agregar datos de artículo si existen
    if (articleData) {
      structuredData["@graph"].push({
        "@type": "NewsArticle",
        "@id": canonicalUrl + "#article",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Política Argentina",
          "logo": {
            "@type": "ImageObject",
            "url": "https://politicaargentina.com/logo.png"
          }
        },
        "datePublished": articleData.publishedTime,
        "dateModified": articleData.modifiedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "articleSection": articleData.section,
        "keywords": articleData.tags.join(", ")
      });
    }

    // Agregar breadcrumbs si existen
    if (breadcrumbs && breadcrumbs.length > 0) {
      structuredData["@graph"].push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }

    // Agregar FAQ si existen
    if (faqData && faqData.length > 0) {
      structuredData["@graph"].push({
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }

    // Agregar datos de negocio local si existen
    if (localBusiness) {
      structuredData["@graph"].push({
        "@type": "LocalBusiness",
        "name": localBusiness.name,
        "address": localBusiness.address,
        "telephone": localBusiness.phone,
        "email": localBusiness.email,
        "openingHours": localBusiness.openingHours
      });
    }

    return structuredData;
  };

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={articleData ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Política Argentina" />
      <meta property="og:locale" content="es_AR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@politicaargentina" />
      <meta name="twitter:creator" content="@politicaargentina" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Meta tags adicionales */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="Política Argentina" />
      <meta name="publisher" content="Política Argentina" />
      <meta name="copyright" content="© 2025 Política Argentina" />
      <meta name="language" content="es-AR" />
      <meta name="geo.region" content="AR" />
      <meta name="geo.country" content="Argentina" />
      
      {/* Meta tags de rendimiento */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Preconnect para rendimiento */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      
      {/* DNS prefetch para rendimiento */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData(), null, 2)}
      </script>
      
      {/* Meta tags de artículo si es artículo */}
      {articleData && (
        <>
          <meta property="article:author" content={articleData.author} />
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime} />
          <meta property="article:section" content={articleData.section} />
          {articleData.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Meta tags de rendimiento adicionales */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Política Argentina" />
      
      {/* Meta tags de seguridad */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Meta tags de caché */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta httpEquiv="Expires" content="31536000" />
      
      {/* Meta tags de idioma */}
      <meta name="language" content="es-AR" />
      <meta name="geo.region" content="AR" />
      <meta name="geo.country" content="Argentina" />
      <meta name="geo.placename" content="Buenos Aires" />
      
      {/* Meta tags de contenido */}
      <meta name="content-type" content="text/html; charset=UTF-8" />
      <meta name="content-language" content="es-AR" />
      <meta name="audience" content="all" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Meta tags de redes sociales */}
      <meta property="fb:app_id" content="123456789012345" />
      <meta name="twitter:app:name:iphone" content="Política Argentina" />
      <meta name="twitter:app:name:ipad" content="Política Argentina" />
      <meta name="twitter:app:name:googleplay" content="Política Argentina" />
      
      {/* Meta tags de PWA */}
      <meta name="application-name" content="Política Argentina" />
      <meta name="apple-mobile-web-app-title" content="Política Argentina" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Meta tags de rendimiento adicionales */}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
    </Helmet>
  );
};

export default ExtremeSEO;
