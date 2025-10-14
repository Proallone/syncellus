import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import process from "node:process";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    if (!env.SYNCELLUS_API_URL) {
        console.error("SYNCELLUS_API_URL is not set. Please check your .env file.");
    }

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(import.meta.dirname, "./src")
            }
        },
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true
                }
            }
        }
    };
});
