import { Radio } from './docs/Radio.js';
import usage from '../../../docs/03-components/radio-group/radio-group-usage.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioGroup from '../src/components/radio-group/RadioGroup.js';

const meta = {
  title: 'Core/RadioGroup',
  component: RadioGroup,
  subcomponents: {
    'RadioGroup.Radio': Radio as never,
  },
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Radio value="all">Alle Personen</RadioGroup.Radio>
      <RadioGroup.Radio description="Alle Kontakte können teilnehmen." value="members">
        Nur Mitglieder
      </RadioGroup.Radio>
      <RadioGroup.Radio description="Nur das Administrationsteam kann teilnehmen." value="admins">
        Nur Administratoren
      </RadioGroup.Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Sichtbarkeit',
    children: null,
    defaultValue: 'all',
    name: 'visibility',
  },
};
export const Disabled: Story = {
  args: {
    children: null,
    defaultValue: 'members',
    disabled: true,
    'aria-label': 'Sichtbarkeit',
    name: 'visibility',
  },
};
