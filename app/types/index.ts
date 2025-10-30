/**
 * 🏗️ SISTEMA DE TIPOS - ENTERPRISE GRADE
 * Definiciones TypeScript completas para el portal de noticias
 */

// ========== INTERFACES BASE ==========
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  imageUrl: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  breaking: boolean;
  views: number;
  likes: number;
  shares: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories?: Subcategory[];
  seoKeywords: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// ========== TIPOS DE IA ==========
export interface NewsGenerationOptions {
  category: string;
  keywords?: string[];
  length?: 'short' | 'medium' | 'long';
  tone?: 'neutral' | 'formal' | 'informative';
  language?: 'es' | 'en' | 'pt' | 'fr' | 'it' | 'de';
}

export interface GeneratedNews {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  suggestedImage: string;
  category: string;
}

export interface ImageSuggestion {
  query: string;
  description: string;
  category: string;
  style: string;
  colors: string[];
  mood: string;
}

// ========== TIPOS DE UI ==========
export type ArticleCardVariant = 'default' | 'featured' | 'large' | 'medium' | 'small' | 'list';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type ThemeMode = 'light' | 'dark' | 'system';

// ========== TIPOS DE API ==========
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ========== TIPOS DE BASE DE DATOS ==========
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'pdf' | 'audio' | 'video' | 'link';
  category: string;
  tags: string[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// ========== TIPOS DE CONFIGURACIÓN ==========
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  authors: Array<{
    name: string;
    url?: string;
  }>;
}

// ========== TIPOS DE ANALYTICS ==========
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: Date;
}

export interface PageView {
  page: string;
  title: string;
  referrer?: string;
  userAgent: string;
  timestamp: Date;
  sessionId: string;
}

// ========== TIPOS DE FORMULARIOS ==========
export interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured: boolean;
  breaking: boolean;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export interface KnowledgeBaseFormData {
  title: string;
  content: string;
  type: KnowledgeBaseEntry['type'];
  category: string;
  tags: string[];
  fileUrl?: string;
  metadata?: Record<string, any>;
}

// ========== TIPOS DE NAVEGACIÓN ==========
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

// ========== UTILIDADES ==========
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

