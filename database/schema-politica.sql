-- =====================================================
-- SCHEMA PARA SISTEMA POLÍTICO EN TIEMPO REAL
-- =====================================================

-- Tabla de Candidatos
CREATE TABLE IF NOT EXISTS candidates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL, -- Presidente, Diputado, Senador, etc.
  photo_url TEXT,
  bio TEXT,
  proposals TEXT,
  social_media JSON, -- {twitter, facebook, instagram, website}
  status ENUM('active', 'inactive') DEFAULT 'active',
  order_position INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_position (position),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Encuestas
CREATE TABLE IF NOT EXISTS polls (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  question TEXT NOT NULL,
  poll_type ENUM('single', 'multiple') DEFAULT 'single',
  status ENUM('draft', 'active', 'closed') DEFAULT 'draft',
  start_date DATETIME,
  end_date DATETIME,
  total_votes INT DEFAULT 0,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Opciones de Encuesta
CREATE TABLE IF NOT EXISTS poll_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT NOT NULL,
  option_text VARCHAR(255) NOT NULL,
  candidate_id INT NULL, -- Opcional: vincular con candidato
  votes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  order_position INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE SET NULL,
  INDEX idx_poll (poll_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Votos de Encuesta (para evitar duplicados)
CREATE TABLE IF NOT EXISTS poll_votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT NOT NULL,
  option_id INT NOT NULL,
  user_id INT NULL, -- NULL si es anónimo
  ip_address VARCHAR(45),
  user_agent TEXT,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_poll (poll_id),
  INDEX idx_user (user_id),
  INDEX idx_ip (ip_address),
  UNIQUE KEY unique_user_poll (poll_id, user_id),
  UNIQUE KEY unique_ip_poll (poll_id, ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Elecciones
CREATE TABLE IF NOT EXISTS elections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  election_type VARCHAR(100) NOT NULL, -- Presidencial, Legislativa, etc.
  description TEXT,
  election_date DATE NOT NULL,
  status ENUM('upcoming', 'in_progress', 'completed') DEFAULT 'upcoming',
  total_votes INT DEFAULT 0,
  participation_percentage DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (election_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Resultados de Elecciones
CREATE TABLE IF NOT EXISTS election_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  election_id INT NOT NULL,
  candidate_id INT NOT NULL,
  votes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  position INT DEFAULT 0, -- 1 = ganador, 2 = segundo, etc.
  province VARCHAR(100), -- NULL para resultados nacionales
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
  INDEX idx_election (election_id),
  INDEX idx_candidate (candidate_id),
  INDEX idx_province (province)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Actualizaciones en Tiempo Real
CREATE TABLE IF NOT EXISTS live_updates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('election', 'poll', 'candidate') NOT NULL,
  reference_id INT NOT NULL, -- ID de election, poll o candidate
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  importance ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  is_breaking BOOLEAN DEFAULT FALSE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_type (type),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Configuración del Sistema Político
CREATE TABLE IF NOT EXISTS political_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar configuraciones por defecto
INSERT INTO political_settings (setting_key, setting_value, description) VALUES
('enable_live_results', 'true', 'Habilitar resultados en tiempo real'),
('enable_polls', 'true', 'Habilitar encuestas públicas'),
('enable_candidate_profiles', 'true', 'Habilitar perfiles de candidatos'),
('auto_update_interval', '30', 'Intervalo de actualización automática en segundos'),
('show_vote_count', 'true', 'Mostrar conteo de votos en encuestas'),
('allow_anonymous_voting', 'true', 'Permitir votación anónima en encuestas')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);

-- Datos de ejemplo: Candidatos
INSERT INTO candidates (name, party, position, photo_url, bio, proposals, social_media, status, order_position) VALUES
('Javier Milei', 'La Libertad Avanza', 'Presidente', '/images/milei-1.jpg', 'Economista y político argentino. Presidente de Argentina desde 2023.', 'Dolarización de la economía, reducción del gasto público, reforma del Estado.', '{"twitter": "@JMilei", "instagram": "@javiermilei"}', 'active', 1),
('Sergio Massa', 'Unión por la Patria', 'Presidente', '/images/massa.jpg', 'Político y abogado argentino. Ex Ministro de Economía.', 'Estabilidad económica, desarrollo productivo, justicia social.', '{"twitter": "@SergioMassa", "instagram": "@sergiomasaok"}', 'active', 2),
('Patricia Bullrich', 'Juntos por el Cambio', 'Presidente', '/images/bullrich.jpg', 'Política argentina. Ex Ministra de Seguridad.', 'Seguridad ciudadana, combate al narcotráfico, reforma judicial.', '{"twitter": "@PatoBullrich", "instagram": "@patobullrich"}', 'active', 3);

-- Datos de ejemplo: Elecciones
INSERT INTO elections (name, election_type, description, election_date, status, total_votes, participation_percentage) VALUES
('Elecciones Presidenciales 2023', 'Presidencial', 'Segunda vuelta de las elecciones presidenciales argentinas 2023', '2023-11-19', 'completed', 25000000, 78.50),
('Elecciones Legislativas 2025', 'Legislativa', 'Elecciones de medio término para renovación de diputados y senadores', '2025-10-26', 'upcoming', 0, 0.00);

-- Datos de ejemplo: Resultados (Elección 2023)
INSERT INTO election_results (election_id, candidate_id, votes, percentage, position) VALUES
(1, 1, 14500000, 55.69, 1), -- Milei ganador
(1, 2, 11500000, 44.31, 2); -- Massa segundo

-- Datos de ejemplo: Encuesta activa
INSERT INTO polls (title, description, question, poll_type, status, start_date, end_date, total_votes) VALUES
('Aprobación Presidencial Enero 2025', 'Encuesta mensual sobre la aprobación del gobierno', '¿Cómo califica la gestión del presidente Javier Milei?', 'single', 'active', '2025-01-01 00:00:00', '2025-01-31 23:59:59', 0);

INSERT INTO poll_options (poll_id, option_text, votes, order_position) VALUES
(1, 'Muy buena', 0, 1),
(1, 'Buena', 0, 2),
(1, 'Regular', 0, 3),
(1, 'Mala', 0, 4),
(1, 'Muy mala', 0, 5);

