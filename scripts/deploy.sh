#!/bin/bash

# 🚀 Script de Despliegue - Política Argentina
# Este script automatiza el proceso de despliegue

set -e

echo "🚀 Iniciando despliegue de Política Argentina..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
fi

# Verificar que pnpm esté instalado
if ! command -v pnpm &> /dev/null; then
    error "pnpm no está instalado. Instálalo con: npm install -g pnpm"
fi

# Verificar variables de entorno
if [ ! -f ".env" ]; then
    warning "No se encontró archivo .env"
    if [ -f "env.production.example" ]; then
        log "Copiando env.production.example a .env"
        cp env.production.example .env
        warning "Por favor, edita el archivo .env con tus valores antes de continuar"
        exit 1
    else
        error "No se encontró env.production.example"
    fi
fi

# Instalar dependencias
log "Instalando dependencias..."
pnpm install --frozen-lockfile

# Ejecutar checks
log "Ejecutando verificaciones..."
pnpm check

# Build del proyecto
log "Construyendo el proyecto..."
pnpm build

# Verificar que el build fue exitoso
if [ ! -d "dist" ]; then
    error "El build falló. No se encontró el directorio dist/"
fi

success "Build completado exitosamente!"

# Ejecutar migraciones de base de datos
log "Ejecutando migraciones de base de datos..."
pnpm db:push

success "Migraciones ejecutadas exitosamente!"

# Mostrar información del despliegue
echo ""
echo "🎉 ¡Despliegue completado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Sube los cambios a GitHub: git add . && git commit -m 'Deploy' && git push"
echo "2. Configura las variables de entorno en tu plataforma de despliegue"
echo "3. Ejecuta el despliegue en Railway, Vercel o tu VPS"
echo ""
echo "🔗 Plataformas recomendadas:"
echo "- Railway: https://railway.app"
echo "- Vercel: https://vercel.com"
echo "- VPS: Usar docker-compose up -d --build"
echo ""

success "¡Tu sitio está listo para desplegar! 🚀"
