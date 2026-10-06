import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

// Application values explicitly described by the guides; never an untyped fallback.
const applicationBindings = {
  save: '() => void',
  remove: '() => void',
  copy: '() => void',
  send: '() => void',
  schedule: '() => void',
  count: 'number',
  setCount: '(value: number) => void',
  enabled: 'boolean',
  setEnabled: '(value: boolean) => void',
  page: 'number',
  setPage: '(value: number) => void',
  date: 'Date | null',
  setDate: '(value: Date) => void',
  locale: 'string',
  wheelLabels: 'import("@chayns-ui/core").DateTimePickerWheelLabels',
};

/** Typecheck the actual Markdown examples against the public source exports. */
export async function verifyUsageExamples(root, guides) {
  const configuration = JSON.parse(await readFile(resolve(root, 'tsconfig.base.json'), 'utf8'));
  const converted = ts.convertCompilerOptionsFromJson(configuration.compilerOptions, root);
  if (converted.errors.length) throw new Error('Invalid usage example compiler configuration.');
  const options = {
    ...converted.options,
    noEmit: true,
    paths: {
      '@chayns-ui/core': [resolve(root, 'packages/core/src/index.ts')],
      '@chayns-ui/layout': [resolve(root, 'packages/layout/src/index.ts')],
    },
  };
  const sources = new Map();
  for (const guide of guides) {
    const examples = [...guide.source.matchAll(/```tsx\n([\s\S]*?)\n```/g)];
    for (const [index, example] of examples.entries()) {
      const code = example[1];
      const parsed = ts.createSourceFile(
        'example.tsx',
        code,
        options.target,
        true,
        ts.ScriptKind.TSX,
      );
      const imports = parsed.statements.filter(ts.isImportDeclaration);
      if (!imports.some((node) => /^@chayns-ui\/(core|layout)$/.test(node.moduleSpecifier.text)))
        throw new Error(`${guide.name}: usage examples must import public components.`);
      for (const node of imports) {
        if (!['@chayns-ui/core', '@chayns-ui/layout', 'react'].includes(node.moduleSpecifier.text))
          throw new Error(`${guide.name}: unsupported example import ${node.moduleSpecifier.text}`);
      }
      if (/@ts-(?:ignore|nocheck|expect-error)\b/.test(code))
        throw new Error(`${guide.name}: examples must typecheck without error suppression.`);
      const bindings = Object.entries(applicationBindings)
        .filter(([name]) => new RegExp(`\\b${name}\\b`).test(code))
        .map(([name, type]) => `declare const ${name}: ${type};`)
        .join('\n');
      const filename = resolve(
        root,
        'docs/03-components',
        guide.name,
        `usage-example-${index}.tsx`,
      );
      sources.set(filename, `${bindings}\n${code}`);
    }
  }
  const host = ts.createCompilerHost(options);
  const readSource = host.readFile.bind(host);
  const sourceExists = host.fileExists.bind(host);
  host.readFile = (filename) => sources.get(filename) ?? readSource(filename);
  host.fileExists = (filename) => sources.has(filename) || sourceExists(filename);
  const program = ts.createProgram([...sources.keys()], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (filename) => filename,
        getCurrentDirectory: () => root,
        getNewLine: () => '\n',
      }),
    );
  }
  return sources.size;
}
