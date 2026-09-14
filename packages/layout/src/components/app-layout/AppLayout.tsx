import { forwardRef, useId, useState } from 'react';

import type { AppLayoutItem, AppLayoutProps } from './AppLayout.types.js';

function AppLayoutIcon({ icon }: { icon: AppLayoutItem['icon'] }) {
  return (
    <span aria-hidden="true" className="chayns-app-layout__icon">
      <span className="chayns-app-layout__weight">
        <i className={`far ${icon}`} />
      </span>
      <span className="chayns-app-layout__weight chayns-app-layout__weight--active">
        <i className={`fas ${icon}`} />
      </span>
    </span>
  );
}

interface NavigationItemsProps {
  items: AppLayoutItem[];
  activeItemId?: string | undefined;
  collapsed: boolean;
  onClick: (id: string) => void;
  expandedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
  parentId?: string;
}

function NavigationItems({
  activeItemId,
  collapsed,
  expandedIds,
  items,
  onClick,
  onToggle,
  parentId,
}: NavigationItemsProps) {
  return (
    <ul className="chayns-app-layout__list">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isExpanded = expandedIds.has(item.id);
        const panelId = `${parentId ?? 'root'}-${item.id}-children`;

        return (
          <li
            className={`chayns-app-layout__item${
              activeItemId === item.id ? ' chayns-app-layout__item--active' : ''
            }`}
            key={item.id}
          >
            <div className="chayns-app-layout__row">
              <button
                aria-current={activeItemId === item.id ? 'page' : undefined}
                aria-label={item.name}
                className="chayns-app-layout__action"
                onClick={() => onClick(item.id)}
                type="button"
              >
                <AppLayoutIcon icon={item.icon} />
                <span
                  className={`chayns-app-layout__label${
                    collapsed ? ' chayns-app-layout__label--hidden' : ''
                  }`}
                >
                  {item.name}
                </span>
              </button>
              {hasChildren && !collapsed ? (
                <button
                  aria-controls={panelId}
                  aria-expanded={isExpanded}
                  aria-label={item.name}
                  className="chayns-app-layout__disclosure"
                  onClick={() => onToggle(item.id)}
                  type="button"
                >
                  <AppLayoutIcon icon="fa-chevron-down" />
                </button>
              ) : null}
            </div>
            {hasChildren && !collapsed ? (
              <div
                aria-hidden={!isExpanded}
                className={`chayns-app-layout__children${
                  isExpanded ? ' chayns-app-layout__children--open' : ''
                }`}
                id={panelId}
                inert={!isExpanded}
              >
                <NavigationItems
                  activeItemId={activeItemId}
                  collapsed={collapsed}
                  expandedIds={expandedIds}
                  items={item.children ?? []}
                  onClick={onClick}
                  onToggle={onToggle}
                  parentId={item.id}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>(function AppLayout(
  {
    activeItemId,
    children,
    className,
    collapseLabel,
    collapsed,
    defaultCollapsed = false,
    expandLabel,
    items,
    logo,
    navigationLabel,
    onClick,
    onCollapsedChange,
    ...rootProps
  },
  ref,
) {
  const baseId = useId();
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(() => new Set());
  const isCollapsed = collapsed ?? internalCollapsed;
  const rootClassName = [
    'chayns-app-layout',
    isCollapsed ? 'chayns-app-layout--collapsed' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleCollapsedChange = () => {
    const nextCollapsed = !isCollapsed;
    if (collapsed === undefined) {
      setInternalCollapsed(nextCollapsed);
    }
    onCollapsedChange?.(nextCollapsed);
  };

  const handleToggle = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div {...rootProps} className={rootClassName} ref={ref}>
      <header className="chayns-app-layout__header">
        <img alt="" className="chayns-app-layout__logo" src={logo} />
      </header>
      <aside className="chayns-app-layout__sidebar">
        <nav aria-label={navigationLabel} className="chayns-app-layout__navigation">
          <NavigationItems
            activeItemId={activeItemId}
            collapsed={isCollapsed}
            expandedIds={expandedIds}
            items={items}
            onClick={onClick}
            onToggle={handleToggle}
            parentId={baseId}
          />
        </nav>
        <div className="chayns-app-layout__footer">
          <button
            aria-label={isCollapsed ? expandLabel : collapseLabel}
            className="chayns-app-layout__collapse"
            onClick={handleCollapsedChange}
            type="button"
          >
            <AppLayoutIcon icon="fa-sidebar" />
          </button>
        </div>
      </aside>
      <main className="chayns-app-layout__content">{children}</main>
    </div>
  );
});
