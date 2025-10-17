# 🚀 QUICKSTART - Hybrid AI Infrastructure

**5-minute setup guide** for running the zero-cost AI stack locally.

---

## Prerequisites

```bash
# macOS
brew install --cask docker

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

**Requirements**:
- Docker Desktop (macOS/Windows) or Docker Engine (Linux)
- 20GB free disk space (for LLM models)
- 8GB RAM minimum (16GB recommended)

---

## 🎯 Option 1: Automated Setup (Recommended)

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/politica-argentina.git
cd politica-argentina

# Run automated setup
./setup-hybrid.sh
```

**What it does**:
1. ✅ Checks Docker installation
2. 🐳 Starts 11 Docker services
3. 🗄️ Initializes PostgreSQL + pgvector
4. 🤖 Downloads LLM models (Llama 3.1, Mistral, etc.)
5. 📦 Installs AI Gateway dependencies
6. 🧪 Tests all services
7. 📊 Displays service URLs

**Time**: 20-30 minutes (first run, due to model downloads)

---

## 🔧 Option 2: Manual Setup

### Step 1: Start Services

```bash
docker compose -f docker-compose.hybrid.yml up -d
```

### Step 2: Initialize Database

```bash
# Add pgvector extension
docker exec politica-postgres psql -U politica_user -d politica_argentina \
  -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Create embeddings table
docker exec politica-postgres psql -U politica_user -d politica_argentina << 'EOF'
CREATE TABLE IF NOT EXISTS embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(768),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS embeddings_embedding_idx
  ON embeddings USING ivfflat (embedding vector_cosine_ops);
EOF
```

### Step 3: Download LLM Models

```bash
# Reasoning model (4.7 GB)
docker exec politica-ollama ollama pull llama3.1:8b

# Fast model (4.1 GB)
docker exec politica-ollama ollama pull mistral:7b

# Embeddings (274 MB)
docker exec politica-ollama ollama pull nomic-embed-text

# Code generation (3.8 GB)
docker exec politica-ollama ollama pull codellama:7b
```

### Step 4: Install AI Gateway Dependencies

```bash
cd ai-gateway
npm install
cd ..
```

---

## 🔍 Service URLs

After setup, access these services:

| Service | URL | Description |
|---------|-----|-------------|
| **AI Gateway** | http://localhost:4000 | Express API for LLMs |
| **Ollama API** | http://localhost:11434 | Direct LLM access |
| **Ollama Web UI** | http://localhost:3030 | Browser interface |
| **n8n Automation** | http://localhost:5678 | Workflows (admin/admin123) |
| **PostgreSQL** | localhost:5432 | Main database |
| **pgvector** | localhost:5433 | Vector database |
| **Redis** | localhost:6379 | Cache layer |

---

## 🧪 Test Installation

### Test AI Gateway

```bash
curl -X POST http://localhost:4000/api/generate \
  -H 'Content-Type: application/json' \
  -d '{
    "prompt": "Escribe un titular de noticia sobre economía argentina",
    "model": "reasoning"
  }'
```

**Expected response**:
```json
{
  "success": true,
  "response": "Argentina enfrenta inflación del 140% anual...",
  "model": "llama3.1:8b",
  "cached": false
}
```

### Test Embeddings

```bash
curl -X POST http://localhost:4000/api/embed \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "La economía argentina está en crisis"
  }'
```

**Expected response**:
```json
{
  "success": true,
  "embedding": [0.123, -0.456, 0.789, ...],
  "dimensions": 768
}
```

### Test Vector Search

```bash
curl -X POST http://localhost:4000/api/search \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "crisis económica",
    "limit": 5
  }'
```

### Test Chat Completion

```bash
curl -X POST http://localhost:4000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "messages": [
      {"role": "user", "content": "¿Qué es la inflación?"}
    ],
    "model": "fast"
  }'
```

---

## 📊 Health Checks

```bash
# Check all containers
docker compose -f docker-compose.hybrid.yml ps

# Check AI Gateway health
curl http://localhost:4000/health

# Check Ollama models
curl http://localhost:11434/api/tags

# Check Redis
docker exec politica-redis redis-cli ping

# Check PostgreSQL
docker exec politica-postgres pg_isready -U politica_user
```

---

## 🛠️ Common Commands

### Start Services
```bash
docker compose -f docker-compose.hybrid.yml up -d
```

### Stop Services
```bash
docker compose -f docker-compose.hybrid.yml down
```

### View Logs
```bash
# All services
docker compose -f docker-compose.hybrid.yml logs -f

# Specific service
docker compose -f docker-compose.hybrid.yml logs -f ai-gateway
```

### Restart Service
```bash
docker compose -f docker-compose.hybrid.yml restart ai-gateway
```

### Remove All (including volumes)
```bash
docker compose -f docker-compose.hybrid.yml down -v
```

---

## 🔗 Integration with Next.js

Create API route in your Next.js app:

```typescript
// app/api/ai/generate/route.ts
export async function POST(req: Request) {
  const { prompt, model = 'reasoning' } = await req.json()

  const response = await fetch('http://localhost:4000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model })
  })

  if (!response.ok) {
    throw new Error('AI Gateway error')
  }

  return Response.json(await response.json())
}
```

Use in your components:

```typescript
// components/ArticleGenerator.tsx
'use client'

export function ArticleGenerator() {
  const [prompt, setPrompt] = useState('')
  const [article, setArticle] = useState('')

  async function generate() {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    setArticle(data.response)
  }

  return (
    <div>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button onClick={generate}>Generate</button>
      <div>{article}</div>
    </div>
  )
}
```

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :4000

# Kill process
kill -9 PID
```

### Ollama Models Not Loading

```bash
# Check Ollama container logs
docker logs politica-ollama

# Manually pull model
docker exec politica-ollama ollama pull llama3.1:8b
```

### PostgreSQL Connection Error

```bash
# Check if container is running
docker ps | grep politica-postgres

# Check logs
docker logs politica-postgres

# Restart container
docker restart politica-postgres
```

### Redis Connection Error

```bash
# Test Redis connection
docker exec politica-redis redis-cli ping

# Should return: PONG
```

### AI Gateway Not Responding

```bash
# Check container status
docker ps | grep politica-ai-gateway

# View logs
docker logs politica-ai-gateway

# Restart
docker restart politica-ai-gateway
```

---

## 📦 Model Management

### List Downloaded Models

```bash
docker exec politica-ollama ollama list
```

### Remove Model

```bash
docker exec politica-ollama ollama rm llama3.1:8b
```

### Pull New Model

```bash
# Browse models: https://ollama.com/library
docker exec politica-ollama ollama pull phi3:mini
```

### Model Sizes

| Model | Size | Speed | Quality |
|-------|------|-------|---------|
| phi3:mini | 2.3 GB | 🚀 Fast | ⭐⭐⭐ Good |
| mistral:7b | 4.1 GB | 🏃 Medium | ⭐⭐⭐⭐ Great |
| llama3.1:8b | 4.7 GB | 🚶 Slow | ⭐⭐⭐⭐⭐ Excellent |
| codellama:7b | 3.8 GB | 🏃 Medium | ⭐⭐⭐⭐ Great (code) |

---

## 💡 Next Steps

1. **Configure n8n Workflows**
   - Open http://localhost:5678
   - Login: admin / admin123
   - Create automated content pipelines

2. **Set up Monitoring**
   - Add Grafana + Prometheus
   - Track LLM response times
   - Monitor cache hit rates

3. **Deploy to Production**
   - Railway: PostgreSQL + Redis (managed)
   - Render.com: AI Gateway
   - Vercel: Next.js frontend

4. **Optimize Performance**
   - Tune Redis cache TTL
   - Implement request queuing
   - Add CDN for static assets

5. **Add Security**
   - API authentication (JWT)
   - Rate limiting per user
   - Input validation

---

## 📚 Documentation

- **Full Guide**: [HYBRID-DEPLOYMENT.md](./HYBRID-DEPLOYMENT.md)
- **Setup Script**: [setup-hybrid.sh](./setup-hybrid.sh)
- **Docker Compose**: [docker-compose.hybrid.yml](./docker-compose.hybrid.yml)
- **AI Gateway API**: [ai-gateway/server.js](./ai-gateway/server.js)

---

## 💰 Cost Analysis

| Deployment | Monthly Cost | Setup Time |
|------------|--------------|------------|
| **Self-hosted** | $0 | 30 min |
| **Railway + Vercel** | $0 (free tier) | 45 min |
| **Render + Railway** | $0 (free tier) | 45 min |
| **OpenAI API** (comparison) | $100-500 | 5 min |

**ROI**: Break-even after first month vs. OpenAI API

---

## 🎉 You're Ready!

Your zero-cost AI infrastructure is now running. Start building:

```bash
# Generate article
curl -X POST http://localhost:4000/api/generate-article \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Nueva reforma económica en Argentina",
    "keywords": "inflación, economía, reforma",
    "length": "medium"
  }'

# Search similar content
curl -X POST http://localhost:4000/api/search \
  -H 'Content-Type: application/json' \
  -d '{"query": "reforma económica", "limit": 10}'

# Scrape news
curl -X POST http://localhost:4000/api/scrape \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://example.com", "selector": "article"}'
```

**Happy hacking!** 🚀
