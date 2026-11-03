import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
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
if (
  !rendered.includes('<button') ||
  !rendered.includes('Packed consumer') ||
  !rendered.includes('Packed Sidekick') ||
  !rendered.includes('Packed rich text')
) {
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

// The public peer range covers React 18 and 19; exercise both from packed artifacts.
const consumerManifestPath = join(consumerDirectory, 'package.json');
const consumerManifest = JSON.parse(readFileSync(consumerManifestPath, 'utf8'));
Object.assign(consumerManifest.dependencies, { react: '18.3.1', 'react-dom': '18.3.1' });
Object.assign(consumerManifest.devDependencies, {
  '@types/react': '18.3.28',
  '@types/react-dom': '18.3.7',
});
writeFileSync(consumerManifestPath, `${JSON.stringify(consumerManifest, null, 2)}\n`);
run('corepack', ['pnpm', 'install', '--ignore-workspace', '--no-frozen-lockfile'], {
  cwd: consumerDirectory,
});
run('corepack', ['pnpm', 'typecheck'], { cwd: consumerDirectory });
run('corepack', ['pnpm', 'build'], { cwd: consumerDirectory });
const rendered18 = run('node', ['src/ssr.mjs'], { cwd: consumerDirectory, capture: true });
if (!rendered18.includes('Packed Sidekick'))
  throw new Error('React 18 packed SideKickInput SSR failed');
console.log('Packed consumer also passed with React 18.3.1.');
