import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: "client/public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "public",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild', // Usar esbuild (más rápido que terser)
    target: "es2020",
    chunkSizeWarningLimit: 1000, // Aumentar límite de warning
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'router': ['wouter'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'animation': ['framer-motion', 'gsap'],
          'utils': ['axios', 'clsx', 'tailwind-merge']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    exclude: []
  }
});
