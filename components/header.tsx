import Link from "next/link";
import { Menu, Search, User } from "lucide-react";

export default function Header() {
  const categories = [
    { name: "Política", slug: "politica" },
    { name: "Economía", slug: "economia" },
    { name: "Sociedad", slug: "sociedad" },
    { name: "Internacional", slug: "internacional" },
    { name: "Deportes", slug: "deportes" },
    { name: "Tecnología", slug: "tecnologia" },
  ];

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-6">
              <span className="text-zinc-400">{new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="flex items-center gap-1 text-zinc-400 hover:text-white transition">
                <User className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button className="lg:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">PA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">POLÍTICA ARGENTINA</h1>
              <p className="text-xs text-zinc-500">Noticias en tiempo real</p>
            </div>
          </Link>

          <button className="p-2 hover:bg-zinc-900 rounded-lg transition">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-zinc-900 overflow-x-auto">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="block px-4 py-3 text-sm font-medium hover:bg-zinc-900 transition whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
