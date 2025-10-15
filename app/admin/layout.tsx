import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileText, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

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
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Posts</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{session.user.name || session.user.email}</p>
              <p className="text-xs text-zinc-500">{(session.user as { role?: string }).role}</p>
            </div>
            <Link href="/api/auth/signout" className="p-2 hover:bg-zinc-900 rounded-lg">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
