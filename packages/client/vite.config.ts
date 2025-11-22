import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "@std/path";
import { defineConfig, loadEnv } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, Deno.cwd(), "");

  if (!env.SYNCELLUS_API_URL) {
    console.error("SYNCELLUS_API_URL is not set. Please check your .env file.");
  }

  return {
    plugins: [react(), deno(), tailwindcss()],
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
    resolve: {
      alias: {
        "@": resolve(import.meta.dirname!, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
