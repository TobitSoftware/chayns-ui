import type { Preview } from '@storybook/react-vite';

import '../packages/tokens/dist/baseline.css';
import '../packages/tokens/dist/patch.css';
import '../packages/core/src/styles.css';

function getAccessibilityClass(accessibilityMode: string): string {
  if (accessibilityMode === 'high-contrast') return 'chayns-contrast--high';
  if (accessibilityMode === 'color-deficiency') return 'chayns-theme--color-deficiency';

  return '';
}

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Resolved color mode',
      toolbar: { icon: 'contrast', items: ['light', 'dark'] },
    },
    density: {
      description: 'Global user density',
      toolbar: { icon: 'zoom', items: ['s', 'm', 'l'] },
    },
    accessibilityMode: {
      description: 'Resolved accessibility token mode',
      toolbar: { icon: 'accessibility', items: ['standard', 'high-contrast', 'color-deficiency'] },
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
      const accessibilityClass = getAccessibilityClass(accessibilityMode);

      return (
        <div
          className={`chayns-theme--${colorMode} chayns-density--${density} ${accessibilityClass}`}
          style={{
            background: 'var(--surface)',
            color: 'var(--text)',
            minHeight: '100vh',
            padding: 'var(--sp-6)',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    a11y: { test: 'error' },
    controls: { expanded: true },
    options: { storySort: { order: ['Core'] } },
  },
};

export default preview;
