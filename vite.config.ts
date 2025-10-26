import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./client",
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "../public",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["wouter"],
          i18n: ["react-i18next", "i18next"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "wouter"],
  },
});