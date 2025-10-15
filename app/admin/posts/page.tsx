import Link from "next/link";
import { db } from "@/lib/db";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default async function PostsPage() {
  const posts = await db.post.findMany({
    orderBy: { updatedAt: "desc" },
    take: 50,
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true } },
    },
  });

  const statusColors = {
    DRAFT: "bg-zinc-700 text-zinc-300",
    REVIEW: "bg-yellow-900/30 text-yellow-400",
    PUBLISHED: "bg-green-900/30 text-green-400",
    SCHEDULED: "bg-blue-900/30 text-blue-400",
  };

  const statusLabels = {
    DRAFT: "Borrador",
    REVIEW: "Revisión",
    PUBLISHED: "Publicado",
    SCHEDULED: "Programado",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artículos</h1>
          <p className="text-zinc-400">Gestiona todos los artículos del portal</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Nuevo Artículo
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Título
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Autor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actualizado
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium line-clamp-1">{post.title}</p>
                        <p className="text-sm text-zinc-500">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {post.author.name || post.author.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {post.category?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        statusColors[post.status]
                      }`}
                    >
                      {statusLabels[post.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {formatDistanceToNow(new Date(post.updatedAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === "PUBLISHED" && (
                        <Link
                          href={`/noticia/${post.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-zinc-700 rounded-lg transition"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 hover:bg-zinc-700 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 hover:bg-red-900/20 text-red-400 rounded-lg transition"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500 mb-4">No hay artículos todavía</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              <Plus className="w-4 h-4" />
              Crear primer artículo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
