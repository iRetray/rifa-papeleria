import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    // Optimización automática de imágenes
    viteImagemin({
      gifsicle: false, // No tenemos GIFs
      optipng: {
        optimizationLevel: 7, // Máxima compresión para PNG
      },
      mozjpeg: {
        quality: 80, // Calidad 80% para JPEG - buen balance calidad/tamaño
      },
      pngquant: {
        quality: [0.65, 0.8], // Rango de calidad para PNG con transparencia
        speed: 4,
      },
      svgo: false, // No tenemos SVGs complejos
    }),
  ],

  // Optimizaciones de build
  build: {
    // Reducir límite de chunk warnings
    chunkSizeWarningLimit: 1000,

    // Minificación estándar
    minify: true,

    // Rollup optimizations
    rollupOptions: {
      output: {
        // Chunks automáticos más inteligentes
        manualChunks(id) {
          // Firebase en chunk separado
          if (id.includes("firebase")) {
            return "firebase";
          }
          // React en chunk separado
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router")
          ) {
            return "react";
          }
          // Otros vendors
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },

  // Optimización de imágenes
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp"],

  // Preload modules
  server: {
    preTransformRequests: false,
  },
});
