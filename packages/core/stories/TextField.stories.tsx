import type { Meta, StoryObj } from '@storybook/react-vite';

import TextField from '../src/components/text-field/TextField.js';

const meta = {
  title: 'Core/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { 'aria-label': 'E-Mail-Adresse', placeholder: 'name@example.com', type: 'email' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HelpAndCounter: Story = {
  args: { helpText: 'Wir verwenden die Adresse nur für wichtige Hinweise.', counter: '0 / 120' },
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
