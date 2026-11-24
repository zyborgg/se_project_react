import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this app from /se_project_react/
  // (production = `npm run build` and `npm run preview`; dev stays at /)
  base: mode === "production" ? "/se_project_react/" : "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
}));
