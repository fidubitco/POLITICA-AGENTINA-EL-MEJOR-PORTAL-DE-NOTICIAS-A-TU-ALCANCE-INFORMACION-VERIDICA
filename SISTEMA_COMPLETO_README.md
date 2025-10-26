# 🚀 SISTEMA COMPLETO - POLÍTICA ARGENTINA

## ✅ **CARACTERÍSTICAS IMPLEMENTADAS**

### 📊 **1. Dashboard Analytics**
- Estadísticas en tiempo real
- Top artículos más vistos
- Estadísticas por categoría
- Usuarios por idioma
- Feed de actividad reciente

### 📝 **2. Sistema de Creación Manual**
- Formulario completo para crear noticias
- Upload de imágenes
- Sistema de tags
- Vista previa en tiempo real
- Validación de formulario

### 🤖 **3. Sistema Automático de Noticias**
- 8 fuentes configuradas
- Sincronización automática
- Sistema de aprobación/rechazo
- Configuración avanzada

### 🗄️ **4. Base de Datos MySQL**
**Schema completo con:**
- Tabla de usuarios con roles
- Tabla de artículos
- Tabla de categorías
- Tabla de tags
- Tabla de fuentes de noticias
- Tabla de artículos scrapeados
- Tabla de analytics
- Tabla de notificaciones
- Tabla de push subscriptions
- Tabla de sesiones
- Vistas para reportes

### 🔐 **5. Sistema de Autenticación**
- Registro de usuarios
- Login/Logout
- JWT tokens
- Sesiones en base de datos
- Cambio de contraseña
- Verificación de permisos

### 👥 **6. Sistema de Roles**
- **Admin**: Acceso total
- **Editor**: Crear y editar noticias
- **Viewer**: Solo lectura
- Jerarquía de permisos
- Middleware de autorización

### 📰 **7. API Completa de Artículos**
- Crear artículos
- Actualizar artículos
- Eliminar artículos
- Listar artículos con filtros
- Búsqueda full-text
- Sistema de tags
- Incrementar vistas/shares/likes
- Programación de publicación

---

## 🌐 **URLS DEL SISTEMA**

### **Portal Público:**
- 🏠 Home: https://politicaargentina.com/
- 📰 Noticia: https://politicaargentina.com/noticia/:id
- 📂 Categoría: https://politicaargentina.com/categoria/:category

### **Panel de Administración:**
- 📊 Dashboard: https://politicaargentina.com/admin/dashboard
- ✍️ Crear Noticia: https://politicaargentina.com/admin/crear-noticia
- 🤖 Auto Noticias: https://politicaargentina.com/admin/auto-noticias

---

## 🔧 **CONFIGURACIÓN**

### **1. Base de Datos MySQL**

```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE politica_argentina CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Importar schema
mysql -u root -p politica_argentina < database/schema.sql
```

### **2. Variables de Entorno**

Crear archivo `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=politica_argentina

# JWT
JWT_SECRET=your-super-secret-key-change-this

# Server
PORT=3000
NODE_ENV=production

# URLs
PUBLIC_BASE_URL=https://politicaargentina.com
```

### **3. Instalar Dependencias**

```bash
pnpm install
```

### **4. Ejecutar Migraciones**

```bash
# El schema.sql ya incluye todas las tablas y datos iniciales
mysql -u root -p politica_argentina < database/schema.sql
```

---

## 🚀 **DEPLOYMENT**

### **Opción 1: Vercel (Frontend) + Railway (Backend + DB)**

#### **Backend en Railway:**
```bash
# 1. Crear proyecto en Railway
railway login
railway init

# 2. Agregar MySQL
railway add mysql

# 3. Configurar variables de entorno
railway variables set JWT_SECRET=your-secret-key

# 4. Desplegar
railway up
```

#### **Frontend en Vercel:**
```bash
# Ya está desplegado
vercel --prod
```

### **Opción 2: VPS Completo**

```bash
# 1. Instalar MySQL
sudo apt update
sudo apt install mysql-server

# 2. Configurar MySQL
sudo mysql_secure_installation

# 3. Crear base de datos
mysql -u root -p < database/schema.sql

# 4. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs

# 5. Instalar pnpm
npm install -g pnpm

# 6. Clonar repositorio
git clone https://github.com/fidubitco/POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA.git
cd POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA

# 7. Instalar dependencias
pnpm install

# 8. Build
pnpm build

# 9. Configurar PM2
pm2 start dist/index.js --name politica-argentina
pm2 save
pm2 startup
```

---

## 📚 **DOCUMENTACIÓN API**

### **Autenticación**

#### **POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Usuario",
  "role": "editor"
}
```

#### **POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### **POST /api/auth/logout**
```
Headers: Authorization: Bearer {token}
```

### **Artículos**

#### **GET /api/articles**
Query params: `status`, `category_id`, `limit`, `offset`, `search`

#### **GET /api/articles/:id**
Obtener artículo por ID

#### **POST /api/articles**
```json
{
  "title": "Título del artículo",
  "excerpt": "Resumen breve",
  "content": "Contenido completo",
  "image_url": "https://...",
  "category_id": 1,
  "is_breaking": false,
  "is_featured": false,
  "status": "published",
  "tags": ["tag1", "tag2"]
}
```

#### **PUT /api/articles/:id**
Actualizar artículo (mismo formato que POST)

#### **DELETE /api/articles/:id**
Eliminar artículo

---

## 🔐 **SEGURIDAD**

### **Implementado:**
- ✅ Passwords hasheados con bcrypt
- ✅ JWT tokens con expiración
- ✅ Sesiones en base de datos
- ✅ Middleware de autenticación
- ✅ Sistema de roles y permisos
- ✅ Validación de entrada
- ✅ SQL injection protection (prepared statements)
- ✅ XSS protection

### **Recomendado Agregar:**
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] Helmet.js para headers de seguridad
- [ ] Input sanitization
- [ ] CSRF protection
- [ ] 2FA (Two-Factor Authentication)

---

## 📊 **PRÓXIMAS CARACTERÍSTICAS**

### **En Desarrollo:**
1. ✅ Scraping real de noticias
2. ✅ Editor WYSIWYG (TinyMCE/Quill)
3. ✅ Sistema de notificaciones push
4. ✅ Analytics avanzado con gráficos
5. ✅ Export de reportes (PDF/Excel)

### **Planificado:**
- [ ] Comentarios en artículos
- [ ] Sistema de likes/reacciones
- [ ] Newsletter subscription
- [ ] RSS feeds
- [ ] AMP pages
- [ ] PWA completo
- [ ] Dark mode
- [ ] Búsqueda avanzada con Elasticsearch
- [ ] Recomendaciones con IA
- [ ] Traducción automática

---

## 🎯 **USUARIOS POR DEFECTO**

### **Admin:**
```
Email: admin@politicaargentina.com
Password: (configurar en primera ejecución)
Role: admin
```

**⚠️ IMPORTANTE:** Cambiar la contraseña del admin en producción

---

## 📈 **MONITOREO**

### **Logs:**
```bash
# Ver logs en tiempo real
pm2 logs politica-argentina

# Ver logs de MySQL
sudo tail -f /var/log/mysql/error.log
```

### **Métricas:**
```bash
# Estado de PM2
pm2 status

# Monitoreo
pm2 monit

# Dashboard web
pm2 plus
```

---

## 🆘 **TROUBLESHOOTING**

### **Error: Cannot connect to MySQL**
```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql

# Reiniciar MySQL
sudo systemctl restart mysql

# Verificar credenciales en .env
```

### **Error: JWT token invalid**
```bash
# Verificar JWT_SECRET en .env
# Limpiar sesiones expiradas
mysql -u root -p politica_argentina -e "DELETE FROM sessions WHERE expires_at < NOW();"
```

### **Error: Permission denied**
```bash
# Verificar permisos del usuario
mysql -u root -p politica_argentina -e "SELECT * FROM users WHERE email='user@example.com';"
```

---

## 📞 **SOPORTE**

- **GitHub:** https://github.com/fidubitco/POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA
- **Email:** admin@politicaargentina.com

---

**🎉 Sistema completo y listo para producción!**
