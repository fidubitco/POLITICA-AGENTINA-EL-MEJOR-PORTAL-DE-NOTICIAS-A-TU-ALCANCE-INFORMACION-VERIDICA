import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Globe, Menu, Search, User, X, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: categories } = trpc.categories.getActive.useQuery();
  const { data: languages } = trpc.languages.getActive.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/";
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Estilo BBC/NYT */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-medium">{formatTime()}</span>
              </div>
              <span className="hidden md:inline capitalize">{formatDate()}</span>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs hover:bg-gray-200">
                    <Globe className="h-3.5 w-3.5" />
                    <span>{i18n.language.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
                  <DropdownMenuLabel>Idiomas / Languages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {languages?.map((lang) => (
                    <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="ml-2 text-muted-foreground text-xs">({lang.code})</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Branding Profesional */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Estilo NYT */}
            <Link href="/">
              <div className="flex flex-col cursor-pointer group">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none transition-colors group-hover:text-red-700">
                  Política Argentina
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase mt-1 font-sans font-medium">
                  Portal de Noticias
                </p>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user?.name || "Usuario"}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <span className="cursor-pointer">{t("profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    {(user?.role === "admin" || user?.role === "editor" || user?.role === "author") && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <span className="cursor-pointer">{t("admin")}</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>{t("logout")}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-red-700 hover:bg-red-800 text-white font-medium px-4"
                >
                  <a href={getLoginUrl()}>Iniciar Sesión</a>
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-in slide-in-from-top">
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Buscar noticias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 border-gray-300 focus:border-red-700 focus:ring-red-700"
                    autoFocus
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar - Estilo BBC */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <nav className="hidden lg:flex items-center h-12 gap-6">
            <Link href="/">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location === "/" ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Inicio
              </span>
            </Link>
            <Link href="/politica">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/politica") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Política
              </span>
            </Link>
            <Link href="/economia">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/economia") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Economía
              </span>
            </Link>
            <Link href="/judicial">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/judicial") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Judicial
              </span>
            </Link>
            <Link href="/sociedad">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/sociedad") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Sociedad
              </span>
            </Link>
            <Link href="/internacional">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/internacional") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Internacional
              </span>
            </Link>
            <Link href="/opinion">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/opinion") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Opinión
              </span>
            </Link>
            <Link href="/elecciones">
              <span className={`text-sm font-medium hover:text-red-400 transition-colors cursor-pointer border-b-2 ${
                location.includes("/elecciones") ? "border-red-500" : "border-transparent"
              } h-12 flex items-center`}>
                Elecciones
              </span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location === "/" ? "bg-red-50 text-red-700" : ""
              }`}>
                Inicio
              </span>
            </Link>
            <Link href="/politica" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/politica") ? "bg-red-50 text-red-700" : ""
              }`}>
                Política
              </span>
            </Link>
            <Link href="/economia" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/economia") ? "bg-red-50 text-red-700" : ""
              }`}>
                Economía
              </span>
            </Link>
            <Link href="/judicial" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/judicial") ? "bg-red-50 text-red-700" : ""
              }`}>
                Judicial
              </span>
            </Link>
            <Link href="/sociedad" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/sociedad") ? "bg-red-50 text-red-700" : ""
              }`}>
                Sociedad
              </span>
            </Link>
            <Link href="/internacional" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/internacional") ? "bg-red-50 text-red-700" : ""
              }`}>
                Internacional
              </span>
            </Link>
            <Link href="/opinion" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/opinion") ? "bg-red-50 text-red-700" : ""
              }`}>
                Opinión
              </span>
            </Link>
            <Link href="/elecciones" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/elecciones") ? "bg-red-50 text-red-700" : ""
              }`}>
                Elecciones
              </span>
            </Link>
            <Link href="/provincias" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded transition-colors cursor-pointer ${
                location.includes("/provincias") ? "bg-red-50 text-red-700" : ""
              }`}>
                Provincias
              </span>
            </Link>
            
            {/* Mobile Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              
              {!isAuthenticated && (
                <Button 
                  asChild 
                  className="w-full bg-red-700 hover:bg-red-800"
                >
                  <a href={getLoginUrl()}>Iniciar Sesión</a>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

