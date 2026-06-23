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
  test: {
    environment: "jsdom",
    fileParallelism: false,
    maxWorkers: 1,
  }
});

