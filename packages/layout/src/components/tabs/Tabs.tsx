import { createContext, forwardRef, useContext, useId, useMemo, useState } from 'react';
import type { KeyboardEvent, Ref } from 'react';
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

/** Keep registry and consumer ref lifecycles stable across selection updates. */
function createTabRef(
  tabMap: Map<string, HTMLButtonElement>,
  value: string,
  ref: Ref<HTMLButtonElement>,
) {
  let cleanup: (() => void) | undefined;
  return (node: HTMLButtonElement | null) => {
    if (node) tabMap.set(value, node);
    else tabMap.delete(value);
    if (typeof ref === 'function') {
      if (node === null && cleanup) {
        cleanup();
        cleanup = undefined;
      } else {
        const nextCleanup = ref(node);
        if (typeof nextCleanup === 'function') cleanup = nextCleanup;
      }
    } else if (ref) ref.current = node;
  };
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
  { children, className, onKeyDown, onRemove, onClick, value, ...props },
  ref,
) {
  const tabs = useTabs('Tab');
  const selected = tabs.value === value;
  const tabId = `${tabs.baseId}-tab-${value}`;
  const panelId = `${tabs.baseId}-panel-${value}`;
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if ((event.key === 'Delete' || event.key === 'Backspace') && onRemove) {
      event.preventDefault();
      onRemove(value);
      return;
    }
    const values = [...tabs.tabs.entries()]
      .filter(([, element]) => !element.disabled)
      .sort(([, first], [, second]) =>
        first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      )
      .map(([tabValue]) => tabValue);
    const index = values.indexOf(value);
    let nextIndex = -1;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = values.length - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % values.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + values.length) % values.length;
    }
    if (nextIndex >= 0) {
      event.preventDefault();
      const next = values[nextIndex];
      if (next !== undefined) {
        tabs.select(next);
        tabs.tabs.get(next)?.focus();
      }
    }
  }
  const tabMap = tabs.tabs;
  const setRef = useMemo(() => createTabRef(tabMap, value, ref), [ref, tabMap, value]);
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
        if (event.defaultPrevented) return;
        if (event.target instanceof Element && event.target.closest('[data-tabs-remove]')) {
          onRemove?.(value);
        } else tabs.select(value);
      }}
      onKeyDown={handleKeyDown}
      ref={setRef}
      role="tab"
      tabIndex={selected ? 0 : -1}
      type="button"
    >
      {children}
      {onRemove ? (
        <span aria-hidden="true" className="chayns-tabs__remove" data-tabs-remove>
          <i className="far fa-xmark" />
        </span>
      ) : null}
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
  { appearance = 'attached', children, className, defaultValue, onValueChange, value, ...props },
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
      <div
        {...props}
        className={['chayns-tabs', `chayns-tabs--${appearance}`, className]
          .filter(Boolean)
          .join(' ')}
        ref={ref}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});
List.displayName = 'Tabs.List';
Tab.displayName = 'Tabs.Tab';
Panel.displayName = 'Tabs.Panel';
Add.displayName = 'Tabs.Add';
Root.displayName = 'Tabs';

export const Tabs = Object.assign(Root, { Add, List, Panel, Tab });
