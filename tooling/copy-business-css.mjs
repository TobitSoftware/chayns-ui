import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageDirectory = resolve(import.meta.dirname, '..', 'packages/business');
const outputDirectory = resolve(packageDirectory, 'dist');

await mkdir(outputDirectory, { recursive: true });
await copyFile(
  resolve(packageDirectory, 'src/components/markdown-editor/markdown-editor.css'),
  resolve(outputDirectory, 'markdown-editor.css'),
);
