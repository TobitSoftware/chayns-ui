import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AppLayout } from './AppLayout.js';

const navigationItems = [
  {
    id: 'inbox',
    name: 'Inbox',
    icon: 'fa-inbox' as const,
    children: [
      { id: 'read', name: 'Read', icon: 'fa-folder' as const },
      { id: 'favorites', name: 'Favorites', icon: 'fa-star' as const },
      { id: 'spam', name: 'Spam', icon: 'fa-ban' as const },
    ],
  },
  { id: 'outbox', name: 'Outbox', icon: 'fa-paper-plane' as const },
  { id: 'calendar', name: 'Calendar', icon: 'fa-calendar' as const },
  {
    id: 'projects',
    name: 'Projects',
    icon: 'fa-folder-tree' as const,
    children: [
      { id: 'website', name: 'Website relaunch', icon: 'fa-globe' as const },
      { id: 'mobile', name: 'Mobile app', icon: 'fa-mobile-screen' as const },
    ],
  },
  { id: 'contacts', name: 'Contacts', icon: 'fa-address-book' as const },
];

const logo =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="132" height="32" viewBox="0 0 132 32"%3E%3Crect width="132" height="32" rx="8" fill="%230f6d7e"/%3E%3Ctext x="12" y="22" fill="white" font-family="Arial" font-size="16" font-weight="700"%3ETobit.one%3C/text%3E%3C/svg%3E';

const meta = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  args: {
    collapseLabel: 'Collapse navigation',
    expandLabel: 'Expand navigation',
    items: navigationItems,
    logo,
    navigationLabel: 'Application navigation',
    onClick: fn(),
  },
  parameters: {
    a11y: { test: 'error' },
    controls: {
      exclude: ['items', 'logo', 'onClick'],
    },
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MailWorkspace: Story = {
  args: {
    activeItemId: 'inbox',
  },
  render: (args) => (
    <div style={{ blockSize: '36rem' }}>
      <AppLayout {...args}>
        <div style={{ padding: 'var(--sp-6)', backgroundColor: 'green', height: '100%' }}>
          <h1 style={{ marginBlockStart: 0 }}>Meetings am Donnerstag</h1>
          <p>
            Das AppLayout rendert den Anwendungsinhalt rechts neben der Navigation und unterhalb des
            64px-Headers.
          </p>
        </div>
      </AppLayout>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const inboxActions = canvas.getAllByRole('button', { name: 'Inbox' });
    const disclosure = canvas.getByRole('button', { name: 'Inbox', expanded: false });

    await userEvent.click(inboxActions[0]!);
    await expect(args.onClick).toHaveBeenCalledWith('inbox');
    await userEvent.click(disclosure);
    await expect(canvas.getByRole('button', { name: 'Read' })).toBeInTheDocument();
  },
};

export const Collapsed: Story = {
  args: {
    activeItemId: 'calendar',
    defaultCollapsed: true,
  },
  render: (args) => (
    <div style={{ blockSize: '36rem' }}>
      <AppLayout {...args}>
        <div style={{ padding: 'var(--sp-6)' }}>
          <h1 style={{ marginBlockStart: 0 }}>Collapsed navigation</h1>
          <p>Die Item-Namen bleiben als Accessible Names erhalten.</p>
        </div>
      </AppLayout>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendar = canvas.getByRole('button', { name: 'Calendar' });

    await expect(calendar).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Expand navigation' })).toBeInTheDocument();
  },
};
