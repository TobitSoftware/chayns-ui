import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { repositoryRoot, run } from './package-utils.mjs';

const baselinePath = `${repositoryRoot}/packages/tokens/dist/baseline.css`;
const patchPath = `${repositoryRoot}/packages/tokens/dist/patch.css`;
const digest = () =>
  createHash('sha256')
    .update(readFileSync(baselinePath))
    .update(readFileSync(patchPath))
    .digest('hex');

run('corepack', ['pnpm', '--filter', '@chayns-ui/tokens', 'build']);
const firstDigest = digest();
run('corepack', ['pnpm', '--filter', '@chayns-ui/tokens', 'build']);
if (digest() !== firstDigest) throw new Error('Token generation is not byte-identical');

const baseline = readFileSync(baselinePath, 'utf8');
const patch = readFileSync(patchPath, 'utf8');
for (const selector of [
  ':root',
  '.chayns-theme--light',
  '.chayns-theme--dark',
  '.chayns-density--s',
  '.chayns-density--m',
  '.chayns-density--l',
]) {
  if (!baseline.includes(selector)) throw new Error(`Baseline misses ${selector}`);
}
if (/--[a-z]/u.test(patch)) throw new Error('Patch must not contain declarations in Milestone 1');

console.log(`Token output is deterministic (${firstDigest.slice(0, 12)}).`);
