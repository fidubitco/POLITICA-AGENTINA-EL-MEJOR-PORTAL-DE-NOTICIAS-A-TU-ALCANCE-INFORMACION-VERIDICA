module.exports = {
  apps: [{
    name: 'politica-argentina-optimized',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Database
      DB_HOST: 'localhost',
      DB_PORT: '3306',
      DB_USER: 'politica_user',
      DB_PASSWORD: 'secure_password_123',
      DB_NAME: 'politica_argentina',
      // AI APIs
      OPENAI_API_KEY: 'sk-your-openai-key-here',
      ANTHROPIC_API_KEY: 'sk-ant-your-anthropic-key-here',
      GEMINI_API_KEY: 'your-gemini-key-here',
      // Security
      JWT_SECRET: 'your-super-secure-jwt-secret-key-here',
      // Performance
      CACHE_TTL_SECONDS: '3600',
      MAX_CONNECTIONS: '20',
      // Serverless
      SERVERLESS_OPTIMIZATION: 'true',
      COLD_START_OPTIMIZATION: 'true'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    combine_logs: true,
    max_memory_restart: '1G',
    min_uptime: '60s',
    restart_delay: 3000,
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'public'],
    source_map_support: true,
    time: true,
    // Optimizaciones adicionales
    node_args: '--max-old-space-size=1024',
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
};
