export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  category: string;
  source: string;
  tags: string[];
  isBreaking: boolean;
  isTrending: boolean;
  isPublished: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  views: number;
  likes: number;
  shares: number;
  aiGenerated?: boolean;
  aiScore?: number;
  readabilityScore?: number;
  sentimentScore?: number;
  seoOptimized?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
  isActive: boolean;
}
