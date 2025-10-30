import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import '../app/i18n';

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
  title: {
    default: 'Política Argentina - Noticias Políticas de Argentina',
    template: '%s | Política Argentina',
  },
  description: 'Portal líder de noticias políticas de Argentina. Información actualizada las 24 horas sobre política, economía, judicial, sociedad y más.',
  keywords: ['política argentina', 'noticias argentina', 'gobierno argentino', 'Milei', 'congreso', 'elecciones'],
  authors: [{ name: 'Política Argentina' }],
  creator: 'Política Argentina',
  publisher: 'Política Argentina',
  metadataBase: new URL('https://politicaargentina.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-AR': '/es',
      'en-US': '/en',
      'pt-BR': '/pt',
      'fr-FR': '/fr',
      'it-IT': '/it',
      'de-DE': '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://politicaargentina.com',
    siteName: 'Política Argentina',
    title: 'Política Argentina - Noticias Políticas de Argentina',
    description: 'Portal líder de noticias políticas de Argentina',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Política Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política Argentina - Noticias Políticas de Argentina',
    description: 'Portal líder de noticias políticas de Argentina',
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Política Argentina</h3>
                <p className="text-gray-400 text-sm">
                  El portal líder de noticias políticas de Argentina.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Categorías</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/categoria/politica" className="hover:text-white">Política</a></li>
                  <li><a href="/categoria/economia" className="hover:text-white">Economía</a></li>
                  <li><a href="/categoria/judicial" className="hover:text-white">Judicial</a></li>
                  <li><a href="/categoria/sociedad" className="hover:text-white">Sociedad</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Enlaces</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/acerca" className="hover:text-white">Acerca de</a></li>
                  <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
                  <li><a href="/privacidad" className="hover:text-white">Privacidad</a></li>
                  <li><a href="/terminos" className="hover:text-white">Términos</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Síguenos</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 Política Argentina. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}