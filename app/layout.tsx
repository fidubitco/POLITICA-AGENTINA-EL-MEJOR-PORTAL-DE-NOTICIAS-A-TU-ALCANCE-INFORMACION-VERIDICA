import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://politicaargentina.com'),
  title: {
    default: 'Política Argentina - Noticias Políticas de Argentina en Tiempo Real',
    template: '%s | Política Argentina'
  },
  description: 'Portal líder de noticias políticas de Argentina. Cobertura en tiempo real de gobierno, economía, elecciones, congreso y actualidad política argentina. Análisis experto y periodismo independiente.',
  keywords: ['política argentina', 'noticias argentina', 'gobierno argentino', 'elecciones argentina', 'congreso nacional', 'milei', 'cristina kirchner', 'economía argentina', 'dólar blue', 'inflación argentina', 'actualidad política', 'noticias en vivo', 'breaking news argentina'],
  authors: [{ name: 'Política Argentina' }],
  creator: 'Política Argentina',
  publisher: 'Política Argentina',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://politicaargentina.com',
    title: 'Política Argentina - Noticias Políticas en Tiempo Real',
    description: 'Portal líder de noticias políticas de Argentina. Cobertura en tiempo real, análisis experto y periodismo independiente.',
    siteName: 'Política Argentina',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Política Argentina - Portal de Noticias',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política Argentina - Noticias Políticas en Tiempo Real',
    description: 'Portal líder de noticias políticas de Argentina. Cobertura en tiempo real y análisis experto.',
    images: ['/og-image.jpg'],
    creator: '@politicaarg',
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
  alternates: {
    canonical: 'https://politicaargentina.com',
    languages: {
      'es-AR': 'https://politicaargentina.com',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured Data - Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: 'Política Argentina',
              url: 'https://politicaargentina.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://politicaargentina.com/logo.png',
                width: 250,
                height: 60
              },
              description: 'Portal líder de noticias políticas de Argentina',
              sameAs: [
                'https://twitter.com/politicaarg',
                'https://facebook.com/politicaargentina',
                'https://instagram.com/politicaargentina'
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'AR',
                addressRegion: 'Buenos Aires'
              }
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Política Argentina',
              url: 'https://politicaargentina.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://politicaargentina.com/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
