"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Post, Category, User } from "@prisma/client";
import { deletePost, duplicatePost } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PostWithRelations = Post & {
  author: Pick<User, "name" | "email">;
  category: Pick<Category, "name"> | null;
};

interface PostsClientProps {
  initialPosts: PostWithRelations[];
  categories: Category[];
}

const statusConfig = {
  DRAFT: { label: "Borrador", color: "bg-zinc-700 text-zinc-300" },
  REVIEW: { label: "Revisión", color: "bg-yellow-900/30 text-yellow-400" },
  PUBLISHED: { label: "Publicado", color: "bg-green-900/30 text-green-400" },
  SCHEDULED: { label: "Programado", color: "bg-blue-900/30 text-blue-400" },
};

export default function PostsClient({
  initialPosts,
  categories,
}: PostsClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.categoryId === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = async () => {
    if (!selectedPost) return;

    startTransition(async () => {
      try {
        await deletePost(selectedPost);
        setPosts(posts.filter((p) => p.id !== selectedPost));
        setDeleteDialogOpen(false);
        setSelectedPost(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error al eliminar el artículo");
      }
    });
  };

  const handleDuplicate = async (postId: string) => {
    startTransition(async () => {
      try {
        const result = await duplicatePost(postId);
        if (result.success) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error duplicating post:", error);
        alert("Error al duplicar el artículo");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artículos</h1>
          <p className="text-zinc-400 mt-1">
            {filteredPosts.length} de {posts.length} artículos
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Artículo
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black border-zinc-800"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-black border-zinc-800">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="DRAFT">Borrador</SelectItem>
              <SelectItem value="REVIEW">Revisión</SelectItem>
              <SelectItem value="PUBLISHED">Publicado</SelectItem>
              <SelectItem value="SCHEDULED">Programado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-black border-zinc-800">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="w-[50%]">Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Vistas</TableHead>
              <TableHead>Actualizado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium line-clamp-1">{post.title}</p>
                      <p className="text-sm text-zinc-500 line-clamp-1">
                        /{post.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-zinc-400">
                  {post.author.name || post.author.email}
                </TableCell>
                <TableCell>
                  {post.category ? (
                    <Badge variant="outline" className="text-xs">
                      {post.category.name}
                    </Badge>
                  ) : (
                    <span className="text-zinc-500 text-sm">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${statusConfig[post.status].color} text-xs`}
                  >
                    {statusConfig[post.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-center text-sm">
                  {post.views.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-zinc-400">
                  {formatDistanceToNow(new Date(post.updatedAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    {post.status === "PUBLISHED" && (
                      <Link
                        href={`/noticia/${post.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-zinc-700 rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-zinc-700 rounded-lg transition">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDuplicate(post.id)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedPost(post.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500 mb-4">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? "No se encontraron artículos con estos filtros"
                : "No hay artículos todavía"}
            </p>
            {!searchQuery && statusFilter === "all" && categoryFilter === "all" && (
              <Link href="/admin/posts/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear primer artículo
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar artículo</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este artículo? Esta acción no
              se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
