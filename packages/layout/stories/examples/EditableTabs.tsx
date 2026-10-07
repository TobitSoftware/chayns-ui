import { useRef, useState } from 'react';
import { Tabs, TabsAppearances } from '@chayns-ui/layout';
import type { TabsProps } from '@chayns-ui/layout';

interface WorkspaceEntry {
  value: string;
  label: string;
  content: string;
  isRemovable: boolean;
}

const INITIAL_ENTRIES: WorkspaceEntry[] = [
  {
    value: 'inbox',
    label: 'Inbox',
    content: 'Meetings and conversations',
    isRemovable: false,
  },
  {
    value: 'calendar',
    label: 'Calendar',
    content: 'Your calendar',
    isRemovable: true,
  },
  {
    value: 'tasks',
    label: 'Tasks',
    content: 'Tasks and notes',
    isRemovable: true,
  },
];

export default function EditableTabs({
  appearance = TabsAppearances.Attached,
  defaultValue = 'inbox',
  ...props
}: Partial<TabsProps> = {}) {
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
      content: `Content of new view ${number}`,
      isRemovable: true,
    };
    setEntries((current) => [...current, entry]);
  }

  return (
    <Tabs {...props} appearance={appearance} defaultValue={defaultValue}>
      <Tabs.List aria-label="Arbeitsbereiche">
        {entries.map((entry) => (
          <Tabs.Tab
            {...(entry.isRemovable ? { onRemove: handleRemove } : {})}
            key={entry.value}
            value={entry.value}
          >
            {entry.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Add aria-label="Add tab" onClick={handleAdd}>
        +
      </Tabs.Add>
      {entries.map((entry) => (
        <Tabs.Panel key={entry.value} value={entry.value}>
          {entry.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
EditableTabs.displayName = 'EditableTabs';
