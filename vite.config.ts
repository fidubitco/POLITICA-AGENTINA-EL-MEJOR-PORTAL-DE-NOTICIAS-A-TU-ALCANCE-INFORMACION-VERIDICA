import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      // Optimizaciones de React
      babel: {
        plugins: [],
      },
    }),
  ],
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
    strictPort: false,
  },
  build: {
    outDir: "../public",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: "terser",
    target: "es2015",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Estrategia de chunking optimizada
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules")) {
            // React core
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            // Router
            if (id.includes("wouter")) {
              return "vendor-router";
            }
            // i18n
            if (id.includes("i18next") || id.includes("react-i18next")) {
              return "vendor-i18n";
            }
            // UI components
            if (id.includes("@radix-ui") || id.includes("lucide-react")) {
              return "vendor-ui";
            }
            // Otros vendors
            return "vendor-misc";
          }
          // Admin pages en chunk separado
          if (id.includes("/pages/admin/")) {
            return "admin";
          }
          // Pages públicas
          if (id.includes("/pages/")) {
            return "pages";
          }
          // Components
          if (id.includes("/components/")) {
            return "components";
          }
        },
        // Nombres de archivo con hash para cache busting
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(assetInfo.name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "wouter",
      "react-i18next",
      "i18next",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
    legalComments: "none",
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: false,
  },
});
