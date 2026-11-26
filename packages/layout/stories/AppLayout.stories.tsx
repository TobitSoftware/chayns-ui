import { AppLayoutHeader } from './docs/AppLayoutHeader.js';
import { AppLayoutLogo } from './docs/AppLayoutLogo.js';
import { AppLayoutNavigation } from './docs/AppLayoutNavigation.js';
import { AppLayoutNavigationItem } from './docs/AppLayoutNavigationItem.js';
import { AppLayoutContent } from './docs/AppLayoutContent.js';
import { AppLayoutFooter } from './docs/AppLayoutFooter.js';
import { AppLayoutFooterItem } from './docs/AppLayoutFooterItem.js';
import { AppLayoutCollapseToggle } from './docs/AppLayoutCollapseToggle.js';
import usage from '../../../docs/03-components/app-layout/app-layout-usage.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { AppLayout } from '../src/components/app-layout/AppLayout.js';

const logo =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="132" height="32" viewBox="0 0 132 32"%3E%3Crect width="132" height="32" rx="8" fill="%230f6d7e"/%3E%3Ctext x="12" y="22" fill="white" font-family="Arial" font-size="16" font-weight="700"%3ETobit.one%3C/text%3E%3C/svg%3E';

const meta = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  subcomponents: {
    'AppLayout.Header': AppLayoutHeader as never,
    'AppLayout.Logo': AppLayoutLogo as never,
    'AppLayout.Navigation': AppLayoutNavigation as never,
    'AppLayout.Navigation.Item': AppLayoutNavigationItem as never,
    'AppLayout.Content': AppLayoutContent as never,
    'AppLayout.Footer': AppLayoutFooter as never,
    'AppLayout.Footer.Item': AppLayoutFooterItem as never,
    'AppLayout.CollapseToggle': AppLayoutCollapseToggle as never,
  },
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MailWorkspace: Story = {
  args: { children: null },
  decorators: [
    (Story) => (
      <div className="chayns-storybook-example-layout">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
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
      <AppLayout.Footer>
        <button aria-label="Settings" type="button">
          Settings
        </button>
        <button aria-label="Help" type="button">
          Help
        </button>
        <AppLayout.CollapseToggle
          collapseLabel="Collapse navigation"
          expandLabel="Expand navigation"
        />
      </AppLayout.Footer>
      <AppLayout.Content>
        <div style={{ blockSize: '100%', padding: 'var(--sp-6)' }}>
          <h1 style={{ marginBlockStart: 0 }}>Meetings am Donnerstag</h1>
          <p>Der Inhalt liegt rechts neben der Navigation und unterhalb des Bodywork-Headers.</p>
        </div>
      </AppLayout.Content>
    </AppLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disclosure = canvas.getByRole('button', { name: 'Inbox', expanded: false });

    await userEvent.click(disclosure);
    await expect(canvas.getByRole('button', { name: 'Read' })).toBeInTheDocument();
  },
};

export const FooterNavigation: Story = {
  args: { children: null },
  decorators: [
    (Story) => (
      <div className="chayns-storybook-example-layout">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <AppLayout {...args}>
      <AppLayout.Header>
        <AppLayout.Logo src={logo} />
      </AppLayout.Header>
      <AppLayout.Navigation aria-label="Application navigation">
        <AppLayout.Navigation.Item icon="fa-inbox" label="Inbox" />
        <AppLayout.Navigation.Item icon="fa-calendar" isActive label="Calendar" />
        <AppLayout.Navigation.Item icon="fa-address-book" label="Contacts" />
      </AppLayout.Navigation>
      <AppLayout.Footer>
        <AppLayout.Footer.Item icon="fa-gear" label="Settings" href="#settings" />
        <AppLayout.Footer.Item icon="fa-circle-question" label="Help" href="#help" />
        <AppLayout.CollapseToggle collapseLabel="Collapse navigation" expandLabel="Expand navigation" />
      </AppLayout.Footer>
      <AppLayout.Content>
        <div style={{ blockSize: '100%', padding: 'var(--sp-6)' }}>
          <h1 style={{ marginBlockStart: 0 }}>Footer navigation items</h1>
          <p>Toggle the navigation to see footer actions move from inline to stacked layout.</p>
        </div>
      </AppLayout.Content>
    </AppLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const settings = canvas.getByRole('link', { name: 'Settings' });
    await expect(settings).toHaveAttribute('title', 'Settings');
    const toggle = canvas.getByRole('button', { name: 'Collapse navigation', expanded: true });
    await userEvent.click(toggle);
    await expect(canvas.getByRole('button', { name: 'Expand navigation', expanded: false })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Expand navigation', expanded: false }));
    await expect(canvas.getByRole('button', { name: 'Collapse navigation', expanded: true })).toBeInTheDocument();
  },
};

export const Collapsed: Story = {
  args: { children: null, defaultCollapsed: true },
  decorators: [
    (Story) => (
      <div className="chayns-storybook-example-layout">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <AppLayout {...args}>
      <AppLayout.Header>
        <AppLayout.Logo src={logo} />
      </AppLayout.Header>
      <AppLayout.Navigation aria-label="Application navigation">
        <AppLayout.Navigation.Item icon="fa-calendar" isActive label="Calendar" />
      </AppLayout.Navigation>
      <AppLayout.Footer>
        <AppLayout.CollapseToggle
          collapseLabel="Collapse navigation"
          expandLabel="Expand navigation"
        />
      </AppLayout.Footer>
      <AppLayout.Content>Workspace</AppLayout.Content>
    </AppLayout>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('button', { name: 'Expand navigation' }),
    ).toBeInTheDocument();
  },
};
