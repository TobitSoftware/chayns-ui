import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'components/button/index': resolve(import.meta.dirname, 'src/components/button/index.ts'),
      },
      formats: ['es'],
    },
    minify: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
  },
});
