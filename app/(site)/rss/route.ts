import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 50,
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true, email: true } },
      },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>POLÍTICA ARGENTINA</title>
    <link>${siteUrl}</link>
    <description>Portal líder de noticias políticas y económicas de Argentina</description>
    <language>es-AR</language>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map((post) => {
        const publishedDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString();
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/noticia/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/noticia/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${publishedDate}</pubDate>
      ${post.category ? `<category><![CDATA[${post.category.name}]]></category>` : ''}
      ${post.author ? `<author><![CDATA[${post.author.email || 'noreply@politica-argentina.com'} (${post.author.name})]]></author>` : ''}
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
