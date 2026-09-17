import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from '../src/components/checkbox/Checkbox.js';

const meta = {
  title: 'Core/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: 'Ich akzeptiere die Bedingungen.' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { defaultChecked: true, disabled: true } };
