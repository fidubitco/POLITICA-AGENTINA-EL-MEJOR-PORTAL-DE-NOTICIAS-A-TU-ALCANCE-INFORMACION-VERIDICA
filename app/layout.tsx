import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Política Argentina - Portal de Noticias Políticas',
  description: 'El portal líder de noticias políticas de Argentina. Información actualizada las 24 horas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Política Argentina. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              🔧 Panel de administración disponible en admin-portal/
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}