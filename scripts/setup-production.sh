#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# SCRIPT DE CONFIGURACIÓN DE PRODUCCIÓN
# Política Argentina - Portal de Noticias
# ═══════════════════════════════════════════════════════════════

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║        🚀 CONFIGURACIÓN DE PRODUCCIÓN - INICIO 🚀             ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 1. VERIFICAR ARCHIVO .env
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "📋 Paso 1: Verificando archivo .env..."

if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado. Creando desde env.example..."
    if [ -f env.example ]; then
        cp env.example .env
        echo "✅ Archivo .env creado desde env.example"
    else
        echo "❌ Error: env.example no encontrado"
        echo ""
        echo "Por favor, crea un archivo .env con las siguientes variables:"
        echo ""
        cat << 'ENVEXAMPLE'
# Base de datos
DATABASE_URL=mysql://root:@localhost:3306/politica_argentina
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=politica_argentina

# Seguridad
JWT_SECRET=politica-argentina-super-secret-key-2025
SESSION_SECRET=politica-argentina-session-secret-2025

# Admin
ADMIN_EMAIL=holdingdracma@gmail.com
ADMIN_PASSWORD=@Bitexchangers2025
ADMIN_NAME=Admin Principal

# Servidor
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
FRONTEND_URL=https://politicaargentina.com
BACKEND_URL=http://localhost:3001

# IA (Opcional)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-r1:1.5b
ENVEXAMPLE
        exit 1
    fi
else
    echo "✅ Archivo .env encontrado"
fi

echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 2. VERIFICAR DEPENDENCIAS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "📦 Paso 2: Verificando dependencias..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm no está instalado. Instalando..."
    npm install -g pnpm
fi

if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL CLI no está instalado"
    echo "   Puedes instalar MySQL o usar una base de datos remota"
fi

echo "✅ Dependencias verificadas"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 3. INSTALAR PAQUETES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "📦 Paso 3: Instalando paquetes..."

if [ ! -d "node_modules" ]; then
    echo "   Instalando todas las dependencias..."
    pnpm install
else
    echo "   Actualizando dependencias..."
    pnpm install
fi

echo "✅ Paquetes instalados"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 4. CONFIGURAR BASE DE DATOS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "🗄️  Paso 4: Configurando base de datos..."

# Cargar variables de entorno
export $(grep -v '^#' .env | xargs)

echo "   Base de datos: $DB_NAME"
echo "   Host: $DB_HOST:$DB_PORT"
echo "   Usuario: $DB_USER"

if command -v mysql &> /dev/null; then
    echo ""
    echo "   ¿Deseas crear/actualizar la base de datos ahora? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "   Creando base de datos..."
        
        # Crear base de datos si no existe
        mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" ${DB_PASSWORD:+-p"$DB_PASSWORD"} -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        
        # Importar schema
        if [ -f "database/schema-ultra-optimized.sql" ]; then
            echo "   Importando schema optimizado..."
            mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" ${DB_PASSWORD:+-p"$DB_PASSWORD"} "$DB_NAME" < database/schema-ultra-optimized.sql
            echo "✅ Base de datos configurada con schema optimizado"
        elif [ -f "database/schema-optimized.sql" ]; then
            echo "   Importando schema..."
            mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" ${DB_PASSWORD:+-p"$DB_PASSWORD"} "$DB_NAME" < database/schema-optimized.sql
            echo "✅ Base de datos configurada"
        elif [ -f "database/schema.sql" ]; then
            echo "   Importando schema básico..."
            mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" ${DB_PASSWORD:+-p"$DB_PASSWORD"} "$DB_NAME" < database/schema.sql
            echo "✅ Base de datos configurada"
        else
            echo "⚠️  No se encontró archivo de schema"
        fi
    else
        echo "⏭️  Saltando configuración de base de datos"
    fi
else
    echo "⚠️  MySQL CLI no disponible. Configura la base de datos manualmente:"
    echo ""
    echo "   1. Crea la base de datos: $DB_NAME"
    echo "   2. Importa el schema desde: database/schema-ultra-optimized.sql"
    echo ""
fi

echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 5. CREAR USUARIO ADMIN
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "👤 Paso 5: Creando usuario admin..."

if [ -f "scripts/create-admin.ts" ]; then
    echo "   Ejecutando script de creación de admin..."
    npx tsx scripts/create-admin.ts
    echo "✅ Usuario admin creado"
else
    echo "⚠️  Script create-admin.ts no encontrado"
    echo "   Puedes crear el usuario admin manualmente desde el panel"
fi

echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 6. BUILD DE PRODUCCIÓN
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "🏗️  Paso 6: Construyendo aplicación..."

echo "   Construyendo frontend..."
pnpm build

echo "   Construyendo backend..."
pnpm build:backend

echo "✅ Build completado"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 7. VERIFICAR SISTEMA
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "🔍 Paso 7: Verificando sistema..."

# Verificar archivos de build
if [ -d "public" ] && [ -f "public/index.html" ]; then
    echo "✅ Frontend build OK"
else
    echo "❌ Frontend build FALLO"
fi

if [ -f "dist/server.js" ]; then
    echo "✅ Backend build OK"
else
    echo "❌ Backend build FALLO"
fi

echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 8. RESUMEN
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║        ✅ CONFIGURACIÓN DE PRODUCCIÓN COMPLETADA ✅           ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 🎯 PRÓXIMOS PASOS                                             │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""
echo "1. 🚀 Iniciar servidor de producción:"
echo "   pnpm start"
echo ""
echo "2. 🌐 Acceder a la aplicación:"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:3001"
echo ""
echo "3. 👤 Iniciar sesión en admin:"
echo "   URL: http://localhost:5173/admin/login"
echo "   Email: $ADMIN_EMAIL"
echo "   Password: (el que configuraste en .env)"
echo ""
echo "4. 📊 Verificar funcionalidades:"
echo "   • Dashboard Analytics"
echo "   • Crear noticias"
echo "   • SEO Auditor"
echo "   • Multi-idioma"
echo ""
echo "5. 🚀 Deploy a producción:"
echo "   • Frontend: Ya desplegado en Vercel"
echo "   • Backend: Configurar en Railway/Render"
echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 📚 DOCUMENTACIÓN                                              │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""
echo "• README.md - Guía general"
echo "• env.example - Variables de entorno"
echo "• database/schema-ultra-optimized.sql - Schema de BD"
echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 🔐 SEGURIDAD                                                  │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""
echo "⚠️  IMPORTANTE:"
echo "• Cambia JWT_SECRET en producción"
echo "• Cambia SESSION_SECRET en producción"
echo "• Usa contraseñas fuertes"
echo "• Configura HTTPS en producción"
echo "• Habilita rate limiting"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "     🏆 SISTEMA LISTO PARA PRODUCCIÓN 🏆"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

