# 🚀 GUÍA DE DESPLIEGUE A RAILWAY

## ✅ PREPARACIÓN COMPLETADA

Los siguientes archivos han sido creados y están listos:

- ✅ `railway.json` - Configuración de Railway
- ✅ `nixpacks.toml` - Configuración de build
- ✅ Backend code en `server/`
- ✅ Build script en `package.json`

---

## 📋 OPCIÓN 1: DESPLIEGUE DESDE GITHUB (Recomendado)

### Paso 1: Commit y Push

```bash
# Agregar archivos nuevos
git add railway.json nixpacks.toml RAILWAY_DEPLOY.md PRODUCCION.md

# Commit
git commit -m "🚀 Configuración de Railway para backend"

# Push
git push origin main
```

### Paso 2: Crear Proyecto en Railway

1. **Ir a Railway**: https://railway.app
2. **Login/Signup** con GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Seleccionar**: `POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA`
5. **Deploy** automáticamente

### Paso 3: Configurar Variables de Entorno

En el dashboard de Railway, ir a **Variables** y agregar:

```env
# Base de datos (Railway provee MySQL automáticamente)
DATABASE_URL=${{MySQL.DATABASE_URL}}

# Seguridad
JWT_SECRET=politica-argentina-super-secret-key-2025-production-railway
SESSION_SECRET=politica-argentina-session-secret-2025-production-railway

# Admin
ADMIN_EMAIL=holdingdracma@gmail.com
ADMIN_PASSWORD=$2b$10$hashed_password_here
ADMIN_NAME=Admin Principal

# Servidor
NODE_ENV=production
PORT=${{PORT}}
HOST=0.0.0.0
FRONTEND_URL=https://politicaargentina.com

# IA (Opcional)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-r1:1.5b
```

### Paso 4: Agregar MySQL Database

1. En Railway, click en **New** → **Database** → **Add MySQL**
2. Railway creará automáticamente la base de datos
3. La variable `${{MySQL.DATABASE_URL}}` se configurará automáticamente

### Paso 5: Importar Schema

Opción A - Desde Railway CLI:
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link al proyecto
railway link

# Conectar a MySQL
railway connect MySQL

# Importar schema
SOURCE database/schema-ultra-optimized.sql;
```

Opción B - Desde TablePlus/MySQL Workbench:
1. Copiar connection string de Railway
2. Conectar con tu cliente SQL favorito
3. Importar `database/schema-ultra-optimized.sql`

### Paso 6: Verificar Deploy

1. Railway mostrará la URL del backend: `https://tu-proyecto.up.railway.app`
2. Verificar health check: `https://tu-proyecto.up.railway.app/health`
3. Verificar API: `https://tu-proyecto.up.railway.app/api/articles`

---

## 📋 OPCIÓN 2: DESPLIEGUE CON RAILWAY CLI

### Paso 1: Instalar Railway CLI

```bash
npm install -g @railway/cli
```

### Paso 2: Login

```bash
railway login
```

### Paso 3: Inicializar Proyecto

```bash
# Desde la raíz del proyecto
railway init
```

Seleccionar:
- **Create new project**: Sí
- **Project name**: politica-argentina-backend

### Paso 4: Agregar MySQL

```bash
railway add --plugin mysql
```

### Paso 5: Configurar Variables

```bash
# Ver variables actuales
railway variables

# Agregar variables una por una
railway variables set JWT_SECRET="tu-secret-aqui"
railway variables set SESSION_SECRET="tu-session-secret-aqui"
railway variables set ADMIN_EMAIL="holdingdracma@gmail.com"
railway variables set FRONTEND_URL="https://politicaargentina.com"
railway variables set NODE_ENV="production"
```

### Paso 6: Deploy

```bash
railway up
```

### Paso 7: Ver Logs

```bash
railway logs
```

---

## 📋 OPCIÓN 3: DESPLIEGUE MANUAL (Sin CLI)

### Paso 1: Preparar Repositorio

```bash
# Commit todos los cambios
git add .
git commit -m "🚀 Backend listo para Railway"
git push origin main
```

### Paso 2: Crear Proyecto en Railway

1. Ir a https://railway.app/new
2. Click en **Deploy from GitHub repo**
3. Autorizar Railway en GitHub
4. Seleccionar el repositorio
5. Railway detectará automáticamente `railway.json` y `nixpacks.toml`

### Paso 3: Configurar desde Dashboard

1. **Settings** → **Environment**
2. Agregar todas las variables de entorno (ver lista arriba)
3. **Deployments** → Verificar que el build sea exitoso

### Paso 4: Agregar Base de Datos

1. En el proyecto, click **New** → **Database** → **MySQL**
2. Esperar a que se cree
3. En **Variables**, copiar `DATABASE_URL`
4. En tu servicio backend, agregar variable `DATABASE_URL=${{MySQL.DATABASE_URL}}`

---

## 🔧 CONFIGURACIÓN POST-DEPLOY

### 1. Crear Usuario Admin

Opción A - Desde Railway CLI:
```bash
railway run npx tsx scripts/create-admin.ts
```

Opción B - Desde Railway Shell:
1. En Railway dashboard, ir a tu servicio
2. Click en **...** → **Shell**
3. Ejecutar: `npx tsx scripts/create-admin.ts`

### 2. Verificar Endpoints

```bash
# Health check
curl https://tu-proyecto.up.railway.app/health

# API articles
curl https://tu-proyecto.up.railway.app/api/articles

# API categories
curl https://tu-proyecto.up.railway.app/api/categories
```

### 3. Conectar Frontend con Backend

En Vercel, agregar variable de entorno:

```env
VITE_API_URL=https://tu-proyecto.up.railway.app
```

Luego, re-deploy el frontend en Vercel.

---

## 📊 MONITOREO

### Ver Logs en Tiempo Real

```bash
railway logs --follow
```

### Ver Métricas

1. En Railway dashboard
2. Click en tu servicio
3. Tab **Metrics**
4. Ver CPU, Memory, Network

### Configurar Alertas

1. **Settings** → **Alerts**
2. Configurar alertas para:
   - CPU > 80%
   - Memory > 80%
   - Crashes

---

## 💰 COSTOS

### Railway Free Tier

- **$5 de crédito gratis** al mes
- **500 horas de ejecución** gratis
- **1GB RAM** por servicio
- **1GB Storage** para base de datos

### Railway Pro ($20/mes)

- **$20 de crédito** al mes
- **Horas ilimitadas**
- **8GB RAM** por servicio
- **100GB Storage**

### Estimación para este Proyecto

**Free Tier** (suficiente para empezar):
- Backend: ~200 horas/mes
- MySQL: ~200 horas/mes
- Total: ~$4/mes (dentro del crédito gratis)

**Con tráfico moderado** (1000 visitas/día):
- Backend: ~720 horas/mes
- MySQL: ~720 horas/mes
- Total: ~$10-15/mes

---

## 🔐 SEGURIDAD

### Variables de Entorno Seguras

**NO** uses valores por defecto en producción. Genera secrets seguros:

```bash
# Generar JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generar SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Hashear Password de Admin

```bash
# Desde Node.js
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('@Bitexchangers2025', 10, (e,h) => console.log(h))"
```

Usa el hash generado en `ADMIN_PASSWORD`.

---

## 🚀 COMANDOS ÚTILES

```bash
# Ver status
railway status

# Ver variables
railway variables

# Abrir dashboard
railway open

# Conectar a base de datos
railway connect MySQL

# Ver logs
railway logs

# Re-deploy
railway up --detach

# Rollback
railway rollback

# Eliminar servicio
railway down
```

---

## 🐛 TROUBLESHOOTING

### Error: "Module not found"

**Solución**: Verificar que `pnpm install` se ejecute correctamente

```bash
# En railway.json, verificar:
"buildCommand": "pnpm install && pnpm build:backend"
```

### Error: "Cannot connect to database"

**Solución**: Verificar que `DATABASE_URL` esté configurada

```bash
railway variables | grep DATABASE_URL
```

### Error: "Port already in use"

**Solución**: Railway asigna el puerto automáticamente

```typescript
// En server/index.ts
const PORT = process.env.PORT || 3001;
```

### Error: "Build timeout"

**Solución**: Aumentar timeout en Railway settings

1. **Settings** → **Deploy**
2. **Build timeout**: 10 minutos

---

## ✅ CHECKLIST DE DESPLIEGUE

- [ ] Archivos de configuración creados (`railway.json`, `nixpacks.toml`)
- [ ] Código commiteado y pusheado a GitHub
- [ ] Proyecto creado en Railway
- [ ] Base de datos MySQL agregada
- [ ] Variables de entorno configuradas
- [ ] Schema de base de datos importado
- [ ] Usuario admin creado
- [ ] Deploy exitoso
- [ ] Health check funcionando
- [ ] API endpoints respondiendo
- [ ] Frontend conectado al backend
- [ ] Logs monitoreados

---

## 🎯 PRÓXIMOS PASOS

1. **Commit y push** los archivos de configuración
2. **Crear proyecto** en Railway desde GitHub
3. **Agregar MySQL** database
4. **Configurar variables** de entorno
5. **Importar schema** de base de datos
6. **Crear usuario admin**
7. **Verificar** que todo funcione
8. **Conectar** frontend con backend

---

## 📚 RECURSOS

- **Railway Docs**: https://docs.railway.app
- **Railway CLI**: https://docs.railway.app/develop/cli
- **Railway Discord**: https://discord.gg/railway
- **Nixpacks**: https://nixpacks.com/docs

---

## 🎉 RESULTADO FINAL

Una vez completado, tendrás:

```
✅ Frontend en Vercel (https://politicaargentina.com)
✅ Backend en Railway (https://tu-proyecto.up.railway.app)
✅ Base de datos MySQL en Railway
✅ Admin dashboard funcional
✅ API REST completa
✅ Sistema de IA integrado
✅ Analytics en tiempo real
✅ Deploy automático desde GitHub

💰 Costo: $0-15/mes (dependiendo del tráfico)
```

---

*¿Listo para desplegar? ¡Elige una opción y comencemos!*

