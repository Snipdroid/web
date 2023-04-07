import path from 'path'
import postCssPresetEnv from 'postcss-preset-env'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import solidPlugin from 'vite-plugin-solid'

const baseUrl = loadEnv('', process.cwd()).VITE_API

export default defineConfig({
  plugins: [solidPlugin(), UnoCSS()],
  server: {
    proxy: {
      '/api': {
        target: baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [postCssPresetEnv({ stage: 0 })],
    },
  },
})
