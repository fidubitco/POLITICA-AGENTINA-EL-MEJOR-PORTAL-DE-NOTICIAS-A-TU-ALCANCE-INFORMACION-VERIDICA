# 🚀 DESPLIEGUE INMEDIATO - POLITICA ARGENTINA

## ⚡ Sigue estos pasos EXACTAMENTE

### PASO 1: Crear Repositorio en GitHub (5 minutos)

1. **Abre tu navegador** y ve a: https://github.com/new

2. **Configura el repositorio:**
   - Repository name: `politica-argentina`
   - Description: `Portal de noticias de clase mundial con Next.js 15`
   - Visibilidad: **Public** ✅
   - ❌ NO marques "Initialize with README"
   - ❌ NO agregues .gitignore
   - ❌ NO agregues licencia

3. **Click en "Create repository"**

4. **Copia la URL del repo** que aparece (algo como):
   ```
   https://github.com/TU-USUARIO/politica-argentina.git
   ```

5. **Vuelve a tu terminal** y ejecuta estos comandos:

```bash
cd "/Users/usuario/POLITICA ARGENTINA/politica-argentina"

# Agregar el repositorio remoto (REEMPLAZA con TU URL)
git remote add origin https://github.com/TU-USUARIO/politica-argentina.git

# Subir el código
git push -u origin main
```

**¿Error de autenticación?** 
- GitHub ya no acepta passwords
- Usa Personal Access Token:
  1. Ve a: https://github.com/settings/tokens
  2. Generate new token (classic)
  3. Marca: `repo` (todos los permisos de repo)
  4. Genera y copia el token
  5. Úsalo como password cuando git lo pida

---

### PASO 2: Crear Base de Datos en Neon (3 minutos)

1. **Ve a**: https://neon.tech

2. **Sign up / Login** (puedes usar GitHub)

3. **Create new project:**
   - Name: `politica-argentina`
   - Region: Elige el más cercano (ej: AWS / US East)
   - PostgreSQL version: 16 (default)

4. **Click "Create Project"**

5. **Copia la Connection String:**
   - Aparecerá algo como:
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
   - **GUÁRDALA** - la necesitarás en el siguiente paso

---

### PASO 3: Desplegar en Vercel (5 minutos)

1. **Ve a**: https://vercel.com

2. **Sign up / Login** con tu cuenta de GitHub

3. **Click "Add New Project"**

4. **Import Git Repository:**
   - Vercel mostrará tus repos de GitHub
   - Busca: `politica-argentina`
   - Click "Import"

5. **Configurar el proyecto:**
   - Framework Preset: **Next.js** (debería detectarlo automáticamente)
   - Root Directory: `./` (default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

6. **⚠️ IMPORTANTE: Configurar Environment Variables:**

Click en "Environment Variables" y agrega TODAS estas:

```bash
# Database
DATABASE_URL=postgresql://... (PEGA tu connection string de Neon)

# Auth (genera con: openssl rand -base64 32)
AUTH_SECRET=tu_secreto_generado_aqui
AUTH_TRUST_HOST=true

# Site
NEXT_PUBLIC_SITE_URL=https://politica-argentina.vercel.app
NEXT_PUBLIC_SITE_NAME=POLITICA ARGENTINA

# Google (opcional por ahora, puedes agregarlo después)
# NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=tu_codigo
# GA_MEASUREMENT_ID=G-XXXXXXX

# OpenAI (opcional, solo si quieres autogeneración con IA)
# OPENAI_API_KEY=sk-...
```

**Para generar AUTH_SECRET:**
```bash
# En tu terminal ejecuta:
openssl rand -base64 32
# Copia el resultado y pégalo arriba
```

7. **Click "Deploy"**

⏱️ Espera 2-3 minutos mientras Vercel hace el build...

---

### PASO 4: Ejecutar Migraciones (2 minutos)

Una vez que el deploy termine:

**Opción A: Desde tu computadora (recomendado)**

1. **Actualiza tu `.env.local`:**
```bash
cd "/Users/usuario/POLITICA ARGENTINA/politica-argentina"

# Edita .env.local y pega tu DATABASE_URL de Neon
nano .env.local
# o usa tu editor favorito
```

2. **Ejecuta las migraciones:**
```bash
pnpm prisma migrate deploy
pnpm seed
```

**Opción B: Desde Vercel CLI**

1. **Instala Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login y ejecuta:**
```bash
vercel login
cd "/Users/usuario/POLITICA ARGENTINA/politica-argentina"
vercel env pull .env.local
pnpm prisma migrate deploy
pnpm seed
```

---

### PASO 5: ¡Verificar que Funciona! (2 minutos)

1. **Ve a tu URL de Vercel:**
   ```
   https://politica-argentina.vercel.app
   ```

2. **Deberías ver:**
   - ✅ Home con el post de bienvenida
   - ✅ Header con categorías
   - ✅ Footer con enlaces

3. **Prueba el login:**
   - Ve a: `https://politica-argentina.vercel.app/login`
   - Email: `admin@politicaargentina.com`
   - Password: `admin123`

4. **Accede al admin:**
   - Deberías estar en: `/admin`
   - Ver dashboard con estadísticas
   - Ver el post de ejemplo

**¿Funciona todo?** ✅ **¡FELICITACIONES! Tu portal está LIVE**

---

### PASO 6: Configurar Dominio Personalizado (IONOS) (10 minutos)

1. **En Vercel:**
   - Ve a tu proyecto
   - Settings → Domains
   - Add Domain
   - Escribe: `www.politicaargentina.com`
   - Click "Add"

2. **Vercel te mostrará:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **En tu panel de IONOS:**
   - Ve a: Dominios → DNS Settings
   - Agregar nuevo registro:
     - Tipo: `CNAME`
     - Host: `www`
     - Apunta a: `cname.vercel-dns.com`
     - TTL: 3600 (1 hora)
   - Guardar

4. **Para el dominio apex (sin www):**
   
   En IONOS agrega también:
   ```
   Tipo: A
   Host: @
   IP: 76.76.21.21
   TTL: 3600
   ```

5. **Espera propagación:**
   - Puede tomar de 15 minutos a 48 horas
   - Verifica en: https://www.whatsmydns.net

6. **Actualiza la variable de entorno en Vercel:**
   - Settings → Environment Variables
   - Edita `NEXT_PUBLIC_SITE_URL`
   - Nuevo valor: `https://www.politicaargentina.com`
   - Redeploy: Deployments → ... → Redeploy

---

### PASO 7: Configurar Google Search Console (5 minutos)

1. **Ve a:** https://search.google.com/search-console

2. **Agregar propiedad:**
   - Tipo: URL prefix
   - URL: `https://www.politicaargentina.com`

3. **Verificar:**
   - Método: HTML tag
   - Copia el código de verificación (ej: `abc123def456`)

4. **Agrega en Vercel:**
   - Environment Variables
   - Nueva variable:
     ```
     NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123def456
     ```
   - Redeploy

5. **Vuelve a Search Console y click "Verify"**

6. **Enviar sitemaps:**
   - En Search Console → Sitemaps
   - Agregar estos sitemaps:
     - `sitemap.xml`
     - `news-sitemap.xml`
     - `image-sitemap.xml`

---

### PASO 8: Configurar Vercel KV (Opcional, 3 minutos)

Para colas más rápidas:

1. **En tu proyecto de Vercel:**
   - Storage → Create Database
   - Tipo: KV
   - Name: `politica-argentina-kv`
   - Region: Misma que tu proyecto

2. **Connect to Project:**
   - Las variables se agregan automáticamente
   - No necesitas hacer nada más

3. **Redeploy** para que tome efecto

---

### PASO 9: Verificar Crons (1 minuto)

1. **En Vercel:**
   - Settings → Cron Jobs
   - Deberías ver:
     - ✅ `/api/seo/daily` - Diario 3 AM
     - ✅ `/api/seo/ping` - Diario 3:05 AM
     - ✅ `/api/ingest` - Cada 15 min
     - ✅ `/api/worker` - Cada 2 min

2. **¿No aparecen?**
   - Verifica que `vercel.json` esté en el root
   - Haz un nuevo commit y push
   - Redeploy

---

## ✅ CHECKLIST FINAL

Marca cada item cuando lo completes:

- [ ] ✅ Repositorio creado en GitHub
- [ ] ✅ Código subido a GitHub
- [ ] ✅ Base de datos creada en Neon
- [ ] ✅ Proyecto desplegado en Vercel
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Migraciones ejecutadas
- [ ] ✅ Seed ejecutado (usuarios y categorías)
- [ ] ✅ Sitio accesible en Vercel URL
- [ ] ✅ Login funciona
- [ ] ✅ Admin dashboard funciona
- [ ] ✅ Dominio personalizado configurado (opcional)
- [ ] ✅ Google Search Console (opcional)
- [ ] ✅ Vercel KV configurado (opcional)
- [ ] ✅ Crons verificados

---

## 🆘 PROBLEMAS COMUNES

### "Error: Prisma Client not initialized"
```bash
pnpm prisma generate
git add -A
git commit -m "fix: regenerate prisma client"
git push
```

### "Database connection failed"
- Verifica que `DATABASE_URL` esté correcta en Vercel
- Debe terminar con `?sslmode=require`
- Asegúrate de no tener espacios al copiar

### "Build failed"
- Revisa los logs en Vercel
- Probablemente falta una variable de entorno
- Asegúrate de tener `AUTH_SECRET`

### "Cannot find module"
```bash
rm -rf node_modules .next
pnpm install
git add -A
git commit -m "fix: reinstall dependencies"
git push
```

### "Crons no aparecen"
- Los crons solo funcionan en producción
- Verifica que `vercel.json` esté en el root
- Plan Hobby de Vercel tiene crons gratis con límites

---

## 📊 DESPUÉS DEL DEPLOY

### Primeras 24 horas:
1. ✅ Cambiar password del admin
2. ✅ Crear 3-5 posts de prueba
3. ✅ Verificar que los sitemaps funcionen
4. ✅ Probar el autoposting (si lo activaste)
5. ✅ Verificar Google Analytics (si lo configuraste)

### Primera semana:
1. ✅ Publicar 10-20 posts de calidad
2. ✅ Configurar fuentes RSS
3. ✅ Revisar auditoría SEO
4. ✅ Enviar sitemap a Google
5. ✅ Aplicar a Google News

### Primer mes:
1. ✅ 50-100 posts publicados
2. ✅ Monitorear analytics
3. ✅ Optimizar según auditoría
4. ✅ Construir backlinks
5. ✅ Promocionar en redes sociales

---

## 🎉 ¡LISTO!

Si seguiste todos los pasos, tu portal debería estar **100% funcional** y **accesible públicamente**.

**URLs para verificar:**
- 🌐 Sitio: `https://politica-argentina.vercel.app` o tu dominio
- 🔐 Admin: `/admin`
- 🔑 Login: `/login`
- 🗺️ Sitemap: `/sitemap.xml`
- 📰 News: `/news-sitemap.xml`
- 🖼️ Images: `/image-sitemap.xml`

**Credenciales default:**
- Email: `admin@politicaargentina.com`
- Password: `admin123`

**¿Problemas?** Revisa la sección de problemas comunes arriba.

**¿Todo funciona?** ¡FELICITACIONES! 🎊

---

**Siguiente:** Lee `INSTRUCCIONES_USUARIO.md` para aprender a usar todas las funcionalidades.

**Desarrollado con ❤️ para POLITICA ARGENTINA**

