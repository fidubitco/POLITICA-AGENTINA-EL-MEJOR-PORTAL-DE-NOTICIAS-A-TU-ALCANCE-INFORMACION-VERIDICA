/**
 * 🗺️ GENERADOR DE SITEMAP DINÁMICO - ENTERPRISE GRADE
 * Genera sitemap.xml automáticamente con todas las URLs
 */

import { categories } from '../../client/src/data/categories';
import { newsTemplates } from '../../client/src/data/newsTemplates';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://politicaargentina.com';

/**
 * Generar sitemap completo
 */
export const generateSitemap = (): string => {
  const urls: SitemapUrl[] = [];

  // 1. Página principal
  urls.push({
    loc: BASE_URL,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'hourly',
    priority: 1.0
  });

  // 2. Páginas de categorías
  categories.forEach(category => {
    urls.push({
      loc: `${BASE_URL}/${category.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.9
    });

    // Subcategorías
    category.subcategories?.forEach(sub => {
      urls.push({
        loc: `${BASE_URL}/${category.slug}/${sub.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: 0.8
      });
    });
  });

  // 3. Artículos de noticias
  newsTemplates.forEach(article => {
    urls.push({
      loc: `${BASE_URL}/${article.category}/${article.slug}`,
      lastmod: article.updatedAt || article.publishedAt,
      changefreq: 'weekly',
      priority: article.featured ? 0.9 : 0.7
    });
  });

  // 4. Páginas especiales
  const specialPages = [
    { slug: 'candidatos', priority: 0.8 },
    { slug: 'encuestas', priority: 0.8 },
    { slug: 'resultados-electorales', priority: 0.8 },
    { slug: 'finanzas', priority: 0.7 }
  ];

  specialPages.forEach(page => {
    urls.push({
      loc: `${BASE_URL}/${page.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: page.priority
    });
  });

  // Generar XML
  return generateXML(urls);
};

/**
 * Generar XML del sitemap
 */
const generateXML = (urls: SitemapUrl[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url.loc)}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
};

/**
 * Escapar caracteres especiales XML
 */
const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Generar sitemap index (para múltiples sitemaps)
 */
export const generateSitemapIndex = (sitemaps: string[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${BASE_URL}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });

  xml += '</sitemapindex>';
  return xml;
};

/**
 * Generar robots.txt dinámico
 */
export const generateRobotsTxt = (): string => {
  return `# Robots.txt para Política Argentina
# https://politicaargentina.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-news.xml

# Crawl-delay para bots agresivos
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: Slurp
Crawl-delay: 1

# Bloquear bots malos
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /
`;
};

/**
 * Generar sitemap específico para noticias (Google News)
 */
export const generateNewsSitemap = (): string => {
  const recentNews = newsTemplates
    .filter(article => {
      const publishDate = new Date(article.publishedAt);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return publishDate > twoDaysAgo;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

  recentNews.forEach(article => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/${article.category}/${article.slug}</loc>\n`;
    xml += '    <news:news>\n';
    xml += '      <news:publication>\n';
    xml += '        <news:name>Política Argentina</news:name>\n';
    xml += '        <news:language>es</news:language>\n';
    xml += '      </news:publication>\n';
    xml += `      <news:publication_date>${article.publishedAt}</news:publication_date>\n`;
    xml += `      <news:title>${escapeXml(article.title)}</news:title>\n`;
    xml += `      <news:keywords>${article.keywords.join(', ')}</news:keywords>\n`;
    xml += '    </news:news>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
};

