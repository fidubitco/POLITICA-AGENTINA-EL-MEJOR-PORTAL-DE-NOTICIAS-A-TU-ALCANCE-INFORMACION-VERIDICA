import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getLocale } from '@/lib/locales'
import Link from 'next/link'
import newsData from '@/data/news-seed.json'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const localeData = getLocale(locale)

  // Get featured article
  const featuredArticle = newsData.find(n => n.featured) || newsData[0]

  // Get latest news excluding featured
  const latestNews = newsData
    .filter(n => n.id !== featuredArticle.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 8)

  // Get trending articles
  const trendingNews = newsData
    .filter(n => n.featured)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
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
            <LanguageSwitcher currentLocale={locale} />
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
              <Link href={`/${locale}`} className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors">
                Inicio
              </Link>
              <Link href={`/${locale}/noticias`} className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
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

      {/* Category Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-12 overflow-x-auto">
            {['Último Momento', 'Análisis', 'Investigación', 'Opinión', 'Internacional'].map((cat) => (
              <Link
                key={cat}
                href={`/${locale}/noticias`}
                className="text-sm font-medium text-gray-700 hover:text-red-600 whitespace-nowrap transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
          {/* Featured Article */}
          <Link href={`/${locale}/noticias/${featuredArticle.slug}`} className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-900 aspect-video mb-4 rounded-sm">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <Badge className="bg-red-600 text-white mb-3 uppercase text-xs font-bold">
                  {featuredArticle.category}
                </Badge>
                <h2 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">
                  {featuredArticle.title}
                </h2>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed line-clamp-3">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="font-medium">{featuredArticle.author}</span>
              <span>•</span>
              <time>{new Date(featuredArticle.publishedAt).toLocaleDateString(locale)}</time>
            </div>
          </Link>

          {/* Trending Sidebar */}
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-600">
              Más Leídas
            </h3>
            <div className="space-y-6">
              {trendingNews.map((news, index) => (
                <Link
                  key={news.id}
                  href={`/${locale}/noticias/${news.slug}`}
                  className="group flex gap-4"
                >
                  <span className="text-4xl font-serif font-bold text-gray-200 group-hover:text-red-600 transition-colors flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-gray-900 group-hover:text-red-600 mb-2 leading-tight transition-colors">
                      {news.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {news.category}
                      </Badge>
                      <time>{new Date(news.publishedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Latest News Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 pb-3 border-b border-gray-200">
            Últimas Noticias
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/${locale}/noticias/${news.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 aspect-[4/3] mb-4 rounded-sm">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 text-xs font-bold uppercase backdrop-blur-sm">
                    {news.category}
                  </Badge>
                </div>
                <h4 className="font-serif font-bold text-gray-900 group-hover:text-red-600 mb-2 leading-tight transition-colors line-clamp-3">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {news.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{news.author}</span>
                  <span>•</span>
                  <time>{new Date(news.publishedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}</time>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={`/${locale}/noticias`}>
              <Button variant="outline" size="lg" className="font-semibold">
                Ver Todas las Noticias
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
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
