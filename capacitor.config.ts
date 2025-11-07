import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
  appId: "io.ionic.starter",
  appName: "frontend",
  webDir: "dist",
};

export default config;
