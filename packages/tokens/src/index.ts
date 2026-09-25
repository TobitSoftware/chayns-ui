const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i;
const LIGHT_SURFACE = '#f4f6f6';
const DARK_SURFACE = '#0e171b';
const MINIMUM_ACCENT_CONTRAST = 4.5;
const HIGH_CONTRAST_LIGHT_SURFACE = '#ffffff';
const HIGH_CONTRAST_DARK_SURFACE = '#000000';

type Oklch = readonly [lightness: number, chroma: number, hue: number];

export type ThemeAccentVariable =
  | '--theme-accent-light'
  | '--theme-accent-light-hover'
  | '--theme-accent-light-active'
  | '--theme-accent-light-rgb'
  | '--theme-accent-dark'
  | '--theme-accent-dark-hover'
  | '--theme-accent-dark-active'
  | '--theme-accent-dark-rgb'
  | '--theme-accent-high-contrast-light'
  | '--theme-accent-high-contrast-light-hover'
  | '--theme-accent-high-contrast-light-active'
  | '--theme-accent-high-contrast-light-rgb'
  | '--theme-accent-high-contrast-dark'
  | '--theme-accent-high-contrast-dark-hover'
  | '--theme-accent-high-contrast-dark-active'
  | '--theme-accent-high-contrast-dark-rgb';

export type ThemeColors = Record<ThemeAccentVariable, string>;

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

function rgbValue(hex: string): string {
  return hexToRgb(hex).join(', ');
}

function srgbToLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel: number): number {
  return channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;
}

function hexToOklch(hex: string): Oklch {
  const [sourceRed, sourceGreen, sourceBlue] = hexToRgb(hex);
  const red = srgbToLinear(sourceRed / 255);
  const green = srgbToLinear(sourceGreen / 255);
  const blue = srgbToLinear(sourceBlue / 255);
  const l = 0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue;
  const m = 0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue;
  const s = 0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue;
  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);
  const lightness = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
  const b = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;
  const hue = (Math.atan2(b, a) * 180) / Math.PI;

  return [lightness, Math.hypot(a, b), hue < 0 ? hue + 360 : hue];
}

function oklchToHex(lightness: number, chroma: number, hue: number): string | undefined {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);
  const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;
  const red = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const green = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const blue = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  if (![red, green, blue].every((channel) => channel >= 0 && channel <= 1)) return undefined;

  return rgbToHex(linearToSrgb(red) * 255, linearToSrgb(green) * 255, linearToSrgb(blue) * 255);
}

function oklchToGamutMappedHex(lightness: number, chroma: number, hue: number): string {
  let minimum = 0;
  let maximum = chroma;
  let result = oklchToHex(lightness, minimum, hue) ?? '#000000';

  for (let iteration = 0; iteration < 24; iteration += 1) {
    const candidateChroma = (minimum + maximum) / 2;
    const candidate = oklchToHex(lightness, candidateChroma, hue);

    if (candidate) {
      minimum = candidateChroma;
      result = candidate;
    } else {
      maximum = candidateChroma;
    }
  }

  return result;
}

function relativeLuminance(color: string): number {
  const [sourceRed, sourceGreen, sourceBlue] = hexToRgb(color);
  const red = srgbToLinear(sourceRed / 255);
  const green = srgbToLinear(sourceGreen / 255);
  const blue = srgbToLinear(sourceBlue / 255);

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(first: string, second: string): number {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function calibratedAccent(
  color: Oklch,
  surface: string,
  direction: 'lighter' | 'darker',
  minimumContrast = MINIMUM_ACCENT_CONTRAST,
): string {
  const [lightness, chroma, hue] = color;
  const original = oklchToGamutMappedHex(lightness, chroma, hue);

  if (contrastRatio(original, surface) >= minimumContrast) return original;

  let minimum = direction === 'darker' ? 0 : lightness;
  let maximum = direction === 'darker' ? lightness : 1;
  let result = direction === 'darker' ? '#000000' : '#ffffff';

  for (let iteration = 0; iteration < 24; iteration += 1) {
    const candidateLightness = (minimum + maximum) / 2;
    const candidate = oklchToGamutMappedHex(candidateLightness, chroma, hue);

    if (contrastRatio(candidate, surface) >= minimumContrast) {
      result = candidate;
      if (direction === 'darker') minimum = candidateLightness;
      else maximum = candidateLightness;
    } else if (direction === 'darker') {
      maximum = candidateLightness;
    } else {
      minimum = candidateLightness;
    }
  }

  return result;
}

function adjustedAccent(
  accent: string,
  surface: string,
  direction: 'lighter' | 'darker',
  lightnessOffset: number,
  minimumContrast = MINIMUM_ACCENT_CONTRAST,
): string {
  const [lightness, chroma, hue] = hexToOklch(accent);
  return calibratedAccent(
    [Math.min(1, lightness + lightnessOffset), chroma, hue],
    surface,
    direction,
    minimumContrast,
  );
}

export function resolveThemeColors(accentColor: string): ThemeColors {
  assertAccentColor(accentColor);

  const color = hexToOklch(accentColor);
  const lightAccent = calibratedAccent(color, LIGHT_SURFACE, 'darker');
  const darkAccent = calibratedAccent(color, DARK_SURFACE, 'lighter');
  const highContrastLightAccent = calibratedAccent(color, HIGH_CONTRAST_LIGHT_SURFACE, 'darker', 7);
  const highContrastDarkAccent = calibratedAccent(color, HIGH_CONTRAST_DARK_SURFACE, 'lighter', 7);

  return {
    '--theme-accent-light': lightAccent,
    '--theme-accent-light-hover': adjustedAccent(lightAccent, LIGHT_SURFACE, 'darker', 0.04),
    '--theme-accent-light-active': adjustedAccent(lightAccent, LIGHT_SURFACE, 'darker', 0.08),
    '--theme-accent-light-rgb': rgbValue(lightAccent),
    '--theme-accent-dark': darkAccent,
    '--theme-accent-dark-hover': adjustedAccent(darkAccent, DARK_SURFACE, 'lighter', 0.06),
    '--theme-accent-dark-active': adjustedAccent(darkAccent, DARK_SURFACE, 'lighter', 0.12),
    '--theme-accent-dark-rgb': rgbValue(darkAccent),
    '--theme-accent-high-contrast-light': highContrastLightAccent,
    '--theme-accent-high-contrast-light-hover': adjustedAccent(
      highContrastLightAccent,
      HIGH_CONTRAST_LIGHT_SURFACE,
      'darker',
      0.04,
      7,
    ),
    '--theme-accent-high-contrast-light-active': adjustedAccent(
      highContrastLightAccent,
      HIGH_CONTRAST_LIGHT_SURFACE,
      'darker',
      0.08,
      7,
    ),
    '--theme-accent-high-contrast-light-rgb': rgbValue(highContrastLightAccent),
    '--theme-accent-high-contrast-dark': highContrastDarkAccent,
    '--theme-accent-high-contrast-dark-hover': adjustedAccent(
      highContrastDarkAccent,
      HIGH_CONTRAST_DARK_SURFACE,
      'lighter',
      0.06,
      7,
    ),
    '--theme-accent-high-contrast-dark-active': adjustedAccent(
      highContrastDarkAccent,
      HIGH_CONTRAST_DARK_SURFACE,
      'lighter',
      0.12,
      7,
    ),
    '--theme-accent-high-contrast-dark-rgb': rgbValue(highContrastDarkAccent),
  };
}
