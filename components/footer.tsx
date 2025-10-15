import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">POLÍTICA ARGENTINA</h3>
            <p className="text-sm text-zinc-400 mb-4">
              El portal de noticias más completo de Argentina. Información verificada y actualizada las 24 horas.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categoria/politica" className="text-zinc-400 hover:text-white transition">Política</Link></li>
              <li><Link href="/categoria/economia" className="text-zinc-400 hover:text-white transition">Economía</Link></li>
              <li><Link href="/categoria/sociedad" className="text-zinc-400 hover:text-white transition">Sociedad</Link></li>
              <li><Link href="/categoria/internacional" className="text-zinc-400 hover:text-white transition">Internacional</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terminos" className="text-zinc-400 hover:text-white transition">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="text-zinc-400 hover:text-white transition">Política de Privacidad</Link></li>
              <li><Link href="/contacto" className="text-zinc-400 hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-zinc-400 mb-3">Recibe las noticias más importantes en tu email</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition">
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} POLÍTICA ARGENTINA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
