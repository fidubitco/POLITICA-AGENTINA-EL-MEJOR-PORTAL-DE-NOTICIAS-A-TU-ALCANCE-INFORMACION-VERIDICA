# 📦 INSTALACIÓN Y CONFIGURACIÓN RÁPIDA

## 🚀 Pasos para Instalar Supabase

### 1. Instalar Dependencia
```bash
cd "/Users/usuario/Documents/SITIO WEB POLITICA ARGENTINA"
npm install @supabase/supabase-js
```

### 2. Crear Proyecto en Supabase
1. Ir a https://supabase.com
2. Crear nuevo proyecto: `politica-argentina`
3. Region: South America (São Paulo)
4. Guardar la contraseña de la base de datos

### 3. Ejecutar Schema
1. En Supabase Dashboard → SQL Editor
2. Copiar contenido de `supabase/schema.sql`
3. Ejecutar (Run)

### 4. Obtener Credenciales
En Supabase Dashboard → Settings → API:
- Project URL
- anon public key
- service_role key

### 5. Configurar Variables de Entorno
Crear archivo `.env.local` en la raíz:
```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-aqui
```

### 6. Verificar Instalación
```bash
npm run dev
```

Visitar: http://localhost:3000/admin

---

## 📊 ARCHIVOS CREADOS

### Backend:
- ✅ `lib/supabase.ts` - Cliente y helpers de Supabase
- ✅ `supabase/schema.sql` - Schema completo de BD
- ✅ `app/api/noticias/route.ts` - API GET y POST
- ✅ `app/api/noticias/[id]/route.ts` - API GET, PUT, DELETE

### Documentación:
- ✅ `SUPABASE_SETUP.md` - Guía completa
- ✅ `INSTALACION_SUPABASE.md` - Guía rápida

---

## 🎯 PRÓXIMOS PASOS

1. **Instalar Supabase:**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Crear proyecto en Supabase.com**

3. **Ejecutar schema SQL**

4. **Configurar variables de entorno**

5. **Rebuild y deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "feat: Supabase integration"
   git push origin main
   ```

---

## ✅ FEATURES IMPLEMENTADAS

### Base de Datos:
- ✅ 5 tablas (usuarios, categorías, tags, noticias, noticias_tags)
- ✅ Relaciones y foreign keys
- ✅ Indexes para performance
- ✅ Full-text search en español
- ✅ Row Level Security (RLS)
- ✅ Funciones helper (increment_views, generate_slug)
- ✅ Vistas (noticias_completas, estadisticas_dashboard)
- ✅ Triggers automáticos (updated_at)

### API Routes:
- ✅ GET /api/noticias (con filtros)
- ✅ POST /api/noticias (crear)
- ✅ GET /api/noticias/[id] (obtener una)
- ✅ PUT /api/noticias/[id] (actualizar)
- ✅ DELETE /api/noticias/[id] (eliminar)

### Helpers:
- ✅ getNoticias() con filtros
- ✅ getNoticiaById()
- ✅ createNoticia()
- ✅ updateNoticia()
- ✅ deleteNoticia()
- ✅ incrementViews()
- ✅ getCategorias()
- ✅ getTags()

---

## 🔐 SEGURIDAD

### RLS Policies:
- ✅ Noticias públicas visibles para todos
- ✅ Usuarios autenticados ven todo
- ✅ Autores editan sus noticias
- ✅ Admins editan cualquier noticia

---

**Estado:** ✅ LISTO PARA INSTALAR  
**Tiempo estimado:** 15-20 minutos

