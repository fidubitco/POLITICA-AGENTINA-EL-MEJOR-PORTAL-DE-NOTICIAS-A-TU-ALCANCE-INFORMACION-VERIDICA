"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  notifications?: number;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

/**
 * DashboardHeader Component
 * Top header for admin dashboard with search, notifications, and user profile
 */
export function DashboardHeader({
  title,
  subtitle,
  user,
  notifications = 0,
  onSearch,
  showSearch = true,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Title Section */}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-2xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-zinc-500 mt-1 truncate">{subtitle}</p>
          )}
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar en el dashboard..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800 focus:border-blue-600"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-zinc-900">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-600 text-xs">
                    {notifications > 9 ? "9+" : notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="font-bold">Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              {notifications === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">
                  No tienes notificaciones nuevas
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {/* Example notifications */}
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer hover:bg-zinc-800">
                    <p className="font-medium text-sm">Nuevo comentario</p>
                    <p className="text-xs text-zinc-500">Juan comentó en tu artículo</p>
                    <p className="text-xs text-zinc-600">Hace 5 minutos</p>
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="hover:bg-zinc-900">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 hover:bg-zinc-900">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  {user?.image ? (
                    <img src={user.image} alt={user.name || ""} className="w-full h-full rounded-full" />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {user?.name || user?.email || "Usuario"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name || "Usuario"}</p>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800 text-red-500">
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
