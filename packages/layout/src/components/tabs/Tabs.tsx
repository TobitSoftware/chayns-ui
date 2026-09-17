import { createContext, forwardRef, useContext, useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type {
  TabsAddProps,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TabsTabProps,
} from './Tabs.types.js';

interface TabsContextValue {
  baseId: string;
  select: (value: string) => void;
  tabs: Map<string, HTMLButtonElement>;
  value: string | undefined;
}
const TabsContext = createContext<TabsContextValue | null>(null);
function useTabs(part: string) {
  const context = useContext(TabsContext);
  if (context === null) throw new Error(`Tabs.${part} must be rendered within Tabs.`);
  return context;
}

const List = forwardRef<HTMLDivElement, TabsListProps>(function List(
  { children, className, ...props },
  ref,
) {
  useTabs('List');
  return (
    <div
      {...props}
      className={['chayns-tabs__list', className].filter(Boolean).join(' ')}
      ref={ref}
      role="tablist"
    >
      {children}
    </div>
  );
});
const Tab = forwardRef<HTMLButtonElement, TabsTabProps>(function Tab(
  { children, className, onRemove, onClick, value, ...props },
  ref,
) {
  const tabs = useTabs('Tab');
  const selected = tabs.value === value;
  const tabId = `${tabs.baseId}-tab-${value}`;
  const panelId = `${tabs.baseId}-panel-${value}`;
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if ((event.key === 'Delete' || event.key === 'Backspace') && onRemove) {
      event.preventDefault();
      onRemove();
      return;
    }
    const values = [...tabs.tabs.keys()];
    const index = values.indexOf(value);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? values.length - 1
          : event.key === 'ArrowRight' || event.key === 'ArrowDown'
            ? (index + 1) % values.length
            : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
              ? (index - 1 + values.length) % values.length
              : -1;
    if (nextIndex >= 0) {
      event.preventDefault();
      const next = values[nextIndex];
      if (next) {
        tabs.select(next);
        tabs.tabs.get(next)?.focus();
      }
    }
  }
  function setRef(node: HTMLButtonElement | null) {
    if (node) tabs.tabs.set(value, node);
    else tabs.tabs.delete(value);
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }
  return (
    <button
      {...props}
      aria-controls={panelId}
      aria-selected={selected}
      className={['chayns-tabs__tab', selected && 'chayns-tabs__tab--active', className]
        .filter(Boolean)
        .join(' ')}
      id={tabId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) tabs.select(value);
      }}
      onKeyDown={handleKeyDown}
      ref={setRef}
      role="tab"
      tabIndex={selected ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
});
const Panel = forwardRef<HTMLDivElement, TabsPanelProps>(function Panel(
  { children, className, value, ...props },
  ref,
) {
  const tabs = useTabs('Panel');
  if (tabs.value !== value) return null;
  return (
    <div
      {...props}
      aria-labelledby={`${tabs.baseId}-tab-${value}`}
      className={['chayns-tabs__panel', className].filter(Boolean).join(' ')}
      id={`${tabs.baseId}-panel-${value}`}
      ref={ref}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  );
});
const Add = forwardRef<HTMLButtonElement, TabsAddProps>(function Add(
  { children, className, ...props },
  ref,
) {
  useTabs('Add');
  return (
    <button
      {...props}
      className={['chayns-tabs__add', className].filter(Boolean).join(' ')}
      ref={ref}
      type="button"
    >
      {children}
    </button>
  );
});
const Root = forwardRef<HTMLDivElement, TabsProps>(function Root(
  { children, className, defaultValue, onValueChange, value, ...props },
  ref,
) {
  const baseId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [tabMap] = useState(() => new Map<string, HTMLButtonElement>());
  const selectedValue = value ?? internalValue;
  const select = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ baseId, select, tabs: tabMap, value: selectedValue }}>
      <div {...props} className={['chayns-tabs', className].filter(Boolean).join(' ')} ref={ref}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
export const Tabs = Object.assign(Root, { Add, List, Panel, Tab });
