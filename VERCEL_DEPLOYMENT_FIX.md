# 🚨 FIX ERRORES DE DEPLOYMENT EN VERCEL

## ❌ ERRORES REPORTADOS

1. **Deployment fallando en Vercel**
2. **Errores 404 y 403**
3. **Errores de base de datos**
4. **Cambios no se ven en politicaargentina.com**

---

## ✅ SOLUCIONES IMPLEMENTADAS

### 1. **Corregido `vercel.json`**

**PROBLEMA**: `images.domains` está deprecated en Next.js 14+

**SOLUCIÓN**: Cambiado a `images.remotePatterns`

```json
{
  "images": {
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "images.unsplash.com"
      },
      {
        "protocol": "https",
        "hostname": "source.unsplash.com"
      },
      {
        "protocol": "https",
        "hostname": "via.placeholder.com"
      },
      {
        "protocol": "https",
        "hostname": "res.cloudinary.com"
      },
      {
        "protocol": "https",
        "hostname": "politicaargentina.com"
      }
    ],
    "formats": ["image/avif", "image/webp"],
    "sizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  }
}
```

### 2. **Variables de Entorno en Vercel**

**PROBLEMA**: Faltan variables de entorno necesarias

**SOLUCIÓN**: Configurar en Vercel Dashboard

#### Variables REQUERIDAS (mínimo para que funcione):

```bash
# NextAuth.js (CRÍTICO)
NEXTAUTH_URL=https://politicaargentina.com
NEXTAUTH_SECRET=genera-un-secret-aleatorio-aqui

# Push Notifications (OPCIONAL pero recomendado)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=tu-vapid-public-key
VAPID_PRIVATE_KEY=tu-vapid-private-key
VAPID_SUBJECT=mailto:admin@politicaargentina.com
```

#### Variables OPCIONALES (para features avanzadas):

```bash
# Database (solo si usas base de datos)
DATABASE_URL=postgresql://user:password@host:5432/database
DIRECT_URL=postgresql://user:password@host:5432/database

# Supabase (solo si usas Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI (solo si usas AI)
OPENAI_API_KEY=sk-your-openai-key

# Redis (solo si usas cache)
REDIS_URL=redis://localhost:6379
```

### 3. **Cómo Configurar Variables en Vercel**

1. Ve a: https://vercel.com/tu-proyecto/settings/environment-variables
2. Agrega cada variable:
   - **Key**: Nombre de la variable (ej: `NEXTAUTH_SECRET`)
   - **Value**: Valor de la variable
   - **Environment**: Selecciona `Production`, `Preview`, y `Development`
3. Click en **Save**
4. **Redeploy** el proyecto

### 4. **Generar NEXTAUTH_SECRET**

```bash
# En tu terminal local:
openssl rand -base64 32
```

Copia el resultado y úsalo como valor de `NEXTAUTH_SECRET` en Vercel.

### 5. **Generar VAPID Keys (para Push Notifications)**

```bash
# En tu terminal local:
npx web-push generate-vapid-keys
```

Esto te dará:
- **Public Key**: Úsalo para `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- **Private Key**: Úsalo para `VAPID_PRIVATE_KEY`

---

## 🔧 CONFIGURACIÓN SIMPLIFICADA (SIN BASE DE DATOS)

Si NO quieres usar base de datos por ahora, el proyecto funcionará con datos mock.

**Variables mínimas necesarias:**

```bash
NEXTAUTH_URL=https://politicaargentina.com
NEXTAUTH_SECRET=tu-secret-generado-con-openssl
```

**Eso es TODO.** El resto es opcional.

---

## 🚀 PASOS PARA REDEPLOY EN VERCEL

### Opción 1: Redeploy desde Vercel Dashboard

1. Ve a: https://vercel.com/tu-proyecto/deployments
2. Encuentra el último deployment
3. Click en los **3 puntos** (...)
4. Click en **Redeploy**
5. Marca **Use existing Build Cache** = **NO** (desmarcar)
6. Click en **Redeploy**

### Opción 2: Redeploy desde Git

1. Haz un cambio mínimo (ej: agregar un espacio en un archivo)
2. Commit y push:
   ```bash
   git add .
   git commit -m "fix: Force redeploy"
   git push origin main
   ```
3. Vercel detectará el cambio y hará redeploy automáticamente

### Opción 3: Redeploy Manual (este commit)

Ya he hecho cambios en `vercel.json`. Solo necesitas:

```bash
git add vercel.json VERCEL_DEPLOYMENT_FIX.md
git commit -m "fix: Update vercel.json to use remotePatterns instead of domains"
git push origin 2025-10-30-xlea-32a18
```

---

## 🔍 VERIFICAR ERRORES EN VERCEL

### 1. Ver Logs de Deployment

1. Ve a: https://vercel.com/tu-proyecto/deployments
2. Click en el deployment más reciente
3. Ve a la pestaña **Build Logs**
4. Busca errores en rojo

### 2. Ver Logs de Runtime

1. En el mismo deployment, ve a **Function Logs**
2. Aquí verás errores que ocurren cuando el sitio está corriendo

### 3. Errores Comunes

#### Error: "Missing environment variable"
**Solución**: Agrega la variable en Vercel Settings → Environment Variables

#### Error: "Module not found"
**Solución**: Verifica que el módulo esté en `package.json` y haz `npm install`

#### Error: "Build failed"
**Solución**: Corre `npm run build` localmente para ver el error exacto

#### Error: "Database connection failed"
**Solución**: Verifica que `DATABASE_URL` esté correcta o comenta el código de base de datos

---

## 🎯 FIX ERRORES 404 Y 403

### Error 404 (Not Found)

**Causas comunes:**
1. Ruta no existe en el código
2. Archivo estático no está en `public/`
3. API route no está definida

**Solución:**
- Verifica que la ruta exista en `app/` o `pages/`
- Verifica que los archivos estáticos estén en `public/`
- Verifica que las API routes estén en `app/api/`

### Error 403 (Forbidden)

**Causas comunes:**
1. Permisos de archivo incorrectos
2. CORS bloqueando requests
3. Headers de seguridad demasiado restrictivos

**Solución:**
- Verifica los headers en `vercel.json`
- Agrega CORS headers si es necesario
- Verifica que no haya `.htaccess` o reglas de firewall

---

## 🗄️ FIX ERRORES DE BASE DE DATOS

### Opción 1: Deshabilitar Base de Datos Temporalmente

Si no necesitas base de datos ahora, puedes comentar el código:

**En `app/api/articles/route.ts` y otros API routes:**

```typescript
// Comentar imports de Prisma/Drizzle
// import { db } from '@/lib/db';

// Usar datos mock en su lugar
export async function GET() {
  const mockArticles = [
    // ... tus artículos mock
  ];
  
  return NextResponse.json({
    success: true,
    data: mockArticles
  });
}
```

### Opción 2: Configurar Base de Datos Correctamente

#### Si usas Supabase:

1. Ve a: https://supabase.com/dashboard
2. Crea un nuevo proyecto
3. Ve a Settings → Database
4. Copia la **Connection String**
5. Agrégala como `DATABASE_URL` en Vercel

#### Si usas MySQL/PostgreSQL:

1. Necesitas un servidor de base de datos
2. Opciones:
   - **PlanetScale** (MySQL gratuito)
   - **Neon** (PostgreSQL gratuito)
   - **Railway** (MySQL/PostgreSQL)
3. Copia la connection string
4. Agrégala como `DATABASE_URL` en Vercel

### Opción 3: Usar Solo Datos Mock (Recomendado para testing)

El proyecto ya tiene datos mock en `app/page.tsx`. Si no configuras base de datos, usará los mock automáticamente.

---

## ✅ CHECKLIST DE DEPLOYMENT

- [ ] `vercel.json` corregido (remotePatterns en lugar de domains)
- [ ] Variables de entorno configuradas en Vercel
- [ ] `NEXTAUTH_SECRET` generado y agregado
- [ ] Build local exitoso (`npm run build`)
- [ ] Commit y push de cambios
- [ ] Redeploy en Vercel (sin cache)
- [ ] Verificar logs de deployment
- [ ] Verificar que el sitio carga sin errores
- [ ] Hard refresh en el navegador (`Cmd + Shift + R`)
- [ ] Verificar en modo incógnito

---

## 🆘 SI SIGUE SIN FUNCIONAR

1. **Comparte los logs de Vercel**:
   - Ve a Vercel → Deployments → Último deployment → Build Logs
   - Copia TODO el log (especialmente las líneas en rojo)
   - Compártelo conmigo

2. **Comparte los errores del navegador**:
   - Abre DevTools (F12)
   - Ve a Console
   - Copia todos los errores en rojo
   - Compártelos conmigo

3. **Verifica el deployment status**:
   - ¿El deployment dice "Ready" o "Failed"?
   - ¿Qué mensaje de error muestra?

---

**Fecha:** 2025-11-02 20:15:00 UTC  
**Cambios:** vercel.json corregido  
**Próximo paso:** Commit y push, luego redeploy en Vercel

