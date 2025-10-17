-- ============================================
-- PBN & SEO TRACKING SCHEMA
-- ============================================

-- PBN Domains Management
CREATE TABLE IF NOT EXISTS pbn_domains (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL UNIQUE,
  tier INT NOT NULL CHECK (tier IN (1, 2, 3)),
  da INT, -- Domain Authority (Moz)
  dr INT, -- Domain Rating (Ahrefs)
  hosting_provider VARCHAR(100),
  ip_address INET,
  nameserver VARCHAR(255),
  registrar VARCHAR(100),
  wordpress_url TEXT,
  wordpress_username VARCHAR(100),
  wordpress_password_hash TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'penalized', 'inactive')),
  last_published_at TIMESTAMP,
  total_articles INT DEFAULT 0,
  total_links_to_main INT DEFAULT 0,
  monthly_traffic INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pbn_domains_tier ON pbn_domains(tier);
CREATE INDEX idx_pbn_domains_status ON pbn_domains(status);

-- PBN Articles
CREATE TABLE IF NOT EXISTS pbn_articles (
  id SERIAL PRIMARY KEY,
  pbn_domain_id INT REFERENCES pbn_domains(id) ON DELETE CASCADE,
  pbn_domain VARCHAR(255) NOT NULL, -- Denormalized for speed
  article_title TEXT NOT NULL,
  article_slug VARCHAR(255),
  article_url TEXT,
  word_count INT,
  has_link BOOLEAN DEFAULT FALSE,
  anchor_text VARCHAR(255),
  link_url TEXT,
  published_at TIMESTAMP DEFAULT NOW(),
  tier INT,
  flesch_score FLOAT,
  keyword_density FLOAT,
  ai_model VARCHAR(50), -- llama3.1:8b, mistral:7b, etc.
  generation_time_ms INT,
  indexed_by_google BOOLEAN DEFAULT FALSE,
  google_indexed_at TIMESTAMP,
  organic_traffic INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pbn_articles_domain ON pbn_articles(pbn_domain_id);
CREATE INDEX idx_pbn_articles_published ON pbn_articles(published_at DESC);
CREATE INDEX idx_pbn_articles_has_link ON pbn_articles(has_link) WHERE has_link = TRUE;
CREATE INDEX idx_pbn_articles_indexed ON pbn_articles(indexed_by_google);

-- Backlink Tracking
CREATE TABLE IF NOT EXISTS backlinks (
  id SERIAL PRIMARY KEY,
  source_domain VARCHAR(255) NOT NULL, -- Where the link is from
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL, -- Main site URL
  anchor_text VARCHAR(255),
  link_type VARCHAR(20) CHECK (link_type IN ('dofollow', 'nofollow', 'ugc', 'sponsored')),
  is_pbn BOOLEAN DEFAULT FALSE,
  da INT, -- Domain Authority of source
  dr INT, -- Domain Rating of source
  first_seen_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'live' CHECK (status IN ('live', 'removed', 'nofollowed', 'redirected')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_backlinks_source ON backlinks(source_domain);
CREATE INDEX idx_backlinks_target ON backlinks(target_url);
CREATE INDEX idx_backlinks_pbn ON backlinks(is_pbn);
CREATE INDEX idx_backlinks_status ON backlinks(status);
CREATE UNIQUE INDEX idx_backlinks_unique ON backlinks(source_url, target_url, anchor_text);

-- Keyword Rankings
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id SERIAL PRIMARY KEY,
  keyword TEXT NOT NULL,
  url TEXT NOT NULL,
  search_engine VARCHAR(50) DEFAULT 'google' CHECK (search_engine IN ('google', 'bing', 'yahoo', 'duckduckgo')),
  location VARCHAR(10) DEFAULT 'AR', -- Country code
  device VARCHAR(10) DEFAULT 'desktop' CHECK (device IN ('desktop', 'mobile')),
  position INT,
  search_volume INT,
  difficulty INT, -- 0-100
  cpc DECIMAL(10, 2), -- Cost per click
  url_ranking TEXT, -- Which URL is ranking
  featured_snippet BOOLEAN DEFAULT FALSE,
  checked_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rankings_keyword ON keyword_rankings(keyword);
CREATE INDEX idx_rankings_checked ON keyword_rankings(checked_at DESC);
CREATE INDEX idx_rankings_position ON keyword_rankings(position) WHERE position <= 100;

-- SEO Metrics History
CREATE TABLE IF NOT EXISTS seo_metrics (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  da INT, -- Domain Authority
  dr INT, -- Domain Rating
  total_backlinks BIGINT,
  referring_domains INT,
  organic_traffic INT,
  organic_keywords INT,
  google_index_pages INT,
  core_web_vitals_lcp FLOAT, -- Largest Contentful Paint
  core_web_vitals_fid FLOAT, -- First Input Delay
  core_web_vitals_cls FLOAT, -- Cumulative Layout Shift
  mobile_speed_score INT, -- 0-100
  desktop_speed_score INT, -- 0-100
  checked_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_seo_metrics_domain ON seo_metrics(domain);
CREATE INDEX idx_seo_metrics_checked ON seo_metrics(checked_at DESC);

-- Link Velocity Tracking
CREATE TABLE IF NOT EXISTS link_velocity (
  id SERIAL PRIMARY KEY,
  target_domain VARCHAR(255) NOT NULL,
  period VARCHAR(20) CHECK (period IN ('daily', 'weekly', 'monthly')),
  new_links INT DEFAULT 0,
  lost_links INT DEFAULT 0,
  net_links INT DEFAULT 0, -- new_links - lost_links
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_link_velocity_domain ON link_velocity(target_domain);
CREATE INDEX idx_link_velocity_date ON link_velocity(date DESC);
CREATE UNIQUE INDEX idx_link_velocity_unique ON link_velocity(target_domain, period, date);

-- Content Performance
CREATE TABLE IF NOT EXISTS content_performance (
  id SERIAL PRIMARY KEY,
  article_url TEXT NOT NULL,
  article_title TEXT,
  publish_date DATE,
  organic_traffic INT DEFAULT 0,
  avg_position FLOAT,
  impressions BIGINT DEFAULT 0,
  clicks INT DEFAULT 0,
  ctr FLOAT, -- Click-through rate
  backlinks INT DEFAULT 0,
  social_shares INT DEFAULT 0,
  avg_time_on_page INT, -- Seconds
  bounce_rate FLOAT,
  conversions INT DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,
  checked_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_content_url ON content_performance(article_url);
CREATE INDEX idx_content_checked ON content_performance(checked_at DESC);
CREATE INDEX idx_content_traffic ON content_performance(organic_traffic DESC);

-- Anchor Text Distribution
CREATE TABLE IF NOT EXISTS anchor_text_distribution (
  id SERIAL PRIMARY KEY,
  anchor_text VARCHAR(255) NOT NULL,
  category VARCHAR(50) CHECK (category IN ('branded', 'naked_url', 'generic', 'exact_match', 'partial_match')),
  count INT DEFAULT 1,
  percentage FLOAT,
  last_used_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(anchor_text)
);

CREATE INDEX idx_anchor_category ON anchor_text_distribution(category);
CREATE INDEX idx_anchor_count ON anchor_text_distribution(count DESC);

-- Google Search Console Data
CREATE TABLE IF NOT EXISTS gsc_data (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  page TEXT NOT NULL,
  country VARCHAR(10),
  device VARCHAR(10) CHECK (device IN ('desktop', 'mobile', 'tablet')),
  impressions BIGINT DEFAULT 0,
  clicks INT DEFAULT 0,
  ctr FLOAT,
  position FLOAT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gsc_query ON gsc_data(query);
CREATE INDEX idx_gsc_page ON gsc_data(page);
CREATE INDEX idx_gsc_date ON gsc_data(date DESC);
CREATE INDEX idx_gsc_clicks ON gsc_data(clicks DESC);
CREATE UNIQUE INDEX idx_gsc_unique ON gsc_data(query, page, country, device, date);

-- Competitor Analysis
CREATE TABLE IF NOT EXISTS competitors (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  da INT,
  dr INT,
  total_backlinks BIGINT,
  referring_domains INT,
  organic_traffic INT,
  organic_keywords INT,
  top_keywords TEXT[], -- Array of top ranking keywords
  last_analyzed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_competitors_da ON competitors(da DESC);
CREATE INDEX idx_competitors_traffic ON competitors(organic_traffic DESC);

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- PBN Performance Summary
CREATE OR REPLACE VIEW pbn_performance_summary AS
SELECT
  pd.domain,
  pd.tier,
  pd.da,
  pd.dr,
  pd.total_articles,
  pd.total_links_to_main,
  pd.monthly_traffic,
  COUNT(pa.id) AS articles_last_30_days,
  SUM(CASE WHEN pa.has_link THEN 1 ELSE 0 END) AS links_last_30_days,
  AVG(pa.word_count) AS avg_word_count,
  AVG(pa.flesch_score) AS avg_readability
FROM pbn_domains pd
LEFT JOIN pbn_articles pa ON pd.id = pa.pbn_domain_id
  AND pa.published_at >= NOW() - INTERVAL '30 days'
GROUP BY pd.id, pd.domain, pd.tier, pd.da, pd.dr, pd.total_articles, pd.total_links_to_main, pd.monthly_traffic;

-- Keyword Performance
CREATE OR REPLACE VIEW keyword_performance_summary AS
SELECT
  keyword,
  location,
  device,
  MIN(position) AS best_position,
  AVG(position) AS avg_position,
  search_volume,
  difficulty,
  COUNT(*) AS check_count,
  MAX(checked_at) AS last_checked
FROM keyword_rankings
WHERE position <= 100
GROUP BY keyword, location, device, search_volume, difficulty;

-- Link Building Progress
CREATE OR REPLACE VIEW link_building_progress AS
SELECT
  DATE(first_seen_at) AS date,
  COUNT(*) AS new_links,
  SUM(CASE WHEN is_pbn THEN 1 ELSE 0 END) AS pbn_links,
  SUM(CASE WHEN NOT is_pbn THEN 1 ELSE 0 END) AS external_links,
  AVG(da) AS avg_da,
  AVG(dr) AS avg_dr
FROM backlinks
WHERE first_seen_at >= NOW() - INTERVAL '90 days'
GROUP BY DATE(first_seen_at)
ORDER BY date DESC;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Calculate anchor text distribution
CREATE OR REPLACE FUNCTION update_anchor_text_distribution()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO anchor_text_distribution (anchor_text, category, count, percentage, last_used_at)
  VALUES (NEW.anchor_text,
          CASE
            WHEN NEW.anchor_text ILIKE '%POLÍTICA ARGENTINA%' OR NEW.anchor_text ILIKE '%politica-argentina.com%' THEN 'branded'
            WHEN NEW.anchor_text ~ '^https?://' THEN 'naked_url'
            WHEN NEW.anchor_text IN ('este artículo', 'fuente', 'más información', 'leer más') THEN 'generic'
            WHEN NEW.anchor_text IN ('noticias argentina', 'política argentina hoy') THEN 'exact_match'
            ELSE 'partial_match'
          END,
          1,
          0,
          NOW())
  ON CONFLICT (anchor_text)
  DO UPDATE SET
    count = anchor_text_distribution.count + 1,
    last_used_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_anchor_distribution
AFTER INSERT ON pbn_articles
FOR EACH ROW
WHEN (NEW.has_link = TRUE AND NEW.anchor_text IS NOT NULL)
EXECUTE FUNCTION update_anchor_text_distribution();

-- Update PBN domain stats
CREATE OR REPLACE FUNCTION update_pbn_domain_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE pbn_domains SET
    total_articles = total_articles + 1,
    total_links_to_main = CASE WHEN NEW.has_link THEN total_links_to_main + 1 ELSE total_links_to_main END,
    last_published_at = NEW.published_at,
    updated_at = NOW()
  WHERE domain = NEW.pbn_domain;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_pbn_stats
AFTER INSERT ON pbn_articles
FOR EACH ROW
EXECUTE FUNCTION update_pbn_domain_stats();

-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Insert PBN domains (placeholder data)
INSERT INTO pbn_domains (domain, tier, da, dr, hosting_provider, status) VALUES
('expired-news-argentina-1.com', 1, 88, 85, 'Cloudflare', 'active'),
('political-analysis-ar.com', 1, 87, 84, 'AWS', 'active'),
('economia-argentina-news.com', 1, 86, 83, 'Google Cloud', 'active'),
('breaking-news-ba.com', 1, 85, 82, 'DigitalOcean', 'active'),
('argentina-politics-today.com', 1, 85, 82, 'Linode', 'active')
ON CONFLICT (domain) DO NOTHING;

-- Insert competitors
INSERT INTO competitors (domain, name, da, dr, organic_traffic, organic_keywords) VALUES
('infobae.com', 'Infobae', 89, 87, 25000000, 450000),
('clarin.com', 'Clarín', 88, 86, 22000000, 380000),
('lanacion.com.ar', 'La Nación', 87, 85, 18000000, 320000)
ON CONFLICT (domain) DO NOTHING;

COMMENT ON TABLE pbn_domains IS 'Tracks all PBN domains in the network';
COMMENT ON TABLE pbn_articles IS 'All articles published across PBN network';
COMMENT ON TABLE backlinks IS 'Comprehensive backlink profile tracking';
COMMENT ON TABLE keyword_rankings IS 'Daily keyword position tracking';
COMMENT ON TABLE seo_metrics IS 'Historical SEO metrics and Core Web Vitals';
