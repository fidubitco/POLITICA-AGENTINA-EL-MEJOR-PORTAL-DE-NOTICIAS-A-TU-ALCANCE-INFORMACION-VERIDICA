import type { Metadata } from 'next'
import { getLocale } from '@/lib/locales'
import {
  DEFAULT_SEO_CONFIG,
  generateOrganizationSchema,
  generateWebsiteSchema
} from '@/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const localeData = getLocale(locale)

  return {
    title: {
      default: `${DEFAULT_SEO_CONFIG.siteName} - Portal de Noticias Políticas`,
      template: `%s | ${DEFAULT_SEO_CONFIG.siteName}`,
    },
    description: DEFAULT_SEO_CONFIG.description,
    keywords: DEFAULT_SEO_CONFIG.keywords.join(', '),
    authors: [{ name: DEFAULT_SEO_CONFIG.siteName }],
    openGraph: {
      type: 'website',
      locale: locale,
      url: DEFAULT_SEO_CONFIG.siteUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      title: `${DEFAULT_SEO_CONFIG.siteName} - Portal de Noticias Políticas`,
      description: DEFAULT_SEO_CONFIG.description,
      images: [
        {
          url: DEFAULT_SEO_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: DEFAULT_SEO_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${DEFAULT_SEO_CONFIG.siteName} - Portal de Noticias Políticas`,
      description: DEFAULT_SEO_CONFIG.description,
      images: [DEFAULT_SEO_CONFIG.ogImage],
    },
    alternates: {
      canonical: DEFAULT_SEO_CONFIG.siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale} = await params

  // Generate JSON-LD schemas
  const organizationSchema = generateOrganizationSchema({
    name: DEFAULT_SEO_CONFIG.siteName,
    url: DEFAULT_SEO_CONFIG.siteUrl,
    logo: `${DEFAULT_SEO_CONFIG.siteUrl}${DEFAULT_SEO_CONFIG.logo}`,
    description: DEFAULT_SEO_CONFIG.description,
    contactEmail: DEFAULT_SEO_CONFIG.contactEmail,
    socialMedia: DEFAULT_SEO_CONFIG.socialMedia,
  })

  const websiteSchema = generateWebsiteSchema({
    name: DEFAULT_SEO_CONFIG.siteName,
    url: DEFAULT_SEO_CONFIG.siteUrl,
    description: DEFAULT_SEO_CONFIG.description,
    searchAction: {
      target: `${DEFAULT_SEO_CONFIG.siteUrl}/${locale}/noticias?q={search_term_string}`,
      queryInput: 'required name=search_term_string',
    },
  })

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {children}
    </>
  )
}
