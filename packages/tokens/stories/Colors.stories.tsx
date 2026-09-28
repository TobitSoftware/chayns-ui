import type { Meta, StoryObj } from '@storybook/react-vite';

import './Colors.stories.css';

const colorGroups = [
  {
    name: 'Surfaces',
    tokens: ['--page', '--surface', '--surface-2', '--surface-alt', '--hover', '--toggle-bg'],
  },
  {
    name: 'Borders',
    tokens: ['--border', '--border-soft', '--input-border'],
  },
  {
    name: 'Text',
    tokens: ['--text', '--text-2', '--text-3', '--muted'],
  },
  {
    name: 'Accent',
    tokens: ['--accent', '--accent-hover', '--accent-active', '--on-accent'],
  },
  {
    name: 'Status',
    tokens: [
      '--success',
      '--success-hover',
      '--success-bg',
      '--success-2',
      '--success-3',
      '--success-4',
      '--on-success',
      '--warning',
      '--warning-hover',
      '--warning-bg',
      '--warning-2',
      '--warning-3',
      '--warning-4',
      '--on-warning',
      '--danger',
      '--danger-hover',
      '--danger-bg',
      '--danger-bg-hover',
      '--danger-2',
      '--danger-3',
      '--danger-4',
      '--on-danger',
    ],
  },
  {
    name: 'Disabled',
    tokens: ['--disabled-bg', '--disabled-fg', '--disabled-border'],
  },
] as const;

const accentScaleGroups = ['000', '100', '200', '300'].map((prefix) => ({
  name: `Accent ${prefix}`,
  tokens: Array.from({ length: 10 }, (_, index) => `--accent-${prefix.slice(0, 2)}${index}`),
}));

const meta = {
  title: 'Tokens/Colors',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <div className="chayns-storybook-color-palette">
      {[...colorGroups, ...accentScaleGroups].map(({ name, tokens }) => (
        <section key={name} className="chayns-storybook-color-palette__group">
          <h2>{name}</h2>
          <div className="chayns-storybook-color-palette__grid">
            {tokens.map((token) => (
              <div key={token} className="chayns-storybook-color-palette__tile">
                <span
                  aria-label={token}
                  className="chayns-storybook-color-palette__swatch"
                  style={{ backgroundColor: `var(${token})` }}
                />
                <code>{token}</code>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
