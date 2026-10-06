import './verify-configuration-enums.mjs';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    else if (entry.name.endsWith('.tsx')) files.push(path);
  }
  return files;
}
function containsJsx(node) {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node))
    return true;
  return ts.forEachChild(node, containsJsx) === true;
}
let count = 0;
const files = [
  ...(await sourceFiles(resolve(root, 'packages/core/src'))),
  ...(await sourceFiles(resolve(root, 'packages/layout/src'))),
  resolve(root, '.storybook/preview.tsx'),
];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const names = new Set();
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      containsJsx(node.initializer)
    )
      names.add(node.name.text);
    if (ts.isFunctionDeclaration(node) && node.name && node.body && containsJsx(node.body))
      names.add(node.name.text);
    ts.forEachChild(node, visit);
  }
  visit(tree);
  for (const name of names) {
    if (!/^[A-Z][a-zA-Z]*$/.test(name)) continue;
    const assignment = new RegExp(`\\b${name}\\.displayName\\s*=`);
    const objectAssignment = new RegExp(
      `Object\\.assign\\(\\s*${name}\\s*,\\s*\\{\\s*displayName\\s*:`,
    );
    if (!assignment.test(source) && !objectAssignment.test(source))
      throw new Error(`${file}: ${name} has no explicit displayName.`);
    count += 1;
  }
}
console.log(`Checked explicit displayName assignments for ${count} JSX component declarations.`);
