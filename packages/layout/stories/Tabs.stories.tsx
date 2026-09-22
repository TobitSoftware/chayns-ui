import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Tabs } from '../src/components/tabs/Tabs.js';

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceTabs: Story = {
  args: { children: null, defaultValue: 'inbox' },
  render: (args) => (
    <div className="chayns-storybook-example-tabs">
      <Tabs {...args}>
        <Tabs.List aria-label="Arbeitsbereiche">
          <Tabs.Tab onRemove={() => undefined} value="inbox">
            <i aria-hidden="true" className="far fa-inbox" />
            <span className="chayns-tabs__label">Inbox</span>
          </Tabs.Tab>
          <Tabs.Tab onRemove={() => undefined} value="calendar">
            <i aria-hidden="true" className="far fa-calendar" />
            <span className="chayns-tabs__label">Calendar</span>
          </Tabs.Tab>
          <Tabs.Tab onRemove={() => undefined} value="tasks">
            <i aria-hidden="true" className="far fa-list-check" />
            <span className="chayns-tabs__label">Tasks</span>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Add aria-label="Add tab">
          <i aria-hidden="true" className="far fa-plus" />
        </Tabs.Add>
        <Tabs.Panel value="inbox">Meetings and conversations</Tabs.Panel>
        <Tabs.Panel value="calendar">Your calendar</Tabs.Panel>
        <Tabs.Panel value="tasks">Tasks and notes</Tabs.Panel>
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('tab', { name: 'Calendar' }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
  },
};
