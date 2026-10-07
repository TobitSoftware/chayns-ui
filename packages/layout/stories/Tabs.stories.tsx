import waitForTabPanels from './utils/waitForTabPanels.js';
import TabsIcon from '../src/components/tabs/tabs-icon/TabsIcon.js';
import usage from '../../../docs/03-components/tabs/tabs-usage.md?raw';
import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Tabs } from '../src/components/tabs/Tabs.js';
import { TabsAppearances } from '../src/components/tabs/Tabs.types.js';
import type { TabsProps } from '../src/components/tabs/Tabs.types.js';

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    docs: { description: { component: usage } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

interface WorkspaceEntry {
  value: string;
  label: string;
  icon: `fa-${string}`;
  content: string;
  isRemovable: boolean;
}

const INITIAL_ENTRIES: WorkspaceEntry[] = [
  {
    value: 'inbox',
    label: 'Inbox',
    icon: 'fa-inbox',
    content: 'Meetings and conversations',
    isRemovable: false,
  },
  {
    value: 'calendar',
    label: 'Calendar',
    icon: 'fa-calendar',
    content: 'Your calendar',
    isRemovable: true,
  },
  {
    value: 'tasks',
    label: 'Tasks',
    icon: 'fa-list-check',
    content: 'Tasks and notes',
    isRemovable: true,
  },
];

function TabsExample({ isEditable = false, ...args }: TabsProps & { isEditable?: boolean }) {
  const nextEntry = useRef(1);
  const [entries, setEntries] = useState(INITIAL_ENTRIES);

  function handleRemove(value: string) {
    setEntries((current) => current.filter((entry) => entry.value !== value));
  }

  function handleAdd() {
    const number = nextEntry.current++;
    const entry: WorkspaceEntry = {
      value: `new-${number}`,
      label: `New view ${number}`,
      icon: 'fa-file',
      content: `Content of new view ${number}`,
      isRemovable: true,
    };
    setEntries((current) => [...current, entry]);
  }

  return (
    <div
      className={`chayns-storybook-example-tabs${args.appearance === 'underline' ? ' chayns-storybook-example-tabs--underline' : ''}`}
    >
      <Tabs {...args}>
        <Tabs.List aria-label="Arbeitsbereiche">
          {entries.map((entry) => (
            <Tabs.Tab
              {...(isEditable && entry.isRemovable ? { onRemove: handleRemove } : {})}
              key={entry.value}
              value={entry.value}
            >
              <TabsIcon icon={entry.icon} />
              <span className="chayns-tabs__label">{entry.label}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {isEditable ? (
          <Tabs.Add aria-label="Add tab" onClick={handleAdd}>
            <TabsIcon icon="fa-plus" />
          </Tabs.Add>
        ) : null}
        {entries.map((entry) => (
          <Tabs.Panel key={entry.value} value={entry.value}>
            {entry.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
TabsExample.displayName = 'TabsExample';

export const WorkspaceTabs: Story = {
  args: { children: null, defaultValue: 'inbox' },
  render: (args) => <TabsExample {...args} isEditable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Calendar' }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
    await waitForTabPanels(canvasElement);
  },
};

export const Underline: Story = {
  ...WorkspaceTabs,
  args: { ...WorkspaceTabs.args, appearance: TabsAppearances.Underline },
  render: (args) => <TabsExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendar = canvas.getByRole('tab', { name: 'Calendar' });
    await expect(canvas.queryByRole('button', { name: 'Add tab' })).toBeNull();
    await expect(canvasElement.querySelector('[data-tabs-remove]')).toBeNull();
    await userEvent.click(calendar);
    await userEvent.keyboard('{Delete}{Backspace}');
    await expect(calendar).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Your calendar');
    await waitForTabPanels(canvasElement);
  },
};

export const UnderlineEditable: Story = {
  ...WorkspaceTabs,
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
  ...WorkspaceTabs,
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
