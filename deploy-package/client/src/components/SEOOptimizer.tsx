import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// ===========================================
// OPTIMIZADOR SEO PROFESIONAL
// Configuración avanzada para SEO como BBC/NYTimes
// ===========================================

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: 'article' | 'website' | 'news';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: { locale: string; url: string }[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEOOptimizer: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/images/politica-argentina-og.jpg',
  url = 'https://politicaargentina.com',
  type = 'website',
  author = 'Redacción Política Argentina',
  publishedTime,
  modifiedTime,
  section = 'Noticias',
  tags = [],
  locale = 'es_AR',
  alternateLocales = [],
  canonical,
  noindex = false,
  nofollow = false
}) => {
  // ===========================================
  // CONFIGURACIÓN SEO AVANZADA
  // ===========================================
  
  const fullTitle = title.includes('Política Argentina') ? title : `${title} | Política Argentina`;
  const fullDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  const fullUrl = url.startsWith('http') ? url : `https://politicaargentina.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://politicaargentina.com${image}`;
  
  // ===========================================
  // SCHEMA.ORG STRUCTURED DATA
  // ===========================================
  
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "Política Argentina",
      "url": "https://politicaargentina.com",
      "logo": "https://politicaargentina.com/logo.png",
      "description": "Portal de noticias líder en Argentina. Información confiable, actualizada y de calidad sobre política, economía, sociedad y más.",
      "sameAs": [
        "https://facebook.com/politicaargentina",
        "https://twitter.com/politicaargentina",
        "https://instagram.com/politicaargentina",
        "https://youtube.com/politicaargentina"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AR",
        "addressLocality": "Buenos Aires"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+54-11-1234-5678",
        "contactType": "customer service",
        "availableLanguage": "Spanish"
      }
    };

    if (type === 'article') {
      return {
        ...baseData,
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": fullImage,
        "author": {
          "@type": "Person",
          "name": author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Política Argentina",
          "logo": {
            "@type": "ImageObject",
            "url": "https://politicaargentina.com/logo.png"
          }
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullUrl
        },
        "articleSection": section,
        "keywords": keywords.join(', '),
        "wordCount": description.split(' ').length,
        "inLanguage": "es-AR"
      };
    }

    return baseData;
  };

  // ===========================================
  // OPEN GRAPH DATA
  // ===========================================
  
  const getOpenGraphData = () => {
    const baseOG = {
      'og:title': fullTitle,
      'og:description': fullDescription,
      'og:image': fullImage,
      'og:url': fullUrl,
      'og:type': type === 'article' ? 'article' : 'website',
      'og:site_name': 'Política Argentina',
      'og:locale': locale,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title
    };

    if (type === 'article') {
      return {
        ...baseOG,
        'article:author': author,
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime || publishedTime,
        'article:section': section,
        'article:tag': tags.join(', ')
      };
    }

    return baseOG;
  };

  // ===========================================
  // TWITTER CARD DATA
  // ===========================================
  
  const getTwitterData = () => ({
    'twitter:card': 'summary_large_image',
    'twitter:site': '@politicaargentina',
    'twitter:creator': '@politicaargentina',
    'twitter:title': fullTitle,
    'twitter:description': fullDescription,
    'twitter:image': fullImage,
    'twitter:image:alt': title
  });

  // ===========================================
  // ROBOTS META
  // ===========================================
  
  const getRobotsContent = () => {
    const robots = [];
    if (noindex) robots.push('noindex');
    if (nofollow) robots.push('nofollow');
    if (!noindex) robots.push('index');
    if (!nofollow) robots.push('follow');
    return robots.join(', ');
  };

  // ===========================================
  // PERFORMANCE OPTIMIZATION
  // ===========================================
  
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { href: '/fonts/playfair-display.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
    ];

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      Object.entries(link).forEach(([key, value]) => {
        linkElement.setAttribute(key, value);
      });
      document.head.appendChild(linkElement);
    });

    // Add critical CSS
    const criticalCSS = `
      .header-professional { position: sticky; top: 0; z-index: 1000; }
      .article-hero h1 { font-size: 2.5rem; line-height: 1.2; }
      .card-professional { transition: transform 0.2s ease; }
      .card-professional:hover { transform: translateY(-2px); }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = criticalCSS;
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // ===========================================
  // RENDER HELMET
  // ===========================================
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={getRobotsContent()} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#d32f2f" />
      <meta name="msapplication-TileColor" content="#d32f2f" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || fullUrl} />
      
      {/* Alternate Languages */}
      {alternateLocales.map(({ locale: altLocale, url: altUrl }) => (
        <link key={altLocale} rel="alternate" hrefLang={altLocale} href={altUrl} />
      ))}
      
      {/* Open Graph */}
      {Object.entries(getOpenGraphData()).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      
      {/* Twitter Cards */}
      {Object.entries(getTwitterData()).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Additional Meta Tags */}
      <meta name="news_keywords" content={keywords.join(', ')} />
      <meta name="article:author" content={author} />
      <meta name="article:section" content={section} />
      <meta name="article:tag" content={tags.join(', ')} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//cdn.politicaargentina.com" />
      
      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Critical CSS */}
      <style>{`
        /* Critical above-the-fold CSS */
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .header-professional { 
          background: rgba(255, 255, 255, 0.95); 
          backdrop-filter: blur(10px); 
          border-bottom: 1px solid #e0e0e0; 
        }
        .article-hero h1 { 
          font-family: 'Playfair Display', serif; 
          font-size: 3rem; 
          line-height: 1.2; 
          color: #1a1a1a; 
        }
        .card-professional { 
          background: white; 
          border-radius: 8px; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
          transition: transform 0.2s ease; 
        }
        .card-professional:hover { transform: translateY(-2px); }
      `}</style>
    </Helmet>
  );
};

// ===========================================
// HOOKS DE SEO
// ===========================================

export const useSEO = (props: SEOProps) => {
  useEffect(() => {
    // Update page title
    document.title = props.title.includes('Política Argentina') 
      ? props.title 
      : `${props.title} | Política Argentina`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', props.description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', props.keywords.join(', '));
    }
  }, [props.title, props.description, props.keywords]);
};

// ===========================================
// UTILIDADES SEO
// ===========================================

export const generateSEOTitle = (title: string, maxLength: number = 60): string => {
  const suffix = ' | Política Argentina';
  const maxTitleLength = maxLength - suffix.length;
  
  if (title.length <= maxTitleLength) {
    return title + suffix;
  }
  
  return title.substring(0, maxTitleLength - 3) + '...' + suffix;
};

export const generateSEODescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) {
    return content;
  }
  
  return content.substring(0, maxLength - 3) + '...';
};

export const generateKeywords = (title: string, content: string, tags: string[] = []): string[] => {
  const baseKeywords = [
    'noticias argentina',
    'política argentina',
    'economía argentina',
    'sociedad argentina',
    'actualidad argentina'
  ];
  
  const contentKeywords = content
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 4)
    .filter(word => !['que', 'para', 'con', 'por', 'del', 'las', 'los', 'una', 'uno'].includes(word))
    .slice(0, 10);
  
  const titleKeywords = title
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 3);
  
  const allKeywords = [...baseKeywords, ...titleKeywords, ...contentKeywords, ...tags];
  const uniqueKeywords = Array.from(new Set(allKeywords));
  return uniqueKeywords.slice(0, 20);
};

export default SEOOptimizer;
