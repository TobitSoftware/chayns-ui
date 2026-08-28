import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const coreDirectory = resolve(import.meta.dirname, '..', 'packages/core');
const outputDirectory = resolve(coreDirectory, 'dist');

await mkdir(outputDirectory, { recursive: true });
const aggregateCss = await readFile(resolve(coreDirectory, 'src/styles.css'), 'utf8');

const importPattern = /@import url\('([^']+)'\);/g;
const imports = [...aggregateCss.matchAll(importPattern)].map((match) => match[1]);

let flattenedCss = aggregateCss;
const copyTasks = imports.map((importPath) => {
  const fileName = basename(importPath);
  flattenedCss = flattenedCss.replace(importPath, `./${fileName}`);

  return copyFile(resolve(coreDirectory, 'src', importPath), resolve(outputDirectory, fileName));
});

await Promise.all([
  writeFile(resolve(outputDirectory, 'styles.css'), flattenedCss, 'utf8'),
  ...copyTasks,
]);
