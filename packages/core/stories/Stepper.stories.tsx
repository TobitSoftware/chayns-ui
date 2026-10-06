import specification from '../../../docs/03-components/stepper/stepper-specification.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import Stepper from '../src/components/stepper/Stepper.js';
import { StepperPrecisions } from '../src/components/stepper/Stepper.types.js';

const meta = {
  title: 'Core/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: specification.slice(specification.indexOf('\n---\n') + 5) } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Anzahl',
    value: 2,
    min: 0,
    max: 5,
    step: 1,
    decreaseLabel: 'Anzahl verringern',
    increaseLabel: 'Anzahl erhöhen',
    onValueChange: () => undefined,
    formatValue: (value) => String(value),
  },
  render: function ControlledStepper(args) {
    const [value, setValue] = useState(args.value);
    return <Stepper {...args} value={value} onValueChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Anzahl erhöhen' }));
    await expect(canvas.getByText('3')).toBeVisible();
  },
};
export const Decimal: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Gewicht',
    decreaseLabel: 'Gewicht verringern',
    increaseLabel: 'Gewicht erhöhen',
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.1,
    precision: StepperPrecisions.One,
    formatValue: (value) => `${value.toFixed(1).replace('.', ',')} kg`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Gewicht erhöhen' }));
    await expect(canvas.getByText('0,3 kg')).toBeVisible();
  },
};
