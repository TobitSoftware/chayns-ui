import type { Meta, StoryObj } from '@storybook/react-vite';

import IconButton from './IconButton.js';

const meta = {
  title: 'Core/IconButton',
  component: IconButton,
  args: {
    'aria-label': 'Add attachment',
    icon: <span>☆</span>,
    activeIcon: <span>★</span>,
    variant: 'ghost',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost', 'danger'] },
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paired: Story = {};
export const SingleAvailableIcon: Story = { args: { activeIcon: null } };
export const Disabled: Story = { args: { 'aria-label': 'Unavailable action', disabled: true } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
      <IconButton aria-label="Primary icon action" icon={<span>＋</span>} variant="primary" />
      <IconButton aria-label="Outline icon action" icon={<span>＋</span>} variant="outline" />
      <IconButton aria-label="Ghost icon action" icon={<span>＋</span>} variant="ghost" />
      <IconButton aria-label="Delete" icon={<span>×</span>} variant="danger" />
    </div>
  ),
};
