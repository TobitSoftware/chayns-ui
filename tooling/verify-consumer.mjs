import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { prepareConsumer, run } from './package-utils.mjs';

run('corepack', ['pnpm', 'build']);
const consumerDirectory = prepareConsumer();
run('corepack', ['pnpm', 'install', '--ignore-workspace', '--no-frozen-lockfile'], {
  cwd: consumerDirectory,
});
run('corepack', ['pnpm', 'typecheck'], { cwd: consumerDirectory });
run('corepack', ['pnpm', 'build'], { cwd: consumerDirectory });
const rendered = run('node', ['src/ssr.mjs'], { cwd: consumerDirectory, capture: true });
if (!rendered.includes('<button') || !rendered.includes('Packed consumer')) {
  throw new Error('Packed packages did not render expected native buttons on the server');
}

const assetsDirectory = join(consumerDirectory, 'dist/assets');
const bundle = readdirSync(assetsDirectory)
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(join(assetsDirectory, file), 'utf8'))
  .join('\n');
if (/Button\.test|\.stories\.tsx|style-dictionary|storybook/iu.test(bundle)) {
  throw new Error('Consumer bundle contains development-only implementation');
}

console.log('Packed consumer typecheck, production build and SSR render succeeded.');
