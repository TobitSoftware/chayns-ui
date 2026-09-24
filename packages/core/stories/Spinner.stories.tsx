import type { Meta, StoryObj } from '@storybook/react-vite';

import Spinner from '../src/components/spinner/Spinner.js';

const meta = {
  title: 'Core/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
