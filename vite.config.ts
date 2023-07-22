import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import UnoCSS from 'unocss/vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const res = loadEnv(process.env.NODE_ENV!, process.cwd());
console.log(
  `%c res  >>> 🦁️ <<< ${new Date().toLocaleString()} `,
  'background-color: #6bc047; color: #fff; border-radius:7px; font-size:14px; padding: 4px',
  res,
  process.env.NODE_ENV,
  process.cwd()
);

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
  },
  css: {
    modules: {
      generateScopedName: '[hash:8]-[path]-[local]',
    },
  },
});
