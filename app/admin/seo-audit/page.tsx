import SEOAuditorClient from "./SEOAuditorClient";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function SEOAuditPage() {
  // Get latest audit or create stats
  const latestAudit = await db.seoAudit.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  // Get posts for analysis
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      id: true,
      title: true,
      slug: true,
      metaTitle: true,
      metaDesc: true,
      content: true,
      excerpt: true,
      coverImage: true,
      updatedAt: true,
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            SEO Auditor
          </h1>
          <p className="text-zinc-500 mt-2">
            Análisis avanzado de SEO y optimización de contenido
          </p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm">
          Advanced SEO
        </div>
      </div>

      {/* Client Component */}
      <SEOAuditorClient latestAudit={latestAudit} posts={posts} />
    </div>
  );
}
