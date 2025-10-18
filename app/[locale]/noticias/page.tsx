import { getLocale } from '@/lib/locales'
import Link from 'next/link'
import newsData from '@/data/news-seed.json'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default async function NoticiasPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const localeData = getLocale(locale)

  // Get featured news
  const featuredNews = newsData.filter(n => n.featured).slice(0, 1)[0]

  // Get all news sorted by date, excluding featured
  const allNews = newsData
    .filter(n => n.id !== featuredNews?.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

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
            <span className="text-gray-900 font-medium">Noticias</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-3">Todas las Noticias</h2>
          <p className="text-lg text-gray-600">Cobertura completa de la actualidad política argentina</p>
        </div>

        {/* Featured Article */}
        {featuredNews && (
          <Link href={`/${locale}/noticias/${featuredNews.slug}`} className="group block mb-12 pb-12 border-b border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-900 aspect-video rounded-sm">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <Badge className="bg-red-600 text-white mb-4 uppercase text-xs font-bold px-3 py-1">
                    Destacada
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4 uppercase text-xs font-bold">
                  {featuredNews.category}
                </Badge>
                <h3 className="text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium">{featuredNews.author}</span>
                  <span>•</span>
                  <time>{new Date(featuredNews.publishedAt).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {allNews.map((news) => (
            <Link
              key={news.id}
              href={`/${locale}/noticias/${news.slug}`}
              className="group"
            >
              <article>
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-[16/10] mb-4 rounded-sm">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold uppercase">
                    {news.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {news.excerpt}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="font-medium">{news.author}</span>
                  <span>•</span>
                  <time>{new Date(news.publishedAt).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}</time>
                </div>
              </article>
            </Link>
          ))}
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
