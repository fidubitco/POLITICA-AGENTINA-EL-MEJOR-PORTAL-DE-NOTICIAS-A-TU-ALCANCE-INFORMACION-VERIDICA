"use client";

import Link from "next/link";
import { Menu, Search, User, X, Bell, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: "Política", slug: "politica", color: "red" },
    { name: "Economía", slug: "economia", color: "blue" },
    { name: "Sociedad", slug: "sociedad", color: "purple" },
    { name: "Internacional", slug: "internacional", color: "green" },
    { name: "Deportes", slug: "deportes", color: "yellow" },
    { name: "Tecnología", slug: "tecnologia", color: "blue" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`bg-black/95 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-2xl shadow-zinc-950/50" : ""
        }`}
      >
        {/* Top Bar - Breaking News Ticker */}
        <div className="border-b border-zinc-900 bg-gradient-to-r from-red-950/20 to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-xs overflow-hidden">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="flex items-center gap-1 text-red-500 font-bold uppercase tracking-wide whitespace-nowrap">
                  <Zap className="w-3 h-3 fill-current animate-pulse" />
                  Último momento
                </span>
                <motion.div
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex gap-8 whitespace-nowrap text-zinc-300"
                >
                  <span>• Argentina alcanza acuerdo histórico con el FMI</span>
                  <span>• Récord de exportaciones en el sector agrícola</span>
                  <span>• Nueva ley de educación aprobada en el Congreso</span>
                </motion.div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ingresar</span>
                </Link>
                <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition">
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden p-2 hover:bg-zinc-900 rounded-lg transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/50"
              >
                <span className="text-white font-black text-xl">PA</span>
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  POLÍTICA ARGENTINA
                </h1>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Noticias en vivo 24/7
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-zinc-900"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 hover:bg-red-950/30 hover:text-red-400"
              >
                <TrendingUp className="w-4 h-4" />
                Tendencias
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-zinc-900 hidden lg:block">
          <div className="container mx-auto px-4">
            <ul className="flex items-center">
              {categories.map((cat, index) => (
                <motion.li
                  key={cat.slug}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="block px-5 py-3 text-sm font-semibold hover:bg-zinc-900 transition relative group"
                  >
                    {cat.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-zinc-900 bg-zinc-950/90 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Buscar noticias..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                      autoFocus
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs text-zinc-500">Búsquedas populares:</span>
                    {["FMI", "Elecciones", "Dólar", "Inflación"].map((term) => (
                      <button
                        key={term}
                        className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded-full text-xs transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div className="absolute top-0 left-0 bottom-0 w-80 bg-zinc-950 border-r border-zinc-800 overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Categorías</h2>
                <nav>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/categoria/${cat.slug}`}
                          className="block px-4 py-3 rounded-lg hover:bg-zinc-900 transition font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
