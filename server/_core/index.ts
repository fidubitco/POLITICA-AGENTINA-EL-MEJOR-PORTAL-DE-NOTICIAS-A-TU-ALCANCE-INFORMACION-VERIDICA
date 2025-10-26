import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { serveStatic, setupVite } from "./vite";

const app = express();
const server = createServer(app);

// ===========================================
// MIDDLEWARE DE SEGURIDAD Y OPTIMIZACIÓN
// ===========================================

// Headers de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", "https://api.openai.com", "https://api.anthropic.com", "https://generativelanguage.googleapis.com"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Compresión
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Body parser
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ===========================================
// RUTAS DE API
// ===========================================

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// API de noticias
app.get("/api/news", (_req, res) => {
  const mockNews = [
    {
      id: "1",
      title: "Nuevas medidas económicas del gobierno argentino",
      excerpt: "El gobierno anuncia un paquete de medidas económicas para reactivar la economía nacional.",
      content: "Contenido completo del artículo...",
      imageUrl: "/images/news-1.jpg",
      author: "Redacción Política Argentina",
      publishedAt: new Date().toISOString(),
      category: "Política",
      tags: ["economía", "gobierno", "medidas"],
      views: 1250,
      likes: 45,
      shares: 23,
      isBreaking: true,
      isTrending: true
    },
    {
      id: "2",
      title: "Análisis del mercado financiero argentino",
      excerpt: "Expertos analizan las tendencias del mercado financiero y sus implicaciones.",
      content: "Contenido completo del artículo...",
      imageUrl: "/images/news-2.jpg",
      author: "Equipo Económico",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      category: "Economía",
      tags: ["finanzas", "mercado", "análisis"],
      views: 890,
      likes: 32,
      shares: 15,
      isBreaking: false,
      isTrending: true
    }
  ];
  
  res.json(mockNews);
});

// ===========================================
// SEO ENDPOINTS
// ===========================================

// Robots.txt
  app.get("/robots.txt", (_req, res) => {
  const robots = [
      "User-agent: *",
      "Allow: /",
    "Sitemap: https://politicaargentina.com/sitemap.xml"
    ].join("\n");
  
  res.type("text/plain").send(robots);
});

// Sitemap.xml
app.get("/sitemap.xml", (_req, res) => {
  const baseUrl = "https://politicaargentina.com";
  const urls = [
    { loc: baseUrl, lastmod: new Date().toISOString(), changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/en/`, lastmod: new Date().toISOString(), changefreq: "daily", priority: "0.9" },
    { loc: `${baseUrl}/fr/`, lastmod: new Date().toISOString(), changefreq: "daily", priority: "0.9" },
    { loc: `${baseUrl}/pt/`, lastmod: new Date().toISOString(), changefreq: "daily", priority: "0.9" }
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;
  
  res.type("application/xml").send(sitemap);
});

// ===========================================
// CONFIGURACIÓN DE VITE
// ===========================================

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

// ===========================================
// INICIAR SERVIDOR
// ===========================================

const port = process.env.PORT || 3000;

  server.listen(port, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log(`📱 Modo: ${isDev ? 'Desarrollo' : 'Producción'}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  });