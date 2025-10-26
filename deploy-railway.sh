#!/bin/bash

echo "🚀 Desplegando Política Argentina a Railway..."

# Verificar que Railway CLI esté instalado
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI no está instalado"
    echo "Instalando Railway CLI..."
    curl -fsSL https://railway.com/install.sh | sh
fi

# Login a Railway
echo "🔐 Iniciando sesión en Railway..."
railway login

# Link al proyecto
echo "🔗 Vinculando al proyecto..."
railway link -p 70e6d027-3e82-4e4e-8b97-0bfb7adfd1eb

# Configurar variables de entorno
echo "⚙️  Configurando variables de entorno..."
railway variables set NODE_ENV="production"
railway variables set PUBLIC_BASE_URL="https://politicaargentina.com"
railway variables set JWT_SECRET="politica_argentina_jwt_secret_2025_secure_key"

# Desplegar
echo "🚀 Desplegando aplicación..."
railway up

echo "✅ Despliegue completado!"
echo "🌐 Tu portal de noticias estará disponible en: https://politicaargentina.com"
