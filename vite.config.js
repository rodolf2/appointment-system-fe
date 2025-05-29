import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://appoinment-system-5687f.web.app'  // Replace with your Firebase project URL
          : 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});