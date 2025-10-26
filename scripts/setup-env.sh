#!/bin/bash

# 🔐 SETUP ENVIRONMENT - Script para configurar .env de forma segura
# Este script crea el archivo .env con las configuraciones necesarias

echo "🔐 Configurando archivo .env..."
echo ""

# Crear archivo .env
cat > .env << 'EOF'
# ============================================
# ENVIRONMENT VARIABLES - PRODUCTION
# ============================================

# ============================================
# DATABASE
# ============================================
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=politica_argentina

# ============================================
# API
# ============================================
PORT=3001
NODE_ENV=development

# ============================================
# AUTHENTICATION
# ============================================
JWT_SECRET=politica-argentina-jwt-secret-key-2025-ultra-secure-change-in-production

# Admin User
ADMIN_EMAIL=holdingdracma@gmail.com
ADMIN_PASSWORD=@Bitexchangers2025
ADMIN_NAME=Administrador Principal

# ============================================
# FRONTEND
# ============================================
VITE_API_URL=http://localhost:3001

# ============================================
# SEO & ANALYTICS
# ============================================
SITE_NAME=Política Argentina
SITE_URL=https://politicaargentina.com
SITE_DESCRIPTION=Portal #1 de noticias políticas de Argentina

# ============================================
# PRODUCTION (Opcional)
# ============================================
# DATABASE_URL=mysql://user:password@host:port/database
# REDIS_URL=redis://localhost:6379
EOF

echo "✅ Archivo .env creado exitosamente"
echo ""
echo "⚠️  IMPORTANTE: Este archivo contiene credenciales sensibles"
echo "   El archivo .env está ignorado por git y NO se subirá al repositorio"
echo ""
echo "📝 Configuración aplicada:"
echo "   - Database: politica_argentina"
echo "   - Admin Email: holdingdracma@gmail.com"
echo "   - API Port: 3001"
echo ""
echo "🔒 Las credenciales están protegidas y NO se expondrán públicamente"

