// 🚀 CONFIGURACIÓN PM2 PARA PRODUCCIÓN
// Portal de Noticias Profesional - Política Argentina

export default {
  apps: [{
    name: 'politica-argentina',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      PUBLIC_BASE_URL: 'https://politicaargentina.com',
      
      // Base de datos
      DATABASE_URL: 'postgresql://usuario:password@localhost:5432/politica_argentina',
      
      // APIs de IA
      OPENAI_API_KEY: 'sk-proj-tu_clave_openai_aqui',
      ANTHROPIC_API_KEY: 'sk-ant-tu_clave_claude_aqui',
      GOOGLE_API_KEY: 'AIzaSy_tu_clave_gemini_aqui',
      
      // Autenticación
      JWT_SECRET: 'tu_jwt_secret_super_seguro_aqui_2024',
      SESSION_SECRET: 'tu_session_secret_super_seguro_aqui_2024',
      
      // Analytics
      GOOGLE_ANALYTICS_ID: 'GA-XXXXXXXXX',
      GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXX',
      
      // SEO
      SITE_NAME: 'Política Argentina',
      SITE_DESCRIPTION: 'Portal de noticias profesional de Argentina',
      SITE_KEYWORDS: 'política argentina, noticias, economía, sociedad',
      
      // Multi-idiomas
      DEFAULT_LANGUAGE: 'es',
      SUPPORTED_LANGUAGES: 'es,en,fr,pt',
      AUTO_TRANSLATE: 'true',
      
      // Seguridad
      BCRYPT_ROUNDS: '12',
      PASSWORD_MIN_LENGTH: '8',
      SESSION_MAX_AGE: '86400000',
      
      // Monitoreo
      HEALTH_CHECK_INTERVAL: '30000',
      METRICS_ENABLED: 'true',
      LOG_LEVEL: 'info'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      PUBLIC_BASE_URL: 'https://politicaargentina.com'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=4096',
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
