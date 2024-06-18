import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    hmr: true,
    port: 3001,
    proxy: {
      '/api': {
        target: "https://localhost:5001",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
