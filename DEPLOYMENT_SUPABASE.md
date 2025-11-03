# 🚀 Guía de Deployment con Supabase

## 📋 Pasos para Deployment Completo

### 1️⃣ Configurar Supabase (5 minutos)

#### A. Crear Proyecto en Supabase
1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Crea una cuenta o inicia sesión
3. Click en "New Project"
4. Completa:
   - **Name**: `politica-argentina-db`
   - **Database Password**: Guarda esta contraseña (la necesitarás)
   - **Region**: `South America (São Paulo)` (más cercano a Argentina)
   - **Pricing Plan**: Free (suficiente para empezar)
5. Click "Create new project" (tarda ~2 minutos)

#### B. Ejecutar Schema SQL
1. Una vez creado el proyecto, ve a **SQL Editor** (ícono en el menú izquierdo)
2. Click en "New query"
3. Copia TODO el contenido de `supabase/schema.sql`
4. Pega en el editor
5. Click en "Run" (botón verde abajo a la derecha)
6. Deberías ver: ✅ "Success. No rows returned"

#### C. Obtener Credenciales
1. Ve a **Settings** → **API** (en el menú izquierdo)
2. Copia estos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### 2️⃣ Configurar Variables de Entorno en Vercel (2 minutos)

#### Opción A: Desde la Web de Vercel
1. Ve a [https://vercel.com](https://vercel.com)
2. Selecciona tu proyecto `politica-argentina`
3. Ve a **Settings** → **Environment Variables**
4. Agrega estas 2 variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Marca las 3 opciones: Production, Preview, Development
6. Click "Save"

#### Opción B: Desde la Terminal (CLI)
```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Login
vercel login

# Configurar variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Pega tu URL y presiona Enter

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Pega tu key y presiona Enter
```

---

### 3️⃣ Deploy a Vercel (1 minuto)

```bash
# Asegúrate de estar en el directorio del proyecto
cd "/Users/usuario/Documents/SITIO WEB POLITICA ARGENTINA"

# Commit de los cambios
git add .
git commit -m "🚀 feat: Supabase integration ready for production"

# Push a GitHub (esto dispara el deploy automático en Vercel)
git push origin main
```

---

## ✅ Verificación del Deployment

### 1. Verificar Build en Vercel
1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a la pestaña "Deployments"
4. El último deployment debería estar "Building..." o "Ready"
5. Espera a que termine (~2-3 minutos)

### 2. Verificar que las Variables están Configuradas
```bash
# Desde la terminal
vercel env ls
```

Deberías ver:
```
NEXT_PUBLIC_SUPABASE_URL       production, preview, development
NEXT_PUBLIC_SUPABASE_ANON_KEY  production, preview, development
```

### 3. Probar la API
Una vez deployado, prueba estos endpoints:

```bash
# Obtener todas las noticias
curl https://politicaargentina.com/api/noticias

# Obtener categorías
curl https://politicaargentina.com/api/noticias?categorias=true
```

---

## 🔧 Troubleshooting

### Error: "supabaseUrl is required"
**Causa**: Las variables de entorno no están configuradas correctamente.

**Solución**:
1. Verifica que las variables estén en Vercel (Settings → Environment Variables)
2. Asegúrate de que los nombres sean EXACTOS:
   - `NEXT_PUBLIC_SUPABASE_URL` (no `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (no `SUPABASE_KEY`)
3. Redeploy manualmente: `vercel --prod`

### Error: "relation 'noticias' does not exist"
**Causa**: El schema SQL no se ejecutó correctamente en Supabase.

**Solución**:
1. Ve a Supabase → SQL Editor
2. Ejecuta nuevamente el contenido de `supabase/schema.sql`
3. Verifica que las tablas existan: Table Editor → deberías ver `usuarios`, `categorias`, `tags`, `noticias`, `noticias_tags`

### Error 500 en /api/noticias
**Causa**: Problema de conexión con Supabase.

**Solución**:
1. Verifica que el proyecto de Supabase esté activo (no pausado)
2. Verifica que la URL y la KEY sean correctas
3. Revisa los logs en Vercel: Dashboard → tu proyecto → Functions → selecciona `/api/noticias`

### Build falla en Vercel
**Causa**: Error de TypeScript o dependencias.

**Solución**:
```bash
# Prueba el build localmente primero
npm run build

# Si falla, revisa los errores y corrígelos
# Luego vuelve a hacer push
```

---

## 📊 Datos Iniciales

El schema SQL ya incluye datos iniciales:
- ✅ 5 categorías (Economía, Política, Judicial, Internacional, Sociedad)
- ✅ 3 usuarios de ejemplo (admin, editor, author)
- ✅ 10 tags comunes
- ✅ Funciones y triggers configurados

Para agregar noticias reales:
1. Usa el endpoint POST `/api/noticias`
2. O inserta directamente desde Supabase → Table Editor → `noticias`

---

## 🎯 Próximos Pasos (Opcional)

### 1. Migrar Noticias Actuales
Si quieres migrar las noticias de `app/data/noticias-completas.ts` a Supabase:

```typescript
// Script de migración (crear en scripts/migrate-noticias.ts)
import { createNoticia } from '@/lib/supabase';
import { todasLasNoticias } from '@/app/data/noticias-completas';

async function migrate() {
  for (const noticia of todasLasNoticias) {
    await createNoticia({
      titulo: noticia.title,
      subtitulo: noticia.subtitle,
      contenido: noticia.content || noticia.excerpt,
      resumen: noticia.excerpt,
      imagen_url: noticia.imageUrl,
      categoria_id: getCategoriaId(noticia.categorySlug),
      autor_id: 1, // Usuario admin
      es_destacada: noticia.isBreaking || false,
      publicada: true,
    });
  }
}
```

### 2. Configurar NextAuth (Autenticación)
Ver `SUPABASE_SETUP.md` sección "Integración con NextAuth.js"

### 3. Crear Panel de Administración
Ahora que tienes la base de datos lista, puedes crear:
- Dashboard de estadísticas
- CRUD de noticias
- Gestión de usuarios
- Editor WYSIWYG

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel: Dashboard → Functions
2. Revisa los logs en Supabase: Dashboard → Logs
3. Verifica la documentación: `SUPABASE_SETUP.md`

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sitio estará funcionando con:
- ✅ Base de datos PostgreSQL en Supabase
- ✅ API REST completa
- ✅ Deployment en Vercel
- ✅ Variables de entorno configuradas
- ✅ Listo para agregar noticias dinámicas

**URL de producción**: https://politicaargentina.com
**Panel de Supabase**: https://app.supabase.com/project/[tu-proyecto-id]
**Dashboard de Vercel**: https://vercel.com/dashboard

