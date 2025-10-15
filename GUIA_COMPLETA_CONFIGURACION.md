# 🚀 GUÍA COMPLETA DE CONFIGURACIÓN - POLÍTICA ARGENTINA

## 📋 ÍNDICE

1. [Configuración Inicial](#configuración-inicial)
2. [Redes Sociales](#redes-sociales)
3. [n8n Workflows](#n8n-workflows)
4. [MCP Servers](#mcp-servers)
5. [Docker + Tor](#docker--tor)
6. [Deploy en Vercel](#deploy-en-vercel)
7. [Monitoreo y Analytics](#monitoreo-y-analytics)

---

## 1. CONFIGURACIÓN INICIAL

### Requisitos Previos:
- Node.js 20+
- pnpm 10+
- Docker (opcional, para Tor)
- Cuenta en OpenAI
- Cuentas en redes sociales

### Instalación Local:

\`\`\`bash
cd politica-argentina
pnpm install
pnpm prisma generate
pnpm dev
\`\`\`

### Variables de Entorno:

Copiar \`.env.local\` y completar TODAS las variables:

\`\`\`env
# Database (Prisma Accelerate)
DATABASE_URL="prisma+postgres://..."
DIRECT_DATABASE_URL="postgres://..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Auth
AUTH_SECRET="..."
AUTH_TRUST_HOST=true

# Site
NEXT_PUBLIC_SITE_URL="https://tu-dominio.com"
CRON_SECRET="tu-secret-ultra-seguro"
\`\`\`

---

## 2. REDES SOCIALES

### 🔷 TELEGRAM

**Paso 1**: Crear Bot
1. Hablar con @BotFather en Telegram
2. Comando: \`/newbot\`
3. Nombrar: "POLÍTICA ARGENTINA Bot"
4. Username: \`politica_argentina_bot\`
5. Copiar token

**Paso 2**: Crear Canal
1. Crear canal público: \`@politica_argentina\`
2. Añadir el bot como administrador
3. Dar permisos de publicación

**Paso 3**: Configurar
\`\`\`env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHANNEL_ID=@politica_argentina
\`\`\`

---

### 🟣 DISCORD

**Paso 1**: Crear Server
1. Crear server "POLÍTICA ARGENTINA"
2. Crear canal #noticias

**Paso 2**: Crear Webhook
1. Settings del canal → Integrations → Webhooks
2. New Webhook
3. Nombrar "News Publisher"
4. Copiar webhook URL

**Paso 3**: Configurar
\`\`\`env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/123.../abc...
\`\`\`

---

### 🔴 REDDIT

**Paso 1**: Crear App
1. Ir a https://www.reddit.com/prefs/apps
2. "create another app..."
3. Tipo: script
4. Copiar client_id y client_secret

**Paso 2**: Configurar
\`\`\`env
REDDIT_CLIENT_ID=tu_client_id
REDDIT_CLIENT_SECRET=tu_client_secret
REDDIT_USERNAME=tu_username
REDDIT_PASSWORD=tu_password
\`\`\`

**Subreddits Sugeridos**:
- r/argentina
- r/noticiasargentinas
- r/republicaargentina
- r/politica_argentina (crear propio)

---

### 💼 LINKEDIN

**Paso 1**: Crear Company Page
1. LinkedIn → Work → Create Company Page
2. Nombre: "POLÍTICA ARGENTINA"

**Paso 2**: OAuth
1. LinkedIn Developer: https://www.linkedin.com/developers
2. Create App
3. Request permissions: w_member_social
4. Generar Access Token

**Paso 3**: Configurar
\`\`\`env
LINKEDIN_ACCESS_TOKEN=tu_access_token
\`\`\`

---

### 🐦 TWITTER/X

**Paso 1**: Developer Account
1. https://developer.twitter.com
2. Apply for Developer Account
3. Create Project + App

**Paso 2**: Generar Keys
1. App settings → Keys and tokens
2. Generate API Key & Secret
3. Generate Access Token & Secret

**Paso 3**: Configurar
\`\`\`env
TWITTER_API_KEY=tu_api_key
TWITTER_API_SECRET=tu_api_secret
TWITTER_ACCESS_TOKEN=tu_access_token
TWITTER_ACCESS_SECRET=tu_access_secret
\`\`\`

---

### 📝 MEDIUM

**Paso 1**: Integration Token
1. Settings → Security and apps → Integration tokens
2. Create token: "POLÍTICA ARGENTINA"

**Paso 2**: Configurar
\`\`\`env
MEDIUM_INTEGRATION_TOKEN=tu_token
\`\`\`

---

## 3. N8N WORKFLOWS

### Instalación n8n:

**Opción A: Docker (Recomendado)**
\`\`\`bash
docker-compose up -d n8n
\`\`\`
Acceder: http://localhost:5678

**Opción B: npx**
\`\`\`bash
npx n8n
\`\`\`

### Configurar Workflows:

1. **Importar workflows**:
   - Ir a Workflows → Import from File
   - Importar archivos de \`n8n-workflows/\`

2. **Configurar credenciales**:
   - Settings → Credentials
   - Añadir cada API key

3. **Activar workflows**:
   - RSS to Social: ✅ Activo (cada 30 min)
   - Translation: ✅ Activo (cada 1 hora)
   - Social Scheduler: ✅ Activo (cada 15 min)
   - Analytics: ✅ Activo (cada 6 horas)

---

## 4. MCP SERVERS

### Instalación MCP:

\`\`\`bash
# Instalar SDK
pnpm add @modelcontextprotocol/sdk

# Hacer ejecutables
chmod +x mcp-servers/*/server.ts

# Ejecutar servidor
node --loader ts-node/esm mcp-servers/content-management/server.ts
\`\`\`

### Servidores Disponibles:

| Servidor | Puerto | Función |
|----------|--------|---------|
| Content Management | - | CRUD de contenido |
| Social Publisher | - | Publicación redes |
| Translation Service | - | Traducción multi-idioma |
| Analytics Dashboard | - | Métricas y reportes |

### Configuración en Claude Desktop:

\`\`\`json
{
  "mcpServers": {
    "politica-argentina-content": {
      "command": "node",
      "args": ["mcp-servers/content-management/server.ts"]
    },
    "politica-argentina-social": {
      "command": "node",
      "args": ["mcp-servers/social-publisher/server.ts"]
    }
  }
}
\`\`\`

---

## 5. DOCKER + TOR

### Construcción de la Imagen:

\`\`\`bash
docker build -t politica-argentina:latest .
\`\`\`

### Ejecución con Docker Compose:

\`\`\`bash
docker-compose up -d
\`\`\`

**Servicios incluidos**:
- ✅ Next.js App (puerto 3000)
- ✅ Tor SOCKS5 (puerto 9050)
- ✅ Privoxy HTTP Proxy (puerto 8118)
- ✅ n8n Workflows (puerto 5678)
- ✅ Redis Cache (puerto 6379)

### Verificar Conexión Tor:

\`\`\`bash
# Dentro del contenedor
docker exec -it politica-argentina sh
curl --socks5-hostname 127.0.0.1:9050 https://check.torproject.org/api/ip
\`\`\`

### Configurar Publicaciones Anónimas:

\`\`\`typescript
// En tus API routes
const agent = new SocksProxyAgent('socks5://127.0.0.1:9050');
fetch(url, { agent });
\`\`\`

---

## 6. DEPLOY EN VERCEL

### Pre-Deploy:

\`\`\`bash
# Verificar build local
pnpm build

# Verificar linting
pnpm lint
\`\`\`

### Deploy:

\`\`\`bash
# Push a GitHub
git add .
git commit -m "feat: complete integration"
git push origin main

# Deploy automático con Vercel
vercel --prod
\`\`\`

### Configurar Environment Variables en Vercel:

Dashboard Vercel → Project → Settings → Environment Variables

**Variables Críticas**:
- \`DATABASE_URL\`
- \`OPENAI_API_KEY\`
- \`CRON_SECRET\`
- Todas las de redes sociales

### Configurar Cron Jobs:

Archivo \`vercel.json\` ya incluye:
- Ingesta de noticias: cada 2 horas
- Traducción: cada 3 horas
- SEO audit: diario a las 3 AM

---

## 7. MONITOREO Y ANALYTICS

### Dashboard Admin:

https://tu-dominio.com/admin

**KPIs Disponibles**:
- Total de posts
- Posts por estado
- Views totales
- Tráfico hoy
- Posts pendientes traducción

### Logs y Debugging:

\`\`\`bash
# Logs de Vercel
vercel logs

# Logs de n8n
docker logs n8n

# Logs de Tor
docker exec politica-argentina tail -f /var/log/tor/notices.log
\`\`\`

### Métricas de Redes Sociales:

Usar API \`/api/social-analytics\` (próxima implementación)

---

## 🎯 CHECKLIST DE LANZAMIENTO

### Pre-Lanzamiento:
- [ ] Todas las variables de entorno configuradas
- [ ] OpenAI API key con créditos
- [ ] Base de datos migrada y seeded
- [ ] Build exitoso sin errores
- [ ] Mínimo 5 posts publicados

### Redes Sociales:
- [ ] Telegram bot funcionando
- [ ] Discord webhook activo
- [ ] Reddit account configurada
- [ ] LinkedIn company page
- [ ] Twitter account verificada

### Automatización:
- [ ] n8n workflows activados
- [ ] Cron jobs verificados
- [ ] MCP servers testeados

### Seguridad:
- [ ] HTTPS habilitado
- [ ] Headers de seguridad
- [ ] Rate limiting configurado
- [ ] Tor funcionando (opcional)

### SEO:
- [ ] Sitemap generado
- [ ] News sitemap activo
- [ ] robots.txt correcto
- [ ] JSON-LD en todas las páginas
- [ ] Google Search Console configurado

---

## 🆘 SOPORTE Y TROUBLESHOOTING

### Problema: Build falla en Vercel
**Solución**:
\`\`\`bash
# Limpiar caché
rm -rf .next node_modules
pnpm install
pnpm build
\`\`\`

### Problema: Prisma no conecta
**Solución**:
\`\`\`bash
# Regenerar cliente
pnpm prisma generate
# Verificar DATABASE_URL
\`\`\`

### Problema: APIs de redes sociales fallan
**Solución**:
1. Verificar tokens en .env
2. Revisar rate limits
3. Verificar permisos de apps

---

## 📞 CONTACTO Y RECURSOS

- **Documentación**: Ver archivos \`*.md\` en raíz
- **GitHub Issues**: Para reportar bugs
- **Discord**: Para soporte comunitario

---

**🎉 ¡LISTO PARA DOMINAR EL SEO ARGENTINO! 🇦🇷**
