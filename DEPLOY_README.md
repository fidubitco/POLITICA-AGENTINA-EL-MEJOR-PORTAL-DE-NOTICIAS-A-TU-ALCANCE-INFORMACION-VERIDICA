# 🚀 Despliegue Rápido - Política Argentina

## ⚡ Despliegue en 5 minutos

### 1️⃣ Railway (Recomendado - Más Fácil)

```bash
# 1. Ve a railway.app y conecta GitHub
# 2. Selecciona tu repositorio
# 3. Railway detectará automáticamente la configuración
# 4. Agrega estas variables de entorno:

NODE_ENV=production
PORT=3000
PUBLIC_BASE_URL=https://tu-proyecto.railway.app
JWT_SECRET=politica_argentina_jwt_secret_2025_secure_key
DATABASE_URL=postgresql://postgres:password@host:port/railway
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=tu_api_key_aqui
OAUTH_SERVER_URL=https://tu-proyecto.railway.app/api/oauth
VITE_APP_ID=politica_argentina_app_2025
VITE_ANALYTICS_ENDPOINT=https://analytics.politicaargentina.com
VITE_ANALYTICS_WEBSITE_ID=pa_analytics_2025
```

### 2️⃣ Vercel (Alternativa)

```bash
# 1. Ve a vercel.com y conecta GitHub
# 2. Importa tu repositorio
# 3. Vercel usará automáticamente vercel.json
# 4. Agrega las mismas variables de entorno
```

### 3️⃣ VPS con Docker

```bash
# En tu servidor
git clone https://github.com/tu-usuario/portaldenoticiasmundialpoliticaargentina.git
cd portaldenoticiasmundialpoliticaargentina
cp env.production.example .env
# Editar .env con tus valores
docker-compose up -d --build
```

## 🔧 Script de Despliegue Local

```bash
# Ejecutar antes de subir a GitHub
./scripts/deploy.sh
```

## 📋 Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de producción | `production` |
| `PORT` | Puerto del servidor | `3000` |
| `PUBLIC_BASE_URL` | URL pública de tu sitio | `https://tu-dominio.com` |
| `JWT_SECRET` | Clave secreta para JWT | `tu_jwt_secret_aqui` |
| `DATABASE_URL` | URL de la base de datos | `postgresql://user:pass@host:port/db` |
| `BUILT_IN_FORGE_API_KEY` | API key de Forge | `tu_forge_api_key` |

## 🚨 Troubleshooting

### Error de Build
```bash
# Verificar dependencias
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

### Error de Base de Datos
```bash
# Ejecutar migraciones
pnpm db:push
```

### Error de Puerto
- Railway/Vercel asignan puertos automáticamente
- Para VPS, asegurar que el puerto 3000 esté abierto

## 🎯 Próximos Pasos

1. **Subir a GitHub**: `git add . && git commit -m "Deploy setup" && git push`
2. **Configurar plataforma**: Railway, Vercel o VPS
3. **Variables de entorno**: Copiar desde `env.production.example`
4. **Desplegar**: La plataforma hará el resto automáticamente

## 📞 Soporte

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Docker**: [docs.docker.com](https://docs.docker.com)

¡Tu sitio estará online en minutos! 🎉
