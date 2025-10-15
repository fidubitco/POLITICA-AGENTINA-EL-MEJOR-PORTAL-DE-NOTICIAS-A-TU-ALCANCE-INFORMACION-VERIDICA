# Dockerfile para POLÍTICA ARGENTINA con Tor Integration
FROM node:20-alpine AS base

# Instalar dependencias del sistema
RUN apk add --no-cache libc6-compat tor privoxy

# Configurar Tor
RUN echo "SOCKSPort 0.0.0.0:9050" >> /etc/tor/torrc && \
    echo "ControlPort 9051" >> /etc/tor/torrc && \
    echo "CookieAuthentication 1" >> /etc/tor/torrc

# Configurar Privoxy para HTTP proxy
RUN echo "forward-socks5 / 127.0.0.1:9050 ." >> /etc/privoxy/config && \
    echo "listen-address 0.0.0.0:8118" >> /etc/privoxy/config

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm@10.14.0

# Copiar package files
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build Next.js
RUN pnpm build

# Production stage
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Script de inicio
COPY <<'EOF' /app/start.sh
#!/bin/sh
# Iniciar Tor en background
tor &

# Iniciar Privoxy en background
privoxy /etc/privoxy/config &

# Esperar a que Tor esté listo
sleep 5

# Verificar conexión Tor
echo "Verificando conexión Tor..."
curl --socks5-hostname 127.0.0.1:9050 https://check.torproject.org/api/ip

# Iniciar Next.js
exec node server.js
EOF

RUN chmod +x /app/start.sh

USER nextjs

EXPOSE 3000 9050 8118

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Variables para proxy Tor
ENV HTTP_PROXY="http://127.0.0.1:8118"
ENV HTTPS_PROXY="http://127.0.0.1:8118"
ENV ALL_PROXY="socks5://127.0.0.1:9050"

CMD ["/app/start.sh"]
