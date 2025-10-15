#!/bin/bash

# 🚀 Script de Deploy Automático - POLÍTICA ARGENTINA
# Este script te ayudará a hacer el deploy paso a paso

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   🚀 DEPLOY AUTOMÁTICO - POLÍTICA ARGENTINA                  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar git
echo -e "${BLUE}📋 Paso 1/5: Verificando Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git disponible${NC}"
echo ""

# Verificar si hay cambios
echo -e "${BLUE}📋 Paso 2/5: Verificando cambios...${NC}"
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  Hay cambios sin commitear${NC}"
    echo ""
    read -p "¿Quieres hacer commit ahora? (s/n): " commit_now
    
    if [[ $commit_now == "s" || $commit_now == "S" ]]; then
        git add .
        echo ""
        read -p "Mensaje del commit: " commit_msg
        git commit -m "$commit_msg"
        echo -e "${GREEN}✓ Commit realizado${NC}"
    fi
else
    echo -e "${GREEN}✓ No hay cambios pendientes${NC}"
fi
echo ""

# Verificar remote
echo -e "${BLUE}📋 Paso 3/5: Verificando repositorio remoto...${NC}"
if git remote -v | grep -q "origin"; then
    REMOTE_URL=$(git remote get-url origin)
    echo -e "${GREEN}✓ Remote configurado: $REMOTE_URL${NC}"
else
    echo -e "${YELLOW}⚠️  No hay remote configurado${NC}"
    echo ""
    read -p "URL del repositorio GitHub: " repo_url
    git remote add origin "$repo_url"
    echo -e "${GREEN}✓ Remote añadido${NC}"
fi
echo ""

# Push a GitHub
echo -e "${BLUE}📋 Paso 4/5: Subiendo a GitHub...${NC}"
read -p "¿Hacer push a GitHub? (s/n): " do_push

if [[ $do_push == "s" || $do_push == "S" ]]; then
    git branch -M main
    git push -u origin main
    echo -e "${GREEN}✓ Código subido a GitHub${NC}"
else
    echo -e "${YELLOW}⚠️  Push cancelado${NC}"
fi
echo ""

# Deploy a Vercel
echo -e "${BLUE}📋 Paso 5/5: Deploy a Vercel...${NC}"
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✓ Vercel CLI disponible${NC}"
    echo ""
    read -p "¿Hacer deploy a Vercel? (s/n): " do_deploy
    
    if [[ $do_deploy == "s" || $do_deploy == "S" ]]; then
        vercel --prod
        echo -e "${GREEN}✓ Deploy completado${NC}"
    else
        echo -e "${YELLOW}⚠️  Deploy cancelado${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Vercel CLI no instalado${NC}"
    echo ""
    echo "Para instalar Vercel CLI:"
    echo "  npm install -g vercel"
    echo ""
    echo "O haz deploy desde el dashboard:"
    echo "  https://vercel.com/new"
fi
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   ✅ PROCESO COMPLETADO                                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🎉 ¡Próximos pasos!${NC}"
echo ""
echo "1. Configurar variables de entorno en Vercel:"
echo "   https://vercel.com/dashboard → Settings → Environment Variables"
echo ""
echo "2. Variables CRÍTICAS a configurar:"
echo "   - DATABASE_URL (Prisma Accelerate)"
echo "   - OPENAI_API_KEY"
echo "   - AUTH_SECRET"
echo "   - CRON_SECRET"
echo ""
echo "3. Variables OPCIONALES (redes sociales):"
echo "   - TELEGRAM_BOT_TOKEN"
echo "   - DISCORD_WEBHOOK_URL"
echo "   - REDDIT_CLIENT_ID"
echo "   - Etc. (ver .env.local)"
echo ""
echo "4. Ver guía completa:"
echo "   - GUIA_COMPLETA_CONFIGURACION.md"
echo "   - QUICK_START.md"
echo ""
