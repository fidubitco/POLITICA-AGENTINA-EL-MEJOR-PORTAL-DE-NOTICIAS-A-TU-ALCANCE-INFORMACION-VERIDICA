# 🚀 GUÍA DE DEPLOYMENT A PRODUCCIÓN

## ✅ PRE-REQUISITOS

Antes de hacer el deploy, asegúrate de tener:

- ✅ Cuenta de GitHub
- ✅ Cuenta de Vercel (conectada a GitHub)
- ✅ Base de datos Prisma configurada
- ✅ API Key de Gemini
- ✅ Build exitoso localmente

---

## 📋 PASO 1: PREPARAR VARIABLES DE ENTORNO EN VERCEL

Ve a tu proyecto en Vercel Dashboard y agrega estas variables:

```env
# ============================================
# DATABASE
# ============================================
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza181TjJEZzFDQ0l6RHlCRWJveDlGMkYiLCJhcGlfa2V5IjoiMDFLN00yUlkyVlZRM1czM0pXUlJRRkRBV1EiLCJ0ZW5hbnRfaWQiOiI4ZjZlZTIwZTcwNjljZDY4NWE1NTdlOGI1Y2EwY2U1ZmJlYzcwNGY1MzRmNGMzMWM5ZTFiZjY2NjQ3MzI1ODAwIiwiaW50ZXJuYWxfc2VjcmV0IjoiMGQ2NjFmZGYtMTc1NS00NjNhLTk5YjktMTU3NGRjYTU1N2M2In0.jfUPw05azcb_kPJLxd6E0oexoL7Zmw38t-La8gekQcg"

DIRECT_DATABASE_URL="postgres://8f6ee20e7069cd685a557e8b5ca0ce5fbec704f534f4c31c9e1bf66647325800:sk_9tXFs3aGNf514phyeu6F3@db.prisma.io:5432/postgres?sslmode=require"

# ============================================
# AUTHENTICATION
# ============================================
NEXTAUTH_SECRET="CAMBIAR_ESTE_SECRET_EN_PRODUCCION_CON_VALOR_ALEATORIO"
# Genera uno nuevo con: openssl rand -base64 32

NEXTAUTH_URL="https://TU-DOMINIO.vercel.app"
# Reemplaza con tu dominio real de Vercel

# ============================================
# SITE CONFIGURATION
# ============================================
NEXT_PUBLIC_SITE_URL="https://TU-DOMINIO.vercel.app"
NEXT_PUBLIC_SITE_NAME="Política Argentina"

# ============================================
# AI - GEMINI
# ============================================
GEMINI_API_KEY="AIzaSyAD7BsD0k02GPwGUAazQDGoKF--CgEG4DE"

# ============================================
# CRON JOBS
# ============================================
CRON_SECRET="CAMBIAR_ESTE_SECRET_TAMBIEN"
# Genera uno nuevo con: openssl rand -hex 32

# ============================================
# OPTIONAL - VERCEL KV (si lo activas)
# ============================================
# KV_URL=""
# KV_REST_API_URL=""
# KV_REST_API_TOKEN=""
# KV_REST_API_READ_ONLY_TOKEN=""
```

---

## 📋 PASO 2: PUSH A GITHUB

```bash
# 1. Verifica que estás en la rama correcta
git branch

# 2. Agrega todos los cambios
git add .

# 3. Commit con mensaje descriptivo
git commit -m "🚀 Production ready - Full optimization complete"

# 4. Push a GitHub
git push origin main
```

---

## 📋 PASO 3: CONFIGURAR VERCEL

### Opción A: Desde Vercel Dashboard (Recomendado)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Selecciona "Import Git Repository"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `politica-argentina`
5. Configura el proyecto:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install
   ```
6. Agrega las variables de entorno (del Paso 1)
7. Click en "Deploy"

### Opción B: Desde CLI

```bash
# 1. Instala Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Sigue las instrucciones en pantalla
```

---

## 📋 PASO 4: CONFIGURAR DOMINIO CUSTOM (Opcional)

Si tienes un dominio propio:

1. Ve a tu proyecto en Vercel Dashboard
2. Click en "Settings" > "Domains"
3. Agrega tu dominio: `politica-argentina.com`
4. Vercel te dará los DNS records
5. Configura en tu proveedor de dominio:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
6. Espera propagación DNS (5-30 minutos)

---

## 📋 PASO 5: POST-DEPLOYMENT CHECKLIST

### ✅ Verificaciones Obligatorias:

```bash
# 1. Homepage carga correctamente
https://TU-DOMINIO.vercel.app/

# 2. Login funciona
https://TU-DOMINIO.vercel.app/login

# 3. Admin dashboard accesible
https://TU-DOMINIO.vercel.app/admin

# 4. Página de categoría funciona
https://TU-DOMINIO.vercel.app/categoria/politica

# 5. Página de noticia funciona
https://TU-DOMINIO.vercel.app/noticia/[cualquier-slug]

# 6. Sitemaps accesibles
https://TU-DOMINIO.vercel.app/sitemap.xml
https://TU-DOMINIO.vercel.app/news-sitemap.xml
https://TU-DOMINIO.vercel.app/image-sitemap.xml

# 7. Robots.txt funciona
https://TU-DOMINIO.vercel.app/robots.txt

# 8. API routes responden
https://TU-DOMINIO.vercel.app/api/posts

# 9. Verifica que las imágenes cargan
# 10. Prueba responsive en móvil
```

### ✅ Performance Testing:

```bash
# 1. Lighthouse Audit
# Abre Chrome DevTools > Lighthouse > Generate Report

# Targets:
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 100

# 2. PageSpeed Insights
https://pagespeed.web.dev/
# Ingresa tu URL y verifica scores

# 3. GTmetrix
https://gtmetrix.com/
# Analiza performance y optimizations
```

---

## 📋 PASO 6: CONFIGURAR CRON JOBS

Los cron jobs ya están configurados en `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/ingest-news",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/translate",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/seo/daily",
      "schedule": "0 0 * * *"
    }
  ]
}
```

**⚠️ IMPORTANTE:** En el plan Hobby de Vercel, los cron jobs solo corren una vez al día. Para más frecuencia, necesitas upgrade a Pro.

---

## 📋 PASO 7: POPULAR LA BASE DE DATOS

### Opción 1: Trigger manual de ingesta

```bash
# Desde terminal
curl -X POST https://TU-DOMINIO.vercel.app/api/ingest-news \
  -H "Content-Type: application/json" \
  -d '{"secret": "test"}'

# O desde el navegador
https://TU-DOMINIO.vercel.app/admin/ingest
# Click en "Ingerir Noticias Ahora"
```

### Opción 2: Crear posts manualmente

```bash
# Ve a admin dashboard
https://TU-DOMINIO.vercel.app/admin/posts/new
# Crea posts manualmente
```

---

## 📋 PASO 8: SEO SUBMISSION

### Google Search Console:

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Verifica ownership (método HTML tag o DNS)
4. Submit sitemap:
   ```
   https://TU-DOMINIO.vercel.app/sitemap.xml
   https://TU-DOMINIO.vercel.app/news-sitemap.xml
   https://TU-DOMINIO.vercel.app/image-sitemap.xml
   ```

### Bing Webmaster Tools:

1. Ve a [bing.com/webmasters](https://www.bing.com/webmasters)
2. Agrega tu sitio
3. Verifica ownership
4. Submit sitemap

### Google News:

1. Ve a [publishercenter.google.com](https://publishercenter.google.com)
2. Registra tu sitio como fuente de noticias
3. Submit news sitemap
4. Espera aprobación (puede tomar días/semanas)

---

## 📋 PASO 9: MONITOREO Y ANALYTICS

### Vercel Analytics (Incluido):

- Automáticamente activo
- Ve a Dashboard > Analytics
- Métricas de performance en tiempo real

### Google Analytics (Opcional):

```typescript
// 1. Crea propiedad en analytics.google.com
// 2. Obtén Measurement ID (G-XXXXXXXXXX)
// 3. Agrega a app/layout.tsx:

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Error Tracking con Sentry (Opcional):

```bash
# 1. Instalar
pnpm add @sentry/nextjs

# 2. Configurar
npx @sentry/wizard@latest -i nextjs

# 3. Agrega DSN en .env
NEXT_PUBLIC_SENTRY_DSN="tu-dsn-aqui"
```

---

## 📋 PASO 10: BACKUPS Y SEGURIDAD

### Database Backups:

- ✅ Automático en Prisma.io
- Frecuencia: Diaria
- Retención: 7 días (Hobby plan)
- Upgrade para más retención

### Code Backups:

- ✅ GitHub (ya configurado)
- Crear releases/tags para versiones importantes:
  ```bash
  git tag -a v1.0.0 -m "Production release v1.0.0"
  git push origin v1.0.0
  ```

### Security Headers:

Ya configurados en `next.config.ts`:
```typescript
✅ HSTS
✅ X-Content-Type-Options
✅ X-Frame-Options
✅ Referrer-Policy
✅ Permissions-Policy
```

---

## 🔧 TROUBLESHOOTING

### Error: "Database connection failed"

```bash
# Verifica que DATABASE_URL está correctamente configurado
# Asegúrate que empiece con prisma+postgres://

# Regenera Prisma Client
pnpm prisma generate --no-engine
```

### Error: "NextAuth session error"

```bash
# Genera nuevo NEXTAUTH_SECRET
openssl rand -base64 32

# Actualiza en Vercel environment variables
# Redeploy
```

### Error: "Build failed"

```bash
# Limpia cache local
pnpm clean
rm -rf .next

# Rebuild
pnpm build

# Si funciona local, verifica env vars en Vercel
```

### Sitio lento:

```bash
# 1. Verifica imágenes estén optimizadas
# 2. Revisa bundle size
# 3. Activa Edge caching en Vercel
# 4. Considera CDN para imágenes
```

---

## 📊 MÉTRICAS DE ÉXITO

Después del deployment, monitorea:

### Performance:
- ⚡ Time to First Byte (TTFB) < 600ms
- ⚡ First Contentful Paint (FCP) < 1.8s
- ⚡ Largest Contentful Paint (LCP) < 2.5s
- ⚡ Cumulative Layout Shift (CLS) < 0.1

### Traffic:
- 📈 Unique visitors / día
- 📈 Pageviews / día
- 📈 Bounce rate < 60%
- 📈 Avg. session duration > 2 min

### SEO:
- 🔍 Indexed pages en Google
- 🔍 Organic search traffic
- 🔍 Average position en SERPs
- 🔍 Click-through rate (CTR)

---

## 🎉 ¡LISTO!

Tu portal **POLÍTICA ARGENTINA** está ahora **LIVE EN PRODUCCIÓN** 🚀

### Próximos pasos:

1. ✅ Compartir en redes sociales
2. ✅ Publicar contenido regularmente
3. ✅ Monitorear analytics
4. ✅ Iterar basado en feedback
5. ✅ Scale cuando sea necesario

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa logs en Vercel Dashboard
2. Verifica environment variables
3. Consulta documentación de Next.js
4. Revisa issues en GitHub del proyecto

---

**🎊 DEPLOYMENT COMPLETADO CON ÉXITO 🎊**

*Tu portal de noticias de clase mundial está ahora online y listo para recibir visitantes*

*Versión: 3.0.0*  
*Status: ✅ PRODUCTION*  
*Fecha: Octubre 2025*

