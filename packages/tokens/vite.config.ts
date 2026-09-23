import { resolve } from 'node:path';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
      },
      formats: ['es'],
    },
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
  },
});
