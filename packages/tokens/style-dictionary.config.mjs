import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import StyleDictionary from 'style-dictionary';

const packageDirectory = import.meta.dirname;
const sourcePath = resolve(packageDirectory, 'src/foundations.tokens.json');
const outputDirectory = resolve(packageDirectory, 'dist');
const outputPath = resolve(outputDirectory, 'baseline.css');

const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const styleDictionary = new StyleDictionary({
  source: [sourcePath],
  usesDtcg: true,
  platforms: { css: { transformGroup: 'css' } },
});
await styleDictionary.getPlatformTokens('css');

const tokens = [];

function collectTokens(value) {
  if (typeof value !== 'object' || value === null) return;

  if ('$value' in value) {
    const metadata = value.$extensions?.chayns;
    if (!metadata?.cssName) throw new Error('Every published token needs a chayns.cssName.');
    tokens.push({ value: value.$value, ...metadata });
    return;
  }

  for (const child of Object.values(value)) collectTokens(child);
}

function toCssValue(tokenValue, explicitValue) {
  const resolvedValue = explicitValue ?? tokenValue;
  if (typeof resolvedValue !== 'object' || resolvedValue === null) return String(resolvedValue);
  if ('value' in resolvedValue && 'unit' in resolvedValue) {
    return `${resolvedValue.value}${resolvedValue.unit}`;
  }
  throw new Error('Complex tokens require an explicit chayns.cssValue.');
}

function declarations(resolveValue) {
  return tokens
    .map((token) => {
      const value = resolveValue(token);
      return value === undefined ? null : `  ${token.cssName}: ${toCssValue(token.value, value)};`;
    })
    .filter(Boolean)
    .join('\n');
}

function block(selector, resolveValue) {
  const body = declarations(resolveValue);
  return body ? `${selector} {\n${body}\n}` : '';
}

collectTokens(source);

const css = [
  '/* Generated from confirmed chayns UI token evidence. Do not edit. */',
  block(':root, .chayns-theme--light', (token) => token.cssValue ?? token.value),
  block('.chayns-theme--dark', (token) => token.dark),
  block('.chayns-density--s', (token) => token.density?.s),
  block('.chayns-density--m', (token) => token.density?.m),
  block('.chayns-density--l', (token) => token.density?.l),
  block('.chayns-contrast--high', (token) => token.highContrast?.light),
  block('.chayns-theme--dark.chayns-contrast--high', (token) => token.highContrast?.dark),
  block('.chayns-theme--color-deficiency', (token) => token.colorDeficiency?.light),
  block(
    '.chayns-theme--dark.chayns-theme--color-deficiency',
    (token) => token.colorDeficiency?.dark,
  ),
  '',
]
  .filter((part) => part !== '')
  .join('\n\n');

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, `${css}\n`, 'utf8');
await copyFile(resolve(packageDirectory, 'src/patch.css'), resolve(outputDirectory, 'patch.css'));
