"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsArticle {
  id: number;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  excerpt: string;
  status?: string;
}

interface NewsTableProps {
  articles: NewsArticle[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

/**
 * NewsTable Component
 * Interactive table for managing news articles with search, filter, and pagination
 */
export function NewsTable({ articles, onEdit, onDelete, onView }: NewsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const itemsPerPage = 10;

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(articles.map(a => a.category)))];

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || article.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: number) => {
    setDeleteDialog(id);
  };

  const confirmDelete = () => {
    if (deleteDialog && onDelete) {
      onDelete(deleteDialog);
      setDeleteDialog(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Todas las categorías" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-zinc-500">
        Mostrando {paginatedArticles.length} de {filteredArticles.length} artículos
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400">Título</TableHead>
              <TableHead className="text-zinc-400">Categoría</TableHead>
              <TableHead className="text-zinc-400">Autor</TableHead>
              <TableHead className="text-zinc-400">Fecha</TableHead>
              <TableHead className="text-zinc-400">Estado</TableHead>
              <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedArticles.map((article) => (
              <TableRow key={article.id} className="border-zinc-800 hover:bg-zinc-800/30">
                <TableCell className="font-medium max-w-md">
                  <div className="flex flex-col gap-1">
                    <span className="line-clamp-1">{article.title}</span>
                    <span className="text-xs text-zinc-500 line-clamp-1">{article.excerpt}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-zinc-700">
                    {article.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-400">{article.author}</TableCell>
                <TableCell className="text-zinc-400">{formatDate(article.publishedAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {article.featured && (
                      <Badge className="bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30">
                        Destacado
                      </Badge>
                    )}
                    <Badge
                      className={
                        article.status === 'PUBLISHED'
                          ? 'bg-green-600/20 text-green-500'
                          : 'bg-orange-600/20 text-orange-500'
                      }
                    >
                      {article.status || 'Publicado'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView?.(article.id)}
                      className="hover:bg-blue-600/20 hover:text-blue-500"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit?.(article.id)}
                      className="hover:bg-green-600/20 hover:text-green-500"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="hover:bg-red-600/20 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-500">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-zinc-800 hover:bg-zinc-800"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-zinc-800 hover:bg-zinc-800"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog !== null} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription className="text-zinc-400">
              ¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog(null)}
              className="border-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
