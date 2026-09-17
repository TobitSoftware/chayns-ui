import type { Meta, StoryObj } from '@storybook/react-vite';

import TextArea from '../src/components/text-area/TextArea.js';

const meta = {
  title: 'Core/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: { 'aria-label': 'Nachricht', placeholder: 'Schreibe eine Nachricht', rows: 4 },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HelpAndCounter: Story = {
  args: { helpText: 'Maximal 500 Zeichen.', counter: '0 / 500' },
};
export const Error: Story = {
  args: { error: 'Bitte beschreibe dein Anliegen.', value: 'Zu kurz', onChange: () => undefined },
};
export const Disabled: Story = {
  args: { disabled: true, value: 'Nicht bearbeitbar', onChange: () => undefined },
};
