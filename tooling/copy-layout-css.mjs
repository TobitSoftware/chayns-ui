import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageDirectory = resolve(import.meta.dirname, '..', 'packages/layout');
const outputDirectory = resolve(packageDirectory, 'dist');

await mkdir(outputDirectory, { recursive: true });
await copyFile(
  resolve(packageDirectory, 'src/components/app-layout/app-layout.css'),
  resolve(outputDirectory, 'app-layout.css'),
);
