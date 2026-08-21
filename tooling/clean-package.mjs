import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageName = process.argv[2];

if (packageName !== 'core' && packageName !== 'tokens') {
  throw new Error('Expected the package name "core" or "tokens".');
}

const packageDirectory = resolve(import.meta.dirname, '..', 'packages', packageName);
await rm(resolve(packageDirectory, 'dist'), { force: true, recursive: true });
