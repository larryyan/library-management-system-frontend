import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/library/',
  plugins: [
    vue(),
  ],
  server: {
    hmr: true,
    port: 3001,
    proxy: {
      '/api': {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        },
      },
    },
    setupMiddlewares(middlewares) {
      middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/library/') && !req.url.startsWith('/library/api')) {
          req.url = req.url.replace('/library', '');
        }
        next();
      });
      return middlewares;
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
