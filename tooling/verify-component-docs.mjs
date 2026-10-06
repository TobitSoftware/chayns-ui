import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const directory = resolve(root, 'docs/03-components');
const schema = JSON.parse(
  await readFile(resolve(directory, 'schemas/component-specification.schema.json'), 'utf8'),
);

// Deliberately implements only the schema keywords used above; unknown keywords fail closed.
function validate(value, rule, path) {
  const supported = [
    '$schema',
    'title',
    'type',
    'additionalProperties',
    'required',
    'properties',
    'enum',
    'minLength',
    'pattern',
    'minItems',
    'items',
  ];
  for (const keyword of Object.keys(rule)) {
    if (!supported.includes(keyword)) throw new Error(`Unsupported schema keyword ${keyword}`);
  }
  if (rule.type === 'object') {
    if (value === null || typeof value !== 'object' || Array.isArray(value))
      throw new Error(`${path}: expected object`);
    for (const name of rule.required ?? []) {
      if (!(name in value)) throw new Error(`${path}: missing ${name}`);
    }
    for (const [name, field] of Object.entries(value)) {
      if (!rule.properties[name]) throw new Error(`${path}: unknown field ${name}`);
      validate(field, rule.properties[name], `${path}.${name}`);
    }
  } else if (rule.type === 'array') {
    if (!Array.isArray(value) || value.length < (rule.minItems ?? 0))
      throw new Error(`${path}: invalid array`);
    value.forEach((item, index) => validate(item, rule.items, `${path}[${index}]`));
  } else if (rule.type === 'string') {
    if (typeof value !== 'string' || value.length < (rule.minLength ?? 0))
      throw new Error(`${path}: invalid string`);
    if (rule.enum && !rule.enum.includes(value)) throw new Error(`${path}: invalid value ${value}`);
    if (rule.pattern && !new RegExp(rule.pattern).test(value))
      throw new Error(`${path}: invalid format`);
  } else throw new Error(`Unsupported schema type ${rule.type}`);
}

const documented = new Set();
for (const entry of await readdir(directory, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'schemas') continue;
  if (!(await readdir(resolve(directory, entry.name))).includes(`${entry.name}-specification.md`))
    continue;
  const path = resolve(directory, entry.name, `${entry.name}-specification.md`);
  const source = await readFile(path, 'utf8');
  const match = /^---\n([\s\S]*?)\n---\n/.exec(source);
  if (!match) throw new Error(`${entry.name}: missing JSON-compatible YAML frontmatter`);
  const metadata = JSON.parse(match[1]);
  validate(metadata, schema, entry.name);
  if (['ready', 'implemented'].includes(metadata.status) && metadata.stories.length === 0)
    throw new Error(`${entry.name}: ready/implemented components require Storybook evidence.`);
  if (documented.has(metadata.name)) throw new Error(`Duplicate component ${metadata.name}`);
  documented.add(metadata.name);
  for (const story of metadata.stories) {
    const [title, name] = story.split(':');
    const [packageName, component] = title.split('/');
    const storySource = await readFile(
      resolve(root, 'packages', packageName.toLowerCase(), 'stories', `${component}.stories.tsx`),
      'utf8',
    );
    if (!storySource.includes(`export const ${name}:`))
      throw new Error(`${entry.name}: missing story ${story}`);
  }
  for (const reference of metadata.sourceReferences) {
    if (!reference.startsWith('https://'))
      await readFile(resolve(directory, entry.name, reference.split('#')[0]), 'utf8');
  }
}
for (const packageName of ['core', 'layout']) {
  const exports = await readFile(resolve(root, 'packages', packageName, 'src/index.ts'), 'utf8');
  const names = [...exports.matchAll(/export \{ (?:default as )?([A-Z][a-zA-Z]+) \} from/g)].map(
    (match) => match[1],
  );
  for (const name of names)
    if (!documented.has(name))
      throw new Error(`Missing specification for exported component ${name}`);
}
console.log(
  `Validated ${documented.size} component specifications and their Storybook references.`,
);
