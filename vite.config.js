import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    plugins: [react()],
    base: process.env.VITE_BASE_PATH || "/",
    server: {
      port: 3000,
      host: true
    }
  };
});
