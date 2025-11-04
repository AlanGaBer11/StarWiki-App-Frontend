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

      injectRegister: "auto",
      srcDir: "public",
      filename: "sw.js",
      manifest: false,
      devOptions: {
        enabled: true,
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
