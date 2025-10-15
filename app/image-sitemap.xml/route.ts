import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const posts = await db.post.findMany({
    where: {
      status: "PUBLISHED",
      coverImage: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    take: 5000,
    select: {
      slug: true,
      title: true,
      coverImage: true,
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${posts
  .filter((post) => post.coverImage)
  .map(
    (post) => `  <url>
    <loc>${siteUrl}/noticia/${post.slug}</loc>
    <image:image>
      <image:loc>${escapeXml(post.coverImage!)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
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
