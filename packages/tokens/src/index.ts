export const COLOR_MODES = ['light', 'dark'] as const;
export const DENSITIES = ['s', 'm', 'l'] as const;
export const ACCESSIBILITY_MODES = ['standard', 'high-contrast', 'color-deficiency'] as const;

export type ColorMode = (typeof COLOR_MODES)[number];
export type Density = (typeof DENSITIES)[number];
export type AccessibilityMode = (typeof ACCESSIBILITY_MODES)[number];

export interface ApplyThemeOptions {
  accessibilityMode?: AccessibilityMode;
  accentColor?: string;
  colorMode?: ColorMode;
  density?: Density;
}

const COLOR_MODE_CLASSES = COLOR_MODES.map((mode) => `chayns-theme--${mode}`);
const DENSITY_CLASSES = DENSITIES.map((density) => `chayns-density--${density}`);
const ACCESSIBILITY_CLASSES = ['chayns-contrast--high', 'chayns-theme--color-deficiency'] as const;
const ACCENT_CLASS_PREFIX = 'chayns-accent--';
const ACCENT_STYLE_ATTRIBUTE = 'data-chayns-ui-accent-colors';
const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i;

let activeAccentClass: string | undefined;

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

function assertAccentColor(value: unknown): asserts value is string {
  if (typeof value !== 'string' || !HEX_COLOR_PATTERN.test(value)) {
    throw new TypeError('accentColor must be a #RRGGBB hex color.');
  }
}

function hexToRgb(hex: string): readonly [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${[red, green, blue]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`;
}

function mixHex(color: string, target: string, colorWeight: number): string {
  const source = hexToRgb(color);
  const destination = hexToRgb(target);
  const targetWeight = 1 - colorWeight;

  return rgbToHex(
    source[0] * colorWeight + destination[0] * targetWeight,
    source[1] * colorWeight + destination[1] * targetWeight,
    source[2] * colorWeight + destination[2] * targetWeight,
  );
}

function rgbToHsl(hex: string): readonly [number, number, number] {
  const rgb = hexToRgb(hex);
  const red = rgb[0] / 255;
  const green = rgb[1] / 255;
  const blue = rgb[2] / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const lightness = (maximum + minimum) / 2;
  const difference = maximum - minimum;

  if (difference === 0) return [0, 0, lightness];

  const saturation = difference / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (maximum === red) hue = ((green - blue) / difference) % 6;
  if (maximum === green) hue = (blue - red) / difference + 2;
  if (maximum === blue) hue = (red - green) / difference + 4;

  return [hue * 60 < 0 ? hue * 60 + 360 : hue * 60, saturation, lightness];
}

function hslToHex(hue: number, saturation: number, lightness: number): string {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = lightness - chroma / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue < 60) [red, green] = [chroma, secondary];
  else if (hue < 120) [red, green] = [secondary, chroma];
  else if (hue < 180) [green, blue] = [chroma, secondary];
  else if (hue < 240) [green, blue] = [secondary, chroma];
  else if (hue < 300) [red, blue] = [secondary, chroma];
  else [red, blue] = [chroma, secondary];

  return rgbToHex((red + match) * 255, (green + match) * 255, (blue + match) * 255);
}

function changeLightness(color: string, amount: number): string {
  const [hue, saturation, lightness] = rgbToHsl(color);
  return hslToHex(hue, saturation, Math.min(1, Math.max(0, lightness + amount)));
}

function relativeLuminance(color: string): number {
  const rgb = hexToRgb(color);
  const linearize = (channel: number): number => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  const red = linearize(rgb[0]);
  const green = linearize(rgb[1]);
  const blue = linearize(rgb[2]);

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(first: string, second: string): number {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function onAccentColor(accentColor: string): string {
  const candidates = ['#ffffff', '#000000'];
  return candidates.reduce((best, candidate) =>
    contrastRatio(candidate, accentColor) > contrastRatio(best, accentColor) ? candidate : best,
  );
}

function declarations(values: Record<string, string>): string {
  return Object.entries(values)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
}

function accentDeclarations(accentColor: string, colorMode: ColorMode): string {
  const onAccent = onAccentColor(accentColor);
  const [red, green, blue] = hexToRgb(accentColor);
  const [onAccentRed, onAccentGreen, onAccentBlue] = hexToRgb(onAccent);
  const scale = [
    mixHex(accentColor, '#ffffff', 0.1),
    mixHex(accentColor, '#ffffff', 0.2),
    mixHex(accentColor, '#ffffff', 0.3),
    mixHex(accentColor, '#ffffff', 0.4),
    mixHex(accentColor, '#ffffff', 0.5),
    mixHex(accentColor, '#ffffff', 0.6),
    mixHex(accentColor, '#ffffff', 0.7),
    mixHex(accentColor, '#ffffff', 0.8),
  ] as const;
  const hover = changeLightness(accentColor, colorMode === 'light' ? -0.05 : 0.08);
  const active = changeLightness(accentColor, colorMode === 'light' ? -0.08 : 0.04);

  return declarations({
    '--accent': accentColor,
    '--accent-rgb': `${red}, ${green}, ${blue}`,
    '--accent-hover': hover,
    '--accent-active': active,
    '--on-accent': onAccent,
    '--on-accent-rgb': `${onAccentRed}, ${onAccentGreen}, ${onAccentBlue}`,
    '--accent-100': scale[0],
    '--accent-200': scale[1],
    '--accent-300': scale[2],
    '--accent-400': scale[3],
    '--accent-500': scale[4],
    '--accent-600': scale[5],
    '--accent-700': scale[6],
    '--accent-800': scale[7],
    '--tint': scale[0],
    '--focus-ring-rgb': `${red}, ${green}, ${blue}`,
  });
}

function accentClassName(accentColor: string): string {
  return `${ACCENT_CLASS_PREFIX}${accentColor.slice(1).toLowerCase()}`;
}

function accentStyleElement(): HTMLStyleElement {
  const existing = document.head.querySelector<HTMLStyleElement>(
    `style[${ACCENT_STYLE_ATTRIBUTE}]`,
  );
  if (existing) return existing;

  const style = document.createElement('style');
  style.setAttribute(ACCENT_STYLE_ATTRIBUTE, '');
  document.head.append(style);
  return style;
}

function applyAccentColor(root: HTMLElement, accentColor: string): void {
  const accentClass = accentClassName(accentColor);

  if (activeAccentClass) root.classList.remove(activeAccentClass);
  root.classList.add(accentClass);
  activeAccentClass = accentClass;

  accentStyleElement().textContent = [
    `.${accentClass} {\n${accentDeclarations(accentColor, 'light')}\n}`,
    `.${accentClass}.chayns-theme--dark {\n${accentDeclarations(accentColor, 'dark')}\n}`,
  ].join('\n\n');
}

/**
 * Applies global chayns UI theme classes to the document root.
 * Omitted options retain their current setting.
 */
export function applyTheme(options: ApplyThemeOptions): void {
  const accentColor = options.accentColor;
  let normalizedAccentColor: string | undefined;

  if (Object.hasOwn(options, 'accentColor')) {
    assertAccentColor(accentColor);
    normalizedAccentColor = accentColor.toLowerCase();
  }

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

  if (normalizedAccentColor) {
    applyAccentColor(root, normalizedAccentColor);
  }

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
