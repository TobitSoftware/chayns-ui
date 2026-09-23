import type { Meta, StoryObj } from '@storybook/react-vite';

import Skeleton from '../src/components/skeleton/Skeleton.js';
import { SKELETON_SHAPES } from '../src/components/skeleton/Skeleton.types.js';

const meta = {
  title: 'Core/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { shape: 'rounded', style: { height: 20, width: 200 } },
  argTypes: {
    shape: { control: 'select', options: SKELETON_SHAPES },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circular: Story = {
  args: { shape: 'circular', style: { height: 48, width: 48 } },
};
