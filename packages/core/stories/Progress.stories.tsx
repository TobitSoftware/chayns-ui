import usage from '../../../docs/03-components/progress/progress-usage.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Progress from '../src/components/progress/Progress.js';

const meta = {
  title: 'Core/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { label: 'Upload', value: 64 },
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Complete: Story = {
  args: { value: 100 },
};
