import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = process.env.PORT ?? 10001;

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "",
  root: "./src/app",
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  publicDir: "public",
  server: {
    port,
    host: true,
  },
  plugins: [react()],
});
