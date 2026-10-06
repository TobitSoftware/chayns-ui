import specification from '../../../docs/03-components/slider/slider-specification.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Slider from '../src/components/slider/Slider.js';

const meta = {
  title: 'Core/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: specification.slice(specification.indexOf('\n---\n') + 5) } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Lautstärke',
    defaultValue: 35,
    min: 0,
    max: 100,
    formatValue: (value: number) => `${value} Prozent`,
  },
};
export const EdgeCases: Story = {
  args: {
    label: 'Lautstärke ist momentan nicht veränderbar',
    value: 50,
    disabled: true,
    formatValue: (value: number) => `${value} Prozent`,
  },
};
