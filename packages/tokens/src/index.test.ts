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

  it('rejects unsupported option values', () => {
    applyTheme({ colorMode: 'dark' });

    expect(() => applyTheme({ colorMode: 'sepia' as never })).toThrow(
      "colorMode must be one of: 'light', 'dark'.",
    );
    expect(root.classList.contains('chayns-theme--dark')).toBe(true);
  });
});
