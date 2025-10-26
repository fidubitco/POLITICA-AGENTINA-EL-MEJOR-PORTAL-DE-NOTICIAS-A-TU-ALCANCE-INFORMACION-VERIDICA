# 🚀 VERCEL SETUP - PASO A PASO

## ⚠️ IMPORTANTE
Este proyecto es **React + Vite**, NO Next.js.

---

## 📋 PASOS PARA CONFIGURAR VERCEL

### 1️⃣ Ir a Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2️⃣ Import Project
1. Click en **"Add New..."** → **"Project"**
2. Seleccionar el repositorio de GitHub:
   ```
   fidubitco/POLITICA-AGENTINA-EL-MEJOR-PORTAL-DE-NOTICIAS-A-TU-ALCANCE-INFORMACION-VERIDICA
   ```
3. Click en **"Import"**

### 3️⃣ Configure Project

#### ⚙️ Framework Preset
```
┌─────────────────────────────────────┐
│ Framework Preset:  [Other ▼]        │
└─────────────────────────────────────┘
```
**❌ NO seleccionar Next.js**  
**✅ Seleccionar "Other"**

#### 📁 Root Directory
```
┌─────────────────────────────────────┐
│ Root Directory:  [./]                │
└─────────────────────────────────────┘
```
Dejar como está (raíz del proyecto)

#### 🔨 Build and Output Settings

**Build Command:**
```bash
pnpm install && pnpm build
```

**Output Directory:**
```
public
```

**Install Command:**
```bash
pnpm install
```

**Development Command:**
```bash
pnpm dev:client
```

#### 🌐 Environment Variables (Opcional)
```
NODE_ENV=production
```

### 4️⃣ Deploy
Click en **"Deploy"**

Vercel comenzará el build. Debería ver:
```
✓ Building...
✓ Copying files...
✓ Deployment ready
```

---

## 🔧 SI EL DEPLOYMENT FALLA

### Error: "No Next.js version detected"

#### Solución 1: Cambiar Framework Preset
1. Ir a **Project Settings** → **General**
2. En **Framework Preset**, seleccionar **"Other"**
3. Click en **"Save"**
4. Hacer **Redeploy**

#### Solución 2: Verificar vercel.json
Asegurarse que el archivo `vercel.json` tiene:
```json
{
  "version": 2,
  "framework": null,
  ...
}
```

La línea `"framework": null` es **CRÍTICA**.

### Error: "Build failed"

#### Verificar Build Command
```bash
pnpm install && pnpm build
```

#### Verificar Output Directory
```
public
```

#### Verificar Node.js Version
En **Project Settings** → **General** → **Node.js Version**:
```
20.x
```

---

## ✅ VERIFICACIÓN POST-DEPLOYMENT

### 1. Verificar URLs
Abrir en el navegador:
- ✅ https://politicaargentina.com/
- ✅ https://politicaargentina.com/categoria/politica
- ✅ https://politicaargentina.com/noticia/1
- ✅ https://politicaargentina.com/admin/dashboard

### 2. Verificar Consola
Abrir DevTools (F12) → Console:
- ✅ 0 errores críticos
- ✅ Imágenes cargando
- ✅ No errores 404

### 3. Verificar Performance
En DevTools → Network:
- ✅ Load Time < 2s
- ✅ Assets cargando correctamente
- ✅ Imágenes con lazy loading

---

## 🎯 CONFIGURACIÓN FINAL

Una vez deployado exitosamente, la configuración debería verse así:

### Project Settings → General

```
┌─────────────────────────────────────────────────┐
│ Framework Preset:  Other                        │
│ Root Directory:    ./                           │
│ Node.js Version:   20.x                         │
│                                                 │
│ Build & Development Settings:                   │
│   Build Command:       pnpm install && pnpm build│
│   Output Directory:    public                   │
│   Install Command:     pnpm install             │
│   Development Command: pnpm dev:client          │
└─────────────────────────────────────────────────┘
```

### Domains

```
┌─────────────────────────────────────────────────┐
│ Production Domain:                              │
│   politicaargentina.com                         │
│   www.politicaargentina.com                     │
│                                                 │
│ Vercel Domain:                                  │
│   politica-argentina-xxx.vercel.app             │
└─────────────────────────────────────────────────┘
```

---

## 🔄 DEPLOYMENTS AUTOMÁTICOS

Cada vez que hagas push a `main`, Vercel hará deploy automáticamente:

```bash
git add -A
git commit -m "Update"
git push origin main
```

Vercel detectará el push y:
1. ✅ Clonará el repositorio
2. ✅ Ejecutará `pnpm install && pnpm build`
3. ✅ Desplegará los archivos de `public/`
4. ✅ Actualizará https://politicaargentina.com

---

## 📊 MONITORING

### Deployment Logs
```
Vercel Dashboard → Project → Deployments → [Latest] → View Logs
```

### Analytics
```
Vercel Dashboard → Project → Analytics
```

### Performance
```
Vercel Dashboard → Project → Speed Insights
```

---

## 🆘 TROUBLESHOOTING

### Problema: Rutas dan 404
**Solución**: Verificar que `vercel.json` tiene:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Problema: Imágenes no cargan
**Solución**: Verificar que `scripts/copy-public-files.js` se ejecuta en el build.

### Problema: Build muy lento
**Solución**: Agregar `.vercelignore` para excluir archivos innecesarios.

---

## ✅ CHECKLIST FINAL

- [ ] Framework Preset: **Other** (no Next.js)
- [ ] Build Command: `pnpm install && pnpm build`
- [ ] Output Directory: `public`
- [ ] Node.js Version: `20.x`
- [ ] `vercel.json` tiene `"framework": null`
- [ ] Deployment exitoso
- [ ] URLs funcionando
- [ ] Imágenes cargando
- [ ] 0 errores en consola
- [ ] Performance < 2s load time

---

**🟢 DEPLOYMENT EXITOSO EN VERCEL**

*Si todos los pasos están completos, el sitio debería estar live en https://politicaargentina.com*

