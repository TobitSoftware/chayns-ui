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
      'package/dist/styles.css',
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

for (const packageDefinition of packages) {
  const tarball = packPackage(packageDefinition.directory, temporaryDirectory);
  if (packageDefinition.directory === 'packages/core') coreTarball = tarball;
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
run('corepack', ['pnpm', 'exec', 'publint', 'run', 'packages/tokens', '--strict', '--pack=false']);
if (!coreTarball) throw new Error('Core tarball was not created');
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
]);

const coreManifest = JSON.parse(
  readFileSync(`${repositoryRoot}/packages/core/package.json`, 'utf8'),
);
if (Object.keys(coreManifest.peerDependencies ?? {}).join(',') !== 'react') {
  throw new Error('Core must expose React as its only peer dependency');
}
if (coreManifest.dependencies) throw new Error('Core must not have runtime dependencies');

console.log('Package contents, metadata, exports and ESM types are valid.');
