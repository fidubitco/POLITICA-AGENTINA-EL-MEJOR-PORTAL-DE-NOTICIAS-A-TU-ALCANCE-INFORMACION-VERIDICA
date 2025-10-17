import SchedulerClient from "./SchedulerClient";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function SchedulerPage() {
  const scheduledPosts = await db.post.findMany({
    where: { status: 'SCHEDULED' },
    orderBy: { scheduledFor: 'asc' },
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true } },
    },
  });

  const recentJobs = await db.job.findMany({
    where: { type: 'publish_scheduled' },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Programador de Publicaciones
          </h1>
          <p className="text-zinc-500 mt-2">
            Sistema automático de publicación programada
          </p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-sm">
          Auto Publisher
        </div>
      </div>

      {/* Client Component */}
      <SchedulerClient scheduledPosts={scheduledPosts} recentJobs={recentJobs} />
    </div>
  );
}
