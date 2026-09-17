import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Tabs } from '../src/components/tabs/Tabs.js';
const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { children: null, defaultValue: 'inbox' },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Arbeitsbereiche">
        <Tabs.Tab value="inbox">Posteingang</Tabs.Tab>
        <Tabs.Tab value="calendar">Kalender</Tabs.Tab>
      </Tabs.List>
      <Tabs.Add aria-label="Tab hinzufügen" onClick={fn()}>
        +
      </Tabs.Add>
      <Tabs.Panel value="inbox">Nachrichten und Unterhaltungen</Tabs.Panel>
      <Tabs.Panel value="calendar">Dein Kalender</Tabs.Panel>
    </Tabs>
  ),
};
