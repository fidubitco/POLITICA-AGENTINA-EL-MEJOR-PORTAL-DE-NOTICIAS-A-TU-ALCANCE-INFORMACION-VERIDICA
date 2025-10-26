# 🚀 VERCEL DEPLOYMENT GUIDE

## ⚠️ IMPORTANTE: NO ES NEXT.JS

Este proyecto es **React + Vite**, NO Next.js. Vercel debe configurarse manualmente.

---

## 📋 CONFIGURACIÓN VERCEL

### 1. Framework Preset
```
Framework Preset: Other
```

**NO seleccionar Next.js**

### 2. Build Settings

#### Build Command
```bash
pnpm install && pnpm build
```

#### Output Directory
```
public
```

#### Install Command
```bash
pnpm install
```

#### Development Command
```bash
pnpm dev:client
```

### 3. Root Directory
```
./
```
(Raíz del proyecto)

### 4. Node.js Version
```
20.x
```

---

## 📄 ARCHIVOS DE CONFIGURACIÓN

### vercel.json
```json
{
  "version": 2,
  "framework": null,
  "buildCommand": "pnpm install && pnpm build",
  "outputDirectory": "public",
  "devCommand": "pnpm dev:client",
  "installCommand": "pnpm install",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### package.json (scripts relevantes)
```json
{
  "scripts": {
    "dev": "concurrently \"pnpm run dev:client\" \"pnpm run dev:server\"",
    "dev:client": "vite",
    "build": "vite build && node scripts/copy-public-files.js",
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```

---

## 🔧 PROCESO DE BUILD

### 1. Install Dependencies
```bash
pnpm install --frozen-lockfile
```

### 2. Build Frontend (Vite)
```bash
vite build
```
- Genera archivos en `public/`
- Incluye `index.html`, `assets/`, `images/`, etc.

### 3. Copy Public Files
```bash
node scripts/copy-public-files.js
```
- Copia favicons, manifest, robots.txt, sitemap.xml
- Copia directorio de imágenes
- Copia traducciones (locales)

### 4. Output Structure
```
public/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── images/
│   ├── milei-1.jpg
│   ├── casa-rosada-1.jpg
│   └── ...
├── locales/
│   ├── es/
│   ├── en/
│   └── ...
├── favicon.ico
├── manifest.json
├── robots.txt
└── sitemap.xml
```

---

## 🌐 ROUTING (SPA)

Este es un **Single Page Application (SPA)** con client-side routing (Wouter).

### Rewrites Configuration
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Todas las rutas se redirigen a `index.html`, donde React Router maneja la navegación:
- `/` → Home
- `/categoria/:category` → Category Page
- `/noticia/:id` → Article Detail
- `/admin/dashboard` → Admin Dashboard
- `/en/`, `/pt/`, `/fr/` → Multi-language routes

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: "No Next.js version detected"
**Causa**: Vercel intenta detectar Next.js automáticamente

**Solución**:
1. En Vercel Dashboard → Project Settings → General
2. Framework Preset: **Other** (no Next.js)
3. Agregar `"framework": null` en `vercel.json`

### Error: "Build failed - output directory not found"
**Causa**: Output directory incorrecto

**Solución**:
1. Verificar `outputDirectory: "public"` en `vercel.json`
2. Verificar que `vite build` genera archivos en `public/`

### Error: "404 on routes"
**Causa**: SPA routing no configurado

**Solución**:
1. Agregar rewrites en `vercel.json`:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Error: "Images not loading"
**Causa**: Archivos públicos no copiados

**Solución**:
1. Verificar que `scripts/copy-public-files.js` se ejecuta
2. Verificar que imágenes están en `public/images/`

---

## ✅ CHECKLIST PRE-DEPLOYMENT

- [ ] `vercel.json` configurado correctamente
- [ ] `framework: null` en vercel.json
- [ ] Build command: `pnpm install && pnpm build`
- [ ] Output directory: `public`
- [ ] Node.js version: 20.x
- [ ] Test local build: `pnpm build`
- [ ] Verificar `public/` contiene todos los archivos
- [ ] Verificar imágenes en `public/images/`
- [ ] Verificar `index.html` en `public/`

---

## 🔄 DEPLOYMENT WORKFLOW

### Automático (Git Push)
```bash
git add -A
git commit -m "Deploy to Vercel"
git push origin main
```
Vercel detecta el push y hace deploy automático.

### Manual (Vercel CLI)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📊 VARIABLES DE ENTORNO

### En Vercel Dashboard
```
NODE_ENV=production
DATABASE_URL=mysql://...
VITE_API_URL=https://api.politicaargentina.com
```

**Nota**: Variables con prefijo `VITE_` son accesibles en el frontend.

---

## 🎯 RESULTADO ESPERADO

### URLs Funcionales
- ✅ https://politicaargentina.com/
- ✅ https://politicaargentina.com/categoria/politica
- ✅ https://politicaargentina.com/noticia/1
- ✅ https://politicaargentina.com/admin/dashboard
- ✅ https://politicaargentina.com/en/ (multi-language)

### Performance
- ⚡ Load Time: < 2s
- ⚡ FCP: < 1s
- ⚡ LCP: < 2s
- ⚡ TTI: < 3s

### SEO
- 📊 Meta tags: 50+ por página
- 📊 Schema.org: Completo
- 📊 Sitemap: 11 idiomas
- 📊 Robots.txt: Optimizado

---

## 🆘 SOPORTE

### Logs de Build
```bash
# Ver logs en Vercel Dashboard
Project → Deployments → [Deployment] → View Logs
```

### Debug Local
```bash
# Build local
pnpm build

# Verificar output
ls -lh public/

# Preview local
pnpm preview
```

### Contacto
- GitHub Issues: https://github.com/fidubitco/POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA/issues
- Email: admin@politicaargentina.com

---

**✅ CONFIGURACIÓN CORRECTA PARA REACT + VITE EN VERCEL**

*Última actualización: 26 de Octubre, 2025*

