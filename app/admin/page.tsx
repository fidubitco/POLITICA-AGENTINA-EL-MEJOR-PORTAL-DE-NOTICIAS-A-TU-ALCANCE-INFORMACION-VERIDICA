import { prisma } from "@/lib/db";
import { PostStatus } from "@prisma/client";

export default async function AdminDashboard() {
  const [total, published, draft] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: PostStatus.PUBLISHED } }),
    prisma.post.count({ where: { status: PostStatus.DRAFT } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Bienvenido al panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <p className="text-sm text-zinc-400">Total Posts</p>
          <p className="text-3xl font-bold mt-2">{total}</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <p className="text-sm text-zinc-400">Publicados</p>
          <p className="text-3xl font-bold mt-2 text-green-500">{published}</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <p className="text-sm text-zinc-400">Borradores</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{draft}</p>
        </div>
      </div>
    </div>
  );
}
