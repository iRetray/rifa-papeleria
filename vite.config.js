import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Optimizaciones para Firebase
    __FIREBASE_DEFAULTS__: JSON.stringify({
      projectId: 'rifa-papeleria'
    }),
  },
  build: {
    // Optimizaciones críticas para reducir bundle size
    target: 'es2015',
    minify: 'esbuild', // Más rápido que terser
    sourcemap: false,
    rollupOptions: {
      output: {
        // Dividir en chunks más pequeños
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Router chunk  
          if (id.includes('react-router-dom')) {
            return 'router';
          }
          // Solo Firestore como chunk separado (más pequeño)
          if (id.includes('firebase/app') || id.includes('firebase/firestore')) {
            return 'firestore';
          }
          // Páginas como chunks separados para lazy loading
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0];
            return `page-${pageName.toLowerCase()}`;
          }
          // Otros node_modules en vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Nombres de archivos más cortos
        chunkFileNames: 'js/[name]-[hash:8].js',
        entryFileNames: 'js/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]'
      }
    },
    // Aumentar warning limit ya que Firebase es naturalmente grande
    chunkSizeWarningLimit: 1000
  },
  // Optimizaciones de servidor
  server: {
    preload: true
  }
})
