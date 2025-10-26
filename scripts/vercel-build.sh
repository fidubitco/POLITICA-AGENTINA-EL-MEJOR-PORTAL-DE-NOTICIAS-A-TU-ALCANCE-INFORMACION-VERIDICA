#!/bin/bash

# 🚀 VERCEL BUILD SCRIPT - OPTIMIZADO
# Script de build para deployment en Vercel

set -e  # Exit on error

echo "🚀 Starting Vercel Build..."
echo ""

# 1. Verificar Node version
echo "📦 Node version:"
node --version
echo ""

# 2. Verificar pnpm
echo "📦 pnpm version:"
pnpm --version
echo ""

# 3. Limpiar cache
echo "🧹 Cleaning cache..."
rm -rf node_modules/.vite
rm -rf dist
echo "✅ Cache cleared"
echo ""

# 4. Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile
echo "✅ Dependencies installed"
echo ""

# 5. Build frontend
echo "🏗️  Building frontend..."
pnpm build
echo "✅ Frontend built"
echo ""

# 6. Verificar output
echo "📊 Build output:"
ls -lh public/ | head -10
echo ""

# 7. Verificar imágenes
echo "🖼️  Images:"
ls -lh public/images/ | head -5
echo ""

echo "✅ Vercel Build Complete!"

