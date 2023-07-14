import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 6800,
  },
  css: {
    modules: {
      generateScopedName: '[hash:8]-[path]-[local]',
    },
  },
})
