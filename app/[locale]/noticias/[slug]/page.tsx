import { getLocale } from '@/lib/locales'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import newsData from '@/data/news-seed.json'
import { Badge } from '@/components/ui/badge'
import { PodcastPlayer } from '@/components/PodcastPlayer'
import {
  DEFAULT_SEO_CONFIG,
  generateMetadata as generateSEOMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo'

export async function generateStaticParams() {
  return newsData.map((news) => ({
    slug: news.slug,
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const article = newsData.find(n => n.slug === slug)

  if (!article) {
    return {
      title: 'Artículo no encontrado',
      description: 'El artículo que buscas no existe'
    }
  }

  return generateSEOMetadata({
    title: article.title,
    description: article.excerpt,
    url: `${DEFAULT_SEO_CONFIG.siteUrl}/${locale}/noticias/${article.slug}`,
    siteName: DEFAULT_SEO_CONFIG.siteName,
    locale,
    type: 'article',
    image: article.imageUrl || DEFAULT_SEO_CONFIG.ogImage,
    keywords: [...DEFAULT_SEO_CONFIG.keywords, ...article.tags],
    author: article.author,
    publishedTime: article.publishedAt,
    modifiedTime: article.publishedAt,
  })
}

export default async function NewsArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const localeData = getLocale(locale)

  // Find the news article
  const article = newsData.find(n => n.slug === slug)

  if (!article) {
    notFound()
  }

  // Get related articles from same category
  const relatedArticles = newsData
    .filter(n => n.category === article.category && n.id !== article.id)
    .slice(0, 3)

  // Placeholder audio URL (in production, this would be generated via TTS)
  const audioUrl = '/audio/sample-news.mp3'

  // Generate JSON-LD schemas
  const articleUrl = `${DEFAULT_SEO_CONFIG.siteUrl}/${locale}/noticias/${article.slug}`

  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl || `${DEFAULT_SEO_CONFIG.siteUrl}${DEFAULT_SEO_CONFIG.ogImage}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: article.author,
    publisher: {
      name: DEFAULT_SEO_CONFIG.siteName,
      logo: `${DEFAULT_SEO_CONFIG.siteUrl}${DEFAULT_SEO_CONFIG.logo}`,
    },
    url: articleUrl,
    articleBody: article.content,
    keywords: article.tags,
    category: article.category,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: `${DEFAULT_SEO_CONFIG.siteUrl}/${locale}` },
    { name: 'Noticias', url: `${DEFAULT_SEO_CONFIG.siteUrl}/${locale}/noticias` },
    { name: article.title, url: articleUrl },
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <time className="font-medium">
                {new Date().toLocaleDateString(locale, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-gray-900 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center">
              <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight">
                POLÍTICA ARGENTINA
              </h1>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href={`/${locale}`} className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                Inicio
              </Link>
              <Link href={`/${locale}/noticias`} className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors">
                Noticias
              </Link>
              <Link href={`/${locale}/noticias`} className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                Política
              </Link>
              <Link href={`/${locale}/noticias`} className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                Economía
              </Link>
              <Link href={`/${locale}/noticias`} className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                Justicia
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 h-10 text-sm">
            <Link href={`/${locale}`} className="text-gray-600 hover:text-red-600">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${locale}/noticias`} className="text-gray-600 hover:text-red-600">Noticias</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{article.category}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article */}
        <article>
          {/* Category and Date */}
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-red-600 text-white text-xs uppercase px-3 py-1 font-bold">
              {article.category}
            </Badge>
            <span className="text-gray-500 text-sm">
              {new Date(article.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Author and Meta */}
          <div className="flex items-center gap-4 pb-6 mb-8 border-b-2 border-gray-200">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-700 text-lg font-bold">
                {article.author.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{article.author}</div>
              <div className="text-sm text-gray-500">
                {new Date(article.publishedAt).toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit'
                })} hs
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="mb-8 pl-6 border-l-4 border-red-600">
            <p className="text-xl text-gray-800 leading-relaxed italic font-medium">
              {article.excerpt}
            </p>
          </div>

          {/* Featured Image Placeholder */}
          <div className="mb-10 bg-gray-200 aspect-video rounded-sm"></div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-10">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-8 mb-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-gray-600 mr-2">Etiquetas:</span>
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Podcast Player Section */}
        <div className="mb-12 py-8 border-t border-b border-gray-200 bg-gray-50">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-serif font-bold text-gray-900">Escucha esta noticia</h3>
              <Badge className="bg-gray-700 text-white text-xs px-2 py-1">Audio</Badge>
            </div>
            <p className="text-sm text-gray-600">
              Versión en audio generada con IA - Próximamente disponible
            </p>
          </div>
          <PodcastPlayer
            audioUrl={audioUrl}
            title={article.title}
            author={article.author}
          />
          <p className="text-center text-gray-500 text-xs mt-3">
            Audio generado mediante Text-to-Speech de Hugging Face
          </p>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
              Noticias Relacionadas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/noticias/${related.slug}`}
                  className="group"
                >
                  <article>
                    <div className="relative overflow-hidden bg-gray-200 aspect-[16/10] mb-4 rounded-sm"></div>
                    <h3 className="font-serif font-bold text-gray-900 group-hover:text-red-600 mb-2 leading-tight transition-colors line-clamp-3">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {related.category}
                      </Badge>
                      <time>{new Date(related.publishedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}</time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href={`/${locale}/noticias`} className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Noticias
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">POLÍTICA ARGENTINA</h3>
              <p className="text-gray-400 text-sm">
                Tu fuente confiable de noticias políticas en Argentina
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Secciones</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href={`/${locale}/noticias`} className="hover:text-white">Noticias</Link></li>
                <li><Link href={`/${locale}/noticias`} className="hover:text-white">Política</Link></li>
                <li><Link href={`/${locale}/noticias`} className="hover:text-white">Economía</Link></li>
                <li><Link href={`/${locale}/noticias`} className="hover:text-white">Justicia</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Acerca de</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
                <li><a href="#" className="hover:text-white">Publicidad</a></li>
                <li><a href="#" className="hover:text-white">Términos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Política Argentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
