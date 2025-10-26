-- ============================================
-- 🚀 ULTRA OPTIMIZED DATABASE SCHEMA
-- Enterprise Grade Level
-- MySQL 8.0+ with Advanced Features
-- ============================================

-- Drop existing database if needed (CAREFUL IN PRODUCTION!)
-- DROP DATABASE IF EXISTS politica_argentina;

CREATE DATABASE IF NOT EXISTS politica_argentina
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE politica_argentina;

-- ============================================
-- 1. USERS TABLE - Ultra Optimized
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role ENUM('admin', 'editor', 'author', 'subscriber') NOT NULL DEFAULT 'subscriber',
  status ENUM('active', 'inactive', 'banned', 'pending') NOT NULL DEFAULT 'pending',
  avatar_url VARCHAR(500),
  bio TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP NULL,
  last_login_at TIMESTAMP NULL,
  login_count INT UNSIGNED DEFAULT 0,
  failed_login_attempts TINYINT UNSIGNED DEFAULT 0,
  locked_until TIMESTAMP NULL,
  preferences JSON,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_deleted_at (deleted_at),
  FULLTEXT idx_full_name (full_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. CATEGORIES TABLE - Optimized
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  parent_id INT UNSIGNED NULL,
  icon VARCHAR(50),
  color VARCHAR(20),
  bg_gradient VARCHAR(100),
  display_order INT UNSIGNED DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug),
  INDEX idx_parent_id (parent_id),
  INDEX idx_is_active (is_active),
  INDEX idx_display_order (display_order),
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. ARTICLES TABLE - Ultra Optimized
-- ============================================

CREATE TABLE IF NOT EXISTS articles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  author_id BIGINT UNSIGNED NOT NULL,
  category_id INT UNSIGNED NOT NULL,
  status ENUM('draft', 'published', 'scheduled', 'archived') NOT NULL DEFAULT 'draft',
  visibility ENUM('public', 'private', 'password') NOT NULL DEFAULT 'public',
  password VARCHAR(255) NULL,
  featured_image VARCHAR(500),
  featured_image_alt VARCHAR(255),
  featured_image_caption TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_breaking BOOLEAN DEFAULT FALSE,
  is_trending BOOLEAN DEFAULT FALSE,
  
  -- SEO Fields
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  seo_canonical_url VARCHAR(500),
  seo_robots VARCHAR(50) DEFAULT 'index,follow',
  
  -- Analytics
  views BIGINT UNSIGNED DEFAULT 0,
  likes BIGINT UNSIGNED DEFAULT 0,
  shares BIGINT UNSIGNED DEFAULT 0,
  comments_count INT UNSIGNED DEFAULT 0,
  avg_read_time INT UNSIGNED DEFAULT 0,
  
  -- Timestamps
  published_at TIMESTAMP NULL,
  scheduled_at TIMESTAMP NULL,
  last_viewed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  -- Metadata
  metadata JSON,
  
  INDEX idx_slug (slug),
  INDEX idx_author_id (author_id),
  INDEX idx_category_id (category_id),
  INDEX idx_status (status),
  INDEX idx_is_featured (is_featured),
  INDEX idx_is_breaking (is_breaking),
  INDEX idx_is_trending (is_trending),
  INDEX idx_published_at (published_at),
  INDEX idx_views (views),
  INDEX idx_created_at (created_at),
  INDEX idx_deleted_at (deleted_at),
  INDEX idx_status_published (status, published_at),
  FULLTEXT idx_title_content (title, content),
  
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. ARTICLE_TRANSLATIONS TABLE - Multi-language
-- ============================================

CREATE TABLE IF NOT EXISTS article_translations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  article_id BIGINT UNSIGNED NOT NULL,
  language_code VARCHAR(10) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_article_language (article_id, language_code),
  INDEX idx_language_code (language_code),
  INDEX idx_slug (slug),
  FULLTEXT idx_title_content (title, content),
  
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. TAGS TABLE - Optimized
-- ============================================

CREATE TABLE IF NOT EXISTS tags (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  usage_count INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug),
  INDEX idx_usage_count (usage_count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. ARTICLE_TAGS TABLE - Many-to-Many
-- ============================================

CREATE TABLE IF NOT EXISTS article_tags (
  article_id BIGINT UNSIGNED NOT NULL,
  tag_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (article_id, tag_id),
  INDEX idx_tag_id (tag_id),
  
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. COMMENTS TABLE - Optimized
-- ============================================

CREATE TABLE IF NOT EXISTS comments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  article_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  parent_id BIGINT UNSIGNED NULL,
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  status ENUM('pending', 'approved', 'spam', 'trash') NOT NULL DEFAULT 'pending',
  ip_address VARCHAR(45),
  user_agent TEXT,
  likes_count INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_article_id (article_id),
  INDEX idx_user_id (user_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. ANALYTICS TABLE - Real-time tracking
-- ============================================

CREATE TABLE IF NOT EXISTS analytics (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  article_id BIGINT UNSIGNED NULL,
  user_id BIGINT UNSIGNED NULL,
  event_type ENUM('view', 'like', 'share', 'comment', 'click', 'scroll', 'time_spent') NOT NULL,
  event_value INT UNSIGNED DEFAULT 1,
  url VARCHAR(500),
  referrer VARCHAR(500),
  device_type ENUM('mobile', 'tablet', 'desktop', 'other') NOT NULL,
  browser VARCHAR(100),
  os VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  ip_address VARCHAR(45),
  session_id VARCHAR(255),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_article_id (article_id),
  INDEX idx_user_id (user_id),
  INDEX idx_event_type (event_type),
  INDEX idx_device_type (device_type),
  INDEX idx_created_at (created_at),
  INDEX idx_session_id (session_id),
  INDEX idx_article_event (article_id, event_type, created_at),
  
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
PARTITION BY RANGE (UNIX_TIMESTAMP(created_at)) (
  PARTITION p_2024 VALUES LESS THAN (UNIX_TIMESTAMP('2025-01-01')),
  PARTITION p_2025_q1 VALUES LESS THAN (UNIX_TIMESTAMP('2025-04-01')),
  PARTITION p_2025_q2 VALUES LESS THAN (UNIX_TIMESTAMP('2025-07-01')),
  PARTITION p_2025_q3 VALUES LESS THAN (UNIX_TIMESTAMP('2025-10-01')),
  PARTITION p_2025_q4 VALUES LESS THAN (UNIX_TIMESTAMP('2026-01-01')),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- ============================================
-- 9. SEO_AUDITS TABLE - SEO tracking
-- ============================================

CREATE TABLE IF NOT EXISTS seo_audits (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  article_id BIGINT UNSIGNED NULL,
  url VARCHAR(500) NOT NULL,
  score_overall TINYINT UNSIGNED,
  score_technical TINYINT UNSIGNED,
  score_content TINYINT UNSIGNED,
  score_performance TINYINT UNSIGNED,
  score_mobile TINYINT UNSIGNED,
  issues JSON,
  recommendations JSON,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_article_id (article_id),
  INDEX idx_url (url),
  INDEX idx_score_overall (score_overall),
  INDEX idx_created_at (created_at),
  
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. SESSIONS TABLE - User sessions
-- ============================================

CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  payload LONGTEXT,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_last_activity (last_activity),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. CACHE TABLE - Application cache
-- ============================================

CREATE TABLE IF NOT EXISTS cache (
  cache_key VARCHAR(255) PRIMARY KEY,
  cache_value LONGTEXT NOT NULL,
  expiration TIMESTAMP NOT NULL,
  
  INDEX idx_expiration (expiration)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 12. JOBS TABLE - Queue system
-- ============================================

CREATE TABLE IF NOT EXISTS jobs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  queue VARCHAR(255) NOT NULL DEFAULT 'default',
  payload LONGTEXT NOT NULL,
  attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
  reserved_at TIMESTAMP NULL,
  available_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_queue (queue),
  INDEX idx_reserved_at (reserved_at),
  INDEX idx_available_at (available_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VIEWS - Optimized queries
-- ============================================

-- View: Popular Articles
CREATE OR REPLACE VIEW popular_articles AS
SELECT 
  a.id,
  a.slug,
  a.title,
  a.excerpt,
  a.featured_image,
  a.views,
  a.likes,
  a.shares,
  a.published_at,
  c.name as category_name,
  c.slug as category_slug,
  u.full_name as author_name
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN users u ON a.author_id = u.id
WHERE a.status = 'published'
  AND a.deleted_at IS NULL
ORDER BY a.views DESC, a.published_at DESC
LIMIT 100;

-- View: Trending Articles (last 7 days)
CREATE OR REPLACE VIEW trending_articles AS
SELECT 
  a.id,
  a.slug,
  a.title,
  a.excerpt,
  a.featured_image,
  a.views,
  a.likes,
  a.shares,
  a.published_at,
  c.name as category_name,
  COUNT(DISTINCT an.id) as recent_views
FROM articles a
JOIN categories c ON a.category_id = c.id
LEFT JOIN analytics an ON a.id = an.article_id 
  AND an.event_type = 'view'
  AND an.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
WHERE a.status = 'published'
  AND a.deleted_at IS NULL
  AND a.published_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY a.id
ORDER BY recent_views DESC, a.views DESC
LIMIT 50;

-- ============================================
-- STORED PROCEDURES - Optimized operations
-- ============================================

DELIMITER //

-- Procedure: Increment article views
CREATE PROCEDURE increment_article_views(IN p_article_id BIGINT UNSIGNED)
BEGIN
  UPDATE articles 
  SET views = views + 1,
      last_viewed_at = CURRENT_TIMESTAMP
  WHERE id = p_article_id;
END //

-- Procedure: Get article with related data
CREATE PROCEDURE get_article_full(IN p_article_id BIGINT UNSIGNED)
BEGIN
  SELECT 
    a.*,
    c.name as category_name,
    c.slug as category_slug,
    u.full_name as author_name,
    u.avatar_url as author_avatar,
    GROUP_CONCAT(t.name) as tags
  FROM articles a
  JOIN categories c ON a.category_id = c.id
  JOIN users u ON a.author_id = u.id
  LEFT JOIN article_tags at ON a.id = at.article_id
  LEFT JOIN tags t ON at.tag_id = t.id
  WHERE a.id = p_article_id
  GROUP BY a.id;
END //

-- Procedure: Clean old analytics (older than 1 year)
CREATE PROCEDURE clean_old_analytics()
BEGIN
  DELETE FROM analytics 
  WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
  
  OPTIMIZE TABLE analytics;
END //

DELIMITER ;

-- ============================================
-- EVENTS - Automated maintenance
-- ============================================

-- Enable event scheduler
SET GLOBAL event_scheduler = ON;

-- Event: Clean expired cache daily
CREATE EVENT IF NOT EXISTS clean_expired_cache
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
  DELETE FROM cache WHERE expiration < NOW();

-- Event: Update trending articles hourly
CREATE EVENT IF NOT EXISTS update_trending_articles
ON SCHEDULE EVERY 1 HOUR
STARTS CURRENT_TIMESTAMP
DO
  UPDATE articles a
  SET is_trending = (
    SELECT COUNT(*) > 100
    FROM analytics an
    WHERE an.article_id = a.id
      AND an.event_type = 'view'
      AND an.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
  )
  WHERE a.status = 'published';

-- Event: Clean old sessions weekly
CREATE EVENT IF NOT EXISTS clean_old_sessions
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_TIMESTAMP
DO
  DELETE FROM sessions 
  WHERE last_activity < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- ============================================
-- TRIGGERS - Data integrity
-- ============================================

DELIMITER //

-- Trigger: Update tag usage count on insert
CREATE TRIGGER update_tag_usage_on_insert
AFTER INSERT ON article_tags
FOR EACH ROW
BEGIN
  UPDATE tags 
  SET usage_count = usage_count + 1 
  WHERE id = NEW.tag_id;
END //

-- Trigger: Update tag usage count on delete
CREATE TRIGGER update_tag_usage_on_delete
AFTER DELETE ON article_tags
FOR EACH ROW
BEGIN
  UPDATE tags 
  SET usage_count = usage_count - 1 
  WHERE id = OLD.tag_id;
END //

-- Trigger: Update comments count on insert
CREATE TRIGGER update_comments_count_on_insert
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
  IF NEW.status = 'approved' THEN
    UPDATE articles 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.article_id;
  END IF;
END //

-- Trigger: Update comments count on delete
CREATE TRIGGER update_comments_count_on_delete
AFTER DELETE ON comments
FOR EACH ROW
BEGIN
  IF OLD.status = 'approved' THEN
    UPDATE articles 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.article_id;
  END IF;
END //

DELIMITER ;

-- ============================================
-- INDEXES OPTIMIZATION
-- ============================================

-- Composite indexes for common queries
ALTER TABLE articles 
  ADD INDEX idx_status_featured_published (status, is_featured, published_at),
  ADD INDEX idx_category_status_published (category_id, status, published_at),
  ADD INDEX idx_author_status_published (author_id, status, published_at);

ALTER TABLE analytics
  ADD INDEX idx_article_created (article_id, created_at),
  ADD INDEX idx_event_created (event_type, created_at);

-- ============================================
-- INITIAL DATA - Categories
-- ============================================

INSERT INTO categories (slug, name, description, icon, color, bg_gradient, display_order) VALUES
('politica', 'Política', 'Noticias políticas de Argentina', '🏛️', '#2563EB', 'from-blue-600 to-blue-800', 1),
('economia', 'Economía', 'Economía y finanzas argentinas', '💰', '#059669', 'from-green-600 to-green-800', 2),
('internacional', 'Internacional', 'Noticias internacionales', '🌎', '#DC2626', 'from-red-600 to-red-800', 3),
('sociedad', 'Sociedad', 'Noticias de la sociedad', '👥', '#EA580C', 'from-orange-600 to-orange-800', 4),
('deportes', 'Deportes', 'Deportes y competiciones', '⚽', '#7C3AED', 'from-purple-600 to-purple-800', 5),
('cultura', 'Cultura', 'Cultura y entretenimiento', '🎭', '#DB2777', 'from-pink-600 to-pink-800', 6),
('tecnologia', 'Tecnología', 'Tecnología e innovación', '💻', '#0891B2', 'from-cyan-600 to-cyan-800', 7),
('negocios', 'Negocios', 'Mundo empresarial', '🏢', '#0D9488', 'from-teal-600 to-teal-800', 8),
('espectaculos', 'Espectáculos', 'Entretenimiento y shows', '🎬', '#EA580C', 'from-orange-600 to-orange-800', 9),
('salud', 'Salud', 'Salud y bienestar', '🏥', '#65A30D', 'from-lime-600 to-lime-800', 10),
('lifestyle', 'Lifestyle', 'Estilo de vida', '🏠', '#9333EA', 'from-violet-600 to-violet-800', 11),
('ciencia', 'Ciencia', 'Ciencia y descubrimientos', '🔬', '#4F46E5', 'from-indigo-600 to-indigo-800', 12),
('judicial', 'Judicial', 'Noticias judiciales', '⚖️', '#92400E', 'from-amber-800 to-amber-950', 13)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ============================================
-- GRANT PERMISSIONS (adjust as needed)
-- ============================================

-- CREATE USER IF NOT EXISTS 'politica_user'@'localhost' IDENTIFIED BY 'secure_password_here';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON politica_argentina.* TO 'politica_user'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================
-- ANALYZE TABLES - Initial optimization
-- ============================================

ANALYZE TABLE users, categories, articles, article_translations, tags, article_tags, comments, analytics, seo_audits;

-- ============================================
-- 🎉 DATABASE OPTIMIZATION COMPLETE
-- ============================================

SELECT 'Database schema created and optimized successfully!' as status;

