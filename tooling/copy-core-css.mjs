import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const coreDirectory = resolve(import.meta.dirname, '..', 'packages/core');
const outputDirectory = resolve(coreDirectory, 'dist');

await mkdir(outputDirectory, { recursive: true });
const aggregateCss = await readFile(resolve(coreDirectory, 'src/styles.css'), 'utf8');

await Promise.all([
  writeFile(
    resolve(outputDirectory, 'styles.css'),
    aggregateCss.replace('./components/button/button.css', './button.css'),
    'utf8',
  ),
  copyFile(
    resolve(coreDirectory, 'src/components/button/button.css'),
    resolve(outputDirectory, 'button.css'),
  ),
]);
