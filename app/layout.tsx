import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

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
  title: 'Política Argentina - Portal de Noticias',
  description: 'Portal líder de noticias políticas de Argentina. Cobertura en tiempo real y análisis experto.',
  keywords: 'política argentina, noticias, economía, judicial, internacional, sociedad, Milei, dólar',
  authors: [{ name: 'Política Argentina' }],
  openGraph: {
    title: 'Política Argentina - Portal de Noticias',
    description: 'Portal líder de noticias políticas de Argentina',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Política Argentina',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política Argentina - Portal de Noticias',
    description: 'Portal líder de noticias políticas de Argentina',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Force deployment trigger - v2.1.1-EXTREME-FORCE */}
        <meta name="deployment-version" content="2.1.1-extreme-force-final" />
        <meta name="deployment-timestamp" content={new Date().toISOString()} />
        <meta name="cache-bust" content={`extreme-force-${Date.now()}`} />
        
        {/* Schema.org Organization */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: 'Política Argentina',
              url: 'https://politicaargentina.com',
              logo: 'https://politicaargentina.com/logo.png',
              description: 'Portal líder de noticias políticas de Argentina',
              sameAs: [
                'https://twitter.com/politicaarg',
                'https://facebook.com/politicaargentina',
                'https://instagram.com/politicaargentina',
              ],
            }),
          }}
        />
        
        {/* Schema.org WebSite */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Política Argentina',
              url: 'https://politicaargentina.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://politicaargentina.com/buscar?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
