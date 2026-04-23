import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  plugins: [svgr()],
  server: {
    host: "127.0.0.1", // Bind to loopback IP explicitly
    port: 5173, // Match your redirect URI
  },
});
