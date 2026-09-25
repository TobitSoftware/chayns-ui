import { describe, expect, it } from 'vitest';

import { resolveThemeColors } from './index.js';

describe('resolveThemeColors', () => {
  it('returns calibrated CSS variables for both color modes', () => {
    expect(resolveThemeColors('#005eb8')).toEqual({
      '--theme-accent-light': '#005eb8',
      '--theme-accent-light-hover': '#176ac5',
      '--theme-accent-light-active': '#2071cc',
      '--theme-accent-light-rgb': '0, 94, 184',
      '--theme-accent-dark': '#3180dc',
      '--theme-accent-dark-hover': '#4593f1',
      '--theme-accent-dark-active': '#5ea6ff',
      '--theme-accent-dark-rgb': '49, 128, 220',
      '--theme-accent-high-contrast-light': '#0058ad',
      '--theme-accent-high-contrast-light-hover': '#0058ad',
      '--theme-accent-high-contrast-light-active': '#0058ad',
      '--theme-accent-high-contrast-light-rgb': '0, 88, 173',
      '--theme-accent-high-contrast-dark': '#4997f5',
      '--theme-accent-high-contrast-dark-hover': '#67abff',
      '--theme-accent-high-contrast-dark-active': '#8bbeff',
      '--theme-accent-high-contrast-dark-rgb': '73, 151, 245',
    });
  });

  it('returns values with sufficient contrast against the configured mode surfaces', () => {
    const colors = resolveThemeColors('#e56a06');

    expect(colors['--theme-accent-light']).toMatch(/^#[\da-f]{6}$/);
    expect(colors['--theme-accent-dark']).toMatch(/^#[\da-f]{6}$/);
  });

  it('rejects invalid accent colors', () => {
    expect(() => resolveThemeColors('#005eb')).toThrow('accentColor must be a #RRGGBB hex color.');
  });
});
