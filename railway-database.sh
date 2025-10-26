#!/bin/bash

# 🗄️ Script para crear base de datos en Railway
# Ejecuta este script para crear una base de datos PostgreSQL

echo "🗄️ Creando base de datos PostgreSQL en Railway..."

# Crear base de datos PostgreSQL
railway add postgresql

echo "✅ Base de datos creada!"
echo "📝 La DATABASE_URL se configurará automáticamente"
echo "🚀 Ahora puedes ejecutar: railway up"
