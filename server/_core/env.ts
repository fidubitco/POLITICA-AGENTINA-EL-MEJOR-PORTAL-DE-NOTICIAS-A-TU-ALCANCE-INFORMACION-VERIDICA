export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  publicBaseUrl: (process.env.PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
};

// Configuración optimizada para producción
export const config = {
  // Base de datos
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'politica_argentina',
  DB_SSL: process.env.DB_SSL === 'true',
  
  // APIs de IA
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_ORG_ID: process.env.OPENAI_ORG_ID || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  
  // Seguridad
  JWT_SECRET: process.env.JWT_SECRET || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  
  // Caché
  CACHE_TTL_SECONDS: process.env.CACHE_TTL_SECONDS || '3600',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // Rendimiento
  MAX_CONNECTIONS: process.env.MAX_CONNECTIONS || '20',
  CONNECTION_TIMEOUT: process.env.CONNECTION_TIMEOUT || '60000',
  
  // Serverless
  SERVERLESS_OPTIMIZATION: process.env.SERVERLESS_OPTIMIZATION === 'true',
  COLD_START_OPTIMIZATION: process.env.COLD_START_OPTIMIZATION === 'true',
  
  // Monitoreo
  ANALYTICS_ID: process.env.ANALYTICS_ID || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: process.env.SMTP_PORT || '587',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  
  // Scraping
  SCRAPING_ENABLED: process.env.SCRAPING_ENABLED === 'true',
  SCRAPE_INTERVAL_HOURS: process.env.SCRAPE_INTERVAL_HOURS || '6',
  
  // SEO
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'es',
  SUPPORTED_LANGUAGES: process.env.SUPPORTED_LANGUAGES || 'es,en,fr,pt',
  SEO_OPTIMIZATION: process.env.SEO_OPTIMIZATION === 'true',
  
  // IA
  AI_MODEL_DEFAULT: process.env.AI_MODEL_DEFAULT || 'gemini-pro',
  AI_TRANSLATION_ENABLED: process.env.AI_TRANSLATION_ENABLED === 'true',
  AI_CONTENT_GENERATION_ENABLED: process.env.AI_CONTENT_GENERATION_ENABLED === 'true',
  AI_SEO_OPTIMIZATION_ENABLED: process.env.AI_SEO_OPTIMIZATION_ENABLED === 'true',
  
  // Automatización
  NEWS_AUTOMATION_ENABLED: process.env.NEWS_AUTOMATION_ENABLED === 'true',
  AUTO_PUBLISH_ENABLED: process.env.AUTO_PUBLISH_ENABLED === 'true',
  
  // CDN
  CDN_BASE_URL: process.env.CDN_BASE_URL || '',
  CDN_ENABLED: process.env.CDN_ENABLED === 'true',
  
  // Seguridad avanzada
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || '900000',
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || '100',
  CORS_ORIGINS: process.env.CORS_ORIGINS || 'https://politicaargentina.com,https://www.politicaargentina.com',
  HELMET_ENABLED: process.env.HELMET_ENABLED === 'true',
  COMPRESSION_ENABLED: process.env.COMPRESSION_ENABLED === 'true',
  
  // Desarrollo
  DEBUG: process.env.DEBUG === 'true',
  VERBOSE_LOGGING: process.env.VERBOSE_LOGGING === 'true',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
