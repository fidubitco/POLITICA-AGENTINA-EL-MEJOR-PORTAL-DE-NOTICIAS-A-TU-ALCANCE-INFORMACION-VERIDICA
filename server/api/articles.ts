import { query, insert, update, transaction } from './database';
import { User } from './auth';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category_id: number;
  category_name?: string;
  author_id: number;
  author_name?: string;
  status: 'draft' | 'pending' | 'published' | 'archived';
  is_breaking: boolean;
  is_featured: boolean;
  views: number;
  shares: number;
  likes: number;
  published_at?: Date;
  scheduled_at?: Date;
  created_at: Date;
  updated_at: Date;
  tags?: string[];
}

export interface CreateArticleInput {
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category_id: number;
  is_breaking?: boolean;
  is_featured?: boolean;
  status?: 'draft' | 'pending' | 'published';
  scheduled_at?: Date;
  tags?: string[];
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {
  id: number;
}

// Crear slug único
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Crear artículo
export async function createArticle(
  input: CreateArticleInput,
  authorId: number
): Promise<Article> {
  const slug = createSlug(input.title);
  
  return transaction(async (conn) => {
    // Insertar artículo
    const [result] = await conn.execute(
      `INSERT INTO articles 
       (title, slug, excerpt, content, image_url, category_id, author_id, status, is_breaking, is_featured, scheduled_at, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.title,
        slug,
        input.excerpt,
        input.content,
        input.image_url,
        input.category_id,
        authorId,
        input.status || 'draft',
        input.is_breaking || false,
        input.is_featured || false,
        input.scheduled_at,
        input.status === 'published' ? new Date() : null,
      ]
    );

    const articleId = (result as any).insertId;

    // Agregar tags si existen
    if (input.tags && input.tags.length > 0) {
      for (const tagName of input.tags) {
        // Crear o obtener tag
        const tagSlug = createSlug(tagName);
        const [existingTag] = await conn.execute(
          'SELECT id FROM tags WHERE slug = ?',
          [tagSlug]
        );

        let tagId: number;
        if ((existingTag as any[]).length > 0) {
          tagId = (existingTag as any[])[0].id;
        } else {
          const [tagResult] = await conn.execute(
            'INSERT INTO tags (name, slug) VALUES (?, ?)',
            [tagName, tagSlug]
          );
          tagId = (tagResult as any).insertId;
        }

        // Relacionar artículo con tag
        await conn.execute(
          'INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)',
          [articleId, tagId]
        );
      }
    }

    // Obtener artículo completo
    const [article] = await conn.execute(
      `SELECT a.*, c.name as category_name, u.name as author_name
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       JOIN users u ON a.author_id = u.id
       WHERE a.id = ?`,
      [articleId]
    );

    return (article as any[])[0];
  });
}

// Actualizar artículo
export async function updateArticle(
  input: UpdateArticleInput,
  userId: number,
  userRole: string
): Promise<Article> {
  const { id, tags, ...updateData } = input;

  return transaction(async (conn) => {
    // Verificar permisos
    const [existing] = await conn.execute(
      'SELECT author_id FROM articles WHERE id = ?',
      [id]
    );

    if ((existing as any[]).length === 0) {
      throw new Error('Artículo no encontrado');
    }

    const article = (existing as any[])[0];
    if (article.author_id !== userId && userRole !== 'admin') {
      throw new Error('No tienes permisos para editar este artículo');
    }

    // Construir query de actualización
    const fields = [];
    const values = [];

    if (updateData.title) {
      fields.push('title = ?', 'slug = ?');
      values.push(updateData.title, createSlug(updateData.title));
    }
    if (updateData.excerpt !== undefined) {
      fields.push('excerpt = ?');
      values.push(updateData.excerpt);
    }
    if (updateData.content !== undefined) {
      fields.push('content = ?');
      values.push(updateData.content);
    }
    if (updateData.image_url !== undefined) {
      fields.push('image_url = ?');
      values.push(updateData.image_url);
    }
    if (updateData.category_id !== undefined) {
      fields.push('category_id = ?');
      values.push(updateData.category_id);
    }
    if (updateData.status !== undefined) {
      fields.push('status = ?');
      values.push(updateData.status);
      if (updateData.status === 'published') {
        fields.push('published_at = NOW()');
      }
    }
    if (updateData.is_breaking !== undefined) {
      fields.push('is_breaking = ?');
      values.push(updateData.is_breaking);
    }
    if (updateData.is_featured !== undefined) {
      fields.push('is_featured = ?');
      values.push(updateData.is_featured);
    }
    if (updateData.scheduled_at !== undefined) {
      fields.push('scheduled_at = ?');
      values.push(updateData.scheduled_at);
    }

    if (fields.length > 0) {
      values.push(id);
      await conn.execute(
        `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
    }

    // Actualizar tags si se proporcionaron
    if (tags) {
      // Eliminar tags existentes
      await conn.execute('DELETE FROM article_tags WHERE article_id = ?', [id]);

      // Agregar nuevos tags
      for (const tagName of tags) {
        const tagSlug = createSlug(tagName);
        const [existingTag] = await conn.execute(
          'SELECT id FROM tags WHERE slug = ?',
          [tagSlug]
        );

        let tagId: number;
        if ((existingTag as any[]).length > 0) {
          tagId = (existingTag as any[])[0].id;
        } else {
          const [tagResult] = await conn.execute(
            'INSERT INTO tags (name, slug) VALUES (?, ?)',
            [tagName, tagSlug]
          );
          tagId = (tagResult as any).insertId;
        }

        await conn.execute(
          'INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)',
          [id, tagId]
        );
      }
    }

    // Obtener artículo actualizado
    const [updated] = await conn.execute(
      `SELECT a.*, c.name as category_name, u.name as author_name
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       JOIN users u ON a.author_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    return (updated as any[])[0];
  });
}

// Obtener artículos
export async function getArticles(filters: {
  status?: string;
  category_id?: number;
  author_id?: number;
  is_breaking?: boolean;
  is_featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<{ articles: Article[]; total: number }> {
  const conditions = ['1=1'];
  const params: any[] = [];

  if (filters.status) {
    conditions.push('a.status = ?');
    params.push(filters.status);
  }
  if (filters.category_id) {
    conditions.push('a.category_id = ?');
    params.push(filters.category_id);
  }
  if (filters.author_id) {
    conditions.push('a.author_id = ?');
    params.push(filters.author_id);
  }
  if (filters.is_breaking !== undefined) {
    conditions.push('a.is_breaking = ?');
    params.push(filters.is_breaking);
  }
  if (filters.is_featured !== undefined) {
    conditions.push('a.is_featured = ?');
    params.push(filters.is_featured);
  }
  if (filters.search) {
    conditions.push('MATCH(a.title, a.excerpt, a.content) AGAINST(? IN NATURAL LANGUAGE MODE)');
    params.push(filters.search);
  }

  const whereClause = conditions.join(' AND ');

  // Contar total
  const [countResult] = await query<{ total: number }>(
    `SELECT COUNT(*) as total FROM articles a WHERE ${whereClause}`,
    params
  );
  const total = countResult.total;

  // Obtener artículos
  const limit = filters.limit || 20;
  const offset = filters.offset || 0;

  const articles = await query<Article>(
    `SELECT a.*, c.name as category_name, u.name as author_name
     FROM articles a
     JOIN categories c ON a.category_id = c.id
     JOIN users u ON a.author_id = u.id
     WHERE ${whereClause}
     ORDER BY a.published_at DESC, a.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  // Obtener tags para cada artículo
  for (const article of articles) {
    const tags = await query<{ name: string }>(
      `SELECT t.name
       FROM tags t
       JOIN article_tags at ON t.id = at.tag_id
       WHERE at.article_id = ?`,
      [article.id]
    );
    article.tags = tags.map(t => t.name);
  }

  return { articles, total };
}

// Obtener artículo por ID
export async function getArticleById(id: number): Promise<Article | null> {
  const [article] = await query<Article>(
    `SELECT a.*, c.name as category_name, u.name as author_name
     FROM articles a
     JOIN categories c ON a.category_id = c.id
     JOIN users u ON a.author_id = u.id
     WHERE a.id = ?`,
    [id]
  );

  if (!article) return null;

  // Obtener tags
  const tags = await query<{ name: string }>(
    `SELECT t.name
     FROM tags t
     JOIN article_tags at ON t.id = at.tag_id
     WHERE at.article_id = ?`,
    [id]
  );
  article.tags = tags.map(t => t.name);

  // Incrementar vistas
  await update('UPDATE articles SET views = views + 1 WHERE id = ?', [id]);

  return article;
}

// Eliminar artículo
export async function deleteArticle(id: number, userId: number, userRole: string): Promise<boolean> {
  // Verificar permisos
  const [article] = await query<{ author_id: number }>(
    'SELECT author_id FROM articles WHERE id = ?',
    [id]
  );

  if (!article) {
    throw new Error('Artículo no encontrado');
  }

  if (article.author_id !== userId && userRole !== 'admin') {
    throw new Error('No tienes permisos para eliminar este artículo');
  }

  await update('DELETE FROM articles WHERE id = ?', [id]);
  return true;
}

// Incrementar shares
export async function incrementShares(id: number): Promise<void> {
  await update('UPDATE articles SET shares = shares + 1 WHERE id = ?', [id]);
}

// Incrementar likes
export async function incrementLikes(id: number): Promise<void> {
  await update('UPDATE articles SET likes = likes + 1 WHERE id = ?', [id]);
}
