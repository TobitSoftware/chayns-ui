import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { AppLayout } from '../src/components/app-layout/AppLayout.js';

const logo =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="132" height="32" viewBox="0 0 132 32"%3E%3Crect width="132" height="32" rx="8" fill="%230f6d7e"/%3E%3Ctext x="12" y="22" fill="white" font-family="Arial" font-size="16" font-weight="700"%3ETobit.one%3C/text%3E%3C/svg%3E';

const meta = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MailWorkspace: Story = {
  args: { children: null },
  render: (args) => (
    <div style={{ blockSize: '36rem' }}>
      <AppLayout {...args}>
        <AppLayout.Header>
          <AppLayout.Logo src={logo} />
          <div>Arbeitsbereich</div>
        </AppLayout.Header>
        <AppLayout.Navigation aria-label="Application navigation">
          <AppLayout.Navigation.Item icon="fa-inbox" label="Inbox">
            <AppLayout.Navigation.Item icon="fa-folder" label="Read" />
            <AppLayout.Navigation.Item icon="fa-star" label="Favorites" />
          </AppLayout.Navigation.Item>
          <AppLayout.Navigation.Item icon="fa-paper-plane" label="Outbox" />
          <AppLayout.Navigation.Item icon="fa-calendar" isActive label="Calendar" />
          <AppLayout.Navigation.Item icon="fa-address-book" label="Contacts" />
        </AppLayout.Navigation>
        <AppLayout.CollapseToggle
          collapseLabel="Collapse navigation"
          expandLabel="Expand navigation"
        />
        <AppLayout.Content>
          <div style={{ height: '100%', padding: 'var(--sp-6)' }}>
            <h1 style={{ marginBlockStart: 0 }}>Meetings am Donnerstag</h1>
            <p>Der Inhalt liegt rechts neben der Navigation und unterhalb des 64px-Headers.</p>
          </div>
        </AppLayout.Content>
      </AppLayout>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disclosure = canvas.getByRole('button', { name: 'Inbox', expanded: false });

    await userEvent.click(disclosure);
    await expect(canvas.getByRole('button', { name: 'Read' })).toBeInTheDocument();
  },
};

export const Collapsed: Story = {
  args: { children: null, defaultCollapsed: true },
  render: (args) => (
    <div style={{ blockSize: '36rem' }}>
      <AppLayout {...args}>
        <AppLayout.Header>
          <AppLayout.Logo src={logo} />
        </AppLayout.Header>
        <AppLayout.Navigation aria-label="Application navigation">
          <AppLayout.Navigation.Item icon="fa-calendar" isActive label="Calendar" />
        </AppLayout.Navigation>
        <AppLayout.CollapseToggle
          collapseLabel="Collapse navigation"
          expandLabel="Expand navigation"
        />
        <AppLayout.Content>Workspace</AppLayout.Content>
      </AppLayout>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('button', { name: 'Expand navigation' }),
    ).toBeInTheDocument();
  },
};
