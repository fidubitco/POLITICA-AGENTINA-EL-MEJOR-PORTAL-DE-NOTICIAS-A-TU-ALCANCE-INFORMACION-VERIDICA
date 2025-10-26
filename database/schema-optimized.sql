-- ============================================
-- 🗄️ DATABASE SCHEMA OPTIMIZED - ENTERPRISE GRADE
-- ============================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS politica_argentina
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE politica_argentina;

-- ============================================
-- TABLA: articles
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  categorySlug VARCHAR(100) NOT NULL,
  author VARCHAR(200) NOT NULL,
  imageUrl VARCHAR(500),
  status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  breaking BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  shares INT DEFAULT 0,
  tags JSON,
  publishedAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Índices para optimizar queries
  INDEX idx_status (status),
  INDEX idx_category (categorySlug),
  INDEX idx_featured (featured),
  INDEX idx_breaking (breaking),
  INDEX idx_published (publishedAt),
  INDEX idx_views (views),
  FULLTEXT INDEX idx_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: users (CRM)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(200) NOT NULL,
  role ENUM('admin', 'editor', 'author', 'user') DEFAULT 'user',
  avatar VARCHAR(500),
  bio TEXT,
  active BOOLEAN DEFAULT TRUE,
  lastLogin DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: categories
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(20),
  icon VARCHAR(50),
  order INT DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug),
  INDEX idx_active (active),
  INDEX idx_order (order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: tags
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  count INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug),
  INDEX idx_count (count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: article_tags (relación muchos a muchos)
-- ============================================
CREATE TABLE IF NOT EXISTS article_tags (
  articleId INT NOT NULL,
  tagId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (articleId, tagId),
  FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE CASCADE,
  
  INDEX idx_article (articleId),
  INDEX idx_tag (tagId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: comments
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  articleId INT NOT NULL,
  userId INT,
  authorName VARCHAR(200) NOT NULL,
  authorEmail VARCHAR(255),
  content TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'spam') DEFAULT 'pending',
  likes INT DEFAULT 0,
  parentId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (parentId) REFERENCES comments(id) ON DELETE CASCADE,
  
  INDEX idx_article (articleId),
  INDEX idx_user (userId),
  INDEX idx_status (status),
  INDEX idx_parent (parentId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: analytics
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  articleId INT NOT NULL,
  event ENUM('view', 'like', 'share', 'comment') NOT NULL,
  userId INT,
  ipAddress VARCHAR(45),
  userAgent TEXT,
  referrer VARCHAR(500),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  
  INDEX idx_article (articleId),
  INDEX idx_event (event),
  INDEX idx_date (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: media
-- ============================================
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  originalName VARCHAR(255) NOT NULL,
  mimeType VARCHAR(100) NOT NULL,
  size INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  thumbnail VARCHAR(500),
  alt TEXT,
  title VARCHAR(255),
  userId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  
  INDEX idx_user (userId),
  INDEX idx_mime (mimeType)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: settings
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT,
  type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  description TEXT,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_key (key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERTAR CATEGORÍAS POR DEFECTO
-- ============================================
INSERT INTO categories (name, slug, description, color, icon, `order`) VALUES
('Política', 'politica', 'Noticias sobre política argentina', '#3B82F6', 'landmark', 1),
('Economía', 'economia', 'Análisis económico y financiero', '#10B981', 'trending-up', 2),
('Sociedad', 'sociedad', 'Noticias de la sociedad argentina', '#F59E0B', 'users', 3),
('Internacional', 'internacional', 'Noticias internacionales', '#EF4444', 'globe', 4),
('Deportes', 'deportes', 'Deportes y competiciones', '#8B5CF6', 'trophy', 5),
('Cultura', 'cultura', 'Arte, cultura y entretenimiento', '#EC4899', 'palette', 6)
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- INSERTAR USUARIO ADMIN POR DEFECTO
-- ============================================
-- Password: admin123 (cambiar en producción)
INSERT INTO users (email, password, name, role) VALUES
('admin@politicaargentina.com', '$2b$10$rBV2kHXW5nHZXKvWKZF7ZeGqX8YqKZvQxJXZqKZvQxJXZqKZvQxJX', 'Administrador', 'admin')
ON DUPLICATE KEY UPDATE email=email;

-- ============================================
-- CONFIGURACIONES POR DEFECTO
-- ============================================
INSERT INTO settings (`key`, value, type, description) VALUES
('site_name', 'Política Argentina', 'string', 'Nombre del sitio'),
('site_description', 'Portal profesional de noticias políticas de Argentina', 'string', 'Descripción del sitio'),
('articles_per_page', '10', 'number', 'Artículos por página'),
('enable_comments', 'true', 'boolean', 'Habilitar comentarios'),
('enable_ai', 'true', 'boolean', 'Habilitar generación con IA')
ON DUPLICATE KEY UPDATE `key`=`key`;

-- ============================================
-- VISTAS PARA ANALYTICS
-- ============================================
CREATE OR REPLACE VIEW article_stats AS
SELECT 
  a.id,
  a.title,
  a.category,
  a.status,
  a.views,
  a.likes,
  a.shares,
  COUNT(DISTINCT c.id) as comments_count,
  a.publishedAt,
  a.createdAt
FROM articles a
LEFT JOIN comments c ON a.id = c.articleId AND c.status = 'approved'
GROUP BY a.id;

-- ============================================
-- PROCEDIMIENTOS ALMACENADOS
-- ============================================

-- Incrementar views
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS increment_views(IN article_id INT)
BEGIN
  UPDATE articles SET views = views + 1 WHERE id = article_id;
END//
DELIMITER ;

-- Incrementar likes
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS increment_likes(IN article_id INT)
BEGIN
  UPDATE articles SET likes = likes + 1 WHERE id = article_id;
END//
DELIMITER ;

-- Incrementar shares
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS increment_shares(IN article_id INT)
BEGIN
  UPDATE articles SET shares = shares + 1 WHERE id = article_id;
END//
DELIMITER ;

-- ============================================
-- TRIGGERS
-- ============================================

-- Actualizar contador de tags
DELIMITER //
CREATE TRIGGER IF NOT EXISTS update_tag_count_insert
AFTER INSERT ON article_tags
FOR EACH ROW
BEGIN
  UPDATE tags SET count = count + 1 WHERE id = NEW.tagId;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER IF NOT EXISTS update_tag_count_delete
AFTER DELETE ON article_tags
FOR EACH ROW
BEGIN
  UPDATE tags SET count = count - 1 WHERE id = OLD.tagId;
END//
DELIMITER ;

-- ============================================
-- OPTIMIZACIONES
-- ============================================

-- Analizar tablas para optimizar queries
ANALYZE TABLE articles, users, categories, tags, article_tags, comments, analytics;

-- Optimizar tablas
OPTIMIZE TABLE articles, users, categories, tags, article_tags, comments, analytics;

COMMIT;

SELECT '✅ Database schema created and optimized successfully!' as status;

