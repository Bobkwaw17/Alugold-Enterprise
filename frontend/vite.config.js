import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Dev: forward /api to the Express backend (set VITE_API_URL to bypass in production)
    proxy: { '/api': 'http://localhost:4000' },
  },
})
