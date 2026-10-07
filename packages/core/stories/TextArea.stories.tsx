import usage from '../../../docs/03-components/text-area/text-area-usage.md?raw';
import TextAreaWithCounter from './examples/TextAreaWithCounter.js';
import counterSource from './examples/TextAreaWithCounter.tsx?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import TextArea from '../src/components/text-area/TextArea.js';

const meta = {
  title: 'Core/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: { placeholder: 'Nachricht', rows: 4 },
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HelpAndCounter: Story = {
  parameters: { docs: { source: { type: 'code', code: counterSource } } },
  render: TextAreaWithCounter,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox', { name: 'Nachricht' });

    await userEvent.type(field, 'Hallo');
    await expect(canvas.getByText('5 / 500')).toBeInTheDocument();
  },
};
export const Error: Story = {
  args: { error: 'Bitte beschreibe dein Anliegen.', value: 'Zu kurz', onChange: () => undefined },
};
export const Disabled: Story = {
  args: { disabled: true, value: 'Nicht bearbeitbar', onChange: () => undefined },
};
