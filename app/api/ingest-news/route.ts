import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsSources } from "@/lib/news-sources";
import { fetchRSSArticles, scrapeArticleContent, cleanContent, generateUniqueSlug } from "@/lib/news-scraper";
import { rewriteContent, generateExcerpt, categorizeArticle, generateTags } from "@/lib/ai-content-processor";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = { processed: 0, created: 0, skipped: 0, errors: 0 };
    const adminUser = await db.user.findFirst({ where: { role: "ADMIN" } });

    if (!adminUser) {
      return NextResponse.json({ error: "No admin user found" }, { status: 500 });
    }

    const categories = await db.category.findMany();
    const categoryMap = new Map(categories.map(c => [c.slug, c.id]));

    for (const source of newsSources) {
      for (const feedUrl of source.rssFeeds) {
        try {
          const articles = await fetchRSSArticles(feedUrl, source.name);

          for (const article of articles) {
            results.processed++;

            try {
              const existing = await db.post.findFirst({
                where: { canonicalUrl: article.url },
              });

              if (existing) {
                results.skipped++;
                continue;
              }

              let finalContent = article.content;
              let finalTitle = article.title;
              let finalImage = article.coverImage;

              if (finalContent.length < 200) {
                const scrapedData = await scrapeArticleContent(article.url, source);
                finalContent = scrapedData.content || finalContent;
                finalTitle = scrapedData.title || finalTitle;
                finalImage = scrapedData.coverImage || finalImage;
              }

              finalContent = cleanContent(finalContent);

              const [rewrittenContent, excerpt, categorySlug, tags] = await Promise.all([
                rewriteContent(finalContent, finalTitle),
                generateExcerpt(finalContent, finalTitle),
                categorizeArticle(finalTitle, finalContent),
                generateTags(finalTitle, finalContent),
              ]);

              let categoryId = categoryMap.get(categorySlug);
              if (!categoryId) {
                const newCategory = await db.category.create({
                  data: {
                    slug: categorySlug,
                    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
                  },
                });
                categoryId = newCategory.id;
                categoryMap.set(categorySlug, categoryId);
              }

              const tagIds: string[] = [];
              for (const tagName of tags) {
                const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
                let tag = await db.tag.findUnique({ where: { slug: tagSlug } });
                
                if (!tag) {
                  tag = await db.tag.create({
                    data: { slug: tagSlug, name: tagName },
                  });
                }
                
                tagIds.push(tag.id);
              }

              await db.post.create({
                data: {
                  title: finalTitle,
                  slug: generateUniqueSlug(finalTitle),
                  excerpt,
                  content: rewrittenContent,
                  coverImage: finalImage,
                  authorId: adminUser.id,
                  categoryId,
                  canonicalUrl: article.url,
                  status: "PUBLISHED",
                  publishedAt: article.publishedAt,
                  tags: { connect: tagIds.map(id => ({ id })) },
                },
              });

              results.created++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch {
              results.errors++;
            }
          }
        } catch {
          results.errors++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "News ingestion endpoint. Use POST with secret to trigger.",
    sources: newsSources.map(s => s.name),
  });
}
