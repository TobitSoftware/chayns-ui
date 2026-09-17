import type { Meta, StoryObj } from '@storybook/react-vite';

import SegmentedControl from '../src/components/segmented-control/SegmentedControl.js';

const meta = {
  title: 'Core/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControl.Segment value="week">Woche</SegmentedControl.Segment>
      <SegmentedControl.Segment value="month">Monat</SegmentedControl.Segment>
      <SegmentedControl.Segment value="year">Jahr</SegmentedControl.Segment>
    </SegmentedControl>
  ),
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null, defaultValue: 'week', label: 'Zeitraum' },
};
export const Selected: Story = {
  args: { children: null, defaultValue: 'month', label: 'Zeitraum' },
};
