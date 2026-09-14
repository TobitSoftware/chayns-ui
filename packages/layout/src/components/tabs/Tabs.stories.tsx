import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { AppLayout } from '../app-layout/AppLayout.js';
import { Tabs } from './Tabs.js';
import type { TabsEntry } from './Tabs.types.js';

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    addLabel: 'Add tab',
    onAdd: fn(),
    tabs: [],
  },
  parameters: {
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceTabs: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onSelect = fn();
    const entries = [
      {
        content: <p>Meetings and conversations</p>,
        icon: 'fa-inbox' as const,
        isActive: activeIndex === 0,
        name: 'Inbox',
        onClick: () => {
          onSelect();
          setActiveIndex(0);
        },
        onRemove: fn(),
      },
      {
        content: <p>Your calendar</p>,
        icon: 'fa-calendar' as const,
        isActive: activeIndex === 1,
        name: 'Calendar',
        onClick: () => {
          onSelect();
          setActiveIndex(1);
        },
        onRemove: fn(),
      },
      {
        content: <p>Tasks and notes</p>,
        icon: 'fa-list-check' as const,
        isActive: activeIndex === 2,
        name: 'Tasks',
        onClick: () => {
          onSelect();
          setActiveIndex(2);
        },
        onRemove: fn(),
      },
    ];

    return (
      <div style={{ maxInlineSize: '48rem', padding: 'var(--sp-4)', background: 'var(--accent)' }}>
        <Tabs tabs={entries} />
      </div>
    );
  },
};

export const WithAddAndRemove: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('inbox');
    const [tabIds, setTabIds] = useState(['inbox', 'calendar']);
    const definitions = [
      { icon: 'fa-inbox' as const, name: 'Inbox' },
      { icon: 'fa-calendar' as const, name: 'Calendar' },
      { icon: 'fa-list-check' as const, name: 'Tasks' },
      { icon: 'fa-note-sticky' as const, name: 'Notes' },
    ];

    const removeTab = (id: string) => {
      setTabIds((current) => current.filter((tabId) => tabId !== id));
      setActiveId((current) =>
        current === id ? (tabIds.find((tabId) => tabId !== id) ?? '') : current,
      );
    };

    const tabs: TabsEntry[] = tabIds.map((id) => {
      const definition = definitions.find((item) => item.name.toLowerCase() === id)!;
      return {
        content: <p>{definition.name} content</p>,
        icon: definition.icon,
        isActive: id === activeId,
        name: definition.name,
        onClick: () => setActiveId(id),
        onRemove: () => removeTab(id),
      };
    });

    return (
      <div style={{ maxInlineSize: '48rem', padding: 'var(--sp-4)', background: 'var(--accent)' }}>
        <Tabs
          addLabel="Add tab"
          onAdd={() => {
            const nextId = definitions.find((item) => !tabIds.includes(item.name.toLowerCase()));
            if (nextId) {
              const id = nextId.name.toLowerCase();
              setTabIds((current) => [...current, id]);
              setActiveId(id);
            }
          }}
          tabs={tabs}
        />
      </div>
    );
  },
};

export const InAppLayout: Story = {
  render: () => {
    const navigation = [
      { icon: 'fa-inbox' as const, id: 'inbox', name: 'Inbox' },
      { icon: 'fa-calendar' as const, id: 'calendar', name: 'Calendar' },
      { icon: 'fa-list-check' as const, id: 'tasks', name: 'Tasks' },
    ];
    const [activeId, setActiveId] = useState('inbox');
    const [tabIds, setTabIds] = useState(['inbox', 'calendar']);

    const selectItem = (id: string) => {
      setActiveId(id);
      setTabIds((current) => (current.includes(id) ? current : [...current, id]));
    };

    const removeTab = (id: string) => {
      setTabIds((current) => current.filter((tabId) => tabId !== id));
      setActiveId((current) =>
        current === id ? (tabIds.find((tabId) => tabId !== id) ?? '') : current,
      );
    };

    const tabs = tabIds
      .map((id) => navigation.find((item) => item.id === id))
      .filter((item): item is (typeof navigation)[number] => item !== undefined)
      .map((item): TabsEntry => ({
        content: <p>{item.name} content</p>,
        icon: item.icon,
        isActive: item.id === activeId,
        name: item.name,
        onClick: () => selectItem(item.id),
        onRemove: () => removeTab(item.id),
      }));

    return (
      <div style={{ blockSize: '36rem' }}>
        <AppLayout
          collapseLabel="Collapse navigation"
          defaultCollapsed={false}
          expandLabel="Expand navigation"
          items={navigation}
          logo="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='132' height='32'%3E%3Crect width='132' height='32' rx='8' fill='%230f6d7e'/%3E%3C/svg%3E"
          navigationLabel="Application navigation"
          onClick={selectItem}
          activeItemId={activeId}
        >
          <Tabs tabs={tabs} />
        </AppLayout>
      </div>
    );
  },
};
