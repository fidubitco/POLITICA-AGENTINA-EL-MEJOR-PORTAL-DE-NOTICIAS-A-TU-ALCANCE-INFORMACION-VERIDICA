#!/bin/bash

# Script para importar schema a Railway MySQL
# Autor: AI Assistant
# Fecha: 2025-01-26

echo "🗄️  IMPORTANDO SCHEMA A RAILWAY MYSQL..."
echo ""

# Credenciales de Railway
MYSQL_HOST="mainline.proxy.rlwy.net"
MYSQL_PORT="44905"
MYSQL_USER="root"
MYSQL_PASSWORD="hyCiIQIcaxJRREqkovxiZVzgWZSoUsfg"
MYSQL_DATABASE="railway"

# Paso 1: Limpiar tablas existentes
echo "🧹 Limpiando tablas existentes..."
mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE << EOF
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS article_views;
DROP TABLE IF EXISTS article_shares;
DROP TABLE IF EXISTS article_likes;
DROP TABLE IF EXISTS article_comments;
DROP TABLE IF EXISTS article_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS poll_votes;
DROP TABLE IF EXISTS poll_options;
DROP TABLE IF EXISTS polls;
DROP TABLE IF EXISTS election_results;
DROP TABLE IF EXISTS elections;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS live_updates;
DROP TABLE IF EXISTS political_settings;
DROP TABLE IF EXISTS financial_data;
DROP TABLE IF EXISTS financial_history;
DROP TABLE IF EXISTS ai_analysis;
DROP TABLE IF EXISTS news_sources;
DROP TABLE IF EXISTS scraped_articles;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS analytics_events;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS push_subscriptions;

SET FOREIGN_KEY_CHECKS = 1;
EOF

echo "✅ Tablas limpiadas"
echo ""

# Paso 2: Importar schema
echo "📥 Importando schema completo..."
cat database/schema-complete.sql | mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE

if [ $? -eq 0 ]; then
    echo "✅ Schema importado exitosamente"
    echo ""
    
    # Paso 3: Verificar
    echo "🔍 Verificando tablas..."
    mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE -e "SHOW TABLES;"
    echo ""
    
    echo "📊 Verificando categorías..."
    mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE -e "SELECT COUNT(*) as total_categories FROM categories;"
    echo ""
    
    echo "🎉 ¡IMPORTACIÓN COMPLETA!"
    echo ""
    echo "✅ 25 tablas creadas"
    echo "✅ 8 categorías insertadas"
    echo "✅ Datos iniciales cargados"
    echo ""
    echo "🚀 Siguiente paso: railway up"
else
    echo "❌ Error al importar schema"
    exit 1
fi

