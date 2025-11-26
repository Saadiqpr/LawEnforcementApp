import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ADD THIS SECTION ---
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Point to your backend's address
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // ------------------------
})