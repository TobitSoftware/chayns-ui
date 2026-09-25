import { useEffect, type ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';

import { resolveThemeColors } from '../packages/tokens/src';
import '../packages/tokens/dist/baseline.css';
import '../packages/tokens/dist/color.css';
import '../packages/tokens/dist/patch.css';
import '../packages/core/src/styles.css';
import '../packages/layout/src/styles.css';
import './preview.css';

const COLOR_MODE_CLASSES = ['theme-light', 'theme-dark'];
const DENSITY_CLASSES = ['chayns-density--s', 'chayns-density--m', 'chayns-density--l'];
const ACCESSIBILITY_CLASSES = ['theme-high-contrast', 'theme-color-deficiency'];
const DEFAULT_ACCENT_COLOR = '#005eb8';
const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i;

interface PreviewEnvironmentProps {
  accessibilityMode: string;
  accentColor: string;
  children: ReactNode;
  colorMode: string;
  density: string;
  isDocs: boolean;
}

function getAccessibilityClass(accessibilityMode: string): string {
  if (accessibilityMode === 'high-contrast') return 'theme-high-contrast';
  if (accessibilityMode === 'color-deficiency') return 'theme-color-deficiency';

  return '';
}

function getAccentColor(accentColor: string): string {
  return HEX_COLOR_PATTERN.test(accentColor) ? accentColor.toLowerCase() : DEFAULT_ACCENT_COLOR;
}

function PreviewEnvironment({
  accessibilityMode,
  accentColor,
  children,
  colorMode,
  density,
  isDocs,
}: PreviewEnvironmentProps) {
  const accessibilityClass = getAccessibilityClass(accessibilityMode);
  const environmentClassName = [
    `theme-${colorMode}`,
    `chayns-density--${density}`,
    accessibilityClass,
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const previewRoot = document.documentElement;
    const managedClasses = [...COLOR_MODE_CLASSES, ...DENSITY_CLASSES, ...ACCESSIBILITY_CLASSES];
    const environmentClasses = environmentClassName.split(' ');

    previewRoot.classList.remove(...managedClasses);
    previewRoot.classList.add(...environmentClasses);

    return () => previewRoot.classList.remove(...environmentClasses);
  }, [environmentClassName]);

  useEffect(() => {
    const previewRoot = document.documentElement;
    const themeColors = resolveThemeColors(getAccentColor(accentColor));

    Object.entries(themeColors).forEach(([name, value]) =>
      previewRoot.style.setProperty(name, value),
    );

    return () => Object.keys(themeColors).forEach((name) => previewRoot.style.removeProperty(name));
  }, [accentColor]);

  const previewClassName = isDocs
    ? 'chayns-storybook-preview chayns-storybook-preview--docs'
    : 'chayns-storybook-preview';

  return <div className={previewClassName}>{children}</div>;
}

const preview: Preview = {
  globalTypes: {
    accentColor: {
      description: 'Accent color used by the component preview.',
    },
    colorMode: {
      description: 'Resolved color mode used by the component preview.',
      toolbar: {
        dynamicTitle: true,
        icon: 'contrast',
        items: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        title: 'Color Mode',
      },
    },
    density: {
      description: 'Global user density used by all component previews.',
      toolbar: {
        dynamicTitle: true,
        icon: 'zoom',
        items: [
          { right: 'S', title: 'Small', value: 's' },
          { right: 'M', title: 'Medium', value: 'm' },
          { right: 'L', title: 'Large', value: 'l' },
        ],
        title: 'Density',
      },
    },
    accessibilityMode: {
      description: 'Resolved accessibility token mode used by the component preview.',
      toolbar: {
        dynamicTitle: true,
        icon: 'accessibility',
        items: [
          { title: 'Standard', value: 'standard' },
          { title: 'High Contrast', value: 'high-contrast' },
          { title: 'Color Deficiency', value: 'color-deficiency' },
        ],
        title: 'Accessibility Mode',
      },
    },
  },
  initialGlobals: {
    accentColor: DEFAULT_ACCENT_COLOR,
    colorMode: 'light',
    density: 'm',
    accessibilityMode: 'standard',
  },
  decorators: [
    (Story, context) => {
      const colorMode = String(context.globals.colorMode ?? 'light');
      const density = String(context.globals.density ?? 'm');
      const accessibilityMode = String(context.globals.accessibilityMode ?? 'standard');
      const accentColor = String(context.globals.accentColor ?? DEFAULT_ACCENT_COLOR);

      return (
        <PreviewEnvironment
          accessibilityMode={accessibilityMode}
          accentColor={accentColor}
          colorMode={colorMode}
          density={density}
          isDocs={context.viewMode === 'docs'}
        >
          <Story />
        </PreviewEnvironment>
      );
    },
  ],
  parameters: {
    a11y: { test: 'error' },
    controls: { expanded: true, sort: 'requiredFirst' },
    layout: 'fullscreen',
    options: { storySort: { order: ['Core'] } },
  },
};

export default preview;
