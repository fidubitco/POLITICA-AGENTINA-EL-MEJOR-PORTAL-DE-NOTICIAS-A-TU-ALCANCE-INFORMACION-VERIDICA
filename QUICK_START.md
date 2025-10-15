# 🚀 Inicio Rápido - POLITICA ARGENTINA

## Desarrollo Local (5 minutos)

### 1. Clonar y configurar

```bash
cd politica-argentina
pnpm install
```

### 2. Configurar Base de Datos

Opción A: **Neon (Recomendado para desarrollo)**
1. Crear cuenta en https://neon.tech
2. Crear proyecto PostgreSQL
3. Copiar URL de conexión

Opción B: **PostgreSQL Local**
```bash
# macOS con Homebrew
brew install postgresql@16
brew services start postgresql@16
createdb politica_argentina
```

### 3. Variables de Entorno

```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host:5432/politica_argentina?sslmode=require"
AUTH_SECRET="genera_con_openssl_rand_base64_32"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Migrar y Poblar Base de Datos

```bash
pnpm prisma migrate dev
pnpm seed
```

### 5. Iniciar Servidor

```bash
pnpm dev
```

Abre http://localhost:3000

## 🔐 Credenciales por Defecto

**Admin**
- Email: `admin@politicaargentina.com`
- Password: `admin123`

**Editor**
- Email: `editor@politicaargentina.com`  
- Password: `editor123`

## 📍 Rutas Principales

- **Home**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Login**: http://localhost:3000/login
- **Sitemap**: http://localhost:3000/sitemap.xml
- **News Sitemap**: http://localhost:3000/news-sitemap.xml
- **Prisma Studio**: `pnpm prisma:studio` → http://localhost:5555

## 🎯 Primeros Pasos

1. **Login como Admin**: http://localhost:3000/login
2. **Crear Categorías**: Ya vienen pre-pobladas (Política, Economía, etc.)
3. **Crear Primer Post**: `/admin/posts/new`
4. **Publicar**: Cambiar estado a "PUBLISHED"
5. **Ver en Home**: Volver a `/`

## 🛠️ Comandos Útiles

```bash
# Desarrollo
pnpm dev                    # Iniciar servidor desarrollo
pnpm build                  # Build producción
pnpm start                  # Iniciar producción

# Database
pnpm prisma:studio          # Explorador visual DB
pnpm prisma:migrate         # Crear nueva migración
pnpm prisma generate        # Regenerar cliente Prisma
pnpm seed                   # Re-poblar datos iniciales

# Código
pnpm lint                   # Linter
```

## 🧪 Probar Funcionalidades

### Crear Post Manual
1. Login → `/admin`
2. Click "Nuevo Post"
3. Llenar título, excerpt, contenido
4. Seleccionar categoría
5. Agregar tags
6. Subir imagen de portada (URL por ahora)
7. Cambiar a "PUBLISHED"
8. Save

### Probar Autoposting
1. Configurar `OPENAI_API_KEY` (opcional)
2. Editar `/app/api/ingest/route.ts` con feeds RSS
3. Ejecutar: `curl http://localhost:3000/api/ingest`
4. Ejecutar worker: `curl http://localhost:3000/api/worker`
5. Ver posts en Review: `/admin/posts`

### Auditoría SEO
```bash
curl http://localhost:3000/api/seo/daily
```

## 📱 Estructura del Proyecto

```
politica-argentina/
├── app/                    # Next.js App Router
│   ├── (site)/            # Sitio público
│   │   ├── page.tsx       # Home
│   │   └── noticia/       # Artículos
│   ├── admin/             # Dashboard
│   │   ├── layout.tsx     # Layout admin
│   │   ├── page.tsx       # Dashboard
│   │   └── posts/         # Gestión posts
│   ├── api/               # API Routes
│   │   ├── auth/          # NextAuth
│   │   ├── posts/         # CRUD posts
│   │   ├── ingest/        # RSS ingesta
│   │   ├── worker/        # Procesador
│   │   ├── seo/           # SEO auditoría
│   │   └── og/            # OG images
│   ├── layout.tsx         # Layout raíz
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
├── components/            # Componentes React
│   ├── header.tsx
│   ├── footer.tsx
│   ├── post-card.tsx
│   └── seo-json-ld.tsx
├── lib/                   # Lógica de negocio
│   ├── db.ts             # Cliente Prisma
│   ├── rbac.ts           # Control acceso
│   ├── seo.ts            # Helpers SEO
│   ├── cache.ts          # Cache Next.js
│   ├── kv.ts             # Colas
│   └── seo-audit.ts      # Auditoría
├── prisma/
│   ├── schema.prisma     # Schema DB
│   └── seed.ts           # Datos iniciales
├── public/               # Assets estáticos
├── .env.local            # Config local (no commit)
├── next.config.ts        # Config Next.js
├── vercel.json           # Crons
└── package.json
```

## ❓ Problemas Comunes

### Error: "Prisma Client not initialized"
```bash
pnpm prisma generate
```

### Error: "Database connection failed"
Verificar `DATABASE_URL` en `.env.local`

### Error: "Module not found"
```bash
rm -rf node_modules .next
pnpm install
```

### Error: "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill
# o usar otro puerto
pnpm dev -- -p 3001
```

## 🎓 Próximos Pasos

1. ✅ Familiarízate con el dashboard
2. ✅ Crea 3-5 posts de prueba
3. ✅ Configura categorías personalizadas
4. ✅ Prueba los diferentes roles de usuario
5. ✅ Revisa el SEO con las herramientas de auditoría
6. 📖 Lee `DEPLOYMENT.md` para llevar a producción

## 🆘 Ayuda

- [Documentación Next.js 15](https://nextjs.org/docs)
- [Documentación Prisma](https://www.prisma.io/docs)
- [Documentación Auth.js](https://authjs.dev)

## 🎉 ¡Listo!

Tu portal de noticias está corriendo localmente. Ahora puedes:
- Crear contenido
- Personalizar diseño
- Probar funcionalidades
- Preparar para producción

---

**Desarrollado con ❤️ para POLITICA ARGENTINA**

