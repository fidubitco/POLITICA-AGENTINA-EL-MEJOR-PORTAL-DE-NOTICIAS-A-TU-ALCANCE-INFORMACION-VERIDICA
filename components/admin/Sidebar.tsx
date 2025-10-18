"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface SidebarProps {
  navigation: SidebarItem[];
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  logoHref?: string;
  logoText?: string;
  onLogout?: () => void;
}

/**
 * Sidebar Component
 * Navigation sidebar for admin area with active state highlighting
 */
export function Sidebar({
  navigation,
  user,
  logoHref = "/admin",
  logoText = "PA",
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <Link href={logoHref} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">{logoText}</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-zinc-500">Panel de Control</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-bold rounded-full",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-zinc-800 text-zinc-400"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      {user && (
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-zinc-500 capitalize">
                {user.role || "Usuario"}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
