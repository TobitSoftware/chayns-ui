import usage from '../../../docs/03-components/text-field/text-field-usage.md?raw';
import TextFieldWithCounter from './examples/TextFieldWithCounter.js';
import counterSource from './examples/TextFieldWithCounter.tsx?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import TextField from '../src/components/text-field/TextField.js';

const meta = {
  title: 'Core/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { placeholder: 'E-Mail-Adresse', type: 'email' },
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HelpAndCounter: Story = {
  parameters: { docs: { source: { type: 'code', code: counterSource } } },
  render: TextFieldWithCounter,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox', { name: 'E-Mail-Adresse' });

    await userEvent.type(field, 'ada');
    await expect(canvas.getByText('3 / 120')).toBeInTheDocument();
  },
};
export const Error: Story = {
  args: {
    error: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    value: 'invalid',
    onChange: () => undefined,
  },
};
export const Disabled: Story = {
  args: { disabled: true, value: 'name@example.com', onChange: () => undefined },
};
export const Password: Story = {
  args: { placeholder: 'Passwort', type: 'password', autoComplete: 'current-password' },
};
