import { useEffect, type ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';

import '../packages/tokens/dist/baseline.css';
import '../packages/tokens/dist/patch.css';
import '../packages/core/src/styles.css';
import './preview.css';

const COLOR_MODE_CLASSES = ['chayns-theme--light', 'chayns-theme--dark'];
const DENSITY_CLASSES = ['chayns-density--s', 'chayns-density--m', 'chayns-density--l'];
const ACCESSIBILITY_CLASSES = ['chayns-contrast--high', 'chayns-theme--color-deficiency'];

interface PreviewEnvironmentProps {
  accessibilityMode: string;
  children: ReactNode;
  colorMode: string;
  density: string;
  isDocs: boolean;
}

function getAccessibilityClass(accessibilityMode: string): string {
  if (accessibilityMode === 'high-contrast') return 'chayns-contrast--high';
  if (accessibilityMode === 'color-deficiency') return 'chayns-theme--color-deficiency';

  return '';
}

function PreviewEnvironment({
  accessibilityMode,
  children,
  colorMode,
  density,
  isDocs,
}: PreviewEnvironmentProps) {
  const accessibilityClass = getAccessibilityClass(accessibilityMode);
  const environmentClassName = [
    `chayns-theme--${colorMode}`,
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

  const previewClassName = isDocs
    ? 'chayns-storybook-preview chayns-storybook-preview--docs'
    : 'chayns-storybook-preview';

  return <div className={`${previewClassName} ${environmentClassName}`}>{children}</div>;
}

const preview: Preview = {
  globalTypes: {
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
    colorMode: 'light',
    density: 'm',
    accessibilityMode: 'standard',
  },
  decorators: [
    (Story, context) => {
      const colorMode = String(context.globals.colorMode ?? 'light');
      const density = String(context.globals.density ?? 'm');
      const accessibilityMode = String(context.globals.accessibilityMode ?? 'standard');

      return (
        <PreviewEnvironment
          accessibilityMode={accessibilityMode}
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
