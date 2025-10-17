'use client';

import { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  postId?: string;
}

export default function SocialShareButtons({ url, title, postId }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [counts, setCounts] = useState({
    facebook: 0,
    twitter: 0,
    linkedin: 0,
    total: 0,
  });

  useEffect(() => {
    if (postId) {
      // Fetch share counts
      fetch(`/api/social-shares?postId=${postId}`)
        .then((res) => res.json())
        .then((data) => setCounts(data))
        .catch(console.error);
    }
  }, [postId]);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');

    // Track share (optional)
    if (postId) {
      fetch('/api/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, platform }),
      }).catch(console.error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
        <Share2 className="w-4 h-4" />
        <span>Compartir:</span>
        {counts.total > 0 && (
          <span className="text-zinc-500">({counts.total} compartidos)</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="hover:bg-blue-950/30 hover:text-blue-400 transition-all group"
        >
          <Facebook className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Facebook
          {counts.facebook > 0 && (
            <span className="ml-2 text-xs text-zinc-500">({counts.facebook})</span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="hover:bg-sky-950/30 hover:text-sky-400 transition-all group"
        >
          <Twitter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Twitter
          {counts.twitter > 0 && (
            <span className="ml-2 text-xs text-zinc-500">({counts.twitter})</span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="hover:bg-blue-950/30 hover:text-blue-400 transition-all group"
        >
          <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          LinkedIn
          {counts.linkedin > 0 && (
            <span className="ml-2 text-xs text-zinc-500">({counts.linkedin})</span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="hover:bg-zinc-800 transition-all group"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-green-500">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Copiar link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
