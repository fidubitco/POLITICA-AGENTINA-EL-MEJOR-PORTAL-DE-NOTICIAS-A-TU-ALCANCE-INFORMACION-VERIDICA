import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para TypeScript
export interface Database {
  public: {
    Tables: {
      noticias: {
        Row: Noticia;
        Insert: Omit<Noticia, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Noticia, 'id' | 'created_at' | 'updated_at'>>;
      };
      categorias: {
        Row: Categoria;
        Insert: Omit<Categoria, 'id' | 'created_at'>;
        Update: Partial<Omit<Categoria, 'id' | 'created_at'>>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, 'id' | 'created_at'>;
        Update: Partial<Omit<Tag, 'id' | 'created_at'>>;
      };
      usuarios: {
        Row: Usuario;
        Insert: Omit<Usuario, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Usuario, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

export interface Noticia {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category_id: string;
  excerpt: string;
  content: string;
  image_url: string;
  author_id: string;
  views: number;
  status: 'draft' | 'published' | 'archived';
  is_breaking: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Categoria {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  order: number;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Usuario {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface NoticiaTag {
  noticia_id: string;
  tag_id: string;
}

// Funciones helper para Supabase
export const supabaseHelpers = {
  // Noticias
  async getNoticias(filters?: {
    category?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('noticias')
      .select(`
        *,
        categorias(name, slug, color),
        usuarios(name, email)
      `)
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    return query;
  },

  async getNoticiaById(id: string) {
    return supabase
      .from('noticias')
      .select(`
        *,
        categorias(name, slug, color),
        usuarios(name, email)
      `)
      .eq('id', id)
      .single();
  },

  async createNoticia(noticia: Database['public']['Tables']['noticias']['Insert']) {
    return supabase
      .from('noticias')
      .insert(noticia)
      .select()
      .single();
  },

  async updateNoticia(id: string, updates: Database['public']['Tables']['noticias']['Update']) {
    return supabase
      .from('noticias')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteNoticia(id: string) {
    return supabase
      .from('noticias')
      .delete()
      .eq('id', id);
  },

  async incrementViews(id: string) {
    return supabase.rpc('increment_views', { noticia_id: id });
  },

  // Categorías
  async getCategorias() {
    return supabase
      .from('categorias')
      .select('*')
      .order('order', { ascending: true });
  },

  // Tags
  async getTags() {
    return supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });
  },

  async getNoticiasTags(noticiaId: string) {
    return supabase
      .from('noticias_tags')
      .select('tags(*)')
      .eq('noticia_id', noticiaId);
  },
};

