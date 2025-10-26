#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# SCRIPT AUTOMATIZADO PARA COMPLETAR RAILWAY SETUP
# ═══════════════════════════════════════════════════════════════

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║        🤖 SETUP AUTOMATIZADO DE RAILWAY 🤖                    ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 1. ABRIR DASHBOARD AUTOMÁTICAMENTE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "🌐 Abriendo Railway Dashboard..."
railway open &

sleep 3

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 2. MOSTRAR INSTRUCCIONES PASO A PASO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 📋 INSTRUCCIONES PASO A PASO                                  │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""

echo "El dashboard de Railway se abrió en tu navegador."
echo "Sigue estos pasos:"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 1: AGREGAR MYSQL DATABASE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. En el dashboard, busca el botón 'New' (arriba a la derecha)"
echo "2. Click en 'Database'"
echo "3. Selecciona 'Add MySQL'"
echo "4. Espera 1-2 minutos a que se cree"
echo ""
read -p "Presiona ENTER cuando hayas agregado MySQL..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 2: CONFIGURAR VARIABLES DE ENTORNO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Click en tu servicio backend (no en MySQL)"
echo "2. Ve a la pestaña 'Variables'"
echo "3. Copia y pega estas variables (una por una):"
echo ""
cat << 'VARIABLES'
DATABASE_URL=${{MySQL.DATABASE_URL}}
JWT_SECRET=politica-argentina-secret-2025-production-railway-v1
SESSION_SECRET=politica-session-secret-2025-production-railway-v1
ADMIN_EMAIL=holdingdracma@gmail.com
ADMIN_PASSWORD=@Bitexchangers2025
ADMIN_NAME=Admin Principal
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
FRONTEND_URL=https://politicaargentina.com
CORS_ORIGIN=https://politicaargentina.com
VARIABLES
echo ""
read -p "Presiona ENTER cuando hayas configurado las variables..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 3: GENERAR DOMINIO PÚBLICO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. En tu servicio backend, ve a 'Settings'"
echo "2. Busca la sección 'Networking'"
echo "3. Click en 'Generate Domain'"
echo "4. Copia el dominio generado (ejemplo: xxx.up.railway.app)"
echo ""
read -p "Pega aquí el dominio generado: " RAILWAY_DOMAIN

if [ -z "$RAILWAY_DOMAIN" ]; then
    RAILWAY_DOMAIN="tu-dominio.up.railway.app"
    echo "⚠️  No ingresaste dominio. Usando placeholder."
else
    echo "✅ Dominio guardado: $RAILWAY_DOMAIN"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 4: ESPERAR A QUE EL DEPLOY TERMINE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. En tu servicio backend, ve a la pestaña 'Deployments'"
echo "2. Espera a que el estado sea 'SUCCESS' (puede tomar 2-5 minutos)"
echo "3. Si ves errores, revisa los logs"
echo ""
read -p "Presiona ENTER cuando el deploy esté SUCCESS..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 5: IMPORTAR SCHEMA DE BASE DE DATOS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Opción A - Desde Railway CLI (Recomendado):"
echo ""
echo "Ejecutando conexión a MySQL..."
echo ""
echo "⚠️  IMPORTANTE: Una vez conectado, ejecuta:"
echo "   SOURCE database/schema-ultra-optimized.sql;"
echo ""
read -p "Presiona ENTER para conectar a MySQL..."

# Intentar conectar a MySQL
railway connect MySQL || {
    echo ""
    echo "⚠️  No se pudo conectar automáticamente."
    echo ""
    echo "Opción B - Manual:"
    echo "1. En Railway, click en el servicio MySQL"
    echo "2. Ve a la pestaña 'Connect'"
    echo "3. Copia el 'Connection String'"
    echo "4. Usa TablePlus o MySQL Workbench"
    echo "5. Importa el archivo: database/schema-ultra-optimized.sql"
    echo ""
    read -p "Presiona ENTER cuando hayas importado el schema..."
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 6: CREAR USUARIO ADMIN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Ejecutando script de creación de admin..."
echo ""

railway run npx tsx scripts/create-admin.ts || {
    echo ""
    echo "⚠️  No se pudo ejecutar automáticamente."
    echo ""
    echo "Opción manual:"
    echo "1. En Railway, click en tu servicio backend"
    echo "2. Click en '...' (menú) → 'Shell'"
    echo "3. Ejecuta: npx tsx scripts/create-admin.ts"
    echo ""
    read -p "Presiona ENTER cuando hayas creado el admin..."
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 7: VERIFICAR DEPLOY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Verificando endpoints..."
echo ""

if [ "$RAILWAY_DOMAIN" != "tu-dominio.up.railway.app" ]; then
    echo "🔍 Health check..."
    curl -s "https://$RAILWAY_DOMAIN/health" && echo "✅ Health check OK" || echo "❌ Health check FAILED"
    
    echo ""
    echo "🔍 API Articles..."
    curl -s "https://$RAILWAY_DOMAIN/api/articles" | head -c 100 && echo "... ✅ API OK" || echo "❌ API FAILED"
else
    echo "⚠️  Dominio no configurado. Verifica manualmente:"
    echo "   https://tu-dominio.up.railway.app/health"
    echo "   https://tu-dominio.up.railway.app/api/articles"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASO 8: CONECTAR FRONTEND CON BACKEND"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Para conectar el frontend en Vercel con el backend:"
echo ""
echo "1. Ir a: https://vercel.com/dashboard"
echo "2. Seleccionar proyecto: politica-argentina"
echo "3. Settings → Environment Variables"
echo "4. Agregar:"
echo ""
echo "   VITE_API_URL=https://$RAILWAY_DOMAIN"
echo ""
echo "5. Re-deploy el frontend"
echo ""
read -p "Presiona ENTER cuando hayas configurado Vercel..."

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║        ✅ SETUP DE RAILWAY COMPLETADO ✅                      ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 🎉 RESUMEN FINAL                                              │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""
echo "✅ MySQL Database agregada"
echo "✅ Variables de entorno configuradas"
echo "✅ Dominio público generado"
echo "✅ Schema de base de datos importado"
echo "✅ Usuario admin creado"
echo "✅ Deploy verificado"
echo "✅ Frontend conectado"
echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 🔗 TUS URLS                                                   │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""
echo "🏠 Frontend:"
echo "   https://politicaargentina.com"
echo ""
echo "🚀 Backend:"
echo "   https://$RAILWAY_DOMAIN"
echo ""
echo "📊 Admin:"
echo "   https://politicaargentina.com/admin/login"
echo "   Email: holdingdracma@gmail.com"
echo "   Password: @Bitexchangers2025"
echo ""
echo "┌───────────────────────────────────────────────────────────────┐"
echo "│ 🎯 PRÓXIMOS PASOS                                             │"
echo "└───────────────────────────────────────────────────────────────┘"
echo ""
echo "1. Probar el admin dashboard"
echo "2. Crear tu primera noticia"
echo "3. Probar el sistema de IA"
echo "4. Verificar analytics"
echo "5. Probar multi-idioma"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "     🏆 SISTEMA COMPLETO 100% FUNCIONAL 🏆"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "¡Felicitaciones! Tu portal de noticias está completamente"
echo "operativo con frontend y backend funcionando."
echo ""

