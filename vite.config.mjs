import { join, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { readdir, rm } from "node:fs/promises";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = process.env.PORT ?? 10001;

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
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
  plugins: [
    react(),
    {
      name: "Cleaning dist folder",
      async buildStart() {
        const __dirname = fileURLToPath(new URL(".", import.meta.url));
        let filePaths = [];
        try {
          filePaths = await readdir(join(__dirname, "dist"));
        } catch (err) {
          if (err.code !== "ENOENT") {
            throw err;
          }
        }
        for (const filePath of filePaths) {
          if (filePath === ".git") {
            continue;
          }
          const fullFilePath = join(__dirname, "dist", filePath);
          await rm(fullFilePath, { recursive: true });
        }
      },
    },
  ],
});
