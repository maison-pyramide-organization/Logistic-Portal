import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  // Aliasses
  resolve: {
    alias: {
      "@": "/src",
      "@c": "/src/components",
      "@a": "/src/assets",
      "@s": "/src/styles",
      "@d": "/src/data",
    },
  },
  // Post Css
  css: {
    postcss: {
      plugins: [autoprefixer, postcssPresetEnv],
    },
  },
  // Server
  server: {
    port: 3000,
    host: true,
  },
});
