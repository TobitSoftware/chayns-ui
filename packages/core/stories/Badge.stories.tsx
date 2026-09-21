import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge from '../src/components/badge/Badge.js';
import { BADGE_SIZES, BADGE_TONES } from '../src/components/badge/Badge.types.js';

const meta = {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Gesendet', size: 'sm', tone: 'success' },
  argTypes: {
    size: { control: 'select', options: BADGE_SIZES },
    tone: { control: 'select', options: BADGE_TONES },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {};
export const Count: Story = { args: { children: '12', tone: 'accent' } };
export const Chip: Story = { args: { children: '👍 2', tone: 'neutral', size: 'md' } };
