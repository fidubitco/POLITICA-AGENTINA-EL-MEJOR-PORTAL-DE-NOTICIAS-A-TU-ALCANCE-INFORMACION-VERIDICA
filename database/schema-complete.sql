-- ============================================
-- SCHEMA COMPLETO - POLÍTICA ARGENTINA
-- Base de datos MySQL optimizada
-- ============================================

-- Eliminar tablas existentes (cuidado en producción)
DROP TABLE IF EXISTS article_views;
DROP TABLE IF EXISTS article_shares;
DROP TABLE IF EXISTS article_likes;
DROP TABLE IF EXISTS article_comments;
DROP TABLE IF EXISTS article_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS poll_votes;
DROP TABLE IF EXISTS poll_options;
DROP TABLE IF EXISTS polls;
DROP TABLE IF EXISTS election_results;
DROP TABLE IF EXISTS elections;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS live_updates;
DROP TABLE IF EXISTS political_settings;
DROP TABLE IF EXISTS financial_data;
DROP TABLE IF EXISTS financial_history;
DROP TABLE IF EXISTS ai_analysis;
DROP TABLE IF EXISTS news_sources;
DROP TABLE IF EXISTS scraped_articles;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS analytics_events;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS push_subscriptions;

-- ============================================
-- TABLA: users
-- ============================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: sessions
-- ============================================
CREATE TABLE sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token),
  INDEX idx_user_id (user_id),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: categories
-- ============================================
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  gradient VARCHAR(100),
  keywords JSON,
  featured_topics JSON,
  related_categories JSON,
  article_count INT DEFAULT 0,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_is_active (is_active),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: subcategories
-- ============================================
CREATE TABLE subcategories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  article_count INT DEFAULT 0,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY unique_category_slug (category_id, slug),
  INDEX idx_category_id (category_id),
  INDEX idx_slug (slug),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: articles
-- ============================================
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  image_url TEXT,
  category_id INT NOT NULL,
  subcategory_id INT,
  author_id INT NOT NULL,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT FALSE,
  is_breaking BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  shares INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  reading_time INT,
  language VARCHAR(10) DEFAULT 'es',
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords JSON,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id),
  FOREIGN KEY (author_id) REFERENCES users(id),
  FULLTEXT INDEX idx_fulltext_search (title, excerpt, content),
  INDEX idx_slug (slug),
  INDEX idx_category_id (category_id),
  INDEX idx_subcategory_id (subcategory_id),
  INDEX idx_author_id (author_id),
  INDEX idx_status (status),
  INDEX idx_is_featured (is_featured),
  INDEX idx_is_breaking (is_breaking),
  INDEX idx_published_at (published_at),
  INDEX idx_views (views),
  INDEX idx_language (language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: tags
-- ============================================
CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  article_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_article_count (article_count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: article_tags
-- ============================================
CREATE TABLE article_tags (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  INDEX idx_article_id (article_id),
  INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: article_comments
-- ============================================
CREATE TABLE article_comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  user_id INT NOT NULL,
  parent_id INT NULL,
  content TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES article_comments(id) ON DELETE CASCADE,
  INDEX idx_article_id (article_id),
  INDEX idx_user_id (user_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: article_views
-- ============================================
CREATE TABLE article_views (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  user_id INT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_article_id (article_id),
  INDEX idx_user_id (user_id),
  INDEX idx_viewed_at (viewed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: article_shares
-- ============================================
CREATE TABLE article_shares (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  user_id INT NULL,
  platform ENUM('facebook', 'twitter', 'whatsapp', 'linkedin', 'email', 'other') NOT NULL,
  shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_article_id (article_id),
  INDEX idx_user_id (user_id),
  INDEX idx_platform (platform),
  INDEX idx_shared_at (shared_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: article_likes
-- ============================================
CREATE TABLE article_likes (
  article_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (article_id, user_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_article_id (article_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: candidates (Sistema Político)
-- ============================================
CREATE TABLE candidates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  photo_url TEXT,
  bio TEXT,
  proposals TEXT,
  social_media JSON,
  status ENUM('active', 'inactive') DEFAULT 'active',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_position (position),
  INDEX idx_status (status),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: polls (Encuestas)
-- ============================================
CREATE TABLE polls (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  question TEXT NOT NULL,
  poll_type ENUM('single', 'multiple') DEFAULT 'single',
  status ENUM('draft', 'active', 'closed') DEFAULT 'draft',
  total_votes INT DEFAULT 0,
  start_date TIMESTAMP NULL,
  end_date TIMESTAMP NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_start_date (start_date),
  INDEX idx_end_date (end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: poll_options
-- ============================================
CREATE TABLE poll_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT NOT NULL,
  option_text VARCHAR(500) NOT NULL,
  votes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
  INDEX idx_poll_id (poll_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: poll_votes
-- ============================================
CREATE TABLE poll_votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT NOT NULL,
  option_id INT NOT NULL,
  user_id INT NULL,
  ip_address VARCHAR(45),
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE KEY unique_user_poll (poll_id, user_id),
  UNIQUE KEY unique_ip_poll (poll_id, ip_address),
  INDEX idx_poll_id (poll_id),
  INDEX idx_option_id (option_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: elections (Elecciones)
-- ============================================
CREATE TABLE elections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  election_type ENUM('Presidencial', 'Legislativa', 'Provincial', 'Municipal') NOT NULL,
  election_date DATE NOT NULL,
  status ENUM('upcoming', 'in_progress', 'completed') DEFAULT 'upcoming',
  total_votes INT DEFAULT 0,
  participation_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_election_type (election_type),
  INDEX idx_election_date (election_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: election_results
-- ============================================
CREATE TABLE election_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  election_id INT NOT NULL,
  candidate_id INT NOT NULL,
  votes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  position INT,
  province VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
  UNIQUE KEY unique_election_candidate_province (election_id, candidate_id, province),
  INDEX idx_election_id (election_id),
  INDEX idx_candidate_id (candidate_id),
  INDEX idx_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: live_updates (Actualizaciones en Vivo)
-- ============================================
CREATE TABLE live_updates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  importance ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  category VARCHAR(100),
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_importance (importance),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: political_settings
-- ============================================
CREATE TABLE political_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: financial_data (Datos Financieros)
-- ============================================
CREATE TABLE financial_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  data_type VARCHAR(50) NOT NULL,
  currency VARCHAR(10),
  buy_price DECIMAL(10,2),
  sell_price DECIMAL(10,2),
  value DECIMAL(15,2),
  variation DECIMAL(5,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_data_type (data_type),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: financial_history
-- ============================================
CREATE TABLE financial_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  data_type VARCHAR(50) NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_data_type (data_type),
  INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: ai_analysis (Análisis con IA)
-- ============================================
CREATE TABLE ai_analysis (
  id INT PRIMARY KEY AUTO_INCREMENT,
  analysis_type VARCHAR(50) NOT NULL,
  summary TEXT,
  predictions JSON,
  recommendations JSON,
  sentiment ENUM('positive', 'negative', 'neutral') DEFAULT 'neutral',
  confidence DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_analysis_type (analysis_type),
  INDEX idx_sentiment (sentiment),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: news_sources (Fuentes de Noticias)
-- ============================================
CREATE TABLE news_sources (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  rss_feed TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  scrape_frequency INT DEFAULT 60,
  last_scraped_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_active (is_active),
  INDEX idx_last_scraped_at (last_scraped_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: scraped_articles
-- ============================================
CREATE TABLE scraped_articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  source_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  url TEXT NOT NULL,
  excerpt TEXT,
  content LONGTEXT,
  image_url TEXT,
  author VARCHAR(255),
  published_date TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected', 'published') DEFAULT 'pending',
  scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_id) REFERENCES news_sources(id) ON DELETE CASCADE,
  INDEX idx_source_id (source_id),
  INDEX idx_status (status),
  INDEX idx_scraped_at (scraped_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: analytics_events
-- ============================================
CREATE TABLE analytics_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_type VARCHAR(50) NOT NULL,
  event_data JSON,
  user_id INT NULL,
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_event_type (event_type),
  INDEX idx_user_id (user_id),
  INDEX idx_session_id (session_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: notifications
-- ============================================
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: push_subscriptions
-- ============================================
CREATE TABLE push_subscriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar categorías
INSERT INTO categories (name, slug, description, icon, color, gradient, keywords, featured_topics, related_categories, display_order) VALUES
('Política', 'politica', 'Noticias y análisis sobre política argentina', 'landmark', '#3b82f6', 'from-blue-500 to-blue-700', '["gobierno", "congreso", "elecciones"]', '["Reforma Económica", "Ley Ómnibus"]', '["economia", "sociedad"]', 1),
('Economía', 'economia', 'Análisis económico y finanzas', 'trending-up', '#10b981', 'from-green-500 to-green-700', '["dólar", "inflación", "mercado"]', '["Dolarización", "FMI"]', '["politica", "internacional"]', 2),
('Sociedad', 'sociedad', 'Noticias sociales y derechos', 'users', '#f59e0b', 'from-amber-500 to-amber-700', '["educación", "salud", "seguridad"]', '["Reforma Educativa", "Sistema de Salud"]', '["politica", "cultura"]', 3),
('Internacional', 'internacional', 'Noticias internacionales', 'globe', '#8b5cf6', 'from-purple-500 to-purple-700', '["Mercosur", "BRICS", "diplomacia"]', '["Ingreso a BRICS", "Mercosur"]', '["politica", "economia"]', 4),
('Deportes', 'deportes', 'Noticias deportivas', 'trophy', '#ef4444', 'from-red-500 to-red-700', '["fútbol", "selección", "Messi"]', '["Copa América", "Eliminatorias"]', '["sociedad", "cultura"]', 5),
('Cultura', 'cultura', 'Arte y cultura argentina', 'palette', '#ec4899', 'from-pink-500 to-pink-700', '["arte", "música", "cine"]', '["Festival de Cine", "Rock Nacional"]', '["sociedad", "internacional"]', 6),
('Tecnología', 'tecnologia', 'Innovación y tecnología', 'cpu', '#06b6d4', 'from-cyan-500 to-cyan-700', '["tecnología", "startups", "IA"]', '["Unicornios Argentinos", "IA"]', '["economia", "educacion"]', 7),
('Opinión', 'opinion', 'Columnas y análisis', 'message-square', '#6366f1', 'from-indigo-500 to-indigo-700', '["opinión", "análisis", "editorial"]', '["Reforma del Estado", "Modelo Económico"]', '["politica", "economia"]', 8);

-- Insertar usuario admin
INSERT INTO users (email, password_hash, username, full_name, role, status, email_verified) VALUES
('admin@politicaargentina.com', '$2b$10$YourHashedPasswordHere', 'admin', 'Administrador', 'admin', 'active', TRUE);

-- Insertar configuración política
INSERT INTO political_settings (setting_key, setting_value, description) VALUES
('enable_live_results', 'true', 'Habilitar resultados en tiempo real'),
('enable_polls', 'true', 'Habilitar encuestas públicas'),
('enable_candidate_profiles', 'true', 'Habilitar perfiles de candidatos'),
('auto_update_interval', '30', 'Intervalo de actualización en segundos'),
('show_vote_count', 'true', 'Mostrar conteo de votos'),
('allow_anonymous_voting', 'true', 'Permitir votación anónima');

-- ============================================
-- FIN DEL SCHEMA
-- ============================================

