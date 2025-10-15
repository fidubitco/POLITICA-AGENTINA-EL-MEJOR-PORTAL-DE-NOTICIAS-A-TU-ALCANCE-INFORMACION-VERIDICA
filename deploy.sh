#!/bin/bash

echo "🚀 DEPLOY AUTOMÁTICO - POLITICA ARGENTINA"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Función para mostrar errores
error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar info
info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

echo "Paso 1: Verificando requisitos..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encuentra package.json. Ejecuta este script desde la raíz del proyecto."
fi

# Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    info "Vercel CLI no está instalado. Instalando..."
    npm install -g vercel
fi

success "Requisitos verificados"
echo ""

# Verificar si ya hay un remote de git
if git remote | grep -q origin; then
    info "Git remote 'origin' ya existe"
    REMOTE_URL=$(git remote get-url origin)
    echo "   URL actual: $REMOTE_URL"
else
    echo ""
    echo "=========================================="
    echo "PASO MANUAL REQUERIDO: Crear Repo GitHub"
    echo "=========================================="
    echo ""
    echo "1. Ve a: https://github.com/new"
    echo "2. Repository name: politica-argentina"
    echo "3. Public ✓"
    echo "4. NO marques 'Initialize with README'"
    echo "5. Click 'Create repository'"
    echo ""
    read -p "Presiona ENTER cuando hayas creado el repo..."
    echo ""
    read -p "Pega la URL del repo (ej: https://github.com/usuario/politica-argentina.git): " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        error "URL del repositorio no puede estar vacía"
    fi
    
    git remote add origin "$REPO_URL"
    success "Remote agregado: $REPO_URL"
fi

echo ""
echo "Paso 2: Subiendo código a GitHub..."
echo ""

git push -u origin main || error "Error al hacer push. Verifica tus credenciales de GitHub"
success "Código subido a GitHub"

echo ""
echo "=========================================="
echo "PASO MANUAL: Crear Base de Datos en Neon"
echo "=========================================="
echo ""
echo "1. Ve a: https://neon.tech"
echo "2. Sign up / Login con GitHub"
echo "3. Create new project: 'politica-argentina'"
echo "4. Copia la Connection String"
echo ""
read -p "Presiona ENTER cuando tengas tu DATABASE_URL..."
echo ""
read -p "Pega tu DATABASE_URL aquí: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    error "DATABASE_URL no puede estar vacía"
fi

success "DATABASE_URL configurada"

echo ""
echo "Paso 3: Desplegando en Vercel..."
echo ""

# Login en Vercel (abrirá el navegador)
info "Iniciando sesión en Vercel..."
vercel login

# Deploy inicial
info "Realizando deploy inicial..."
vercel --yes || error "Error en el deploy inicial"

success "Deploy inicial completado"

echo ""
echo "Paso 4: Configurando variables de entorno..."
echo ""

# Configurar variables de entorno
info "Configurando DATABASE_URL..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

info "Configurando AUTH_SECRET..."
echo "0lMY3tEucxaM3wSb0HAgsGEDYhgkFYkhaABFoutPyTY=" | vercel env add AUTH_SECRET production

info "Configurando AUTH_TRUST_HOST..."
echo "true" | vercel env add AUTH_TRUST_HOST production

info "Configurando NEXT_PUBLIC_SITE_NAME..."
echo "POLITICA ARGENTINA" | vercel env add NEXT_PUBLIC_SITE_NAME production

# Obtener URL de Vercel
VERCEL_URL=$(vercel inspect --token=$(vercel whoami) 2>/dev/null | grep -o 'https://[^[:space:]]*' | head -1)
if [ -z "$VERCEL_URL" ]; then
    VERCEL_URL="https://politica-argentina.vercel.app"
fi

info "Configurando NEXT_PUBLIC_SITE_URL..."
echo "$VERCEL_URL" | vercel env add NEXT_PUBLIC_SITE_URL production

success "Variables de entorno configuradas"

echo ""
echo "Paso 5: Deploy a producción..."
echo ""

vercel --prod || error "Error en deploy a producción"

success "Deploy a producción completado"

echo ""
echo "Paso 6: Ejecutando migraciones..."
echo ""

# Crear .env.local temporal para migraciones
cat > .env.local << ENVEOF
DATABASE_URL=$DATABASE_URL
AUTH_SECRET=0lMY3tEucxaM3wSb0HAgsGEDYhgkFYkhaABFoutPyTY=
NEXT_PUBLIC_SITE_URL=$VERCEL_URL
ENVEOF

info "Ejecutando migraciones de Prisma..."
pnpm prisma migrate deploy || error "Error en migraciones"

success "Migraciones completadas"

echo ""
echo "Paso 7: Poblando base de datos..."
echo ""

pnpm seed || error "Error al poblar la base de datos"

success "Base de datos poblada"

# Limpiar .env.local
rm -f .env.local

echo ""
echo "=========================================="
echo "✅ ¡DEPLOY COMPLETADO EXITOSAMENTE!"
echo "=========================================="
echo ""
echo "🌐 Tu sitio está en: $VERCEL_URL"
echo ""
echo "🔑 Credenciales de acceso:"
echo "   Email: admin@politicaargentina.com"
echo "   Password: admin123"
echo ""
echo "📊 Próximos pasos:"
echo "   1. Accede a $VERCEL_URL/login"
echo "   2. Cambia tu password"
echo "   3. Crea tu primer post"
echo "   4. Configura tu dominio personalizado"
echo ""
echo "📖 Lee INSTRUCCIONES_USUARIO.md para más info"
echo ""

