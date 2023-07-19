import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import UnoCSS from 'unocss/vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const baseUrl = loadEnv('development', process.cwd()).VITE_API;

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
  plugins: [
    UnoCSS(),
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 6800,
    proxy: {
      '/api': {
        target: baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    modules: {
      generateScopedName: '[hash:8]-[path]-[local]',
    },
  },
});
