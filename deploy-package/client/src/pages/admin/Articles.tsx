import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Eye, Heart, MessageSquare, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: articles, isLoading, refetch } = trpc.articles.getAll.useQuery({ limit: 100, offset: 0 });
  const { data: categories } = trpc.categories.getActive.useQuery();
  // const deleteArticleMutation = trpc.articles.delete.useMutation({
  //   onSuccess: () => {
  //     toast.success("Artículo eliminado correctamente");
  //     refetch();
  //   },
  //   onError: (error: any) => {
  //     toast.error(`Error al eliminar: ${error.message}`);
  //   },
  // });

  const filteredArticles = articles?.filter((article) => {
    const matchesSearch = article.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || article.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || article.categoryId === parseInt(categoryFilter);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      toast.info("Función de eliminación en desarrollo");
      // deleteArticleMutation.mutate({ id });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      published: "default",
      draft: "secondary",
      archived: "destructive",
      scheduled: "outline",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status === "published" ? "Publicado" : status === "draft" ? "Borrador" : status === "archived" ? "Archivado" : "Programado"}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold">Artículos</h1>
            <p className="text-muted-foreground">Gestiona todos los artículos del portal</p>
          </div>
          <Button asChild>
            <Link href="/admin/articles/new">
              <span className="flex items-center gap-2 cursor-pointer">
                <Plus className="h-4 w-4" />
                Nuevo Artículo
              </span>
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Publicados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.filter((a) => a.status === "published").length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Borradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.filter((a) => a.status === "draft").length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Vistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles?.reduce((sum, a) => sum + a.views, 0).toLocaleString() || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtra y busca artículos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título o slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                  <SelectItem value="scheduled">Programado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Articles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Artículos</CardTitle>
            <CardDescription>
              {filteredArticles?.length || 0} artículo(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredArticles && filteredArticles.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artículo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Estadísticas</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {article.featuredImage && (
                              <img
                                src={article.featuredImage}
                                alt={article.slug}
                                className="w-16 h-12 rounded object-cover"
                              />
                            )}
                            <div>
                              <div className="font-medium line-clamp-1">{article.slug}</div>
                              <div className="text-sm text-muted-foreground">ID: {article.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(article.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {categories?.find((c) => c.id === article.categoryId)?.slug || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {article.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              0
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {article.publishedAt
                              ? format(new Date(article.publishedAt), "dd MMM yyyy", { locale: es })
                              : "No publicado"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/article/${article.slug}`}>
                                  <span className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" />
                                    Ver
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/articles/${article.id}/edit`}>
                                  <span className="flex items-center gap-2 cursor-pointer">
                                    <Pencil className="h-4 w-4" />
                                    Editar
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(article.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron artículos</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

