import { forwardRef, useId, useState } from 'react';

import type { AppLayoutProps } from './AppLayout.types.js';
import AppLayoutIcon from './app-layout-icon/AppLayoutIcon.js';
import NavigationItems from './navigation-items/NavigationItems.js';

export const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      activeItemId,
      children,
      className,
      collapseLabel,
      collapsed,
      defaultCollapsed = false,
      expandLabel,
      headerContent,
      items,
      logo,
      navigationLabel,
      onClick,
      onCollapsedChange,
      ...rootProps
    },
    ref,
  ) => {
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
          <div className="chayns-app-layout__header-content">{headerContent}</div>
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
  },
);

AppLayout.displayName = 'AppLayout';
