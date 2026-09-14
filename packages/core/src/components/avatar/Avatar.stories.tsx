import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar from './Avatar.js';

const meta = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: {
    name: 'Peter Schmidt',
  },
};

export const Small: Story = {
  args: {
    name: 'Peter Schmidt',
    size: 'small',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Eva Fischer',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
  },
};

export const WithBadge: Story = {
  args: {
    badge: <span aria-hidden="true">✉</span>,
    name: 'Peter Schmidt',
  },
};
