import axios from "axios";
import * as cheerio from "cheerio";
import Parser from "rss-parser";
import { NewsSource } from "./news-sources";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media"],
      ["content:encoded", "contentEncoded"],
      ["description", "description"],
    ],
  },
});

export interface ScrapedArticle {
  title: string;
  url: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: Date;
  source: string;
  category?: string;
}

/**
 * Obtiene artículos desde RSS feeds
 */
export async function fetchRSSArticles(feedUrl: string, sourceName: string): Promise<ScrapedArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    const articles: ScrapedArticle[] = [];

    for (const item of feed.items.slice(0, 10)) {
      if (!item.link) continue;

      // Extraer imagen del feed
      let image = undefined;
      if (item.enclosure?.url) {
        image = item.enclosure.url;
      } else if ((item as { media?: { $?: { url?: string } } }).media?.$?.url) {
        image = (item as { media: { $: { url: string } } }).media.$.url;
      }

      articles.push({
        title: item.title || "Sin título",
        url: item.link,
        content: item.contentEncoded || item.content || item.description || "",
        excerpt: item.description?.substring(0, 300) || "",
        coverImage: image,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: sourceName,
        category: item.categories?.[0],
      });
    }

    return articles;
  } catch (error) {
    console.error(`Error fetching RSS ${feedUrl}:`, error);
    return [];
  }
}

/**
 * Scrape de contenido completo de una URL
 */
export async function scrapeArticleContent(
  url: string,
  source: NewsSource
): Promise<Partial<ScrapedArticle>> {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    // Extraer contenido usando los selectores del source
    const title = $(source.selectors.title).first().text().trim();
    const contentParagraphs = $(source.selectors.content)
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((text) => text.length > 50); // Filtrar párrafos muy cortos

    const content = contentParagraphs.join("\n\n");

    // Extraer imagen
    let coverImage = $(`meta[property='og:image']`).attr("content");
    if (!coverImage) {
      coverImage = $("article img").first().attr("src");
    }

    return {
      title: title || undefined,
      content: content || undefined,
      coverImage: coverImage || undefined,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return {};
  }
}

/**
 * Limpia y formatea el contenido HTML
 */
export function cleanContent(content: string): string {
  // Remover tags HTML excepto párrafos, links, listas
  const $ = cheerio.load(content);
  
  // Remover scripts, styles, ads
  $("script, style, iframe, .ad, .advertisement").remove();
  
  // Convertir a HTML limpio
  const cleaned = $("body").html() || content;
  
  return cleaned
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .trim();
}

/**
 * Genera un slug único desde el título
 */
export function generateUniqueSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 100);

  // Agregar timestamp para unicidad
  const timestamp = Date.now().toString(36);
  return `${baseSlug}-${timestamp}`;
}
