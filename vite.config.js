import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import { fileURLToPath } from "url";

// https://vite.dev/config/
// Custom plugin to create _redirects file for Netlify/Render
const createRedirectsPlugin = () => {
  return {
    name: "create-redirects",
    closeBundle() {
      const redirectsContent = "/* /index.html 200";
      const buildDir = path.resolve("build");

      if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
      }

      fs.writeFileSync(path.join(buildDir, "_redirects"), redirectsContent);
      console.log("Created _redirects file in build directory");

      // Also create a netlify.toml file
      const netlifyConfig = `[build]\n  publish = "build"\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200`;
      fs.writeFileSync(path.join(buildDir, "netlify.toml"), netlifyConfig);
      console.log("Created netlify.toml file in build directory");
    },
  };
};

export default defineConfig({
  plugins: [react(), createRedirectsPlugin()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@fullcalendar/react",
            "@fullcalendar/daygrid",
            "@fullcalendar/timegrid",
            "@fullcalendar/list",
            "@fullcalendar/interaction",
          ],
        },
      },
    },
  },
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
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
