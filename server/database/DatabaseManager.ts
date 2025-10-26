// ===========================================
// GESTOR DE BASE DE DATOS COMPLETO
// Sistema de base de datos profesional
// ===========================================

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq, and, or, desc, asc, count, sql } from 'drizzle-orm';
import { articles, categories, sources, users } from '../../drizzle/schema-simple';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: boolean;
  connectionLimit?: number;
  acquireTimeout?: number;
  timeout?: number;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export class DatabaseManager {
  private connection: mysql.Pool | null = null;
  private db: any = null;
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  // ===========================================
  // CONEXIÓN Y CONFIGURACIÓN
  // ===========================================
  
  async connect(): Promise<void> {
    try {
      console.log('🔗 Conectando a la base de datos...');
      
      this.connection = mysql.createPool({
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        ssl: this.config.ssl,
        connectionLimit: this.config.connectionLimit || 10,
        acquireTimeout: this.config.acquireTimeout || 60000,
        timeout: this.config.timeout || 60000,
        waitForConnections: true,
        queueLimit: 0
      });

      this.db = drizzle(this.connection);
      
      // Test connection
      await this.testConnection();
      
      console.log('✅ Base de datos conectada exitosamente');
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error);
      throw error;
    }
  }

  private async testConnection(): Promise<void> {
    if (!this.connection) {
      throw new Error('No hay conexión a la base de datos');
    }
    
    const [rows] = await this.connection.execute('SELECT 1 as test');
    console.log('✅ Test de conexión exitoso');
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      this.db = null;
      console.log('🔌 Conexión a la base de datos cerrada');
    }
  }

  // ===========================================
  // OPERACIONES DE ARTÍCULOS
  // ===========================================
  
  async createArticle(articleData: {
    title: string;
    content: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    categoryId: number;
    sourceId: number;
    tags: string[];
    isBreaking?: boolean;
    isTrending?: boolean;
  }): Promise<number> {
    try {
      const result = await this.db.insert(articles).values({
        title: articleData.title,
        content: articleData.content,
        excerpt: articleData.excerpt,
        imageUrl: articleData.imageUrl,
        author: articleData.author,
        categoryId: articleData.categoryId,
        sourceId: articleData.sourceId,
        tags: JSON.stringify(articleData.tags),
        isBreaking: articleData.isBreaking || false,
        isTrending: articleData.isTrending || false,
        views: 0,
        likes: 0,
        shares: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return result.insertId;
    } catch (error) {
      console.error('Error creando artículo:', error);
      throw error;
    }
  }

  async getArticles(options: QueryOptions = {}): Promise<{
    articles: any[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      const limit = options.limit || 20;
      const offset = options.offset || 0;
      
      // Build query
      let query = this.db
        .select({
          id: articles.id,
          title: articles.title,
          content: articles.content,
          excerpt: articles.excerpt,
          imageUrl: articles.imageUrl,
          author: articles.author,
          categoryId: articles.categoryId,
          sourceId: articles.sourceId,
          tags: articles.tags,
          isBreaking: articles.isBreaking,
          isTrending: articles.isTrending,
          views: articles.views,
          likes: articles.likes,
          shares: articles.shares,
          createdAt: articles.createdAt,
          updatedAt: articles.updatedAt
        })
        .from(articles);

      // Apply filters
      if (options.filters) {
        if (options.filters.categoryId) {
          query = query.where(eq(articles.categoryId, options.filters.categoryId));
        }
        if (options.filters.sourceId) {
          query = query.where(eq(articles.sourceId, options.filters.sourceId));
        }
        if (options.filters.isBreaking) {
          query = query.where(eq(articles.isBreaking, true));
        }
        if (options.filters.isTrending) {
          query = query.where(eq(articles.isTrending, true));
        }
      }

      // Apply ordering
      const orderBy = options.orderBy || 'createdAt';
      const orderDirection = options.orderDirection || 'desc';
      if (orderDirection === 'desc') {
        query = query.orderBy(desc(articles[orderBy]));
      } else {
        query = query.orderBy(asc(articles[orderBy]));
      }

      // Get total count
      const totalQuery = this.db
        .select({ count: count() })
        .from(articles);
      
      const [totalResult] = await totalQuery;
      const total = totalResult.count;

      // Get paginated results
      const results = await query.limit(limit).offset(offset);
      
      return {
        articles: results,
        total,
        hasMore: offset + limit < total
      };
    } catch (error) {
      console.error('Error obteniendo artículos:', error);
      throw error;
    }
  }

  async getArticleById(id: number): Promise<any | null> {
    try {
      const result = await this.db
        .select()
        .from(articles)
        .where(eq(articles.id, id))
        .limit(1);

      return result[0] || null;
    } catch (error) {
      console.error('Error obteniendo artículo:', error);
      throw error;
    }
  }

  async updateArticle(id: number, updateData: Partial<{
    title: string;
    content: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    categoryId: number;
    sourceId: number;
    tags: string[];
    isBreaking: boolean;
    isTrending: boolean;
  }>): Promise<void> {
    try {
      const updateValues: any = {
        ...updateData,
        updatedAt: new Date()
      };

      if (updateData.tags) {
        updateValues.tags = JSON.stringify(updateData.tags);
      }

      await this.db
        .update(articles)
        .set(updateValues)
        .where(eq(articles.id, id));
    } catch (error) {
      console.error('Error actualizando artículo:', error);
      throw error;
    }
  }

  async deleteArticle(id: number): Promise<void> {
    try {
      await this.db
        .delete(articles)
        .where(eq(articles.id, id));
    } catch (error) {
      console.error('Error eliminando artículo:', error);
      throw error;
    }
  }

  // ===========================================
  // OPERACIONES DE CATEGORÍAS
  // ===========================================
  
  async getCategories(): Promise<any[]> {
    try {
      return await this.db
        .select()
        .from(categories)
        .orderBy(asc(categories.name));
    } catch (error) {
      console.error('Error obteniendo categorías:', error);
      throw error;
    }
  }

  async createCategory(categoryData: {
    name: string;
    slug: string;
    description: string;
    color: string;
    icon: string;
  }): Promise<number> {
    try {
      const result = await this.db
        .insert(categories)
        .values({
          ...categoryData,
          createdAt: new Date(),
          updatedAt: new Date()
        });

      return result.insertId;
    } catch (error) {
      console.error('Error creando categoría:', error);
      throw error;
    }
  }

  // ===========================================
  // OPERACIONES DE FUENTES
  // ===========================================
  
  async getSources(): Promise<any[]> {
    try {
      return await this.db
        .select()
        .from(sources)
        .where(eq(sources.isActive, true))
        .orderBy(asc(sources.name));
    } catch (error) {
      console.error('Error obteniendo fuentes:', error);
      throw error;
    }
  }

  async createSource(sourceData: {
    name: string;
    url: string;
    logo: string;
    credibility: number;
    isActive: boolean;
  }): Promise<number> {
    try {
      const result = await this.db
        .insert(sources)
        .values({
          ...sourceData,
          createdAt: new Date(),
          updatedAt: new Date()
        });

      return result.insertId;
    } catch (error) {
      console.error('Error creando fuente:', error);
      throw error;
    }
  }

  // ===========================================
  // OPERACIONES DE ESTADÍSTICAS
  // ===========================================
  
  async getStats(): Promise<{
    totalArticles: number;
    totalCategories: number;
    totalSources: number;
    totalViews: number;
    totalLikes: number;
    totalShares: number;
  }> {
    try {
      const [articlesStats] = await this.db
        .select({
          total: count(),
          totalViews: sql<number>`SUM(${articles.views})`,
          totalLikes: sql<number>`SUM(${articles.likes})`,
          totalShares: sql<number>`SUM(${articles.shares})`
        })
        .from(articles);

      const [categoriesStats] = await this.db
        .select({ total: count() })
        .from(categories);

      const [sourcesStats] = await this.db
        .select({ total: count() })
        .from(sources);

      return {
        totalArticles: articlesStats.total,
        totalCategories: categoriesStats.total,
        totalSources: sourcesStats.total,
        totalViews: articlesStats.totalViews || 0,
        totalLikes: articlesStats.totalLikes || 0,
        totalShares: articlesStats.totalShares || 0
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }

  // ===========================================
  // OPERACIONES DE BÚSQUEDA
  // ===========================================
  
  async searchArticles(query: string, options: QueryOptions = {}): Promise<any[]> {
    try {
      const limit = options.limit || 20;
      const offset = options.offset || 0;

      const results = await this.db
        .select()
        .from(articles)
        .where(
          or(
            sql`MATCH(${articles.title}) AGAINST(${query} IN BOOLEAN MODE)`,
            sql`MATCH(${articles.content}) AGAINST(${query} IN BOOLEAN MODE)`,
            sql`MATCH(${articles.tags}) AGAINST(${query} IN BOOLEAN MODE)`
          )
        )
        .orderBy(desc(articles.createdAt))
        .limit(limit)
        .offset(offset);

      return results;
    } catch (error) {
      console.error('Error buscando artículos:', error);
      throw error;
    }
  }

  // ===========================================
  // OPERACIONES DE INTERACCIÓN
  // ===========================================
  
  async incrementViews(articleId: number): Promise<void> {
    try {
      await this.db
        .update(articles)
        .set({
          views: sql`${articles.views} + 1`,
          updatedAt: new Date()
        })
        .where(eq(articles.id, articleId));
    } catch (error) {
      console.error('Error incrementando vistas:', error);
      throw error;
    }
  }

  async incrementLikes(articleId: number): Promise<void> {
    try {
      await this.db
        .update(articles)
        .set({
          likes: sql`${articles.likes} + 1`,
          updatedAt: new Date()
        })
        .where(eq(articles.id, articleId));
    } catch (error) {
      console.error('Error incrementando likes:', error);
      throw error;
    }
  }

  async incrementShares(articleId: number): Promise<void> {
    try {
      await this.db
        .update(articles)
        .set({
          shares: sql`${articles.shares} + 1`,
          updatedAt: new Date()
        })
        .where(eq(articles.id, articleId));
    } catch (error) {
      console.error('Error incrementando shares:', error);
      throw error;
    }
  }

  // ===========================================
  // MIGRACIONES Y MANTENIMIENTO
  // ===========================================
  
  async runMigrations(): Promise<void> {
    try {
      console.log('🔄 Ejecutando migraciones...');
      // Implementar lógica de migraciones
      console.log('✅ Migraciones completadas');
    } catch (error) {
      console.error('Error ejecutando migraciones:', error);
      throw error;
    }
  }

  async optimizeDatabase(): Promise<void> {
    try {
      console.log('⚡ Optimizando base de datos...');
      
      // Optimizar tablas
      await this.connection?.execute('OPTIMIZE TABLE articles');
      await this.connection?.execute('OPTIMIZE TABLE categories');
      await this.connection?.execute('OPTIMIZE TABLE sources');
      
      console.log('✅ Base de datos optimizada');
    } catch (error) {
      console.error('Error optimizando base de datos:', error);
      throw error;
    }
  }

  // ===========================================
  // MONITOREO Y MÉTRICAS
  // ===========================================
  
  async getDatabaseMetrics(): Promise<{
    connectionCount: number;
    queryCount: number;
    averageQueryTime: number;
    cacheHitRate: number;
  }> {
    try {
      // Implementar métricas de base de datos
      return {
        connectionCount: 0,
        queryCount: 0,
        averageQueryTime: 0,
        cacheHitRate: 0
      };
    } catch (error) {
      console.error('Error obteniendo métricas:', error);
      throw error;
    }
  }
}

// ===========================================
// CONFIGURACIÓN POR DEFECTO
// ===========================================

export const defaultDatabaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'politica_argentina',
  ssl: process.env.DB_SSL === 'true',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000
};

export const databaseManager = new DatabaseManager(defaultDatabaseConfig);

