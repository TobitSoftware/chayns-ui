export const COLOR_MODES = ['light', 'dark'] as const;
export const DENSITIES = ['s', 'm', 'l'] as const;
export const ACCESSIBILITY_MODES = ['standard', 'high-contrast', 'color-deficiency'] as const;

export type ColorMode = (typeof COLOR_MODES)[number];
export type Density = (typeof DENSITIES)[number];
export type AccessibilityMode = (typeof ACCESSIBILITY_MODES)[number];

export interface ApplyThemeOptions {
  accessibilityMode?: AccessibilityMode;
  colorMode?: ColorMode;
  density?: Density;
}

const COLOR_MODE_CLASSES = COLOR_MODES.map((mode) => `chayns-theme--${mode}`);
const DENSITY_CLASSES = DENSITIES.map((density) => `chayns-density--${density}`);
const ACCESSIBILITY_CLASSES = ['chayns-contrast--high', 'chayns-theme--color-deficiency'] as const;

function assertSupportedOption<Value extends string>(
  name: string,
  value: unknown,
  supportedValues: readonly Value[],
): asserts value is Value {
  if (
    typeof value !== 'string' ||
    !supportedValues.some((supportedValue) => supportedValue === value)
  ) {
    throw new TypeError(
      `${name} must be one of: ${supportedValues.map((supportedValue) => `'${supportedValue}'`).join(', ')}.`,
    );
  }
}

function documentRoot(): HTMLElement {
  if (typeof document === 'undefined') {
    throw new ReferenceError('applyTheme requires a browser document.');
  }

  return document.documentElement;
}

/**
 * Applies global chayns UI theme classes to the document root.
 * Omitted options retain their current setting.
 */
export function applyTheme(options: ApplyThemeOptions): void {
  if (Object.hasOwn(options, 'colorMode')) {
    assertSupportedOption('colorMode', options.colorMode, COLOR_MODES);
  }

  if (Object.hasOwn(options, 'density')) {
    assertSupportedOption('density', options.density, DENSITIES);
  }

  if (Object.hasOwn(options, 'accessibilityMode')) {
    assertSupportedOption('accessibilityMode', options.accessibilityMode, ACCESSIBILITY_MODES);
  }

  const root = documentRoot();

  if (Object.hasOwn(options, 'colorMode')) {
    root.classList.remove(...COLOR_MODE_CLASSES);
    root.classList.add(`chayns-theme--${options.colorMode}`);
  }

  if (Object.hasOwn(options, 'density')) {
    root.classList.remove(...DENSITY_CLASSES);
    root.classList.add(`chayns-density--${options.density}`);
  }

  if (Object.hasOwn(options, 'accessibilityMode')) {
    root.classList.remove(...ACCESSIBILITY_CLASSES);

    if (options.accessibilityMode === 'high-contrast') {
      root.classList.add('chayns-contrast--high');
    }

    if (options.accessibilityMode === 'color-deficiency') {
      root.classList.add('chayns-theme--color-deficiency');
    }
  }
}
