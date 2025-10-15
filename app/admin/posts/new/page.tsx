"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    status: "DRAFT",
    featured: false,
    breaking: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        router.push(`/admin/posts`);
        router.refresh();
      } else {
        alert("Error al crear el post");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear el post");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="space-y-6">
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
            <p className="text-zinc-400">Crea un nuevo artículo para el portal</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  required
                  className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Título del artículo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="slug-del-articulo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Extracto
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Breve descripción del artículo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contenido *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  rows={15}
                  className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                  placeholder="Contenido del artículo (HTML permitido)"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
              <h3 className="font-semibold">Publicación</h3>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="DRAFT">Borrador</option>
                  <option value="REVIEW">Revisión</option>
                  <option value="PUBLISHED">Publicado</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm">
                  Artículo destacado
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="breaking"
                  checked={formData.breaking}
                  onChange={(e) =>
                    setFormData({ ...formData, breaking: e.target.checked })
                  }
                  className="rounded"
                />
                <label htmlFor="breaking" className="text-sm">
                  Último momento
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 rounded-lg font-medium transition"
              >
                <Save className="w-4 h-4" />
                {loading ? "Guardando..." : "Guardar Artículo"}
              </button>
            </div>

            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
              <h3 className="font-semibold">Imagen destacada</h3>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
