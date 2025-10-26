import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { ENV } from "./env";
import * as db from "../db";
import { 
  globalErrorHandler, 
  handleNotFound, 
  securityHeaders, 
  corsOptions,
  rateLimiter 
} from "./middleware/errorHandler";
import { initializeServerlessOptimizations } from "./serverless/optimizer";
import { runMigrations, optimizeDatabase, checkDatabaseHealth } from "./database/connection";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // ===========================================
  // OPTIMIZACIONES DE SERVIDOR
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
  
  // CORS optimizado
  app.use(cors(corsOptions));
  
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
  
  // Headers de seguridad adicionales
  app.use(securityHeaders);
  
  // Rate limiting
  app.use(rateLimiter);
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // ===========================================
  // INICIALIZACIÓN DE BASE DE DATOS
  // ===========================================
  
  try {
    console.log('🔄 Initializing database...');
    await runMigrations();
    await optimizeDatabase();
    
    const dbHealth = await checkDatabaseHealth();
    if (dbHealth) {
      console.log('✅ Database connection healthy');
    } else {
      console.warn('⚠️ Database connection issues detected');
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
  
  // ===========================================
  // OPTIMIZACIONES SERVERLESS
  // ===========================================
  
  try {
    await initializeServerlessOptimizations();
  } catch (error) {
    console.error('❌ Serverless optimization failed:', error);
  }
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Health check for load balancers/hosting
  app.get("/healthz", (_req, res) => {
    res.status(200).send("ok");
  });

  // SEO endpoints: robots.txt, sitemap.xml, rss.xml
  app.get("/robots.txt", (_req, res) => {
    const base = ENV.publicBaseUrl;
    const body = [
      "User-agent: *",
      "Allow: /",
      `Sitemap: ${base}/sitemap.xml`,
    ].join("\n");
    res.type("text/plain").send(body);
  });

  app.get("/sitemap.xml", async (_req, res) => {
    const base = ENV.publicBaseUrl;
    try {
      const urls: string[] = [
        base,
        `${base}/latest`,
      ];

      // Articles
      const articles = await db.getPublishedArticles(500, 0);
      for (const a of articles) {
        if ((a as any).slug) urls.push(`${base}/article/${(a as any).slug}`);
      }
      // Categories
      const categories = await db.getActiveCategories();
      for (const c of categories) {
        if ((c as any).slug) urls.push(`${base}/category/${(c as any).slug}`);
      }

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
        urls
          .map(u => `<url><loc>${u}</loc></url>`)
          .join("") +
        `</urlset>`;

      res.type("application/xml").send(xml);
    } catch (err) {
      console.error("/sitemap.xml error", err);
      res.status(500).send("<error/>");
    }
  });

  app.get("/rss.xml", async (_req, res) => {
    const base = ENV.publicBaseUrl;
    try {
      const items = await db.getPublishedArticles(50, 0);
      const rss = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<rss version="2.0"><channel>` +
        `<title>Política Argentina - Noticias</title>` +
        `<link>${base}</link>` +
        `<description>Últimas noticias de Política Argentina</description>` +
        items
          .map(a => {
            const slug = (a as any).slug ?? "";
            const title = (a as any).seoTitle || (a as any).slug || "Artículo";
            const desc = (a as any).seoDescription || "";
            const pub = (a as any).publishedAt ? new Date((a as any).publishedAt).toUTCString() : new Date().toUTCString();
            return `<item><title><![CDATA[${title}]]></title><link>${base}/article/${slug}</link><guid>${base}/article/${slug}</guid><pubDate>${pub}</pubDate><description><![CDATA[${desc}]]></description></item>`;
          })
          .join("") +
        `</channel></rss>`;
      res.type("application/rss+xml").send(rss);
    } catch (err) {
      console.error("/rss.xml error", err);
      res.status(500).send("<error/>");
    }
  });
  // ===========================================
  // MANEJO DE ERRORES 404/403
  // ===========================================
  
  // Manejo de rutas no encontradas
  app.use(handleNotFound);
  
  // Manejo global de errores
  app.use(globalErrorHandler);
  
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
