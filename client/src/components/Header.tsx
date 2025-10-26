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
import { Globe, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories } = trpc.categories.getActive.useQuery();
  const { data: languages } = trpc.languages.getActive.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

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

  return (
    <header className="sticky top-0 z-50 bg-white/90 supports-[backdrop-filter]:backdrop-blur border-b border-border shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary via-primary to-secondary text-white">
        <div className="container">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{t("breaking")}</span>
              <div className="hidden md:block overflow-hidden flex-1 max-w-xl">
                <div className="breaking-news-ticker whitespace-nowrap">
                  Últimas noticias • Breaking news • Notícias de última hora
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary-foreground hover:bg-primary-foreground/10">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{i18n.language.toUpperCase()}</span>
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

      {/* Main Header */}
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/logo.png" alt="Política Argentina" className="h-12 w-12" />
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-tight leading-none">Política Argentina</h1>
                <p className="text-xs text-muted-foreground hidden md:block tracking-wide">Portal de Noticias</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/">
              <span className={`text-sm font-medium hover:text-primary transition-colors cursor-pointer ${location === "/" ? "text-primary" : ""}`}>
                {t("home")}
              </span>
            </Link>
            {categories?.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <span
                  className={`text-sm font-medium hover:text-primary transition-colors cursor-pointer ${
                    location === `/category/${category.slug}` ? "text-primary" : ""
                  }`}
                >
                  {t(category.slug)}
                </span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
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
              <Button asChild size="sm">
                <a href={getLoginUrl()}>{t("login")}</a>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-in slide-in-from-top">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                  aria-label={t("searchPlaceholder") as string}
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top">
          <nav className="container py-4 flex flex-col gap-3" aria-label="Navegación móvil">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className={`block py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer ${location === "/" ? "text-primary" : ""}`}>
                {t("home")}
              </span>
            </Link>
            {categories?.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} onClick={() => setMobileMenuOpen(false)}>
                <span
                  className={`block py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer ${
                    location === `/category/${category.slug}` ? "text-primary" : ""
                  }`}
                >
                  {t(category.slug)}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

