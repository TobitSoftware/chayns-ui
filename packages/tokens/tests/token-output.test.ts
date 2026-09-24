import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const packageDirectory = resolve(import.meta.dirname, '..');

describe('generated token CSS', () => {
  it('contains the confirmed Button variables and mode selectors', async () => {
    const baseline = await readFile(resolve(packageDirectory, 'dist/baseline.css'), 'utf8');

    expect(baseline).toContain('--btn-py: calc(11 * var(--u));');
    expect(baseline).toContain('--ctrl-h: calc(42 * var(--u));');
    expect(baseline).toContain('--input-py: calc(13 * var(--u));');
    expect(baseline).toContain('--input-px: calc(16 * var(--u));');
    expect(baseline).toContain('--success: #039855;');
    expect(baseline).toContain('--warning: #dc6803;');
    expect(baseline).toContain('--grey-000: #ffffff;');
    expect(baseline).toContain('--grey-009: #000000;');
    expect(baseline).toContain('--accent-100: #eef7f8;');
    expect(baseline).toContain('--accent-300: #a8c3ca;');
    expect(baseline).toContain('--accent-800: #0c5765;');
    expect(baseline).toContain('--on-accent-rgb: 255, 255, 255;');
    expect(baseline).toContain('--tint: #eef7f8;');
    expect(baseline).toContain('--toggle-bg: #e9eded;');
    expect(baseline).toContain('.chayns-theme--dark');
    expect(baseline).toContain('.chayns-density--s');
    expect(baseline).toContain('.chayns-contrast--high');
    expect(baseline).toContain('.chayns-theme--color-deficiency');
    expect(baseline).not.toContain('[object Object]');
  });

  it('contains the root-scoped accent palette', async () => {
    const color = await readFile(resolve(packageDirectory, 'dist/color.css'), 'utf8');

    expect(color).toContain('--theme-accent-color: #005eb8;');
    expect(color).toContain('--theme-accent-light: #005eb8;');
    expect(color).toContain('--theme-accent-dark: #3180dc;');
    expect(color).toContain('.theme-light');
    expect(color).toContain('--accent: var(--theme-accent-light);');
    expect(color).toContain('--accent-hover: var(--theme-accent-light-hover);');
    expect(color).toContain('--accent-active: var(--theme-accent-light-active);');
    expect(color).toContain('.theme-dark');
    expect(color).toContain('--accent: var(--theme-accent-dark);');
    expect(color).toContain('--accent-hover: var(--theme-accent-dark-hover);');
    expect(color).toContain('--accent-active: var(--theme-accent-dark-active);');
    expect(color).toContain('--success: #039855;');
    expect(color).toContain('--success-bg: #e6f5ee;');
    expect(color).toContain('--success-4: #6ce9a6;');
    expect(color).toContain('--warning: #fdb022;');
    expect(color).toContain('--warning-bg: rgb(253 176 34 / 22%);');
    expect(color).toContain('--warning-4: #f79009;');
    expect(color).toContain('--danger: #d92d20;');
    expect(color).toContain('--danger-bg-hover: #f8d9d7;');
    expect(color).toContain('--danger-4: #f04438;');
    expect(color).toContain('--disabled-border: #4a626a;');
    expect(color).toContain('--accent-000: #fff;');
    expect(color).toContain('--accent-009: #000;');
    expect(color).toContain('--accent-000: #000;');
    expect(color).toContain('--accent-009: #fff;');
    expect(color).toContain('--accent-100: color-mix(in srgb, var(--accent) 10%, #fff);');
    expect(color).toContain('--accent-109: color-mix(in srgb, var(--accent) 100%, #2f2f2f);');
  });
});
