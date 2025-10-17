/**
 * DASHBOARD PRINCIPAL DEL USUARIO
 * 
 * Este es el dashboard personalizado para usuarios autenticados (no-admin).
 * Muestra estadísticas personales, posts del usuario, y acciones rápidas.
 * 
 * Features:
 * - Vista de posts propios
 * - Estadísticas personales
 * - Acciones rápidas (crear post, editar perfil)
 * - Notificaciones
 * - Actividad reciente
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { 
  FileText, 
  Eye, 
  TrendingUp, 
  Clock, 
  PlusCircle,
  Edit,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Si es admin, redirigir al admin dashboard
  const user = await db.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true, role: true, name: true, email: true },
  });

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  // Obtener estadísticas del usuario
  const userPosts = await db.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      category: { select: { name: true } },
    },
  });

  const stats = await db.post.aggregate({
    where: { authorId: user.id, status: "PUBLISHED" },
    _sum: { views: true },
    _count: { id: true },
  });

  const draftCount = await db.post.count({
    where: { authorId: user.id, status: "DRAFT" },
  });

  const totalViews = stats._sum.views || 0;
  const publishedCount = stats._count.id || 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bienvenido, {user.name || 'Usuario'}
            </h1>
            <p className="text-zinc-400">
              Panel de control personal • {user.role}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </Link>
            <Link href="/dashboard/posts/new">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Crear Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Posts Publicados"
            value={publishedCount}
            color="blue"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Borradores"
            value={draftCount}
            color="yellow"
          />
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            label="Vistas Totales"
            value={totalViews.toLocaleString()}
            color="green"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Promedio/Post"
            value={publishedCount > 0 ? Math.round(totalViews / publishedCount) : 0}
            color="purple"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Posts */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Mis Posts Recientes</h2>
              <Link href="/dashboard/posts">
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </Link>
            </div>

            {userPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-500 mb-4">
                  Aún no has creado ningún post
                </p>
                <Link href="/dashboard/posts/new">
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Crear mi primer post
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">
                          {post.title}
                        </h3>
                        <StatusBadge status={post.status} />
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <span>{post.category?.name}</span>
                        <span>•</span>
                        <span>{post.views} vistas</span>
                        <span>•</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/posts/${post.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">Acciones Rápidas</h3>
              <div className="space-y-2">
                <Link href="/dashboard/posts/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nuevo Post
                  </Button>
                </Link>
                <Link href="/dashboard/posts" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Mis Posts
                  </Button>
                </Link>
                <Link href="/dashboard/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </Link>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold">Notificaciones</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-zinc-800 rounded">
                  <p className="text-zinc-300">
                    👋 ¡Bienvenido a POLÍTICA ARGENTINA!
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Hace 1 día</p>
                </div>
                <div className="p-3 bg-zinc-800 rounded">
                  <p className="text-zinc-300">
                    📝 Comienza a escribir tu primer artículo
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Hace 2 días</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">💡 Tip del día</h3>
              <p className="text-sm opacity-90">
                Usa imágenes de alta calidad para aumentar el engagement de tus posts.
                Las noticias con imágenes reciben 3x más vistas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
  color: string;
}) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700',
    yellow: 'from-yellow-600 to-yellow-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    PUBLISHED: { label: 'Publicado', color: 'bg-green-600' },
    DRAFT: { label: 'Borrador', color: 'bg-yellow-600' },
    REVIEW: { label: 'Revisión', color: 'bg-blue-600' },
    SCHEDULED: { label: 'Programado', color: 'bg-purple-600' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${config.color}`}>
      {config.label}
    </span>
  );
}

