import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-zinc-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">POLITICA ARGENTINA</h3>
            <p className="text-sm text-zinc-400">
              Portal líder de noticias políticas, económicas y sociales de Argentina.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Secciones</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-white">Inicio</Link></li>
              <li><Link href="/ultima-hora" className="hover:text-white">Última Hora</Link></li>
              <li><Link href="/destacadas" className="hover:text-white">Destacadas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Institucional</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/sobre-nosotros" className="hover:text-white">Sobre Nosotros</Link></li>
              <li><Link href="/equipo" className="hover:text-white">Equipo</Link></li>
              <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/terminos" className="hover:text-white">Términos</Link></li>
              <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-500">
          <p>© {year} POLITICA ARGENTINA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
