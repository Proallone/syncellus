import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    if (!env.SYNCELLUS_API_URL) {
        console.error("SYNCELLUS_API_URL is not set. Please check your .env file.");
    }

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        server: {
            proxy: {
                "/syncellus/api/v1": {
                    target: env.SYNCELLUS_API_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace("/syncellus/api/v1", "")
                }
            }
        }
    };
});
