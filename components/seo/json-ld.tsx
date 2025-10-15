import Script from "next/script";

interface OrganizationLDProps {
  name: string;
  url: string;
  logo: string;
  social: string[];
}

export function OrganizationLD({ name, url, logo, social }: OrganizationLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs: social,
  };

  return (
    <Script
      id="organization-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface NewsArticleLDProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
}

export function NewsArticleLD({ headline, description, image, datePublished, dateModified, author, publisher }: NewsArticleLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image: image || publisher.logo,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo,
      },
    },
  };

  return (
    <Script
      id="news-article-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbLDProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbLD({ items }: BreadcrumbLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteLDProps {
  name: string;
  url: string;
  description: string;
}

export function WebSiteLD({ name, url, description }: WebSiteLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
