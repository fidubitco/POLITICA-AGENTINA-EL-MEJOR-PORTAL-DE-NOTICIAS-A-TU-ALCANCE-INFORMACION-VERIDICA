/**
 * 📰 PÁGINA DE NOTICIA INDIVIDUAL - ENTERPRISE GRADE
 * Página optimizada con SEO extremo para artículos individuales
 */

import React, { useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  Tag,
  TrendingUp
} from 'lucide-react';
import { MainMenu } from '../components/MainMenu';
import { getCategoryBySlug } from '../data/categories';
import { newsTemplates } from '../data/newsTemplates';

export const NewsArticlePage: React.FC = () => {
  const params = useParams();
  const categorySlug = params.category as string;
  const articleSlug = params.article as string;

  const category = getCategoryBySlug(categorySlug);
  const article = newsTemplates.find(
    (a) => a.slug === articleSlug && a.category === categorySlug
  );

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [articleSlug]);

  if (!article || !category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainMenu />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Noticia no encontrada
          </h1>
          <Link href="/">
            <a className="text-blue-600 hover:text-blue-700">Volver al inicio</a>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = `https://politicaargentina.com/${categorySlug}/${articleSlug}`;
  const shareTitle = article.title;

  // Schema.org JSON-LD para SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: `https://politicaargentina.com${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Política Argentina',
      logo: {
        '@type': 'ImageObject',
        url: 'https://politicaargentina.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl,
    },
    keywords: article.keywords.join(', '),
    articleSection: category.name,
    wordCount: article.content.split(' ').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{article.seo.metaTitle}</title>
        <meta name="description" content={article.seo.metaDescription} />
        <meta name="keywords" content={article.keywords.join(', ')} />
        <link rel="canonical" href={article.seo.canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://politicaargentina.com${article.image}`} />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={category.name} />
        {article.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={`https://politicaargentina.com${article.image}`} />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <MainMenu />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/">
            <a className="hover:text-blue-600">Inicio</a>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/${categorySlug}`}>
            <a className="hover:text-blue-600">{category.name}</a>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          {article.breaking && (
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold">
                <TrendingUp className="h-4 w-4 mr-2" />
                NOTICIA URGENTE
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min de lectura</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder-news.jpg';
            }}
          />
          <p className="text-sm text-gray-500 mt-2 text-center italic">
            {article.imageAlt}
          </p>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir:
          </span>
          <div className="flex items-center space-x-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Compartir en Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
              aria-label="Compartir en Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              aria-label="Compartir en LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
              className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              aria-label="Compartir por email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Etiquetas:</span>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Noticias relacionadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsTemplates
              .filter((a) => a.id !== article.id && a.category === article.category)
              .slice(0, 2)
              .map((related) => (
                <Link key={related.id} href={`/${related.category}/${related.slug}`}>
                  <a className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={related.image}
                        alt={related.imageAlt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-news.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.summary}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsArticlePage;

