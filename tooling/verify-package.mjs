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
      'package/dist/button.css',
      'package/dist/card.css',
      'package/dist/avatar.css',
      'package/dist/list.css',
      'package/dist/accordion.css',
      'package/dist/breadcrumb.css',
      'package/dist/pagination.css',
      'package/dist/slider.css',
      'package/dist/stepper.css',
      'package/dist/tooltip.css',
      'package/dist/rich-text-editor.css',
      'package/dist/message-composer.css',
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
      'package/dist/tabs.css',
      'package/dist/styles.css',
    ],
  },
  {
    directory: 'packages/business',
    expected: [
      'package/dist/index.js',
      'package/dist/index.d.ts',
      'package/dist/components/sidekick-input/SideKickInput.js',
    ],
  },
  {
    directory: 'packages/tokens',
    expected: [
      'package/dist/baseline.css',
      'package/dist/patch.css',
      'package/dist/index.js',
      'package/dist/index.d.ts',
      'package/dist/color.css',
      'package/dist/scale.css',
    ],
  },
];
let coreTarball;
let layoutTarball;
let businessTarball;

for (const packageDefinition of packages) {
  const tarball = packPackage(packageDefinition.directory, temporaryDirectory);
  if (packageDefinition.directory === 'packages/core') coreTarball = tarball;
  if (packageDefinition.directory === 'packages/layout') layoutTarball = tarball;
  if (packageDefinition.directory === 'packages/business') businessTarball = tarball;
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
const approvedRuntime = {
  '@lexical/history': '0.52.0',
  '@lexical/plain-text': '0.52.0',
  lexical: '0.52.0',
};
if (
  JSON.stringify(Object.entries(coreManifest.dependencies ?? {}).sort()) !==
  JSON.stringify(Object.entries(approvedRuntime).sort())
)
  throw new Error('Core runtime dependencies must exactly match the ADR 0004 Lexical exception');

const businessManifest = JSON.parse(
  readFileSync(`${repositoryRoot}/packages/business/package.json`, 'utf8'),
);
if (
  Object.keys(businessManifest.peerDependencies ?? {})
    .sort()
    .join(',') !== '@chayns-ui/core,react' ||
  businessManifest.dependencies
)
  throw new Error('Business must depend only on Core and React peers');
run('corepack', [
  'pnpm',
  'exec',
  'publint',
  'run',
  'packages/business',
  '--strict',
  '--pack=false',
]);
if (!businessTarball) throw new Error('Business tarball was not created');
run('corepack', [
  'pnpm',
  'exec',
  'attw',
  businessTarball,
  '--profile',
  'esm-only',
  '--no-definitely-typed',
  '--entrypoints',
  '.',
]);

const layoutManifest = JSON.parse(
  readFileSync(`${repositoryRoot}/packages/layout/package.json`, 'utf8'),
);
const layoutPeers = Object.keys(layoutManifest.peerDependencies ?? {}).sort();
if (layoutPeers.join(',') !== '@chayns-ui/core,react') {
  throw new Error('Layout must expose @chayns-ui/core and React as its only peer dependencies');
}
if (layoutManifest.dependencies) throw new Error('Layout must not have runtime dependencies');

console.log('Package contents, metadata, exports and ESM types are valid.');
