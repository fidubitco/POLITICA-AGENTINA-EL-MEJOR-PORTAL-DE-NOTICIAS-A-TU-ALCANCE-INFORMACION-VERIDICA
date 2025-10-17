"use client";

import { useState, useEffect } from "react";
import { Search, FileText, User, Tag, TrendingUp, Clock, X } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface SearchResult {
  id: string;
  type: "article" | "category" | "tag" | "author";
  title: string;
  description?: string;
  url: string;
  date?: string;
  views?: number;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "article",
    title: "Nueva reforma económica del gobierno argentino",
    description: "Análisis completo de las medidas económicas anunciadas por el gobierno...",
    url: "/noticia/nueva-reforma-economica",
    date: "2025-10-15",
    views: 8500,
  },
  {
    id: "2",
    type: "article",
    title: "Crisis energética: medidas urgentes para el sector",
    description: "El gobierno anuncia medidas de emergencia ante la crisis energética...",
    url: "/noticia/crisis-energetica-medidas",
    date: "2025-10-14",
    views: 6800,
  },
  {
    id: "3",
    type: "category",
    title: "Economía",
    description: "Noticias sobre economía, finanzas y mercados",
    url: "/categoria/economia",
  },
  {
    id: "4",
    type: "tag",
    title: "Inflación",
    url: "/tag/inflacion",
  },
  {
    id: "5",
    type: "author",
    title: "Juan Pérez - Editor Político",
    url: "/autor/juan-perez",
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
      // Simulate API call
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.description?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "article":
        return FileText;
      case "category":
        return Tag;
      case "tag":
        return Tag;
      case "author":
        return User;
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "article":
        return "Artículo";
      case "category":
        return "Categoría";
      case "tag":
        return "Tag";
      case "author":
        return "Autor";
    }
  };

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "article":
        return "text-blue-400 bg-blue-900/20";
      case "category":
        return "text-green-400 bg-green-900/20";
      case "tag":
        return "text-purple-400 bg-purple-900/20";
      case "author":
        return "text-yellow-400 bg-yellow-900/20";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20"
      onClick={onClose}
    >
      <Card
        className="bg-zinc-900 border-zinc-800 w-full max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-6 border-b border-zinc-800">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artículos, categorías, tags, autores..."
              className="w-full pl-14 pr-12 py-4 bg-zinc-950 border border-zinc-800 rounded-xl text-lg outline-none focus:border-blue-600 transition-colors"
              autoFocus
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono">↑↓</kbd>
              <span>navegar</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono">Enter</kbd>
              <span>abrir</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono">Esc</kbd>
              <span>cerrar</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto p-4">
          {isSearching && (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-zinc-500">Buscando...</p>
            </div>
          )}

          {!isSearching && query && results.length === 0 && (
            <div className="py-12 text-center">
              <Search className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm text-zinc-500">No se encontraron resultados para "{query}"</p>
            </div>
          )}

          {!isSearching && query && results.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 mb-4 px-2">
                {results.length} resultado{results.length !== 1 ? "s" : ""}
              </p>

              {results.map((result, index) => {
                const Icon = getIcon(result.type);
                const isSelected = index === selectedIndex;

                return (
                  <Link
                    key={result.id}
                    href={result.url}
                    className={`block p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-900/10"
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-950"
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${getTypeColor(result.type)} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-bold text-sm line-clamp-1">{result.title}</h3>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {getTypeLabel(result.type)}
                          </Badge>
                        </div>

                        {result.description && (
                          <p className="text-sm text-zinc-500 line-clamp-2 mb-2">{result.description}</p>
                        )}

                        {result.type === "article" && (
                          <div className="flex items-center gap-4 text-xs text-zinc-600">
                            {result.date && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(result.date).toLocaleDateString("es-AR")}
                              </div>
                            )}
                            {result.views && (
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {result.views.toLocaleString()} vistas
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="py-12 text-center">
              <Search className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Búsqueda Global</h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto">
                Comienza a escribir para buscar artículos, categorías, tags y autores
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
