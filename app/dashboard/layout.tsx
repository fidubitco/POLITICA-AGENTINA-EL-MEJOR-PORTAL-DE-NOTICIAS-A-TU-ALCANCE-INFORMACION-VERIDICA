/**
 * LAYOUT DEL DASHBOARD DE USUARIO
 * 
 * Layout wrapper para el dashboard de usuarios (no-admin).
 * Incluye navegación, sidebar y header común para todas las páginas del dashboard.
 */

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  LogOut,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Navigation */}
      <nav className="bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold">
                POLÍTICA ARGENTINA
              </Link>
              <div className="hidden md:flex items-center gap-4">
                <NavLink href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />}>
                  Dashboard
                </NavLink>
                <NavLink href="/dashboard/posts" icon={<FileText className="w-4 h-4" />}>
                  Mis Posts
                </NavLink>
                <NavLink href="/dashboard/profile" icon={<User className="w-4 h-4" />}>
                  Perfil
                </NavLink>
                <NavLink href="/dashboard/settings" icon={<Settings className="w-4 h-4" />}>
                  Configuración
                </NavLink>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Ir al sitio
                </Button>
              </Link>
              <Link href="/api/auth/signout">
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-zinc-500">
            © 2025 POLÍTICA ARGENTINA. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

