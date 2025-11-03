# 🗄️ CONFIGURACIÓN DE SUPABASE

## 📋 Guía Completa de Configuración

### Paso 1: Crear Proyecto en Supabase

1. **Ir a Supabase:**
   - Visita: https://supabase.com
   - Click en "Start your project"
   - Inicia sesión con GitHub

2. **Crear Nuevo Proyecto:**
   - Click en "New Project"
   - Nombre: `politica-argentina`
   - Database Password: (guarda esta contraseña)
   - Region: `South America (São Paulo)` (más cercano a Argentina)
   - Plan: Free (para empezar)
   - Click "Create new project"

3. **Esperar Inicialización:**
   - El proyecto tarda ~2 minutos en inicializarse

---

### Paso 2: Configurar Base de Datos

1. **Ir al SQL Editor:**
   - En el dashboard de Supabase
   - Click en "SQL Editor" en el menú lateral

2. **Ejecutar Schema:**
   - Click en "New query"
   - Copiar todo el contenido de `supabase/schema.sql`
   - Pegar en el editor
   - Click en "Run" (o Ctrl+Enter)

3. **Verificar Tablas:**
   - Ir a "Table Editor"
   - Deberías ver las tablas:
     - `usuarios`
     - `categorias`
     - `tags`
     - `noticias`
     - `noticias_tags`

---

### Paso 3: Obtener Credenciales

1. **API Keys:**
   - Ir a "Settings" → "API"
   - Copiar:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

2. **Database URL:**
   - Ir a "Settings" → "Database"
   - Copiar "Connection string" → `DATABASE_URL`

---

### Paso 4: Configurar Variables de Entorno

1. **Crear archivo `.env.local`:**
```bash
# En la raíz del proyecto
touch .env.local
```

2. **Agregar variables:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.tu-proyecto.supabase.co:5432/postgres
```

3. **En Vercel (Producción):**
   - Ir a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agregar las mismas variables

---

### Paso 5: Instalar Dependencias

```bash
npm install @supabase/supabase-js
```

---

## 📊 ESTRUCTURA DE BASE DE DATOS

### Tablas Principales:

#### 1. **usuarios**
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- name (VARCHAR)
- role (VARCHAR: admin, editor, author)
- avatar_url (TEXT)
- created_at, updated_at (TIMESTAMP)
```

#### 2. **categorias**
```sql
- id (UUID, PK)
- name (VARCHAR)
- slug (VARCHAR, UNIQUE)
- description (TEXT)
- color (VARCHAR)
- icon (VARCHAR)
- order (INTEGER)
- created_at (TIMESTAMP)
```

**Categorías iniciales:**
- Economía (verde #16A34A)
- Política (azul #2563EB)
- Judicial (rojo #DC2626)
- Internacional (púrpura #9333EA)
- Sociedad (naranja #EA580C)

#### 3. **tags**
```sql
- id (UUID, PK)
- name (VARCHAR)
- slug (VARCHAR, UNIQUE)
- created_at (TIMESTAMP)
```

#### 4. **noticias**
```sql
- id (UUID, PK)
- title (VARCHAR)
- subtitle (TEXT)
- slug (VARCHAR, UNIQUE)
- category_id (UUID, FK)
- excerpt (TEXT)
- content (TEXT)
- image_url (TEXT)
- author_id (UUID, FK)
- views (INTEGER)
- status (VARCHAR: draft, published, archived)
- is_breaking (BOOLEAN)
- published_at (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)
```

#### 5. **noticias_tags** (relación muchos a muchos)
```sql
- noticia_id (UUID, FK)
- tag_id (UUID, FK)
- PRIMARY KEY (noticia_id, tag_id)
```

---

## 🔐 SEGURIDAD (RLS - Row Level Security)

### Políticas Implementadas:

1. **Noticias Públicas:**
   - Cualquiera puede ver noticias con `status = 'published'`

2. **Usuarios Autenticados:**
   - Pueden ver todas las noticias
   - Pueden crear noticias
   - Pueden actualizar sus propias noticias

3. **Administradores:**
   - Pueden actualizar cualquier noticia
   - Pueden eliminar noticias

---

## 🚀 FUNCIONES ÚTILES

### 1. Incrementar Vistas
```sql
SELECT increment_views('noticia-uuid-aqui');
```

### 2. Generar Slug
```sql
SELECT generate_slug('Título de la Noticia Aquí');
-- Resultado: titulo-de-la-noticia-aqui
```

### 3. Búsqueda Full-Text
```sql
SELECT * FROM noticias
WHERE to_tsvector('spanish', title || ' ' || excerpt || ' ' || content)
@@ to_tsquery('spanish', 'dólar & blue');
```

---

## 📊 VISTAS CREADAS

### 1. **noticias_completas**
Vista con toda la información de noticias, incluyendo categoría, autor y tags.

```sql
SELECT * FROM noticias_completas
WHERE status = 'published'
ORDER BY published_at DESC
LIMIT 10;
```

### 2. **estadisticas_dashboard**
Vista con estadísticas generales para el dashboard.

```sql
SELECT * FROM estadisticas_dashboard;
```

---

## 🔄 MIGRACIONES

### Agregar Nueva Columna:
```sql
ALTER TABLE noticias
ADD COLUMN nueva_columna VARCHAR(255);
```

### Crear Nuevo Index:
```sql
CREATE INDEX idx_noticias_nueva_columna
ON noticias(nueva_columna);
```

---

## 🧪 DATOS DE PRUEBA

### Crear Usuario Admin:
```sql
INSERT INTO usuarios (email, name, role)
VALUES ('admin@politicaargentina.com', 'Admin', 'admin');
```

### Crear Noticia de Prueba:
```sql
INSERT INTO noticias (
  title, slug, category_id, excerpt, content,
  image_url, author_id, status
)
VALUES (
  'Noticia de Prueba',
  'noticia-de-prueba',
  (SELECT id FROM categorias WHERE slug = 'economia'),
  'Esta es una noticia de prueba',
  'Contenido completo de la noticia de prueba',
  '/images/economia-argentina-1.jpg',
  (SELECT id FROM usuarios WHERE role = 'admin' LIMIT 1),
  'published'
);
```

---

## 📈 MONITOREO

### Ver Noticias Más Vistas:
```sql
SELECT title, views, published_at
FROM noticias
WHERE status = 'published'
ORDER BY views DESC
LIMIT 10;
```

### Ver Noticias por Categoría:
```sql
SELECT c.name, COUNT(n.id) as total
FROM categorias c
LEFT JOIN noticias n ON c.id = n.category_id
GROUP BY c.name
ORDER BY total DESC;
```

### Ver Autores Más Activos:
```sql
SELECT u.name, COUNT(n.id) as total_noticias
FROM usuarios u
LEFT JOIN noticias n ON u.id = n.author_id
GROUP BY u.name
ORDER BY total_noticias DESC;
```

---

## 🔧 TROUBLESHOOTING

### Error: "relation does not exist"
**Solución:** Ejecutar el schema.sql completo

### Error: "permission denied"
**Solución:** Verificar políticas RLS y roles

### Error: "duplicate key value"
**Solución:** El slug ya existe, generar uno único

---

## 📚 RECURSOS

- **Documentación Supabase:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Supabase JS Client:** https://supabase.com/docs/reference/javascript

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Proyecto creado en Supabase
- [ ] Schema ejecutado correctamente
- [ ] Tablas verificadas en Table Editor
- [ ] API Keys copiadas
- [ ] Variables de entorno configuradas
- [ ] Dependencias instaladas
- [ ] Conexión probada
- [ ] Datos iniciales creados
- [ ] RLS configurado
- [ ] Políticas de seguridad verificadas

---

**Estado:** ✅ CONFIGURACIÓN COMPLETA  
**Última actualización:** 2025-11-03

