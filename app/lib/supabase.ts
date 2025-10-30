import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types (generated from Prisma schema)
export type Database = {
  public: {
    Tables: {
      Account: {
        Row: {
          id: string;
          userId: string;
          type: string;
          provider: string;
          providerAccountId: string;
          refresh_token: string | null;
          access_token: string | null;
          expires_at: number | null;
          token_type: string | null;
          scope: string | null;
          id_token: string | null;
          session_state: string | null;
        };
        Insert: {
          id?: string;
          userId: string;
          type: string;
          provider: string;
          providerAccountId: string;
          refresh_token?: string | null;
          access_token?: string | null;
          expires_at?: number | null;
          token_type?: string | null;
          scope?: string | null;
          id_token?: string | null;
          session_state?: string | null;
        };
        Update: {
          id?: string;
          userId?: string;
          type?: string;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string | null;
          access_token?: string | null;
          expires_at?: number | null;
          token_type?: string | null;
          scope?: string | null;
          id_token?: string | null;
          session_state?: string | null;
        };
      };
      Article: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          category: string;
          categorySlug: string;
          authorId: string;
          imageUrl: string | null;
          status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
          featured: boolean;
          breaking: boolean;
          views: number;
          likes: number;
          shares: number;
          publishedAt: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          category: string;
          categorySlug: string;
          authorId: string;
          imageUrl?: string | null;
          status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
          featured?: boolean;
          breaking?: boolean;
          views?: number;
          likes?: number;
          shares?: number;
          publishedAt?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          categorySlug?: string;
          authorId?: string;
          imageUrl?: string | null;
          status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
          featured?: boolean;
          breaking?: boolean;
          views?: number;
          likes?: number;
          shares?: number;
          publishedAt?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
      };
      User: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          emailVerified: string | null;
          image: string | null;
          password: string | null;
          role: 'VIEWER' | 'EDITOR' | 'ADMIN';
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email: string;
          emailVerified?: string | null;
          image?: string | null;
          password?: string | null;
          role?: 'VIEWER' | 'EDITOR' | 'ADMIN';
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string;
          emailVerified?: string | null;
          image?: string | null;
          password?: string | null;
          role?: 'VIEWER' | 'EDITOR' | 'ADMIN';
          createdAt?: string;
          updatedAt?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

