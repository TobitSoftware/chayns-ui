import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import ComboBox from '../src/components/combo-box/ComboBox.js';

const meta = {
  title: 'Core/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  args: { children: null },
  render: () => (
    <ComboBox aria-label="Kategorie" placeholder="Kategorie" defaultValue="design">
      <ComboBox.Option value="design">Design</ComboBox.Option>
      <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
      <ComboBox.Option value="support">Support</ComboBox.Option>
    </ComboBox>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Kategorie' });

    await userEvent.click(input);
    await userEvent.keyboard('{Enter}');
    await expect(input).toHaveValue('Design');
  },
};

export const MultiSelect: Story = {
  args: { children: null },
  render: () => (
    <ComboBox aria-label="Kategorien" multiple placeholder="Kategorien">
      <ComboBox.Option value="design">Design</ComboBox.Option>
      <ComboBox.Option value="engineering">Engineering</ComboBox.Option>
      <ComboBox.Option value="support">Support</ComboBox.Option>
      <ComboBox.Option value="product">Product</ComboBox.Option>
    </ComboBox>
  ),
};
