# 🚀 RAILWAY - GUÍA RÁPIDA VISUAL

## ⚡ SETUP EN 5 MINUTOS

### 🎯 Dashboard de Railway

**URL**: https://railway.com/project/aff3052b-99af-42bc-b2db-6a3df96f5bff

---

## 📋 PASO 1: AGREGAR MYSQL (2 minutos)

```
Dashboard → Botón "New" (arriba derecha) → Database → Add MySQL
```

**Visual**:
```
┌─────────────────────────────────────┐
│  Railway Dashboard                  │
│  ┌───────────────────────────────┐  │
│  │  [New ▼]  [Settings]          │  │
│  └───────────────────────────────┘  │
│                                     │
│  Click "New" → "Database" → "MySQL" │
└─────────────────────────────────────┘
```

✅ **Resultado**: Verás un nuevo servicio "MySQL" en tu proyecto

---

## 📋 PASO 2: VARIABLES DE ENTORNO (3 minutos)

```
Click en servicio backend → Tab "Variables" → Agregar cada una
```

**Copiar y pegar estas variables**:

```env
DATABASE_URL=${{MySQL.DATABASE_URL}}
JWT_SECRET=politica-argentina-secret-2025-production
SESSION_SECRET=politica-session-secret-2025-production
ADMIN_EMAIL=holdingdracma@gmail.com
ADMIN_PASSWORD=@Bitexchangers2025
ADMIN_NAME=Admin Principal
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
FRONTEND_URL=https://politicaargentina.com
CORS_ORIGIN=https://politicaargentina.com
```

**Visual**:
```
┌─────────────────────────────────────┐
│  Backend Service                    │
│  ┌───────────────────────────────┐  │
│  │ [Deployments] [Variables] ... │  │
│  └───────────────────────────────┘  │
│                                     │
│  Click "Variables" → "New Variable" │
│  Name: DATABASE_URL                 │
│  Value: ${{MySQL.DATABASE_URL}}     │
│  [Add]                              │
└─────────────────────────────────────┘
```

✅ **Resultado**: 11 variables configuradas

---

## 📋 PASO 3: GENERAR DOMINIO (30 segundos)

```
Servicio backend → Settings → Networking → Generate Domain
```

**Visual**:
```
┌─────────────────────────────────────┐
│  Backend Service → Settings         │
│  ┌───────────────────────────────┐  │
│  │  Networking                   │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ [Generate Domain]       │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

✅ **Resultado**: URL como `xxx.up.railway.app`

---

## 📋 PASO 4: IMPORTAR SCHEMA (2 minutos)

### Opción A: Desde Railway CLI (Recomendado)

```bash
railway connect MySQL
```

Una vez conectado:
```sql
SOURCE database/schema-ultra-optimized.sql;
```

### Opción B: Con TablePlus/MySQL Workbench

1. Click en servicio MySQL → Tab "Connect"
2. Copiar "Connection String"
3. Abrir TablePlus
4. Nueva conexión con el string
5. Importar archivo: `database/schema-ultra-optimized.sql`

**Visual**:
```
┌─────────────────────────────────────┐
│  MySQL Service → Connect            │
│  ┌───────────────────────────────┐  │
│  │  Connection String:           │  │
│  │  mysql://user:pass@host/db    │  │
│  │  [Copy]                       │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

✅ **Resultado**: 12 tablas creadas en MySQL

---

## 📋 PASO 5: CREAR ADMIN (1 minuto)

```bash
railway run npx tsx scripts/create-admin.ts
```

O desde Railway Shell:
```
Servicio backend → ... → Shell → npx tsx scripts/create-admin.ts
```

**Visual**:
```
┌─────────────────────────────────────┐
│  Backend Service                    │
│  ┌───────────────────────────────┐  │
│  │  [...]  ▼                     │  │
│  │  ├─ Shell                     │  │
│  │  ├─ Logs                      │  │
│  │  └─ Restart                   │  │
│  └───────────────────────────────┘  │
│                                     │
│  Click "Shell" → Ejecutar comando   │
└─────────────────────────────────────┘
```

✅ **Resultado**: Usuario admin creado

---

## ✅ VERIFICACIÓN FINAL

### Health Check
```bash
curl https://tu-dominio.up.railway.app/health
```

**Respuesta esperada**:
```json
{"status":"ok","timestamp":"..."}
```

### API Articles
```bash
curl https://tu-dominio.up.railway.app/api/articles
```

**Respuesta esperada**:
```json
{"articles":[...]}
```

---

## 🔗 CONECTAR FRONTEND

### En Vercel

1. Ir a: https://vercel.com/dashboard
2. Proyecto: **politica-argentina**
3. **Settings** → **Environment Variables**
4. Agregar:

```env
VITE_API_URL=https://tu-dominio.up.railway.app
```

5. **Re-deploy**

**Visual**:
```
┌─────────────────────────────────────┐
│  Vercel → politica-argentina        │
│  ┌───────────────────────────────┐  │
│  │  Settings → Environment Vars  │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Name: VITE_API_URL      │  │  │
│  │  │ Value: https://xxx...   │  │  │
│  │  │ [Add]                   │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 🎉 RESULTADO FINAL

```
✅ Frontend: https://politicaargentina.com
✅ Backend: https://tu-dominio.up.railway.app
✅ Admin: https://politicaargentina.com/admin/login
✅ MySQL: Configurado y funcionando
✅ API: Todos los endpoints activos
```

### Credenciales de Admin

```
Email: holdingdracma@gmail.com
Password: @Bitexchangers2025
```

---

## 💡 COMANDOS ÚTILES

```bash
# Ver logs
railway logs

# Abrir dashboard
railway open

# Ver variables
railway variables

# Conectar a MySQL
railway connect MySQL

# Re-deploy
railway up --detach

# Ver status
railway status
```

---

## 🐛 PROBLEMAS COMUNES

### Error: "Cannot connect to database"

**Solución**: Verificar que `DATABASE_URL` esté configurada

```bash
railway variables | grep DATABASE_URL
```

### Error: "Port already in use"

**Solución**: Railway asigna el puerto automáticamente. Verificar que el código use `process.env.PORT`

### Deploy no inicia

**Solución**: Generar dominio público en Settings → Networking

### Schema no se importa

**Solución**: Verificar que MySQL esté "Running" antes de importar

---

## ⏱️ TIEMPO TOTAL ESTIMADO

- Paso 1 (MySQL): 2 minutos
- Paso 2 (Variables): 3 minutos
- Paso 3 (Dominio): 30 segundos
- Paso 4 (Schema): 2 minutos
- Paso 5 (Admin): 1 minuto
- Verificación: 1 minuto
- Conectar Frontend: 2 minutos

**TOTAL: ~12 minutos**

---

## 🚀 SCRIPT AUTOMATIZADO

Para automatizar todo lo posible:

```bash
./scripts/setup-railway-complete.sh
```

El script:
- Abre Railway Dashboard automáticamente
- Te guía paso a paso
- Ejecuta comandos automáticamente cuando es posible
- Verifica todos los endpoints
- Genera resumen final

---

## 📚 MÁS INFORMACIÓN

- **RAILWAY_STATUS.md** - Estado actual detallado
- **RAILWAY_DEPLOY.md** - Guía completa de deploy
- **PRODUCCION.md** - Guía de producción

---

**🎯 ¡Sigue esta guía y tendrás tu backend funcionando en 12 minutos!**

