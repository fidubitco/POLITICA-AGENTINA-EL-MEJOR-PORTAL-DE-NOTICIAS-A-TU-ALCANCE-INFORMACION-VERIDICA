'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { categories } from '@/data/categories';
import {
  Globe,
  Menu,
  Search,
  X,
  Clock,
  Building2,
  TrendingUp,
  Scale,
  Users,
  Globe as GlobeIcon,
  MessageSquare,
  Vote,
  Map,
  DollarSign
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  politica: Building2,
  economia: TrendingUp,
  judicial: Scale,
  sociedad: Users,
  internacional: GlobeIcon,
  opinion: MessageSquare,
  elecciones: Vote,
  provincias: Map,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const changeLanguage = (langCode: string) => {
    // Implementar cambio de idioma
    console.log('Cambiando idioma a:', langCode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Estilo BBC/NYT */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-medium">{formatTime()}</span>
              </div>
              <span className="hidden md:inline capitalize">{formatDate()}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-3.5 w-3.5" />
                <span className="font-medium">Dólar: $1,200</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs hover:bg-gray-200">
                    <Globe className="h-3.5 w-3.5" />
                    <span>ES</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
                  <DropdownMenuLabel>Idiomas / Languages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => changeLanguage('es')}>
                    <span className="font-medium">Español</span>
                    <span className="ml-2 text-muted-foreground text-xs">(es)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('en')}>
                    <span className="font-medium">English</span>
                    <span className="ml-2 text-muted-foreground text-xs">(en)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('pt')}>
                    <span className="font-medium">Português</span>
                    <span className="ml-2 text-muted-foreground text-xs">(pt)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                    <span className="font-medium">Français</span>
                    <span className="ml-2 text-muted-foreground text-xs">(fr)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Política</h1>
              <p className="text-xs text-gray-600">Argentina</p>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.slice(0, 6).map((category) => {
              const IconComponent = categoryIcons[category.slug] || Building2;
              const isActive = pathname === `/categoria/${category.slug}`;

              return (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Buscar noticias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  className="p-2"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/admin">Panel Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-2">
              {categories.slice(0, 6).map((category) => {
                const IconComponent = categoryIcons[category.slug] || Building2;
                const isActive = pathname === `/categoria/${category.slug}`;

                return (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <Link
                  href="/admin"
                  className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Panel Administrativo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
