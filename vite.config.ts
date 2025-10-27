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
    minify: false,
    target: "es2020",
  },
});
