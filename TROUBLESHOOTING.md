# 🔧 TROUBLESHOOTING GUIDE

## Error: HomeSimple is not defined

### 📋 Descripción del Problema

```
vendor-Cifskgof.js:32 ReferenceError: HomeSimple is not defined
```

Este error indica que el navegador está cargando una versión **antigua** del build que no incluye el componente `HomeSimple`.

---

## ✅ SOLUCIÓN IMPLEMENTADA

### 1. **Código Corregido** ✅
- ✅ `HomeSimple` importado correctamente en `App.tsx`
- ✅ Nuevo build generado con hashes actualizados
- ✅ Código subido a GitHub
- ✅ Vercel desplegará automáticamente

### 2. **Nuevos Hashes Generados**
```
ANTES (build antiguo):
- vendor-Cifskgof.js
- index-Ct8RxzkA.js

DESPUÉS (build nuevo):
- vendor-react-DmQJ7EM4.js
- index-G8dwAyQR.js
- admin-BlOZ386L.js
- pages-Cv1YVkir.js
```

---

## 🔍 CÓMO VERIFICAR QUE SE SOLUCIONÓ

### Paso 1: Verificar Deploy en Vercel (2-4 minutos)

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto
3. Verás el nuevo deployment
4. Espera a que el status sea **"Ready"** (verde) ✅

### Paso 2: Limpiar Cache del Navegador

#### Opción A: Hard Refresh (Recomendado)
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

#### Opción B: Limpiar Cache Completo

**Chrome:**
1. Settings (⚙️)
2. Privacy and security
3. Clear browsing data
4. Seleccionar "Cached images and files"
5. Click "Clear data"

**Firefox:**
1. Settings (⚙️)
2. Privacy & Security
3. Cookies and Site Data
4. Clear Data
5. Seleccionar "Cached Web Content"
6. Click "Clear"

**Safari:**
1. Develop menu
2. Empty Caches
3. O: Safari → Preferences → Advanced → Show Develop menu

#### Opción C: Modo Incógnito/Privado
```
Chrome: Ctrl + Shift + N (Windows) / Cmd + Shift + N (Mac)
Firefox: Ctrl + Shift + P (Windows) / Cmd + Shift + P (Mac)
Safari: Cmd + Shift + N
```

### Paso 3: Verificar en la Consola

1. Abre https://politicaargentina.com
2. Presiona **F12** para abrir DevTools
3. Ve a la pestaña **Console**
4. **NO** debe aparecer el error "HomeSimple is not defined"
5. Verifica que los archivos JS tengan los nuevos hashes:
   - `vendor-react-DmQJ7EM4.js` ✅
   - `index-G8dwAyQR.js` ✅

---

## ⏱️ TIMELINE DEL DEPLOY

```
┌─────────────────────────────────────────────────────────┐
│ PROCESO DE DEPLOY EN VERCEL                            │
└─────────────────────────────────────────────────────────┘

1. GitHub recibe push ........................ 10 segundos
2. Vercel detecta cambios .................... 30 segundos
3. Vercel inicia build ....................... 30 segundos
4. Vercel ejecuta build ...................... 1-2 minutos
5. Vercel deploy a producción ................ 30 segundos
6. CDN propaga cambios ....................... 1-2 minutos

TOTAL: 3-5 minutos aproximadamente
```

---

## 🚨 SI EL ERROR PERSISTE

### Verificación 1: ¿Vercel completó el deploy?

```bash
# Verificar último commit en GitHub
git log -1 --oneline

# Debe mostrar:
# 219eb55 🔥 FORCE REBUILD - Fix HomeSimple error
```

Si el commit está en GitHub pero Vercel no lo detectó:
1. Ve a Vercel Dashboard
2. Click en tu proyecto
3. Click en "Redeploy" manualmente

### Verificación 2: ¿El navegador tiene cache?

Síntomas de cache:
- Los archivos JS tienen nombres antiguos (vendor-Cifskgof.js)
- El error persiste después de 5 minutos
- Funciona en modo incógnito pero no en modo normal

Solución:
1. Limpia cache del navegador (ver arriba)
2. Cierra TODAS las pestañas del sitio
3. Cierra el navegador completamente
4. Abre el navegador de nuevo
5. Ve a https://politicaargentina.com

### Verificación 3: ¿Vercel está usando el build correcto?

1. Abre https://politicaargentina.com
2. Abre DevTools (F12)
3. Ve a la pestaña **Network**
4. Recarga la página (F5)
5. Busca los archivos JS
6. Verifica que tengan los nuevos hashes:
   - `vendor-react-DmQJ7EM4.js` ✅
   - `index-G8dwAyQR.js` ✅

Si ves los hashes antiguos:
- Espera 2-3 minutos más
- El CDN puede tardar en propagar

---

## 📊 VERIFICACIÓN FINAL

### ✅ Checklist de Verificación

- [ ] Vercel deployment status: **Ready** (verde)
- [ ] Cache del navegador limpiado
- [ ] Hard refresh ejecutado (Ctrl+Shift+R)
- [ ] Consola sin error "HomeSimple is not defined"
- [ ] Archivos JS con nuevos hashes
- [ ] Sitio carga correctamente
- [ ] Dark/Light mode funciona
- [ ] Cambio de idiomas funciona

---

## ℹ️ SOBRE EL ERROR "inpage.js chainId"

```
inpage.js:154 Uncaught (in promise) TypeError: 
Cannot set property chainId of [object Object] which has only a getter
```

### ¿Qué es este error?

Este error proviene de **extensiones de wallet** instaladas en el navegador:
- MetaMask
- Coinbase Wallet
- Trust Wallet
- Etc.

### ¿Afecta mi sitio?

**NO.** Este error:
- ❌ NO es causado por tu código
- ❌ NO afecta la funcionalidad del sitio
- ❌ NO afecta el SEO
- ❌ NO afecta el rendimiento
- ✅ Es completamente externo
- ✅ Solo aparece si el usuario tiene esas extensiones

### ¿Cómo verificar?

1. Abre el sitio en modo incógnito (sin extensiones)
2. El error NO aparecerá
3. Esto confirma que es de las extensiones

### ¿Debo hacer algo?

**NO.** Puedes ignorar este error completamente.

---

## 🛠️ COMANDOS ÚTILES

### Rebuild Local

```bash
# Limpiar cache
rm -rf node_modules/.vite public dist .cache

# Rebuild
pnpm build

# Ver resultado
ls -lh public/assets/*.js
```

### Verificar Git

```bash
# Ver último commit
git log -1 --oneline

# Ver status
git status

# Ver archivos modificados
git diff HEAD~1
```

### Deploy Manual a Vercel

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📞 SOPORTE ADICIONAL

### Logs de Vercel

```bash
# Ver logs en tiempo real
vercel logs

# Ver logs de un deployment específico
vercel logs [deployment-url]
```

### Verificar Build Local

```bash
# Iniciar servidor local con el build
pnpm preview

# Abrir en navegador
# http://localhost:3000
```

### Verificar que HomeSimple existe

```bash
# Buscar el archivo
ls -la client/src/pages/HomeSimple.tsx

# Verificar import en App.tsx
grep "HomeSimple" client/src/App.tsx
```

Debe mostrar:
```typescript
import { HomeSimple } from './pages/HomeSimple';
```

---

## 🎯 RESUMEN

### El problema está resuelto si:

✅ Vercel deployment está "Ready"
✅ Archivos JS tienen nuevos hashes
✅ No hay error "HomeSimple is not defined" en consola
✅ El sitio carga correctamente

### Tiempo total estimado:

⏰ **3-5 minutos** desde el push a GitHub hasta que el sitio está actualizado

### Si después de 10 minutos el error persiste:

1. Limpia cache del navegador completamente
2. Prueba en modo incógnito
3. Prueba en otro navegador
4. Verifica que Vercel haya completado el deploy
5. Redeploy manualmente desde Vercel Dashboard

---

**Última actualización**: 27 de Octubre 2025
**Status**: ✅ Solución implementada y desplegada

