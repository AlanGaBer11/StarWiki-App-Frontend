/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon/logo.png"],
      manifest: false, // usa tu manifest existente
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,webp,jpg,svg}"],
      },
      devOptions: {
        enabled: true, // para ver sw.js en modo dev
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
