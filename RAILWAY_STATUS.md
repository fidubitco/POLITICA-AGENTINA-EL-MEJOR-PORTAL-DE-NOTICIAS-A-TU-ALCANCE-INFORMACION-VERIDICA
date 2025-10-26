# 🚀 RAILWAY DEPLOY - ESTADO ACTUAL

## ✅ DEPLOY INICIADO EXITOSAMENTE

### Información del Proyecto

```
Nombre: politica-argentina-backend
Project ID: aff3052b-99af-42bc-b2db-6a3df96f5bff
Workspace: fidubitco's Projects
Estado: 🔄 Desplegando
```

### 🔗 Enlaces Importantes

- **Dashboard**: https://railway.com/project/aff3052b-99af-42bc-b2db-6a3df96f5bff
- **Build Logs**: https://railway.com/project/aff3052b-99af-42bc-b2db-6a3df96f5bff/service/6c88b5a4-1fae-42d9-b28e-22fa6392c36b

---

## ✅ PASOS COMPLETADOS

- [x] Proyecto creado en Railway
- [x] Código subido automáticamente
- [x] Build iniciado
- [x] Configuración detectada (`railway.json`, `nixpacks.toml`)

---

## ⏳ PASOS PENDIENTES (Completar en Dashboard Web)

### 1. Agregar MySQL Database

1. Ir al dashboard: https://railway.com/project/aff3052b-99af-42bc-b2db-6a3df96f5bff
2. Click en **"New"** → **"Database"** → **"Add MySQL"**
3. Esperar 1-2 minutos a que se cree

### 2. Configurar Variables de Entorno

Click en tu servicio → Tab **"Variables"** → Agregar las siguientes:

```env
DATABASE_URL=${{MySQL.DATABASE_URL}}
JWT_SECRET=politica-argentina-secret-2025-production-railway-v1
SESSION_SECRET=politica-session-secret-2025-production-railway-v1
ADMIN_EMAIL=holdingdracma@gmail.com
ADMIN_PASSWORD=@Bitexchangers2025
ADMIN_NAME=Admin Principal
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
FRONTEND_URL=https://politicaargentina.com
CORS_ORIGIN=https://politicaargentina.com
```

**Nota**: `${{MySQL.DATABASE_URL}}` se auto-completará cuando agregues MySQL.

### 3. Generar Dominio Público

1. Click en tu servicio backend
2. Tab **"Settings"**
3. Section **"Networking"**
4. Click **"Generate Domain"**
5. Railway generará una URL como: `https://politica-argentina-backend-production.up.railway.app`

### 4. Importar Schema de Base de Datos

Opción A - Desde Railway Dashboard:
1. Click en el servicio **MySQL**
2. Tab **"Connect"**
3. Copiar el **Connection String**
4. Usar **TablePlus**, **MySQL Workbench**, o **DBeaver**
5. Conectar con el connection string
6. Importar el archivo: `database/schema-ultra-optimized.sql`

Opción B - Desde Railway CLI:
```bash
# Conectar a MySQL
railway connect MySQL

# Una vez conectado, ejecutar:
SOURCE database/schema-ultra-optimized.sql;
```

### 5. Crear Usuario Admin

Una vez que el servicio esté **running** y la base de datos configurada:

```bash
# Desde Railway CLI
railway run npx tsx scripts/create-admin.ts
```

O desde Railway Dashboard:
1. Click en tu servicio
2. Tab **"..."** (menú)
3. Click **"Shell"**
4. Ejecutar: `npx tsx scripts/create-admin.ts`

### 6. Verificar Deploy

Una vez completados todos los pasos:

```bash
# Health check
curl https://tu-dominio.up.railway.app/health

# API articles
curl https://tu-dominio.up.railway.app/api/articles

# API categories
curl https://tu-dominio.up.railway.app/api/categories
```

---

## 🔧 CONFIGURACIÓN POST-DEPLOY

### Conectar Frontend con Backend

En **Vercel**, agregar variable de entorno:

1. Ir a: https://vercel.com/dashboard
2. Seleccionar proyecto: **politica-argentina**
3. **Settings** → **Environment Variables**
4. Agregar:

```env
VITE_API_URL=https://tu-dominio.up.railway.app
```

5. **Re-deploy** el frontend

### Habilitar CORS

El backend ya tiene CORS configurado para `https://politicaargentina.com`.

Si necesitas agregar más orígenes, actualiza la variable `CORS_ORIGIN` en Railway.

---

## 💡 COMANDOS ÚTILES

```bash
# Ver status del proyecto
railway status

# Ver logs en tiempo real
railway logs

# Abrir dashboard en navegador
railway open

# Ver variables de entorno
railway variables

# Conectar a MySQL
railway connect MySQL

# Re-deploy
railway up --detach

# Ver información del proyecto
railway list
```

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot connect to database"

**Solución**: Verificar que `DATABASE_URL` esté configurada correctamente.

```bash
railway variables
```

Debe mostrar `DATABASE_URL` con el valor de MySQL.

### Error: "Module not found"

**Solución**: Verificar que el build se completó exitosamente.

1. Ir a Build Logs en Railway
2. Verificar que `pnpm install` y `pnpm build:backend` se ejecutaron
3. Si falló, verificar `railway.json` y `nixpacks.toml`

### Error: "Port already in use"

**Solución**: Railway asigna el puerto automáticamente via `$PORT`.

Verificar que el código use:
```typescript
const PORT = process.env.PORT || 3001;
```

### Deploy no inicia

**Solución**: Verificar que el servicio tenga un dominio público generado.

1. Settings → Networking → Generate Domain

---

## 📊 ESTADO ACTUAL DEL SISTEMA

```
✅ Frontend: https://politicaargentina.com (ONLINE)
🔄 Backend: Desplegando en Railway...
⏳ Database: Pendiente de agregar
⏳ Variables: Pendiente de configurar
⏳ Dominio: Pendiente de generar
```

---

## 🎯 CHECKLIST COMPLETO

- [x] Código commiteado y pusheado a GitHub
- [x] Proyecto creado en Railway
- [x] Deploy iniciado
- [ ] MySQL database agregada
- [ ] Variables de entorno configuradas
- [ ] Dominio público generado
- [ ] Schema de base de datos importado
- [ ] Usuario admin creado
- [ ] Health check verificado
- [ ] API endpoints probados
- [ ] Frontend conectado con backend

---

## 💰 COSTOS

### Railway Free Tier
- **$5 de crédito gratis**/mes
- **500 horas** de ejecución
- **1GB RAM** por servicio
- **1GB Storage** para BD

### Estimación para este Proyecto
- **Backend**: ~720 horas/mes (24/7)
- **MySQL**: ~720 horas/mes (24/7)
- **Total estimado**: $8-12/mes

**Recomendación**: Empezar con Free Tier y monitorear uso.

---

## 🎉 RESULTADO FINAL (Una vez completado)

```
✅ Frontend en Vercel
   https://politicaargentina.com

✅ Backend en Railway
   https://tu-dominio.up.railway.app

✅ Base de Datos MySQL
   Configurada y optimizada

✅ Admin Dashboard Funcional
   https://politicaargentina.com/admin/login

✅ API REST Completa
   /api/articles
   /api/categories
   /api/auth
   /api/analytics

✅ Sistema de IA
   Creación automática de noticias

✅ SEO Auditor
   Análisis profesional

✅ Analytics en Tiempo Real
   Tracking de visitantes
```

---

## 📚 RECURSOS

- **Railway Dashboard**: https://railway.com/project/aff3052b-99af-42bc-b2db-6a3df96f5bff
- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Guía Completa**: Ver `RAILWAY_DEPLOY.md`
- **Guía de Producción**: Ver `PRODUCCION.md`

---

## 🚀 PRÓXIMO PASO INMEDIATO

**Ir al Dashboard de Railway y completar los pasos pendientes:**

https://railway.com/project/aff3052b-99af-42bc-b2db-6a3df96f5bff

1. Agregar MySQL Database
2. Configurar Variables de Entorno
3. Generar Dominio Público
4. Importar Schema
5. Crear Usuario Admin

---

*Última actualización: Deploy iniciado exitosamente*
*Tiempo estimado para completar: 10-15 minutos*

