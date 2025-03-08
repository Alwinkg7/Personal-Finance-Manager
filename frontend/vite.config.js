import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer'; // For bundle analysis
import viteCompression from 'vite-plugin-compression'; // For gzip/Brotli compression

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({ open: true }), // Automatically open the bundle analysis report
    viteCompression(), // Enable gzip/Brotli compression
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          react: ['react', 'react-dom'],
          lodash: ['lodash'],
          // Add other large dependencies here
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit (in KB)
  },
});