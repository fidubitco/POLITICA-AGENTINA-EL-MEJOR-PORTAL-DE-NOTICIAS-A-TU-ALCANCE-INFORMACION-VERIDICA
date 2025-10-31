import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { config } from '../env';

// ===========================================
// CONEXIÓN OPTIMIZADA A BASE DE DATOS
// Pool de conexiones y optimizaciones
// ===========================================

let connectionPool: mysql.Pool | null = null;
let db: any = null;

// ===========================================
// CONFIGURACIÓN DEL POOL DE CONEXIONES
// ===========================================

const createConnectionPool = () => {
  if (connectionPool) {
    return connectionPool;
  }

  const poolConfig = {
    host: config.DB_HOST || 'localhost',
    port: parseInt(config.DB_PORT || '3306'),
    user: config.DB_USER || 'root',
    password: config.DB_PASSWORD || '',
    database: config.DB_NAME || 'politica_argentina',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    charset: 'utf8mb4',
    timezone: '+00:00',
    // Optimizaciones de rendimiento
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: false,
    debug: false,
    trace: false,
    // Configuración de SSL
    ssl: config.DB_SSL ? {
      rejectUnauthorized: false
    } : undefined,
    // Configuración de timeouts
    connectTimeout: 60000,
    // Configuración de pool
    min: 2,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // Configuración de retry
    retryDelayOnFailover: 200,
    retryDelayOnClusterDown: 200,
    maxReconnects: 3,
    reconnectDelay: 2000
  };

  connectionPool = mysql.createPool(poolConfig);
  return connectionPool;
};

// ===========================================
// OBTENER CONEXIÓN A LA BASE DE DATOS
// ===========================================

export const getDb = async () => {
  if (!db) {
    const pool = createConnectionPool();
    db = drizzle(pool, {
      logger: config.NODE_ENV === 'development',
      mode: 'default'
    });
  }
  return db;
};

// ===========================================
// CERRAR CONEXIÓN
// ===========================================

export const closeConnection = async () => {
  if (connectionPool) {
    await connectionPool.end();
    connectionPool = null;
    db = null;
  }
};

// ===========================================
// HEALTH CHECK DE LA BASE DE DATOS
// ===========================================

export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    const pool = createConnectionPool();
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

// ===========================================
// OPTIMIZACIONES DE RENDIMIENTO
// ===========================================

export const optimizeDatabase = async () => {
  try {
    const pool = createConnectionPool();
    const connection = await pool.getConnection();
    
    // Optimizaciones de MySQL
    await connection.execute(`
      SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';
    `);
    
    await connection.execute(`
      SET SESSION innodb_buffer_pool_size = 128M;
    `);
    
    await connection.execute(`
      SET SESSION query_cache_size = 32M;
    `);
    
    await connection.execute(`
      SET SESSION tmp_table_size = 64M;
    `);
    
    await connection.execute(`
      SET SESSION max_heap_table_size = 64M;
    `);
    
    connection.release();
    console.log('✅ Database optimizations applied');
  } catch (error) {
    console.error('❌ Database optimization failed:', error);
  }
};

// ===========================================
// MIGRACIONES AUTOMÁTICAS
// ===========================================

export const runMigrations = async () => {
  try {
    const pool = createConnectionPool();
    const connection = await pool.getConnection();
    
    // Crear tablas si no existen
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        imageUrl VARCHAR(500),
        categoryId INT,
        authorId INT,
        publishedAt DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        breaking BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        likes INT DEFAULT 0,
        shares INT DEFAULT 0,
        tags JSON,
        seoData JSON,
        aiGenerated BOOLEAN DEFAULT FALSE,
        seoOptimized BOOLEAN DEFAULT FALSE,
        url VARCHAR(500),
        isTrending BOOLEAN DEFAULT FALSE,
        INDEX idx_published (publishedAt),
        INDEX idx_category (categoryId),
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_breaking (breaking),
        INDEX idx_trending (isTrending),
        FULLTEXT idx_content (title, excerpt, content)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        color VARCHAR(7) DEFAULT '#3B82F6',
        icon VARCHAR(50),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'editor', 'author', 'user') DEFAULT 'user',
        avatar VARCHAR(500),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        url VARCHAR(500) NOT NULL,
        type ENUM('rss', 'api', 'scraper') DEFAULT 'rss',
        active BOOLEAN DEFAULT TRUE,
        lastScraped DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_active (active),
        INDEX idx_type (type)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    connection.release();
    console.log('✅ Database migrations completed');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
  }
};

// ===========================================
// CACHE DE CONSULTAS
// ===========================================

const queryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export const getCachedQuery = (key: string) => {
  const cached = queryCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

export const setCachedQuery = (key: string, data: any) => {
  queryCache.set(key, { data, timestamp: Date.now() });
};

export const clearCache = () => {
  queryCache.clear();
};

// ===========================================
// MONITOREO DE CONEXIONES
// ===========================================

export const getConnectionStats = async () => {
  try {
    const pool = createConnectionPool();
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(`
      SHOW STATUS LIKE 'Threads_connected'
    `);
    
    connection.release();
    return rows;
  } catch (error) {
    console.error('Failed to get connection stats:', error);
    return null;
  }
};
