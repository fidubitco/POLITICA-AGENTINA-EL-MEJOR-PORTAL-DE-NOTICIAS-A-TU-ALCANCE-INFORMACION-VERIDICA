"use client";

import { useState, useTransition } from "react";
import { Plus, Edit, Trash2, Palette, GripVertical } from "lucide-react";
import { Category } from "@prisma/client";
import { createCategory, updateCategory, deleteCategory } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryWithCount = Category & {
  _count: { posts: number };
};

interface CategoriesClientProps {
  initialCategories: CategoryWithCount[];
}

export default function CategoriesClient({
  initialCategories,
}: CategoriesClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#4f46e5",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#4f46e5",
    });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleCreate = async () => {
    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("slug", formData.slug);
        formDataObj.append("description", formData.description);
        formDataObj.append("color", formData.color);

        await createCategory(formDataObj);
        setIsCreateDialogOpen(false);
        resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error creating category:", error);
        alert("Error al crear la categoría");
      }
    });
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("slug", formData.slug);
        formDataObj.append("description", formData.description);
        formDataObj.append("color", formData.color);

        await updateCategory(editingCategory.id, formDataObj);
        setEditingCategory(null);
        resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Error al actualizar la categoría");
      }
    });
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;

    startTransition(async () => {
      try {
        await deleteCategory(deletingCategory.id);
        setCategories(categories.filter((c) => c.id !== deletingCategory.id));
        setDeletingCategory(null);
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error al eliminar la categoría");
      }
    });
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      color: category.color || "#4f46e5",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorías</h1>
          <p className="text-zinc-400 mt-1">
            {categories.length} categorías totales
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </Button>
      </div>

      {/* Categories Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <Table>
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-center">Artículos</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <GripVertical className="w-4 h-4 text-zinc-600 cursor-move" />
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-zinc-400">{category.slug}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-zinc-700"
                      style={{ backgroundColor: category.color || "#4f46e5" }}
                    />
                    <span className="text-xs text-zinc-500 font-mono">
                      {category.color}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="px-2 py-1 bg-zinc-800 rounded text-sm">
                    {category._count.posts}
                  </span>
                </TableCell>
                <TableCell className="text-zinc-400 max-w-xs truncate">
                  {category.description || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingCategory(category)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {categories.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500 mb-4">No hay categorías todavía</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Crear primera categoría
            </Button>
          </div>
        )}
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setEditingCategory(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar categoría" : "Nueva categoría"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Actualiza la información de la categoría"
                : "Crea una nueva categoría para organizar los artículos"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  })
                }
                placeholder="Política, Economía, etc."
                className="bg-black border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="politica, economia, etc."
                className="bg-black border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                placeholder="Descripción de la categoría"
                className="bg-black border-zinc-800 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="w-12 h-12 rounded border border-zinc-800 cursor-pointer"
                />
                <Input
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  placeholder="#4f46e5"
                  className="bg-black border-zinc-800 font-mono flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setEditingCategory(null);
                resetForm();
              }}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={editingCategory ? handleUpdate : handleCreate}
              disabled={isPending || !formData.name || !formData.slug}
            >
              {isPending
                ? "Guardando..."
                : editingCategory
                ? "Actualizar"
                : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar categoría</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la categoría "
              {deletingCategory?.name}"? Los artículos asociados no se
              eliminarán, pero perderán su categoría.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingCategory(null)}
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
