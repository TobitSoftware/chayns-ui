import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const packageDirectory = resolve(import.meta.dirname, '..');

describe('generated token CSS', () => {
  it('contains the confirmed Button variables and mode selectors', async () => {
    const baseline = await readFile(resolve(packageDirectory, 'dist/baseline.css'), 'utf8');

    expect(baseline).toContain('--btn-py: calc(11 * var(--u));');
    expect(baseline).toContain('--ctrl-h: calc(42 * var(--u));');
    expect(baseline).toContain('.chayns-theme--dark');
    expect(baseline).toContain('.chayns-density--s');
    expect(baseline).toContain('.chayns-contrast--high');
    expect(baseline).toContain('.chayns-theme--color-deficiency');
    expect(baseline).not.toContain('[object Object]');
  });

  it('keeps the patch free of declarations', async () => {
    const patch = await readFile(resolve(packageDirectory, 'dist/patch.css'), 'utf8');

    expect(patch).not.toMatch(/--[a-z]/);
  });
});
