import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Split out 'react' and 'react-dom' into separate chunks
          'react-vendors': ['react', 'react-dom'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true, // Transform mixed ES and CJS modules
    },
  },
})
