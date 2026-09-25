import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageDirectory = import.meta.dirname;
const sourceDirectory = resolve(packageDirectory, 'src');
const outputDirectory = resolve(packageDirectory, 'dist');
const baselinePath = resolve(outputDirectory, 'baseline.css');
const scalePath = resolve(sourceDirectory, 'scale.css');
const colorPath = resolve(sourceDirectory, 'color.css');
const patchPath = resolve(sourceDirectory, 'patch.css');

const [scale, color] = await Promise.all([
  readFile(scalePath, 'utf8'),
  readFile(colorPath, 'utf8'),
]);

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  baselinePath,
  `/* Generated from scale.css and color.css. Do not edit. */\n\n${scale.trim()}\n\n${color.trim()}\n`,
  'utf8',
);
await Promise.all([
  copyFile(colorPath, resolve(outputDirectory, 'color.css')),
  copyFile(scalePath, resolve(outputDirectory, 'scale.css')),
  copyFile(patchPath, resolve(outputDirectory, 'patch.css')),
]);
