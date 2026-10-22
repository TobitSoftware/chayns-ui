import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import test from 'node:test';

const repository = resolve(import.meta.dirname, '../..');
const checker = resolve(repository, 'tooling/verify-component-docs.mjs');
const usage = `# Example
${['Einsatz', 'Nicht geeignet', 'Alternativen', 'Gut kombinierbar', 'Verwendung', 'Besonderheiten']
  .map((heading) => `## ${heading}\n\nConsumer guidance.\n`)
  .join('\n')}
\`\`\`tsx
import { Example } from '@chayns-ui/core';
<Example />;
\`\`\`
`;

async function fixture(t, change = {}) {
  const root = await mkdtemp(resolve(tmpdir(), 'chayns-doc-evidence-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const component = resolve(root, 'docs/03-components/example');
  await Promise.all([
    mkdir(component, { recursive: true }),
    mkdir(resolve(root, 'docs/03-components/schemas'), { recursive: true }),
    mkdir(resolve(root, 'docs/01-decisions'), { recursive: true }),
    mkdir(resolve(root, 'packages/core/src'), { recursive: true }),
    mkdir(resolve(root, 'packages/layout/src'), { recursive: true }),
  ]);
  const metadata = {
    name: 'Example',
    package: '@chayns-ui/core',
    category: 'Core',
    status: 'ready',
    useWhen: ['Edit a draft.'],
    doNotUseWhen: ['Do not fetch domain data.'],
    alternatives: [],
    combinations: [],
    sourceReferences: ['plan.md'],
    checkedOn: '2026-10-22',
    stories: [],
    preImplementation: { plan: 'plan.md', decision: 'SCOPE-001' },
    ...change,
  };
  await Promise.all([
    writeFile(
      resolve(component, 'example-specification.md'),
      `---\n${JSON.stringify(metadata)}\n---\n# Example\n`,
    ),
    writeFile(resolve(component, 'example-usage.md'), usage),
    writeFile(resolve(component, 'plan.md'), '# Planned stories and acceptance cases\n'),
    writeFile(
      resolve(root, 'docs/01-decisions/ui-decision-register.md'),
      '| SCOPE-001 | TEST | Approved preimplementation plan | CONFIRMED | User | |\n',
    ),
    writeFile(
      resolve(root, 'docs/03-components/schemas/component-specification.schema.json'),
      await readFile(
        resolve(repository, 'docs/03-components/schemas/component-specification.schema.json'),
      ),
    ),
    writeFile(resolve(root, 'packages/core/src/index.ts'), ''),
    writeFile(resolve(root, 'packages/layout/src/index.ts'), ''),
    writeFile(resolve(root, 'tsconfig.base.json'), '{"compilerOptions":{}}'),
  ]);
  return root;
}

function check(root) {
  return spawnSync(process.execPath, [checker, root], { encoding: 'utf8' });
}

test('accepts explicitly approved plans and reports syntax-only evidence', async (t) => {
  const result = check(await fixture(t));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /0 typed examples/);
  assert.match(result.stdout, /1 approved preimplementation plans/);
});

test('cannot label an implemented component as having only planned evidence', async (t) => {
  const result = check(await fixture(t, { status: 'implemented' }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /implemented components cannot use planned evidence/);
});

test('requires a confirmed human decision, not an OPEN register entry', async (t) => {
  const root = await fixture(t);
  await writeFile(
    resolve(root, 'docs/01-decisions/ui-decision-register.md'),
    '| SCOPE-001 | TEST | Not approved | OPEN | User | |\n',
  );
  const result = check(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /needs a confirmed decision/);
});

test('requires the implementation plan in source references', async (t) => {
  const result = check(await fixture(t, { sourceReferences: ['https://example.com'] }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /implementation plan must be a source reference/);
});

test('rejects an empty acceptance plan', async (t) => {
  const root = await fixture(t);
  await writeFile(resolve(root, 'docs/03-components/example/plan.md'), ' \n');
  const result = check(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /plan must not be empty/);
});

test('planned evidence still checks TSX syntax', async (t) => {
  const root = await fixture(t);
  await writeFile(
    resolve(root, 'docs/03-components/example/example-usage.md'),
    usage.replace('<Example />;', '<Example broken={ />;'),
  );
  const result = check(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /invalid TSX example syntax/);
});

test('planned evidence cannot suppress type errors or import private sources', async (t) => {
  for (const [from, to, message] of [
    ['<Example />;', '// @ts-ignore\n<Example />;', /without error suppression/],
    [
      "import { Example } from '@chayns-ui/core';",
      "import { Example } from '@chayns-ui/core';\nimport Secret from './internal';",
      /unsupported example import/,
    ],
  ]) {
    const root = await fixture(t);
    await writeFile(
      resolve(root, 'docs/03-components/example/example-usage.md'),
      usage.replace(from, to),
    );
    const result = check(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, message);
  }
});

test('public exports must graduate to actual implementation evidence', async (t) => {
  const root = await fixture(t);
  await writeFile(
    resolve(root, 'packages/core/src/index.ts'),
    "export { default as Example } from './Example.js';\n",
  );
  const result = check(root);
  assert.notEqual(result.status, 0);
  assert.match(
    result.stderr,
    /public implementations require actual story and typed-example evidence/,
  );
});

test('ordinary READY components still require actual stories', async (t) => {
  const root = await fixture(t);
  const path = resolve(root, 'docs/03-components/example/example-specification.md');
  const source = await readFile(path, 'utf8');
  const metadata = JSON.parse(source.split('---\n')[1]);
  delete metadata.preImplementation;
  await writeFile(path, `---\n${JSON.stringify(metadata)}\n---\n# Example\n`);
  const result = check(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /require Storybook evidence/);
});

test('Business metadata uses the approved package boundary', async (t) => {
  const result = check(await fixture(t, { package: '@chayns-ui/business', category: 'Business' }));
  assert.equal(result.status, 0, result.stderr);
});

test('implemented examples still undergo actual public-type checking', async (t) => {
  const root = await fixture(t, {
    status: 'implemented',
    preImplementation: undefined,
    stories: ['Core/Example:Basic'],
  });
  await mkdir(resolve(root, 'packages/core/stories'), { recursive: true });
  await symlink(resolve(repository, 'node_modules'), resolve(root, 'node_modules'), 'dir');
  await Promise.all([
    writeFile(
      resolve(root, 'packages/core/stories/Example.stories.tsx'),
      "import 'example/example-usage.md?raw';\nexport const Basic: object = {};\n",
    ),
    writeFile(
      resolve(root, 'packages/core/src/index.ts'),
      "export { default as Example } from './Example.js';\n",
    ),
    writeFile(
      resolve(root, 'packages/core/src/Example.tsx'),
      'export default function Example() { return null; }\n',
    ),
    writeFile(
      resolve(root, 'tsconfig.base.json'),
      JSON.stringify({
        compilerOptions: {
          jsx: 'react-jsx',
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          skipLibCheck: true,
          types: [],
        },
      }),
    ),
  ]);
  const valid = check(root);
  assert.equal(valid.status, 0, valid.stderr);
  assert.match(valid.stdout, /1 typed examples/);

  await writeFile(
    resolve(root, 'docs/03-components/example/example-usage.md'),
    usage.replace('<Example />;', '<Example illegal />;'),
  );
  const invalid = check(root);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /illegal/);
});
