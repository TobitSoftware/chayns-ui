import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path)));
    else if (entry.name.endsWith('.types.ts')) result.push(path);
  }
  return result;
}
function literal(node) {
  if (ts.isStringLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  throw new Error('Configuration values must use explicit string or numeric literals.');
}
function valueSet(values) {
  if (new Set(values).size !== values.length)
    throw new Error('Configuration values must be unique.');
  return JSON.stringify([...values].sort());
}
let count = 0;
for (const packageName of ['core', 'layout']) {
  const sourceDirectory = resolve(root, 'packages', packageName, 'src');
  const barrel = ts.createSourceFile(
    'index.ts',
    await readFile(resolve(sourceDirectory, 'index.ts'), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  const exports = new Set();
  for (const declaration of barrel.statements) {
    if (
      ts.isExportDeclaration(declaration) &&
      declaration.exportClause &&
      ts.isNamedExports(declaration.exportClause) &&
      !declaration.isTypeOnly
    )
      for (const member of declaration.exportClause.elements)
        if (!member.isTypeOnly) exports.add((member.propertyName ?? member.name).text);
  }
  for (const path of await files(sourceDirectory)) {
    const tree = ts.createSourceFile(
      path,
      await readFile(path, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    const enums = new Map();
    const lists = [];
    for (const declaration of tree.statements) {
      if (!declaration.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword))
        continue;
      if (ts.isEnumDeclaration(declaration)) {
        enums.set(
          declaration.name.text,
          valueSet(
            declaration.members.map((member) => {
              if (!member.initializer)
                throw new Error(`${path}: enum members require explicit values.`);
              return literal(member.initializer);
            }),
          ),
        );
      }
      if (!ts.isVariableStatement(declaration)) continue;
      for (const variable of declaration.declarationList.declarations) {
        if (
          !ts.isIdentifier(variable.name) ||
          !/^[A-Z][A-Z_]+$/.test(variable.name.text) ||
          !variable.initializer
        )
          continue;
        let initializer = variable.initializer;
        while (
          ts.isAsExpression(initializer) ||
          ts.isSatisfiesExpression(initializer) ||
          ts.isParenthesizedExpression(initializer)
        )
          initializer = initializer.expression;
        if (ts.isArrayLiteralExpression(initializer))
          lists.push([variable.name.text, valueSet(initializer.elements.map(literal))]);
      }
    }
    for (const [name, values] of lists) {
      const matching = [...enums.entries()].find(([, members]) => members === values);
      if (!matching)
        throw new Error(`${path}: ${name} requires a matching exported configuration enum.`);
      if (!exports.has(matching[0]))
        throw new Error(`${packageName}: ${matching[0]} is missing from the public barrel.`);
      count += 1;
    }
    for (const [name, values] of enums)
      if (!lists.some(([, members]) => members === values))
        throw new Error(`${path}: ${name} has no matching compatible runtime value list.`);
  }
}
console.log(`Checked ${count} public configuration enums and compatible runtime value lists.`);
