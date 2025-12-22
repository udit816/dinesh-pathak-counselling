import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    plugins: [react()],
    base: isProd ? "/dinesh-pathak-counselling/" : "/",
    server: {
      port: 3000,
      host: true
    }
  };
});
