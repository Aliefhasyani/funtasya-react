import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/freetogame-api': {
        target: 'https://www.freetogame.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/freetogame-api/, ''),
      },
    },
  },
})
