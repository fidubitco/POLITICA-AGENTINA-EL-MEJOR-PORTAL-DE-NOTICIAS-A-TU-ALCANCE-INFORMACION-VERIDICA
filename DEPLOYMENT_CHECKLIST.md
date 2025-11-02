# ✅ CHECKLIST DE DEPLOYMENT - VERCEL

## 🎯 CONFIGURACIÓN MÍNIMA REQUERIDA

### 1. Variables de Entorno en Vercel (OBLIGATORIO)

Ve a: **https://vercel.com/[tu-proyecto]/settings/environment-variables**

Agrega estas variables:

```bash
# OBLIGATORIO
NEXTAUTH_URL=https://politicaargentina.com
NEXTAUTH_SECRET=[genera con: openssl rand -base64 32]

# OPCIONAL (para push notifications)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=[genera con: npx web-push generate-vapid-keys]
VAPID_PRIVATE_KEY=[genera con: npx web-push generate-vapid-keys]
VAPID_SUBJECT=mailto:admin@politicaargentina.com
```

**IMPORTANTE**: Selecciona `Production`, `Preview`, y `Development` para cada variable.

---

## 🚀 PASOS PARA DEPLOYMENT EXITOSO

### Paso 1: Commit y Push
```bash
cd "/Users/usuario/Documents/SITIO WEB POLITICA ARGENTINA"
git add .
git commit -m "fix: Vercel deployment configuration"
git push origin 2025-10-30-xlea-32a18
```

### Paso 2: Redeploy en Vercel (SIN CACHE)
1. Ve a: https://vercel.com/[tu-proyecto]/deployments
2. Click en el último deployment
3. Click en **"..."** (3 puntos)
4. Click en **"Redeploy"**
5. **DESMARCA** "Use existing Build Cache"
6. Click en **"Redeploy"**

### Paso 3: Esperar Deployment (2-3 minutos)
- Status debe cambiar de "Building" → "Ready"
- Si falla, ve a "Build Logs" para ver el error

### Paso 4: Limpiar Cache del Navegador
```
Chrome/Edge: Cmd + Shift + R (Mac) / Ctrl + Shift + R (Windows)
Firefox: Cmd + Shift + R (Mac) / Ctrl + F5 (Windows)
Safari: Cmd + Option + R (Mac)
```

O usa **Modo Incógnito** para garantizar que no hay cache.

---

## 🔍 VERIFICAR DEPLOYMENT

### ✅ Deployment Exitoso
- Status: **Ready** (verde)
- URL: https://politicaargentina.com funciona
- No hay errores 404/403
- Imágenes cargan correctamente

### ❌ Deployment Fallido
- Status: **Failed** (rojo)
- Ver "Build Logs" para identificar el error
- Errores comunes:
  - Missing environment variable
  - Module not found
  - Build timeout
  - Database connection failed

---

## 🐛 SOLUCIÓN DE ERRORES COMUNES

### Error: "Missing environment variable: NEXTAUTH_SECRET"
**Solución**: Agrega `NEXTAUTH_SECRET` en Vercel Settings → Environment Variables

### Error: "Module not found: Can't resolve 'X'"
**Solución**: 
```bash
npm install X
git add package.json package-lock.json
git commit -m "fix: Add missing dependency"
git push
```

### Error: "Build exceeded maximum duration"
**Solución**: Simplifica el build o aumenta el timeout en `vercel.json`

### Error: "Database connection failed"
**Solución**: 
- Opción 1: Agrega `DATABASE_URL` correcta en Vercel
- Opción 2: Comenta el código de base de datos y usa datos mock

### Error: "404 - Page Not Found"
**Solución**: Verifica que la ruta exista en `app/` o `pages/`

### Error: "403 - Forbidden"
**Solución**: Verifica los headers en `vercel.json` y CORS configuration

---

## 📊 MONITOREO POST-DEPLOYMENT

### 1. Verificar en Producción
- [ ] https://politicaargentina.com carga correctamente
- [ ] Imágenes se ven correctamente (NO Obama)
- [ ] Timestamp en el hero cambia en cada refresh
- [ ] No hay errores en Console (F12)

### 2. Verificar Performance
- [ ] Lighthouse Score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

### 3. Verificar Funcionalidad
- [ ] Navegación funciona
- [ ] Links funcionan
- [ ] Imágenes cargan
- [ ] Responsive funciona

---

## 🆘 SI TODO FALLA

### Opción 1: Deployment desde Cero
1. Ve a Vercel Dashboard
2. Elimina el proyecto actual
3. Importa el repositorio de nuevo
4. Configura las variables de entorno
5. Deploy

### Opción 2: Usar Vercel CLI
```bash
npm i -g vercel
cd "/Users/usuario/Documents/SITIO WEB POLITICA ARGENTINA"
vercel --prod
```

### Opción 3: Contactar Soporte
Si nada funciona, comparte:
1. **Build Logs** completos de Vercel
2. **Errores de Console** del navegador
3. **Screenshot** del error en Vercel Dashboard

---

## 📝 NOTAS IMPORTANTES

1. **NO uses cache** en el redeploy si hay problemas
2. **Limpia el cache del navegador** después de cada deployment
3. **Usa modo incógnito** para verificar sin cache
4. **Espera 2-3 minutos** para que el CDN se actualice
5. **Verifica las variables de entorno** antes de deployar

---

**Última actualización:** 2025-11-02 20:15:00 UTC  
**Status:** ✅ Configuración corregida, listo para deployment

