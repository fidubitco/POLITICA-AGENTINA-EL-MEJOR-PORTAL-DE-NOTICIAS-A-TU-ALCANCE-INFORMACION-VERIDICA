import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Download,
  FolderTree,
  Users,
  Image,
  BarChart3,
  Settings,
  Home,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Artículos",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      name: "Categorías",
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      name: "Usuarios",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: Image,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Configuración",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-64 bg-black border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Admin</h1>
              <p className="text-xs text-zinc-500">Panel de Control</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-white"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors mb-3 text-zinc-400 hover:text-white"
          >
            <Home className="w-5 h-5" />
            <span>Ver sitio</span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {session.user.name || session.user.email}
              </p>
              <p className="text-xs text-zinc-500">
                {(session.user as { role?: string }).role}
              </p>
            </div>
            <Link
              href="/api/auth/signout"
              className="p-2 hover:bg-zinc-900 rounded-lg ml-2"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
