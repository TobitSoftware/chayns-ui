import specification from '../../../docs/03-components/segmented-control/segmented-control-specification.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SegmentedControl from '../src/components/segmented-control/SegmentedControl.js';

const meta = {
  title: 'Core/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: specification.slice(specification.indexOf('\n---\n') + 5) } },
    a11y: { test: 'error' },
  },
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControl.Segment icon="fa-calendar-week" value="week">
        Woche
      </SegmentedControl.Segment>
      <SegmentedControl.Segment icon="fa-calendar-days" value="month">
        Monat
      </SegmentedControl.Segment>
      <SegmentedControl.Segment icon="fa-calendar" value="year">
        Jahr
      </SegmentedControl.Segment>
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

export const AutomaticSelection: Story = {
  args: { children: null, label: 'Zeitraum' },
};
