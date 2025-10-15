import Link from "next/link";
import { prisma } from "@/lib/db";

export async function Header() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    take: 8,
  });

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b border-zinc-900">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                POLITICA ARGENTINA
              </h1>
              <p className="text-xs text-zinc-500">
                Noticias verificadas en tiempo real
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-zinc-400 hover:text-white">
              Admin
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-3">
          <ul className="flex items-center gap-6 overflow-x-auto">
            <li>
              <Link href="/" className="text-sm font-semibold hover:text-blue-400 whitespace-nowrap">
                Inicio
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="text-sm font-semibold hover:text-blue-400 whitespace-nowrap"
                  style={{ color: cat.color || undefined }}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
