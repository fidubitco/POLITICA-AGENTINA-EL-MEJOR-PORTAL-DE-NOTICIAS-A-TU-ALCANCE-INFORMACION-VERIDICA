import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const posts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        gte: new Date(Date.now() - 48 * 60 * 60 * 1000), // Last 48 hours
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 1000,
    include: {
      category: { select: { name: true } },
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${posts
  .map(
    (post) => `  <url>
    <loc>${siteUrl}/noticia/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>POLÍTICA ARGENTINA</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${post.publishedAt?.toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
      ${post.category ? `<news:keywords>${escapeXml(post.category.name)}</news:keywords>` : ""}
    </news:news>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
