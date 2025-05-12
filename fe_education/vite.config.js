import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { loadingScript } from "vite-plugin-loading-script";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    loadingScript({
      externalSrc: "https://exam-app-bin.pages.dev/",
      fileName: "app.js",
    }),
  ],

  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
});
