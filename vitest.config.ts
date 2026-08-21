import { resolve } from 'node:path';

import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['packages/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['packages/**/*.type-test.tsx'],
          setupFiles: ['./vitest.setup.ts'],
          coverage: {
            provider: 'v8',
            include: ['packages/core/src/components/**/*.tsx'],
            reporter: ['text', 'json-summary'],
            thresholds: { branches: 100, functions: 100, lines: 100, statements: 100 },
          },
        },
      },
      {
        plugins: [
          storybookTest({
            configDir: resolve(import.meta.dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
