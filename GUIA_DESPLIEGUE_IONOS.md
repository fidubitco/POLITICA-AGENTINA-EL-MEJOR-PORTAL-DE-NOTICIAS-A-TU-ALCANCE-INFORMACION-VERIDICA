# 🌐 GUÍA COMPLETA DE DESPLIEGUE EN IONOS
## Portal de Noticias Política Argentina - Sistema Optimizado

---

## 🔐 **INFORMACIÓN DE ACCESO (PROTEGIDA)**

### **Servidor IONOS:**
- **Host:** `access-5018802339.webspace-host.com`
- **Puerto:** `22`
- **Protocolo:** `SFTP + SSH`
- **Usuario:** `a1547741`
- **Contraseña:** `@Bitexchangers2025.`

### **⚠️ SEGURIDAD CRÍTICA:**
- **NUNCA** expongas estas credenciales en código público
- **NUNCA** las incluyas en repositorios Git
- **SIEMPRE** usa variables de entorno para credenciales
- **SIEMPRE** cambia las contraseñas después del despliegue

---

## 🚀 **PASO 1: PREPARACIÓN DEL SERVIDOR**

### **1.1 Conectar al servidor:**
```bash
ssh a1547741@access-5018802339.webspace-host.com
```

### **1.2 Actualizar el sistema:**
```bash
sudo apt update && sudo apt upgrade -y
```

### **1.3 Instalar dependencias necesarias:**
```bash
# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# pnpm
npm install -g pnpm

# Nginx
sudo apt install nginx -y

# PM2
npm install -g pm2

# Certbot para SSL
sudo apt install certbot python3-certbot-nginx -y

# Git
sudo apt install git -y

# Unzip
sudo apt install unzip -y
```

---

## 🚀 **PASO 2: CONFIGURACIÓN DEL PROYECTO**

### **2.1 Crear directorio del proyecto:**
```bash
sudo mkdir -p /var/www/politicaargentina.com
sudo chown -R a1547741:a1547741 /var/www/politicaargentina.com
cd /var/www/politicaargentina.com
```

### **2.2 Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/politica-argentina.git .
```

### **2.3 Instalar dependencias:**
```bash
pnpm install
```

### **2.4 Construir la aplicación:**
```bash
pnpm build
```

---

## 🔐 **PASO 3: CONFIGURACIÓN DE VARIABLES DE ENTORNO**

### **3.1 Crear archivo de entorno:**
```bash
nano .env.production
```

### **3.2 Contenido del archivo .env.production:**
```env
# ===========================================
# CONFIGURACIÓN DE PRODUCCIÓN - IONOS
# ===========================================

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_db
DB_PASSWORD=tu_password_db
DB_NAME=politica_argentina
DB_SSL=false

# Aplicación
NODE_ENV=production
PORT=3000
PUBLIC_BASE_URL=https://politicaargentina.com/

# JWT
JWT_SECRET=tu_jwt_secret_super_seguro_aqui

# APIs de IA (configurar con tus claves reales)
OPENAI_API_KEY=sk-tu_clave_openai_aqui
ANTHROPIC_API_KEY=tu_clave_claude_aqui
GEMINI_API_KEY=tu_clave_gemini_aqui

# Analytics
ANALYTICS_ID=UA-XXXXX-Y

# Email
CONTACT_EMAIL=info@politicaargentina.com
ADMIN_EMAIL=admin@politicaargentina.com

# Idiomas
DEFAULT_LANGUAGE=es
SUPPORTED_LANGUAGES=es,en,fr,pt

# IA
AI_MODEL_DEFAULT=gemini-pro
AI_TRANSLATION_ENABLED=true
AI_CONTENT_GENERATION_ENABLED=true
AI_SEO_OPTIMIZATION_ENABLED=true

# Automatización
NEWS_AUTOMATION_ENABLED=true
NEWS_SCRAPE_INTERVAL_HOURS=6

# Cache
CACHE_TTL_SECONDS=3600
REDIS_URL=redis://localhost:6379

# CDN
CDN_BASE_URL=https://cdn.politicaargentina.com/

# CORS
CORS_ORIGINS=https://politicaargentina.com,https://www.politicaargentina.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🚀 **PASO 4: CONFIGURACIÓN DE NGINX**

### **4.1 Crear configuración de Nginx:**
```bash
sudo nano /etc/nginx/sites-available/politicaargentina.com
```

### **4.2 Contenido de la configuración:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name politicaargentina.com www.politicaargentina.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name politicaargentina.com www.politicaargentina.com;

    # Configuración SSL (se generará con certbot)
    ssl_certificate /etc/letsencrypt/live/politicaargentina.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/politicaargentina.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/politicaargentina.com/chain.pem;

    # Configuración de seguridad SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:!RC4:!aNULL:!eNULL:!EXP:!MD5:!PSK:!SRP:!DSS';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # Headers de seguridad
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "no-referrer-when-downgrade";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

    # Root del proyecto
    root /var/www/politicaargentina.com/dist/public;
    index index.html index.htm;

    # Servir archivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API del backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optimizaciones
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
}
```

### **4.3 Activar el sitio:**
```bash
sudo ln -s /etc/nginx/sites-available/politicaargentina.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🚀 **PASO 5: CONFIGURACIÓN DE PM2**

### **5.1 Crear configuración de PM2:**
```bash
nano ecosystem.config.js
```

### **5.2 Contenido de ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'politica-argentina',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
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
    time: true
  }]
};
```

### **5.3 Crear directorio de logs:**
```bash
mkdir -p logs
```

---

## 🔐 **PASO 6: CONFIGURACIÓN DE SSL**

### **6.1 Obtener certificado SSL:**
```bash
sudo certbot --nginx -d politicaargentina.com -d www.politicaargentina.com --non-interactive --agree-tos --email tu_email@example.com
```

### **6.2 Configurar renovación automática:**
```bash
sudo certbot renew --dry-run
```

---

## 🚀 **PASO 7: INICIAR LA APLICACIÓN**

### **7.1 Iniciar con PM2:**
```bash
pm2 start ecosystem.config.js
```

### **7.2 Guardar configuración de PM2:**
```bash
pm2 save
pm2 startup
```

### **7.3 Verificar estado:**
```bash
pm2 status
pm2 logs
```

---

## 🚀 **PASO 8: CONFIGURACIÓN DE BASE DE DATOS**

### **8.1 Instalar MySQL:**
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

### **8.2 Crear base de datos:**
```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE politica_argentina;
CREATE USER 'politica_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON politica_argentina.* TO 'politica_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **8.3 Ejecutar migraciones:**
```bash
pnpm db:push
```

---

## 🚀 **PASO 9: CONFIGURACIÓN DE DNS EN IONOS**

### **9.1 Acceder al panel de IONOS:**
1. Ir a https://www.ionos.com
2. Iniciar sesión con tu cuenta
3. Ir a "Dominios" → "politicaargentina.com"
4. Ir a "DNS"

### **9.2 Configurar registros DNS:**
```
Tipo: A
Nombre: @
Valor: IP_DEL_SERVIDOR_IONOS
TTL: 3600

Tipo: A
Nombre: www
Valor: IP_DEL_SERVIDOR_IONOS
TTL: 3600

Tipo: CNAME
Nombre: cdn
Valor: cdn.politicaargentina.com
TTL: 3600
```

---

## 🚀 **PASO 10: VERIFICACIÓN Y MONITOREO**

### **10.1 Verificar que todo funciona:**
```bash
# Verificar Nginx
sudo systemctl status nginx

# Verificar PM2
pm2 status

# Verificar SSL
curl -I https://politicaargentina.com

# Verificar logs
pm2 logs --lines 50
```

### **10.2 Configurar monitoreo:**
```bash
# Instalar herramientas de monitoreo
npm install -g pm2-logrotate

# Configurar rotación de logs
pm2 install pm2-logrotate
```

---

## 🔐 **PASO 11: SEGURIDAD ADICIONAL**

### **11.1 Configurar firewall:**
```bash
sudo ufw enable
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw deny 3000
```

### **11.2 Configurar backup automático:**
```bash
# Crear script de backup
nano backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/politicaargentina"
mkdir -p $BACKUP_DIR

# Backup de base de datos
mysqldump -u politica_user -p politica_argentina > $BACKUP_DIR/db_$DATE.sql

# Backup de archivos
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/politicaargentina.com

# Limpiar backups antiguos (más de 7 días)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

```bash
chmod +x backup.sh

# Agregar a crontab
crontab -e
# Agregar: 0 2 * * * /var/www/politicaargentina.com/backup.sh
```

---

## 🚀 **PASO 12: OPTIMIZACIONES FINALES**

### **12.1 Optimizar Nginx:**
```bash
sudo nano /etc/nginx/nginx.conf
```

```nginx
# Agregar al bloque http:
client_max_body_size 50M;
client_body_timeout 60s;
client_header_timeout 60s;
keepalive_timeout 65s;
send_timeout 60s;
```

### **12.2 Optimizar MySQL:**
```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

```ini
[mysqld]
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
query_cache_size = 32M
query_cache_type = 1
max_connections = 100
```

---

## 🎯 **COMANDOS DE VERIFICACIÓN**

### **Verificar que todo funciona:**
```bash
# Estado del servidor
sudo systemctl status nginx
pm2 status

# Verificar SSL
curl -I https://politicaargentina.com

# Verificar API
curl https://politicaargentina.com/api/health

# Verificar logs
pm2 logs --lines 100
```

---

## 🚨 **TROUBLESHOOTING**

### **Problemas comunes:**

1. **Error 502 Bad Gateway:**
   ```bash
   pm2 restart politica-argentina
   sudo systemctl restart nginx
   ```

2. **SSL no funciona:**
   ```bash
   sudo certbot renew --force-renewal
   sudo systemctl restart nginx
   ```

3. **Base de datos no conecta:**
   ```bash
   sudo systemctl restart mysql
   pm2 restart politica-argentina
   ```

---

## 🎉 **¡DESPLIEGUE COMPLETADO!**

Tu portal de noticias estará disponible en:
- **🌐 https://politicaargentina.com**
- **🌐 https://www.politicaargentina.com**

### **Características implementadas:**
- ✅ SEO extremo optimizado
- ✅ Automatización inteligente de noticias
- ✅ Análisis de portales competidores
- ✅ Sistema de optimización completa
- ✅ SSL automático
- ✅ Monitoreo y backup
- ✅ Seguridad avanzada

---

## 📞 **SOPORTE**

Si necesitas ayuda con el despliegue:
1. Revisa los logs: `pm2 logs`
2. Verifica el estado: `pm2 status`
3. Revisa Nginx: `sudo nginx -t`
4. Verifica SSL: `sudo certbot certificates`

**¡Tu portal de noticias está listo para conquistar Argentina! 🇦🇷*erew install ghir