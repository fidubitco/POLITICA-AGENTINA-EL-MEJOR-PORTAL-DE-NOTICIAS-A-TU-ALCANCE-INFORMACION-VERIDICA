-- ============================================
-- SCHEMA DE BASE DE DATOS MYSQL
-- Portal de Noticias Política Argentina
-- ============================================

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Sesiones
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#bb1919',
    icon VARCHAR(50),
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Artículos
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    image_url VARCHAR(500),
    category_id INT NOT NULL,
    author_id INT NOT NULL,
    status ENUM('draft', 'pending', 'published', 'archived') DEFAULT 'draft',
    is_breaking BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    shares INT DEFAULT 0,
    likes INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    scheduled_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_slug (slug),
    INDEX idx_category_id (category_id),
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_is_breaking (is_breaking),
    INDEX idx_is_featured (is_featured),
    FULLTEXT INDEX idx_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Tags
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de relación Artículos-Tags
CREATE TABLE IF NOT EXISTS article_tags (
    article_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Fuentes de Noticias
CREATE TABLE IF NOT EXISTS news_sources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    rss_url VARCHAR(500),
    scraping_config JSON,
    is_enabled BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP NULL,
    articles_found INT DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 100.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_enabled (is_enabled),
    INDEX idx_last_sync_at (last_sync_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Artículos Scrapeados
CREATE TABLE IF NOT EXISTS scraped_articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    url VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    image_url VARCHAR(500),
    category VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected', 'published') DEFAULT 'pending',
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT NULL,
    reviewed_at TIMESTAMP NULL,
    article_id INT NULL,
    FOREIGN KEY (source_id) REFERENCES news_sources(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE SET NULL,
    INDEX idx_source_id (source_id),
    INDEX idx_status (status),
    INDEX idx_url (url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Analytics
CREATE TABLE IF NOT EXISTS analytics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    event_type ENUM('view', 'share', 'like', 'comment') NOT NULL,
    user_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    country VARCHAR(2),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_article_id (article_id),
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Notificaciones
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('article_published', 'comment', 'mention', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Push Subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    endpoint VARCHAR(500) UNIQUE NOT NULL,
    keys JSON NOT NULL,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Configuración del Sistema
CREATE TABLE IF NOT EXISTS system_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key_name (key_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar usuario admin por defecto
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@politicaargentina.com', '$2b$10$YourHashedPasswordHere', 'Administrador', 'admin');

-- Insertar categorías por defecto
INSERT INTO categories (name, slug, description, color, order_index) VALUES
('Política', 'politica', 'Noticias políticas de Argentina', '#bb1919', 1),
('Economía', 'economia', 'Noticias económicas y financieras', '#0a7373', 2),
('Sociedad', 'sociedad', 'Noticias de sociedad y cultura', '#8e44ad', 3),
('Internacional', 'internacional', 'Noticias internacionales', '#2980b9', 4),
('Deportes', 'deportes', 'Noticias deportivas', '#27ae60', 5),
('Cultura', 'cultura', 'Noticias culturales y entretenimiento', '#e67e22', 6);

-- Insertar fuentes de noticias por defecto
INSERT INTO news_sources (name, url, rss_url, is_enabled) VALUES
('Clarín', 'https://www.clarin.com', 'https://www.clarin.com/rss/', TRUE),
('La Nación', 'https://www.lanacion.com.ar', 'https://www.lanacion.com.ar/arcio/rss/', TRUE),
('Página/12', 'https://www.pagina12.com.ar', 'https://www.pagina12.com.ar/rss/portada', TRUE),
('Infobae', 'https://www.infobae.com', 'https://www.infobae.com/feeds/rss/', TRUE),
('Ámbito', 'https://www.ambito.com', 'https://www.ambito.com/rss/', TRUE),
('Perfil', 'https://www.perfil.com', 'https://www.perfil.com/feed', TRUE),
('Cronista', 'https://www.cronista.com', 'https://www.cronista.com/rss/', TRUE),
('Buenos Aires Times', 'https://www.batimes.com.ar', 'https://www.batimes.com.ar/feed', TRUE);

-- Configuración del sistema
INSERT INTO system_config (key_name, value, type, description) VALUES
('site_name', 'Política Argentina', 'string', 'Nombre del sitio'),
('auto_sync_interval', '30', 'number', 'Intervalo de sincronización automática en minutos'),
('auto_approve_news', 'false', 'boolean', 'Aprobar automáticamente noticias scrapeadas'),
('max_articles_per_day', '50', 'number', 'Máximo de artículos por día'),
('enable_push_notifications', 'true', 'boolean', 'Habilitar notificaciones push'),
('analytics_retention_days', '90', 'number', 'Días de retención de analytics');

-- ============================================
-- VISTAS PARA REPORTES
-- ============================================

-- Vista de artículos más vistos
CREATE OR REPLACE VIEW v_top_articles AS
SELECT 
    a.id,
    a.title,
    a.slug,
    c.name as category,
    u.name as author,
    a.views,
    a.shares,
    a.likes,
    a.published_at
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN users u ON a.author_id = u.id
WHERE a.status = 'published'
ORDER BY a.views DESC;

-- Vista de estadísticas por categoría
CREATE OR REPLACE VIEW v_category_stats AS
SELECT 
    c.id,
    c.name,
    COUNT(a.id) as total_articles,
    SUM(a.views) as total_views,
    AVG(a.views) as avg_views,
    SUM(a.shares) as total_shares
FROM categories c
LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
GROUP BY c.id, c.name;

-- Vista de actividad de usuarios
CREATE OR REPLACE VIEW v_user_activity AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.role,
    COUNT(DISTINCT a.id) as articles_written,
    SUM(a.views) as total_views,
    u.last_login
FROM users u
LEFT JOIN articles a ON u.id = a.author_id
GROUP BY u.id, u.name, u.email, u.role, u.last_login;
