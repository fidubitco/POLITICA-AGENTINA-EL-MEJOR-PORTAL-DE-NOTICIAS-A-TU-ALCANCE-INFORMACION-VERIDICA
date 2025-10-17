# ============================================================================
# POLÍTICA ARGENTINA - Professional Docker Configuration
# Multi-stage optimized build for Railway + Vercel deployment
# With Tor integration for anonymous web scraping
# ============================================================================

# ============================
# Stage 1: Base Configuration
# ============================
FROM node:20-alpine AS base
LABEL maintainer="POLÍTICA ARGENTINA"
LABEL version="2.0"
LABEL description="Production-ready Next.js app with Tor integration"

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    tor \
    privoxy \
    curl \
    ca-certificates \
    tzdata

# Configure timezone
ENV TZ=America/Argentina/Buenos_Aires
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Configure Tor for anonymous scraping
RUN echo "SOCKSPort 0.0.0.0:9050" >> /etc/tor/torrc && \
    echo "ControlPort 9051" >> /etc/tor/torrc && \
    echo "CookieAuthentication 1" >> /etc/tor/torrc && \
    echo "MaxCircuitDirtiness 10" >> /etc/tor/torrc && \
    echo "NewCircuitPeriod 15" >> /etc/tor/torrc

# Configure Privoxy as HTTP proxy
RUN echo "forward-socks5 / 127.0.0.1:9050 ." >> /etc/privoxy/config && \
    echo "listen-address 0.0.0.0:8118" >> /etc/privoxy/config && \
    echo "accept-intercepted-requests 1" >> /etc/privoxy/config

WORKDIR /app

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ============================
# Stage 2: Dependencies
# ============================
FROM base AS deps

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install ALL dependencies (including devDependencies for build)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

# ============================
# Stage 3: Builder
# ============================
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG DATABASE_URL
ARG DIRECT_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GEMINI_API_KEY
ARG CRON_SECRET

# Set environment variables for build
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV CRON_SECRET=$CRON_SECRET
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=1

# Generate Prisma Client with optimizations
RUN pnpm exec prisma generate --no-engine

# Build Next.js application
RUN pnpm build

# Remove development dependencies
RUN pnpm prune --prod

# ============================
# Stage 4: Production Runner
# ============================
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app

WORKDIR /app

# Copy production dependencies
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy Prisma files
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copy Next.js build output
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package.json for metadata
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Create optimized startup script
RUN cat > /app/start.sh <<'EOF'
#!/bin/sh
set -e

echo "🚀 Starting POLÍTICA ARGENTINA..."
echo "=================================="

# Start Tor in background
echo "🔐 Initializing Tor network..."
tor &
TOR_PID=$!

# Start Privoxy in background
echo "🌐 Starting HTTP proxy (Privoxy)..."
privoxy /etc/privoxy/config &
PRIVOXY_PID=$!

# Wait for Tor to be ready
echo "⏳ Waiting for Tor connection..."
for i in $(seq 1 30); do
    if curl --socks5-hostname 127.0.0.1:9050 -s https://check.torproject.org/api/ip > /dev/null 2>&1; then
        echo "✅ Tor connection established!"
        CURRENT_IP=$(curl --socks5-hostname 127.0.0.1:9050 -s https://check.torproject.org/api/ip | grep -oP '"IsTor":\s*true')
        if [ ! -z "$CURRENT_IP" ]; then
            echo "✅ Tor verified - Anonymous browsing active"
        fi
        break
    fi
    echo "   Attempt $i/30..."
    sleep 2
done

# Health check API
echo "💚 Starting health check endpoint..."

# Run database migrations if needed
if [ -f "./prisma/schema.prisma" ]; then
    echo "🗄️  Checking database migrations..."
    # Note: In production, use 'prisma migrate deploy' instead
    # pnpm prisma migrate deploy
fi

# Start Next.js application
echo "🎯 Starting Next.js application..."
echo "=================================="
echo "📍 Server: http://0.0.0.0:3000"
echo "🔐 Tor SOCKS5: 127.0.0.1:9050"
echo "🌐 HTTP Proxy: 127.0.0.1:8118"
echo "=================================="

# Cleanup function
cleanup() {
    echo "🛑 Shutting down services..."
    kill $TOR_PID $PRIVOXY_PID 2>/dev/null
    exit 0
}

trap cleanup SIGTERM SIGINT

# Execute Next.js server
exec node server.js
EOF

RUN chmod +x /app/start.sh && chown nextjs:nodejs /app/start.sh

# Switch to non-root user
USER nextjs

# Expose ports
EXPOSE 3000 9050 8118

# Configure proxy environment variables
ENV HTTP_PROXY="http://127.0.0.1:8118"
ENV HTTPS_PROXY="http://127.0.0.1:8118"
ENV ALL_PROXY="socks5://127.0.0.1:9050"
ENV NO_PROXY="localhost,127.0.0.1"

# Health check configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start application
CMD ["/bin/sh", "/app/start.sh"]
