import { forwardRef, useId, useRef } from 'react';
import type { KeyboardEvent } from 'react';

import type { TabsEntry, TabsProps } from './Tabs.types.js';

function TabsIcon({ icon }: { icon: TabsEntry['icon'] }) {
  return (
    <span aria-hidden="true" className="chayns-tabs__icon">
      <i className={`far ${icon}`} />
    </span>
  );
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { addLabel, className, onAdd, tabs, ...rootProps },
  ref,
) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.isActive),
  );
  const rootClassName = ['chayns-tabs', className].filter(Boolean).join(' ');

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    tabs[nextIndex]?.onClick();
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && tabs[index]?.onRemove) {
      event.preventDefault();
      tabs[index].onRemove();
      return;
    }

    if (tabs.length === 0) return;

    const nextIndex =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? index + 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? tabs.length - 1
              : -1;

    if (nextIndex === -1) return;
    event.preventDefault();
    focusTab(nextIndex);
  };

  const activeTab = tabs[activeIndex];
  const activeTabId = activeTab ? `${baseId}-tab-${activeIndex}` : undefined;
  const activePanelId = activeTab ? `${baseId}-panel-${activeIndex}` : undefined;

  return (
    <div {...rootProps} className={rootClassName} ref={ref}>
      <div className="chayns-tabs__bar">
        <div className="chayns-tabs__list" role="tablist">
        {tabs.map((tab, index) => {
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          const isSelected = index === activeIndex;

          return (
            <div className="chayns-tabs__item" key={tabId} role="presentation">
              <button
                aria-controls={isSelected ? panelId : undefined}
                aria-selected={isSelected}
                className={`chayns-tabs__tab${isSelected ? ' chayns-tabs__tab--active' : ''}`}
                id={tabId}
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest('[data-tabs-remove]')) {
                    tab.onRemove?.();
                    return;
                  }
                  tab.onClick();
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                <TabsIcon icon={tab.icon} />
                <span className="chayns-tabs__label">{tab.name}</span>
                {tab.onRemove ? (
                  <span aria-hidden="true" className="chayns-tabs__remove" data-tabs-remove>
                    <TabsIcon icon="fa-xmark" />
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}
        </div>
        {onAdd && addLabel ? (
          <button aria-label={addLabel} className="chayns-tabs__add" onClick={onAdd} type="button">
            <TabsIcon icon="fa-plus" />
          </button>
        ) : null}
      </div>
      {activeTab && activeTabId && activePanelId ? (
        <div
          aria-labelledby={activeTabId}
          className="chayns-tabs__panel"
          id={activePanelId}
          role="tabpanel"
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );
});
