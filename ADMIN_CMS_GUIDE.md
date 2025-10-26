# 🚀 GUÍA COMPLETA - ADMIN CMS CON IA

## ✅ SISTEMA COMPLETAMENTE FUNCIONAL

**Versión**: 4.0.0 Enterprise Grade  
**Estado**: 🟢 **100% FUNCIONAL**  
**Fecha**: 26 de Octubre, 2025

---

## 📊 ARQUITECTURA COMPLETA

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
├─────────────────────────────────────────────────────────────┤
│  • HomeSimple (Portal de noticias)                          │
│  • AdminDashboardEnterprise (Dashboard con stats)           │
│  • CMSEditor (Editor con IA) ← NUEVO                        │
│  • tRPC Client (API calls)                                  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express + tRPC)                  │
├─────────────────────────────────────────────────────────────┤
│  • Articles Router (CRUD + IA)                              │
│  • Analytics Router (Stats)                                 │
│  • Users Router (CRM)                                       │
│  • AI Service (Generate + Improve) ← FUNCIONAL              │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (MySQL 8.0)                      │
├─────────────────────────────────────────────────────────────┤
│  • 9 Tablas optimizadas                                     │
│  • Índices estratégicos                                     │
│  • Triggers automáticos                                     │
│  • Stored procedures                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 INSTALACIÓN Y CONFIGURACIÓN

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Configurar Base de Datos

#### Opción A: MySQL Local
```bash
# Instalar MySQL 8.0
brew install mysql  # macOS
# o
sudo apt install mysql-server  # Linux

# Iniciar MySQL
mysql.server start

# Crear base de datos
mysql -u root -p < database/schema-optimized.sql
```

#### Opción B: Docker
```bash
docker run -d \
  --name politica-db \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=politica_argentina \
  -p 3306:3306 \
  mysql:8.0

# Importar schema
docker exec -i politica-db mysql -uroot -ppassword politica_argentina < database/schema-optimized.sql
```

### 3. Variables de Entorno

Crear archivo `.env`:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=politica_argentina

# API
PORT=3001
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3001
```

### 4. Iniciar Servidores

#### Terminal 1: Backend
```bash
pnpm dev:server
```

Deberías ver:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 BACKEND ENTERPRISE GRADE - RUNNING                   ║
║                                                            ║
║   📡 Server:      http://localhost:3001                   ║
║   🔌 API:         http://localhost:3001/api/trpc          ║
║   ❤️  Health:      http://localhost:3001/health           ║
║   🌍 Environment: development                             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
✅ Database connected successfully
```

#### Terminal 2: Frontend
```bash
pnpm dev:client
```

Deberías ver:
```
  VITE v5.0.10  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🎯 USAR EL CMS CON IA

### Acceder al CMS
```
http://localhost:5173/admin/cms
```

### Funcionalidades

#### 1. Generar Artículo con IA 🤖

**Pasos**:
1. En el campo "Generar con IA", escribe un tema:
   ```
   Reforma económica de Milei 2025
   ```
2. Click en **"Generar"**
3. Espera 1-2 segundos
4. El sistema generará automáticamente:
   - ✅ Título optimizado
   - ✅ Extracto (resumen)
   - ✅ Contenido completo (HTML estructurado)
   - ✅ Tags automáticos

**Ejemplo de contenido generado**:
```html
<h2>Introducción</h2>
<p>En el contexto actual de la política argentina...</p>

<h2>Contexto Actual</h2>
<p>La situación actual en relación a...</p>

<h3>Factores Clave</h3>
<ul>
  <li><strong>Factor Económico:</strong> ...</li>
  <li><strong>Factor Social:</strong> ...</li>
  <li><strong>Factor Político:</strong> ...</li>
</ul>

<h2>Análisis de Expertos</h2>
<p>Según analistas políticos...</p>

<blockquote>
"Este es un momento decisivo para Argentina..."
</blockquote>

<h2>Conclusión</h2>
<p>En conclusión...</p>
```

#### 2. Mejorar Artículo con IA ✨

**Pasos**:
1. Escribe o pega contenido en el editor
2. Click en **"Mejorar con IA"**
3. El sistema mejorará:
   - ✅ Estructura (agrega H2, H3)
   - ✅ Contexto (intro y conclusión)
   - ✅ Formato (negritas, listas)
   - ✅ SEO (keywords resaltadas)

**Mejoras aplicadas**:
- Título optimizado para SEO
- Estructura mejorada con títulos y secciones
- Contenido expandido con contexto y perspectivas
- Palabras clave resaltadas
- Listas para mejor estructura

#### 3. Editar Manualmente

**Campos disponibles**:
- **Título** * (requerido)
- **Extracto** * (requerido)
- **Contenido** * (requerido, HTML permitido)
- **Categoría** (Política, Economía, Sociedad, etc.)
- **Autor** (nombre del autor)
- **Imagen** (URL de la imagen)
- **Estado** (Borrador, Publicado, Archivado)
- **Opciones**:
  - ☑️ Destacado
  - ☑️ Última Hora
- **Tags** (presiona Enter para agregar)

#### 4. Guardar Artículo

**Pasos**:
1. Completa al menos: Título, Extracto, Contenido
2. Click en **"Guardar"**
3. El artículo se guardará en la base de datos
4. Verás mensaje: "✅ Artículo guardado exitosamente! ID: X"

---

## 📊 ADMIN DASHBOARD

### Acceder al Dashboard
```
http://localhost:5173/admin/dashboard
```

### Estadísticas Mostradas

#### Cards de Métricas
1. **Total Artículos**
   - Total count
   - Publicados vs Borradores
   - Gradient azul

2. **Visualizaciones**
   - Total views
   - Promedio por artículo
   - Gradient verde

3. **Me Gusta**
   - Total likes
   - Promedio por artículo
   - Gradient morado

4. **Compartidos**
   - Total shares
   - Promedio por artículo
   - Gradient naranja

#### Top 5 Artículos
- Ranking (1-5)
- Imagen thumbnail
- Título
- Views, Likes, Categoría
- Botón de editar

#### Artículos Recientes
- Tabla con 10 artículos más recientes
- Columnas: Artículo, Categoría, Estado, Views, Fecha, Acciones
- Búsqueda y filtros
- Botones de editar y eliminar

---

## 🔌 API ENDPOINTS

### Articles

#### Listar Artículos
```typescript
trpc.articles.list.query({
  limit: 10,
  offset: 0,
  category: 'politica',
  status: 'published',
})
```

#### Obtener por ID
```typescript
trpc.articles.getById.query({ id: 1 })
```

#### Crear Artículo
```typescript
trpc.articles.create.mutate({
  title: 'Título del artículo',
  slug: 'titulo-del-articulo',
  excerpt: 'Resumen...',
  content: '<p>Contenido...</p>',
  category: 'Política',
  categorySlug: 'politica',
  author: 'Editor',
  imageUrl: '/images/imagen.jpg',
  status: 'published',
  featured: true,
  breaking: false,
  tags: ['política', 'argentina'],
})
```

#### Generar con IA
```typescript
trpc.articles.generateWithAI.mutate({
  topic: 'Reforma económica',
  category: 'economia',
  keywords: ['milei', 'reforma', 'economía'],
})
```

#### Mejorar con IA
```typescript
trpc.articles.improveWithAI.mutate({
  content: '<p>Contenido original...</p>',
  title: 'Título original',
})
```

### Analytics

#### Obtener Estadísticas
```typescript
trpc.analytics.getStats.query()
```

#### Top Artículos
```typescript
trpc.analytics.getTopArticles.query({ limit: 5 })
```

### Users (CRM)

#### Listar Usuarios
```typescript
trpc.users.list.query({
  limit: 10,
  offset: 0,
})
```

#### Crear Usuario
```typescript
trpc.users.create.mutate({
  email: 'usuario@example.com',
  name: 'Nombre Usuario',
  password: 'password123',
  role: 'editor',
})
```

---

## 🗄️ ESTRUCTURA DE BASE DE DATOS

### Tablas Principales

#### articles
```sql
- id (INT, PK)
- title (VARCHAR 500)
- slug (VARCHAR 500, UNIQUE)
- excerpt (TEXT)
- content (LONGTEXT)
- category (VARCHAR 100)
- categorySlug (VARCHAR 100)
- author (VARCHAR 200)
- imageUrl (VARCHAR 500)
- status (ENUM: published, draft, archived)
- featured (BOOLEAN)
- breaking (BOOLEAN)
- views (INT)
- likes (INT)
- shares (INT)
- tags (JSON)
- publishedAt (DATETIME)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

#### users (CRM)
```sql
- id (INT, PK)
- email (VARCHAR 255, UNIQUE)
- password (VARCHAR 255)
- name (VARCHAR 200)
- role (ENUM: admin, editor, author, user)
- avatar (VARCHAR 500)
- bio (TEXT)
- active (BOOLEAN)
- lastLogin (DATETIME)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

#### categories
```sql
- id (INT, PK)
- name (VARCHAR 100)
- slug (VARCHAR 100, UNIQUE)
- description (TEXT)
- color (VARCHAR 20)
- icon (VARCHAR 50)
- order (INT)
- active (BOOLEAN)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

### Categorías Pre-cargadas
1. Política (#3B82F6)
2. Economía (#10B981)
3. Sociedad (#F59E0B)
4. Internacional (#EF4444)
5. Deportes (#8B5CF6)
6. Cultura (#EC4899)

---

## 🚀 DEPLOYMENT

### Build Production
```bash
# Build frontend
pnpm build

# Build backend
pnpm build:backend

# Build completo
pnpm build:full
```

### Start Production
```bash
# Iniciar backend
pnpm start:backend

# O usar PM2
pm2 start dist/server.js --name politica-backend
```

---

## ✅ CHECKLIST DE FUNCIONALIDAD

### Backend
- [x] Express server funcionando
- [x] tRPC configurado
- [x] MySQL conectado
- [x] CRUD de artículos
- [x] Analytics endpoints
- [x] Users endpoints (CRM)
- [x] AI service (generate)
- [x] AI service (improve)
- [x] Error handling
- [x] CORS configurado

### Frontend
- [x] tRPC client configurado
- [x] Admin Dashboard
- [x] CMS Editor
- [x] Botón "Generar con IA" funcional
- [x] Botón "Mejorar con IA" funcional
- [x] Formulario completo
- [x] Validación
- [x] Mensajes de éxito/error
- [x] Preview de imágenes
- [x] Sistema de tags

### Database
- [x] Schema optimizado
- [x] 9 tablas creadas
- [x] Índices estratégicos
- [x] Foreign keys
- [x] Triggers
- [x] Stored procedures
- [x] Vistas
- [x] Categorías pre-cargadas
- [x] Usuario admin por defecto

---

## 🎯 RESULTADO FINAL

```
✅ Backend API 100% funcional
✅ Database optimizada
✅ CMS Editor enterprise grade
✅ Sistema de IA funcionando
✅ Botones de IA operativos
✅ CRUD completo
✅ Analytics integrado
✅ CRM básico
✅ Frontend conectado
✅ Build exitoso
```

---

**🟢 SISTEMA 100% FUNCIONAL Y LISTO PARA USAR**

*Última actualización: 26 de Octubre, 2025*  
*Versión: 4.0.0 Enterprise Grade*

