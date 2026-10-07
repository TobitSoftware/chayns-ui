import waitForTabPanels from './utils/waitForTabPanels.js';
import checkTabPanelExit from './utils/checkTabPanelExit.js';
import EditableTabs from './examples/EditableTabs.js';
import editableSource from './examples/EditableTabs.tsx?raw';
import usage from '../../../docs/03-components/tabs/tabs-usage.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Tabs } from '../src/components/tabs/Tabs.js';
import { TabsAppearances } from '../src/components/tabs/Tabs.types.js';

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <div
        className={`chayns-storybook-example-tabs${context.args.appearance === TabsAppearances.Underline ? ' chayns-storybook-example-tabs--underline' : ''}`}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    a11y: { test: 'error' },
    docs: { description: { component: usage } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceTabs: Story = {
  args: { children: null, defaultValue: 'inbox' },
  parameters: { docs: { source: { type: 'code', code: editableSource } } },
  render: EditableTabs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Calendar' }));
    await checkTabPanelExit(canvasElement);
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
    await waitForTabPanels(canvasElement);
  },
};

export const Underline: Story = {
  ...WorkspaceTabs,
  args: { ...WorkspaceTabs.args, appearance: TabsAppearances.Underline },
  parameters: { docs: { source: { type: 'dynamic' } } },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Arbeitsbereiche">
        <Tabs.Tab value="inbox">Inbox</Tabs.Tab>
        <Tabs.Tab value="calendar">Calendar</Tabs.Tab>
        <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="inbox">Meetings and conversations</Tabs.Panel>
      <Tabs.Panel value="calendar">Your calendar</Tabs.Panel>
      <Tabs.Panel value="tasks">Tasks and notes</Tabs.Panel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendar = canvas.getByRole('tab', { name: 'Calendar' });
    await expect(canvas.queryByRole('button', { name: 'Add tab' })).toBeNull();
    await expect(canvasElement.querySelector('[data-tabs-remove]')).toBeNull();
    await userEvent.click(calendar);
    await checkTabPanelExit(canvasElement);
    await userEvent.keyboard('{Delete}{Backspace}');
    await expect(calendar).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
    await waitForTabPanels(canvasElement);
  },
};

export const UnderlineEditable: Story = {
  ...WorkspaceTabs,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: editableSource.replace('TabsAppearances.Attached', 'TabsAppearances.Underline'),
      },
    },
  },
  args: { ...WorkspaceTabs.args, appearance: TabsAppearances.Underline },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inbox = canvas.getByRole('tab', { name: 'Inbox' });
    await expect(inbox.querySelector('[data-tabs-remove]')).toBeNull();
    await userEvent.click(inbox);
    await userEvent.keyboard('{Delete}');
    await expect(inbox).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(canvas.getByRole('tab', { name: 'Calendar' }));
    await userEvent.keyboard('{Delete}');
    await expect(canvas.queryByRole('tab', { name: 'Calendar' })).toBeNull();
    await expect(inbox).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(canvas.getByRole('button', { name: 'Add tab' }));
    await userEvent.click(canvas.getByRole('tab', { name: 'New view 1' }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Content of new view 1');
    await waitForTabPanels(canvasElement);
  },
};

export const AutomaticSelection: Story = {
  ...Underline,
  args: { children: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', { name: 'Inbox' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.click(canvas.getByRole('tab', { name: 'Calendar' }));
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Tasks' })).toHaveFocus();
    await waitForTabPanels(canvasElement);
  },
};

export const AttachedWithIcons: Story = {
  args: { children: null, appearance: TabsAppearances.Attached, defaultValue: 'inbox' },
  parameters: { docs: { source: { type: 'dynamic' } } },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Arbeitsbereiche">
        <Tabs.Tab value="inbox" icon="fa-inbox">
          <span className="chayns-tabs__label">Inbox</span>
        </Tabs.Tab>
        <Tabs.Tab value="calendar" icon="fa-calendar">
          <span className="chayns-tabs__label">Calendar</span>
        </Tabs.Tab>
        <Tabs.Tab value="tasks" icon="fa-list-check" disabled>
          <span className="chayns-tabs__label">Tasks</span>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="inbox">Meetings and conversations</Tabs.Panel>
      <Tabs.Panel value="calendar">Your calendar</Tabs.Panel>
      <Tabs.Panel value="tasks">Tasks and notes</Tabs.Panel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendar = canvas.getByRole('tab', { name: 'Calendar' });
    const tasks = canvas.getByRole('tab', { name: 'Tasks' });
    const regular = calendar.querySelector(
      '.chayns-tabs__weight:not(.chayns-tabs__weight--active)',
    );
    const solid = calendar.querySelector('.chayns-tabs__weight--active');

    await expect(regular).toBeVisible();
    await expect(solid).not.toBeVisible();
    await userEvent.click(calendar);
    await expect(calendar).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
    await expect(regular).toBeVisible();
    await expect(solid).not.toBeVisible();

    await expect(tasks).toBeDisabled();
    await expect(tasks.querySelector('.chayns-tabs__weight--active')).not.toBeVisible();
    await expect(
      tasks.querySelector('.chayns-tabs__weight:not(.chayns-tabs__weight--active)'),
    ).toBeVisible();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Inbox' })).toHaveFocus();
    await waitForTabPanels(canvasElement);
  },
};

export const UnderlineWithIcons: Story = {
  ...AttachedWithIcons,
  args: { ...AttachedWithIcons.args, appearance: TabsAppearances.Underline },
};
