# 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO EN VERCEL

## 📋 VARIABLES REQUERIDAS

Para conectar el frontend (Vercel) con el backend (Railway), necesitas configurar las siguientes variables de entorno en Vercel:

### 1. Acceder al Dashboard de Vercel

1. Ve a https://vercel.com/dashboard
2. Selecciona el proyecto `politica-argentina`
3. Click en **"Settings"**
4. Click en **"Environment Variables"**

---

### 2. Agregar Variables de Entorno

Agrega las siguientes variables:

#### **VITE_API_URL** (REQUERIDA)
```
Name: VITE_API_URL
Value: https://politicaargentinaofficialsite-production.up.railway.app
Environment: Production, Preview, Development
```

#### **VITE_FRONTEND_URL** (REQUERIDA)
```
Name: VITE_FRONTEND_URL
Value: https://politicaargentina.com
Environment: Production
```

#### **VITE_NODE_ENV** (OPCIONAL)
```
Name: VITE_NODE_ENV
Value: production
Environment: Production
```

#### **VITE_ENABLE_ANALYTICS** (OPCIONAL)
```
Name: VITE_ENABLE_ANALYTICS
Value: true
Environment: Production, Preview, Development
```

---

### 3. Guardar y Redesplegar

1. Click en **"Save"** después de agregar cada variable
2. Ve a **"Deployments"**
3. Click en los **tres puntos** del último deployment
4. Selecciona **"Redeploy"**
5. Marca **"Use existing Build Cache"** (opcional)
6. Click en **"Redeploy"**

---

## 🔍 VERIFICACIÓN

### Después del Redeploy

1. **Verificar que el frontend carga:**
   ```bash
   curl -I https://politicaargentina.com
   ```

2. **Verificar que el backend responde:**
   ```bash
   curl https://politicaargentinaofficialsite-production.up.railway.app/health
   ```

3. **Verificar conexión desde el frontend:**
   - Abre https://politicaargentina.com
   - Abre DevTools (F12)
   - Ve a la pestaña **"Network"**
   - Busca peticiones a `politicaargentinaofficialsite-production.up.railway.app`
   - Deberían aparecer con status **200**

---

## 📊 ENDPOINTS DISPONIBLES

### Backend (Railway)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check básico |
| GET | `/api/health` | Health check con métricas |
| GET | `/api/articles` | Lista de artículos |
| GET | `/api/articles/:id` | Artículo individual |
| POST | `/api/articles` | Crear artículo |
| PUT | `/api/articles/:id` | Actualizar artículo |
| DELETE | `/api/articles/:id` | Eliminar artículo |
| GET | `/api/analytics/stats` | Estadísticas |
| GET | `/api/analytics/top-articles` | Top artículos |
| GET | `/api/analytics/traffic` | Tráfico |
| GET | `/api/categories` | Categorías |
| GET | `/api/users` | Usuarios |
| POST | `/api/users` | Crear usuario |
| GET | `/api/notifications` | Notificaciones |
| POST | `/api/notifications` | Crear notificación |

---

## 🧪 PRUEBAS

### Desde la Terminal

```bash
# Health check
curl https://politicaargentinaofficialsite-production.up.railway.app/health

# Artículos
curl https://politicaargentinaofficialsite-production.up.railway.app/api/articles

# Categorías
curl https://politicaargentinaofficialsite-production.up.railway.app/api/categories

# Analytics
curl https://politicaargentinaofficialsite-production.up.railway.app/api/analytics/stats
```

### Desde el Frontend (DevTools Console)

```javascript
// Importar el cliente API
import apiClient from './lib/apiClient';

// Probar health check
const health = await apiClient.checkHealth();
console.log('Health:', health);

// Probar artículos
const articles = await apiClient.getArticles();
console.log('Articles:', articles);

// Probar analytics
const stats = await apiClient.getAnalyticsStats();
console.log('Stats:', stats);
```

---

## 🔒 SEGURIDAD

### Variables Sensibles

Si necesitas agregar variables sensibles (API keys, secrets), asegúrate de:

1. **NO** incluirlas en el código fuente
2. **NO** commitearlas a Git
3. Agregarlas **SOLO** en Vercel Dashboard
4. Usar el prefijo `VITE_` solo para variables que deben ser públicas

### CORS

El backend ya está configurado con CORS para aceptar peticiones desde:
- `https://politicaargentina.com`
- `https://www.politicaargentina.com`
- Cualquier subdominio de Vercel (`*.vercel.app`)

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Configurar variables de entorno en Vercel
2. ✅ Redesplegar el frontend
3. ✅ Verificar que el backend de Railway esté activo
4. ✅ Probar la conexión frontend-backend
5. 📊 Verificar que los dashboards carguen datos reales
6. 🔔 Probar el sistema de notificaciones
7. 📰 Probar la creación/edición de artículos

---

## 📞 SOPORTE

### Logs de Vercel
```bash
# Ver logs en tiempo real
vercel logs politica-argentina --follow
```

### Logs de Railway
```bash
# Ver logs del backend
railway logs
```

### Verificar Estado
```bash
# Vercel
vercel inspect politica-argentina

# Railway
railway status
```

---

## ✅ CHECKLIST FINAL

- [ ] Variables de entorno configuradas en Vercel
- [ ] Redespliegue completado
- [ ] Frontend carga correctamente
- [ ] Backend responde a `/health`
- [ ] Peticiones API funcionan desde el frontend
- [ ] Dashboard muestra datos reales
- [ ] Sistema de notificaciones funciona
- [ ] CMS permite crear/editar artículos
- [ ] Analytics muestra estadísticas

---

**Última actualización:** 26 de Octubre 2025  
**Backend URL:** https://politicaargentinaofficialsite-production.up.railway.app  
**Frontend URL:** https://politicaargentina.com

