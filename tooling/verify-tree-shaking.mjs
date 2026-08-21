import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { prepareConsumer, run } from './package-utils.mjs';

run('corepack', ['pnpm', 'build']);
const consumerDirectory = prepareConsumer();
run('corepack', ['pnpm', 'install', '--ignore-workspace', '--no-frozen-lockfile'], {
  cwd: consumerDirectory,
});

for (const entry of ['root', 'subpath']) {
  run('corepack', ['pnpm', 'exec', 'vite', 'build', '--mode', entry], {
    cwd: consumerDirectory,
    env: { ...process.env, CHAYNS_ENTRY: entry },
  });
  const outputDirectory = join(consumerDirectory, `tree-${entry}`);
  const scripts = readdirSync(outputDirectory).filter((file) => file.endsWith('.js'));
  const output = scripts
    .map((file) => readFileSync(join(outputDirectory, file), 'utf8'))
    .join('\n');
  if (!output.includes('chayns-button')) {
    throw new Error(`${entry} bundle did not retain the used Button`);
  }
  if (output.includes('IconButton') || output.includes('chayns-icon-button')) {
    throw new Error(`${entry} Button-only bundle retained IconButton`);
  }
  if (/storybook|style-dictionary|testing-library|react-dom/iu.test(output)) {
    throw new Error(`${entry} bundle retained a forbidden development/runtime module`);
  }
}

console.log('Packed root and subpath Button imports tree-shake without unused component code.');
