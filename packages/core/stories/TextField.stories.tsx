import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import TextField from '../src/components/text-field/TextField.js';

const meta = {
  title: 'Core/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { placeholder: 'E-Mail-Adresse', type: 'email' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

function TextFieldWithCounter() {
  const [value, setValue] = useState('');

  return (
    <TextField
      counter={`${value.length} / 120`}
      helpText="Wir verwenden die Adresse nur für wichtige Hinweise."
      maxLength={120}
      onChange={(event) => setValue(event.target.value)}
      placeholder="E-Mail-Adresse"
      type="email"
      value={value}
    />
  );
}

export const Default: Story = {};
export const HelpAndCounter: Story = {
  render: () => <TextFieldWithCounter />,
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
