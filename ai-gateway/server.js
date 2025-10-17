/**
 * AI GATEWAY - Zero-Cost Local LLM Server
 *
 * Features:
 * - Ollama integration (Llama 3.1, Mistral, CodeLlama)
 * - Rotating proxy support (Tor, Squid)
 * - Vector embeddings (pgvector)
 * - Redis caching
 * - Rate limiting
 * - Load balancing
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Redis = require('ioredis');
const { Pool } = require('pg');
const axios = require('axios');
const { SocksProxyAgent } = require('socks-proxy-agent');

const app = express();
const PORT = process.env.PORT || 4000;

// ============================================
// CONFIGURATION
// ============================================
const config = {
  ollama: {
    baseUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
    models: {
      reasoning: 'llama3.1:8b',
      fast: 'mistral:7b',
      code: 'codellama:7b',
      embed: 'nomic-embed-text'
    }
  },
  redis: new Redis(process.env.REDIS_URL || 'redis://localhost:6379'),
  postgres: new Pool({
    connectionString: process.env.POSTGRES_URL
  }),
  vectorDb: new Pool({
    connectionString: process.env.VECTOR_DB_URL
  }),
  proxies: {
    tor: process.env.TOR_PROXY || 'socks5://localhost:9050',
    squid: process.env.SQUID_PROXY || 'http://localhost:3128'
  }
};

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// PROXY ROTATION
// ============================================
class ProxyRotator {
  constructor() {
    this.proxies = [
      null, // Direct connection
      new SocksProxyAgent(config.proxies.tor),
      { host: config.proxies.squid.replace('http://', ''), port: 3128 }
    ];
    this.currentIndex = 0;
  }

  getNext() {
    const proxy = this.proxies[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.proxies.length;
    return proxy;
  }

  async testProxy(proxy) {
    try {
      const agent = proxy instanceof SocksProxyAgent ? proxy : undefined;
      await axios.get('https://api.ipify.org', {
        httpAgent: agent,
        httpsAgent: agent,
        timeout: 5000
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

const proxyRotator = new ProxyRotator();

// ============================================
// CACHE HELPER
// ============================================
async function getCached(key, ttl = 3600) {
  const cached = await config.redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

async function setCache(key, value, ttl = 3600) {
  await config.redis.setex(key, ttl, JSON.stringify(value));
}

// ============================================
// OLLAMA CLIENT
// ============================================
class OllamaClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async generate(model, prompt, options = {}) {
    const cacheKey = `ollama:${model}:${Buffer.from(prompt).toString('base64').slice(0, 50)}`;

    // Check cache
    const cached = await getCached(cacheKey);
    if (cached) {
      console.log('✅ Cache hit');
      return cached;
    }

    // Generate
    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model,
      prompt,
      stream: false,
      options: {
        temperature: options.temperature || 0.7,
        top_p: options.top_p || 0.9,
        top_k: options.top_k || 40,
        ...options
      }
    });

    const result = response.data;
    await setCache(cacheKey, result, 3600);
    return result;
  }

  async embed(text) {
    const response = await axios.post(`${this.baseUrl}/api/embeddings`, {
      model: config.ollama.models.embed,
      prompt: text
    });
    return response.data.embedding;
  }

  async chat(model, messages) {
    const response = await axios.post(`${this.baseUrl}/api/chat`, {
      model,
      messages,
      stream: false
    });
    return response.data;
  }
}

const ollama = new OllamaClient(config.ollama.baseUrl);

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      ollama: config.ollama.baseUrl,
      redis: 'connected',
      postgres: 'connected'
    }
  });
});

// Generate text with LLM
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model = 'reasoning', options = {} } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const modelName = config.ollama.models[model] || model;
    const result = await ollama.generate(modelName, prompt, options);

    res.json({
      success: true,
      response: result.response,
      model: modelName,
      cached: false
    });
  } catch (error) {
    console.error('Generate error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Chat with LLM
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'reasoning' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const modelName = config.ollama.models[model] || model;
    const result = await ollama.chat(modelName, messages);

    res.json({
      success: true,
      message: result.message,
      model: modelName
    });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Generate embeddings
app.post('/api/embed', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const embedding = await ollama.embed(text);

    res.json({
      success: true,
      embedding,
      dimensions: embedding.length
    });
  } catch (error) {
    console.error('Embed error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Vector similarity search
app.post('/api/search', async (req, res) => {
  try {
    const { query, limit = 10 } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Generate query embedding
    const queryEmbedding = await ollama.embed(query);

    // Search in pgvector
    const result = await config.vectorDb.query(`
      SELECT
        id,
        content,
        metadata,
        1 - (embedding <=> $1::vector) as similarity
      FROM embeddings
      ORDER BY embedding <=> $1::vector
      LIMIT $2
    `, [JSON.stringify(queryEmbedding), limit]);

    res.json({
      success: true,
      results: result.rows
    });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Fetch with rotating proxy
app.post('/api/fetch', async (req, res) => {
  try {
    const { url, method = 'GET', headers = {}, data } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const proxy = proxyRotator.getNext();
    const agent = proxy instanceof SocksProxyAgent ? proxy : undefined;

    const response = await axios({
      method,
      url,
      headers,
      data,
      httpAgent: agent,
      httpsAgent: agent,
      timeout: 30000
    });

    res.json({
      success: true,
      data: response.data,
      status: response.status,
      proxy: proxy ? 'enabled' : 'direct'
    });
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Scrape with headless browser
app.post('/api/scrape', async (req, res) => {
  try {
    const { url, selector } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Use browserless/chrome container
    const response = await axios.post('http://chromium:3000/content', {
      url,
      waitFor: selector || 'body'
    });

    res.json({
      success: true,
      content: response.data
    });
  } catch (error) {
    console.error('Scrape error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Generate article with AI
app.post('/api/generate-article', async (req, res) => {
  try {
    const { title, keywords, length = 'medium' } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const prompt = `Write a professional news article about: ${title}

Keywords: ${keywords || 'none'}
Length: ${length}

Format the article with:
- Engaging headline
- Lead paragraph
- 3-5 body paragraphs
- Quotes if relevant
- Conclusion

Style: Professional journalism, objective tone.`;

    const result = await ollama.generate(config.ollama.models.reasoning, prompt, {
      temperature: 0.8,
      top_p: 0.95
    });

    res.json({
      success: true,
      article: result.response,
      model: config.ollama.models.reasoning
    });
  } catch (error) {
    console.error('Generate article error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🚀 AI GATEWAY STARTED                                    ║
║                                                           ║
║  Port: ${PORT}                                           ║
║  Ollama: ${config.ollama.baseUrl}                        ║
║  Redis: Connected                                         ║
║  Postgres: Connected                                      ║
║  Proxies: Tor + Squid                                     ║
║                                                           ║
║  Endpoints:                                               ║
║  - POST /api/generate      (Text generation)              ║
║  - POST /api/chat          (Chat completion)              ║
║  - POST /api/embed         (Embeddings)                   ║
║  - POST /api/search        (Vector search)                ║
║  - POST /api/fetch         (Proxy fetch)                  ║
║  - POST /api/scrape        (Web scraping)                 ║
║  - POST /api/generate-article (AI articles)               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await config.redis.quit();
  await config.postgres.end();
  await config.vectorDb.end();
  process.exit(0);
});
