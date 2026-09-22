import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { AppLayout } from '../src/components/app-layout/AppLayout.js';
import { Tabs } from '../src/components/tabs/Tabs.js';

const meta = {
  title: 'Layout/AppLayout + Tabs',
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workspace: Story = {
  render: () => (
    <div className="chayns-storybook-example-layout">
      <AppLayout>
        <AppLayout.Header>
          <AppLayout.Logo
            alt="Tobit.one"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='132' height='32'%3E%3Crect width='132' height='32' rx='8' fill='%230f6d7e'/%3E%3C/svg%3E"
          />
        </AppLayout.Header>
        <AppLayout.Navigation aria-label="Application navigation">
          <AppLayout.Navigation.Item icon="fa-inbox" isActive label="Inbox" />
          <AppLayout.Navigation.Item icon="fa-calendar" label="Calendar" />
        </AppLayout.Navigation>
        <AppLayout.CollapseToggle
          collapseLabel="Collapse navigation"
          expandLabel="Expand navigation"
        />
        <AppLayout.Content>
          <Tabs defaultValue="inbox">
            <Tabs.List aria-label="Workspace tabs">
              <Tabs.Tab value="inbox">Inbox</Tabs.Tab>
              <Tabs.Tab value="calendar">Calendar</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="inbox">Meetings and conversations</Tabs.Panel>
            <Tabs.Panel value="calendar">Your calendar</Tabs.Panel>
          </Tabs>
        </AppLayout.Content>
      </AppLayout>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('tab', { name: 'Calendar' }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
    await userEvent.click(canvas.getByRole('button', { name: 'Collapse navigation' }));
    await expect(canvas.getByRole('button', { name: 'Expand navigation' })).toBeInTheDocument();
  },
};
