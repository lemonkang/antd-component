import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    mockDevServerPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://appf1.karbonvcc.com",
        changeOrigin: true,
      },
    },
  },
});
