import { db } from "@/lib/db";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

  const posts = await (db as any).post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 1000,
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/acerca",
    "/contacto",
    "/terminos",
    "/privacidad",
  ].map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date() }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p: any) => ({
    url: `${siteUrl}/noticia/${p.slug}`,
    lastModified: p.updatedAt ?? new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}


