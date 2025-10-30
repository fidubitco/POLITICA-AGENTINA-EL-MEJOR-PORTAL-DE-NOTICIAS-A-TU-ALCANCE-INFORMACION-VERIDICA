'use client';

import { useState } from 'react';
import { Article } from '@/data/allNews';
import { Share2, Bookmark, ThumbsUp, MessageCircle, Facebook, Twitter, Whatsapp, Link as LinkIcon } from 'lucide-react';

interface ArticleActionsProps {
  article: Article;
}

export function ArticleActions({ article }: ArticleActionsProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/noticia/${article.slug}` : '';

  const handleShare = async (platform: string) => {
    const title = encodeURIComponent(article.title);
    const url = encodeURIComponent(shareUrl);

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${title}%20${url}`;
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        alert('Enlace copiado al portapapeles');
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      {/* Acciones principales */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              liked
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">{article.likes + (liked ? 1 : 0)}</span>
          </button>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              bookmarked
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            <span className="text-sm">Guardar</span>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Compartir</span>
          </button>

          {shareOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <Twitter className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <Whatsapp className="w-4 h-4 text-green-600" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Copiar enlace</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{article.views.toLocaleString()} vistas</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{article.likes} likes</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>Comentarios</span>
        </div>
      </div>
    </div>
  );
}

