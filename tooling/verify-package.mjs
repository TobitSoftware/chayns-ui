import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

import { createTemporaryDirectory, packPackage, repositoryRoot, run } from './package-utils.mjs';

run('corepack', ['pnpm', 'build']);

const temporaryDirectory = createTemporaryDirectory('chayns-ui-pack-');
const packages = [
  {
    directory: 'packages/core',
    expected: [
      'package/dist/index.js',
      'package/dist/index.d.ts',
      'package/dist/components/button/index.js',
      'package/dist/button.css',
      'package/dist/components/card/index.js',
      'package/dist/card.css',
      'package/dist/components/list/index.js',
      'package/dist/list.css',
      'package/dist/components/accordion/index.js',
      'package/dist/accordion.css',
      'package/dist/components/avatar/index.js',
      'package/dist/avatar.css',
      'package/dist/styles.css',
    ],
  },
  {
    directory: 'packages/layout',
    expected: [
      'package/dist/index.js',
      'package/dist/index.d.ts',
      'package/dist/components/app-layout/AppLayout.js',
      'package/dist/components/tabs/Tabs.js',
      'package/dist/app-layout.css',
    ],
  },
  {
    directory: 'packages/tokens',
    expected: [
      'package/dist/baseline.css',
      'package/dist/patch.css',
      'package/src/foundations.tokens.json',
    ],
  },
];
let coreTarball;
let layoutTarball;

for (const packageDefinition of packages) {
  const tarball = packPackage(packageDefinition.directory, temporaryDirectory);
  if (packageDefinition.directory === 'packages/core') coreTarball = tarball;
  if (packageDefinition.directory === 'packages/layout') layoutTarball = tarball;
  const entries = execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' }).trim().split('\n');

  for (const expected of packageDefinition.expected) {
    if (!entries.includes(expected)) throw new Error(`${basename(tarball)} misses ${expected}`);
  }

  const forbidden = entries.find((entry) =>
    /(?:\.test\.|\.stories\.|type-test|node_modules)/u.test(entry),
  );
  if (forbidden) throw new Error(`${basename(tarball)} unexpectedly ships ${forbidden}`);
}

run('corepack', ['pnpm', 'exec', 'publint', 'run', 'packages/core', '--strict', '--pack=false']);
run('corepack', ['pnpm', 'exec', 'publint', 'run', 'packages/layout', '--strict', '--pack=false']);
run('corepack', ['pnpm', 'exec', 'publint', 'run', 'packages/tokens', '--strict', '--pack=false']);
if (!coreTarball) throw new Error('Core tarball was not created');
if (!layoutTarball) throw new Error('Layout tarball was not created');
run('corepack', [
  'pnpm',
  'exec',
  'attw',
  coreTarball,
  '--profile',
  'esm-only',
  '--no-definitely-typed',
  '--entrypoints',
  '.',
  './button',
  './card',
  './list',
  './accordion',
  './avatar',
]);
run('corepack', [
  'pnpm',
  'exec',
  'attw',
  layoutTarball,
  '--profile',
  'esm-only',
  '--no-definitely-typed',
  '--entrypoints',
  '.',
]);

const coreManifest = JSON.parse(
  readFileSync(`${repositoryRoot}/packages/core/package.json`, 'utf8'),
);
if (Object.keys(coreManifest.peerDependencies ?? {}).join(',') !== 'react') {
  throw new Error('Core must expose React as its only peer dependency');
}
if (coreManifest.dependencies) throw new Error('Core must not have runtime dependencies');

const layoutManifest = JSON.parse(
  readFileSync(`${repositoryRoot}/packages/layout/package.json`, 'utf8'),
);
const layoutPeers = Object.keys(layoutManifest.peerDependencies ?? {}).sort();
if (layoutPeers.join(',') !== '@chayns-ui/core,react') {
  throw new Error('Layout must expose @chayns-ui/core and React as its only peer dependencies');
}
if (layoutManifest.dependencies) throw new Error('Layout must not have runtime dependencies');

console.log('Package contents, metadata, exports and ESM types are valid.');
