/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false, // usa el manifest existente en public/manifest.json

      // Modo para usar Service Worker en public/pwa/service-worker.js
      strategies: "injectManifest",
      srcDir: "public/pwa",
      filename: "service-worker.js",

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,webp,jpg,svg}"],
      },

      devOptions: {
        enabled: true, // para ver el SW en modo dev
      },
    }),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },

  server: {
    proxy: {
      "/api/demonslayer": {
        target: "https://www.demonslayer-api.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/demonslayer/, ""),
        secure: false,
      },
    },
  },
});
