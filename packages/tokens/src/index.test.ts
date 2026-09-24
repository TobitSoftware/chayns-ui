import { afterEach, describe, expect, it } from 'vitest';

import { applyTheme } from './index.js';

const root = document.documentElement;
const managedClasses = [
  'chayns-theme--light',
  'chayns-theme--dark',
  'chayns-density--s',
  'chayns-density--m',
  'chayns-density--l',
  'chayns-contrast--high',
  'chayns-theme--color-deficiency',
];

afterEach(() => root.classList.remove(...managedClasses));

describe('applyTheme', () => {
  it('sets the supplied global theme classes on the document root', () => {
    applyTheme({
      accessibilityMode: 'high-contrast',
      colorMode: 'dark',
      density: 'l',
    });

    expect(root.classList.contains('chayns-theme--dark')).toBe(true);
    expect(root.classList.contains('chayns-density--l')).toBe(true);
    expect(root.classList.contains('chayns-contrast--high')).toBe(true);
    expect(root.classList.contains('chayns-theme--light')).toBe(false);
    expect(root.classList.contains('chayns-theme--color-deficiency')).toBe(false);
  });

  it('retains settings that are not supplied by a partial update', () => {
    applyTheme({
      accessibilityMode: 'color-deficiency',
      colorMode: 'dark',
      density: 's',
    });
    applyTheme({ density: 'm' });

    expect(root.classList.contains('chayns-theme--dark')).toBe(true);
    expect(root.classList.contains('chayns-density--m')).toBe(true);
    expect(root.classList.contains('chayns-theme--color-deficiency')).toBe(true);
    expect(root.classList.contains('chayns-density--s')).toBe(false);
  });

  it('restores the standard accessibility mode', () => {
    applyTheme({ accessibilityMode: 'high-contrast' });
    applyTheme({ accessibilityMode: 'standard' });

    expect(root.classList.contains('chayns-contrast--high')).toBe(false);
    expect(root.classList.contains('chayns-theme--color-deficiency')).toBe(false);
  });

  it('creates a deterministic accent class and its token declarations', () => {
    applyTheme({ accentColor: '#0F6D7E' });

    expect(root.classList.contains('chayns-accent--0f6d7e')).toBe(true);

    const style = document.head.querySelector('style[data-chayns-ui-accent-colors]');
    expect(style?.textContent).toContain('--accent: #0f6d7e;');
    expect(style?.textContent).toContain('--accent-rgb: 15, 109, 126;');
    expect(style?.textContent).toContain('--accent-100: #e7f0f2;');
    expect(style?.textContent).toContain('--accent-800: #3f8a98;');
    expect(style?.textContent).toContain('--on-accent: #ffffff;');
  });

  it('updates the accent class without changing other theme settings', () => {
    applyTheme({ accentColor: '#0f6d7e', colorMode: 'dark' });
    applyTheme({ accentColor: '#f97066' });

    expect(root.classList.contains('chayns-accent--0f6d7e')).toBe(false);
    expect(root.classList.contains('chayns-accent--f97066')).toBe(true);
    expect(root.classList.contains('chayns-theme--dark')).toBe(true);
    expect(document.head.querySelector('style[data-chayns-ui-accent-colors]')?.textContent).toContain(
      '.chayns-accent--f97066.chayns-theme--dark',
    );
  });

  it('uses a contrasting on-accent foreground without changing the supplied color', () => {
    applyTheme({ accentColor: '#777777' });

    const style = document.head.querySelector('style[data-chayns-ui-accent-colors]');
    expect(style?.textContent).toContain('--accent: #777777;');
    expect(style?.textContent).toContain('--on-accent: #000000;');
  });

  it('rejects unsupported option values', () => {
    applyTheme({ colorMode: 'dark' });

    expect(() => applyTheme({ colorMode: 'sepia' as never })).toThrow(
      "colorMode must be one of: 'light', 'dark'.",
    );
    expect(root.classList.contains('chayns-theme--dark')).toBe(true);
  });

  it('rejects accent colors that do not use the #RRGGBB format', () => {
    expect(() => applyTheme({ accentColor: '#0f6d7' })).toThrow(
      'accentColor must be a #RRGGBB hex color.',
    );
  });
});
