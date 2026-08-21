import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // The site is one page; a single chunk beats waterfalled requests here.
    assetsInlineLimit: 2048,
  },
  server: {
    host: true,
    port: 5173,
  },
})
