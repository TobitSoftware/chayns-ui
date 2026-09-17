import type { Meta, StoryObj } from '@storybook/react-vite';

import Switch from '../src/components/switch/Switch.js';

const meta = {
  title: 'Core/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { children: 'E-Mail-Benachrichtigungen' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Enabled: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { defaultChecked: true, disabled: true } };
