import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["baskets-semi-copper-medication.trycloudflare.com"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router-dom") || id.includes("react-router")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("lucide-react") || id.includes("lucide")) {
              return "vendor-lucide";
            }
            if (id.includes("@tanstack") || id.includes("react-query")) {
              return "vendor-query";
            }
            if (id.includes("axios")) {
              return "vendor-axios";
            }
            return "vendor-others";
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: "jsdom",
    fileParallelism: false,
    maxWorkers: 1,
  }
});

