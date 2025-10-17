"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Tag as TagIcon, Globe } from "lucide-react";
import { Category, PostStatus } from "@prisma/client";
import { createPost } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface NewPostFormProps {
  categories: Category[];
}

export default function NewPostForm({ categories }: NewPostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    status: "DRAFT" as PostStatus,
    metaTitle: "",
    metaDesc: "",
    tags: "",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("slug", formData.slug);
        formDataObj.append("excerpt", formData.excerpt);
        formDataObj.append("content", JSON.stringify(formData.content));
        formDataObj.append("coverImage", formData.coverImage);
        formDataObj.append("categoryId", formData.categoryId);
        formDataObj.append("status", formData.status);
        formDataObj.append("metaTitle", formData.metaTitle);
        formDataObj.append("metaDesc", formData.metaDesc);
        formDataObj.append("tags", formData.tags);

        await createPost(formDataObj);
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Error al crear el artículo");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 hover:bg-zinc-900 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Nuevo Artículo</h1>
            <p className="text-zinc-400 mt-1">
              Crea un nuevo artículo para el portal
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isPending} className="gap-2">
          <Save className="w-4 h-4" />
          {isPending ? "Guardando..." : "Crear artículo"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Contenido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  required
                  className="bg-black border-zinc-800 text-lg font-semibold"
                  placeholder="Título del artículo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">/noticia/</span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="bg-black border-zinc-800 flex-1"
                    placeholder="slug-del-articulo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Extracto</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="bg-black border-zinc-800 resize-none"
                  placeholder="Breve descripción del artículo que aparecerá en las vistas previas"
                />
              </div>

              <div className="space-y-2">
                <Label>Contenido *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) =>
                    setFormData({ ...formData, content })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <CardTitle>SEO</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                  placeholder={formData.title || "Título para SEO"}
                  maxLength={60}
                />
                <p className="text-xs text-zinc-500">
                  {formData.metaTitle.length}/60 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDesc">Meta Descripción</Label>
                <Textarea
                  id="metaDesc"
                  value={formData.metaDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, metaDesc: e.target.value })
                  }
                  rows={3}
                  className="bg-black border-zinc-800 resize-none"
                  placeholder="Descripción para motores de búsqueda"
                  maxLength={160}
                />
                <p className="text-xs text-zinc-500">
                  {formData.metaDesc.length}/160 caracteres
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: PostStatus) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status" className="bg-black border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Borrador</SelectItem>
                    <SelectItem value="REVIEW">En revisión</SelectItem>
                    <SelectItem value="PUBLISHED">Publicado</SelectItem>
                    <SelectItem value="SCHEDULED">Programado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Imagen destacada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverImage">URL de la imagen</Label>
                <Input
                  id="coverImage"
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              {formData.coverImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger className="bg-black border-zinc-800">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin categoría</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TagIcon className="w-5 h-5" />
                <CardTitle>Etiquetas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
              <Textarea
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                rows={3}
                className="bg-black border-zinc-800 resize-none"
                placeholder="política, economía, argentina"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
