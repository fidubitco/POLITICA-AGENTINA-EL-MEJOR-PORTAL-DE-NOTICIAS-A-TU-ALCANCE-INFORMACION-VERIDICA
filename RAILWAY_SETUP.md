# 🚂 CONFIGURACIÓN RAILWAY - POLÍTICA ARGENTINA

## ✅ ESTADO ACTUAL

**Build**: ✅ EXITOSO  
**Database Schema**: ✅ COMPLETO (25 tablas)  
**Frontend**: ✅ DESPLEGADO EN VERCEL  
**Backend**: ⏳ PENDIENTE RAILWAY

---

## 📋 PASOS PARA DESPLEGAR EN RAILWAY

### 1. Crear Proyecto en Railway

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Crear proyecto
railway init
```

### 2. Crear Base de Datos MySQL

En el dashboard de Railway:
1. Click en "New" → "Database" → "MySQL"
2. Esperar a que se cree la instancia
3. Copiar las credenciales de conexión

### 3. Configurar Variables de Entorno

En Railway, agregar las siguientes variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# App
NODE_ENV=production
PORT=3000

# Auth
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://politicaargentina.com

# API Keys (opcional)
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
```

### 4. Importar Schema a MySQL

Opción A: Desde Railway CLI
```bash
# Conectar a la base de datos
railway connect MySQL

# Importar schema
mysql -u root -p < database/schema-complete.sql
```

Opción B: Desde MySQL Workbench
1. Conectar usando las credenciales de Railway
2. Abrir `database/schema-complete.sql`
3. Ejecutar el script

Opción C: Desde phpMyAdmin (si está disponible)
1. Acceder a phpMyAdmin
2. Seleccionar la base de datos
3. Ir a "Importar"
4. Subir `schema-complete.sql`

### 5. Desplegar Backend

```bash
# Desde la raíz del proyecto
railway up

# O vincular con GitHub
railway link
```

### 6. Verificar Deployment

```bash
# Ver logs
railway logs

# Ver status
railway status

# Abrir en navegador
railway open
```

---

## 🗄️ SCHEMA DE BASE DE DATOS

### Tablas Implementadas (25)

#### Core
- `users` - Usuarios del sistema
- `sessions` - Sesiones activas
- `categories` - 8 categorías principales
- `subcategories` - 35 subcategorías
- `articles` - Artículos de noticias
- `tags` - Etiquetas
- `article_tags` - Relación artículos-tags

#### Engagement
- `article_comments` - Comentarios
- `article_views` - Vistas
- `article_shares` - Compartidos
- `article_likes` - Likes

#### Sistema Político
- `candidates` - Candidatos políticos
- `polls` - Encuestas
- `poll_options` - Opciones de encuesta
- `poll_votes` - Votos
- `elections` - Elecciones
- `election_results` - Resultados
- `live_updates` - Actualizaciones en vivo
- `political_settings` - Configuración

#### Finanzas
- `financial_data` - Datos financieros actuales
- `financial_history` - Histórico
- `ai_analysis` - Análisis con IA

#### Automatización
- `news_sources` - Fuentes de noticias
- `scraped_articles` - Artículos scrapeados

#### Sistema
- `analytics_events` - Eventos de analytics
- `notifications` - Notificaciones
- `push_subscriptions` - Suscripciones push

---

## 🔧 CONFIGURACIÓN DEL SERVIDOR

### Archivo `server/_core/index.ts`

El servidor ya está configurado para:
- ✅ tRPC API
- ✅ CORS
- ✅ Autenticación JWT
- ✅ Rate limiting
- ✅ Error handling
- ✅ Health checks

### Endpoints Disponibles

```
GET  /api/health          - Health check
GET  /api/trpc/*          - tRPC endpoints
POST /api/auth/login      - Login
POST /api/auth/register   - Register
GET  /api/articles        - Listar artículos
POST /api/articles        - Crear artículo
GET  /api/categories      - Listar categorías
GET  /api/political/*     - Endpoints políticos
GET  /api/financial/*     - Endpoints financieros
```

---

## 📊 DATOS INICIALES

El schema incluye datos iniciales:

### Categorías (8)
1. Política
2. Economía
3. Sociedad
4. Internacional
5. Deportes
6. Cultura
7. Tecnología
8. Opinión

### Usuario Admin
```
Email: admin@politicaargentina.com
Password: (configurar en primera ejecución)
Role: admin
```

### Configuración Política
- `enable_live_results`: true
- `enable_polls`: true
- `enable_candidate_profiles`: true
- `auto_update_interval`: 30
- `show_vote_count`: true
- `allow_anonymous_voting`: true

---

## 🚀 COMANDOS ÚTILES

```bash
# Ver logs en tiempo real
railway logs --follow

# Conectar a MySQL
railway connect MySQL

# Ver variables de entorno
railway variables

# Reiniciar servicio
railway restart

# Ver métricas
railway metrics

# Desplegar nueva versión
git push origin main
railway up
```

---

## 🔐 SEGURIDAD

### Recomendaciones

1. **Cambiar JWT_SECRET**
   ```bash
   # Generar secret seguro
   openssl rand -base64 32
   ```

2. **Configurar CORS correctamente**
   ```env
   CORS_ORIGIN=https://politicaargentina.com,https://www.politicaargentina.com
   ```

3. **Habilitar SSL**
   - Railway proporciona SSL automático

4. **Rate Limiting**
   - Ya configurado en el servidor
   - 100 requests por 15 minutos

5. **Sanitización de Inputs**
   - Implementada en todos los endpoints

---

## 📈 MONITOREO

### Métricas Disponibles

- **CPU Usage**: Ver en Railway dashboard
- **Memory Usage**: Ver en Railway dashboard
- **Request Rate**: Ver logs
- **Error Rate**: Ver logs
- **Database Connections**: Ver MySQL metrics

### Alertas

Configurar en Railway:
1. Ir a Settings → Notifications
2. Agregar webhook o email
3. Configurar triggers (CPU > 80%, Memory > 90%, etc.)

---

## 🔄 CI/CD

### GitHub Actions (Opcional)

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @railway/cli
      - run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 🐛 TROUBLESHOOTING

### Error: Connection Refused

```bash
# Verificar que el puerto esté correcto
railway variables set PORT=3000

# Reiniciar
railway restart
```

### Error: Database Connection

```bash
# Verificar DATABASE_URL
railway variables

# Test connection
railway run node -e "console.log(process.env.DATABASE_URL)"
```

### Error: Build Failed

```bash
# Ver logs completos
railway logs --deployment [deployment-id]

# Verificar package.json scripts
cat package.json | grep scripts -A 10
```

---

## 📞 SOPORTE

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Issues**: https://github.com/railwayapp/railway/issues

---

## ✅ CHECKLIST DE DEPLOYMENT

- [ ] Crear proyecto en Railway
- [ ] Crear base de datos MySQL
- [ ] Configurar variables de entorno
- [ ] Importar schema SQL
- [ ] Desplegar backend
- [ ] Verificar health check
- [ ] Probar endpoints
- [ ] Configurar dominio (opcional)
- [ ] Configurar monitoreo
- [ ] Configurar backups

---

**Última actualización**: 26 de Enero 2025  
**Versión**: 2.0.0  
**Status**: ✅ LISTO PARA DEPLOYMENT

