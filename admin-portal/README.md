# Panel de Administración - Política Argentina

Este es el panel de administración separado para el portal de noticias Política Argentina.

## 🚀 Características

- ✅ Gestión completa de artículos
- ✅ Sistema de autenticación seguro (NextAuth.js)
- ✅ Base de datos PostgreSQL con Prisma
- ✅ Interfaz moderna con Shadcn/ui
- ✅ Gestión de multimedia (imágenes, videos, audio)
- ✅ Estadísticas y analytics
- ✅ Sistema de categorías y etiquetas
- ✅ Control de permisos de usuario

## 🛠️ Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/admin_panel_db"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3001"
```

### 3. Configurar la base de datos
```bash
# Generar cliente de Prisma
npm run db:generate

# Crear y migrar la base de datos
npm run db:push
```

### 4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

El admin panel estará disponible en `http://localhost:3001`

## 📊 Estructura del Proyecto

```
admin-portal/
├── src/
│   ├── app/                    # Páginas Next.js
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Dashboard principal
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes UI (Shadcn)
│   │   └── AdminDashboard.tsx # Dashboard principal
│   └── lib/                   # Utilidades y configuraciones
│       ├── auth.ts            # Configuración NextAuth
│       └── prisma.ts          # Cliente Prisma
├── prisma/
│   └── schema.prisma          # Schema de la base de datos
└── package.json
```

## 🔐 Autenticación

El sistema utiliza NextAuth.js con las siguientes características:
- Autenticación por credenciales (email/password)
- Sesiones JWT
- Control de roles (admin, editor, etc.)
- Protección de rutas

### Crear usuario administrador
```javascript
// Ejecuta en la consola del navegador o crea un script
await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@poliica-argentina.com',
    password: 'tu-password-seguro',
    name: 'Administrador',
    role: 'admin'
  })
});
```

## 📱 Funcionalidades

### Gestión de Artículos
- Crear, editar y eliminar artículos
- Sistema de borradores y publicación
- Categorización y etiquetado
- Artículos destacados y breaking news
- Gestión de multimedia integrada

### Estadísticas
- Visualización de métricas en tiempo real
- Análisis de engagement (vistas, likes, shares)
- Reportes de rendimiento
- Seguimiento de tendencias

### Multimedia
- Subida y gestión de imágenes
- Soporte para videos y audio
- Optimización automática de imágenes
- Biblioteca multimedia organizada

## 🔗 Integración con el Portal Principal

El admin panel se conecta con el portal principal a través de APIs:

- **Portal Principal**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3001`

### Variables de entorno para integración
```env
PORTAL_API_URL="http://localhost:3000/api"
```

## 🚀 Despliegue

### Producción
```bash
npm run build
npm run start
```

### Variables de producción
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://admin.politica-argentina.com"
```

## 📋 API Endpoints

### Autenticación
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/auth/register` - Registro de usuarios

### Artículos
- `GET /api/articles` - Listar artículos
- `POST /api/articles` - Crear artículo
- `PUT /api/articles/[id]` - Actualizar artículo
- `DELETE /api/articles/[id]` - Eliminar artículo

### Categorías
- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría

### Multimedia
- `POST /api/upload` - Subir archivos
- `GET /api/media` - Listar archivos multimedia

## 🔒 Seguridad

- Autenticación JWT
- Control de acceso basado en roles
- Validación de datos con Zod
- Sanitización de inputs
- Protección CSRF
- Rate limiting

## 🐛 Solución de Problemas

### Error de conexión a base de datos
```bash
# Verificar conexión
npx prisma db push --preview-feature
```

### Problemas con NextAuth
```bash
# Regenerar secreto
openssl rand -base64 32
```

### Errores de build
```bash
# Limpiar cache
rm -rf .next
npm run build
```

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: admin@poliica-argentina.com
- Documentación: [Ver documentación completa](./docs/)

---

**Política Argentina Admin Panel v1.0.0**