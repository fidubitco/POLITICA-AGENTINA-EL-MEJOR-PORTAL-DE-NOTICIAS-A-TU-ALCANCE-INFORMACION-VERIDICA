import { allArticles } from '@/data/allNews';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export function MostRead() {
  // Obtener los artículos más leídos de la semana
  const mostReadArticles = allArticles
    .filter(article => {
      const articleDate = new Date(article.publishedAt);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return articleDate > oneWeekAgo;
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5 text-purple-600" />
        Más Leídas
      </h3>

      <div className="space-y-3">
        {mostReadArticles.map((article, index) => (
          <article key={article.id} className="group cursor-pointer">
            <Link href={`/noticia/${article.slug}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.views.toLocaleString()} vistas</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

