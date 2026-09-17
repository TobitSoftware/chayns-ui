import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioGroup from '../src/components/radio-group/RadioGroup.js';

const meta = {
  title: 'Core/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Radio value="all">Alle Personen</RadioGroup.Radio>
      <RadioGroup.Radio value="members">Nur Mitglieder</RadioGroup.Radio>
      <RadioGroup.Radio value="admins">Nur Administratoren</RadioGroup.Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null, defaultValue: 'all', label: 'Sichtbarkeit', name: 'visibility' },
};
export const Disabled: Story = {
  args: {
    children: null,
    defaultValue: 'members',
    disabled: true,
    label: 'Sichtbarkeit',
    name: 'visibility',
  },
};
