import { ViteDevServer } from "vite";
import { createServer as createViteDevServer } from "vite";
import { Express } from "express";
import { Server } from "http";
import path from "path";
import fs from "fs";

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteDevServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: path.resolve(process.cwd(), "client"),
  });

  app.use(vite.ssrLoadModule);
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    console.error(`❌ No se encontró el directorio de build: ${distPath}`);
    console.error("💡 Ejecuta 'pnpm build' primero");
    return;
  }

  app.use(express.static(distPath));

  // SPA fallback
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}