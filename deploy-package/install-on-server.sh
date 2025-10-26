#!/bin/bash

# 🚀 INSTALACIÓN AUTOMATIZADA EN SERVIDOR IONOS
# Portal de Noticias Profesional - Política Argentina

echo "🚀 Instalando Portal de Noticias en IONOS..."

# 1. Actualizar sistema
echo "📦 Actualizando sistema..."
apt update && apt upgrade -y

# 2. Instalar dependencias del sistema
echo "🔧 Instalando dependencias del sistema..."
apt install -y curl wget git nginx mysql-server nodejs npm pnpm certbot python3-certbot-nginx ufw fail2ban

# 3. Configurar Node.js (versión LTS)
echo "📦 Configurando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs

# 4. Instalar pnpm globalmente
echo "📦 Instalando pnpm..."
npm install -g pnpm

# 5. Configurar MySQL
echo "🗄️ Configurando MySQL..."
systemctl start mysql
systemctl enable mysql

# Crear base de datos
mysql -e "CREATE DATABASE IF NOT EXISTS politica_argentina CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS 'politica_user'@'localhost' IDENTIFIED BY 'secure_password_123';"
mysql -e "GRANT ALL PRIVILEGES ON politica_argentina.* TO 'politica_user'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# 6. Configurar Nginx
echo "🌐 Configurando Nginx..."
cp nginx.conf /etc/nginx/sites-available/politicaargentina.com
ln -sf /etc/nginx/sites-available/politicaargentina.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Probar configuración de Nginx
nginx -t
if [ $? -eq 0 ]; then
    systemctl reload nginx
    echo "✅ Nginx configurado correctamente"
else
    echo "❌ Error en configuración de Nginx"
    exit 1
fi

# 7. Configurar SSL con Let's Encrypt
echo "🔒 Configurando SSL..."
certbot --nginx -d politicaargentina.com -d www.politicaargentina.com --non-interactive --agree-tos --email admin@politicaargentina.com

# 8. Configurar firewall
echo "🛡️ Configurando firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

# 9. Configurar fail2ban
echo "🛡️ Configurando fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# 10. Crear directorio de la aplicación
echo "📁 Creando directorio de la aplicación..."
mkdir -p /var/www/politicaargentina.com/html
chown -R www-data:www-data /var/www/politicaargentina.com/html

# 11. Instalar dependencias del proyecto
echo "📦 Instalando dependencias del proyecto..."
cd /var/www/politicaargentina.com/html
pnpm install --frozen-lockfile

# 12. Construir aplicación
echo "🏗️ Construyendo aplicación..."
pnpm build

# 13. Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
cat > .env.production << 'ENVEOF'
NODE_ENV=production
PORT=3000
PUBLIC_BASE_URL=https://politicaargentina.com/

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=politica_user
DB_PASSWORD=secure_password_123
DB_NAME=politica_argentina
DB_SSL=false

# APIs de IA (configurar con claves reales)
OPENAI_API_KEY=sk-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
GEMINI_API_KEY=your-gemini-key-here

# Seguridad
JWT_SECRET=your-super-secure-jwt-secret-key-here
SESSION_SECRET=your-super-secure-session-secret-key-here

# Caché
CACHE_TTL_SECONDS=3600
REDIS_URL=redis://localhost:6379

# Rendimiento
MAX_CONNECTIONS=20
CONNECTION_TIMEOUT=60000

# Serverless
SERVERLESS_OPTIMIZATION=true
COLD_START_OPTIMIZATION=true

# Monitoreo
ANALYTICS_ID=UA-XXXXX-Y
LOG_LEVEL=info

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@politicaargentina.com
ADMIN_EMAIL=admin@politicaargentina.com

# Scraping
SCRAPING_ENABLED=true
SCRAPE_INTERVAL_HOURS=6

# SEO
DEFAULT_LANGUAGE=es
SUPPORTED_LANGUAGES=es,en,fr,pt
SEO_OPTIMIZATION=true

# IA
AI_MODEL_DEFAULT=gemini-pro
AI_TRANSLATION_ENABLED=true
AI_CONTENT_GENERATION_ENABLED=true
AI_SEO_OPTIMIZATION_ENABLED=true

# Automatización
NEWS_AUTOMATION_ENABLED=true
AUTO_PUBLISH_ENABLED=false

# CDN
CDN_BASE_URL=https://cdn.politicaargentina.com/
CDN_ENABLED=true

# Seguridad avanzada
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGINS=https://politicaargentina.com,https://www.politicaargentina.com
HELMET_ENABLED=true
COMPRESSION_ENABLED=true
ENVEOF

# 14. Configurar PM2
echo "⚡ Configurando PM2..."
npm install -g pm2
cp ecosystem.config.js /var/www/politicaargentina.com/html/
cd /var/www/politicaargentina.com/html
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 15. Configurar auto-inicio
echo "🔄 Configurando auto-inicio..."
systemctl enable nginx
systemctl enable mysql

# 16. Crear script de monitoreo
echo "📊 Creando script de monitoreo..."
cat > /usr/local/bin/monitor-politica.sh << 'MONEOF'
#!/bin/bash
# Script de monitoreo para Portal de Noticias

echo "🔍 Monitoreando Portal de Noticias..."

# Verificar estado de servicios
echo "📊 Estado de servicios:"
systemctl status nginx --no-pager -l
systemctl status mysql --no-pager -l
pm2 status

# Verificar uso de recursos
echo "💾 Uso de recursos:"
df -h
free -h
top -bn1 | head -20

# Verificar logs
echo "📝 Últimas entradas de log:"
tail -n 20 /var/log/nginx/access.log
tail -n 20 /var/log/nginx/error.log
pm2 logs --lines 20

echo "✅ Monitoreo completado"
MONEOF

chmod +x /usr/local/bin/monitor-politica.sh

# 17. Configurar backup automático
echo "💾 Configurando backup automático..."
cat > /etc/cron.daily/politica-backup << 'BACKEOF'
#!/bin/bash
# Backup diario del Portal de Noticias

BACKUP_DIR="/var/backups/politicaargentina"
DATE=20251024_141434

mkdir -p 

# Backup de base de datos
mysqldump -u politica_user -psecure_password_123 politica_argentina > /db_.sql

# Backup de archivos
tar -czf /files_.tar.gz /var/www/politicaargentina.com/html

# Limpiar backups antiguos (mantener 7 días)
find  -name "*.sql" -mtime +7 -delete
find  -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup completado: "
BACKEOF

chmod +x /etc/cron.daily/politica-backup

echo "🎉 ¡Instalación completada exitosamente!"
echo "🌐 Portal disponible en: https://politicaargentina.com"
echo "📊 Monitoreo: /usr/local/bin/monitor-politica.sh"
echo "💾 Backup automático configurado"
