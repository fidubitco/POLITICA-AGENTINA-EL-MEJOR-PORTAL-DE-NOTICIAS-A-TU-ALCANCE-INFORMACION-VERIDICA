-- ============================================
-- SISTEMA DE ENCUESTAS Y VOTACIONES POLÍTICAS
-- ============================================

-- Tabla de Candidatos Políticos
CREATE TABLE IF NOT EXISTS political_candidates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL COMMENT 'Presidente, Gobernador, Senador, etc.',
  province VARCHAR(100) DEFAULT NULL,
  photo_url VARCHAR(500) DEFAULT NULL,
  bio TEXT,
  proposals TEXT,
  social_twitter VARCHAR(255),
  social_facebook VARCHAR(255),
  social_instagram VARCHAR(255),
  website VARCHAR(255),
  status ENUM('active', 'inactive', 'retired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_party (party),
  INDEX idx_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Encuestas Políticas
CREATE TABLE IF NOT EXISTS political_polls (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  question TEXT NOT NULL,
  poll_type ENUM('presidential', 'legislative', 'gubernatorial', 'approval', 'general') DEFAULT 'general',
  province VARCHAR(100) DEFAULT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL,
  status ENUM('draft', 'active', 'closed', 'archived') DEFAULT 'draft',
  total_votes INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_poll_type (poll_type),
  INDEX idx_featured (is_featured),
  INDEX idx_dates (start_date, end_date),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Opciones de Encuesta
CREATE TABLE IF NOT EXISTS poll_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT NOT NULL,
  candidate_id INT DEFAULT NULL,
  option_text VARCHAR(500) NOT NULL,
  option_order INT DEFAULT 0,
  votes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  color VARCHAR(20) DEFAULT '#3B82F6',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_poll (poll_id),
  INDEX idx_candidate (candidate_id),
  INDEX idx_votes (votes DESC),
  FOREIGN KEY (poll_id) REFERENCES political_polls(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES political_candidates(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Votos (para evitar duplicados)
CREATE TABLE IF NOT EXISTS poll_votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT NOT NULL,
  option_id INT NOT NULL,
  user_id INT DEFAULT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_poll (poll_id),
  INDEX idx_option (option_id),
  INDEX idx_user (user_id),
  INDEX idx_ip (ip_address),
  UNIQUE KEY unique_vote_user (poll_id, user_id),
  UNIQUE KEY unique_vote_ip (poll_id, ip_address),
  FOREIGN KEY (poll_id) REFERENCES political_polls(id) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Calificaciones de Candidatos
CREATE TABLE IF NOT EXISTS candidate_ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  user_id INT DEFAULT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  category ENUM('leadership', 'proposals', 'honesty', 'experience', 'communication', 'overall') DEFAULT 'overall',
  comment TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_candidate (candidate_id),
  INDEX idx_user (user_id),
  INDEX idx_rating (rating),
  INDEX idx_category (category),
  UNIQUE KEY unique_rating_user (candidate_id, user_id, category),
  FOREIGN KEY (candidate_id) REFERENCES political_candidates(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Estadísticas de Candidatos (agregadas)
CREATE TABLE IF NOT EXISTS candidate_stats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  candidate_id INT NOT NULL UNIQUE,
  total_ratings INT DEFAULT 0,
  avg_leadership DECIMAL(3,2) DEFAULT 0.00,
  avg_proposals DECIMAL(3,2) DEFAULT 0.00,
  avg_honesty DECIMAL(3,2) DEFAULT 0.00,
  avg_experience DECIMAL(3,2) DEFAULT 0.00,
  avg_communication DECIMAL(3,2) DEFAULT 0.00,
  avg_overall DECIMAL(3,2) DEFAULT 0.00,
  total_votes INT DEFAULT 0,
  approval_rating DECIMAL(5,2) DEFAULT 0.00,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES political_candidates(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Campañas Políticas
CREATE TABLE IF NOT EXISTS political_campaigns (
  id INT PRIMARY KEY AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  campaign_name VARCHAR(500) NOT NULL,
  slogan VARCHAR(500),
  description TEXT,
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  status ENUM('planning', 'active', 'completed', 'suspended') DEFAULT 'planning',
  province VARCHAR(100),
  target_position VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_candidate (candidate_id),
  INDEX idx_status (status),
  INDEX idx_dates (start_date, end_date),
  FOREIGN KEY (candidate_id) REFERENCES political_candidates(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Resultados Electorales Históricos
CREATE TABLE IF NOT EXISTS election_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  election_name VARCHAR(500) NOT NULL,
  election_type ENUM('presidential', 'legislative', 'gubernatorial', 'municipal') NOT NULL,
  election_date DATE NOT NULL,
  province VARCHAR(100),
  candidate_id INT,
  party VARCHAR(255),
  votes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  position INT COMMENT 'Posición final (1=ganador, 2=segundo, etc.)',
  is_winner BOOLEAN DEFAULT FALSE,
  total_eligible_voters INT,
  turnout_percentage DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_election_date (election_date DESC),
  INDEX idx_election_type (election_type),
  INDEX idx_candidate (candidate_id),
  INDEX idx_province (province),
  FOREIGN KEY (candidate_id) REFERENCES political_candidates(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Candidatos de ejemplo
INSERT INTO political_candidates (name, party, position, province, bio, status) VALUES
('Javier Milei', 'La Libertad Avanza', 'Presidente', NULL, 'Economista y político argentino, actual Presidente de la Nación.', 'active'),
('Cristina Fernández de Kirchner', 'Frente de Todos', 'Senadora', 'Buenos Aires', 'Ex Presidenta de la Nación Argentina (2007-2015).', 'active'),
('Mauricio Macri', 'Juntos por el Cambio', 'Diputado', 'Ciudad de Buenos Aires', 'Ex Presidente de la Nación Argentina (2015-2019).', 'active'),
('Axel Kicillof', 'Frente de Todos', 'Gobernador', 'Buenos Aires', 'Gobernador de la Provincia de Buenos Aires.', 'active'),
('Horacio Rodríguez Larreta', 'Juntos por el Cambio', 'Ex Jefe de Gobierno', 'Ciudad de Buenos Aires', 'Ex Jefe de Gobierno de la Ciudad de Buenos Aires.', 'active');

-- Encuesta de ejemplo
INSERT INTO political_polls (title, description, question, poll_type, status, is_featured) VALUES
('Intención de Voto Presidencial 2025', 'Encuesta sobre intención de voto para las próximas elecciones presidenciales', '¿A quién votarías para Presidente en 2025?', 'presidential', 'active', TRUE);

-- Opciones de encuesta
INSERT INTO poll_options (poll_id, candidate_id, option_text, option_order, color) VALUES
(1, 1, 'Javier Milei', 1, '#FFD700'),
(1, 2, 'Cristina Fernández de Kirchner', 2, '#0066CC'),
(1, 3, 'Mauricio Macri', 3, '#FFCC00'),
(1, NULL, 'Voto en Blanco', 4, '#CCCCCC'),
(1, NULL, 'Indeciso', 5, '#999999');

-- Inicializar estadísticas de candidatos
INSERT INTO candidate_stats (candidate_id, total_ratings, avg_overall, approval_rating)
SELECT id, 0, 0.00, 0.00 FROM political_candidates;

-- ============================================
-- TRIGGERS PARA ACTUALIZAR ESTADÍSTICAS
-- ============================================

DELIMITER //

-- Trigger para actualizar votos en poll_options
CREATE TRIGGER after_poll_vote_insert
AFTER INSERT ON poll_votes
FOR EACH ROW
BEGIN
  -- Actualizar votos en la opción
  UPDATE poll_options 
  SET votes = votes + 1
  WHERE id = NEW.option_id;
  
  -- Actualizar total de votos en la encuesta
  UPDATE political_polls
  SET total_votes = total_votes + 1
  WHERE id = NEW.poll_id;
  
  -- Recalcular porcentajes
  UPDATE poll_options po
  JOIN political_polls pp ON po.poll_id = pp.id
  SET po.percentage = (po.votes * 100.0 / GREATEST(pp.total_votes, 1))
  WHERE po.poll_id = NEW.poll_id;
END//

-- Trigger para actualizar estadísticas de candidatos
CREATE TRIGGER after_candidate_rating_insert
AFTER INSERT ON candidate_ratings
FOR EACH ROW
BEGIN
  UPDATE candidate_stats
  SET 
    total_ratings = total_ratings + 1,
    avg_leadership = (SELECT AVG(rating) FROM candidate_ratings WHERE candidate_id = NEW.candidate_id AND category = 'leadership'),
    avg_proposals = (SELECT AVG(rating) FROM candidate_ratings WHERE candidate_id = NEW.candidate_id AND category = 'proposals'),
    avg_honesty = (SELECT AVG(rating) FROM candidate_ratings WHERE candidate_id = NEW.candidate_id AND category = 'honesty'),
    avg_experience = (SELECT AVG(rating) FROM candidate_ratings WHERE candidate_id = NEW.candidate_id AND category = 'experience'),
    avg_communication = (SELECT AVG(rating) FROM candidate_ratings WHERE candidate_id = NEW.candidate_id AND category = 'communication'),
    avg_overall = (SELECT AVG(rating) FROM candidate_ratings WHERE candidate_id = NEW.candidate_id AND category = 'overall')
  WHERE candidate_id = NEW.candidate_id;
END//

DELIMITER ;

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista de encuestas activas con resultados
CREATE OR REPLACE VIEW active_polls_with_results AS
SELECT 
  pp.id,
  pp.title,
  pp.description,
  pp.question,
  pp.poll_type,
  pp.total_votes,
  pp.start_date,
  pp.end_date,
  COUNT(po.id) as total_options,
  MAX(po.votes) as max_votes
FROM political_polls pp
LEFT JOIN poll_options po ON pp.id = po.poll_id
WHERE pp.status = 'active'
GROUP BY pp.id;

-- Vista de candidatos con estadísticas
CREATE OR REPLACE VIEW candidates_with_stats AS
SELECT 
  pc.*,
  cs.total_ratings,
  cs.avg_overall,
  cs.avg_leadership,
  cs.avg_proposals,
  cs.avg_honesty,
  cs.avg_experience,
  cs.avg_communication,
  cs.approval_rating,
  COUNT(DISTINCT pr.id) as total_campaigns
FROM political_candidates pc
LEFT JOIN candidate_stats cs ON pc.id = cs.candidate_id
LEFT JOIN political_campaigns pr ON pc.id = pr.candidate_id
GROUP BY pc.id;

-- ============================================
-- ÍNDICES ADICIONALES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_poll_votes_created ON poll_votes(voted_at DESC);
CREATE INDEX idx_candidate_ratings_created ON candidate_ratings(created_at DESC);
CREATE INDEX idx_campaigns_dates ON political_campaigns(start_date, end_date);
CREATE INDEX idx_election_results_date ON election_results(election_date DESC);

