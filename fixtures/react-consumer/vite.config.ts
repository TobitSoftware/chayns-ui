import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const treeEntry = process.env.CHAYNS_ENTRY;

export default defineConfig({
  plugins: [react()],
  ...(treeEntry
    ? {
        build: {
          emptyOutDir: true,
          outDir: `tree-${treeEntry}`,
          rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
            input: resolve(import.meta.dirname, `src/tree-${treeEntry}.tsx`),
            output: { entryFileNames: 'index.js' },
          },
        },
      }
    : {}),
});
