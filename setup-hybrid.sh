#!/bin/bash

# ============================================
# SETUP HÍBRIDO - ZERO COST AI STACK
# ============================================

set -e

echo "
╔═══════════════════════════════════════════════════════════╗
║  🚀 POLITICA ARGENTINA - HYBRID SETUP                     ║
║                                                           ║
║  Zero-Cost AI Stack con LLMs Locales                      ║
╚═══════════════════════════════════════════════════════════╝
"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    echo "   macOS: brew install --cask docker"
    echo "   Linux: sudo apt-get install docker-ce"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado"
    exit 1
fi

echo "✅ Docker encontrado: $(docker --version)"
echo "✅ Docker Compose encontrado: $(docker-compose --version)"
echo ""

# Step 1: Build and start services
echo "📦 Iniciando servicios Docker..."
docker-compose -f docker-compose.hybrid.yml up -d

echo ""
echo "⏳ Esperando que los servicios estén listos..."
sleep 10

# Step 2: Check health
echo ""
echo "🏥 Verificando salud de servicios..."

check_service() {
    local service=$1
    local port=$2
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if docker ps | grep -q "$service"; then
            if nc -z localhost $port 2>/dev/null; then
                echo "✅ $service está listo (puerto $port)"
                return 0
            fi
        fi
        echo "   Intento $attempt/$max_attempts - Esperando $service..."
        sleep 2
        ((attempt++))
    done

    echo "❌ $service no respondió después de $max_attempts intentos"
    return 1
}

check_service "politica-postgres" 5432
check_service "politica-redis" 6379
check_service "politica-ollama" 11434

# Step 3: Initialize database
echo ""
echo "🗄️  Inicializando base de datos..."
docker exec politica-postgres psql -U politica_user -d politica_argentina -c "CREATE EXTENSION IF NOT EXISTS vector;" 2>/dev/null || echo "   Vector extension ya existe"

docker exec politica-postgres psql -U politica_user -d politica_argentina << 'EOF'
CREATE TABLE IF NOT EXISTS embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(768),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS embeddings_embedding_idx ON embeddings USING ivfflat (embedding vector_cosine_ops);
EOF

echo "✅ Base de datos inicializada"

# Step 4: Download LLM models
echo ""
echo "🤖 Descargando modelos LLM..."
echo "   Esto puede tomar varios minutos (primera vez)..."
echo ""

download_model() {
    local model=$1
    local size=$2
    echo "📥 Descargando $model ($size)..."
    docker exec politica-ollama ollama pull $model
}

download_model "llama3.1:8b" "4.7 GB"
download_model "mistral:7b" "4.1 GB"
download_model "nomic-embed-text" "274 MB"
download_model "phi3:mini" "2.3 GB"

echo ""
echo "✅ Modelos descargados"

# Step 5: Install AI Gateway dependencies
echo ""
echo "📦 Instalando dependencias del AI Gateway..."
cd ai-gateway
npm install --silent
cd ..

echo "✅ Dependencias instaladas"

# Step 6: Test services
echo ""
echo "🧪 Testeando servicios..."

# Test Ollama
echo "Testing Ollama..."
curl -s http://localhost:11434/api/tags | grep -q "models" && echo "✅ Ollama OK" || echo "❌ Ollama FAIL"

# Test AI Gateway
echo "Testing AI Gateway..."
sleep 5
curl -s http://localhost:4000/health | grep -q "healthy" && echo "✅ AI Gateway OK" || echo "❌ AI Gateway FAIL"

# Test Redis
echo "Testing Redis..."
docker exec politica-redis redis-cli ping | grep -q "PONG" && echo "✅ Redis OK" || echo "❌ Redis FAIL"

# Test PostgreSQL
echo "Testing PostgreSQL..."
docker exec politica-postgres pg_isready -U politica_user | grep -q "accepting" && echo "✅ PostgreSQL OK" || echo "❌ PostgreSQL FAIL"

# Step 7: Show URLs
echo ""
echo "
╔═══════════════════════════════════════════════════════════╗
║  ✅ SETUP COMPLETADO                                       ║
╚═══════════════════════════════════════════════════════════╝

📊 SERVICIOS DISPONIBLES:

🤖 Ollama API:           http://localhost:11434
🖥️  Ollama Web UI:        http://localhost:3030
🔄 n8n Automation:       http://localhost:5678
   Login: admin / admin123

🚀 AI Gateway:           http://localhost:4000
   Health: http://localhost:4000/health
   Docs: Ver HYBRID-DEPLOYMENT.md

🗄️  PostgreSQL:           localhost:5432
   User: politica_user
   DB: politica_argentina

💾 Redis:                localhost:6379

🔒 Tor Proxy:            socks5://localhost:9050
🌐 Squid Proxy:          http://localhost:3128
🌍 Chromium Browser:     http://localhost:3001

📝 PRÓXIMOS PASOS:

1. Abrir Ollama UI: http://localhost:3030
2. Configurar workflows n8n: http://localhost:5678
3. Testear AI Gateway:
   curl -X POST http://localhost:4000/api/generate \\
     -H 'Content-Type: application/json' \\
     -d '{\"prompt\": \"Hola mundo\", \"model\": \"reasoning\"}'

4. Ver logs:
   docker-compose -f docker-compose.hybrid.yml logs -f

5. Detener servicios:
   docker-compose -f docker-compose.hybrid.yml down

📚 DOCUMENTACIÓN:
   - HYBRID-DEPLOYMENT.md (completa)
   - docker-compose.hybrid.yml (servicios)
   - ai-gateway/server.js (API endpoints)

🎉 HAPPY HACKING!
"
