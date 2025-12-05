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
      strategies: "injectManifest",
      srcDir: "public",
      filename: "sw.js",

      injectManifest: {
        swSrc: "public/sw.js",
        swDest: "dist/sw.js",
        injectionPoint: undefined,
        globPatterns: ["**/*.{js,css,html,ico,png,webp,jpg, jpeg, gif,svg}"],
      },
      manifest: false,
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
