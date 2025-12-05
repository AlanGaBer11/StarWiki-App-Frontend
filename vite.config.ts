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
        swDest: "sw.js",
        injectionPoint: undefined,
      },

      manifest: false,
      includeAssets: ["icon/logo.png"],

      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
